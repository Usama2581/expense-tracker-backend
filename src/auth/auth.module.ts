import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModel, AuthSchema } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModel, CategorySchema } from 'src/category/entities/category.entity';
import { AccountModel, AccountSchema } from 'src/account/entities/account.entity';

// @Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: AuthModel, schema: AuthSchema }]),
    MongooseModule.forFeature([{ name: CategoryModel, schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: AccountModel, schema: AccountSchema }]),
  JwtModule.register({
    global: true,
    secret: 'token',
    signOptions: { expiresIn: '300s' },
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }
