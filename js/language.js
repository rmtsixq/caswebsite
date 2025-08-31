// Language Toggle Functionality
class LanguageManager {
    constructor() {
        this.currentLang = 'tr';
        this.translations = {
            tr: {
                // Navigation
                'Ana Sayfa': 'Ana Sayfa',
                'Öğrenciler': 'Öğrenciler',
                'Projeler': 'Projeler',
                'CAS Hakkında': 'CAS Hakkında',
                'İletişim': 'İletişim',
                'Giriş': 'Giriş',
                'Kayıt Ol': 'Kayıt Ol',
                
                // Home Page
                'Private Ruzgar Anatolian Lisesi': 'Private Ruzgar Anatolian Lisesi',
                'CAS Program': 'CAS Programı',
                'IB Diploma Programı öğrencilerimizin Creativity, Activity, Service deneyimlerini ve kişisel gelişim yolculuklarını keşfedin.': 'IB Diploma Programı öğrencilerimizin Creativity, Activity, Service deneyimlerini ve kişisel gelişim yolculuklarını keşfedin.',
                'Öğrencileri Keşfet': 'Öğrencileri Keşfet',
                'Projelerimizi Gör': 'Projelerimizi Gör',
                
                // CAS Pillars
                'Creativity': 'Yaratıcılık',
                'Activity': 'Aktivite',
                'Service': 'Hizmet',
                'Sanatsal ve yaratıcı projeler aracılığıyla öğrencilerimizin hayal gücünü ve inovasyon becerilerini geliştiriyoruz.': 'Sanatsal ve yaratıcı projeler aracılığıyla öğrencilerimizin hayal gücünü ve inovasyon becerilerini geliştiriyoruz.',
                'Fiziksel aktiviteler ve spor aracılığıyla sağlıklı yaşam alışkanlıkları kazandırıyoruz.': 'Fiziksel aktiviteler ve spor aracılığıyla sağlıklı yaşam alışkanlıkları kazandırıyoruz.',
                'Topluma hizmet projeleri ile öğrencilerimizin sosyal sorumluluk bilincini artırıyoruz.': 'Topluma hizmet projeleri ile öğrencilerimizin sosyal sorumluluk bilincini artırıyoruz.',
                'Projeleri Gör': 'Projeleri Gör'
            },
            en: {
                // Navigation
                'Ana Sayfa': 'Home',
                'Öğrenciler': 'Students',
                'Projeler': 'Projects',
                'CAS Hakkında': 'About CAS',
                'İletişim': 'Contact',
                'Giriş': 'Login',
                'Kayıt Ol': 'Sign Up',
                
                // Home Page
                'Private Ruzgar Anatolian Lisesi': 'Private Ruzgar Anatolian Lisesi',
                'CAS Program': 'CAS Program',
                'IB Diploma Programı öğrencilerimizin Creativity, Activity, Service deneyimlerini ve kişisel gelişim yolculuklarını keşfedin.': 'Discover our IB Diploma students\' Creativity, Activity, Service experiences and personal development journeys.',
                'Öğrencileri Keşfet': 'Explore Students',
                'Projelerimizi Gör': 'View Our Projects',
                
                // CAS Pillars
                'Creativity': 'Creativity',
                'Activity': 'Activity',
                'Service': 'Service',
                'Sanatsal ve yaratıcı projeler aracılığıyla öğrencilerimizin hayal gücünü ve inovasyon becerilerini geliştiriyoruz.': 'We develop our students\' imagination and innovation skills through artistic and creative projects.',
                'Fiziksel aktiviteler ve spor aracılığıyla sağlıklı yaşam alışkanlıkları kazandırıyoruz.': 'We instill healthy lifestyle habits through physical activities and sports.',
                'Topluma hizmet projeleri ile öğrencilerimizin sosyal sorumluluk bilincini artırıyoruz.': 'We increase our students\' social responsibility awareness through community service projects.',
                'Projeleri Gör': 'View Projects'
            }
        };
        
        this.init();
    }

    init() {
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            langToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleLanguage();
            });
        }
        
        // Load saved language preference
        const savedLang = localStorage.getItem('preferredLanguage') || 'tr';
        if (savedLang !== this.currentLang) {
            this.setLanguage(savedLang);
        }
    }

    toggleLanguage() {
        const newLang = this.currentLang === 'tr' ? 'en' : 'tr';
        this.setLanguage(newLang);
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        
        // Update language toggle button
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            langToggle.textContent = lang === 'tr' ? 'EN' : 'TR';
        }
        
        // Update document language
        document.documentElement.lang = lang;
        
        // Translate all elements with data-translate attribute
        this.updateTranslations();
    }

    updateTranslations() {
        const elementsToTranslate = document.querySelectorAll('[data-translate]');
        
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.translations[this.currentLang][key];
            
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    translate(key) {
        return this.translations[this.currentLang][key] || key;
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
});