import { Component, OnInit } from "@angular/core";

import { ToastrService } from 'ngx-toastr';
import { AppConsts } from "src/app/util/Consts";
import { MakeRequest } from "src/app/services/makeRequest";
import { AppStorage } from "src/app/services/appStorage";
import { UiHelpers } from "src/app/util/uiHelpers";
import * as moment from "moment";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-tasks',
  templateUrl: './userTasks.component.html',
  styleUrls: ['./userTasks.component.css'],
})
export class UserTasks implements OnInit {
  user: any;

  month: any = [];
  currentMonthLabel = '';
  currentYear: number = 0;

  today: any;
  startDate: any;
  endDate: any;

  tasks: any = {};

  selectedTasks: any[] = [];
  selectedDate: string = '';

  isTasksDescrptionOpen: boolean = false;

  isLoading = false;

  monthsLabels: any = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  constructor(
    private toastr: ToastrService,
    private appStorage: AppStorage,
    private request: MakeRequest,
    private uiHelpers: UiHelpers,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.appStorage.getUser();

    if (!this.user) {
      this.toastr.error('User not found!');
      this.router.navigate(['/app-login']);
    }

    if (this.user.userType !== 'User') {
      this.toastr.error('You do not have access to this page!');
      this.router.navigate(['/app-login']);
    }

    moment.locale('en-gb');

    this.today = moment();
    this.currentYear = moment().get('year');

    this.buildMonth();
  }

  handleChangeMonth(state: string): void {
    if (state === 'prev') {
      this.today = moment(this.today).subtract(1, 'M');
    } else if (state === 'next') {
      this.today = moment(this.today).add(1, 'M');
    }

    this.currentYear = moment(this.today).get('year');

    this.buildMonth();
  }





  buildMonth(): void {
    this.currentMonthLabel = this.monthsLabels[this.today.get('M')];

    this.startDate = moment(this.today).startOf('month');
    this.endDate = moment(this.today).endOf('month');

    const month = +this.startDate.format('M');

    if (this.startDate.isoWeekday() !== 1) {
      this.startDate = this.startDate.startOf('week');
    }
    if (this.endDate.isoWeekday() !== 7) {
      this.endDate =  this.endDate.endOf('week');
    }

    const weeks = [];
    let week = [];
    let currentDate = moment(this.startDate);
    while(!currentDate.isAfter(this.endDate, 'day')) {
      week.push({
        day: +currentDate.format('DD'),
        dayOfWeek: +currentDate.isoWeekday(),
        isToday: currentDate.isSame(this.today, 'day'),
        isAnotherMonth: +currentDate.format('M') !== month,
        fullDate: moment(currentDate).format('YYYY-MM-DD')
      });

      if (+currentDate.isoWeekday() === 7) {
        weeks.push([...week]);
        week = [];
      }
      currentDate = currentDate.add(1, 'days');
    }
    this.month = weeks;

    this.getUserTasks();
  }

  applyTasksPerDay(): void {
    for (const week of this.month) {
      for (const day of week) {
        if (this.tasks[day.fullDate]) {
          day.tasks = this.tasks[day.fullDate];
        }
      }
    }
  }

  handleOpenTasksDescription(): void {
    this.isTasksDescrptionOpen = !this.isTasksDescrptionOpen;

    if (!this.isTasksDescrptionOpen) {
      window.setTimeout(() => this.getUserTasks(), 100);
    }
  }

  handleDayClick(day: any): void {
    if (day.tasks) {
      this.selectedTasks = day.tasks.map((task: any) => task.id);
      this.selectedDate = day.fullDate;
      this.handleOpenTasksDescription();
    }
  }




  /* <============================ REQUESTS ==============================> */
  getUserTasks(): void {
    this.request.get(AppConsts.GET_USER_TASKS, {
      startDate: moment(this.startDate).format('YYYY-MM-DD'),
      endDate: moment(this.endDate).format('YYYY-MM-DD'),
      userId: this.user.id
    })
    .subscribe({
      next: (response) => {
        if (response && response.userTasks) {
          this.tasks = response.userTasks.reduce((tasks: any, task: any) => {
            if (!tasks[task.operationDate]) {
              tasks[task.operationDate] = [];
            }
            tasks[task.operationDate].push(task);
            return tasks;
          }, {});

          this.applyTasksPerDay();
        }
      },
      error: (error) => {
        console.log(error);
        this.toastr.warning('Could not get tasks!');
      }
    });
  }
}