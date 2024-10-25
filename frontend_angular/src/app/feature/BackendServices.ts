import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendServices {
// don't repeat urself  , if we are using the same url , just affect it to a variable and then just call that variable
  constructor(private http: HttpClient) { }


configureRouter(data: any): Observable<any> {
    const url = 'http://127.0.0.1:8000/myapp/configure-router/';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Adjust this as needed
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(url, data, { headers });
  }

  // GET all configurations
getAllConfigurations(): Observable<any> {
    const url = 'http://127.0.0.1:8000/myapp/get-configure-router/';
    return this.http.get<any>(url);
  }

  // GET configuration by ID
getConfigurationById(id: number): Observable<any> {
    const url = `http://127.0.0.1:8000/myapp/configure-router/?id=${id}`;
    return this.http.get<any>(url);
  }

  // DELETE API
deleteConfiguration(key: number): Observable<any> {
    const url = `http://127.0.0.1:8000/myapp/configure-router/delete/${key}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Adjust this as needed
      'Content-Type': 'application/json'
    });
    return this.http.delete<any>(url, { headers });
  }

getAllNetworkConfigurations(): Observable<any[]> {
    const url = 'http://127.0.0.1:8000/myapp/network-config/all/';

    return this.http.get<any[]>(url);
  }
deleteNetworkConfiguration(id: number): Observable<any> {
    const url = `http://127.0.0.1:8000/myapp/delete-router-config/${id}/`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Adjust this as needed
      'Content-Type': 'application/json'
    });
    return this.http.delete<any>(url, { headers });
  }
Networkconfiguration(data: any): Observable<any> {
    const url = 'http://127.0.0.1:8000/myapp/my-form/';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(url, data, { headers });
}
getRouterConfigData(id: number): Observable<any> {
  const url = `http://127.0.0.1:8000/myapp/router/${id}/`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Adjust this as needed
    'Content-Type': 'application/json'
  });
  return this.http.post<any>(url,{ headers });
}

// Store token in local storage upon successful login
setToken(token: string) {
  localStorage.setItem('token', token);
}

// Check if user is logged in
isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}

// Clear token from local storage upon logout
logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('access_token');
}

signup(username: string, email: string, password1: string, password2: string): Observable<any> {
  const url = 'http://127.0.0.1:8000/myapp/signup/';
  const data = {
    username: username,
    email: email,
    password1: password1,
    password2: password2
  };
  return this.http.post<any>(url, data);
}


}
