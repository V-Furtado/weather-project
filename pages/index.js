import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import axios from "axios";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Weather from "../components/Weather";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // States
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  

  // endpoint
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = (e) => {
    // don't want page to reload
    e.preventDefault();
    setLoading(true);
    // fetch weather data with axios
    axios.get(url).then((response) => {
      setWeather(response.data);
      // console.log(response.data)
    }).catch(error => {
      console.log(error);
    });
    setCity('');
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div>
        <Head>
          <title>Weather Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* Overlay */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-light/90 z-[1]" />

        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1591870408955-9f5f749d396c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3470&q=80"
          layout="fill"
          alt="The desert sand with extinct volcanoes in the background in Maio, Cape Verde"
          className="object-cover"
        />
        <span className="relative top-0 bottom-0 left-5 right-10 flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10">
          <h1 className="text-2xl font-bold text-yellow-100">View temperature from any city in world</h1>
          </span>

        {/* Search Form */}
        <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10">
        {/* <span className="relative top-0 bottom-0 left-10 right-0 flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10">
          <p className="text-2xl text-bold">View temperature from any city in world</p>
          </span> */}
          {/* <p className="text-2xl text-bold">View temperature from any city in world</p> */}
          
          <form
            onSubmit={fetchWeather}
            className="flex items-center justify-between w-full p-2 m-auto text-white bg-transparent border border-gray-200 form-horizontal rounded-3xl"
          >
            <div className="">
              <input
                onChange={(e) => setCity(e.target.value)}
                className="text-2xl text-white bg-transparent border-none focus:outline-none"
                type="text"
                placeholder="Search city"
              ></input>
            </div>
            <button onClick={fetchWeather}>
              <BsSearch size={25} />
            </button>
          </form>
          
        </div>

          
        {/*display Weather: show components unless we have the data */}
        {weather.main && <Weather data={weather} />}
        <div className="relative top-0 bottom-0 left-10 right-0 flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10">
        <Footer/>
        </div>
        
        
      </div>
      
    );
  }
}
