import React from "react";
import Form from "./components/form/Form";
import "./App.css";

const App = () => {
  return (
    <div className="container">
      <div className="form">
        <h1>Бронирование переговорной</h1>
        <Form />
      </div>
    </div>
  );
};

export default App;