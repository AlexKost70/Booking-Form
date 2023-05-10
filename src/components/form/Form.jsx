
import React, { useState } from "react";
import "./Form.css";
import Dropdown from "./dropdown/Dropdown";
import TextArea from "./textArea/TextArea";

// Функция для получения даты
function getDate(i) {
  let date = new Date();
  let day = (date.getDate()) + i;
  let month = date.getMonth();
  let year = date.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return day + "." + month + "." + year;
}

const Form = () => {
  const options = {
    tower: ["А", "Б"],
    floor: Array.from({ length: 25 }, (_, i) => i + 3),
    room: Array.from({ length: 10 }, (_, i) => i + 1),
    date: Array.from({length: 15}, (x, i) => getDate(i)),
    time: [
      "09:00 - 10:00",
      "10:00 - 11:00",
      "11:00 - 12:00",
      "12:00 - 13:00",
      "13:00 - 14:00",
      "14:00 - 15:00",
      "15:00 - 16:00",
      "16:00 - 17:00",
      "17:00 - 18:00",
      "19:00 - 20:00",
      "20:00 - 21:00"
    ]
  }

  // Состояние для хранения данных формы
  const [formData, setFormData] = useState({
    tower: "",
    floor: "",
    room: "",
    date: "",
    time: "",
    comment: ""
  });

  // Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState({});

  // Обработчик изменения значения в поле формы
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  // Функция для проверки валидности данных формы
  const validate = () => {
    let isValid = true;
    let errors = {};

    // Проверка заполнения полей
    for (let key in formData) {
      if (key !== "comment") {
        if (!formData[key]) {
          errors[key] = "Это поле обязательно для заполнения";
          isValid = false;
        }
      }
    }

    // Проверка даты и времени на актуальность
    if (formData.date && formData.time) {
      const today = getDate(0);
      const currentHours = new Date().getHours();
      if (formData.date < today) {
        errors.date = "Выбранная дата уже прошла";
        isValid = false;
      } else if (formData.date === today && currentHours >= +(formData.time).slice(0, 2)) {
        errors.time = "Выбранное время уже прошло";
        isValid = false;
      }
    }
    setErrors(errors);
    return isValid;
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(JSON.stringify(formData));
    }
    handleReset();
  };

  // Обработчик очистки формы
  const handleReset = () => {
    setFormData({
      tower: "",
      floor: "",
      room: "",
      date: "",
      time: "",
      comment: ""
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <Dropdown
        id="tower"
        label = "Выберите башню"
        value={formData.tower}
        onChange={handleChange}
        error={errors.tower}
        options={options.tower}
      />
      <Dropdown
        id="floor"
        label = "Выберите этаж"
        value={formData.floor}
        onChange={handleChange}
        error={errors.floor}
        options={options.floor}
      />
      <Dropdown
        id="room"
        label = "Выберите комнату"
        value={formData.room}
        onChange={handleChange}
        error={errors.room}
        options={options.room}
      />
      <Dropdown
        id="date"
        label = "Выберите дату"
        value={formData.date}
        onChange={handleChange}
        error={errors.date}
        options={options.date}
      />
      <Dropdown
        id="time"
        label = "Выберите время"
        value={formData.time}
        onChange={handleChange}
        error={errors.time}
        options={options.time}
      />
      <TextArea
        id="comment"
        label="Введите комментарий"
        value={formData.comment} 
        onChange={handleChange}
      />
      <div className="form-group">
        <button type="submit" className="btn btn-primary">
            Отправить
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleReset}>
          Очистить
        </button>
      </div>
    </form>
  );
};

export default Form;