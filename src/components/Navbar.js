import React from 'react'

const Navbar = ({address}) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary ">
            <button className="navbar-toggler text-white" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon text-white" />
            </button>
            <a className="navbar-brand text-white" href="#!">Marketplace</a>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0 text-white">
                <li className="nav-item active">
                    <a className="nav-link text-white" href="#!">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white" href="#!">Link</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled text-white" href="#!" tabIndex={-1} aria-disabled="true">Disabled</a>
                </li>
                </ul>
                <p className="my-lg-0 text-white">{address}</p>
            </div>
            </nav>

  
        </div>
    )
}

export default Navbar
