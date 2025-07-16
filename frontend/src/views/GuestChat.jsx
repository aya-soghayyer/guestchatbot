// import React from "react";
import Circle from "../components/circls/Circle";
import GuestChatHeader from "../components/headers/guestchats/GuestChatHeader";

function GuestChat() {
  return (
    <>
      <div className="relative items-center bg-light-green md:flex md:items-center md:justify-end 2xl:flex 2xl:h-screen 2xl:items-center 2xl:justify-center">
        <div className="absolute -top-12 right-3 md:right-[63rem]  md:-mt-28 2xl:-left-64 2xl:-top-24">
          <Circle />
        </div>
        <div className="md:w-full 2xl:-mt-16 2xl:flex 2xl:w-11/12 2xl:justify-center">
          <GuestChatHeader />
        </div>
        <div className="absolute hidden md:right-28  md:top-4 md:inline-flex 2xl:visible 2xl:right-11 2xl:top-40">
          <Circle />
        </div>
      </div>
    </>
  );
}

export default GuestChat;
