import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Res, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterDTO } from './dto/register.dto';
import { savePasswordDTO } from './dto/save-password-dto';
import { resetPasswordDTO } from './dto/reset-password.dto';
import { ResendLinkDTO } from './dto/resend-link.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('/register')
  register(@Body(ValidationPipe) body: RegisterDTO) {
    try {
      // console.log(body)
      return this.authService.register(body)
      // return body
    } catch (error) {
      return error.response
    }
  }

  @Post('/save-password')
  savePassword(@Body(ValidationPipe) body: savePasswordDTO) {
    try {
      return this.authService.savePassword(body)
    } catch (error) {
      return error.response
    }
  }

  @Post('/resend-link')
  resendLink(@Body(ValidationPipe) body: ResendLinkDTO) {
    console.log(body)
    try {
      return this.authService.resendLink(body)
    } catch (error) {
      return error.response
    }
  }

  @Patch('/reset-password')
  resetPassword(@Body(ValidationPipe) body: resetPasswordDTO) {
    // console.log(body)
    try {
      return this.authService.resetPassword(body)
      // return body
    } catch (error) {
      return error.response
    }
  }

  @Patch('/forget-password')
  forgetPassword(@Body() body: ResendLinkDTO) {
    try {
      return this.authService.forgetPassword(body)
    } catch (error) {
      return error.response
    }
  }

  @Post('/login')
  async login(@Body(ValidationPipe) body: LoginDTO, @Res() res: Response) {
    try {
      const data = await this.authService.login(body)
      // console.log('contr', data)
      if (data.statusCode) {
        // console.log('condition true')
        throw new NotFoundException('Email or password is incorrect.')
      }
      else {
        // console.log('2 condition true')
        const { token, user } = data

        res.cookie('jwt', token, {
          httpOnly: true,
          expires: new Date(Date.now() + 3000),
          sameSite: 'none',
          secure: true
        })

        res.send({ message: 'loggedin', statusCode: 200, user })
      }
    } catch (error) {
      // console.log('err',error)
      // return error.response
      throw new NotFoundException(error.response.message)
    }
  }
}
