import { useContext, useState } from "react";
import { GiAstronautHelmet, GiBookPile, GiHamburgerMenu } from "react-icons/gi";
import { MdMenu, MdOutlineSupervisedUserCircle, MdSettings } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../contexts/AppContexts";
import { Avatar, Button, Modal, Tooltip } from "flowbite-react";
import { RiMenu3Line, RiQuillPenFill } from "react-icons/ri";
import CustomToast from "./toast";

function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  const { userData, logout, userMood, setUserMood } = useContext(AppContext)
  const [openPrefs, setOenPrefs] = useState(false)
  const moodsWithEmojis = [
    { mood: 'Happy', emoji: '😊' },
    { mood: 'Sad', emoji: '😢' },
    { mood: 'Angry', emoji: '😡' },
    { mood: 'Anxious', emoji: '😨' },
    { mood: 'Excited', emoji: '😁' },
    { mood: 'Tired', emoji: '😴' }
  ]


  const MoodCard = ({ mood, emoji }) => {
    return (
      <button
        className={`flex flex-col items-center justify-center p-4 rounded-lg ${userMood && userMood == mood
          ? 'bg-green-300 text-slate-500 border-primary border-2'
          : 'bg-gray-200 text-black'
          }`}
        onClick={() => updateMood(mood)}
      >
        <span className="text-3xl">{emoji}</span>
        <span className="text-lg">{mood}</span>
      </button>
    );
  };


  const updateMood = (mood) => {
    console.log(userMood)
    if (userMood.length === 0) {
      CustomToast({ type: 'error', message: 'Please select a mood' })
      return
    }
    setUserMood(mood)
  }

  return (
    <nav
      className={`w-full ${path == "/chat" ? "flex" : "flex"
        } flex-row bg-primary py-4  justify-between px-2 md:px-10 h-fit items-center rounded-t-md`}
    >

      <Modal show={openPrefs} onClose={() => { setOenPrefs(!openPrefs) }} className="w-full h-full">
        <Modal.Header>
          <div className="flex flex-row items-center gap-4">
            <MdSettings />
            <h2 className="text-xl font-bold">Personal Preferences</h2>
          </div>
        </Modal.Header>
        <Modal.Body>
          <h3 className="text-xl font-gray-900 pb-3" >How are you feeling today?</h3>
          <div className="grid grid-cols-3 gap-4">
            {moodsWithEmojis.map((moo, index) => (
              <MoodCard key={index} mood={moo.mood} emoji={moo.emoji} />
            ))}

          </div>
        </Modal.Body>
      </Modal>
      <div className="w-1/4 h-fit">
        <a href="/" className="w-fit">
          <img
            src="/images/logo.png"
            className="h-fit w-1/2 object-left object-cover  "
            alt=""
          />
        </a>
      </div>

      <div className="hidden md:flex flex-row">
        {userData && <div className="flex flex-row gap-4">
          <Link to={'/chat'} className="hidden lg:flex">
            <Button pill color="pink" className="bg-pink-500 !font-sans" >
              <RiQuillPenFill className="me-3" />
              <h3 className="!font-sans">Start Chat</h3>
            </Button>
          </Link>
          <Tooltip content='User Moods'>
            <button
              onClick={() => { setOenPrefs(!openPrefs) }}
              className=" !font-sans border p-2 rounded-full" >
              <MdSettings className="text-gray-500 text-3xl" />

            </button>
          </Tooltip>

          <Tooltip content='Feed'>
            <Link to={'/feed'}>
              <button

                className=" !font-sans border p-2 rounded-full" >
                <GiBookPile className="text-gray-500 text-3xl" />

              </button>
            </Link>
          </Tooltip>

          <Tooltip
            className="shadow-none bg-transparent"
            arrow={false}
            placement="bottom"
            content={
              <>
                <Button
                  onClick={() => { logout() }}
                  color="red" >Logout</Button>
              </>
            } >
            <Avatar rounded size={'md'}  >
              <div className="font-medium dark:text-white hidden lg:flex flex-col">
                <h3 className="text-xl font-bold">{userData.username}</h3>
                <div className="text-sm text-gray-600 ">{userData.email}</div>
              </div>
            </Avatar></Tooltip>
        </div>}


        {!userData && <div className="flex flex-row gap-4">
          <Link to={'/auth'}>
            <Button pill className="border-none px-4" color="light">Sign In</Button>
          </Link>
          <Link to={'/auth'}>
            <Button pill color="dark"  >Create An Account</Button>
          </Link>

        </div>}


      </div>

      <div className="flex md:hidden h-fit">
        {!userData && <Link to={'/auth'}>
          <Button className="p-0 m-0 bg-blue-50 text-blue-900" pill >
            {/* <RiMenu3Line className="text-2xl text-blue-600" /> */}
            Sign In
          </Button></Link>}
        {
          userData && <Tooltip
            className="shadow-none bg-transparent"
            arrow={false}
            placement="bottom"
            content={
              <>
                <Button
                  onClick={() => { logout() }}
                  color="red" >Logout</Button>
              </>
            } >
            <Avatar rounded size={'md'}  >
              <div className="font-medium dark:text-white hidden lg:flex flex-col">
                <h3 className="text-xl font-bold">{userData.username}</h3>
                <div className="text-sm text-gray-600 ">{userData.email}</div>
              </div>
            </Avatar></Tooltip>
        }

      </div>


    </nav>
  );
}

export default Navbar;
