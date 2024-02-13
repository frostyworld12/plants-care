export class AppConsts {
    public static ENDPOINT: string = 'http://localhost:3000/';

    public static readonly CREATE_USER   : string = this.ENDPOINT + 'users/createUser';
    public static readonly AUTH_USER     : string = this.ENDPOINT + 'users/authUser';
    public static readonly GET_USERS     : string = this.ENDPOINT + 'users/getUsers';
    public static readonly PROCESS_USER  : string = this.ENDPOINT + 'users/processUser';
    public static readonly RESET_PASSWORD: string = this.ENDPOINT + 'users/resetPassword';
    public static readonly UPDATE_USER   : string = this.ENDPOINT + 'users/updateUser';

    public static readonly CREATE_PLANT             : string = this.ENDPOINT + 'plants/processPlant';
    public static readonly GET_PLANTS               : string = this.ENDPOINT + 'plants/getPlantsList';
    public static readonly DELETE_PLANT             : string = this.ENDPOINT + 'plants/deletePlant';
    public static readonly ADD_PLANT_TO_USER_CATALOG: string = this.ENDPOINT + 'plants/addPlantToUserCatalog';
    public static readonly GET_USER_PLANTS          : string = this.ENDPOINT + 'plants/getUserPlantsList';
    public static readonly CHANGE_USER_PLANT_NAME   : string = this.ENDPOINT + 'plants/changeUserPlantName';
    public static readonly CREATE_REQUEST           : string = this.ENDPOINT + 'plants/createRequest';

    public static readonly GET_USER_TASKS       : string = this.ENDPOINT + 'tasks/getUserTasks';
    public static readonly GET_TASKS_DESCRIPTION: string = this.ENDPOINT + 'tasks/getTasksDescription';
}