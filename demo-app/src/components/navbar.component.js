import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">ExcerTracker</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li data-ta="nav-link-exercises" className="navbar-item">
                            <Link to="/" className="nav-link">Exercises</Link>
                        </li>
                        <li data-ta="nav-link-create-exercise" className="navbar-item">
                            <Link to="/create" className="nav-link">Create Exercise Log</Link>
                        </li>
                        <li data-ta="nav-link-create-user" className="navbar-item">
                            <Link to="/user" className="nav-link">Create User</Link>
                        </li>
                        <li data-ta="nav-link-files" className="navbar-item">
                            <Link to="/uploadfiles" className="nav-link">Upload Files</Link>
                        </li>
                        <li data-ta="nav-link-files" className="navbar-item">
                            <Link to="/downloadfiles" className="nav-link">Download Files</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}