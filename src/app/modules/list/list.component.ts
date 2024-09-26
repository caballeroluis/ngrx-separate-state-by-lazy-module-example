import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from './models/product.model';
import { selectListData, selectShoppingList } from './lazy-store/list.selectors';
import { loadListData, addProductToList, removeProductFromList } from './lazy-store/list.actions';

@Component({
  selector: 'app-list',
  styleUrls: ['./list.component.css'],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  productsData$: Observable<any | null> = this.store.pipe(select(selectListData));
  shoppingList$: Observable<Product[]> = this.store.pipe(select(selectShoppingList));
  
  selectedProduct: string = '';
  productToRemove: Product | null = null;
  
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadListData());
    this.preselectFirstProduct();
  }

  preselectFirstProduct(): void {
    this.productsData$.subscribe(productsData => {
      if (productsData && productsData.products.length > 0) {
        this.selectedProduct = productsData.products[0].name;
      }
    });
  }

  onProductSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedProduct = selectElement?.value;
  }

  addProduct(): void {
    if (this.selectedProduct) {
      const product = this.findProductByName(this.selectedProduct);
      if (product) {
        this.store.dispatch(addProductToList({ product }));
      }
    }
  }

  removeProduct(product: Product): void {
    this.productToRemove = product;

    setTimeout(() => {
      this.store.dispatch(removeProductFromList({ product }));
      this.productToRemove = null;
    }, 300);
  }

  findProductByName(productName: string): Product | undefined {
    let product: Product | undefined;
    this.productsData$.subscribe(data => {
      if (data) {
        product = data.products.find((p: { name: string }) => p.name === productName);
      }
    });
    return product;
  }
}
