import { useState, useEffect } from "react";
import { Input, Label, Button, CloseButton } from "reactstrap";
import ModalButton from "./ModalButton";

const ToDoList = () => {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const getTasks = async () => {
    const options = {
      method: "GET",
    };
    const tasks = await fetch("/api/todolist", options);
    if (tasks.ok) {
      const result = await tasks.json();
      setList(result);
      return result;
    }
    return await [];
  };

  const addTask = async () => {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    };
    const tasks = await fetch("/api/todolist", options);
    if (tasks.ok) {
      getTasks();
    }
  };
  const deleteTask = async (id) => {
    const options = {
      headers: new Headers(),
      method: "DELETE",
    };
    const tasks = await fetch("/api/todolist/" + id, options);
    if (tasks.ok) {
      getTasks();
    }
  };

  const updateTask = async (oldTask) => {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    const options = {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(oldTask),
    };
    const tasks = await fetch("/api/todolist", options);
    if (tasks.ok) {
      getTasks();
    }
  };

  useEffect(() => {
    getTasks();
  }, []);
  console.log(title, " - ", description);
  return (
    <div>
      <h1>Creating of task</h1>
      <div
        style={{
          width: "450px",
          border: "2px solid",
          padding: "40px",
          margin: "auto",
        }}
      >
        <h4 style={{ textAlign: "center" }}>Create </h4>
        <div>
          <Label>Title</Label>
          <Input type="text" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <Label>Description</Label>
          <Input
            type="textarea"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button
          color="success"
          style={{ marginTop: "20px", display: "flex", marginLeft: "auto" }}
          onClick={() => addTask()}
        >
          Add Task
        </Button>
      </div>
      <div>
        {list.length > 0
          ? list.map((item) => {
              const taskView = (
                <div
                  key={item.id}
                  style={{ border: "2px solid", padding: "40px" }}
                >
                  <CloseButton
                    style={{ position: "absolute", left: "77%" }}
                    onClick={() => deleteTask(item.id)}
                  ></CloseButton>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <ModalButton
                    btnName={"Update"}
                    title={"Update Task"}
                    modalContent={
                      <>
                        <div>
                          <Label>Title</Label>
                          <Input
                            defaultValue={item.title}
                            type="text"
                            onChange={(e) => (item.title = e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Input
                            defaultValue={item.description}
                            type="textarea"
                            onChange={(e) =>
                              (item.description = e.target.value)
                            }
                          />
                        </div>
                        <Button
                          onClick={() => {
                            updateTask(item);
                          }}
                        >
                          Update
                        </Button>
                      </>
                    }
                  />
                </div>
              );
              return taskView;
            })
          : null}
      </div>
    </div>
  );
};

export default ToDoList;
