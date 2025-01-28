import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly TOKEN_KEY = 'Token';
  private userData: any = null;
  private token: string | null = null;

  constructor(private readonly router: Router) {}

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired(token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem(this.TOKEN_KEY);
      if (!this.token) {
        this.logout();
      }
    }
    return this.token;
  }

  saveToken(token: string): void {
    this.token = token;
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.token = null;
    this.clearUserData();
    this.router.navigate(['/login']);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  }

  public getUserData(): any {
    if (!this.userData) {
      if (!this.token) {
        this.token = localStorage.getItem(this.TOKEN_KEY);
      } else if (this.token) {
        const decoded: any = jwtDecode(this.token);
        this.userData = decoded ?? null;
      } else {
        this.logout();
      }
    }
    return this.userData;
  }

  public getUserField(field: string): any {
    const user = this.getUserData();
    return user ? user[field] : null;
  }

  private clearUserData(): void {
    this.userData = null;
    this.token = null;
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}
