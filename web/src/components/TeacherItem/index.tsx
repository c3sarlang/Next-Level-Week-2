//componente

import React from 'react';

import whatsappIcon from "../../assets/images/icons/whatsapp.svg"

import "./styles.css"
import { create } from 'domain';
import api from '../../services/api';

export interface Teacher { //exportando para ser usada a mesma tipagem
    
        id: number;
        avatar: string;
        bio: string;
        cost: number;
        name: string;
        subject: string;
        whatsapp: string;

   
}

interface TeacherItemProps { // passando as mesmas propriedades de Teacher.
   teacher: Teacher;


}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher})=> {

    function createNewConnection(){ //criando conexao ao entrar em contato
        api.post("connections", { //acessando a rota de conexoes
            user_id: teacher.id //enviando o id do professor
        })
    }


    return (

        <article className="teacher-item">
                   <header>
                       <img src={teacher.avatar} alt={teacher.name}/>
                        <div>
                            <strong>{teacher.name}</strong>
                            <span>{teacher.subject}</span>
                        </div>
                   </header>

                   <p>{teacher.bio}</p>

                   <footer>
                       <p>
                            Preço/Hora 
                            <strong>{teacher.cost}</strong>
                       </p>
                       <a 
                        target="blank" //abrindo guia em nova página
                        onClick={createNewConnection} //chamando uma conexao ao entrar em contato
                        href={`https://wa.me/${teacher.whatsapp}`}
                        > {/*passando uma variavel dentro de um link */}
                                    <img src={whatsappIcon} alt="Whatsapp"/>
                                    Entrar em contato
                       </a>
                   </footer>


               </article>

    )
}

export default TeacherItem;