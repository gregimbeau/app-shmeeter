import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InscriptionForm from "@/components/form";
import Header from "@/components/header";
import LoginForm from "@/components/login";
import Profile from "@/components/profile";

function App() {
  return (
    <div className='main-content'>
      <Router>
        <Header />

        <Routes location={location}>
          <Route path='/' element={<InscriptionForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
