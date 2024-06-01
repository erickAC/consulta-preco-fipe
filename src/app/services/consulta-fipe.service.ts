import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultaFipeService {

  private url = "https://brasilapi.com.br";

  constructor(private httpClient: HttpClient) { }

  getCódigo(codigo: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.url}/api/fipe/preco/v1/${codigo}`);
  }

}
