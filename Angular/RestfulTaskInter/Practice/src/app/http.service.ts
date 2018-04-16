import { Injectable } from '@angular/core';//dependency injection
import { HttpClient } from '@angular/common/http'; //dependency injection

@Injectable()
export class HttpService {

  constructor(private _http:HttpClient) { 
    //this.getTasks();  //You don't need this line anymore because the component will invoke the HTTP request and recieve the data that comes back
  }

  getTasks(){ //component invokes the services's get tasks method

    // commented out original code because we now won't need to subscribe to the observable and see what we get back

    // let tempObservable = this._http.get('/tasks');
    // tempObservable.subscribe(data => console.log("Got our tasks!", data));
    
    return this._http.get('/tasks') //This returns the observable
 }

  getTasksById(taskid)
  {
    return this._http.get('/')
  }

}
