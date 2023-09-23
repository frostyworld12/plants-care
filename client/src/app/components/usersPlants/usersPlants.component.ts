import { Component, OnInit } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-plants',
  templateUrl: './usersPlants.component.html',
  styleUrls: ['./usersPlants.component.css']
})
export class UsersPlants implements OnInit {
  plants: Object[] = [];

  ngOnInit(): void {
    console.log('init')
    for (let index = 0; index < 50; index++) {
      this.plants.push({i: index});
    }

    console.log(this.plants)
  }

  constructor(
    private router: Router
  ) { }

}