// ==================== SMOOTH SCROLL ====================

document.addEventListener("DOMContentLoaded", () => {

    // Seleccionamos todos los enlaces que tienen href empezando con #
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener("click", function(e) {

            // Prevenimos el comportamiento por defecto
            e.preventDefault();

            // Obtenemos el ID del destino
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Calculamos la posición considerando el navbar fijo
                const navbarHeight = 80; // Ajusta este valor según la altura de tu navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - navbarHeight;

                // Scroll suave
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
// ==================== ANIMACIÓN AL HACER SCROLL ====================

document.addEventListener("DOMContentLoaded", () => {

    const animatedSections = document.querySelectorAll('.animar');

    const observerOptions = {
        threshold: 0.15,        // Se activa cuando el 15% de la sección es visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: dejar de observar después de animar
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedSections.forEach(section => {
        observer.observe(section);
    });
});