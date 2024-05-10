import { useContext } from "react";
import { GiAstronautHelmet, GiHamburgerMenu } from "react-icons/gi";
import { MdMenu, MdOutlineSupervisedUserCircle } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../contexts/AppContexts";
import { Avatar, Button, Tooltip } from "flowbite-react";
import { RiMenu3Line, RiQuillPenFill } from "react-icons/ri";

function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  const { userData, logout } = useContext(AppContext)
  return (
    <nav
      className={`w-full ${path == "/chat" ? "flex" : "flex"
        } flex-row bg-primary py-4  justify-between px-2 md:px-10 items-center rounded-t-md`}
    >
      <div className="lg:w-2/12 md:w-4/12 w-1/2">
        <a href="/">
          <img
            src="/images/logo_blue.png"
            className="w-full h-[6vh] object-left object-contain  "
            alt=""
          />
        </a>
      </div>

      <div className="hidden md:flex flex-row">
        {userData && <div className="flex flex-row gap-10">
          <Link to={'/chat'} className="hidden lg:flex">
            <Button pill color="dark" className="!font-sans" >
              <RiQuillPenFill className="me-3" />
              <h3 className="!font-sans">Start Chat</h3>
            </Button>
          </Link>
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

      <div className="flex md:hidden">
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
