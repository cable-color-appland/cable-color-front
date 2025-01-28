import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private headers: { [key: string]: string } = {};
  private readonly url = environment.apiUrl;

  constructor(private readonly http: HttpClient) {
    this.headers['Content-Type'] = 'application/json';
    const token = localStorage.getItem('Token');
    if (token) {
      this.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  public setCustomHeader(customHeaders: { [key: string]: string } = {}): void {
    this.headers = { ...this.headers, ...customHeaders };
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({ ...this.headers });
  }

  public async get<T>(path: string, params?: HttpParams): Promise<T> {
    return await lastValueFrom(
      this.http.get<T>(`${this.url}/${path}`, {
        params,
        headers: this.createHeaders(),
      })
    ).catch(this.handleError);
  }

  public async post<T>(path: string, data: any): Promise<T> {
    return await lastValueFrom(
      this.http.post<T>(`${this.url}/${path}`, data, {
        headers: this.createHeaders(),
      })
    ).catch(this.handleError);
  }

  public async put<T>(path: string, data: any): Promise<T> {
    return await lastValueFrom(
      this.http.put<T>(`${this.url}/${path}`, data, {
        headers: this.createHeaders(),
      })
    ).catch(this.handleError);
  }

  public async patch<T>(path: string, data: any): Promise<T> {
    return await lastValueFrom(
      this.http.patch<T>(`${this.url}/${path}`, data, {
        headers: this.createHeaders(),
      })
    ).catch(this.handleError);
  }

  public async delete<T>(path: string, data?: any): Promise<T> {
    const options = {
      headers: this.createHeaders(),
      body: data,
    };

    return await lastValueFrom(
      this.http.delete<T>(`${this.url}/${path}`, options)
    ).catch(this.handleError);
  }

  private handleError(error: HttpErrorResponse): Promise<never> {
    return Promise.reject(error);
  }

  public downloadExcel(path: string): Observable<Blob> {
    return this.http.get(`${this.url}/${path}`, {
      responseType: 'blob',
      headers: this.createHeaders(),
    });
  }
  public async patchQueryString<T>(path: string, data: any): Promise<T> {
    const params = new HttpParams({ fromObject: data });
    return await lastValueFrom(
      this.http.post<T>(`${this.url}/${path}`, null, {
        headers: this.createHeaders(),
        params: params,
        responseType: 'json',
      })
    ).catch(this.handleError);
  }
}
