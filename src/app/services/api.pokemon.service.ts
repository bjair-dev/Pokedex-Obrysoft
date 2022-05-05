import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class pokemonService {
  URL_BACKEND = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}

  getPokemon(idPokemon: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('purple_token')
    );

    return this.http.get<any>(this.URL_BACKEND + `pokemon/${idPokemon}`, {
      headers: headers,
    });
  }

  getInfoPokemon(idPokemon: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('purple_token')
    );

    return this.http.get<any>(this.URL_BACKEND + `pokemon-species/${idPokemon}`, {
      headers: headers,
    });
  }
}
