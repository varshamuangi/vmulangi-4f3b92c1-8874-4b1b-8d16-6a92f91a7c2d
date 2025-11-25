import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import {
  User,
  LoginResponse,
  RegisterRequest,
  LoginRequest,
} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Backend root URL — MUST NOT include /auth
  private readonly API_URL = 'http://localhost:3000';

  private readonly TOKEN_KEY = 'access_token';
  private readonly USER_KEY = 'current_user';

  currentUser = signal<User | null>(this.loadUser());
  isAuthenticated = computed(() => this.currentUser() !== null);

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Login user (demo OR database users)
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/auth/login`, credentials)
      .pipe(
        tap((response) => this.saveSession(response)),
        catchError((error) => throwError(() => error))
      );
  }

  /**
   * Register a DB user
   */
  register(payload: RegisterRequest): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/auth/register`, payload);
  }

  /**
   * Logout and clear localStorage
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Save session after successful login
   */
  private saveSession(auth: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, auth.access_token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(auth.user));
    this.currentUser.set(auth.user);
  }

  /**
   * Load user session from storage
   */
  private loadUser(): User | null {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? (JSON.parse(data) as User) : null;
  }

  /**
   * Check user roles easily
   */
  hasRole(roles: string[]): boolean {
    const user = this.currentUser();
    return user ? roles.includes(user.role) : false;
  }

  getUserDisplayName(): string {
    const u = this.currentUser();
    return u ? `${u.firstName} ${u.lastName}` : '';
  }

  getAuthHeader() {
  const token = this.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

}
