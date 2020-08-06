import React,{SelectHTMLAttributes} from "react"; //importando propriedades do html.

import "./styles.css";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{ // passando propriedades do html.
    name: string;
    label: string;
    options: Array<{ //defininindo array com os elementos das opçoes.
        value: string; 
        label: string;
    }>;


}

const  Select: React.FC<SelectProps> = ({label, name,options, ...rest }) =>{ //passando propriedades a serem recebidas (...rest  = passa todas as pripriedades sem necessecidade de importar uma por uma)
    return(
        <div className="select-block">
        <label htmlFor={name}>{label}</label>
        <select value="" id={name} {...rest}>

            <option value="" disabled selected hidden>Selecione uma opção</option> {/*exibe uma mensagem sem valor e nao é exibida como opçao.*/}

            {options.map(option => {
                return <option key={option.value} value={option.value}>{option.label}</option>//passando valor da label para quando o elemento for selecionado //passando valor da label de cada elementro do select para ser exibido.
            })}

        </select>  {/* {...rest }= passando todas a propriedades para o input*/}
    </div>
    )
}

export default Select;