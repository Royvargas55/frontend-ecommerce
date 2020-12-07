import { Component, OnInit } from '@angular/core';
import { ICarouselItem } from '@mugan86/ng-shop-ui/lib/interfaces/carousel-item.interface';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { CURRENCIES_SYMBOL, CURRENCY_LIST } from '@mugan86/ng-shop-ui';
import { ProductsService } from '@core/services/products.service';
import { ACTIVE_FILTERS } from '@core/constants/filters';
import { closeAlert, loadData } from '@shared/alerts/alerts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: ICarouselItem[] = [];
  listOne: IProduct[];
  listTwo: IProduct[];
  listThree: IProduct[];
  loading: boolean;
  constructor(private products: ProductsService) { }

  ngOnInit(): void {
    this.loading = true;
    loadData('Cargando datos', 'Espera mientras carga la información');
    this.products.getHomePage().subscribe( data => {
      this.listOne = data.tech;
      this.listTwo = data.topPrice;
      this.listThree = data.busni;
      this.items = this.manageCarousel(data.carousel);
      closeAlert();
      this.loading = false;
    });
  }

  private manageCarousel(list) {
    const itemsValues: Array<ICarouselItem> = [];
    list.shopProducts.map((item) => {
      itemsValues.push({
        id: item.id,
        title: item.product.name,
        description: item.platform.name,
        background: item.product.img,
        url: ''
      });
    });
    return itemsValues;
  }

}
