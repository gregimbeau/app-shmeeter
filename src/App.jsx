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


function App() {
  return (
    <div className='main-content'>
      <Router>
        <Header />

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
