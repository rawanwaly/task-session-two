import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { TooltipValidatorDirective } from './directives/tooltip-validator';
import { SearchPipe } from './pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TooltipValidatorDirective, TranslateModule, SearchPipe, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = signal('task-session-two');

  onlyLettersRegex: RegExp = /^[a-zA-Z]*$/;
  emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  books = [
    { title: 'Angular Basics', author: 'John Doe', genre: 'Programming' },
    { title: 'Learning TypeScript', author: 'Jane Smith', genre: 'Programming' },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Novel' }
  ];
  searchTerm: string = '';

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
  }

  switchLang(lang: string) { this.translate.use(lang); }

  get onlyLettersMsg() { return this.translate.instant('ONLY_LETTERS'); }
  get invalidEmailMsg() { return this.translate.instant('INVALID_EMAIL'); }

  submitForm(name: string, email: string) {
    if (!this.onlyLettersRegex.test(name)) {
      alert(this.onlyLettersMsg); return;
    }
    if (!this.emailRegex.test(email)) {
      alert(this.invalidEmailMsg); return;
    }
    alert(`Submitted!\nName: ${name}\nEmail: ${email}`);
  }
}
