import { Injectable } from '@nestjs/common';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private db: lowdb.LowdbAsync<any>;

  constructor(private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    this.initDatabase();
  }

  private async initDatabase() {
    const adapter = new FileAsync('db.json');
    this.db = await lowdb(adapter);
    const users = await this.db.get('users').value();
    if (!users) {
      await this.db.set('users', []).write();
    }
  }

  async register(registerDto: RegisterDto): Promise<any> {
    const { email, password } = registerDto;
    const existingUser = await this.db.get('users').find({ email }).value();
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, password: hashedPassword };
    await this.db.get('users').push(newUser).write();
    return { message: 'User registered successfully' };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.db.get('users').find({ email }).value();
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const payload = { email: user.email };

    console.log('JWT Secret:', process.env.JWT_SECRET);

    try {
      const token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h'
      });
      console.log('JWT token generated successfully');
      return { access_token: token };
    } catch (error) {
      console.log('Error signing JWT:', error);
      throw error;
    }
  }
}