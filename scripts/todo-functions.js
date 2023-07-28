'use strict'

//fetch existing todos from localStorage
const getSavedTodos = function(){
    let todosJSON = localStorage.getItem('todos');
    try{
        return todosJSON ? JSON.parse(todosJSON): [];
    } catch(e){
        return [];
    }
    
}
//save todos to localStorage
const saveToDos = function (todos){
    localStorage.setItem('todos', JSON.stringify(todos));
}
const removeToDo = function (id){
    const index = todos.findIndex(function(todo){
        return todo.id === id
    })
    if(index > -1){
        todos.splice(index, 1);
    }
    
}
//change from completed to uncompleted or vice versa
const toogleToDo = function(id, checkobxState){
    const todoToChange = todos.find(function(todo){
        return todo.id === id
    })
    if(todoToChange){
        todoToChange.completed = checkobxState;
    }
    
}
//get the DOM element for an individual toDo
const generateToDoDOM = function (todo){
    const todoEl = document.createElement('label');
    const containerEl = document.createElement('div');
    //create checkobx
    const checkobx = document.createElement('input');
    checkobx.setAttribute('type', 'checkbox');
    if(todo.completed){
        checkobx.checked = true;
    }
    checkobx.addEventListener('change', function(){
        toogleToDo(todo.id, checkobx.checked);
        saveToDos(todos);
        renderToDos(todos, filters);
    })
    //create button to remove todo
    const button = document.createElement('button');
    //create text for todo
    const todoText = document.createElement('span');
        if(todo.text.length>0){
            todoText.textContent = todo.text;
        } else {
            todoText.textContent = 'Unnamed todo';
        }

    //Setup container
    todoEl.classList.add('list-item');
    containerEl.classList.add('list-item__container');
    todoEl.appendChild(containerEl);

    //set text for buttom
    button.textContent = 'remove';
    button.classList.add('button', 'button--text')
    button.addEventListener('click', function(){
        removeToDo(todo.id);
        saveToDos(todos);
        renderToDos(todos, filters);
    })
    containerEl.appendChild(checkobx);
    containerEl.appendChild(todoText);
    todoEl.appendChild(button);
    
    return todoEl;
        
}
//render ToDos
const renderToDos = function(todos, filters){
    const todosDiv = document.querySelector('#todos');
    let filteredToDos = todos.filter(function(todo){
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
    })

    
    let toDosNotCompleted = filteredToDos.filter(function(todo){
        return !todo.completed; 
    })

    if(filters.hideCompleted){
        filteredToDos = toDosNotCompleted;
    }

    todosDiv.innerHTML='';
    
    const todosToComplete = generateSummaryDOM(toDosNotCompleted);
    todosDiv.appendChild(todosToComplete);

    if(filteredToDos.length > 0){
       filteredToDos.forEach(function(todo){
        const todoParagraph =  generateToDoDOM(todo);
        todosDiv.appendChild(todoParagraph);
        })  
    }else{
        const emptyParagrapgh = document.createElement('p');
        emptyParagrapgh.textContent='No to-dos to show';
        emptyParagrapgh.classList.add('empty-message');
        todosDiv.appendChild(emptyParagrapgh);
    }
   
}
//get the DOM element for list summary
const generateSummaryDOM = function(toDosNotCompleted){
    const todosToComplete = document.createElement('h2');
    todosToComplete.classList.add('list-title');
    let todosString='';
    toDosNotCompleted.length === 1 ? todosString='todo' : todosString='todos'
    todosToComplete.textContent = `You have ${toDosNotCompleted.length} ${todosString} left`;
    return todosToComplete;
}
