const btnAddElm = document.querySelector('#btn-add');
const txtElm = document.querySelector('#txt');
const taskContainerElm = document.querySelector('#task-container');

loadAllTasks();

function loadAllTasks(){
    // Todo : load all tasks from the back-end
    // if success

    fetch('http://localhost:8080/tasks').then(res => {
        if (res.ok){
            res.json().then(taskList => taskList.forEach(task => createTask(task))) ;
        }else{
            alert("Failed to load task list");
        }
    }).catch(err => {
        alert("Something went wrong, try again later");
    });
}

function createTask(task){

    const newLiElm = document.createElement('li');
    taskContainerElm.append(newLiElm);
    newLiElm.id = "task-" + task.id;
    
    newLiElm.innerHTML = `
        <input id="chk-task-${task.id}" type="checkbox" ${task.status ? "checked": ""}>
        <label for="chk-task-${task.id}">${task.description}</label>
        <i class="delete bi bi-trash"></i>    
    `;

}


// deligated event listner : li elm dianamically generate so use ul
taskContainerElm.addEventListener('click',(e)=>{
    if(e.target?.classList.contains('delete')){
        // todo : delete the task in back-end
        // if success

        const taskId = e.target.closest('li').id.subString(5);

        fetch(`http://localhost:8080/tasks/${taskId}`, {method : 'DELETE'})
        .then(res=>{
            if(res.ok){
                e.target.closest("li").remove();
            }else{
                alert("Failed to delete the task");
            }
        }).catch(err => {
            alert("Something went wrong, try again later");
        });
        
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