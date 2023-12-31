import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) { }

  @Post('/post/:id')
  addCategory(@Param('id') id, @Body(ValidationPipe) body: CategoryDto) {
    try {
      return this.categoryService.create(id, body)
    } catch (error) {
      return error
    }
  }

  @Get('/get/:id')
  findCategory(@Param('id') id) {
    return this.categoryService.find(id);
  }
}
