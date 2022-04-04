import {UserDTO} from "../../user/dto/user.dto";
import {TokenResponseDTO} from "../../../common/dto/common.dto";
import {User} from "../../user/entity/user.entity";

export class SignUpDTO {
    email: string;
    password: string;
    username: string;
}

export class SignInDTO {
    email: string;
    password: string;
}

export class SingInResponseDTO{
    user: UserDTO
    token:TokenResponseDTO

    constructor(user:User, token) {
        this.user = new UserDTO(user)
        this.token = new TokenResponseDTO(token)
    }
}

