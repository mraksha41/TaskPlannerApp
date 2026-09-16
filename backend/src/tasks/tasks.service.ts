import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name)
        private readonly taskModel: Model<Task>,
    ) {}

    async findAll(): Promise<Task[]> {
        return this.taskModel.find().sort({ createdAt: -1 }).exec();
    }

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskModel.create(createTaskDto);
    }

    async update(
        id: string,
        updateTaskDto: UpdateTaskDto,
    ): Promise<Task> {
        const task = await this.taskModel
            .findByIdAndUpdate(id, updateTaskDto, {
                new: true,
            })
            .exec();

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        return task;
    }
}