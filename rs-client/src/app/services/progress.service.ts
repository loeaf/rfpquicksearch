import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  @Output() ProgressEmmit: EventEmitter<any> = new EventEmitter();
  constructor() { }
}
