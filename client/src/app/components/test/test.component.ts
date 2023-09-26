import { Component, OnInit } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppStorage } from "src/app/services/appStorage";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class Test implements OnInit {
  user: any = null;

  constructor(
    private router: Router,
    private appStorage: AppStorage,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }
}