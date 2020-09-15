import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NumberResult } from '../models/number-result.model';
import { NbToastrService, NbPosition } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class NumberApiService {

  baseUrl: string = 'https://localhost:5001/api/number/';
  errorMessage: string = '';
  tryCount: number = -1;

  constructor(public toastrService: NbToastrService, private _client: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 
  
  resetNumber(userNumber: number): Observable<NumberResult>{
    this.tryCount = 0;
    return this._client.get<NumberResult>(this.baseUrl + userNumber)
    .pipe(
      catchError(resetError => {
        if(resetError.error instanceof ErrorEvent) {
          // Get client-side error
          this.errorMessage = resetError.error.message;
        } else {
            console.log(resetError.error.try);
            if(resetError.error == 'Try again') 
              this.toastrService.show('Number successfully generated', 'Good luck :)');
              return throwError(resetError) //Bug avec :  return of(resetError)
          }
      })
    )
  }

  getNumberResult(userNumber: number): Observable<NumberResult>{ 
    this.tryCount++;   
    return this._client.get<NumberResult>(this.baseUrl + userNumber)
    .pipe(
      catchError(error => {
        if(error.error instanceof ErrorEvent) {
          // Get client-side error
          this.errorMessage = error.error.message;
        } else {
            console.log(error.error.try);
            // this.errorMessage = `Try : ${error.error.try} \n Searched number is ${error.error.result}`;
            if (error.status == 400)
              this.toastrService.warning(`No more tries, press "GENERATE NEW NUMBER" to ${error.error}`);              
            else if(this.tryCount > 0)
              this.toastrService.show(`Searched number is ${error.error.result}`, `Try : ${error.error.try}`);
            return throwError(error); //Bug avec :  return of(error)
          }       
      })
    )
  }
}