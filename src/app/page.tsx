"use client"
import Image from "next/image";
import ai_kitchen_logo from "../../public/images/ai_kitchen_logo.png";
import axios from "axios";
import { useState } from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../../public/animation/Cooker remix.json"

export default function Home() {
  const [text, setText] = useState()
  const [dish, setDish] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const dishResponse = await axios.post("/api/chat", { dish })
      if (dishResponse.data.error) {
        throw new Error(dishResponse.data)
      }
      setText(dishResponse.data.aiResponse.output[0].content[0].text)

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="w-full max-w-2xl flex flex-col items-center gap-8 p-6 bg-white rounded-2xl shadow-xl">

        {/* Logo and Heading */}
        <div className="flex flex-col items-center justify-center gap-4">
          <Image
            src={ai_kitchen_logo}
            alt="AI Kitchen Logo"
            width={150}
            height={150}
            className="rounded-full shadow-md"
          />
          <h1 className="text-2xl md:text-3xl font-bold font-sans text-gray-800 text-center">
            Give Me Step-By-Step Instructions to Prepare
          </h1>
        </div>

        {/* Input Field */}
        <div className="w-full">
          <input
            type="text"
            placeholder="Enter your dish name..."
            className="w-full h-12 px-4 text-lg font-medium border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
            onChange={(e) => setDish(e.target.value)}
            value={dish}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-green-500 transition-all shadow-md">
          Get Me Instructions
        </button>

        {/* Output / Card */}
        <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
          {loading ? (
            <Lottie
              loop
              play
              animationData={lottieJson
              }
              className="mx-auto"
              style={{ width: 150, height: 150 }} />
          ) : (
            <p className="whitespace-pre-wrap text-gray-700 text-md md:text-lg">{text}</p>
          )}
        </div>
      </div>
    </div>
  );
}
