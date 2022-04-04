import {HttpStatus, Injectable} from "@nestjs/common";


import {UserRepository} from "./repository/user.repository";
import {User} from "./entity/user.entity";
import {errorFactory} from "../../common/utils/error.factory";
import {UserDTO} from "./dto/user.dto";



@Injectable()
export class UserService {

  constructor(private readonly userRepository: UserRepository) {
  }

  public async createUser(dao: User): Promise<any> {
    const newUser: User = await this.userRepository.create(dao);
    return  newUser;
  }

  public async findOneById(id: string): Promise<UserDTO> {
    const userDAO = await this.userRepository.getUserById(id);
    if (!userDAO) errorFactory({message: "User no found", status: HttpStatus.NOT_FOUND});
    return  new UserDTO(userDAO);
  }

  public async findOneByIdOptional(id: string): Promise<any> {
    const userDAO = await this.userRepository.getUserById(id);
    return userDAO;
  }

  public async findOneByEmailOptional(email: string): Promise<any> {
    const userDAO = await this.userRepository.getUserByEmail(email);
    return userDAO ;
  }

  public async findOneByEmailAndPasswordOptional(email: string, password: string): Promise<any> {
    const userDAO = await this.userRepository.getUserByEmailAndPassword(email, password);
    return userDAO;
  }

}





