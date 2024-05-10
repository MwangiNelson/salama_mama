import { ToastContainer } from "react-toastify";
import Navigation from "./contexts/Navigation";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  return (
    <div className="bg-white p-2 h-[100vh] xl:!h-[100vh]">
      <section
        className="relative rounded-lg flex flex-col bg-primary items-center h-full lg:h-full justify-between "
      >
        <Navbar />
        <ToastContainer />
        <Navigation />
        <Footer />
      </section>
    </div>
  );
}

export default App;
