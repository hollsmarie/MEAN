import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class HttpService {

  constructor( private _http: HttpClient) { }

  getProducts() {
    console.log('got to get products method')
    return this._http.get('/products');
  }

  addProduct(newProduct) {
    console.log("hit add product")
    return this._http.post('/api/products', newProduct);
    console.log("TESTTTTTTT")
  }

  deleteProduct(productID){
    return this._http.delete(`/api/products/${productID}`);
  }
}
