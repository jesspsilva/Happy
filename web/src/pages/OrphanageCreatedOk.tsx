import React from "react";

import '../styles/pages/orphanage-created-ok.css';

import successImage from '../images/successMessage.png';
import { Link } from "react-router-dom";

export default function OrphanageCreatedOk(){
    return(
        <div id="OrphanageCreatedOk">
            <div className="container">
                <div className="text-container">
                    <p className="title">Ótimo!</p>
                    <p className="text">A submissão dos dados foi feita com sucesso! É só voltar ao mapa e ver a nova associação.</p>
                    <Link to="/app" className="back-button">
                        Voltar para o mapa
                    </Link>
                </div>
                <div className="image-container">
                    <img src={successImage} alt="successImage"/>
                </div>
            </div>
        </div>
    )
}