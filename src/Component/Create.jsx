import axios from "axios";
import React, { useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";

const Create = () => {
    //making state variables cause the new data will be store in these state to creacte a new employee detail
  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [active, activechange] = useState(true);
  //validation will be true when we click on name input so that the text below on red will display 
  const [validation, valchange] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {

 const empdata = { name, email, phone, active };
//posting the data to the api
    fetch("http://localhost:3000/employee", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        alert("saved successfully.");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <div className=" w-full sm:w-[50%] m-auto shadow-2xl shadow-gray-500   rounded-2xl border-2 p-2 border-gray-200">
        <div className="my-3">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-title">
                <h2 className="text-center text-4xl ">Employee Create</h2>
              </div>
              <div className="card-body  px-6 ">
                <div className="row font-medium">
                  <div className=" my-4">
                    <div className="flex flex-col text-xl">
                      <label>Enter ID</label>
                      <input
                        value={id}
                        disabled="disabled"
                        className="bg-gray-200 "
                      ></input>
                    </div>
                  </div>

                  <div className=" my-4">
                    <div className="flex flex-col text-xl">
                      <label>Name</label>
                      <input
                        required
                        value={name}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => namechange(e.target.value)}
                        className="bg-gray-100 font-normal"
                      ></input>
                      {name.length == 0 && validation && (
                        <span className="text-red-500 text-xs ">
                          Enter the name
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="my-4">
                    <div className="flex flex-col text-xl">
                      <label>Email</label>
                      <input
                        value={email}
                        onChange={(e) => emailchange(e.target.value)}
                        className="bg-gray-100 font-normal"
                      ></input>
                    </div>
                  </div>

                  <div className="my-4">
                    <div className="flex flex-col text-xl">
                      <label>Phone</label>
                      <input
                        value={phone}
                        onChange={(e) => phonechange(e.target.value)}
                        className="bg-gray-100 
                                            font-normal"
                      ></input>
                    </div>
                  </div>

                  <div className="my-4">
                    <div className=" text-lg font-bold">
                      <input
                        checked={active}
                        onChange={(e) => activechange(e.target.checked)}
                        type="checkbox"
                        className="form-check-input  "
                      ></input>
                      <label className="form-check-label">Is Active</label>
                    </div>
                  </div>
                  <div className="my-4 ">
                    <div className="flex gap-4">
                      <button
                        className="bg-green-800 rounded-lg text-white p-2 px-8"
                        type="submit"
                      >
                        Save
                      </button>
                      <Link
                        to="/"
                        className=" bg-orange-700 rounded-lg text-white p-2 px-8 "
                      >
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
