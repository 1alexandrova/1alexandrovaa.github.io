// Бургер меню
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Модальное окно
const modalTriggers = document.querySelectorAll('.modal-trigger');
const modal = document.getElementById('modal');
const modalClose = document.querySelector('.modal-close');
const form = document.querySelector('.subscription-form');

modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Форма
form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
    form.reset();
    closeModal();
});

// Слайдер
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

prevBtn.addEventListener('click', () => {
    currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
    showSlide(currentSlide);
});

nextBtn.addEventListener('click', () => {
    currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
    showSlide(currentSlide);
});

// Автопрокрутка слайдера
setInterval(() => {
    currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
    showSlide(currentSlide);
}, 5000);

// Плавная прокрутка для ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация появления при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдение за элементами
document.querySelectorAll('.principle-card, .advice-card, .recipe-card, .nutrient-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Мобильная адаптация меню
if (window.innerWidth <= 1279) {
    navMenu.style.position = 'fixed';
    navMenu.style.top = '80px';
    navMenu.style.left = '0';
    navMenu.style.width = '100%';
    navMenu.style.background = 'rgba(255,255,255,0.98)';
    navMenu.style.padding = '2rem';
    navMenu.style.flexDirection = 'column';
    navMenu.style.gap = '1rem';
    navMenu.style.transform = 'translateX(-100%)';
    navMenu.style.transition = 'transform 0.3s ease';
    
    document.querySelector('.nav').style.position = 'relative';
}

document.querySelector('.nav-menu.active')?.style.transform = 'translateX(0)';