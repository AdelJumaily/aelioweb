"use client";

import React from "react";
import { WobbleCard } from "../ui/wobble-card";
import Image from "next/image";

export default function AboutSection() {
  return (
    <div className="relative bg-gray-100 py-20 px-4 md:px-8 lg:px-12">
      {/* Background with subtle map pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main container with white background and rounded corners */}
        <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Top Row - Left: Large Green About Us Card */}
            <WobbleCard
              containerClassName="col-span-1 lg:col-span-2 bg-[#4a5d2a] min-h-[400px] md:min-h-[450px] rounded-2xl"
              className="p-6 md:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                {/* About Us Label */}
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-gray-200/30 rounded-full text-sm text-white/90 font-medium">
                    • About Us
                  </span>
                </div>
                
                {/* Main Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6 max-w-2xl">
                  AELIO: YOUR ULTIMATE DIGITAL PARTNER
                </h2>
                
                {/* Description */}
                <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl">
                  Aelio is your ultimate digital partner, offering expertise, quality solutions, and a passion for exceptional web experiences. Our team is dedicated to helping you make unforgettable digital impressions. Join us today and elevate your online presence to new heights!
                </p>
              </div>
            </WobbleCard>

            {/* Top Row - Right: Two Stat Cards */}
            <div className="col-span-1 flex flex-col gap-4 md:gap-6">
              {/* Stat Card 1: Tours/Projects */}
              <WobbleCard
                containerClassName="bg-gray-100 min-h-[190px] md:min-h-[210px] rounded-2xl"
                className="p-6 md:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-2">
                    300+
                  </div>
                  <div className="text-base md:text-lg text-gray-600">
                    Projects completed
                  </div>
                </div>
                <button className="mt-4 w-full bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors flex items-center justify-between shadow-sm">
                  <span>Make an appointment</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </WobbleCard>

              {/* Stat Card 2: Countries/Clients */}
              <WobbleCard
                containerClassName="bg-gray-100 min-h-[190px] md:min-h-[210px] rounded-2xl"
                className="p-6 md:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-2">
                    20+
                  </div>
                  <div className="text-base md:text-lg text-gray-600">
                    Countries served
                  </div>
                </div>
                <button className="mt-4 w-full bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors flex items-center justify-between shadow-sm">
                  <span>View full map</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </WobbleCard>
            </div>

            {/* Bottom Row - Left: Image Card */}
            <WobbleCard
              containerClassName="col-span-1 lg:col-span-2 min-h-[400px] md:min-h-[450px] rounded-2xl overflow-hidden"
              className="relative"
            >
              <div className="absolute inset-0">
                {/* Placeholder for image - you can replace with actual image */}
                <div className="w-full h-full bg-gradient-to-br from-amber-200 via-orange-200 to-red-200 flex items-center justify-center">
                  <div className="text-center text-gray-600 p-8">
                    <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg font-medium">Scenic Image</p>
                    <p className="text-sm mt-2">Add your image here</p>
                  </div>
                </div>
                {/* Uncomment and use when you have an image */}
                {/* <Image
                  src="/images/your-image.jpg"
                  alt="About Aelio"
                  fill
                  className="object-cover"
                /> */}
              </div>
            </WobbleCard>

            {/* Bottom Row - Right: Customers Stat Card */}
            <WobbleCard
              containerClassName="col-span-1 bg-gray-100 min-h-[400px] md:min-h-[450px] rounded-2xl"
              className="p-6 md:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-2">
                  1450+
                </div>
                <div className="text-base md:text-lg text-gray-600 mb-6">
                  Customers
                </div>
              </div>
              
              {/* Customer Avatars */}
              <div className="flex -space-x-3 mt-auto">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-white font-semibold text-sm"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
            </WobbleCard>
          </div>
        </div>
      </div>
    </div>
  );
}
