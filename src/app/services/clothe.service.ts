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
  compositionUuid: string;
  brandName?: string;
  categoryName?: string;
  sizeName?: string;
  compositionName?: string;
}

@Injectable({ providedIn: 'root' })
export class ClotheService {
  private apiUrl = 'http://localhost:8080/fitcheck-api/api/clothes';

  constructor(private http: HttpClient) { }

  getClothes(): Observable<Clothe[]> {
    return this.http.get<Clothe[]>(this.apiUrl);
  }

saveClothe(clothe: any, image: File | null): Observable<any> {
    const formData = new FormData();

    console.log('clothe' + JSON.stringify(clothe))

    // Pulizia undefined per evitare stringhe "undefined"
    const cleanClothe = {
      ...clothe,
      brandUuid: clothe.brandUuid || null,
      categoryUuid: clothe.categoryUuid || null,
      sizeUuid: clothe.sizeUuid || null,
      compositionUuid: clothe.compositionUuid || null
    };

    formData.append('clothe', JSON.stringify(cleanClothe));
    if (image) {
      formData.append('image', image);
    }

      console.log('clothe' + JSON.stringify(cleanClothe))

    return this.http.post(this.apiUrl, formData);
  }

  deleteClothe(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
