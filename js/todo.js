const toDoForm=document.querySelector(".js-toDoForm"),
toDoInput=toDoForm.querySelector("input");
toDoList=document.querySelector(".js-toDoList");

const TODOS_LS="toDos";

function filterFn(toDo){
    return toDo.id===1;
}

let toDos=[];        

//filter는 array의 모든 item을 통해 함수를 실행하고
//true인 items만 가지고 새로운 array를 만듦

function deleteTodo(event){
    const btn=event.target;
    const li=btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos=toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id); //parseInt는 string을 숫자로 바꾸어 준다
    });
    toDos=cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
//json은 데이터를 전달할 때, JS가 그걸 다룰 수 있도록 객체로 바꿔주는 기능

function paintToDo(text){
   const li=document.createElement("li");
   const delBtn=document.createElement("button");
   const span=document.createElement("span");
   const newId=toDos.length + 1;
   delBtn.innerHTML = "❌";
   delBtn.addEventListener("click", deleteTodo);
   span.innerText=text;
   li.appendChild(delBtn);
   li.appendChild(span);
   li.id=newId;
   toDoList.appendChild(li);
   const toDoObj={
       text: text,
       id: newId,
   };
   toDos.push(toDoObj);
   saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue=toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function loadToDos(){
    const loadedToDos=localStorage.getItem(TODOS_LS);
    if(loadedToDos!==null){
        const parsedToDos=JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();