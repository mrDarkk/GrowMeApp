import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  log(message?: any, ...optionalParams: any[]) {
    if (!environment.production)
      console.log(message, optionalParams);
  }
}
