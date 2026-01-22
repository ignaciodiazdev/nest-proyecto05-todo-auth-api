import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/decorator/user.decorator';
import type { JwtPayload } from 'src/auth/jwt.payload';

@UseGuards(AuthGuard())
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @User('sub') userId: JwtPayload['sub'],
    @Body() createTaskDto: CreateTaskDto
  ) {
    return this.tasksService.create(createTaskDto, userId);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('/my-tasks')
  findMyTasks(
    @User('sub') userId: JwtPayload['sub'],
    @Query('completed') completed?: boolean,
  ) {
    return this.tasksService.findMyTasks(userId, completed);
  }

  @Get(':id')
  findOne(
    @User('sub') userId: JwtPayload['sub'],
    @Param('id', ParseUUIDPipe) taskId: string,
  ) {
    return this.tasksService.findOne(taskId, userId);
  }

  @Patch(':id')
  update(
    @User('sub') userId: JwtPayload['sub'],
    @Param('id', ParseUUIDPipe) taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(taskId, userId, updateTaskDto);
  }

  @Delete(':id')
  remove(
    @User('sub') userId: JwtPayload['sub'],
    @Param('id', ParseUUIDPipe) taskId: string,
  ) {
    return this.tasksService.remove(taskId, userId);
  }
}
