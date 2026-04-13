// ============================================
//  NAVBAR — efecto al hacer scroll
// ============================================
const nav = document.getElementById('siteNav');
if (nav) {
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    });
}

// ============================================
//  SCROLL REVEAL — Reinicia animaciones al subir
// ============================================
document.addEventListener('DOMContentLoaded', () => {

    const animEls = document.querySelectorAll('.animar');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                if (window.scrollY < entry.target.getBoundingClientRect().top + window.scrollY) {
                    entry.target.classList.remove('visible');
                }
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '-50px 0px -80px 0px'
    });

    animEls.forEach(el => {
        observer.observe(el);
        el.classList.remove('visible');
    });
});

// ============================================
//  SMOOTH SCROLL para links con #
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const navHeight = 80;

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const id = link.getAttribute('href').slice(1);
            if (!id) return;
            const target = document.getElementById(id);
            if (!target) return;
            e.preventDefault();

            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - navHeight,
                behavior: 'smooth'
            });

            // Cerrar navbar móvil si está abierta
            const collapse = document.getElementById('navMenu');
            if (collapse && collapse.classList.contains('show')) {
                bootstrap.Collapse.getInstance(collapse)?.hide();
            }
        });
    });
});

// ============================================
//  FEEDBACK del formulario
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const original = btn.innerHTML;

        btn.innerHTML = 'Enviando... <span class="spinner-border spinner-border-sm ms-2"></span>';
        btn.disabled = true;

        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                btn.innerHTML = '✓ Mensaje enviado';
                btn.style.background = '#00FF94';
                btn.style.color = '#080B0F';
                form.reset();

                setTimeout(() => {
                    btn.innerHTML = original;
                    btn.style.background = '';
                    btn.style.color = '';
                    btn.disabled = false;
                }, 3500);
            } else {
                throw new Error();
            }
        } catch {
            btn.innerHTML = 'Error — intenta de nuevo';
            btn.style.background = '#ff4d4d';
            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }
    });
});

// ============================================
//  VER MÁS / VER MENOS PROYECTOS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const btn     = document.getElementById('btnShowMore');
    const extra   = document.getElementById('extraProjects');
    const btnText = document.getElementById('btnText');

    if (!btn || !extra) return;

    let expanded = false;

    btn.addEventListener('click', () => {
        expanded = !expanded;

        if (expanded) {
            extra.classList.add('expanded');
            btn.classList.add('expanded');
            btnText.textContent = 'Ver menos proyectos';

            // Activar animaciones de entrada con pequeño delay
            setTimeout(() => {
                extra.querySelectorAll('.animar-extra').forEach((el, i) => {
                    setTimeout(() => el.classList.add('visible'), i * 100);
                });
            }, 80);

        } else {
            extra.classList.remove('expanded');
            btn.classList.remove('expanded');
            btnText.textContent = 'Ver más proyectos';

            // Resetear animaciones para la próxima apertura
            extra.querySelectorAll('.animar-extra').forEach(el => {
                el.classList.remove('visible');
            });

            // Scroll suave al inicio de la sección proyectos
            const section = document.getElementById('proyectos');
            if (section) {
                window.scrollTo({
                    top: section.getBoundingClientRect().top + window.scrollY - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});