import { FunctionComponent } from "react";
import './App.css';
import Hamburger from "../components/Hamburger";

import React from "react";
import Header from "../components/Header";

document.body.style.backgroundColor = "#543f3f";

interface HomePageProps {}

const HomePage: React.FunctionComponent<HomePageProps> = () => {
    return (
        <Header>
            USERNAME :D
        </Header>
    );
};
 
export default HomePage;