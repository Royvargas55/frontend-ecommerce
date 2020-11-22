import { Injectable } from '@angular/core';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { USERS_LIST_QUERY } from '@graphql/operations/query/user';
import { map } from 'rxjs/internal/operators/map';
import { IRegisterForm } from '@core/interfaces/register.interface';
import { ACTIVE_USER, REGISTER_USER } from '@graphql/operations/mutation/user';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiService  {

  constructor(apollo: Apollo) {
    super(apollo);
  }

  getUsers(page: number = 1, itemsPage: number = 20) {
    return this.get(USERS_LIST_QUERY, {include: true, page, itemsPage}).pipe(map((result: any) => {
      return result.users;
    }));
  }

  register(user: IRegisterForm) {
    return this.set(REGISTER_USER,
      {
        user,
        include: false
      }).pipe(
      map((result: any) => {
        return result.register;
      })
    );
  }

  active(token: string, birthDay: string, password: string) {
    const user = JSON.parse(atob(token.split('.')[1])).user;
    return this.set(ACTIVE_USER,
      {
        id: user.id,
        birthDay,
        password
      }, {
        headers: new HttpHeaders({
          Authorization: token
        })
      }).pipe(map((result: any) => {
        return result.activeUserAction;
      }));
  }
}
