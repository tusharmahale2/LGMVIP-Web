//Getting All Required Elements
const inputBox = document.querySelector(".inputfield input");
const addBtn = document.querySelector(".inputfield button");
const ToDoList = document.querySelector(".ToDoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
    let userData = inputBox.value;          //Getting User Entered Value
    if(userData.trim() !=0){                // If User Values Aren't Only Spaces
        addBtn.classList.add("active");     // Active The Add Button
    }else{
        addBtn.classList.remove("active");     // Unactive The Add Button
    }
} 
showTasks();        //Calling showTasks Function                  


// if user click on the add button 
addBtn.onclick = ()=>{
    let userData = inputBox.value;          //Getting User Entered Value
    let getLocalStorage = localStorage.getItem("New To Do List");       //Getting LocalStorage
    if(getLocalStorage == null){        //If localStorage Is Null
        listArr = [];       //Creating Blank Array
    }else{
        listArr = JSON.parse(getLocalStorage);       //Transforming json String Into a js Object
    }
    listArr.push(userData);       //Pushing Or Adding User Data
    localStorage.setItem("New To Do List", JSON.stringify(listArr));        //Transforming js Object Into a json String
    showTasks();        //Calling showTasks Function
    addBtn.classList.remove("active");     // Unactive The Add Button
}

// function to add task list inside ul
function showTasks(){
    let getLocalStorage = localStorage.getItem("New To Do List");       //Getting LocalStorage 
    if(getLocalStorage == null){        //If localStorage Is Null
        listArr = [];       //Creating Blank Array
    }else{
        listArr = JSON.parse(getLocalStorage);       //Transforming json String Into a js Object
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length;       //Passing The Length Value In PendingNumb
    if(listArr.length > 0){     //If Array Length Is Greater Than 0
        deleteAllBtn.classList.add("active");       //Active The Clear All Button
    }else{
        deleteAllBtn.classList.remove("active");        ////Unactive The Clear All Button
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
    });     
    ToDoList.innerHTML = newLiTag;      //Adding New li Tag Inside ul tag
    inputBox.value = "";    //Once Task Added Leave The Input Field Blank
}

//delete task function
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New To Do List");
    listArr = JSON.parse(getLocalStorage);   
    listArr.splice(index, 1);        //Delete Or Remove The Particular indexed Li
    // After Remove The Li Again Update The Local Storage
    localStorage.setItem("New To Do List", JSON.stringify(listArr));        //Transforming js Object Into a json String
    showTasks();        //Calling showTasks Function    
} 

//Delete All Task Function
deleteAllBtn.onclick = ()=>{
    listArr = [];       //Empty An Array
    // After Delete All Task Again Update The Local Storage
    localStorage.setItem("New To Do List", JSON.stringify(listArr));        //Transforming js Object Into a json String
    showTasks();        //Calling showTasks Function 
}