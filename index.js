const fetchData = fetch("https://jsonplaceholder.typicode.com/todos");

const list = document.querySelector("#todo-list");

const init = (res) => {
  res.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.style.border = "1px solid black";
    listItem.style.borderRadius = "4px";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.completed;

    const text = document.createTextNode(item.title);
    listItem.appendChild(text);
    listItem.appendChild(checkbox);
    list.appendChild(listItem);

    const button = document.createElement("button");
    button.textContent = "Delete";

    checkbox.addEventListener("click", () => {
      todosPatch();
    });

    listItem.append(button);
    button.addEventListener("click", () => {
      todoDel(item.id, listItem);
    });
  });
};

fetchData
  .then((res) => res.json())
  .then((res) => init(res))
  .catch((err) => console.log("Fetch err:", err));

const todoDel = async (id, list) => {
  let doDel = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "DELETE",
  });
  if (doDel.ok) {
    list.remove();
    console.log("Дело в шляпе");
  }
};
const todosPatch = async (id, list) => {
  let todoPatch = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ completed: true }),
    }
  );

  if (todoPatch.ok) {
    console.log("Change");
  }
};

const todoObj = {
  title: "ghbdtn rfr lfksk",
  completed: false,
};

const todosPost = async (list) => {
  let todoPost = await fetch(
    `https://jsonplaceholder.typicode.com/todos`,
    {
      method: "Post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(todoObj),
    }
  );

  if (todoPost.ok) {
    console.log(todoObj);
  }
};

todosPost()