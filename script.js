const button = document.getElementById("inputButton");
const inputText = document.getElementById("inputText");
const notStartedList = document.getElementById("notStartedList");
const pendingList = document.getElementById("pendingList");
const finishedList = document.getElementById("finishedList");
const clearButton = document.getElementById("clearBtn");

const statuses = [
  {value: "notStarted", label: "Not Started"},
  {value: "pending", label: "Pending"},
  {value: "finished", label: "Finished"}
];

function clearTask() {
  if(finishedList.children.length > 0) {
    finishedList.innerHTML = "";
  }

  return
}

function createTask(text) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  const select = document.createElement("select");
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
  });

  li.append(span, select);
  return li;
}

inputText.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const inputValue = inputText.value.trim();

    if(inputValue.length === 0){
      return;
    }

    const task = createTask(inputValue);
    notStartedList.append(task);
    inputText.value = "";
  }
});


button.addEventListener("click", function () {
  const inputValue = inputText.value.trim();

  if(inputValue.length === 0){
    return;
  }

  const task = createTask(inputValue);
  notStartedList.append(task);
  inputText.value = "";
});

clearButton.addEventListener("click", clearTask);