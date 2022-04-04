import {User} from "../entity/user.entity";

export class UserDTO {
    email: string;
    username: string;

    constructor(user: User) {
        this.email= user.email
        this.username= user.username
    }
}
