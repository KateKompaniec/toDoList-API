'use strict';


const template = document.querySelector('#taskTemplate');
const listOfTasks = document.querySelector('.list_of_tasks')

let tasks = [
    {
        title: 'Пройти опитування',
        description: 'Пройти опитування за цим посиланням: https://example.com/',
        done: false,
        due_date: new Date(new Date().setDate(new Date().getDate() - 1))

    },
    {
        title: 'Реєстрація на TechTalk 25.08.22',
        description: 'Зареєструватись на TechTalk, який пройде 25.08.22 о 09:00. Поговоримо про багаторічну традицію нашої компанії — шаринг знань та традиційний івент з багаторічною історією — InterLink Tech Talk. За традицією, останній івент теплого сезону ми проводимо на свіжому повітрі, у форматі Open Air з пікніком та спілкуванням з колегами. Ділимося з вами коротким оглядом презентацій від наших спікерів, світлинами та атмосферою. Підготовка, саунд чек, посадочні місця — і наша офісна зона відпочинку готова зустрічати гостей. Почали ми наш Knowledge...',
        done: true,
        due_date: new Date(Date.now())
    },
    {
        title: 'Реєстрація на MeetUp 22.09.22',
        description: 'Зареєструватись на MeetUp, який пройде 22.09.22 о 18:00',
        done: false,
        due_date: new Date(new Date().setDate(new Date().getDate() + 1))
    },
    {
        title: 'Зробити щось',
        done: false,
        due_date: new Date(new Date().setDate(new Date().getDate() + 2))
    },
    {
        title: 'Кожен день робити зарядку',
        description: 'Зареєструватись на MeetUp, який пройде 22.09.22 о 18:00',
        done: false,
    }
]


function getValidDate(date) {
    if (date) {
        date = new Date(date)
        let time = date.toISOString().split("T")[0].split("-").reverse().join(".");
        return time;
    } else return "";

}
function isOverdueTask(task) {
    if (!task.due_date) { 
        return false
    }
    let currentDate = new Date(Date.now())
    return (new Date(task.due_date) < currentDate) ? true : false;
}


function templateTask(task) {
    let taskClone = template.content.firstElementChild.cloneNode(true);
    console.log(taskClone);
    let taskContent = taskClone.querySelectorAll("h3, h4, p");
    let input = taskClone.querySelector("input");
    let dueDate = taskClone.querySelector(".due_date");
    taskClone.classList.add("undone");

    taskContent[0].textContent = getValidDate(task.due_date);
    taskContent[1].textContent = task.title;
    taskContent[2].textContent = task.description;

    if (task.done) {
        input.setAttribute("checked", "checked");
        taskClone.classList.add("done_task");
        taskClone.classList.remove("undone");
    }
        if (isOverdueTask(task)) {
            taskClone.classList.add("overdue");

        }  
    
     if (!task.due_date){
        dueDate.classList.add("displayDate")
     }   
    return taskClone;
}

function generateLI(task) {
    let taskNode = document.createElement('li');
    taskNode.setAttribute('id', 'element_of_list')
    taskNode.classList.toggle('done', task.done);
    taskNode.appendChild(templateTask(task))
    return taskNode;
}

function printAllTasks(tasks) {
    tasks
        .map((task) => {
            listOfTasks.appendChild(generateLI(task))
        })
        .join("");
}

function changeState(event) {
    event.stopPropagation()
    console.log(event.target.parentNode.parentNode.parentNode);
    const currentItem = event.target.parentNode.parentNode.parentNode;
    const titleofTask = currentItem.querySelector(".task .title h4").outerText
    console.log(titleofTask);
    const newItem = document.createElement('li')
    newItem.setAttribute('id', 'element_of_list')
    const tasktoChange = tasks.find(task => task.title == titleofTask)
    tasktoChange.done = !tasktoChange.done;
    newItem.classList.toggle('done', tasktoChange.done);
    newItem.appendChild(templateTask(tasktoChange))
    currentItem.replaceWith(newItem);
}

function removeTask(event) {
    event.stopPropagation();
    console.log(event.target.parentNode.parentElement, this);
    const btn = event.target.parentElement.parentElement
    if (event.target.tagName === 'BUTTON') {
        btn.remove();
    }
}
function showAllTasks(event) {
    event.stopPropagation();
    console.log(event.target, this);
    document.querySelector(".list_of_tasks").classList.toggle("show-done")
}


printAllTasks(tasks)


let tasksToRemove = document.querySelectorAll("#toDelete")
let taskstoChange = document.querySelectorAll("input")
let AllTasks = document.querySelector("#showAllTasks")


//tasksToRemove.forEach(task => task.addEventListener('click', removeTask))

let taskForm = document.forms["task"]
const defaultDone = { done: false }

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(this);
    let validTitle = document.forms["task"].elements.title;
    let formData = new FormData(taskForm);
    if (validTitle.value.length != 0) {
        let task = Object.fromEntries(formData.entries())
        task = Object.assign(task, defaultDone)
        console.log(task);
        tasks.push(task);
        listOfTasks.appendChild(generateLI(task))
        taskForm.reset();
    }
    else {
        let errText = document.querySelector(".err_empty_title");
        errText.style.opacity = "1";
        validTitle.style.border = "1px solid red";
        setTimeout(() => { errText.style.opacity = "0"; validTitle.style.border = ""; }, 2000);
    }

})