// src/app/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5199/api/Users';

  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public loggedIn$ = this.loggedInSubject.asObservable();


  constructor(private http: HttpClient) {}

  login(payload: LoginPayload): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/login`, payload, { responseType: 'text' as 'json' }).pipe(
      tap((token: string) => {
        localStorage.setItem('jwt_token', token);
        this.loggedInSubject.next(true); // Emit logged-in status
      })
    );
  }
  

  logout(): void {
    localStorage.removeItem('jwt_token');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt_token');
    return token !== null;
  }

  signup(payload: SignupPayload): Observable<any> {
    return this.http.post(this.baseUrl, payload);
  }
}
