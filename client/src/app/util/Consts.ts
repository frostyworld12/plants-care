export class AppConsts {
    public static ENDPOINT: string = 'http://localhost:3003/';

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

    public static readonly GET_USER_REQUESTS      : string = this.ENDPOINT + 'users/getUserRequests';
    public static readonly GET_USER_REQUESTS_ADMIN: string = this.ENDPOINT + 'users/getUserRequestsAdmin';
    public static readonly UPDATE_USER_REQUST     : string = this.ENDPOINT + 'users/updateUserRequestStatus';
    public static readonly GET_DB_TABLES          : string = this.ENDPOINT + 'users/getDBTablesInfo';
    public static readonly PERFORM_DB_REQUEST     : string = this.ENDPOINT + 'users/performDatabaseRequest';
    public static readonly DOWNLOAD_DB_REQUEST    : string = this.ENDPOINT + 'users/downloadDatabaseRequestResult';

    public static readonly GET_DB_LOGS            : string = this.ENDPOINT + 'dbLogs/getEvents';
    public static readonly START_DB_BACKUP        : string = this.ENDPOINT + 'users/startDatabaseBackup';
    public static readonly GET_DB_BACKUP_FILES    : string = this.ENDPOINT + 'users/getDatabaseBackupsList';
    public static readonly DOWNLOAD_DB_BACKUP_FILE: string = this.ENDPOINT + 'users/downloadDatabaseBackupFile';

    public static readonly GET_USER_TASKS       : string = this.ENDPOINT + 'tasks/getUserTasks';
    public static readonly GET_TASKS_DESCRIPTION: string = this.ENDPOINT + 'tasks/getTasksDescription';
    public static readonly SAVE_TASKS           : string = this.ENDPOINT + 'tasks/saveTasks';
}