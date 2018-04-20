import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  newProduct = {title:"", price: null};
  error;


  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
  }

  addProduct(): void {
    console.log("Got to add product")
     let observable = this._httpService.addProduct(this.newProduct);
     observable.subscribe( data => {
       if(data['message'] == "Success!") {
        console.log("Got to add product NUMBER 2")
        this.newProduct = { title: "", price: null}
        this._router.navigate(['']);
        console.log(this.newProduct.title, "this is my add ts page1")
       }
       else{
        console.log(this.newProduct, "this is my add ts page2")
        this.error = data['error']['message'];
       }
      })
    }
  }


