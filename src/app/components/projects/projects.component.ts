import { Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { FadeTranslateDirective } from '../../directives/fade-translate.directive';
import { Subscription } from 'rxjs';
import { ProjectsService } from '../../services/projects.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [AnimateOnScrollDirective, CommonModule, FadeTranslateDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnDestroy{
  projects: any[] = [];
  private sub!: Subscription;

  constructor(
    private projectsService: ProjectsService,
    private translate: TranslateService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.loadProjects();

    // Suscribirse a cambios de idioma
    this.sub = this.translate.onLangChange.subscribe(() => {
      this.fadeOutIn();
    });
  }

  loadProjects() {
    this.projects = this.projectsService.getProjects();
  }

  private fadeOutIn() {
    const container = this.el.nativeElement.querySelector('.projects-container');

    // Fade out
    this.renderer.setStyle(container, 'transition', 'opacity 0.3s ease-in-out');
    this.renderer.setStyle(container, 'opacity', '0');

    setTimeout(() => {
      // Cargar nuevos proyectos
      this.loadProjects();

      // Forzar reflow
      void container.offsetWidth;

      // Fade in
      this.renderer.setStyle(container, 'opacity', '1');
    }, 300);
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
