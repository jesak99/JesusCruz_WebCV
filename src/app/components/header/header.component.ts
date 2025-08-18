import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FadeTranslateDirective } from '../../directives/fade-translate.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, FadeTranslateDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit {
  isScrolled = false;
  mobileMenuOpen = false;
  isDarkMode = false;
  language = 'es';
  selectedLanguage = 'es'; // Valor por defecto
  activeSection: string = 'inicio';
  sectionIds = ['inicio', 'about', 'skills', 'projects', 'contact'];

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    //Recupera tema
    const storedTheme = localStorage.getItem('theme');
    this.isDarkMode = storedTheme === 'dark';
    document.documentElement.classList.toggle('dark', this.isDarkMode);

    // Recuperar idioma
    const storedLang = localStorage.getItem('language');
    if (storedLang) {
      this.selectedLanguage = storedLang;
    }

    // (Futuro) aplicar idioma en i18n
    this.applyLanguage(this.selectedLanguage);
  }

  ngAfterViewInit() {
    const options = {
      root: null, // viewport
      rootMargin: '-50px 0px 0px 0px', // para compensar el header fijo
      threshold: 0.8, // 80% visible para activarlo
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
        }
      });
    }, options);

    this.sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  changeLanguage(lang: string) {
    localStorage.setItem('language', this.selectedLanguage);
    this.applyLanguage(this.selectedLanguage);
  }

  applyLanguage(lang: string) {
    this.translate.use(lang)
  }
}
