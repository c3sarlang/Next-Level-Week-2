import React,{InputHTMLAttributes} from "react"; //importando propriedades do html.

import "./styles.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{ // passando propriedades do html.
    name: string;
    label: string;


}

const  Input: React.FC<InputProps> = ({label, name, ...rest }) =>{ //passando propriedades a serem recebidas (...rest  = passa todas as pripriedades sem necessecidade de importar uma por uma)
    return(
        <div className="input-block">
        <label htmlFor={name}>{label}</label>
        <input type="text" id={name} {...rest}/>  {/* {...rest }= passando todas a propriedades para o input*/}
    </div>
    )
}

export default Input;