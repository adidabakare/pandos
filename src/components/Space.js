import React, { useState } from "react";
import enter from "../assets/img/enter1.jpg";
import { Button, Input, Spacer } from "@nextui-org/react";
import { Link, useHistory } from "react-router-dom";

const Space = () => {
  const [spacename, setspacename] = useState("");
  const [errormessage, seterrormessage] = useState(false);
  const history = useHistory();

  return (
    <div
      className={
        "bg-space-enter bg-cover -z-30 w-full h-screen m-auto flex flex-col items-center justify-center"
      }
    >
      <div className="bg-white -mt-80 md:mt-0 z-50 bg-opacity-10 ring-1 ring-white ring-opacity-40 backdrop-blur-lg rounded-3xl w-11/12 md:w-5/12 ">
        <div className="m-4">
          <img
            src={enter}
            className="object-cover rounded-b-lg rounded-t-2xl h-64 w-full"
          />
        </div>
        <div className="m-4">
          <p className="text-yellow-300">
            {errormessage ? "Space name cant be blank" : ""}
          </p>
          <input
            type="text"
            id="first_name"
            value={spacename}
            onChange={(e) => {
              setspacename(e.target.value);
            }}
            class="bg-white bg-opacity-10  backdrop-blur-lg border border-gray-300  text-lg rounded-xl focus:ring-blue-200 focus:border-blue-200 block w-full p-2 text-white"
            placeholder="Space Id"
            required
          />
        </div>
        <div className="m-4 ">
          <div class="inline-flex w-full rounded-xl shadow-sm" role="group">
            <button
              onClick={() => {
                if (spacename === "") {
                  seterrormessage(true);
                  return;
                }
                history.push(`/space/${spacename}/${true}`);
              }}
              type="button"
              class="w-full py-3 px-4 text-sm font-medium  text-gray-900 bg-[#17C964] rounded-l-xl border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              Create Space
            </button>

            <button
              onClick={() => {
                if (spacename === "") {
                  seterrormessage(true);
                  return;
                }
                history.push(`/space/${spacename}/${false}`);
              }}
              type="button"
              class=" w-full py-3 px-4 text-sm font-medium text-gray-900 bg-[#0072F5] rounded-r-xl border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              Join Space
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Space;
