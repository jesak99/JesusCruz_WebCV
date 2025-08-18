import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HeroComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    ProjectsComponent,
    SkillsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  //title = 'JesusCruz_WebCV';

  constructor(
    private translate: TranslateService,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.translate.onLangChange.subscribe(() => {
      this.setMetaTags();
    });
  }

  setMetaTags() {
    this.translate.get(['SEO.TITLE', 'SEO.DESCRIPTION']).subscribe(translations => {
      this.titleService.setTitle(translations['SEO.TITLE']);
      this.metaService.updateTag({ name: 'description', content: translations['SEO.DESCRIPTION'] });
    });
  }
}
