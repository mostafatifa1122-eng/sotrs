// ===== العد التنازلي =====
function startCountdown(targetDate) {
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById('countdown').innerHTML = '<h3 style="color:var(--gold);">🔥 العرض انتهى!</h3>';
            return;
        }
        document.getElementById('days').textContent = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
        document.getElementById('hours').textContent = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
        document.getElementById('minutes').textContent = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        document.getElementById('seconds').textContent = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
    }, 1000);
}
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 7);
startCountdown(targetDate);

// ===== النسخ المتبقية =====
let remaining = 5;
setInterval(() => {
    if (remaining > 1) {
        remaining--;
        document.getElementById('remainingCopies').textContent = remaining;
    }
}, 30000);

// ===== آخر المشترين =====
const buyers = [
    'أحمد من القاهرة اشترى النظام',
    'سارة من الإسكندرية اشترت النظام',
    'محمد من الجيزة اشترى النظام',
    'نورة من المنصورة اشترت النظام',
    'علي من بورسعيد اشترى النظام',
    'فاطمة من أسيوط اشترت النظام'
];
let buyerIndex = 0;
setInterval(() => {
    buyerIndex = (buyerIndex + 1) % buyers.length;
    const minutes = Math.floor(Math.random() * 10) + 1;
    document.getElementById('recentBuyers').textContent = `${buyers[buyerIndex]} منذ ${minutes} دقائق`;
}, 10000);

// ===== إحصائيات متحركة =====
function animateNumbers() {
    document.querySelectorAll('.stat-number').forEach(stat => {
        const target = parseFloat(stat.dataset.count);
        const isFloat = target % 1 !== 0;
        let current = 0;
        const increment = target / 50;
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) { current = target; clearInterval(counter); }
            stat.textContent = isFloat ? current.toFixed(1) : Math.round(current);
        }, 30);
    });
}
const heroSection = document.querySelector('.hero');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { animateNumbers(); observer.unobserve(entry.target); }
    });
}, { threshold: 0.3 });
observer.observe(heroSection);

// ===== مؤثرات الدخول =====
const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -50px 0px' };
const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, observerOptions);
document.querySelectorAll('.fade-up, .scale-in, .slide-left, .slide-right').forEach(el => {
    elementObserver.observe(el);
});

// ===== شريط التمرير =====
window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    document.getElementById('scrollProgress').style.width = (winScroll / height) * 100 + '%';
});

// ===== نافذة إنستاباي =====
function showInstapay(product, price) {
    document.getElementById('popupProduct').textContent = product;
    document.getElementById('popupPrice').textContent = price;
    document.getElementById('instapayPopup').style.display = 'flex';
}
function closePopup() { document.getElementById('instapayPopup').style.display = 'none'; }
document.getElementById('instapayPopup').addEventListener('click', function(e) {
    if (e.target === this) closePopup();
});

// ===== واتساب =====
function orderViaWhatsApp(product, price) {
    const message = `مرحباً! 🌟\nأريد شراء ${product} بسعر ${price} جنيه\nالرجاء إرسال تفاصيل الدفع.`;
    window.open(`https://wa.me/201234567890?text=${encodeURIComponent(message)}`, '_blank');
}

// ===== نافذة الفيديو =====
function openVideoModal() {
    document.getElementById('videoPopup').style.display = 'flex';
    document.getElementById('videoIframe').src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
}
function closeVideoPopup() {
    document.getElementById('videoPopup').style.display = 'none';
    document.getElementById('videoIframe').src = '';
}
document.getElementById('videoPopup').addEventListener('click', function(e) {
    if (e.target === this) closeVideoPopup();
});

// ===== نموذج البريد =====
document.getElementById('emailForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    if (email) {
        console.log('Email captured:', email);
        this.style.display = 'none';
        document.getElementById('emailSuccess').style.display = 'block';
    }
});

// ===== فتح أول FAQ =====
function toggleFaq(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('.fa-chevron-down');
    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        icon.style.transform = 'rotate(0deg)';
    } else {
        document.querySelectorAll('.faq-answer').forEach(el => el.style.maxHeight = null);
        document.querySelectorAll('.faq-question .fa-chevron-down').forEach(el => el.style.transform = 'rotate(0deg)');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const firstQuestion = document.querySelector('.faq-question');
    if (firstQuestion) toggleFaq(firstQuestion);
});