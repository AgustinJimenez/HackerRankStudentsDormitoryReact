import React, { useState } from "react";
import ResidentsList from "./ResidentsList";
import Search from "./Search";
import Error from "./Error";
import { STUDENTS } from "../studentsList";

function Main() {
  const [form, setForm] = useState({
    studentName: "",
    joiningDate: "",
    error: "",
  });
  const getResidentsList = () => {
    const residents = getItemFromLocalStorage("residents") || [];
    return residents;
  };

  const setFormHandler = (name, value) => {
    setForm((state) => ({ ...state, [name]: value }));
  };
  const setItemToLocalStorage = (key, value) => {
    try {
      value = JSON.stringify(value);
    } catch (error) {
      console.log(error);
    }

    localStorage.setItem(key, value);
  };
  const getItemFromLocalStorage = (key) => {
    const storedValue = localStorage.getItem(key);
    let value;
    if (storedValue) {
      try {
        value = JSON.parse(storedValue);
      } catch (error) {
        console.log(error);
      }

      return value;
    }
  };
  const [residentsList, setResdientsList] = useState(getResidentsList());

  const onSubmitForm = () => {
    if (!form.studentName.trim() || !form.joiningDate.trim()) {
      setFormHandler("error", "Please enter all the fields");
      return;
    }

    const studentFound = STUDENTS.find(
      (student) => student.name.toLowerCase() === form.studentName.toLowerCase()
    );
    if (!studentFound) {
      setFormHandler(
        "error",
        `Sorry, ${form.studentName} is not a verified student!`
      );
      return;
    }
    const isDateValid =
      new Date(studentFound.validity) >= new Date(form.joiningDate);
    if (!isDateValid) {
      setFormHandler(
        "error",
        `Sorry, ${form.studentName}'s validity has Expired!`
      );
      return;
    }

    const foundResident = residentsList.find(
      (resident) => resident.name === form.studentName
    );
    if (foundResident) {
      setFormHandler("studentName", "");
      setFormHandler("joiningDate", "");
      setFormHandler(
        "error",
        `Sorry, ${form.studentName} is already present in the residents list!`
      );
      return;
    }

    setItemToLocalStorage("residents", [
      ...residentsList,
      { name: form.studentName },
    ]);
    console.log("HERE ===> ", form);
    setResdientsList((state) => [...state, { name: form.studentName }]);
    setFormHandler("studentName", "");
    setFormHandler("joiningDate", "");
  };

  return (
    <div className="layout-column justify-content-center align-items-center w-50 mx-auto">
      <Search
        form={form}
        setFormHandler={setFormHandler}
        onSubmitForm={onSubmitForm}
      />
      <Error form={form} setFormHandler={setFormHandler} />
      <ResidentsList residents={residentsList} />
    </div>
  );
}

export default Main;
