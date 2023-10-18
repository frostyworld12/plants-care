export class AppConsts {
    public static ENDPOINT: string = 'http://localhost:3000/';

    public static readonly CREATE_USER   : string = this.ENDPOINT + 'users/createUser';
    public static readonly AUTH_USER     : string = this.ENDPOINT + 'users/authUser';
    public static readonly GET_USERS     : string = this.ENDPOINT + 'users/getUsers';
    public static readonly PROCESS_USER  : string = this.ENDPOINT + 'users/processUser';
    public static readonly RESET_PASSWORD: string = this.ENDPOINT + 'users/resetPassword';

    public static readonly CREATE_PLANT: string = this.ENDPOINT + 'plants/processPlant';
    public static readonly GET_PLANTS  : string = this.ENDPOINT + 'plants/getPlantsList';
    public static readonly DELETE_PLANT: string = this.ENDPOINT + 'plants/deletePlant';
}