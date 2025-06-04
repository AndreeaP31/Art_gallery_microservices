import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppViewModel {
  private titleSubject = new BehaviorSubject<string>('Art Gallery');
  public title$: Observable<string> = this.titleSubject.asObservable();

  constructor(private translate: TranslateService) {
    // Set default language
    translate.setDefaultLang('en');
    
    // Use browser language if available, otherwise use English
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|fr|es/) ? browserLang : 'en');
  }

  /**
   * Switch the application language
   * @param language The language code to switch to
   */
  switchLanguage(language: string): void {
    this.translate.use(language);
  }

  /**
   * Set the application title
   * @param title The new title
   */
  setTitle(title: string): void {
    this.titleSubject.next(title);
  }
}