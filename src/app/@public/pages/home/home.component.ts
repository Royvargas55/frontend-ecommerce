import { Component, OnInit } from '@angular/core';
import { ICarouselItem } from '@mugan86/ng-shop-ui/lib/interfaces/carousel-item.interface';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { CURRENCIES_SYMBOL, CURRENCY_LIST } from '@mugan86/ng-shop-ui';
import { ProductsService } from '@core/services/products.service';
import { ACTIVE_FILTERS } from '@core/constants/filters';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: ICarouselItem[] = [];​
  listOne;
  listTwo;
  listThree;
  constructor(private products: ProductsService) { }

  ngOnInit(): void {
    this.products.getByLastUnitsOffers(
      1, 4, ACTIVE_FILTERS.ACTIVE,
      true, 100).subscribe(result => {
        console.log('Productos a menos de 100', result);
        this.listTwo = result;
      });

    this.products.getByPlatform(
      1, 4, ACTIVE_FILTERS.ACTIVE,
      true, 105
    ).subscribe(result => {
      console.log('Technology', result);
      this.listOne = result;
    });

    this.products.getByPlatform(
      1, 4, ACTIVE_FILTERS.ACTIVE,
      false, 79
    ).subscribe(result => {
      console.log('Business', result);
      this.listThree = result;
    });

    this.products.getByLastUnitsOffers(
      1, 5, ACTIVE_FILTERS.ACTIVE, true, -1, 290).subscribe( (result: IProduct[]) => {
        result.map((item: IProduct) => {
          this.items.push({
            id: item.id,
            title: item.name,
            description: item.description,
            background: item.img,
            url: ''
          });
        });
    });

  }

}
