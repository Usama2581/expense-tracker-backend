import { Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDocument, AuthModel } from 'src/auth/entities/auth.entity';
import { Model } from 'mongoose';
import { CategoryDocument, CategoryModel } from 'src/category/entities/category.entity';
import { TransactionDocument, TransactionModel } from './entities/transaction.entity';
import { AccountDocument, AccountModel } from 'src/account/entities/account.entity';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectModel(AuthModel) private auth: Model<AuthDocument>,
    @InjectModel(CategoryModel) private category: Model<CategoryDocument>,
    @InjectModel(TransactionModel) private transactions: Model<TransactionDocument>,
    @InjectModel(AccountModel) private account: Model<AccountDocument>
  ) { }

  async create(body) {
    try {
      const { userId, transactionType, amount, category, accountType } = body

      if (transactionType === 'expense') {

        const user = await this.auth.findById(userId)

        if (user) {

          const categories = await this.category.findOne({ user: user._id })
          const categoryExists = categories.name.find(item => item === category)
          // console.log(categoryExists)

          if (categoryExists) {
            const data = await this.account.findOne({ user: user._id })

            const { account } = data
            const accounts = account.find(item => item.accountType === accountType)

            if (accounts) {
              if (accounts.balance < amount) {
                throw new NotFoundException('amount is not enough')
              }
              else {
                if(amount < 0 || amount === 0) {
                  throw new ServiceUnavailableException(`invalid amount ${amount}`)
                }
                 account.find(item => {
                  if (item.accountType === accountType) {
                    console.log(true)
                    item.balance = item.balance - amount
                    // console.log(item.balance)
                  }
                })
                const newAccount = await this.account.findOneAndUpdate({ user: user._id },
                  { account },
                  { new: true })
                  const transaction = await this.transactions.create(body)
                  return {
                    message: 'trasnaction successfull.',
                    statusCode: 200,
                    transaction,
                    newAccount
                  }
              }
            }
            else {
              throw new NotFoundException('account not found')
            }
          }
          else {
            throw new NotFoundException("category not found")
          }
        }
        else {
          throw new NotFoundException('User not found.')
        }
      } 
      else if (transactionType === 'income') {
         if(amount < 0 || amount === 0) {
          throw new ServiceUnavailableException(`invalid amount ${amount}`)
         }
         else {
           const user = await this.auth.findById(userId)
           if (user) {
              
             const data = await this.account.findOne({ user: user._id })
             const { account } = data
             const accounts = account.find(item => item.accountType === accountType)
   
             if (accounts) {
               data.account.find(item => {
                 if (item.accountType === accountType) {
                   item.balance = item.balance + amount
                 }
               })
               const newAccount = await this.account.findOneAndUpdate({ user: user._id },
                 { account },
                 { new: true })
                 const transaction = await this.transactions.create(body)
                     return {
                       message: 'trasnaction successfull.',
                       statusCode: 200,
                       transaction,
                       newAccount
                     }
             }
             else {
               throw new NotFoundException('Invalid account')
             }
           }
           else {
             throw new NotFoundException('User not found')
           }
         }
      }

      else {
        throw new NotFoundException('Incorrect transaction type')
      }

    }
    catch (error) {
      return error.response
    }
  }

  async findAll(id) {
    try {
      const user = await this.auth.findById(id)
      if (user) {
        const transaction = await this.transactions.find({ userId: id }).populate('userId')
        return transaction
      }
      else {
        throw new NotFoundException('User found')
      }
    } catch (error) {
      return error.response
    }
  }


}
