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
  // randNum: number;
  // str: string;
  // first_name: string;
  // songs: string[];
  // loggedIn: boolean;
     

 constructor(private _httpService: HttpService){}
 
 ngOnInit(){ //call the ngOnInit method right after the constructor method
  this.getTasksFromService(); 

  // this.num = 16;
  // this.randNum = Math.floor( (Math.random() * 2 ) +1);
  // this.str = 'Hello Holly!';
  // this.first_name = 'Holly Bobolly';
  // this.songs = ["I will always love you", "Mambo No. 5", "Who let the dogs out?", "Seventy times Seven", "I love all songs", "September", "Linkin Park Song"];
  // this.loggedIn = true;
 }

 getTasksFromService(){
      let observable = this._httpService.getTasks();//receives data from our server as an observable
      observable.subscribe(data => { //subscribes to the observable
        console.log("TASKS RECEIVED", data)
        this.tasks = data['data']; //prints our data. Gives our component an attribute and assigns it to be the data we get from our database 
        // console.log('TEST', this.tasks);
      });
    }




  // onButtonClick(): void {
  //   console.log('THIS CLICK WORKED');
  //   this.tasks = this.tasks;
  //   console.log(this.tasks);
  //   console.log("Button has been clicked", this.tasks);
  // };
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