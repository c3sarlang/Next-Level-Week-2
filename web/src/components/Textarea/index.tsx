import React,{TextareaHTMLAttributes} from "react"; //importando propriedades do html.

import "./styles.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{ // passando propriedades do html.
    name: string;
    label: string;


}

const  Textarea: React.FC<TextareaProps> = ({label, name, ...rest }) =>{ //passando propriedades a serem recebidas (...rest  = passa todas as pripriedades sem necessecidade de importar uma por uma)
    return(
        <div className="textarea-block">
        <label htmlFor={name}>{label}</label>
        <textarea id={name} {...rest}/>  {/* {...rest }= passando todas a propriedades para o input*/}
    </div>
    )
}

export default Textarea;