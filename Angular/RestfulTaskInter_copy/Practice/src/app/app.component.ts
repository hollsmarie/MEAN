import { Component, OnInit } from '@angular/core';//dependency injection
import { HttpService } from './http.service';//dependency injection


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Buenos Dias';
  tasks;
  taskid;
  num: number;
  thing : boolean;
  nothing: boolean;
  newTask: any;
  updates: any;
  foundtask={};

 constructor(private _httpService: HttpService){}
 
 ngOnInit(){ //call the ngOnInit method right after the constructor method
  this.getTasksFromService(); 
  this.newTask = { title: "", description: ""}
  this.updates = { title: "", description: ""}
 }

 createTask(): void {
  let observable = this._httpService.addTask(this.newTask)
  observable.subscribe(data => {
    console.log("TASK", data)
    this.newTask = {title: "", description: ""};
    console.log('testing', this.newTask);
    this.getTasksFromService();
  });
}



 getTaskById(taskid){
   let observable=this._httpService.getTasksById(taskid);
   observable.subscribe(data=>{
     this.foundtask=data["task"];
     console.log(this.foundtask)
     this.getTasksFromService();
   })
 }

 getTasksFromService(){
  let observable = this._httpService.getTasks();//receives data from our server as an observable
  observable.subscribe(data => { //subscribes to the observable
    console.log("TASKS RECEIVED", data)
    this.tasks = data['tasks']; //prints our data. Gives our component an attribute and assigns it to be the data we get from our database 
    // console.log('TEST', this.tasks);
    
  });
}



 taskUpdate(taskid, updates) {
   let observable=this._httpService.taskUpdate(taskid, this.updates);
   observable.subscribe(data=>{
     this.updates={title: "", description: ""};
     this.getTasksFromService();
   })
 }




  onSubmit(): void {
    let observable = this._httpService.getTasksById(this.taskid);
    observable.subscribe(data => {
      this.newTask = data['tasks'];
      this.getTasksFromService();
    })
  }



    delete(taskid){
      let observable=this._httpService.delete(taskid);
      observable.subscribe(data => {
        console.log(data);
        this.getTasksFromService();
      })
    }


}
