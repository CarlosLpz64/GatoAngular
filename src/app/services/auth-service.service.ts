import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any>{
    const url = environment.baseURL + '/login';
    return this.http.post<any>(url, data);
  }
  
  signup(data: any): Observable<any>{
    const url = environment.baseURL + '/register';
    return this.http.post<any>(url, data);
  }
}
