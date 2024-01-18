const btnAddElm = document.querySelector('#btn-add');
const txtElm = document.querySelector('#txt');
const taskContainerElm = document.querySelector('#task-container');

loadAllTasks();

function loadAllTasks(){
    // Todo : load all tasks from the back-end
    // if success

    const taskList = [
        {id: 1, task: 'Task1', status: false},
        {id: 2, task: 'Task2', status: true},
        {id: 3, task: 'Task3', status: true},
        {id: 4, task: 'Task4', status: false},
    ];
    taskList.forEach(task => createTask(task));
}

function createTask(task){

    const newLiElm = document.createElement('li');
    taskContainerElm.append(newLiElm);

    newLiElm.innerHTML = ` <input id="ck-task-${task.id}" type="checkbox" ${task.status? "checked" : ""}>
    <label for="ck-task-${task.id}">${task.task}</label>
    <i class="delete bi bi-trash"></i>` ;

}


// deligated event listner : li elm dianamically generate so use ul
taskContainerElm.addEventListener('click',(e)=>{
    if(e.target?.classList.contains('delete')){
        // todo : delete the task in back-end
        // if success
        e.target.closest('li').remove();
    }else if(e.target?.tagName === "INPUT" ) {
        // Todo : update the task status in the back-end
        // If not success
        if(!false){
            e.preventDefault();
        }
    }
});

let  taskId = 0 ;


btnAddElm.addEventListener('click', ()=>{
    const task = txtElm.value;
    if(task.trim().length === 0){
        txtElm.focus();
        txtElm.select();
        return;
    }

    // todo : save the task in the back-end 
    // if success

    createTask({id: taskId++, task , status: false });

    txtElm.value = "" ;
    txtElm.focus();
});