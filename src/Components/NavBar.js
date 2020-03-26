import React, {Component} from 'react';

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <div className="navbar-item">
                        <h1>Encode/Decode</h1>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;