import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import {auth} from './firebase.js';

const googleProvider = new GoogleAuthProvider();
const txtElm = document.querySelector("#txt");
const btnAddElm = document.querySelector("#btn-add");
const btnSignInElm = document.querySelector("#btn-sign-in");
const btnSingOutElm = document.querySelector("#btn-sign-out");
const taskContainerElm = document.querySelector("#task-container");
const loginOverlayElm = document.querySelector("#login-overlay");
const loaderElm = document.querySelector("#loader");
const {API_URL} = process.env;
let loggedUser = null;

onAuthStateChanged(auth, user => {
    loaderElm.classList.add('d-none');
    loggedUser = user;
    console.log(loggedUser);
    if (user){
        loginOverlayElm.classList.add('d-none');
        loadAllTasks();
    }else{
        loginOverlayElm.classList.remove('d-none');
    }
});

btnSingOutElm.addEventListener('click', ()=>{
    signOut(auth);
});

btnSignInElm.addEventListener('click', ()=>{
    signInWithPopup(auth, googleProvider);
});

function loadAllTasks(){
    fetch(`${API_URL}/tasks?email=${loggedUser.email}`).then(res => {
        if (res.ok){
            res.json().then(taskList => {
                taskContainerElm.querySelectorAll("li").forEach(li => li.remove());
                taskList.forEach(task => createTask(task))
            }) ;
        }else{
            alert("Failed to load task list");
        }
    }).catch(err => {
        alert("Something went wrong, try again later");
    });
}
function createTask(task){
    const liElm = document.createElement('li');
    taskContainerElm.append(liElm);
    liElm.id = "task-" + task.id;
    liElm.className = 'd-flex justify-content-between p-1 px-3 align-items-center';
    liElm.innerHTML = `
        <div class="flex-grow-1 d-flex gap-2 align-items-center">
            <input class="form-check-input m-0" id="chk-task-${task.id}" type="checkbox" ${task.status ? "checked": ""}>
            <label class="flex-grow-1" for="chk-task-${task.id}">${task.description}</label>
        </div>
        <i class="delete bi bi-trash fs-4"></i>    
    `;
}
taskContainerElm.addEventListener('click', (e)=>{
    if (e.target?.classList.contains('delete')){
        const taskId = e.target.closest('li').id.substring(5);
        fetch(`${API_URL}/tasks/${taskId}`, {method: 'DELETE'})
        .then(res => {
            if (res.ok){
                e.target.closest("li").remove();
            }else{
                alert("Failed to delete the task");
            }
        }).catch(err => {
            alert("Something went wrong, try again later");
        });  
    } else if (e.target?.tagName === "INPUT"){
        // Todo: Update the task status in the back-end
        const taskId = e.target.closest('li').id.substring(5);
        const task = {
            description: e.target.nextElementSibling.innerText,
            status: e.target.checked
        };
        fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        }).then(res => {
            if (!res.ok){
                e.target.checked = false;
                alert("Failed to update the task status");
            }
        }).catch(err => {
            e.target.checked = false;
            alert("Something went wrong, try again");
        })
    }
});
btnAddElm.addEventListener('click', ()=>{
    const taskDescription = txtElm.value;
    
    if (!taskDescription.trim()){
        txtElm.focus();
        txtElm.select();
        return;
    }
    fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({description: txtElm.value, email: loggedUser.email})
    }).then(res => {
        if (res.ok){
            res.json().then(task => {
                createTask(task);
                txtElm.value = "";
                txtElm.focus();
            });
        }else{
            alert("Failed to add the task");
        }
    }).catch(err => {
        alert("Something went wrong, try again later");
    });
});