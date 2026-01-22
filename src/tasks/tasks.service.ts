import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class TasksService {

  constructor(
    private readonly prisma: PrismaService,
  ){}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    const { title, description, completed  } =  createTaskDto;
    
    return this.prisma.task.create({
      data: {
        title,
        description,
        completed,
        userId,
      }
    })
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  async findMyTasks(userId: string, completed?: boolean){
    return await this.prisma.task.findMany({
      where: { 
        userId,
        ...(completed !== undefined && { completed }),
      },
    });
  }

  async findOne(taskId: string, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId, userId },
    });
  
    if(!task) throw new NotFoundException('Tarea no encontrada');
    
    return task;
  }

  async update(taskId: string, userId: string, updateTaskDto: UpdateTaskDto) {
    try {
      return await this.prisma.task.update({
        data: updateTaskDto,
        where: { id: taskId, userId },
      });

    } catch (error) {
      if(Prisma.PrismaClientKnownRequestError && error.code === 'P2025'){
        throw new NotFoundException('Tarea no encontrada');
      }
      throw Error;
    }
  }

  async remove(taskId: string, userId: string) {
    try {
      await this.prisma.task.delete({
        where: { id: taskId, userId },
      });

    } catch (error) {
      if(Prisma.PrismaClientKnownRequestError && error.code === 'P2025'){
        throw new NotFoundException('Tarea no encontrada');
      }
      throw Error;
    }
  }
}
