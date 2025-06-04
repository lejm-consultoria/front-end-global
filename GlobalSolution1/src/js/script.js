document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const slides = document.querySelectorAll('.tarefa');
  const btnEsquerda = document.getElementById('seta-esquerda');
  const btnDireita = document.getElementById('seta-direita');
  let slideIndex = 0;

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  function mostrarSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
  }

  btnEsquerda.addEventListener('click', () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    mostrarSlide(slideIndex);
  });

  btnDireita.addEventListener('click', () => {
    slideIndex = (slideIndex + 1) % slides.length;
    mostrarSlide(slideIndex);
  });

  mostrarSlide(slideIndex);
});