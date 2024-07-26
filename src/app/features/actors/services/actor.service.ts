import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { ActorDto } from '../models/actor-dto';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private apiUrl = environment.apiUrl + 'actors';

  constructor(private http: HttpClient) { }

  getAll = (page: number, itemsToShowAmount: number): Observable<any> => {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', itemsToShowAmount.toString());
    return this.http.get<any>(this.apiUrl, { observe: 'response', params}); 
  };

  getById = (id: string): Observable<ActorDto> => this.http.get<ActorDto>(`${this.apiUrl}/${id}`);

  create = (actor: ActorDto) => this.http.post<ActorDto>(this.apiUrl, actor);

  update = (id:string,  actor: ActorDto): Observable<ActorDto> => this.http.put<ActorDto>(`${this.apiUrl}/${id}`, actor);

  delete = (id: string) => this.http.delete(`${this.apiUrl}/${id}`);
}
