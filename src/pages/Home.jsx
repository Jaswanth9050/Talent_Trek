import React from 'react'
import NavBar from '../components/NavBar'
import Header from '../components/Header'
import Brands from '../components/Brands'
import Category from '../components/Category'
import Footer from '../components/Footer'
import Feature from '../components/Feature'
import Webinfo from '../components/Webinfo'
import Trending from '../components/Trending'

const Home = () => {
  return (
    <>
    <NavBar/>
    <Header/>
    <Trending/>
    <Category/>
    <Feature/>
    <Brands/>
    <Webinfo/>
    <Footer/>
    </>
  );
};

export default Home;
