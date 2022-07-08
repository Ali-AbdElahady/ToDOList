let addTaskButton = document.querySelector(".add");
let inputContent = document.querySelector(".input");
let taskContainer = document.querySelector(".task-container");

const tasks = [];
let id = 0;

inputContent.focus();




addTaskButton.addEventListener("click", appendTask);

function appendTask() {
  const createTask = document.createElement("div");
  createTask.classList.add("task");
  createTask.setAttribute("data-taskid", `item-${id}`);

  const createP = document.createElement("p");
  createP.classList.add("para");
  createP.innerText = inputContent.value;

  const taskObj = {
    value : inputContent.value,
    taskId : id++,
  };

  tasks.push(taskObj);

  const createInput = document.createElement("button");
  createInput.classList.add("delete");
  createInput.innerText = "Delete";

  createInput.addEventListener("click", (e) => {
    const deleteButton = document.querySelector(".delete");

    const currID = tasks.findIndex((item) => {
      
      console.log(item.taskId);
      console.log(taskObj.taskId);
      return item.taskId === taskObj.taskId;
    });
    tasks.splice(currID, 1);

    console.log(taskObj.taskId);
    console.log(currID);
    

    e.target.parentElement.remove();

    window.localStorage.setItem("array",JSON.stringify(tasks));

    
  });

  createTask.appendChild(createP);
  createTask.appendChild(createInput);
  taskContainer.appendChild(createTask);
  
  if (window.localStorage.getItem("array")) {
    
    window.localStorage.setItem("array",JSON.stringify(tasks));
  } else {
    
    window.localStorage.setItem("array", JSON.stringify(tasks));
  }
  inputContent.value="";
  inputContent.focus();


}

window.onload = function renderLocalstorage() {
  const localArr=JSON.parse(localStorage.getItem('array')); 
  // console.log(localArr.length)
  function setId(){
    if(localStorage.getItem("array")){
      id = localArr.length;
     
   }else{
      id = 0;
   }
  }
  
  setId()
  
  // console.log(id)
  // console.log(localArr);
  // console.log(JSON.parse(localArr));
  if (localStorage.getItem("array")) {

    tasks.push(...JSON.parse(localStorage.getItem("array")));

    console.log(tasks);
    tasks.forEach((element,idx,arr) => {

      const createTask = document.createElement("div");
      createTask.classList.add("task");
      createTask.setAttribute("data-taskid", `item-${tasks[idx].taskId}`);

      const createP = document.createElement("p");
      createP.classList.add("para");
      
      createP.innerText = tasks[idx].value;


      const createInput = document.createElement("button");
      createInput.classList.add("delete");
      createInput.innerText = "Delete";

      createTask.addEventListener("click", function(e){
        
        if(e.target.classList.contains("delete")){
          const taskID = +e.target.parentElement.dataset.taskid.split('-')[1]
          
            const deleteButton = document.querySelector(".delete");
          const currID = tasks.findIndex((item) => {
            // console.log(item.taskId);
            // console.log(taskID);
            return item.taskId === taskID;
          });
          
          console.log(currID);
          tasks.splice(currID, 1);
          console.log(tasks);
        }
        

        // console.log(tasks);

        e.target.parentElement.remove();
        
        window.localStorage.setItem("array", JSON.stringify(tasks));
        
      });

      taskContainer.appendChild(createTask);
      createTask.appendChild(createP);
      createTask.appendChild(createInput);

    });
    
  }
};
