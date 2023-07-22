window.addEventListener('load', solve);

function solve() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let label = document.getElementById('label');
    let points = document.getElementById('points');
    let assignee = document.getElementById('assignee');
    let taskBtn = document.getElementById('create-task-btn');
    let totalPoints = document.getElementById('total-sprint-points');
    let counter = 0;

    taskBtn.addEventListener("click", createTask);

    let labelVariety = {
        Feature: '&#8865',
        'Low Priority Bug': '&#9737',
        'High Priority Bug': '&#9888'
    };

    function createTask(e) {
        if (e) {
            e.preventDefault();
        }
        let sectionTasks = document.getElementById('tasks-section');

        if (title.value !== '' && description.value !== '' &&
            label.textContent !== '' && points.value !== ''
            && assignee.value !== '') {

            let currentTask = document.getElementsByTagName('article').length + 1;
            let article = document.createElement('article');
            article.id = `task-${currentTask}`;
            article.className = 'task-card';

            let div = document.createElement('div');

            if (label.value === 'Feature') {
                div.className = 'task-card-label feature';
            } else if (label.value === 'Low Priority Bug') {
                div.className = 'task-card-label low-priority';
            } else if (label.value === 'High Priority Bug') {
                div.className = 'task-card-label high-priority';
            }

            div.innerHTML = `${label.value} ${labelVariety[label.value]}`;
            article.appendChild(div);

            let h3 = document.createElement('h3');
            h3.className = 'task-card-title';
            h3.textContent = `${title.value}`;
            article.appendChild(h3);

            let p = document.createElement('p');
            p.className = 'task-card-description';
            p.textContent = description.value;
            article.appendChild(p);

            let divPoints = document.createElement('div');
            divPoints.className = 'task-card-points';
            divPoints.textContent = `Estimated at ${points.value} pts`;
            article.appendChild(divPoints);

            let divAssignee = document.createElement('div');
            divAssignee.className = 'task-card-assignee';
            divAssignee.textContent = `Assigned to: ${assignee.value}`;
            article.appendChild(divAssignee);

            let divAction = document.createElement('div');
            divAction.className = 'task-card-actions';

            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener("click", deleteFromTasks);

            divAction.appendChild(deleteBtn);
            article.appendChild(divAction);

            sectionTasks.appendChild(article);

            counter += Number(points.value);
            totalPoints.textContent = `Total Points ${counter}pts`;

            title.value = '';
            description.value = '';
            label.value = '';
            points.value = '';
            assignee.value = '';
        }
    }

    function deleteFromTasks(e) {
        let taskToDelete = e.currentTarget.parentNode.parentNode;
        let h3 = taskToDelete.querySelector('h3');
        title.value = h3.textContent;

        let descriptionToDelete = taskToDelete.querySelector('p');
        description.value = descriptionToDelete.textContent;

        let labelToDelete = taskToDelete.querySelector('.task-card-label').textContent.split(' ')[0];
        label.value = labelToDelete.trim();

        let pointsToDelete = taskToDelete.querySelector('.task-card-points').textContent.split('at ')[1].split(' ')[0];
        points.value = pointsToDelete;

        let assigneeToDelete = taskToDelete.querySelector('.task-card-assignee');
        assignee.value = assigneeToDelete.textContent.split(': ')[1];

        let deleteTaskBtn = document.getElementById('delete-task-btn');
        deleteTaskBtn.addEventListener("click", deleteTask);

        deleteTaskBtn.disabled = false;
        taskBtn.disabled = true;

        function deleteTask() {
            taskToDelete.parentNode.removeChild(taskToDelete);
            counter -= Number(points.value);
            totalPoints.textContent = `Total Points ${counter}pts`;

            title.value = '';
            description.value = '';
            label.value = '';
            points.value = '';
            assignee.value = '';

            deleteTaskBtn.disabled = true;
            taskBtn.disabled = false;
        }
    }
}