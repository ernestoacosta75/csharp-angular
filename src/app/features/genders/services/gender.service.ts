import { Injectable } from '@angular/core';
import { GenderDto } from '../models/gender';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private apiUrl = environment.apiUrl + 'genders';

  constructor(private http: HttpClient) { }

  getAll = (): Observable<GenderDto[]> => {
    return this.http.get<GenderDto[]>(this.apiUrl); 
  };

  create = (gender: GenderDto) => {
    return this.http.post<GenderDto>(this.apiUrl, gender);
  }
}