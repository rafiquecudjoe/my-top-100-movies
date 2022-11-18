import { Controller, Post, Body, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ResponseWithData, ResponseWithoutData } from '../../common/entities/response.entity';

import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto/auth.dto.';

@ApiTags('Authentication')
@Controller('api/v1/')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signup')
  @ApiOperation({
    summary:
      'Used to register users that will consume this api',
  })
  @ApiCreatedResponse({ description: 'User account successfully created', type: ResponseWithData })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error', type: ResponseWithoutData })
  @ApiConflictResponse({ description: 'Conflict: a user with same username already exist', type: ResponseWithoutData })
  @ApiInternalServerErrorResponse({ description: 'Internal server error', type: ResponseWithoutData })
  async signup(@Body() requestBody: SignupDto, @Res() res: Response) {
    const response: ResponseWithData = await this.authService.createUser(requestBody);

    if (response.data) {
      return res.status(response.status).send({
        message: response.message,
        data: response.data,
      });
    }

    return res.status(response.status).send({
      message: response.message,
    });
  }

  @Post('/login')
  @ApiOperation({
    summary:
      'Used to login users that will consume the api',
  })
  @ApiCreatedResponse({ description: 'User successfully login', type: ResponseWithData })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error', type: ResponseWithoutData })
  @ApiConflictResponse({ description: 'Conflict: a user with same username already exist', type: ResponseWithoutData })
  @ApiInternalServerErrorResponse({ description: 'Internal server error', type: ResponseWithoutData })
  async login(@Body() requestBody: LoginDto, @Res() res: Response) {
    const response: ResponseWithData = await this.authService.loginUser(requestBody);

    if (response.data) {
      return res.status(response.status).send({
        message: response.message,
        data: response.data,
      });
    }

    return res.status(response.status).send({
      message: response.message,
    });
  }
}
