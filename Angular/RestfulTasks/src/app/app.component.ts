import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Buenos Dias';
  tasks = [];
  task = [];
  thing = false;
  nothing = false;

  taskid;

  onButtonClick(): void {
    console.log('THIS CLICK WORKED');
    this.tasks = this.tasks;
    this.thing = true;
    console.log("Button has been clicked", this.tasks);
  }

  onSubmit(): void {
    console.log('Click numero des worked');
    console.log(this.taskid);
    this.nothing = true;
    let observable = this._HttpService.getTasksByID(this.taskid);
    observable.subscribe(data => {
      console.log("TASK", data)
      this.task = data['result'];
      console.log('TESTING', this.task);
    });
  }

  constructor(private _HttpService: HttpService) { }
  ngOnInit() {
    this.getTasksFromService();
  }
  getTasksFromService(){
    let observable = this._HttpService.getTasks();
    observable.subscribe(data => {
      console.log("TASKS RECEIVED", data)
      this.tasks = data['result'];
      console.log('TEST', this.tasks);
    });
  }
}