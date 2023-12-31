import { Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDocument, CategoryModel } from './entities/category.entity';
import mongoose, { Model, Types } from 'mongoose';
import { AuthDocument, AuthModel } from 'src/auth/entities/auth.entity';

@Injectable()
export class CategoryService {

  constructor(
    @InjectModel(CategoryModel) private category: Model<CategoryDocument>,
    @InjectModel(AuthModel) private auth: Model<AuthDocument>,
    // private auth: AuthService
  ) { }

  async create(id, body) {

    try {
      // console.log(body)
      const { name } = body
      const user = await this.auth.findById(id)
      if (user) {
        const categories = await this.category.findOne({ user: user._id })
        const categoryExists = categories.name.find(category => category === name)

        if (!categoryExists) {
          categories.name.push(name)
          const data = await categories.save()
          return {
             message: 'new category added',
             statusCode: 200,
             categories: data
          }
        } else {
          throw new ServiceUnavailableException('This category is already available')
        }
        // return categories
      } else {
        throw new NotFoundException('User not found.')
      }
    } catch (error) {
      return error.response
    }
  }

  async find(id) {
    try {
      const user = await this.auth.findById(id)
      if(user) {
         const data = await this.category.findOne({ user: user._id }).populate('user')
         return {
          statusCode: 200,
          data
         }
      }
      else {
        throw new NotFoundException('user not found.')  
      }
    } catch (error) {
      return error.response
    }
  }

}
