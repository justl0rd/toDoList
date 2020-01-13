(function() {

    const toDo = document.getElementById('todo');
    const taskButton = document.getElementById('todo__add');
    let list = document.createElement('ul');
    let taskItems = document.querySelectorAll('.todo__list li');


        

    let createToDo = () => {
        list.classList.add('todo__list')
        toDo.append(list);
        if (localStorage.getItem('todo')) {
            list.innerHTML = localStorage.getItem('todo');
            taskItems = document.querySelectorAll('.todo__list li');
        }
        
        removeTask();
    }
    
    
    
    function addTask(e)  {
        e.preventDefault();
        let taskItem = document.createElement('li');
        const taskItemContent = document.getElementById('todo__content')
        
        if(taskItemContent.value === '') {
            alert('Your task is empty')
        } else {
            
            taskItem.innerText = taskItemContent.value;
            taskItem.append(addRemoveButton());
            list.append(taskItem);
            taskItemContent.value = '';
            taskItems = document.querySelectorAll('.todo__list li');

            removeTask();
            saveList();
        }
    }
    
    const saveList = () => {
        localStorage.setItem('todo', list.innerHTML);
    }

    const addRemoveButton = () => {
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove__btn');
        removeButton.innerHTML = '&#215;';
        return removeButton;
    }

    const removeTask = () => {
        taskItems.forEach(element => {
            element.querySelector('.remove__btn').addEventListener('click', function() {
                element.remove();
                saveList();
            })
        });
    }


    createToDo();
    
    taskButton.addEventListener('click', addTask);

}());