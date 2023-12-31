import { Global, Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModel, CategorySchema } from './entities/category.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthModel, AuthSchema } from 'src/auth/entities/auth.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CategoryModel, schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: AuthModel, schema: AuthSchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule { }
