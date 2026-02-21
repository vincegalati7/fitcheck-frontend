import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Size {
  uuid?: string;
  name: string;
  deleted?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  private apiUrl = 'http://localhost:8080/fitcheck-api/api/size'; // Assicurati che l'API sia questa

  constructor(private http: HttpClient) { }

  getSizes(): Observable<Size[]> {
    return this.http.get<Size[]>(this.apiUrl);
  }

  addSize(size: Size): Observable<Size> {
    return this.http.post<Size>(this.apiUrl, size);
  }

  deleteSize(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
