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
            refreshTaskItems();
        }
        
        removeTask();
        editTask();
    }
    
    function addTask(e)  {
        e.preventDefault();
        let taskItem = document.createElement('li');
        let taskItemText = document.createElement('span');
        const taskItemContent = document.getElementById('todo__content')
        
        if(taskItemContent.value === '') {
            alert('Your task is empty');
            taskItemContent.focus();
        } else {
            
            taskItemText.innerText = taskItemContent.value;
            taskItem.append(taskItemText);
            taskItem.append(creatButtonsWrap());
            list.append(taskItem);
            taskItemContent.value = '';
            taskItemContent.focus();

            

            refreshTaskItems();
            removeTask();
            editNewTask(taskItem)
            saveList();
        }
    }
    
    const saveList = () => {
        localStorage.setItem('todo', list.innerHTML);
    }

    const addRemoveButton = () => {
        const removeButton = document.createElement('button');
        removeButton.classList.add('btn', 'remove__btn');
        removeButton.innerHTML = '&#215;';
        return removeButton;
    }

    const addEditButton = () => {
        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'edit__btn');
        editButton.innerHTML = '&#9998;';
        return editButton;
    }

    const creatButtonsWrap = () => {
        let buttonsWrap = document.createElement('div');
        buttonsWrap.classList.add('buttons');
        buttonsWrap.append(addRemoveButton(), addEditButton());
        return buttonsWrap;
    }

    const removeTask = () => {
        taskItems.forEach(element => {
            element.querySelector('.remove__btn').addEventListener('click', function() {
                element.remove();
                
                saveList();
            })
        });
    }

    const editTask = () => {
        taskItems.forEach(element => {
            element.querySelector('.edit__btn').addEventListener('click', () => {
                element.querySelector('li span').innerText = prompt('Edit task', '');
                
                saveList();
            });
        });
    }

    const editNewTask = (e) => {
        e.querySelector('.edit__btn').addEventListener('click', () => {
            e.querySelector('li span').innerText = prompt('Edit task', '');
            
            saveList();
        });
    }

    const refreshTaskItems = () => {
        taskItems = document.querySelectorAll('.todo__list li');
    }


    createToDo();
    
    taskButton.addEventListener('click', addTask);

}());