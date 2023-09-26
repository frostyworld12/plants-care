export class AppConsts {
    public static ENDPOINT: string = 'http://localhost:3000/';

    public static readonly CREATE_USER: string = this.ENDPOINT + 'users/createUser';
    public static readonly AUTH_USER: string = this.ENDPOINT + 'users/authUser';

    public static readonly CREATE_PLANT: string = this.ENDPOINT + 'plants/createPlant';
}