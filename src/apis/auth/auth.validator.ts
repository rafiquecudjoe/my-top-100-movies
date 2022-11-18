import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseWithData, ResponseWithoutData } from '../../common/entities/response.entity';
import { JoiValidator } from '../../utils/joi.validator';
import { Response } from '../../common/response';
import { AuthRepository } from '../auth/auth.repository';
import * as joi from 'joi';
import { LoginDto, SignupDto } from './dto/auth.dto.';

@Injectable()
export class AuthValidator {
  constructor(private readonly authRepository: AuthRepository) { }

  validateSignupUser(params: SignupDto): Promise<ResponseWithoutData> {
    return new Promise(async (resolve, reject) => {
      try {
        // joi validation
        const joiSchema = joi.object({
          username: joi.string().required().label('Username'),
          password: joi.string().required().label('Password'),
          fullName: joi.string().required().label('Full Name'),
          sex: joi.string().required().label('Gender'),
          email: joi.string().required().label('Email'),

        });
        const joiValidationResults = JoiValidator.validate(joiSchema, params);

        // check the results from joi validation
        if (joiValidationResults) return resolve(Response.withoutData(HttpStatus.BAD_REQUEST, joiValidationResults));

        // check for duplicate users
        const foundClient = await this.authRepository.retrieveUser(params.username);
        if (foundClient)
          return resolve(Response.withoutData(HttpStatus.CONFLICT, 'A user with this username already exists'));

        // success
        resolve(Response.withoutData(HttpStatus.OK, 'Passed'));
      } catch (error) {
        reject(error);
      }
    });
  }

  validateLoginUser(params: LoginDto): Promise<ResponseWithData> {
    return new Promise(async (resolve, reject) => {
      try {
        // joi validation
        const joiSchema = joi.object({
          username: joi.string().required().label('Username'),
          password: joi.string().required().label('Username'),
        });
        const joiValidationResults = JoiValidator.validate(joiSchema, params);

        // check the results from joi validation
        if (joiValidationResults) return resolve(Response.withoutData(HttpStatus.BAD_REQUEST, joiValidationResults));

        // check if user exists
        const foundClient = await this.authRepository.retrieveUser(params.username);
        if (!foundClient)
          return resolve(Response.withoutData(HttpStatus.BAD_REQUEST, 'User does not exist'));
        
        // check if password is correct
        if (foundClient.password !== params.password) return resolve(Response.withoutData(HttpStatus.BAD_REQUEST, 'Incorrect password'));

        // success
        resolve(Response.withData(HttpStatus.OK, 'Passed',foundClient));
      } catch (error) {
        reject(error);
      }
    });
  }
}
