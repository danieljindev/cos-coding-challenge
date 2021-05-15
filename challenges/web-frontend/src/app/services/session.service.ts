import { Injectable } from '@angular/core';
import { CookieOptions, CookieService } from 'ngx-cookie';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private SESSION_KEY = 'SESSION_KEY';
  private session$: BehaviorSubject<LoginDTO> = new BehaviorSubject(null);

  constructor(private cookieService: CookieService) {
    try {
      const sessionFromCookie = this.cookieService.get(this.SESSION_KEY);
      if (!!sessionFromCookie) {
        this.session$.next(JSON.parse(sessionFromCookie));
      }
    } catch (error) {
      console.error('Failed to load session from cookie', error);
    }
  }

  getSession() {
    return this.session$.asObservable();
  }

  clearSession() {
    this.session$.next(null);
    this.cookieService.remove(this.SESSION_KEY);
  }

  setSession(session: LoginDTO) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const options: CookieOptions = {
      path: '',
      domain: '',
      expires: tomorrow,
      secure: false,
      httpOnly: false,
      sameSite: 'lax',
      storeUnencoded: true
    };

    this.cookieService.put(this.SESSION_KEY, JSON.stringify(session), options);
    this.session$.next(session);
  }
}
