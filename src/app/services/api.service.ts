import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UtilsService } from 'src/app/services/utils.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private headers: { [key: string]: string } = {};
  private readonly url = environment.apiUrl;
  private token: string | null = null;
  private readonly cacheDuration = environment.cacheDuration;

  constructor(
    private readonly http: HttpClient,
    private readonly sessionService: SessionService,
    private readonly loadingService: UtilsService
  ) {}

  private setHeaders() {
    this.headers['Content-Type'] = 'application/json';
    this.token = this.sessionService.getToken();
    if (this.token) {
      this.headers['Authorization'] = `Bearer ${this.token}`;
    }
  }

  public setCustomHeader(customHeaders: { [key: string]: string } = {}): void {
    this.headers = { ...this.headers, ...customHeaders };
  }

  private createHeaders(): HttpHeaders {
    this.setHeaders();
    return new HttpHeaders({ ...this.headers });
  }

  private async handleRequest<T>(request: Observable<T>): Promise<T> {
    this.loadingService.show();
    try {
      return await lastValueFrom(request);
    } catch (error) {
      return this.handleError(error);
    } finally {
      this.loadingService.hide();
    }
  }
  // public async get<T>(path: string, params?: HttpParams): Promise<T> {
  //   return this.handleRequest(
  //     this.http.get<T>(`${this.url}/${path}`, {
  //       params,
  //       headers: this.createHeaders(),
  //     })
  //   );
  // }

  private cache = new Map<string, { data: any; expiry: number }>();

  public async get<T>(
    path: string,
    useCache: boolean = false,
    params?: HttpParams
  ): Promise<T> {
    const cacheKey = this.generateCacheKey(path, params);

    if (useCache && this.cache.has(cacheKey)) {
      const cachedEntry = this.cache.get(cacheKey);
      if (cachedEntry && Date.now() < cachedEntry.expiry) {
        console.log('Cache hit:', cacheKey);
        return cachedEntry.data;
      } else {
        this.cache.delete(cacheKey);
      }
    }

    const response = await this.handleRequest(
      this.http.get<T>(`${this.url}/${path}`, {
        params,
        headers: this.createHeaders(),
      })
    );

    if (useCache) {
      this.cache.set(cacheKey, {
        data: response,
        expiry: Date.now() + this.cacheDuration,
      });
    }

    return response;
  }

  private generateCacheKey(path: string, params?: HttpParams): string {
    const paramString = params ? params.toString() : '';
    return `${path}?${paramString}`;
  }

  public async post<T>(path: string, data: any): Promise<T> {
    return this.handleRequest(
      this.http.post<T>(`${this.url}/${path}`, data, {
        headers: this.createHeaders(),
      })
    );
  }

  public async put<T>(path: string, data: any): Promise<T> {
    return this.handleRequest(
      this.http.put<T>(`${this.url}/${path}`, data, {
        headers: this.createHeaders(),
      })
    );
  }

  public async patch<T>(path: string, data: any): Promise<T> {
    return this.handleRequest(
      this.http.patch<T>(`${this.url}/${path}`, data, {
        headers: this.createHeaders(),
      })
    );
  }

  public async delete<T>(path: string, data?: any): Promise<T> {
    const options = {
      headers: this.createHeaders(),
      body: data,
    };

    return this.handleRequest(
      this.http.delete<T>(`${this.url}/${path}`, options)
    );
  }

  private handleError(error: any): Promise<never> {
    return Promise.reject(error);
  }
}
