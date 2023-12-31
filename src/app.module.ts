import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DBModule } from './db/db.module';
import { AccountModule } from './account/account.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    DBModule,
    AuthModule,
    AccountModule,
    TransactionsModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
