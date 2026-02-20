import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Clothe {
  uuid?: string;           // Cambiato da id a uuid
  description: string;     // Cambiato da name a description
  price: number;
  imagePath?: string | null;
  brandUuid: string;       // Cambiato da brandId
  categoryUuid: string;    // Cambiato da categoryId
  sizeUuid: string;        // Aggiunto perché presente nel tuo JSON
  brandName?: string;
  categoryName?: string;
  sizeName?: string;
}

@Injectable({ providedIn: 'root' })
export class ClotheService {
  private apiUrl = 'http://localhost:8080/fitcheck-api/api/clothes';

  constructor(private http: HttpClient) { }

  getClothes(): Observable<Clothe[]> {
    return this.http.get<Clothe[]>(this.apiUrl);
  }

  saveClothe(clothe: Clothe): Observable<Clothe> {
    return this.http.post<Clothe>(this.apiUrl, clothe);
  }

  deleteClothe(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
