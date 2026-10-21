import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  AllowAnonymous,
  Session,
  type UserSession,
} from '@thallesp/nestjs-better-auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('me')
  me(@Session() session: UserSession) {
    return session.user;
  }
}
