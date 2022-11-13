import React, { useState } from "react";
import EditIcon from "../assets/icons/edit.svg";

export default function Note({ id, title, content, openEditNote }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      key={id}
      className="relative flex flex-col h-60 p-6 bg-white rounded-lg shadow-[0px_0px_3px_rgba(3,102,214,0.3)] hover:shadow-[0px_0px_6px_rgba(0,255,255,0.9)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <img
          className="absolute right-4 top-4 rounded-full shadow shadow-gray-400 p-1 cursor-pointer"
          src={EditIcon}
          height={32}
          width={32}
          onClick={openEditNote}
          alt=""
        />
      )}
      <h3 className="text-xl font-bold font-mono">{title}</h3>
      <p className="font-mono opacity-70 max-h-48 overflow-hidden">{content}</p>
    </div>
  );
}
