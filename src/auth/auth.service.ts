import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDocument, AuthModel } from './entities/auth.entity';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer'
import * as bcrypt from 'bcrypt';
import { hash } from 'bcrypt';
import * as url from 'url';
import { JwtService } from '@nestjs/jwt';
import { CategoryDocument, CategoryModel } from 'src/category/entities/category.entity';
import { AccountDocument, AccountModel } from 'src/account/entities/account.entity';


@Injectable()
export class AuthService {

  constructor(
    @InjectModel(AuthModel) private auth: Model<AuthDocument>,
    @InjectModel(CategoryModel) private category: Model<CategoryDocument>,
    @InjectModel(AccountModel) private account: Model<AccountDocument>,
    private jwtService: JwtService) {
    console.log(category, account)
  }




  async sendEmail(email, token) {

    // console.log(email);
    // console.log(token);


    const urlObject = url.format({
      protocol: 'https',
      host: 'www.example.com',
      pathname: '/my/path',
      query: {
        data: token,
      }
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      requireTLS: true,
      secure: false,
      auth: {
        user: "usama.tezeract@gmail.com",
        pass: "rplg uhms txwg mtzx"
      }
    })

    const emailTemplate = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body style="
background-color: #e9ecef;
-ms-text-size-adjust: 100%;
-webkit-text-size-adjust: 100%;
width: 100% !important;
height: 100% !important;
padding: 0 !important;
margin: 0 !important;
font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
">
    <table width="100%" border="0"  cellpadding="0" cellspacing="0">
        <tr>
            <td>
                <table width="100%" style="max-width: 600px;" cellpadding="0" cellspacing="0"
                    style="  border-collapse: collapse !important;">
                    <tr>
                        <td align="center" valign="top" style="
                        padding: 36px 24px;
                        -ms-text-size-adjust: 100%;
                        -webkit-text-size-adjust: 100%;
                        mso-table-rspace: 0pt;
                        mso-table-lspace: 0pt;">
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table width="100%" style="max-width: 600px;" cellpadding="0" cellspacing="0"
                    style="  border-collapse: collapse !important;">
                    <tr>
                        <td align="center" style="padding: 36px 24px 0;" bgcolor="#ffffff">
                            <a href="#" style="cursor:default;">
                                <img class="dark-image" alt="FLuenTalkAI" style="width:250px"
                                    src="https://res.cloudinary.com/dy1bkgag6/image/upload/v1700042052/image_21_mfm78q.png">
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <tr>
            <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="
                max-width: 600px;
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
                mso-table-rspace: 0pt;
                mso-table-lspace: 0pt;
                border-collapse: collapse !important;">
                    <tr>
                        <td align="left" bgcolor="#ffffff" style="
                    padding: 20px 20px 0;
                    font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                    mso-table-rspace: 0pt;
                    mso-table-lspace: 0pt;
                  ">
                            <h1 style="
                      margin: 0;
                      font-size: 32px;
                      font-weight: 700;
                      letter-spacing: -1px;
                      line-height: 48px;
                    ">
                                OTP Verification
                            </h1>
                        </td>
                    </tr>
                </table>
        <tr>
            <td align="center">
                <table width="100%" style="max-width: 600px;" cellpadding="0" cellspacing="0"
                    style="  border-collapse: collapse !important;">
                    <tr>
                        <td align="left" style="padding: 20px 20px 0;" bgcolor="#ffffff">
                            <p style="margin: 0; text-align: center; line-height: 25px;">
                                To complete the registration process, please click on button below to set your password
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table width="100%" style="max-width: 600px;" cellpadding="0" cellspacing="0"
                    style="  border-collapse: collapse !important;">
                    <tr>
                        <td align="center" style="padding: 20px 20px 0" bgcolor="#ffffff">
                            <a href=${urlObject} style="cursor: pointer;">

                                <button
                                    style="padding: 10px; cursor: pointer; background-color: crimson; outline: none; border: none; color: white; border-radius: 5px;">Set
                                    Password</button>
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table width="100%" style="max-width: 600px;" cellpadding="0" cellspacing="0"
                    style="  border-collapse: collapse !important;">
                    <tr>
                        <td align="left" style="padding: 10px 10px 0" bgcolor="#ffffff">
                            <p style="line-height: 25px;">
                                Thank you, <br>
                                The Fluent AI Team
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table width="100%" style="max-width: 575px;" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="left" style="padding: 10px 10px 0">
                            <p style="margin: 0; text-align: center;">
                                You received this email because we received a request for
                                account registration on Fluent Talk AI. If you didn't request
                                email signup you can safely delete this email.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

    </table>
</body>

</html>
`

    const mailOptions = {
      from: "usama.tezeract@gmail.com",
      to: email,
      subject: "User Verification",
      html: emailTemplate,
    }

    return transporter.sendMail(mailOptions)
      .then(() => {
        // console.log('email sent');
        return true
      })
      .catch((err) => {
        console.log(err);
        return false
      })
  }

  async register(body) {
    // const { name, email } = body
    try {
      var user = await this.auth.findOne({ email: body.email })

      if (user) {
        if (user.isVerified === true) {
          throw new ServiceUnavailableException('User already exsist.')
        }
        else if (user.isVerified === false) {
          const expireIn = new Date().getTime() + 300 * 1000

          // const expireIn = new Date().getTime() + 300 * 1000
          const payload = { sub: body.email }

          const token = await this.jwtService.signAsync(payload)
          console.log('email', body.email);

          const isEmailSent = await this.sendEmail(body.email, token)

          if (isEmailSent === true) {
            // const user = { ...body, expireIn: this.expireIn }
            const newUser = await this.auth.findOneAndUpdate({ email: body.email }, { expireIn, token }, { new: true })

            return {
              message: 'An email is sent to you',
              statusCode: 200,
              newUser
            }
          }
          else {
            throw new InternalServerErrorException('Error sending email')
          }
        }
      }
      else {
        const payload = { sub: body.email }
        const token = await this.jwtService.signAsync(payload)
        const expireIn = new Date().getTime() + 300 * 1000
        console.log(body.email)

        const isEmailSent = await this.sendEmail(body.email, token)
        if (isEmailSent === true) {
          const user = { ...body, expireIn, token }
          const newUser = await this.auth.create(user)
          return {
            message: 'An email is sent to you',
            statusCode: 200,
            newUser
          }
        }
        else {
          throw new InternalServerErrorException('Error sending email')
        }
      }
    } catch (error) {
      // console.log(error)
      return error.response
    }
  }

  async savePassword(body) {

    try {
      const { data, password } = body
      console.log(data)

      const decodedToken = this.jwtService.decode(data)
      console.log(decodedToken)
      var user = await this.auth.findOne({ email: decodedToken.sub })

      if (user) {

        const currentTime = new Date().getTime()
        const timeDifference = user.expireIn - currentTime

        console.log('current', currentTime)
        console.log('saved', user.expireIn)
        console.log('timeDiff', timeDifference)

        if (timeDifference < 0) {
          throw new ServiceUnavailableException("Time out register again")
        }
        else {

          const hashedPassword = await hash(password, 10)
          const newUser = await this.auth.findOneAndUpdate({ email: decodedToken.sub }, { password: hashedPassword, isVerified: true }, { new: true })
          console.log(newUser)

          const categories = {
            name: ['home', 'shopping', 'gifts', 'mobile', 'family'],
            user: newUser._id
          }

          const accounts = {
            account: [{ 'accountType': 'cash', 'balance': 0 }, { 'accountType': 'savings', 'balance': 0 }],
            user: newUser._id
          }

          try {
            await this.account.create(accounts)
            await this.category.create(categories)
          } catch (error) {
            console.log(error)
          }

          console.log('User registered successfully')

          return {
            statusCode: 200,
            message: 'User registered',
            newUser
          }
        }
      }
      else {
        throw new NotFoundException('User not found')
      }

    } catch (error) {
      return error.response
    }
  }


  async resendLink(body) {
    // try {
    try {
      var user = await this.auth.findOne({ email: body.email })
    } catch (error) {
      console.log(error)
    }

    if (user) {

      const currentTime = new Date().getTime()
      const difference = user.expireIn - currentTime

      if (difference > 0) {
        console.log('condition true')
        throw new ServiceUnavailableException('The service is currently unavailable and cannot regenerate the URL. Please try again later.')
      }
      else {
        console.log('condition true 1')
        const payload = { sub: body.email }
        const token = await this.jwtService.signAsync(payload)
        const isEmailSent = await this.sendEmail(body.email, token)
        console.log(isEmailSent)

        if (isEmailSent === true) {
          try {
            const expireIn = new Date().getTime() + 300 * 1000
            const newUser = await this.auth.findOneAndUpdate({ email: body.email }, { token, expireIn }, { new: true })
            // return { message: 'An email is sent to you for verification' }
            return {
              message: 'An otp is sent on provided email to you for verification',
              success: true,
              data: newUser
            }
          }
          catch (error) {
            console.log(error)
          }
        }
        else {
          throw new InternalServerErrorException('Error sending email.')
        }
      }
    } else {
      throw new NotFoundException('User not Found')
    }
    // } catch (error) {
    //    console.log(error)
    // }
  }


  async resetPassword(body) {

    const { email, oldPassword, newPassword } = body
    try {
      var user = await this.auth.findOne({ email })
      console.log(user);

    } catch (error) {
      console.log(error)
    }

    if (user) {
      const result = await bcrypt.compare(oldPassword, user.password)
      if (!result) {
        throw new NotFoundException('Password is incorrect')
      }
      else {
        const hashedPassword = await hash(newPassword, 10)
        try {
          const newUser = await this.auth.findOneAndUpdate({ email }, { password: hashedPassword })
          return {
            message: 'Password reset successfully.',
            data: newUser,
            statusCode: 200
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    else {
      throw new NotFoundException('User not found.')
    }
  }

  async forgetPassword(body) {

    const payload = { sub: body.email }
    const token = await this.jwtService.signAsync(payload)
    const result = await this.sendEmail(body.email, token)

    if (result === true) {
      try {
        const expireIn = new Date().getTime() + 300 * 1000
        const newUser = await this.auth.findOneAndUpdate({ email: body.email }, { expireIn }, { new: true })
        
        return {
          message: 'An otp is sent to you',
          data: newUser,
          statusCode: 200
        }
      } catch (error) {
        console.log(error)
      }
    }
    else {
      throw new InternalServerErrorException('Error sending email')
    }
  }


  async login(body) {
    try {
      try {
        var user = await this.auth.findOne({ email: body.email })

      } catch (error) {
        console.log(error)
      }
      if (!user) {
        // console.log('1');
        throw new NotFoundException('User not found.')
      }

      const result = await bcrypt.compare(body.password, user.password)
      // console.log(result)

      if (!result) {
        //  console.log('2');
        throw new BadRequestException('Email or password is incorrect.')
      }

      else {
        const payload = { sub: user.password, username: user.name }
        const token = await this.jwtService.signAsync(payload)
        // console.log(token)
        return {
          token,
          user
        }
      }

    } catch (error) {
      // console.log(error)
      return error.response
    }

  }

}









