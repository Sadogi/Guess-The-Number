import { Component, OnInit } from '@angular/core';
import { NumberResult } from 'src/app/models/number-result.model';
import {WrongNumbers} from 'src/app/models/wrong-numbers.model'
import { NumberApiService } from 'src/app/services/number-api.service';
import { error } from '@angular/compiler/src/util';
import { retry } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-random-number',
  templateUrl: './random-number.component.html',
  styleUrls: ['./random-number.component.scss']
})
export class RandomNumberComponent implements OnInit {

  errorResponse: any; 
  numberResult: NumberResult; 
  resultResponse: string;
  inputNumber: number;
  newNumber: number;
  tryResponse: number = null;   
  tries: number = 20;
  userNumbers: number[];
  wrongNumbers: WrongNumbers[];
  clickCount: number;
  canReset: boolean = true;

  constructor(
    public toastrService: NbToastrService, private numberService: NumberApiService
  ) { }

  add(){
    this.userNumbers.push(this.newNumber);
    // this.wrongNumbers.push({triedNumber: this.newNumber, tryResult: this.errorNumber.result})
  }

  onClick(){    
    if (this.userNumbers.includes(this.newNumber)) {
      // window.alert(`You alredy tried ${this.newNumber}\nPlease check your previous numbers`)
      this.toastrService.warning('Check your previous numbers', `You already tried ${this.newNumber}`)
    } else {
        this.checkResult(this.newNumber);       
        this.add();
        this.clickCount++;
        // if(this.numberResult.result == 'Winner')
          // window.alert('You won, press "GENERATE NEW NUMBER" to play again')
        if(this.clickCount == this.errorResponse.error.try)         
          this.toastrService.show('You won, press "GENERATE NEW NUMBER" to play again')
        if(this.clickCount == 20)
          this.checkResult(0);
      }         
  }

  activateReset(){
    this.canReset = true;
  }

  reset(){
    this.canReset = false;
    this.newNumber = null;    
    this.userNumbers = [];    
    this.clickCount = 0; 
    // this.wrongNumbers = [];    
    let i;

    if(this.numberResult.result == 'Winner') i = 1
    else if(this.errorResponse.error.try) i = this.errorResponse.error.try;
    else i = 0; // Si on démarre avec Api déjà au try 20, checkResult(0) du ngOnInit() va renvoyer errorResponse.error == 'Try again'
                // qui n'est pas géré avant

    for(i; i < 21; i++){ // 1 try pr obtenir une réponse et 20 pr reset. Si reset fait côté service : 1 essai + 19 retry, soit 20 car pas de décalage
      this.numberService.resetNumber(0).subscribe(
        data => this.numberResult = data, 
        resetError => this.errorResponse = resetError)
    }  
    this.numberResult.result = ''; 
  }

  checkResult(number){     
    return this.numberService.getNumberResult(number).subscribe(data => 
      this.numberResult = data,
      error => this.errorResponse = error)
  }

  ngOnInit(): void {
    this.numberResult = {try:0, result:''};
    this.errorResponse = '';
    this.clickCount = 0;    
    this.checkResult(0);
  }
}
