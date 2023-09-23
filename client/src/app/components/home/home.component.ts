import { Component, OnInit } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class Home implements OnInit {

  ngOnInit(): void {

  }

  constructor(
    private router: Router
  ) { }

  navigateToPage(page: string): void {
    this.router.navigate(['/app-users-plants']);
  }
}