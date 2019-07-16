import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  id: number = 6;
  version: string = '1.0.0';
  zaman: string = '12.07.2019';

  constructor() { }
}
