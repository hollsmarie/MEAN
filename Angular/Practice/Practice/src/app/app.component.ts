import { Component } from '@angular/core';
import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Buenos Dias';
  tasks = [];
 constructor(private _httpService: HttpService){}




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


//   getTasksFromService(){
//     let observable = this._HttpService.getTasks();
//     observable.subscribe(data => {
//       console.log("TASKS RECEIVED", data)
//       this.tasks = data['result'];
//       console.log('TEST', this.tasks);
//     });
//   }
// }