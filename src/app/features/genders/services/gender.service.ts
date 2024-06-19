import { Injectable } from '@angular/core';
import { GenderDto } from '../models/gender';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

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

  create = (gender: GenderDto) => {
    return this.http.post<GenderDto>(this.apiUrl, gender);
  }

  getGenderById = (genderId: string): Observable<GenderDto> => this.http.get<GenderDto>(`${this.apiUrl}/${genderId}`);
}
