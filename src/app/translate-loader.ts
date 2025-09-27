import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export class TranslateHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient, private prefix: string = './assets/i18n/', private suffix: string = '.json') {}

  public getTranslation(lang: string): Observable<any> {
    return this.http.get(`${this.prefix}${lang}${this.suffix}`);
  }
}
