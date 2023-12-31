import { Global, Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountModel, AccountSchema } from './entities/account.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModel, CategorySchema } from 'src/category/entities/category.entity';
import { AuthModel, AuthSchema } from 'src/auth/entities/auth.entity';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: AccountModel, schema: AccountSchema }]),
    // MongooseModule.forFeature([{ name: CategoryModel, schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: AuthModel, schema: AuthSchema }]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule { }
