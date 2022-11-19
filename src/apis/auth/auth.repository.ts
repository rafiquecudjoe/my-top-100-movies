import { Injectable } from '@nestjs/common';
import prisma from '../../common/prisma';
import { SignupDto } from './dto/auth.dto.';
import { IAuthRepository } from './interfaces/auth.interface';

@Injectable()
export class AuthRepository implements IAuthRepository {
  saveUser(params: SignupDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        // save user
       const result = await prisma.signup.create({
          data: {
            email: params.email,
            username: params.username,
            password: params.password,
            sex: params.sex,
            fullName: params.fullName
          },
        });

        // success
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }


  retrieveUser(username:string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        // retrieve user
        const foundClient = await prisma.signup.findFirst({
          where: {
            username: username
          }
        })
        // success
        resolve(foundClient);
      } catch (error) {
        reject(error);
      }
    });
  }
  deleteAll(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        await prisma.signup.deleteMany({});

        // success
        resolve('success');
      } catch (error) {
        reject(error);
      }
    });
  }
}
