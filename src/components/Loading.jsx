"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#4B2615]/90 to-[#8B5E3C]/70 z-50">
      <div className="flex items-center justify-center space-x-3">
        {/**/}
        <div
          className="w-5 h-5 rounded-full animate-bounce"
          style={{ background: "#643F2E", animationDelay: "0s" }}
        ></div>
        <div
          className="w-5 h-5 rounded-full animate-bounce"
          style={{ background: "#8B5E3C", animationDelay: "0.15s" }}
        ></div>
        <div
          className="w-5 h-5 rounded-full animate-bounce"
          style={{ background: "#C49B76", animationDelay: "0.3s" }}
        ></div>
      </div>
    </div>
  );
}
