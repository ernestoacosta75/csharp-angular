import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import * as R from 'ramda';
import { formatDate } from '@shared/utilities/common-utils';
import { ActorDto } from '../types/actor/actor-dto';

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

  create = (actor: ActorDto) => {
    const formData = this.buildFormData(actor);
    return this.http.post<ActorDto>(this.apiUrl, formData);
  }

  update = (id:string,  actor: ActorDto): Observable<ActorDto> => {
    const formData = this.buildFormData(actor);
    return this.http.put<ActorDto>(`${this.apiUrl}/${id}`, formData);
  }

  delete = (id: string) => this.http.delete(`${this.apiUrl}/${id}`);

  private buildFormData = (actor: ActorDto): FormData => {
    const formData = new FormData();
    formData.append('name', R.path(['name'], actor));

    if(actor.biography) {
      formData.append('biography', R.path(['biography'], actor));
    }

    if(actor.dateOfBirth) {
      formData.append('dateOfBirth', formatDate(R.path(['dateOfBirth'], actor)));
    }

    if (actor.picture instanceof File) {
      formData.append('picture', actor.picture);
    }
    else if(typeof actor.picture === 'string') {
      formData.append('picture', null);
    }
    
    return formData;
  }
}
