import "./App.css";
import Header from "./MyComponents/Header";
import About from "./MyComponents/About";
import Todos from "./MyComponents/Todos";
import AddTodo from "./MyComponents/AddTodo";
import Footer from "./MyComponents/Footer";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  // return <h1>Hello React is working ✅</h1>;
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const [todos, setTodos] = useState(initTodo);

  const onDelete = (todo) => {
    console.log("I am ondelete of todo", todo);
    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const addTodo = (title, desc) => {
    console.log("I am adding this todo", title, desc);
    let sno;
    if (todos.length == 0) {
      sno = 1;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <>
    <Router>
      <Header title="My Todos List" searchBar={true} />

      <Routes>
        <Route exact path="/" element = {
            <>
            <AddTodo addTodo={addTodo} />
            <Todos todos={todos} onDelete={onDelete} />
            </>
          }
        />
        <Route exact path="/about" element={<About />}/>
      </Routes>
      
      <Footer/>
    </Router>
    </>
  );
}

export default App;
