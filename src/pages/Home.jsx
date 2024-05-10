import { Button } from "flowbite-react";
import React from "react";
import { RiArrowRightUpLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="flex flex-col md:flex-row w-10/12 bg-[#F4F5FC] h-full items-center justify-center gap-10 md:gap-0 ">
      <div className="flex flex-col items-center md:items-start gap-10 w-11/12 md:w-1/2 pt-10 md:pt-0">
        <h1 className="text-3xl font-bold text-center md:text-start md:text-3xl lg:text-7xl">
          Navigating <br />  <b className="text-slate-500">Postpartum Depression</b>
        </h1>
        <p className="text-xs text-center md:text-start md:text-sm lg:text-xl text-gray-700">
          <b>Salama Mama</b> is here to support you on your journey through postpartum depression. Find resources, connect with a community, and take steps towards healing.
        </p>
        <div className="flex flex-row gap-4">

          <Link to={'/chat'}><Button color="pink" className="w-fit px-7 bg-pink-600 text-white hover:text-pink-600 rounded-lg">Get Started</Button></Link>
 
          <Link to={'/'}><Button color="light" className="w-fit px-7 border rounded-lg">Learn More</Button></Link>

        </div>

      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <img src="/images/mother.svg" className="w-full h-[40vh] md:h-fit object-top object-cover" alt="" />
      </div>
    </section>
  );
}

export default Home;
