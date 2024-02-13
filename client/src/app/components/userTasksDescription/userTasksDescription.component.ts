import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";

import { ToastrService } from 'ngx-toastr';
import { MakeRequest } from "src/app/services/makeRequest";
import { AppStorage } from "src/app/services/appStorage";
import { AppConsts } from "src/app/util/Consts";

@Component({
  selector: 'user-tasks-description',
  templateUrl: './userTasksDescription.component.html',
  styleUrls: ['./userTasksDescription.component.css'],
})
export class UserTasksDescription implements OnInit {
  user: any;

  @Input() tasksIds: any[] = [];

  @Output() onModalClose = new EventEmitter<any>();

  tasksDescription: any[] = [];

  objectKeys = Object.keys;
  objectValues = Object.values;

  constructor(
    private toastr: ToastrService,
    private appStorage: AppStorage,
    private request: MakeRequest,
  ) { }

  ngOnInit(): void {
    this.user = this.appStorage.getUser();
    this.getTasks();
  }

  handleClose(): void {
    this.onModalClose.emit();
  }




  /* <============================ REQUESTS ==============================> */
  getTasks(): void {
    this.request.post(AppConsts.GET_TASKS_DESCRIPTION, {
      tasksIds: this.tasksIds,
    }, {})
    .subscribe({
      next: (response) => {
        if (response && response.tasks) {
          const tasksDescription = response.tasks.reduce((tasksDescription: any, task: any) => {
            if (!tasksDescription[task.plantId]) {
              tasksDescription[task.plantId] = {
                plantName: task.name,
                plantId: task.plantId,
                plantImage: task.imageUrl,
                tasks: []
              };
            }

            tasksDescription[task.plantId].tasks.push({
              operationName: task.operationName,
              operationDate: task.operationDate
            });

            return tasksDescription;
          }, {});

          console.log(tasksDescription)

          this.tasksDescription = Object.values(tasksDescription);

          console.log(this.tasksDescription)
        }
      },
      error: (error) => {
        this.toastr.warning('Could not get task!');
      }
    });
  }
}