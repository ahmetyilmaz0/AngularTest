import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-string-generator',
  templateUrl: './string-generator.component.html',
  styles: [
  ]
})
export class StringGeneratorComponent implements OnInit,OnDestroy {
  subscription: Subscription = new Subscription;
  //Use RxJs when setting the display every 3 seconds.
  delay: Observable<number> = timer(0, 500);
  public text='';
  public color='';
  public condition=true;
  constructor() { }

  ngOnInit(): void {
    //Configure the generation and display of values ​​every 3 seconds.
    this.subscription = this.delay.subscribe(() => {
      this.text=this.getRandomString(5);
    });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  getRandomString(length:number) {
    //to create a random string
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    this.textConditions(result);
    return result;
  }

  textConditions(result:string){
    if((result != null) && (result !== '')){
      //1) if the created value is a palindrome, display it in red;
      var reverseString='';
      for(var j=result.length; j>=0; j--){
        reverseString = reverseString + result.charAt(j);
      }
      if(reverseString==result){
        //1) if the created value is a palindrome, display it in red;
        this.condition=true;
        this.color='red';
      }
      else if(!isNaN(Number(result))){
        //2) if the created value consists only of numbers, display it in blue;
        this.condition=true;
        this.color='blue';
      }
      else if(result.includes('0')){
        //3)if the created contains 0 do not display it at all.
        this.condition=false;
        this.color='';
      }
      else{
        this.condition=true;
        this.color='';
      }
    }
  }
}
