/* =================================
   TASK DATA
================================= */

let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";


/* =================================
   HTML ELEMENTS
================================= */

const taskInput =
    document.getElementById("taskInput");

const taskList =
    document.getElementById("taskList");

const taskCount =
    document.getElementById("taskCount");

const progressText =
    document.getElementById("progressText");

const progressFill =
    document.getElementById("progressFill");

const rewardMessage =
    document.getElementById("rewardMessage");

const pointsElement =
    document.getElementById("points");


/* =================================
   ADD TASK
================================= */

function addTask() {

    const taskText =
        taskInput.value.trim();


    if (taskText === "") {

        alert("🌟 Please enter a task!");

        return;
    }


    const task = {

        id: Date.now(),

        text: taskText,

        completed: false
    };


    tasks.push(task);

    saveTasks();

    taskInput.value = "";

    displayTasks();
}


/* =================================
   DISPLAY TASKS
================================= */

function displayTasks() {

    taskList.innerHTML = "";


    let filteredTasks = tasks;


    /* SHOW ACTIVE TASKS */

    if (currentFilter === "active") {

        filteredTasks =
            tasks.filter(
                task => !task.completed
            );
    }


    /* SHOW COMPLETED TASKS */

    if (currentFilter === "completed") {

        filteredTasks =
            tasks.filter(
                task => task.completed
            );
    }


    /* CREATE TASK CARDS */

    filteredTasks.forEach(task => {

        const li =
            document.createElement("li");


        li.className = "task";


        if (task.completed) {

            li.classList.add("completed");
        }


        /* GET AUTOMATIC ICON */

        const icon =
            getTaskIcon(task.text);


        li.innerHTML = `

            <div class="task-left">

                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${task.id})"
                >

                <span class="task-icon">
                    ${icon}
                </span>

                <span class="task-text">
                    ${escapeHTML(task.text)}
                </span>

            </div>

            <button
                class="delete-btn"
                onclick="deleteTask(${task.id})"
                title="Delete task"
            >
                🗑️
            </button>

        `;


        taskList.appendChild(li);

    });


    updateTaskCount();

    updateProgress();

    updatePoints();

    updateReward();
}


/* =================================
   COMPLETE / UNCOMPLETE TASK
================================= */

function toggleTask(id) {

    tasks =
        tasks.map(task => {

            if (task.id === id) {

                task.completed =
                    !task.completed;
            }

            return task;
        });


    saveTasks();

    displayTasks();
}


/* =================================
   DELETE TASK
================================= */

function deleteTask(id) {

    tasks =
        tasks.filter(
            task => task.id !== id
        );


    saveTasks();

    displayTasks();
}


/* =================================
   CLEAR COMPLETED TASKS
================================= */

function clearCompleted() {

    tasks =
        tasks.filter(
            task => !task.completed
        );


    saveTasks();

    displayTasks();
}


/* =================================
   SHOW ALL TASKS
================================= */

function showAll() {

    currentFilter = "all";

    displayTasks();
}


/* =================================
   SHOW ACTIVE TASKS
================================= */

function showActive() {

    currentFilter = "active";

    displayTasks();
}


/* =================================
   SHOW COMPLETED TASKS
================================= */

function showCompleted() {

    currentFilter = "completed";

    displayTasks();
}


/* =================================
   TASK COUNT
================================= */

function updateTaskCount() {

    const activeTasks =
        tasks.filter(
            task => !task.completed
        ).length;


    if (activeTasks === 1) {

        taskCount.textContent =
            "1 task left";

    } else {

        taskCount.textContent =
            activeTasks + " tasks left";
    }
}


/* =================================
   PROGRESS BAR
================================= */

function updateProgress() {

    if (tasks.length === 0) {

        progressText.textContent = "0%";

        progressFill.style.width = "0%";

        return;
    }


    const completedTasks =
        tasks.filter(
            task => task.completed
        ).length;


    const percentage =
        Math.round(
            (completedTasks / tasks.length) * 100
        );


    progressText.textContent =
        percentage + "%";


    progressFill.style.width =
        percentage + "%";
}


/* =================================
   POINT SYSTEM
================================= */

function updatePoints() {

    const completedTasks =
        tasks.filter(
            task => task.completed
        ).length;


    const points =
        completedTasks * 10;


    pointsElement.textContent =
        "⭐ " + points + " points";
}


/* =================================
   REWARD MESSAGE
================================= */

function updateReward() {

    rewardMessage.classList.remove("success");


    /* NO TASKS */

    if (tasks.length === 0) {

        rewardMessage.textContent =
            "⭐ Add your first task and start your adventure! ⭐";

        return;
    }


    const completedTasks =
        tasks.filter(
            task => task.completed
        ).length;


    /* ALL TASKS COMPLETED */

    if (
        completedTasks === tasks.length
    ) {

        rewardMessage.textContent =
            "🎉 Amazing! You completed everything! 🏆";

        rewardMessage.classList.add(
            "success"
        );

    }


    /* SOME TASKS COMPLETED */

    else if (completedTasks > 0) {

        rewardMessage.textContent =
            "🌟 Great job! Keep going! You are doing amazing!";

    }


    /* NO TASKS COMPLETED */

    else {

        rewardMessage.textContent =
            "💪 You can do it! Let's complete some tasks!";
    }
}


/* =================================
   AUTOMATIC TASK ICON
================================= */

function getTaskIcon(text) {

    const task =
        text.toLowerCase();


    /* HOMEWORK / STUDY */

    if (
        task.includes("homework") ||
        task.includes("study") ||
        task.includes("school") ||
        task.includes("learn")
    ) {

        return "📚";
    }


    /* READING */

    if (
        task.includes("read") ||
        task.includes("book")
    ) {

        return "📖";
    }


    /* ART */

    if (
        task.includes("draw") ||
        task.includes("paint") ||
        task.includes("art") ||
        task.includes("color")
    ) {

        return "🎨";
    }


    /* SPORTS */

    if (
        task.includes("play") ||
        task.includes("football") ||
        task.includes("cricket") ||
        task.includes("sport") ||
        task.includes("badminton")
    ) {

        return "⚽";
    }


    /* EXERCISE */

    if (
        task.includes("run") ||
        task.includes("exercise") ||
        task.includes("walk") ||
        task.includes("gym")
    ) {

        return "🏃";
    }


    /* FOOD */

    if (
        task.includes("eat") ||
        task.includes("food") ||
        task.includes("lunch") ||
        task.includes("breakfast") ||
        task.includes("dinner")
    ) {

        return "🍎";
    }


    /* WATER */

    if (
        task.includes("water") ||
        task.includes("drink")
    ) {

        return "💧";
    }


    /* CLEANING */

    if (
        task.includes("clean") ||
        task.includes("room") ||
        task.includes("organize")
    ) {

        return "🧹";
    }


    /* MUSIC */

    if (
        task.includes("music") ||
        task.includes("sing") ||
        task.includes("song") ||
        task.includes("dance")
    ) {

        return "🎵";
    }


    /* SLEEP */

    if (
        task.includes("sleep") ||
        task.includes("bed")
    ) {

        return "😴";
    }


    /* DEFAULT */

    return "⭐";
}


/* =================================
   SAVE TASKS
================================= */

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


/* =================================
   ENTER KEY
================================= */

taskInput.addEventListener(
    "keypress",
    function(event) {

        if (event.key === "Enter") {

            addTask();
        }

    }
);


/* =================================
   SECURITY
   PREVENT HTML FROM BEING INSERTED
================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


/* =================================
   START APPLICATION
================================= */

displayTasks();
