import React, { useContext } from "react";
import { Context } from "./context";
import Search from "./Search";
import Prod from "./Prod";
import "./App.css";

const App = () => {
    const context = useContext(Context);

    return (
        <div id="App" className="has-background-link">
            {context.currentProd ? <Prod /> : <Search />}
        </div>
    );
};

export default App;
