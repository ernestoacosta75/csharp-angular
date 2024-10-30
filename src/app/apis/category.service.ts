import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { CategoryDto } from '../types/category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = environment.apiUrl + 'categories';

  constructor(private http: HttpClient) { }

  getAll = (page: number, itemsToShowAmount: number): Observable<any> => {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', itemsToShowAmount.toString());
    return this.http.get<any>(this.apiUrl, { observe: 'response', params}); 
  };

  getById = (id: string): Observable<CategoryDto> => this.http.get<CategoryDto>(`${this.apiUrl}/${id}`);

  create = (category: CategoryDto) => this.http.post<CategoryDto>(this.apiUrl, category);

  update = (id:string,  category: CategoryDto): Observable<CategoryDto> => this.http.put<CategoryDto>(`${this.apiUrl}/${id}`, category);

  delete = (id: string) => this.http.delete(`${this.apiUrl}/${id}`);
}
