import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController{
    constructor(private readonly taskService:TasksService){}


    @Get()
    getTasks(){
        return "this.taskService.getAll()";
    }

    @Get(':id')
    getTaskById(@Param('id') taskId: number){
        return this.taskService.getTaskById(taskId);
    }

    @Post()
    addTask(
        @Body('title') taskTitle:string,
        @Body('description') taskDescrption: string)
        {
            return this.taskService.addTask(taskTitle, taskDescrption);
        }

    @Patch(':id')
    updateTask(@Param('id') taskId: number,
                @Body('title') taskTitle: string,
                @Body('description') taskDescription: string,
                @Body('completed') taskCompleted: boolean
                ){
                   return this.taskService.updateTask(taskId,taskTitle, taskDescription, taskCompleted);
                }

    @Delete(':id')
    deleteTask(@Param('id') taskId: number){
        return this.taskService.deleteTask(taskId);
    }
    
    
    
}