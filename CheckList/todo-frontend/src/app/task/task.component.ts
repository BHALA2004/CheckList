import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task.model';
import{FormsModule} from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{
  constructor(private taskService:TaskService){}

  newTask:Task = { description:"",completed:false};
  
  tasks:Task[]=[];

  editingtask:Task|null=null;
  updatedTask:Task={description:"",completed:false};

  ngOnInit(): void {
    this.getAllTasks();
  }

  createTask():void{
    this.taskService.createTask(this.newTask).subscribe((createdTask)=> {
        this.newTask={description:"",completed:false}; //reset
        this.tasks.push(createdTask);
    })
  }

  getAllTasks(){
    this.taskService.getAllTasks().subscribe((tasks)=>{
      this.tasks=tasks;
    })
  }

  editTask(task:Task){
    this.editingtask=task;
    this.updatedTask={...task};  
  }

  updateTask():void{
    if(this.editingtask){
      this.taskService.updateTask(this.editingtask.id!,this.updatedTask).subscribe((result) =>{
        
       const index = this.tasks.findIndex((task) => task.id==this.editingtask!.id);
       if(index!=-1){
        this.tasks[index]=result;
        //close edit
        this.cancelEdit()
       }
      })
    }
  }

  cancelEdit(){
    this.editingtask=null;
    this.updatedTask={description:"",completed:false};
  }

  deleteTask(taskId:any){
    if(confirm('Delete the Task now'))
      this.taskService.deleteTask(taskId).subscribe(() =>{
      this.tasks =  this.tasks.filter((task) => task.id!==taskId)
      if(this.editingtask && this.editingtask.id == taskId){
      this.cancelEdit();
      }
    })

  }

}
