// Бургер-меню
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".header-menu");

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
  });
});


// Слайдер (уже есть)
let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.remove("active");
    if (idx === i) slide.classList.add("active");
  });
}

setInterval(() => {
  index = (index + 1) % slides.length;
  showSlide(index);
}, 5000);

// Уменьшение шапки

const header = document.querySelector('header');
const headerTop = document.querySelector('.header-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    headerTop.classList.add('hidden');
    header.classList.add('scrolled');
  } else {
    headerTop.classList.remove('hidden');
    header.classList.remove('scrolled');
  }
});

// Анимации при прокрутке
const observers = document.querySelectorAll('.fade-in-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

observers.forEach(el => observer.observe(el));

// Анимация "О нас" по абзацам
const aboutParagraphs = document.querySelectorAll('.about .fade-line');
const aboutObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      aboutParagraphs.forEach((p, i) => {
        setTimeout(() => {
          p.classList.add('show');
        }, i * 400); // задержка между абзацами 0.4 сек
      });
    }
  });
}, { threshold: 0.2 });

aboutObserver.observe(document.querySelector('.about'));


// main.js — объединённый скрипт для всех страниц
(() => {
  'use strict';

  /* ---------- Слайдер (index.html) ---------- */
  const slides = Array.from(document.querySelectorAll('.slide'));
  let slideIndex = 0;
  if (slides.length) {
    const showSlide = i => {
      slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
    };
    showSlide(slideIndex);
    setInterval(() => {
      slideIndex = (slideIndex + 1) % slides.length;
      showSlide(slideIndex);
    }, 5000);
  }

  /* ---------- IntersectionObserver для анимаций (универсально) ---------- */
const ioOptions = { threshold: 0.18 };
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, ioOptions);

document.querySelectorAll('.fade-in-up').forEach(el => io.observe(el));


  /* ---------- "О нас" — поочередное появление абзацев ---------- */
const aboutParagraphs = document.querySelectorAll('.about .fade-line');
const aboutObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      aboutParagraphs.forEach((p, i) => {
        setTimeout(() => {
          p.classList.add('show');
        }, i * 400); // задержка между абзацами
      });
      aboutObserver.unobserve(entry.target); // 👈 чтобы не срабатывало повторно
    }
  });
}, { threshold: 0.2 });

aboutObserver.observe(document.querySelector('.about'));
})();


// Галерея для студентов
const studentGalleries = document.querySelectorAll('.student-gallery .gallery');
studentGalleries.forEach(gallery => {
  const slides = gallery.querySelectorAll('.gallery-slide');
  let current = 0;

  const show = (i) => {
    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
  };

  gallery.querySelector('.gallery-prev').addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    show(current);
  });

  gallery.querySelector('.gallery-next').addEventListener('click', () => {
    current = (current + 1) % slides.length;
    show(current);
  });

  show(current);
});

