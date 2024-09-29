import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { CinemaDto } from '../models/cinema-dto';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  private apiUrl = environment.apiUrl + 'cinemas';

  constructor(private http: HttpClient) { }

  getAll = (page: number, itemsToShowAmount: number): Observable<any> => {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', itemsToShowAmount.toString());
    return this.http.get<any>(this.apiUrl, { observe: 'response', params}); 
  };

  getById = (id: string): Observable<CinemaDto> => this.http.get<CinemaDto>(`${this.apiUrl}/${id}`);

  create = (cinema: CinemaDto) => this.http.post<CinemaDto>(this.apiUrl, cinema);

  update = (id:string,  cinema: CinemaDto): Observable<CinemaDto> => this.http.put<CinemaDto>(`${this.apiUrl}/${id}`, cinema);

  delete = (id: string) => this.http.delete(`${this.apiUrl}/${id}`);
}
