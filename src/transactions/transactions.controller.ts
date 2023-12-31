import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';


@Controller('transactions')
export class TransactionsController {

  constructor(private readonly transactionsService: TransactionsService) { }

  @Post('/post')
  create(@Body(ValidationPipe) body: CreateTransactionDto) {
    try {
      return this.transactionsService.create(body)
    } catch (error) {
      return error.response
    }
  }

  @Get('/get/:id')
  find(@Param('id') id) {
    try {
      return this.transactionsService.findAll(id)
    } catch (error) {
      return error.response
    }
  }

 
}
