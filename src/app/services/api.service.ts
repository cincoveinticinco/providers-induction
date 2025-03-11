import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

/** Environments */
import { environment } from "../../environment/environment";

/** Interfaces */
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpClient: HttpClient;
  protected apiUrl = environment.apiUrl;

  constructor(
    protected injector: Injector
  ) {
    this.httpClient = injector.get(HttpClient);
  }

  get<T>(path: string, options: { [param: string]: unknown } = {}): Observable<T> {
    return this.httpClient.get<T>(`${this.apiUrl}${path}`, options);
  }

  post<T>(path: string, body: any, options: { [param: string]: unknown } = {}): Observable<T> {
    return this.httpClient.post<T>(`${this.apiUrl}${path}`, body, options);
  }
  
}