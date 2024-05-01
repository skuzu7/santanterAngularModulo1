import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RegisterRequest } from 'src/app/models/interfaces/user/register-request.interface';
import { environment } from 'src/environments/environments.prod';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(requestData: RegisterRequest): Observable<RegisterRequest> {
    return this.http.post<RegisterRequest>(`${this.apiUrl}/user`, requestData).pipe(
      catchError((error) => {
        console.error('Erro ao cadastrar usuário:', error);
        return throwError(() => error);
      })
    );
  }
}