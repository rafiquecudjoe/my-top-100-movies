
import { SignupDto } from '../dto/auth.dto.';

export interface IAuthRepository {
  saveUser(params: SignupDto): Promise<any>;
  retrieveUser(username:string): Promise<any>;
}
