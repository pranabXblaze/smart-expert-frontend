import React from 'react';

const SlidingImages = () => {
  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg_iJUajtQMR6w_jl_rhLtkF3W6OdBHPitAA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNHtPsKCfBhhiUx6CiEhmtaaOkNPDFFYv4KSi9IeQELFhUCVknPtWfr0TUN_wODUtXFyU&usqp=CAU',
    'https://static.mygov.in/media/blog/2022/11/CaptureG20.png',
    'https://img-cdn.thepublive.com/fit-in/640x430/filters:format(webp)/prod-the-processor/media/media_files/kJCavnRhbvTFGq0KTSy0.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSej4fyN97OIQFe5S-exVlehtT-AtnA1bR2bg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlrnvL1GJG4gS1MtwD8DDXglLNtM4-JYHwpg&s'
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="relative overflow-hidden w-full max-w-7xl h-64">
        <div className="flex items-center gap-4 animate-scroll">
          {images.concat(images).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Sliding ${index}`}
              className="w-60 h-40 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlidingImages;
