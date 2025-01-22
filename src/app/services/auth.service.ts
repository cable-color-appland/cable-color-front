import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'Token';
  private userData: any = null;

  constructor(private readonly router: Router) {}

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.setUserData(token);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
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
  private setUserData(token: string): void {
    try {
      const decoded: any = jwtDecode(token);
      sessionStorage.setItem('userData', JSON.stringify(decoded));
    } catch (error) {}
  }

  public getUserData(): any {
    if (!this.userData) {
      const data = sessionStorage.getItem('userData');
      this.userData = data ? JSON.parse(data) : null;
    }
    return this.userData;
  }

  public getUserField(field: string): any {
    const user = this.getUserData();
    return user ? user[field] : null;
  }

  private clearUserData(): void {
    this.userData = null;
    sessionStorage.removeItem('userData');
  }
}
