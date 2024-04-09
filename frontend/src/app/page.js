"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button, LinearProgress } from "@mui/material";
import Logo from "../../public/powerbotlogo.png";
import ReactPlayer from "react-player";
import Searchbar from "../components/Searchbar";
import SongCard from "../components/SongCard";

export default function Home() {
  return (
    <div className="w-full h-full p-4">
      <div className="md:flex max-w-[800px] w-fit m-auto">
        <div id="left" className="max-w-[400px] p-2">
          <div id="logo" className="mb-2">
            <Image src={Logo} />
          </div>
          <div id="searchbar">
            <Searchbar />
          </div>
        </div>
      </div>
    </div>
  );
}
