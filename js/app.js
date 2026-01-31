document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Observer para Animaciones de Scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .fade-in');
    animatedElements.forEach(el => observer.observe(el));

    // 2. Menú Móvil
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            const currentDisplay = window.getComputedStyle(navLinks).display;
            if(currentDisplay === 'none') {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#0f172a'; // Fondo oscuro para móvil
                navLinks.style.padding = '20px';
                navLinks.style.zIndex = '999';
            } else {
                navLinks.style.display = ''; 
            }
        });
    }

    // 3. Efecto visual en formulario (Labels flotantes en carga si hay texto)
    const inputs = document.querySelectorAll('.input-group input, .input-group textarea');
    inputs.forEach(input => {
        // Verificar al cargar si hay texto (ej. autocompletado)
        if(input.value !== "") {
            input.setAttribute("valid", "true"); // Ayuda visual si quisieras forzar estilo
        }
        input.addEventListener('change', () => {
            if(input.value !== "") {
                input.classList.add('has-content');
            } else {
                input.classList.remove('has-content');
            }
        });
    });

    // 4. Submit Simulado
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const icon = btn.querySelector('i');
        const originalText = btn.innerHTML;

        btn.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';
        
        setTimeout(() => {
            alert('Gracias. Su solicitud ha sido recibida por el equipo de Triunity.');
            form.reset();
            btn.innerHTML = originalText;
        }, 1500);
    });
});