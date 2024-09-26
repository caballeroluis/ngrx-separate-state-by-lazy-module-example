import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable()
export class ListService {
  private productsUrl = 'assets/mock/product-data.json';

  constructor(private http: HttpClient) {}

  getListData(): Observable<any> {
    return this.http.get<Product>(this.productsUrl);
  }
}