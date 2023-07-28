'use strict'

const todos = getSavedTodos();

const filters = {
    searchText: '',
    hideCompleted: false
}


renderToDos(todos, filters);


document.querySelector('#search-text').addEventListener('input', function(e){
    filters.searchText = e.target.value;
    renderToDos(todos, filters);
})

document.querySelector('#new-todo').addEventListener('submit', function(e){
    
    const newToDo = e.target.elements.newToDo.value.trim();
    e.preventDefault();
    if(newToDo.length===0){
        return;
    }
    let todo = {
        id: uuidv4(),
        text: newToDo,
        completed: false
    } 
    todos.push(todo); 
    saveToDos(todos);
    renderToDos(todos, filters); 
    e.target.elements.newToDo.value='';
})
document.querySelector('#hide-completed').addEventListener('change', function(e){
    filters.hideCompleted = e.target.checked;
    renderToDos(todos, filters);
})

/*const paragraphsToRemove = document.querySelectorAll('p');
paragraphsToRemove.forEach(function(paragraphToRemove){
    if(paragraphToRemove.textContent.includes('the')){
        paragraphToRemove.remove();
    }
})*/
/*document.querySelector('#add-todo').addEventListener('click', function(){
    console.log('I added new todo');
})*/




