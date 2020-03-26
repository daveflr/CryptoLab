import React, {Component} from 'react';
import NavBar from "./NavBar";
import Input from "./Input";

class Main extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className="container">
                    <Input/>
                </div>
            </div>

        );
    }
}

export default Main;