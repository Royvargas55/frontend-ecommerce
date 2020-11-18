import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { UsersService } from '@core/services/users.service';
import { ApiService } from '@graphql/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private user: UsersService, private auth: AuthService) { }

  ngOnInit(): void {
    // this.auth.login('royvargas55@gmail.com', 'roy123').subscribe( result => {
    //   console.log(result);
    // });
    /*
    this.auth.getMe().subscribe( result => {
      console.log(result);
    });
    */
    this.user.getUsers(2, 1).subscribe( result => {
      console.log(result);
    });

  }

}
