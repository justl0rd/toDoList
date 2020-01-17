(function() {

    let appData = [];
    let sortData = [];
    const toDo = document.getElementById('todo');
    let list = document.createElement('ul');
    const taskButton = document.getElementById('todo__add');
    const sortButton = document.getElementById('sort');
    list.classList.add('todo__list');

    function addAppData(e) {
        e.preventDefault();
        const taskItemContent = document.getElementById('todo__content');

        if(taskItemContent.value === '') {
            alert('Your task is empty');
            taskItemContent.focus();
        } else {
            let date = new Date();

            appData.push(
                {
                    text: taskItemContent.value,
                    status: 'active',
                    id: +date,
                }
            )

            taskItemContent.value = '';
            taskItemContent.focus();
        }
        
        saveData();
        createApp();
    }

    const saveData = () => {
        localStorage.setItem('appData', JSON.stringify(appData));
    }
    
    let createToDo = (dataArr) => {
        list.innerHTML = '';
        toDo.append(list);

        dataArr.forEach(data => {
            let li = document.createElement('li');
            let span = document.createElement('span');
            li.append(span);
            li.append(creatButtonsWrap());
            span.innerHTML = data.text;
            list.append(li);
            li.id = data.id;
            li.classList.add(data.status);
            li.querySelector('.remove__btn').addEventListener('click', dellTask);
            li.querySelector('.edit__btn').addEventListener('click', editTask);
            li.querySelector('.status__btn').addEventListener('click', changeTaskStatus);
        });
    }

    const createApp = () => {
        if (localStorage.getItem('appData')) {
            appData = JSON.parse(localStorage.getItem('appData'));
            createToDo(appData);
        }
    } 

    const createSortedApp = () => {
        createToDo(sortData);
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

    const taskStatusButton = () => {
        const statusButton = document.createElement('button');
        statusButton.classList.add('btn', 'status__btn');
        statusButton.innerHTML = '&#10004;';

        return statusButton;
    }

    const creatButtonsWrap = () => {
        const buttonsWrap = document.createElement('div');
        buttonsWrap.classList.add('buttons');
        buttonsWrap.append(addRemoveButton(), addEditButton());
        buttonsWrap.append(taskStatusButton());
        
        return buttonsWrap;
    }

    const dellTask = (e) => {
        taskId = +e.target.parentElement.parentElement.id;

        for (let i = 0; i < appData.length; i++) {
            if (appData[i].id === taskId) {
                appData.splice(i, 1);

                saveData();
                createApp();
            }
        }
    }

    const editTask = (e) => {
        const taskId = +e.target.parentElement.parentElement.id;
        
        for (let i = 0; i < appData.length; i++) {
            if (appData[i].id === taskId) {
                const oldText = appData[i].text;
                let newText;

                do {
                    newText = prompt('Edit task', '');
                    
                    if (newText === null) {
                        newText = oldText;
                    }
                } while (newText === '')

                appData[i].text = newText;

                saveData();
                createApp();
            }
        }
    }

    const changeTaskStatus = (e) => {
        const taskId = +e.target.parentElement.parentElement.id;
        const taskElement = e.target.parentElement.parentElement;

        for (let i = 0; i < appData.length; i++) {

            if (appData[i].id === taskId) {
                let taskStatus = appData[i].status;

                if (taskStatus === 'active') {
                    appData[i].status = 'complete'
                } else {
                    appData[i].status = 'active';
                }

                saveData();

                taskElement.className = "";
                taskElement.classList.add(appData[i].status)
            }
        }
    }

    const sortTasks = (e) => {
        e.preventDefault();
        sortData = Array.from(appData);

        sortData.sort(function(a, b) {
            let textA = a.text.toLowerCase(), textB = b.text.toLowerCase();
            if (textA < textB) return -1;
            if (textA > textB) return 1;
            return 0;
        });

        createSortedApp();

    }

    createApp();

    taskButton.addEventListener('click', addAppData);
    sortButton.addEventListener('click', sortTasks);

}());