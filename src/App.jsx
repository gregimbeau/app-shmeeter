import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InscriptionForm from "@/components/form";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LoginForm from "@/components/login";
import Profile from "@/components/profile";
import PostsPage from "@/components/posts";
import CreatePost from "@/components/createPost";
import Likes from "@/components/likes";
import UserProfile from "@/components/userProfile";
import InstallButton from "@/components/InstallButton";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope: ",
          registration.scope
        );
      })
      .catch((error) => {
        console.log("Service Worker registration failed: ", error);
      });
  });
}

function App() {
  return (
    <div className='main-content'>
      <Router>
        <Header />
        <InstallButton />
        <Routes location={location}>
          <Route path='/' element={<PostsPage />} />
          <Route path='/login' element={<LoginForm />} />

          <Route path='/form' element={<InscriptionForm />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/posts' element={<PostsPage />} />
          <Route path='/createPost' element={<CreatePost />} />
          <Route path='/likes' element={<Likes />} />
          <Route path='/user/:username' element={<UserProfile />} />
          <Route path='/users/:id' element={<UserProfile />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
