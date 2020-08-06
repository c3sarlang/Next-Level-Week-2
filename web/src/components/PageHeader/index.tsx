//componente

import React from 'react'
import {Link} from 'react-router-dom' //evita o loading adicional de recursos. (single page aplication)

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg'

import "./styles.css"


interface PageHeaderProps{ //passando uma propriedade como obrigatória.
    title: string;
    description?: string; //nao é obrigatorio
}

const PageHeader: React.FC<PageHeaderProps> = (props) => { //componente em formato de funçao. // passando propriedade.
     return(
        <header className="page-header">
        <div className="top-bar-container">
            <Link to="/">
                <img src={backIcon} alt="Voltar"/>

            </Link>
            <img src={logoImg} alt="Proffy"/>
        </div>

        <div className="header-content">
            <strong>{props.title}</strong>
             {props.description && <p>{props.description}</p>}  {/*se nao for nulo vai ser exibido*/}

            {props.children}  {/*passando conteudo dentro do componente*/}
        </div>

        
    </header>

     )
 }

 export default PageHeader;