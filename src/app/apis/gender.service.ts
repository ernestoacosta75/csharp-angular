import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { GenderDto } from '../types/gender/gender';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private apiUrl = environment.apiUrl + 'genders';

  constructor(private http: HttpClient) { }

  getAll = (page: number, itemsToShowAmount: number): Observable<any> => {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', itemsToShowAmount.toString());
    return this.http.get<any>(this.apiUrl, { observe: 'response', params}); 
  };

  getById = (id: string): Observable<GenderDto> => this.http.get<GenderDto>(`${this.apiUrl}/${id}`);

  create = (gender: GenderDto) => this.http.post<GenderDto>(this.apiUrl, gender);

  update = (id:string,  gender: GenderDto): Observable<GenderDto> => this.http.put<GenderDto>(`${this.apiUrl}/${id}`, gender);

  delete = (id: string) => this.http.delete(`${this.apiUrl}/${id}`);
}
