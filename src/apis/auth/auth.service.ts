import { HttpStatus, Injectable } from '@nestjs/common';
import { Signup } from '@prisma/client';
import { ResponseWithData, ResponseWithoutData } from 'src/common/entities/response.entity';
import { Constants } from '../../common/enums/constants.enum';
import logger from '../../utils/logger';
import { AuthRepository } from './auth.repository';
import { AuthValidator } from './auth.validator';
import { LoginDto, SignupDto } from './dto/auth.dto.';
import { Response } from '../../common/response';


@Injectable()
export class AuthService {
  constructor(
    private readonly authValidator: AuthValidator,
    private readonly authRepository: AuthRepository
  ) { }

  async createUser(params: SignupDto): Promise<ResponseWithData> {
    try {
      // validate payload
      const validationResults = await this.authValidator.validateSignupUser(params);
      if (validationResults.status !== HttpStatus.OK) return validationResults;

      // save user
      const data : Signup = await this.authRepository.saveUser(params);

      // success
      return Response.withData(HttpStatus.CREATED, "Signup Successfull", data);
    } catch (error) {
      logger.error(`An error occurred while creating user: ${error}`);
      return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
    }
  }


  async loginUser(params: LoginDto): Promise<ResponseWithoutData> {
    try {
      // validate payload
      const validationResults = await this.authValidator.validateLoginUser(params);
      if (validationResults.status !== HttpStatus.OK) return validationResults;

      // success
      return Response.withoutData(HttpStatus.OK, "User successfully logged in",);
    } catch (error) {
      logger.error(`An error occurred while logging in user: ${error}`);
      return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
    }
  }
}
