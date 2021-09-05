import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  async login(user: any){
    const result = await this.http.post<any>(`${environment.api}/users/login`, user).toPromise();
    if(result && result.access_token){
      window.localStorage.setItem('token', result.access_token);
      return true;
    }

    return false;
  }

  getAuthorizationToken(){
    const token = window.localStorage.getItem('token');
    return token;
  }
}
