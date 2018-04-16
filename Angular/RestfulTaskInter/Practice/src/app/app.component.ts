import { Component, OnInit } from '@angular/core';//dependency injection
import { HttpService } from './http.service';//dependency injection


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Buenos Dias';
  tasks = [];
  num: number;
  thing : boolean;

 constructor(private _httpService: HttpService){}
 
 ngOnInit(){ //call the ngOnInit method right after the constructor method
  this.getTasksFromService(); 
 }

 getTasksFromService(){
      let observable = this._httpService.getTasks();//receives data from our server as an observable
      observable.subscribe(data => { //subscribes to the observable
        console.log("TASKS RECEIVED", data)
        this.tasks = data['data']; //prints our data. Gives our component an attribute and assigns it to be the data we get from our database 
        // console.log('TEST', this.tasks);
      });
    }

  onButtonClick(): void {
    console.log('THIS CLICK WORKED');
    this.tasks = this.tasks;
    console.log(this.tasks);
    console.log("Button has been clicked", this.tasks);
    this.thing = true;
   
  };
}
  // onSubmit(): void {
  //   console.log('Click numero dos worked');
  
  //   this.nothing = true;
  //   observable.subscribe(data => {
  //     console.log("TASK", data)
  //     this.task = data['result'];
  //     console.log('TESTING', this.task);
  //   });
  // }


//
// }