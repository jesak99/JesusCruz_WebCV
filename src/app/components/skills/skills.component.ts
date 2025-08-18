import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { FadeTranslateDirective } from '../../directives/fade-translate.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective, FadeTranslateDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  @ViewChild('frontendTrack') frontendTrack!: ElementRef;
  @ViewChild('backendTrack') backendTrack!: ElementRef;
  @ViewChild('toolsTrack') toolsTrack!: ElementRef;

  frontendSkills = [
    { name: 'Angular', icon: 'assets/images/icons/angular-icon.svg' },
    { name: 'Tailwind', icon: 'assets/images/icons/tailwindcss-icon.svg' },
    { name: 'Bootstrap', icon: 'assets/images/icons/bootstrap-icon.svg' },
    { name: 'HTML 5', icon: 'assets/images/icons/html5-icon.svg' },
    { name: 'SCSS', icon: 'assets/images/icons/scss-icon.svg' },
  ];

  backendSkills = [
    { name: 'Node.js', icon: 'assets/images/icons/nodejs-icon.svg' },
    { name: '.Net', icon: 'assets/images/icons/dotnet-icon.svg' },
    { name: 'SQL Server', icon: 'assets/images/icons/sqlserver-icon.svg' },
    { name: 'Firebase', icon: 'assets/images/icons/firebase-icon.svg' },
    { name: 'Java', icon: 'assets/images/icons/java-icon.svg' },
    { name: 'MongoDB', icon: 'assets/images/icons/mongodb-icon.svg' },
    { name: 'Laravel', icon: 'assets/images/icons/laravel-icon.svg' },
  ];

  toolsSkills = [
    { name: 'Git', icon: 'assets/images/icons/git-icon.svg' },
    { name: 'Docker', icon: 'assets/images/icons/docker-icon.svg' },
    { name: 'VS Code', icon: 'assets/images/icons/vscode-icon.svg' },
    { name: 'VS', icon: 'assets/images/icons/visual-studio-icon.svg' },
    { name: 'Power BI', icon: 'assets/images/icons/powerbi-icon.svg' },
    { name: 'Qlik', icon: 'assets/images/icons/qlikview-icon.svg' },
  ];

  pauseCarousel(track: string) {
    let el: HTMLElement | null = null;
    if (track === 'frontend') el = this.frontendTrack?.nativeElement;
    if (track === 'backend') el = this.backendTrack?.nativeElement;
    if (track === 'tools') el = this.toolsTrack?.nativeElement;

    if (el) el.style.animationPlayState = 'paused';
  }

  resumeCarousel(track: string) {
    let el: HTMLElement | null = null;
    if (track === 'frontend') el = this.frontendTrack?.nativeElement;
    if (track === 'backend') el = this.backendTrack?.nativeElement;
    if (track === 'tools') el = this.toolsTrack?.nativeElement;

    if (el) el.style.animationPlayState = 'running';
  }
}
