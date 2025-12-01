// Toggle case dashboards visibility
function toggleCase(caseId) {
    const caseElement = document.getElementById(caseId);
    const isHidden = caseElement.classList.contains('hidden');
    
    // Hide all other cases
    document.querySelectorAll('.case-dashboards').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Toggle current case
    if (isHidden) {
        caseElement.classList.remove('hidden');
        // Smooth scroll to dashboards
        setTimeout(() => {
            caseElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    } else {
        caseElement.classList.add('hidden');
    }
}

// Close all cases when clicking outside
document.addEventListener('click', function(event) {
    const caseCards = document.querySelectorAll('.case-card');
    let clickedInCard = false;
    
    caseCards.forEach(card => {
        if (card.contains(event.target)) {
            clickedInCard = true;
        }
    });
    
    // Don't close if clicking on expand button
    if (event.target.classList.contains('btn-expand')) {
        return;
    }
});

// Smooth scroll for navigation links
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

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe case cards
document.querySelectorAll('.case-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Add active class to nav links on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
});

// Image lazy loading
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Add click tracking for analytics (optional)
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function() {
        console.log('Button clicked:', this.textContent);
    });
});

// Console message
console.log('Portfólio de Business Intelligence carregado com sucesso!');
console.log('Desenvolvido por Mauricio de Castro');
