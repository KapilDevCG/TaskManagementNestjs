import { Injectable, NotFoundException } from "@nestjs/common";
import { Tasks } from "./tasks.modle";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TasksService{
    constructor(private prisma: PrismaService){}

     tasks: Tasks[]=[];

     getAll(){
        //return [...this.tasks];
        return this.prisma.tasks.findMany();
     }

     getTaskById(taskId: number){
        //const [resultTask, index]= this.findTask(taskId);
        const resultTask=this.prisma.tasks.findUnique({where: {id: Number(taskId)}});
        if(!resultTask){
            throw new NotFoundException("No task with this id available");
        }
        return resultTask;
     }

      async addTask(taskTitle: string, taskDescrption: string){
        //const newTask:Tasks=new Tasks(this.tasks.length+1, taskTitle, taskDescrption, false);
        return this.prisma.tasks.create({
            data:{title: taskTitle, description: taskDescrption, completed: false},
        });
        
        
     }

     async updateTask(taskId: number, 
        taskTitle: string,
        taskDescription: string, 
        taskCompleted: boolean){
            try{
            const resultTask=await this.prisma.tasks.findUnique({where: {id: Number(taskId)}});
            return await this.prisma.tasks.update({
                data:{
                    title: taskTitle || resultTask.title,
                    description: taskDescription || resultTask.description,
                    completed: taskCompleted || false //resultTask.completed
                },
                where: {id: Number(taskId)}
            });
            }catch (error){
                throw new NotFoundException("No task with this Id");
            }
            /*const [resultTask, index]=this.findTask(taskId);
            if(!resultTask) throw new NotFoundException("Task with this id not found");
            this.tasks[index].title=taskTitle || resultTask.title;
            this.tasks[index].description=taskDescription || resultTask.description;
            this.tasks[index].completed=taskCompleted || resultTask.completed;

            //return "Task updated successfully.";*/
        }

    async deleteTask(taskId: number){
        //const nextTask= await this.prisma.tasks.findUnique({where: {id: Number(taskId)}});
        try{
        await this.prisma.tasks.delete({where: {id: Number(taskId)}});
        return "Task Deleted";
        }catch(error){
            throw new NotFoundException("No Task with this id");
        }
        
       /* const[ newTask,index]=this.findTask(taskId);
        if(index==-1) throw new NotFoundException("No Task with this id");
        
        this.tasks.splice(index, 1);
        return "Task deleted successfully";*/
    }

/*
    private findTask(id: number): [Tasks, number]{
            const index=this.tasks.findIndex((t)=> t.id == id);
            const task=this.tasks[index];
            return [task, index];
        } */
}