"use client"
import { Countdown } from "./components/countdown"
import FloatingImages from "./components/floatingimages"
import { useState } from "react";
import MessageForm from "./components/messageform"
import Notification from "./components/notification";
import MessageList from "./components/messagelist"
import PhotoCarousel from "./components/carousel";
import HappyBirthday from "./components/happyBirthday";
import messagesData from "../../data/data.json"

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const [isTimerExpired, setTimerExpired] = useState(false);

  const toggleForm = () => setIsFormOpen(!isFormOpen);

  const PAGE_SIZE = 8;

  const messages = messagesData.map((msg, index) => ({
  text: msg.message,
  name: msg.name,
  sender: index % 2 === 1 ? "other" : "user"   // alternate sides
}));

  const pages = [];
  for (let i = 0; i < messages.length; i += PAGE_SIZE) {
    pages.push(messages.slice(i, i + PAGE_SIZE));
  }

  if (isTimerExpired)
  {
    document.body.classList.add("body-scroll")
   return (
  <div className="relative w-full h-screen">

    {/* BACKGROUND GRADIENT */}
    <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#1a1a2e] via-[#2a2a4a] to-[#3b3b6b]" />

    {/* FLOATING IMAGES BEHIND CONTENT */}
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <FloatingImages />
    </div>

    {/* MAIN SCROLL CONTENT */}
    <div className="relative z-10 snap-y snap-mandatory h-screen overflow-y-scroll">

      {/* INTRO PAGE */}
      <section className="snap-start h-screen flex items-center justify-center">
        <HappyBirthday toggleForm={toggleForm} />
      </section>

      {/* CHAT PAGES */}
      {pages.map((pageMessages, index) => (
        <section
          key={index}
          className="snap-start h-screen flex items-center justify-center px-4"
        >
          <div className="w-full max-w-3xl h-[90vh] bg-white rounded-2xl shadow-lg p-6">
            <MessageList messages={pageMessages} />
          </div>
        </section>
      ))}

      {/* CAROUSEL SECTION */}
      <section className="snap-start h-screen flex items-center justify-center">
        <div className="w-full max-w-3xl">
          <PhotoCarousel
            images={[
              "/images/baby.png",
              "/images/baby.png",
              "/images/baby.png",
              "/images/baby.png",
            ]}
          />
        </div>
      </section>

    </div>
  </div>
);

  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black overflow-hidden">
      <main className={`${isFormOpen ? "opacity-30 lg:opacity-10":""} flex h-screen w-full flex-col items-center justify-start px-3 bg-white dark:bg-black sm:items-start overflow-hidden`}>
      <Countdown target="2026-01-07T10:00:00" isTimerExpired={isTimerExpired} setTimerExpired={setTimerExpired}/> 
        <FloatingImages />
        <div className="w-full flex justify-center mt-15 z-20 ">        
          <div onClick={toggleForm} className="hover:cursor-pointer bg-white  p-5 rounded-full w-2xs lg:w-md flex justify-center items-center flex-row">
            <img src="images/direct.png" className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"/>
            <p className="flex items-center justify-center font-['Londrina_Shadow'] text-black font-bold ml-3 text-2xl md:text-4xl lg:text-4xl">SEND A MESSAGE</p>
          </div>
        </div>
      </main>

      <Notification
          message={notification}
          onClose={() => setNotification("")}
        />

      {isFormOpen && (
          <MessageForm isFormOpen={isFormOpen} toggleForm={toggleForm} notification={notification} setNotification={setNotification}/>
        )}
    </div>
  );
}
