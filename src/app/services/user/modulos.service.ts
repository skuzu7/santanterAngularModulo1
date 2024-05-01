import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface SubModulo {
  id: string;
  Descricao: string;
}

interface Modulo {
  id: number;
  Descricao: string;
  subModulos: SubModulo[];
}

@Injectable({
  providedIn: 'root'
})
export class ModulosService {
  private endpointUrl = 'https://j71yi4eoc6.execute-api.sa-east-1.amazonaws.com/dev/impostograma/desafio/listarModulos';
  private headers = new HttpHeaders({'Authorization': 'RRwPrJsGdiwdWZ1CZj9srRtCdQ99LPeg'});

  constructor(private http: HttpClient) {}

  listarModulos(): Observable<Modulo[]> {
    return this.http.get<{statusCode: number, body: Modulo[]}>(this.endpointUrl, { headers: this.headers }).pipe(
      map(response => response.body), // Extrai a propriedade 'body' que contém a array de módulos
      catchError(error => {
        console.error('Erro ao obter módulos:', error);
        return throwError(() => error);
      })
    );
  }
}
