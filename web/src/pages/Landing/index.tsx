import React from 'react';
import {Link} from 'react-router-dom' //evita o loading adicional de recursos. (single page aplication)

import logoImg from "../../assets/images/logo.svg"
import landingImg from "../../assets/images/landing.svg"
import studyIcon from "../../assets/images/icons/study.svg"
import giveClassesIcon from "../../assets/images/icons/give-classes.svg"
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg"

import './styles.css'



function  Landing(){
    return (
      <div id="page-landing">
          <div id="page-landing-content" className="container">
              <div className="logo-container">
                  <img src={logoImg} alt="Proffy"/>
                  <h2>Sua plataforma de estudos online</h2>
              </div>

              <img 
              src={landingImg} 
              alt="Platafprma de estudos" 
              className="hero-image"/>

              <div className="buttons-container">

                  <Link to="/study" className="study"> {/*passando o endereço a ser acesso pelo button*/}
                      <img src={studyIcon} alt="Estudar"/>
                    Estudar
                  </Link>

                  <Link to="/give-classes" className="give-classes">
                      <img src={giveClassesIcon} alt="Estudar"/>
                    Dar aulas
                  </Link>
              </div>

              <span className="total-connections">
                  Total de 200 conexöes já realizadas <img src={purpleHeartIcon} alt="Coraçäo roxo"/>
              </span>
          </div>
      </div>
    )
}
export default Landing;