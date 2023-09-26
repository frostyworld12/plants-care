import { HttpClient } from  '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MakeRequest {
  constructor(
    private http: HttpClient,
  ) {}

  public post(url: string, params: any, headers: any): Observable<any> {
    return this.http.post(url, params, headers);
  }

  public get(url: string, params: any): Observable<any> {
    return this.http.get(url, {params: params});
  }
}