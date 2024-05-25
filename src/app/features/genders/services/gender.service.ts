import { Injectable } from '@angular/core';
import { GenderDto } from '../models/gender';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor() { }

  getAll = (): GenderDto[] => {
    return [{
      id: 1,
      name: 'Drama'
    }];
  };
}
