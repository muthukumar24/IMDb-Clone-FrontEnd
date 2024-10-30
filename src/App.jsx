import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Actors from "./components/Actors";
import Producers from "./components/Producers";
import Movies from "./components/Movies";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<Movies />}></Route>
          <Route path="/actors" element={<Actors />}></Route>
          <Route path="/producers" element={<Producers />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App;