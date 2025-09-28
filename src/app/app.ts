import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { TooltipValidatorDirective } from './directives/tooltip-validator';
import { SearchPipe } from './pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Book } from './data/book';
import { MOCK_BOOKS } from './data/mock-books';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TooltipValidatorDirective,
    TranslateModule,
    SearchPipe,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  title = signal('Tooltip Validator Demo');

  onlyArabicRegex: RegExp = /^[\u0600-\u06FF\s]*$/;
  onlyEnglishRegex: RegExp = /^[a-zA-Z\s]*$/;
  emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  ageRegex: RegExp = /^(?:1[89]|[2-9]\d|1[01]\d|50)$/;
  books: Book[] = MOCK_BOOKS;
  searchTerm: string = '';

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  get onlyArabicMsg() {
    return this.translate.instant('ONLY_ARABIC');
  }
  get onlyLettersMsg() {
    return this.translate.instant('ONLY_LETTERS');
  }
  get invalidEmailMsg() {
    return this.translate.instant('INVALID_EMAIL');
  }
  get invalidAgeMsg() {
    return this.translate.instant('INVALID_AGE');
  }

  submitForm(arName: string, enName: string, email: string, age: string) {
    if (!this.onlyArabicRegex.test(arName)) {
      alert(this.onlyArabicMsg);
      return;
    }
    if (!this.onlyEnglishRegex.test(enName)) {
      alert(this.onlyLettersMsg);
      return;
    }
    if (!this.emailRegex.test(email)) {
      alert(this.invalidEmailMsg);
      return;
    }
    if (!this.ageRegex.test(age)) {
      alert(this.invalidAgeMsg);
      return;
    }

    alert(
      ` Submitted!\nArabic Name: ${arName}\nEnglish Name: ${enName}\nEmail: ${email}\nAge: ${age}`
    );
  }
}
