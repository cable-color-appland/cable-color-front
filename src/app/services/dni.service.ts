import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { debounceTime, map, catchError, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { EndpointsServices } from '../const/endpoints';
import { environment } from '@environments/environment';
import { SessionService } from './session.service';

@Injectable({ providedIn: 'root' })
export class DniValidatorService {
    private headers: { [key: string]: string } = {};
    private readonly url = environment.apiUrl;
    private token: string | null = null;
  constructor(private http: HttpClient , private readonly sessionService: SessionService) {}

  private setHeaders() {
    this.headers['Content-Type'] = 'application/json';
    this.token = this.sessionService.getToken();
    if (this.token) {
      this.headers['Authorization'] = `Bearer ${this.token}`;
    }
  }

    private createHeaders(): HttpHeaders {
      this.setHeaders();
      return new HttpHeaders({ ...this.headers });
    }

  checkDniExists(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value || control.value <= 8) {
        return of(null);
      }
      return of(control.value).pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((dni) => 
          this.http.get<boolean>(`${this.url}/${EndpointsServices.USERS}/GetByDni/${dni}`,{headers: this.createHeaders()}).pipe(
            map((exists) => (exists ? { dniExists: true } : null)),
            catchError(() => of(null))
          )
        )
      );
    };
  }
}
