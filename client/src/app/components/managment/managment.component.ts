import { Component, OnInit } from "@angular/core";
import { ToastrService }     from 'ngx-toastr';
import { Router }            from '@angular/router';
import { AppStorage }        from "src/app/services/appStorage";
import { MakeRequest }       from "src/app/services/makeRequest";

@Component({
  selector: 'app-managment',
  templateUrl: './managment.component.html',
  styleUrls: ['./managment.component.css']
})
export class Managment implements OnInit {
  user: any = null;

  constructor(
    private router: Router,
    private appStorage: AppStorage,
    private toastr: ToastrService,
    private request: MakeRequest,
  ) { }

  ngOnInit(): void {

  }

  /* <============================ REQUESTS ==============================> */
}