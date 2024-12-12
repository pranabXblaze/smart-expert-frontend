import React, { useState, useEffect } from "react";

const News = () => {
  const news = [
    "GRSE Hands Over “Jaldoot” Unmanned Surface Vessel to DRDO amid Maritime Tech Leap",
    "With DRDO successfully testing India’s first long-range hypersonic missile, all you need to know about the weapon",
    "Breakthrough in AI technology for defense applications.",
    "New research labs inaugurated to boost innovation.",
    "International collaboration for defense advancements announced.",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
    }, 3000); // Change news every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [news.length]);

  return (
    <div className="bg-gray-100 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">What's New</h2>
      <div className="relative overflow-hidden h-20 max-w-4xl mx-auto">
        <div
          className="absolute inset-0 flex flex-col justify-start items-center text-center transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateY(-${currentIndex * 100}%)`,
          }}
        >
          {news.map((item, index) => (
            <p
              key={index}
              className="text-lg font-medium text-gray-800 bg-white shadow-md rounded-lg p-4 w-full"
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
