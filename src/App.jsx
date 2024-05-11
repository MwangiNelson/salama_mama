import { ToastContainer } from "react-toastify";
import Navigation from "./contexts/Navigation";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import MoodModal from "./components/MoodModal";
import { useContext, useEffect } from "react";
import { AppContext } from "./contexts/AppContexts";


function App() {
  const { userMood, userData, setUserMood } = useContext(AppContext)





  return (
    <div className="bg-white p-2 h-[100vh] xl:!h-[100vh]">
      <section
        className="relative rounded-lg flex flex-col bg-primary items-center h-full lg:h-full justify-between "
      >
        <Navbar />
        <ToastContainer />
        <Navigation />
        <MoodModal visible={userMood === null && userData} />
        <Footer />
      </section>
    </div>
  );
}

export default App;
