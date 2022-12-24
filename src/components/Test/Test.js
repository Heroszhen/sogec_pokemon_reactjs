import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Test = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const goHome = (e, message) => {
        alert(message)
        navigate("/");
    }
    return (
        <div id="test">
            <h1>test</h1>
            <div>id: {id}</div>
            <Link to="/">Accueil</Link>
            <br />
            <button className='btn btn-primary' onClick={(e) => goHome(e, 'accueil')}>Accueil</button>
        </div>
    );
}

export default Test;