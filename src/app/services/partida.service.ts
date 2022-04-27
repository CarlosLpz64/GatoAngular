import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {

  constructor(private http: HttpClient, private cookie: CookieService) { }

  cargarPartida(id: string): Observable<any>{
    const url = environment.baseURL + '/partidas/' + id;
    const headers = { 'Authorization': ('Bearer ' + this.cookie.get("Token"))};
    return this.http.get<any>(url, {headers});
  }

  actualizarPartida(id: string, data: any): Observable<any>{
    const url = environment.baseURL + '/partidas/' + id;
    const headers = { 'Authorization': ('Bearer ' + this.cookie.get("Token"))};
    return this.http.put<any>(url, data, {headers});
  }

  actualizarGuest(id: string, data: any): Observable<any>{
    const url = environment.baseURL + '/actInvitado/' + id;
    const headers = { 'Authorization': ('Bearer ' + this.cookie.get("Token"))};
    return this.http.put<any>(url, data, {headers});
  }

  crearPartida(data: any): Observable<any>{
    const url = environment.baseURL + '/partidas';
    const headers = { 'Authorization': ('Bearer ' + this.cookie.get("Token"))};
    return this.http.post<any>(url, data, {headers});
  }


}
