import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  products;

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }


  ngOnInit() {
    this.getProducts();
  }


  getProducts(): void {
    console.log("Getting all products")
    var observable = this._httpService.getProducts();
    observable.subscribe(data => this.products = data['products']);
    console.log("list of products", this.products)
  }

  deleteProduct(id): void {
    console.log("delete in home")
    let observable = this._httpService.deleteProduct(id);
    observable.subscribe(data => {
      this.getProducts();
    });
  }
}