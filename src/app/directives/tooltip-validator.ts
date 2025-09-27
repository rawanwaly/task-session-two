import { Directive, ElementRef, HostListener, Input, Renderer2, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appTooltipValidator]',
  standalone: true
})
export class TooltipValidatorDirective implements OnDestroy {
  @Input('appTooltipValidator') config!: { 
    message: string;    
    regex: RegExp; 
    preventInvalid?: boolean; 
  };

  private lastValidValue: string = '';
  private errorElement?: HTMLElement;
  private langChangeSub?: Subscription;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private translate: TranslateService
  ) {}

  @HostListener('input') onInput() {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const value = inputElement.value;

    if (!this.config.regex.test(value)) {
      this.showInvalid();
      if (this.config.preventInvalid) {
        inputElement.value = this.lastValidValue;
      }
    } else {
      this.lastValidValue = value;
      this.removeInvalid();
    }
  }

  @HostListener('blur') onBlur() {
    this.removeInvalid();
  }

  private showInvalid() {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    this.renderer.setStyle(inputElement, 'border', '2px solid red');
    const labelElement = inputElement.parentNode as HTMLElement;

    if (!this.errorElement && labelElement?.tagName === 'LABEL') {
      this.errorElement = this.renderer.createElement('span');
      this.renderer.setStyle(this.errorElement, 'color', 'red');
      this.renderer.setStyle(this.errorElement, 'fontSize', '12px');
      this.renderer.setStyle(this.errorElement, 'marginLeft', '8px');

      this.setTranslatedText();

      this.renderer.appendChild(labelElement, this.errorElement);
      this.langChangeSub = this.translate.onLangChange.subscribe(() => {
        this.setTranslatedText(true);
      });
    }
  }

  private setTranslatedText(clear: boolean = false) {
    if (!this.errorElement) return;
    if (clear) this.errorElement.textContent = ''; 
    const translated = this.translate.instant(this.config.message);
    this.errorElement.textContent = translated;
  }

  private removeInvalid() {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    this.renderer.removeStyle(inputElement, 'border');

    const labelElement = inputElement.parentNode as HTMLElement;
    if (this.errorElement && labelElement?.tagName === 'LABEL') {
      this.renderer.removeChild(labelElement, this.errorElement);
      this.errorElement = undefined;
    }

    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
      this.langChangeSub = undefined;
    }
  }

  ngOnDestroy() {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }
}
