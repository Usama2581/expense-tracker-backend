import { ConflictException, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccountDocument, AccountModel } from './entities/account.entity';
import { Model } from 'mongoose';
import { AuthDocument, AuthModel } from 'src/auth/entities/auth.entity';


@Injectable()
export class AccountService {

  constructor(
    @InjectModel(AccountModel) private account: Model<AccountDocument>,
    @InjectModel(AuthModel) private auth: Model<AuthDocument>,
  ) { }

  async create(id, body) {
    try {
      const { accountType, balance } = body

      const user = await this.auth.findById(id)
      if (user) {

        const data = await this.account.findOne({ user: user._id })

        const { account } = data
        const accounts = account.find(item => item.accountType === accountType)
        console.log(accounts)
        if (accounts) {
          throw new NotFoundException('Payment method already exsist.')
        }
        else {
          if (balance < 0) {
             throw new ConflictException('Negative amount cannot be added')
          }
          else {
            let newObj = { "accountType": accountType, "balance": balance }
            account.push(newObj)
            const result = await data.save()
            return {
              statusCode: 200,
              message: 'Added',
              result
            }
          }
          // throw new NotFoundException('Payment method is not available')
        }
      }
      else {
        throw new NotFoundException('User not found.')
      }
    } catch (error) {
      return error.response
    }
  }


  async findTotalBalance(id) {
    try {
      const user = await this.auth.findById(id)
      if (!user) {
        throw new NotFoundException('User not found')
      }
      else {
        var sum = 0
        const data = await this.account.findOne({ user: user._id })
        const { account } = data
        for (let i = 0; i < account.length; i++) {
          sum = sum + account[i].balance
        }
        return sum
      }
    } catch (error) {
      return error.response
    }
  }

  async findAccount(id) {
    try {
      const user = await this.auth.findById(id)
      if (user) {
        return this.account.findOne({ user: user._id })
      }
      else {
        throw new NotFoundException('User not found.')
      }
    } catch (error) {
      return error.response
    }
  }





}
