import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { FadeTranslateDirective } from '../../directives/fade-translate.directive';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    AnimateOnScrollDirective,
    CommonModule,
    ReactiveFormsModule,
    FadeTranslateDirective,
    TranslateModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'translateY(10px)' })
        ),
      ]),
    ]),
  ],
})
export class ContactComponent {
  formData = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    mensaje: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
    oculto: ['']
  })
  enviando = false;

  toast = {
    mostrar: false,
    mensaje: '',
    tipo: '' as 'success' | 'error',
  };

  constructor(private fb: FormBuilder, private http: HttpClient, private translate: TranslateService) {}

  enviarFormulario() {
    if (this.formData.get('oculto')?.value?.trim() !== '') {
      return;
    }

    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }

    this.enviando = true;

    const url = 'https://script.google.com/macros/s/AKfycbz6sXAXe0emaQEDAyXKb4hDNVsol4n09kG9H6XHCK_FxOJXQOxFHlRdWtbtmKD83JPI/exec'

    const formData = new FormData();
    formData.append('nombre', this.formData.value.nombre || '');
    formData.append('email', this.formData.value.email || '');
    formData.append('mensaje', this.formData.value.mensaje || '');

    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(() => {
      this.enviando = false;
      this.formData.reset();
      const mensaje = this.translate.instant('CONTACT.SUCCESS');
      this.mostrarToast(mensaje, 'success');
    })
    .catch(() => {
      this.enviando = false;
      const mensaje = this.translate.instant('CONTACT.ERROR');
      this.mostrarToast(mensaje, 'error');
     });
  }

  mostrarToast(mensaje: string, tipo: 'success' | 'error') {
    this.toast.mensaje = mensaje;
    this.toast.tipo = tipo;
    this.toast.mostrar = true;
    setTimeout(() => (this.toast.mostrar = false), 3000);
  }

  cerrarToast() {
    this.toast.mostrar = false;
  }
}
