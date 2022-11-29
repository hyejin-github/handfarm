import "./App.css";
import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Kakao from "./pages/auth/Kakao";
import GlobalStyle from "./style/GlobalStyle";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ArticleForm from "./pages/community/ArticleForm";
import FarmmunityMain from "./pages/community/FarmmunityMain";
import FarmRegisting from "./pages/myFarm/FarmRegisting";
import FarmCreate from "./pages/myFarm/FarmCreate";
import MyFarm from "./pages/myFarm/MyFarm";
import CommunityInfo from "./pages/community/CommunityInfo";
import CommunityRegion from "./pages/community/CommunityRegion";
import { useLocation } from 'react-router-dom';
import FarmmunityInfoDetail from "./pages/community/FarmmunityInfoDetail";
import Box from "@mui/material/Box";
import CommentForm from "./components/common/CommentForm";
import MyPage from "./pages/myPage/MyPage"
import {CreateReadChat} from "./pages/chat/CreateReadChat";
import {ChatList} from "./pages/chat/ChatList";

function App() {
  const location = useLocation();
  
  // useEffect(() => {
  //   console.log(location);
  // }, [ location ])

  return (
    <>
      <GlobalStyle />
      <Box sx={{ display : "flex", flexDirection : "column", height : "100vh" }}>
       <Box sx={{ flex : 1 }}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/community" element={<FarmmunityMain />} />
          <Route exact path="/community/create/:where" element={<ArticleForm />} />
          <Route exact path="/community/info" element={<CommunityInfo/>} />
          <Route exact path="/community/region" element={<CommunityRegion/>} />
          <Route exact path="/community/:id"  element={<FarmmunityInfoDetail/>} />
          <Route exact path="/myfarm/registing" element={<FarmRegisting />} />
          <Route exact path="/chat/:id" element={<CreateReadChat/>}></Route>
          <Route exact path="/chatList" element={<ChatList/>}></Route>
          <Route exact path="/myfarm/create" element={<FarmCreate />}></Route>
          <Route exact path="/kakao" element={<Kakao />}></Route>
          <Route exact path="/myfarm/:deviceId" element={<MyFarm />}></Route>
          <Route exact path='/mypage/:nickname' element={<MyPage />}></Route>  
        </Routes>
       </Box>
        { location.pathname === '/' || (location.pathname.split('/')[2] === 'info' && parseInt(location.pathname.split('/')[3]) >= 1 ) || location.pathname.split('/')[2] >= 1 ? (<CommentForm/>) : (<Footer />) }
      </Box>
    </>
  );
}

export default App;
