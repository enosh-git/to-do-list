const button = document.getElementById("inputButton");
const inputText = document.getElementById("inputText");
const notStartedList = document.getElementById("notStartedList");
const pendingList = document.getElementById("pendingList");
const finishedList = document.getElementById("finishedList");
const clearButton = document.getElementById("clearBtn");

let tasks = [

];

const statuses = [
  {value: "notStarted", label: "Not Started"},
  {value: "pending", label: "Pending"},
  {value: "finished", label: "Finished"}
];

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log(tasks);
}

function clearTask() {
  if(finishedList.children.length > 0) {
    finishedList.innerHTML = "";
  }
}

function inputTask(){
  const inputValue = inputText.value.trim();
  let taskHolder = {text: inputValue, status: "notStarted"};

  if(inputValue.length === 0){
    return;
  }

  const task = createTask(taskHolder);
  notStartedList.append(task);
  inputText.value = "";

  tasks.push(taskHolder);
  saveTasks();
}

function createTask(task) {
  const select = document.createElement("select");
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = task.text;

  for (const status of statuses) {
    const option = document.createElement("option");
    option.value = status.value;
    option.textContent = status.label;
    select.append(option);
  }

  select.addEventListener("change", function() {
    if (select.value === "notStarted") {
      notStartedList.append(li);
    } else if(select.value === "pending") {
      pendingList.append(li);
    } else if (select.value === "finished") {
      finishedList.append(li);
    }

    task.status = select.value;
    saveTasks();
  });

  li.append(span, select);
  return li;
}

inputText.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    inputTask();
  }
});


button.addEventListener("click", function () {
  inputTask();
});

clearButton.addEventListener("click", clearTask);