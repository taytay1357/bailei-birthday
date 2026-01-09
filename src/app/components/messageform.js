"use client";
import { useState } from 'react';

export default function MessageForm({isFormOpen, toggleForm, notification, setNotification})
{
    const [formData, setFormData] = useState({ name: "", message: ""})

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      toggleForm()

      setNotification("✅ Message has been sent, this will show when the countdown expires!");

      setFormData({ name: "", email: "" });

      setTimeout(() => setNotification(""), 10000);
    };

    return (
        <div className="absolute top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 
            bg-black p-3 rounded-xl shadow-lg w-sm lg:w-4xl h-5/6 z-30 border-4 flex justify-start items-center flex-col">
            <h1 className="mt-3 lg:mt-1 flex justify-center items-center rounded-xl p-5 lg:p-2 w-full lg:w-5/6 h-1/6 lg:h-1/6 text-4xl md:text-5xl lg:text-6xl font-['Londrina_Shadow'] text-center z-20">LEAVE BAILEI A BIRTHDAY MESSAGE</h1>
            <form onSubmit={handleSubmit} className="w-full h-5/6 mt-5 lg:mt-2 flex justify-start flex-col items-center">
                <label className="w-68 lg:w-4/6 text-2xl text-white font-['Londrina_Shadow'] border-b-2 mt-4 lg:mt-0">NAME</label>
                <input onChange={handleChange} required name="name" type="text" placeholder="Enter your name..." className="font-bold lg:w-4/6 rounded-xl bg-white w-68 mt-3 mb-5 text-xl p-3 text-black font-['Londrina_Shadow']" />
                <label className="lg:w-4/6 w-68 text-2xl text-white font-['Londrina_Shadow'] border-b-2">MESSAGE</label>
                <textarea onChange={handleChange} maxLength={50} required name="message" rows="5" cols="40" placeholder="Enter your message here..." className="font-bold lg:mb-10 lg:w-4/6 lg:h-5/6 rounded-xl font-['Londrina_Shadow'] bg-white w-68 mb-10 mt-3 text-xl p-3 text-black"></textarea>
                <button
                type="submit"
                className="hover:cursor-pointer lg:w-3/6 lg:p-5 lg:text-3xl bg-white w-68 text-black font-['Londrina_Shadow'] px-4 py-2 rounded-xl font-bold text-xl"
              >
                SUBMIT
              </button>

              <img
              src="images/cross.png"
              onClick={toggleForm}
              className="hover:cursor-pointer border-white border-2 mt-4 text-sm text-gray-600 underline w-10 h-10 absolute top-0 right-3 lg:right-5"
            />
            </form>
        </div>
    )
}