import { Button, Spinner } from "flowbite-react";
import React, { useState, useContext, useEffect } from "react";
import { GiLawStar } from "react-icons/gi";
import { AppContext } from "../contexts/AppContexts";
import { MdStar } from "react-icons/md";
import { RiArrowRightUpLine, RiDoubleQuotesL, RiDoubleQuotesR, RiQuoteText } from "react-icons/ri";
import { Link } from "react-router-dom";
import { set } from "firebase/database";

function Home() {

  const [motivationalText, setMotivationalText] = useState("Fetching motivational text....")
  const { userMood, userData, setUserMood } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  async function getMotivationalText() {
    setLoading(true)
    try {

      if (userMood) {
        let formData = new FormData();
        formData.append('mood', userMood);
        let responses = await fetch('https://mama-salama.onrender.com/gen/motivation', {
          method: 'POST',
          body: formData
        });
        let data = await responses.json();
        console.log('Motivational text:', data)
        setMotivationalText(data.messages[0]?.message)
      }


    } catch (error) {
      setMotivationalText('Error fetching motivational text')
      console.error('Error fetching motivational text:', error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMotivationalText()
  }
    , [userMood])

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
        {userData && <div className="w-full p-4 rounded border border-gray-300">
          <h3 className="text-xl font-bold">Motivational Quote of The day</h3>
          <div className="flex gap-4 flex-row flex-wrap w-full py-5">
            <RiDoubleQuotesL className="text-pink-600" />
            <p className={`text-pink-600 w-fit ${loading && ' animate-pulse'}`}>

              {motivationalText}
            </p>
            <RiDoubleQuotesR className="text-pink-600" />
          </div>
          <h5 className="text-end w-full text-blue-400 hover:text-blue-600">BROUGHT TO YOU BY GEMINI</h5>
        </div>}

      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <img src="/images/mother.svg" className="w-full h-[40vh] md:h-fit object-top object-cover" alt="" />
      </div>
    </section>
  );
}

export default Home;
