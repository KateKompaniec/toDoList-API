'use strict';
const tasks = [
    {
        title: 'Пройти опитування',
        description: 'Пройти опитування за цим посиланням: https://example.com/',
        done: false,
        due_date: new Date('2022-08-22')
    },
    {
        title: 'Реєстрація на TechTalk 25.08.22',
        description: 'Зареєструватись на TechTalk, який пройде 25.08.22 о 09:00. Поговоримо про багаторічну традицію нашої компанії — шаринг знань та традиційний івент з багаторічною історією — InterLink Tech Talk. За традицією, останній івент теплого сезону ми проводимо на свіжому повітрі, у форматі Open Air з пікніком та спілкуванням з колегами. Ділимося з вами коротким оглядом презентацій від наших спікерів, світлинами та атмосферою. Підготовка, саунд чек, посадочні місця — і наша офісна зона відпочинку готова зустрічати гостей. Почали ми наш Knowledge...',
        done: true,
        due_date: new Date('2022-08-23')
    },
    {
        title: 'Реєстрація на MeetUp 22.09.22',
        description: 'Зареєструватись на MeetUp, який пройде 22.09.22 о 18:00',
        done: false,
        due_date: new Date('2022-08-24')
    },
    {
        title: 'Зробити щось',
        done: false,
        due_date: new Date('2022-08-25')
    },
    {
        title: 'Кожен день робити зарядку',
        description: 'Зареєструватись на MeetUp, який пройде 22.09.22 о 18:00',
        done: false,
    }
]
    
const listOfTasks= document.querySelector('.list_of_tasks')

function printAllTasks(tasks){
    listOfTasks.innerHTML = tasks
  .map((task) => {
    return `<li id="element_of_list">
    <span class="scale" ${ task.due_date ? (isOverdueTask(task) ? "style = \"background: #E63241; border-radius: 4px 4px 0px 0px; width: 100%;\"" : 
    task.done ? "style = \"background: #58AC83; border-radius: 4px 4px 0px 0px; width: 100%; \""  : "style = \"background: #D9D9D9;border-radius: 4px 4px 0px 0px; width: 100%;\"" ): "" }></span>
    <div class="task">
    <button id="toDelete">Delete</button>
    <div class="due_date">
      <svg  width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.4998 2.33325H3.49984C2.21117 2.33325 1.1665 3.37792 1.1665 4.66659V10.4999C1.1665 11.7886 2.21117 12.8333 3.49984 12.8333H10.4998C11.7885 12.8333 12.8332 11.7886 12.8332 10.4999V4.66659C12.8332 3.37792 11.7885 2.33325 10.4998 2.33325Z" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4.6665 1.16663V3.49996M9.33317 1.16663V3.49996M1.1665 5.83329H12.8332" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <h3 ${ task.due_date ? (isOverdueTask(task) ? "style = \"color: #E63241; \"" : ""):""}>${ task.due_date ? getValidDate(task.due_date) : ""}</h3>
    </div>
    <div class="title">
    <input type="checkbox" ${task.done ? "checked" : ""}>
      <h4 ${task.done ? "style =\"color: #878787;  text-decoration: line-through;\"":""}>${task.title}</h4>
    </div>
    <div class="description">
      <p>${task.description ? task.description : ""}</p>
    </div>
    </div>
  </li>`;
  })
  .join("");

}

printAllTasks(tasks)

function getValidDate(date) {
    let time = date.toISOString().split("T")[0].split("-").reverse().join(".");
    return time;
}
function isOverdueTask(task){
    let currentDate = new Date(Date.now())
    return (task.due_date.getDate() < currentDate.getDate()) ? true :false;
}

let taskToRemove= document.getElementById("toDelete");

taskToRemove.addEventListener('click', (event) => {
    console.log(event.target);
    const target = document.getElementById("element_of_list");
    if (target.tagName === 'LI') {
        target.remove();
    }
})

