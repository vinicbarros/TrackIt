import Navbar from "./Utilities/Navbar";
import Footer from "./Utilities/Footer";
import { Navigate } from "react-router-dom";

export default function PrivatePage({ children }) {
  const auth = JSON.parse(localStorage.getItem("trackit"));

  if (auth) {
    return (
      <>
        <Navbar image={auth.image}/>
        {children}
        <Footer />
      </>
    );
  } else {
    <Navigate to="/" />;
  }
}
