import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime/client';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class TasksService {

  constructor(
    private readonly prisma: PrismaService,
  ){}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    const {  description } =  createTaskDto;
    
    return this.prisma.task.create({
      data: {
        description,
        userId,
      }
    })
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
  
    if(!task) throw new NotFoundException('Tarea no encontrada');
    
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      return await this.prisma.task.update({
        data: updateTaskDto,
        where: { id },
      });

    } catch (error) {
      if(Prisma.PrismaClientKnownRequestError && error.code === 'P2025'){
        throw new NotFoundException('Tarea no encontrada');
      }
      throw Error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.task.delete({
        where: { id },
      });

    } catch (error) {
      if(Prisma.PrismaClientKnownRequestError && error.code === 'P2025'){
        throw new NotFoundException('Tarea no encontrada');
      }
      throw Error;
    }
  }
}
