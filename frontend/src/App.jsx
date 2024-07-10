import Form from "./Form"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/userContext";
import axios from "axios";


axios.defaults.withCredentials = true;
function App() {


  return (
    <div>
      <BrowserRouter>
      <UserContextProvider>
      <Toaster />
          <Routes>
              <Route path="/signup" element={<Signup/>}></Route>
              <Route path="/login" element={<Form/>}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
      </UserContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
