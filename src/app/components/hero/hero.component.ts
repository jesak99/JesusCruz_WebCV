import { Component } from '@angular/core';
import { FadeTranslateDirective } from '../../directives/fade-translate.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [FadeTranslateDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

}
