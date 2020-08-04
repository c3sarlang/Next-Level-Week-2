//componente

import React from 'react';

import whatsappIcon from "../../assets/images/icons/whatsapp.svg"

import "./styles.css"

function TeacherItem(){
    return (

        <article className="teacher-item">
                   <header>
                       <img src="https://avatars3.githubusercontent.com/u/55794477?s=460&u=8cdba3bcef3f51add6c8602e86036869cbbffcaa&v=4" alt="Júlio César"/>
                        <div>
                            <strong>Júlio César</strong>
                            <span>Matématica</span>
                        </div>
                   </header>

                   <p>
                       Astronomo e Cientista da Lógica da Programaçäo
                        <br/> <br/>
                       Apaixonado pelo espaço e pela lógica nilista, seguidor da razäo Arístotelica e nietcheana.

                   </p>

                   <footer>
                       <p>
                           Preço/Hora 
                           <strong>R$: 100.00</strong>
                       </p>
                       <button type="button">
                            <img src={whatsappIcon} alt="Whatsapp"/>
                            Entrar em contato
                       </button>
                   </footer>


               </article>

    )
}

export default TeacherItem;