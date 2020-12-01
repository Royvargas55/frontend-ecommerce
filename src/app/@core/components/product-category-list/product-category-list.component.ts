import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent implements OnInit {
  @Input() title = 'Título de la categoría';
  @Input() productsList: Array<IProduct> = [];
  constructor() { }

  ngOnInit(): void {
  }

  addToCart($event: IProduct) {
    // Usar la información del producto pasado para llevarlo al carrito de compra
    console.log($event);
  }

  showProductDetails($event: IProduct) {
    console.log($event);
  }

}
