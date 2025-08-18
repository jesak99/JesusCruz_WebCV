import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[fadeTranslate]',
  standalone: true
})
export class FadeTranslateDirective implements OnDestroy {
  private sub!: Subscription;
  private _key!: string;

  constructor(
    private el: ElementRef<HTMLElement>,
    private translate: TranslateService
  ) {
    this.sub = this.translate.onLangChange.subscribe(() => this.updateText());
  }

  @Input('fadeTranslate')
  set key(value: string) {
    if (value !== this._key) {
      this._key = value;
      this.updateText();
    }
  }

  private updateText() {
    if (!this._key) return;

    const element = this.el.nativeElement;

    // Configuración de transición para el parpadeo
    element.style.transition = 'opacity 0.3s ease-in-out';
    element.style.opacity = '0';

    // Esperamos un poco antes de mostrar la nueva traducción
    setTimeout(() => {
      this.translate.get(this._key).subscribe((res: string) => {
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
          element.placeholder = res;
        } else {
          element.innerHTML = res;
        }
        // Fade-in
        void element.offsetWidth; // forzar reflow
        element.style.opacity = '1';
      });
    }, 300); // Duración del fade-out
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
