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
  @Input() date: string = '';

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

  handleSave(): void {
    this.saveTasks();
    this.handleClose();
  }

  handleTaskComplete(task: any): void {
    task.isCompleted = !task.isCompleted;
  }

  /* <============================ REQUESTS ==============================> */
  getTasks(): void {
    this.request.post(AppConsts.GET_TASKS_DESCRIPTION, {
      tasksIds: this.tasksIds,
      userId: this.user.id
    }, {})
    .subscribe({
      next: (response) => {
        if (response && response.tasks) {
          const tasksDescription = response.tasks.reduce((tasksDescription: any, task: any) => {
            if (!tasksDescription[task.plantId]) {
              tasksDescription[task.plantId] = {
                plantName: task.userPlantName || task.plantName,
                plantId: task.plantId,
                plantImage: task.imageUrl,
                tasks: []
              };
            }

            tasksDescription[task.plantId].tasks.push({
              id: task.id,
              operationName: task.operationName,
              operationDate: task.operationDate,
              isCompleted: task.isCompleted
            });

            return tasksDescription;
          }, {});

          this.tasksDescription = Object.values(tasksDescription);
        }
      },
      error: (error) => {
        this.toastr.warning('Could not get task!');
      }
    });
  }

  saveTasks(): void {
    const tasks: any = {};

    this.tasksDescription.forEach((plantTasks: any) => {
      plantTasks.tasks.forEach((task: any) => {
        tasks[task.id] = task.isCompleted;
      });
    });

    this.request.post(AppConsts.SAVE_TASKS, {
      tasks: tasks,
    }, {})
    .subscribe({
      next: (response) => {
        this.toastr.success('Tasks successfully completed!');
      },
      error: (error) => {
        this.toastr.warning('Could not save tasks!');
      }
    });
  }
}