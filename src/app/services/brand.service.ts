import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Brand {
  uuid?: string;
  name: string;
  deleted: boolean;
}

@Injectable({
  providedIn: 'root' // <-- FONDAMENTALE: dice ad Angular di creare una sola istanza del service
})
export class BrandService {
  private apiUrl = 'http://localhost:8080/fitcheck-api/api/brand';

  constructor(private http: HttpClient) { }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl);
  }

  addBrand(brand: { name: string }): Observable<Brand> {
    return this.http.post<Brand>(this.apiUrl, brand);
  }

  deleteBrand(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
