import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginRequest } from 'src/app/models/interfaces/user/login-request.interface';
import { AuthResponse } from 'src/app/models/interfaces/user/auth-response.interface';

import { environment } from 'src/environments/environments.prod';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginWithGoogle() {
    throw new Error('Method not implemented.');
  }
  private authToken$ = new BehaviorSubject<string | null>(null);
  authToken = this.authToken$.asObservable();

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) {

    const token = this.cookieService.get('authToken');
    if (token) {
      this.authToken$.next(token);
    }
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.get('authToken');
    return !!token; // Retorna true se o token existir, false caso contrário
  }

  login(loginData: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth`, loginData).pipe(
      map((response: AuthResponse) => {

        this.cookieService.put('authToken', response.token);
        this.authToken$.next(response.token);
        return response;
      })
    );
  }

  logout(): void {
    // Remova o token JWT do cookie
    this.cookieService.remove('authToken');
    this.authToken$.next(null);
  }
}
