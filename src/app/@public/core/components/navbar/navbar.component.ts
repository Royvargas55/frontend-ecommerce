import { ICart } from './../shopping-cart/shopping-cart.interface';
import { Router } from '@angular/router';
import { IMenuItem } from '@core/interfaces/menu-item.interface';
import { IMeData } from '@core/interfaces/session.interface';
import { AuthService } from '@core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import shopMenuItems from '@data/menus/shop.json';
import { CartService } from '@shop/core/services/cart.service.ts.service';
import { REDIRECTS_ROUTES } from '@core/constants/config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  menuItems: Array<IMenuItem> = shopMenuItems;
  cartItemsTotal: number;
  session: IMeData = {
    status: false
  };
  access = false;
  role: string;
  userLabel = '';
  constructor(private authService: AuthService, private cartService: CartService, private router: Router) {
    this.authService.accessVar$.subscribe((result) => {
      console.log(result.status);
      this.session = result;
      this.access = this.session.status;
      this.role = this.session.user?.role;
      this.userLabel = `Hola ${ this.session.user?.name }!`;
    });

    this.cartService.itemsVar$.subscribe((data: ICart) => {
      if (data !== undefined && data !== null) {
        this.cartItemsTotal = data.subtotal;
      }
    });
  }

  ngOnInit(): void {
    this.cartItemsTotal = this.cartService.initialize().subtotal;
  }

  logout() {
    // Rutas para redireccionar
    if (REDIRECTS_ROUTES.includes(this.router.url)){
      // En el caso de encontrarla marcarla para que rediccione
      localStorage.setItem('route_after_login', this.router.url);
    }
    this.authService.resetSession();
  }

  open() {
    this.cartService.open();
  }

}
