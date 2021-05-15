import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sha512 } from 'js-sha512';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient.put<LoginDTO>(
      `${environment.api_url}/api/v1/authentication/${email}`,
      {
        password: this.hashPass(password)
      }
    );
  }

  private hashPass(password: string, count: number = 0): string {
    if (count === 5) {
      return password;
    }
    return this.hashPass(sha512(password), count + 1);
  }
}
