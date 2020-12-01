import { IRegisterForm } from '@core/interfaces/register.interface';
import { Component, OnInit } from '@angular/core';
import { IResultData } from '@core/interfaces/result-data.interface';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { USERS_LIST_QUERY } from '@graphql/operations/query/user';
import {
  optionsWithDetails,
  formBasicDialog,
  userFormBasicDialog,
} from '@shared/alerts/alerts';
import { DocumentNode } from 'graphql';
import { UsersAdminService } from './users-admin.service';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
import { UsersService } from '@core/services/users.service';
import { ACTIVE_FILTERS } from '@core/constants/filters';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  query: DocumentNode = USERS_LIST_QUERY;
  context: object;
  itemsPage: number;
  resultData: IResultData;
  columns: Array<ITableColumns>;
  include: boolean;
  filterActiveValues: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE;

  constructor(private service: UsersAdminService) {}

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 2;
    this.resultData = {
      listKey: 'users',
      definitionKey: 'users',
    };
    this.include = true;
    this.columns = [
      {
        property: 'id',
        label: '#',
      },
      {
        property: 'name',
        label: 'Nombre',
      },
      {
        property: 'lastName',
        label: 'Apellidos',
      },
      {
        property: 'email',
        label: 'Correo electrónico',
      },
      {
        property: 'role',
        label: 'Permisos',
      },
      {
        property: 'active',
        label: '¿Activo?',
      },
    ];
  }

  private initializeForm(user: any) {
    const defaultName =
      user.name !== undefined && user.name !== '' ? user.name : '';
    const defaultLastname =
      user.lastName !== undefined && user.lastName !== '' ? user.lastName : '';
    const defaultEmail =
      user.email !== undefined && user.email !== '' ? user.email : '';
    const roles = new Array(2);
    roles[0] =
      user.role !== undefined && user.role === 'ADMIN' ? 'selected' : '';
    roles[1] =
      user.role !== undefined && user.role === 'CLIENT' ? 'selected' : '';
    return `
      <input id="name" value="${defaultName}" class="swal2-input" placeholder="Nombre" required>
      <input id="lastname" value="${defaultLastname}" class="swal2-input" placeholder="Apellidos" required>
      <input id="email" value="${defaultEmail}" class="swal2-input" placeholder="Correo Electrónico" required>
      <select id="role" class="swal2-input">
        <option value="ADMIN" ${roles[0]}>Administrador</option>
        <option value="CLIENT" ${roles[1]}>Cliente</option>
      </select>
    `;
  }

  async takeAction($event) {
    // Informacion de las acciones
    const action = $event[0];
    const user = $event[1];
    const html = this.initializeForm(user);
    // Teniendo en cuenta el caso, ejecutar una acción
    switch (action) {
      case 'add':
        // agregar item
        this.addForm(html);
        break;
      case 'edit':
        this.updateForm(html, user);
        break;
      case 'info':
        const result = await optionsWithDetails(
          'Detalles',
          `${user.name} ${user.lastName}<br/>
          <i class="fas fa-envelope-open-text"></i>&nbsp;&nbsp;${user.email}`,
          user.active !== false ? 450 : 450,
          '<i class="fas fa-edit"></i> Editar', // true
          user.active !== false
            ? '<i class="fas fa-lock"></i> Bloquear'
            : '<i class="fas fa-lock-open"></i> Desbloquear'
        ); // false
        if (result) {
          this.updateForm(html, user);
        } else if (result === false) {
          this.unblockForm(user, (user.active !== false) ? false : true);
        }
        break;
      case 'block':
        this.unblockForm(user, false);
        break;
      case 'unblock':
        this.unblockForm(user, true);
        break;
      default:
        break;
    }
  }

  private async addForm(html: string) {
    const result = await userFormBasicDialog('Añadir usuario', html);
    console.log(result);
    this.addUser(result);
  }

  private addUser(result) {
    if (result.value) {
      const user: IRegisterForm = result.value;
      user.password = '1234';
      user.active = false;
      this.service.register(user).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          this.service
            .sendEmailActive(res.user.id, user.email)
            .subscribe((resEmail) => {
              resEmail.status
                ? basicAlert(TYPE_ALERT.SUCCESS, resEmail.message)
                : basicAlert(TYPE_ALERT.WARNING, resEmail.message);
            });
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }

  private async updateForm(html: string, user: any) {
    const result = await userFormBasicDialog('Modificar usuario', html);
    console.log(result);
    this.updateUser(result, user.id);
  }

  private updateUser(result, id: number) {
    if (result.value) {
      const user = result.value;
      user.id = id;
      console.log(user);
      this.service.update(result.value).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }

  private async unblockForm(user: any, unblock: boolean) {
    const result = unblock
      ? await optionsWithDetails(
          '¿Desbloquear?',
          `Si desbloqueas el usuario seleccionado, tendra permisos de nuevo`,
          500,
          'No desbloquear',
          'Desbloquear'
        )
      : await optionsWithDetails(
          '¿Bloquear?',
          `Si bloqueas el usuario seleccionado, no se mostrará en la lista`,
          430,
          'No bloquear',
          'Bloquear'
        );
    if (result === false) {
      // Si resultado falso, queremos bloquear / desbloquear
      this.unblockUser(user.id, unblock, true);
    }
  }

  private unblockUser(
    id: number,
    unblock: boolean = false,
    admin: boolean = false
  ) {
    this.service.unblock(id, unblock, admin).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        return;
      }
      basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

}
