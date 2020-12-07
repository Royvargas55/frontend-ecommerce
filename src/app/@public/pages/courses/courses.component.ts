import { Component, OnInit } from '@angular/core';
import { IInfoPage } from '@core/interfaces/result-data.interface';
import { ACTIVE_FILTERS } from '@core/constants/filters';
import { ProductsService } from '@core/services/products.service';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';
import { ICoursePageInfo } from './courses-page-info.interface';
import { COURSES_PAGES_INFO, TYPE_OPERATION } from './course.constants';
import { loadData, closeAlert } from '@shared/alerts/alerts';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  selectPage;
  infoPage: IInfoPage = {
    page: 1,
    pages: 8,
    total: 13,
    itemsPage: 10,
  };
  typeData: TYPE_OPERATION;
  coursesPageInfo: ICoursePageInfo;
  productsList: Array<IProduct> = [];
  loading: boolean;
  constructor(private products: ProductsService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.loading = true;
      loadData('Cargando datos', 'Espera mientras carga la información');
      console.log(params);
      this.coursesPageInfo = COURSES_PAGES_INFO[`${params.type}/${params.filter}`];
      console.log(this.coursesPageInfo);
      this.typeData = params.type;
      this.selectPage = 1;
      this.loadData();
    });
  }

  loadData() {
    if (this.typeData === TYPE_OPERATION.PLATFORMS) {
      this.products
        .getByPlatform(
          this.selectPage,
          this.infoPage.itemsPage,
          ACTIVE_FILTERS.ACTIVE,
          false,
          this.coursesPageInfo.platformsIds,
          true,
          true
        )
        .subscribe((data) => {
          this.asignResult(data);
        });
      return;
    }
    this.products
      .getByLastUnitsOffers(
        this.selectPage,
        this.infoPage.itemsPage,
        ACTIVE_FILTERS.ACTIVE,
        false,
        this.coursesPageInfo.topPrice,
        this.coursesPageInfo.stock,
        true,
        true
      )
      .subscribe((data) => {
        this.asignResult(data);
      });
  }
  private asignResult(data) {
    console.log(this.coursesPageInfo.title, data.result);
    this.productsList = data.result;
    this.infoPage = data.info;
    closeAlert();
    this.loading = false;
  }
}
