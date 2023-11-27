// Layout.jsx
import "../style/index.css";
import { AuthProvider } from "../context/AuthContext";
import { ShopContextProvider } from "./cart/context/shop-context";
import { ToastContainer } from "react-toastify";
import NavBar1 from "../component/navbar/NavBar1";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <div>
        <ShopContextProvider>
          <ToastContainer />
          <AuthProvider>{children}</AuthProvider>
        </ShopContextProvider>
      </div>
    </html>
  );
}
