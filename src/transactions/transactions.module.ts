import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModel, AccountSchema } from 'src/account/entities/account.entity';
import { AuthModel, AuthSchema } from 'src/auth/entities/auth.entity';
import { CategoryModel, CategorySchema } from 'src/category/entities/category.entity';
import { TransactionModel, TransactionSchema } from './entities/transaction.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AccountModel, schema: AccountSchema }]),
    MongooseModule.forFeature([{ name: CategoryModel, schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: AuthModel, schema: AuthSchema }]),
    MongooseModule.forFeature([{ name: TransactionModel, schema: TransactionSchema }]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService]
})
export class TransactionsModule { }
