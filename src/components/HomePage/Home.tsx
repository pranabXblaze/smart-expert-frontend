import { Button } from "@/components/ui/button";
import { ChevronDown, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"
import SlidingImages from "../Partners/Partners";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0A2647] to-[#144272]">
      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
      />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Logo */}


        <div className="flex flex-col lg:flex-row items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="lg:w-1/2 text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Shape the Future of Defense Research
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 mb-6">
              Join DRDO in Advancing India's Defense Technology
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Discover exciting opportunities in defense research, development,
              and innovation
            </p>
            {/* <Button
              size="lg"
              style={{
                backgroundColor: "#FF",
              }}
              className="hover:bg-opacity-90 transition-all"
            >

              <Link to={'/search'}>Explore Opportunities</Link>
              <ExternalLink className="ml-2 h-5 w-5"/>
            </Button> */}
            <Button
              size="lg"
              style={{
                backgroundColor: "#FFF",
              }}
              className="hover:bg-opacity-90 transition-all"
            >

              <Link to={'/score'}>Find the experts</Link>
              <ExternalLink className="ml-2 h-5 w-5"/>
            </Button>
          </motion.div>

          {/* Right Decorative Element */}
          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="lg:w-1/2 mt-12 lg:mt-0"
          >
            <img
              src="https://images.pexels.com/photos/2156/sky-earth-space-working.jpg"
              alt="Defense Technology Visualization"
              className="w-full h-auto rounded-lg shadow-2xl opacity-80"
            />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center"
        >
          <p className="text-sm mb-2">Scroll Down</p>
          <ChevronDown className="w-6 h-6 mx-auto" />
        </motion.div>
        <div className="h-1/2 my-2">
          <SlidingImages />
        </div>
      </div>
    </div>
  );
}