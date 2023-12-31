import React from "react";
import './Hearder.css';



export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://logopng.com.br/logos/netflix-94.png" alt="Netflix"></img>
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"alt="Usuário"></img>
                </a>
            </div>
        </header>
    );
}



