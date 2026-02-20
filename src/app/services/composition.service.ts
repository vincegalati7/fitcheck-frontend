import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Composition {
  uuid?: string;      // Allineato all'uso degli UUID del backend
  name: string;
  deleted?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CompositionService {
  // Assicurati che l'URL corrisponda al tuo endpoint Quarkus
  private apiUrl = 'http://localhost:8080/fitcheck-api/api/composition';

  constructor(private http: HttpClient) { }

  getCompositions(): Observable<Composition[]> {
    return this.http.get<Composition[]>(this.apiUrl);
  }

  saveComposition(composition: Composition): Observable<Composition> {
    return this.http.post<Composition>(this.apiUrl, composition);
  }

  deleteComposition(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${uuid}`);
  }
}
