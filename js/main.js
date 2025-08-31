// Main website functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.pillar, .feature, .stat').forEach(el => {
        observer.observe(el);
    });

    // Enhanced parallax effect for hero
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Enhanced glassmorphism on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
});

// Utility function for creating dynamic cards
function createStudentCard(student) {
    return `
        <div class="student-card">
            <div class="student-photo">
                ${student.photo ? `<img src="${student.photo}" alt="${student.name}">` : '<i class="fas fa-user placeholder"></i>'}
            </div>
            <div class="student-info">
                <h3 class="student-name">${student.name}</h3>
                <p class="student-class">${student.class}</p>
                <p class="student-quote">"${student.quote}"</p>
                <a href="student-profile.html?id=${student.id}" class="view-profile-btn">Detaylı Profil</a>
            </div>
        </div>
    `;
}

// Sample student data
const studentsData = [
    {
        id: 'ayse-kaya',
        name: 'Ayşe Kaya',
        class: 'IB2 - 12. Sınıf',
        quote: 'Topluma katkı küçük adımlarla başlar. Her proje beni daha güçlü yapıyor.',
        photo: null
    },
    {
        id: 'mehmet-ozkan',
        name: 'Mehmet Özkan',
        class: 'IB2 - 12. Sınıf',
        quote: 'Sanat ve spor aracılığıyla kendimi keşfediyorum. Her gün yeni bir öğrenme fırsatı.',
        photo: null
    },
    {
        id: 'zeynep-demir',
        name: 'Zeynep Demir',
        class: 'IB1 - 11. Sınıf',
        quote: 'CAS bana sadece akademik başarının yeterli olmadığını öğretti. İnsan olmak daha önemli.',
        photo: null
    },
    {
        id: 'can-yilmaz',
        name: 'Can Yılmaz',
        class: 'IB2 - 12. Sınıf',
        quote: 'Müzik ve teknoloji tutkum, sosyal sorumluluk projelerimle birleşiyor.',
        photo: null
    },
    {
        id: 'elif-sahin',
        name: 'Elif Şahin',
        class: 'IB1 - 11. Sınıf',
        quote: 'Çevre projeleri benim tutkum. Gelecek nesiller için daha iyi bir dünya istiyorum.',
        photo: null
    },
    {
        id: 'baran-arslan',
        name: 'Baran Arslan',
        class: 'IB2 - 12. Sınıf',
        quote: 'Liderlik sadece önde olmak değil, arkadaşlarına destek olmaktır.',
        photo: null
    }
];