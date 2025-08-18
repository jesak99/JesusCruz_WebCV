import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { FadeTranslateDirective } from '../../directives/fade-translate.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AnimateOnScrollDirective, CommonModule, FadeTranslateDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  downloadCV(lang: string) {
    let filePath = '';
    if (lang === 'es') {
      filePath = 'assets/docs/JesusCruzMorales_FullStack_BI_ES.pdf';
    } else {
      filePath = 'assets/docs/JesusCruzMorales_FullStack_BI_EN.pdf';
    }
    window.open(filePath, '_blank');
    this.menuOpen = false;
  }
}
