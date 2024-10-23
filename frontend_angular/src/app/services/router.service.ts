import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  private baseUrl = 'http://127.0.0.1:8000/checks/router';  // URL de votre API Django
  private ApiUrl = 'http://127.0.0.1:8000/config';  // URL de votre API Django
  private logsUrl = 'http://127.0.0.1:8000/logs/logs/all/';  // URL for logs API

  constructor(private http: HttpClient) { }

  getRouterR4(): Observable<any> {
    return this.http.get(`${this.baseUrl}/r4/`);
  }
  getRouterR3(): Observable<any> {
    return this.http.get(`${this.baseUrl}/r3/`);
  }
  getRouterR2(): Observable<any> {
    return this.http.get(`${this.baseUrl}/r2/`);
  }
  getRouterR1(): Observable<any> {
    return this.http.get(`${this.baseUrl}/r1/`);
  }

  getInterfacesBriefJ1():Observable<any>  {
    return this.http.get(`${this.baseUrl}/j1/`);
  }
  getInterfacesBriefJ2() :Observable<any> {
    return this.http.get(`${this.baseUrl}/j2/`);
  }
  getInterfacesBriefJ3() :Observable<any> {
    return this.http.get(`${this.baseUrl}/j3/`);
  }
  getInterfacesBriefJ4():Observable<any>  {
    return this.http.get(`${this.baseUrl}/j4/`);
  }
//vrf test
  getVrfJ1():Observable<any>  {
    return this.http.get(`${this.baseUrl}/j1/vrf/`);
  }
  getVrfJ2() :Observable<any> {
    return this.http.get(`${this.baseUrl}/j2/vrf/`);
  }
  getVrfJ3() :Observable<any> {
    return this.http.get(`${this.baseUrl}/j3/vrf/`);
  }
  getVrfJ4():Observable<any>  {
    return this.http.get(`${this.baseUrl}/j4/vrf/`);
  }
  //mpls test
  getMplsJ1():Observable<any>  {
    return this.http.get(`${this.baseUrl}/j1/mpls/`);
  }
  getMplsJ2() :Observable<any> {
    return this.http.get(`${this.baseUrl}/j2/mpls/`);
  }
  getMplsJ3() :Observable<any> {
    return this.http.get(`${this.baseUrl}/j3/mpls/`);
  }
  getMplsJ4():Observable<any>  {
    return this.http.get(`${this.baseUrl}/j4/mpls/`);
  }
//  ospf test
  getOspfJ1():Observable<any>  {
    return this.http.get(`${this.baseUrl}/j1/ospf/`);
  }
  getOspfJ2() :Observable<any> {
    return this.http.get(`${this.baseUrl}/j2/ospf/`);
  }
  getOspfJ3() :Observable<any> {
    return this.http.get(`${this.baseUrl}/j3/ospf/`);
  }
  getOspfJ4():Observable<any>  {
    return this.http.get(`${this.baseUrl}/j4/ospf/`);
  }
  //bgp test
  getBgpJ1():Observable<any>  {
    return this.http.get(`${this.baseUrl}/j1/bgp/`);
  }
  getBgpJ2() :Observable<any> {
    return this.http.get(`${this.baseUrl}/j2/bgp/`);
  }
  getBgpJ3() :Observable<any> {
    return this.http.get(`${this.baseUrl}/j3/bgp/`);
  }
  getBgpJ4():Observable<any>  {
    return this.http.get(`${this.baseUrl}/j4/bgp/`);
  }
  //cpu test
  getCpuJ1():Observable<any>  {
    return this.http.get(`${this.baseUrl}/j1/sp/`);
  }
  getCpuJ2() :Observable<any> {
    return this.http.get(`${this.baseUrl}/j2/sp/`);
  }
  getCpuJ3() :Observable<any> {
    return this.http.get(`${this.baseUrl}/j3/sp/`);
  }
  getCpuJ4():Observable<any>  {
    return this.http.get(`${this.baseUrl}/j4/sp/`);
  }
    //memo test
    getMemoJ1():Observable<any>  {
      return this.http.get(`${this.baseUrl}/j1/sm/`);
    }
    getMemoJ2() :Observable<any> {
      return this.http.get(`${this.baseUrl}/j2/sm/`);
    }
    getMemoJ3() :Observable<any> {
      return this.http.get(`${this.baseUrl}/j3/sm/`);
    }
    getMemoJ4():Observable<any>  {
      return this.http.get(`${this.baseUrl}/j4/sm/`);
    }
    //disk test
    getDiskJ1():Observable<any>  {
      return this.http.get(`${this.baseUrl}/j1/ss/`);
    }
    getDiskJ2() :Observable<any> {
      return this.http.get(`${this.baseUrl}/j2/ss/`);
    }
    getDiskJ3() :Observable<any> {
      return this.http.get(`${this.baseUrl}/j3/ss/`);
    }
    getDiskJ4():Observable<any>  {
      return this.http.get(`${this.baseUrl}/j4/ss/`);
    }
    getComparaisonResult(routerId: string): Observable<any> {
      return this.http.get<any>(`${this.ApiUrl}/${routerId}/`);
    }
    getAllLogs(): Observable<any[]> {
      return this.http.get<any[]>(`${this.logsUrl}`);
  }

}
