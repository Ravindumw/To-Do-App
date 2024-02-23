import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {TaskDTO} from "../dto/taskDTO";
import {catchError, finalize, tap} from "rxjs";
import {TaskService} from "./task-service";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  onSnapshot,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where
} from "@angular/fire/firestore";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class CloudStoreTaskService implements TaskService{

  private taskList: Array<TaskDTO> = [];
  private initialized = false;

  constructor(private db: Firestore,
              private toastService: ToastrService,
              private authService: AuthService) {
    const taskListQuery = query(collection(db, "tasks"),
      where("email","==",authService.getPrinciple()?.email));

    // const tasksListSnapshot = getDocs(taskListQuery);
    //     tasksListSnapshot.then(docs => {
    //       docs.forEach(doc => {
    //         unsortedTaskList.push({...doc.data(), id: doc.id} as TaskDTO & {timestamp: Timestamp});
    //       })
    //     }).finally(()=> {
    //       this.initialized = true;
    //       this.taskList = unsortedTaskList.toSorted(
    //         (a, b) => {
    //           return a.timestamp > b.timestamp ? 1: -1;
    //       });
    //     });


    /* To get real-time updates */
    onSnapshot(taskListQuery, (docs)=>{
      if (docs.metadata.hasPendingWrites) return;
      const unsortedTaskList:Array<TaskDTO & {timestamp: Timestamp}> = [];
      this.taskList = [];
      docs.forEach(doc => {
              unsortedTaskList.push({...doc.data(), id: doc.id} as TaskDTO & {timestamp: Timestamp});
            });
            this.initialized = true;

      /* We have to sort this task list manually because firebase cloud store does not support this
       * https://firebase.google.com/docs/firestore/query-data/order-limit-data#limitations */

            unsortedTaskList.toSorted((a, b) => {
                return a.timestamp > b.timestamp ? 1: -1;
              });
            this.taskList = unsortedTaskList;
    },error => {
      this.initialized = true;
      this.errorHandler();
    });
  }
  isInitialized(){
    return this.initialized;
  }

  getAllTasks(){
    return this.taskList;
  }
  deleteTask(task: TaskDTO){
    const docRef = doc(this.db, "tasks", task.id as string);
    deleteDoc(docRef).catch(this.errorHandler);
  }
  createTask(description: string): Promise<void> {
    const taskDTO = new TaskDTO(null, description, false, this.authService.getPrinciple()!.email!);
    return new Promise<void>(async (resolve, reject) => {
      try {
        const data: TaskDTO & {timestamp: any, id?: any} = {...taskDTO , timestamp: serverTimestamp()};
        delete  data.id;
        await addDoc(collection(this.db, "tasks"), data);
        resolve();
      }catch (e){
        reject();
        this.errorHandler();
      }
    });
  }
  updateTask(task: TaskDTO){
    const docRef = doc(this.db, "tasks", task.id as string);
    updateDoc(docRef, {status: !task.status}).catch(this.errorHandler);
  }

  private errorHandler(){
    this.toastService.error('Something went wrong<br> Please try again!');
  }
}
