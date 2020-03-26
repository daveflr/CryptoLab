import React, {Component} from 'react';
import NavBar from "./NavBar";
import Encoder from "./Encoder";

class Main extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className="container">
                    <Encoder/>
                </div>
            </div>

        );
    }
}

export default Main;