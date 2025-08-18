import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { projectsEn, projectsEs } from '../data/projects.data';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  constructor(private translate: TranslateService) {}

  getProjects() {
    const lang = this.translate.currentLang || this.translate.getDefaultLang();
    return lang === 'es' ? projectsEs : projectsEn;
  }
}
