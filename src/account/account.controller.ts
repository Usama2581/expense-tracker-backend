import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Post('/post/:id')
  create(@Body(ValidationPipe) body: CreateAccountDto, @Param('id') id) {
    try {
      return this.accountService.create(id, body)
    } catch (error) {
      return error.response
    }
  }

  @Get('/balance/:id')
  findAll(@Param('id') id) {
    try {
      return this.accountService.findTotalBalance(id)
    } catch (error) {
      return error.response
    }
  }

  @Get('/get/:id')
  find(@Param('id') id) {
    try {
      return this.accountService.findAccount(id)
    } catch (error) {
      return error.response
    }
  }

 
}
