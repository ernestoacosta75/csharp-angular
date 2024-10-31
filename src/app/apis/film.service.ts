import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import * as R from 'ramda';
import { base64ToFile, formatDate } from '@shared/utilities/common-utils';
import { FilmDto } from '@models/film/film-dto';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private apiUrl = environment.apiUrl + 'acfilmstors';

  constructor(private http: HttpClient) { }

  getAll = (page: number, itemsToShowAmount: number): Observable<any> => {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', itemsToShowAmount.toString());
    return this.http.get<any>(this.apiUrl, { observe: 'response', params}); 
  };

  getById = (id: string): Observable<FilmDto> => this.http.get<FilmDto>(`${this.apiUrl}/${id}`);

  create = (film: FilmDto, pictureName?: string) => {
    const formData = this.buildFormData(film, pictureName);

    return this.http.post<FilmDto>(this.apiUrl, formData);
  }

  update = (id:string,  film: FilmDto): Observable<FilmDto> => {
    const formData = this.buildFormData(film);

    return this.http.put<FilmDto>(`${this.apiUrl}/${id}`, formData);
  }

  delete = (id: string) => this.http.delete(`${this.apiUrl}/${id}`);

  private buildFormData = (film: FilmDto, pictureName?: string): FormData => {
    const formData = new FormData();
    
    formData.append('title', R.path(['title'], film));

    if(film.resume) {
      formData.append('resume', R.path(['resume'], film));
    }

    if(film.trailer) {
        formData.append('trailer', R.path(['trailer'], film));
      }

    if(film.onCinemas) {
        formData.append('onCinemas', film.onCinemas.toString());
    }

    if(film.releaseDate) {
      formData.append('releaseDate', formatDate(R.path(['releaseDate'], film)));
    }

    if (film.poster instanceof File) {
      formData.append('poster', film.poster);
    }
    else if(typeof film.poster === 'string' && film.poster.startsWith('data')) {
      formData.append('poster', base64ToFile(film.poster, pictureName));
    }
    else if(typeof film.poster === 'string') {
      formData.append('poster', null);
    }
    
    return formData;
  }
}
