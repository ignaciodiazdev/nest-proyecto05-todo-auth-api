import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService
  ){}
  
  async create(email: string, password: string, name: string) {
    return await this.prisma.user.create({
      data: { email, password, name },
    })
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string){
    return await this.prisma.user.findUnique({ where: { email } });
  }
}
