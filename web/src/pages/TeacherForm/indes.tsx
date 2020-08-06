import React,{useState, FormEvent} from 'react'
import {useHistory} from "react-router-dom"
import PageHeader from '../../components/PageHeader'

import "./styles.css";
import Input from '../../components/Input';

import warningIcon from "../../assets/images/icons/warning.svg"
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';


function TeacherForm() {

    const history = useHistory();//navegaçao entre páginas

    const[name,setName] = useState("");
    const[avatar,setAvatar] = useState("");
    const[whatsapp,setWhatsapp] = useState("")
    const[bio,setBio] = useState("");

    const[subject,setSubject] = useState("");
    const[cost,setCost] = useState("");
    

    const [scheduleItems,setScheduleItems] = useState ([ //definindo campos a serem usados e setados pela array
        {week_day: 0,from: "",to: ""}
    ])


    function addNewScheduleItem () { //defininfo os items a serem adicionados
        setScheduleItems([
            ...scheduleItems, //copiando todos items
            {week_day: 0,from: "",to: ""} //iniciando com campos vazios.
        ]);      
        // console.log(addNewScheduleItem)
    }

    function setScheduleItemValue(position: number, field:string, value:string){ //settando os campos a serem usados.
        const updatedScheduleItems = scheduleItems.map((scheduleItem,index) => {//adiciona ao array as alteraçoes com a mesma quantidade de campos.
            if(index === position) { //se o item for igual ao item que eu quero alterar
                return {...scheduleItem, [field]: value} //retorna o objeto com os valores antigos porem sobrescrevendo o novo campo com o novo valo
            }

            return scheduleItem;
        }) 

        console.log(updatedScheduleItems);
        setScheduleItems(updatedScheduleItems);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();//prefine o comportamento padrao de um formulario
        
        api.post("classes", {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule:scheduleItems
        }).then(()=> {
            alert("Cadastro realizado com sucesso!")
            history.push("/")
        }).catch(()=> {
            alert("Erro no cadastro!")
        })

        console.log({
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            scheduleItems
        })
    }

    return(
        <div id="page-teacher-form" className="container"> {/*herdando caracteristicas do styles global*/ }
        <PageHeader 
            title="Que incrível que você quer dar aulas"
            description="O primeiro passo é preencher esse formulário de inscrição"
        />

        <main>
            <form onSubmit={handleCreateClass}> {/*ao submeter o formulário chama a funçao */}
            <fieldset>
                <legend>Seus dados</legend>

                <Input name="name" label="Nome completo" value={name} onChange={(e) => {setName(e.target.value)}}/> {/*dizendo que quando o valor mudar seja setado na variavel*/}
                <Input name="avatar" label="Avatar (Insira aqui uma url para imagem de perfil)" value={avatar} onChange={(e) => {setAvatar(e.target.value)}}/>
                <Input name="whatsapp" label="Whastapp" value={whatsapp} onChange={(e) => {setWhatsapp(e.target.value)}}/>
                <Textarea name="bio" label="Biografia" value={bio} onChange={(e) => {setBio(e.target.value)}}/>
            </fieldset>

            <fieldset>
                <legend>Sobre a aula</legend>

                <Select 
                name="subject" 
                label="Matéria"
                value={subject}
                onChange={(e)=>{setSubject(e.target.value)}}
                options={[
                    {value: "Português", label: "Português"},
                    {value: "Matemática", label: "Matemática"},
                    {value: "Geografia", label: "Geografia"},
                    {value: "História", label: "História"},
                    {value: "Física", label: "Física"},
                    {value: "Química", label: "Química"},
                    {value: "Biologia", label: "Biologia"},
                    {value: "Ciências", label: "Ciências"},
                    {value: "Artes", label: "Artes"},
                    {value: "Educação Física", label: "Educação Física"},
                    
                ]}
                />
                
                <Input name="cost" label="Custo da sua hora por aula" value={cost} onChange={(e)=>{setCost(e.target.value)}}/>
                

            </fieldset>

                <fieldset>
                    <legend>Horários disponivéis
                    <button type="button" onClick={addNewScheduleItem}> {/*disparando uncao de adicionar items*/ }
                        + Novo Horário
                    </button>
                    </legend>

                {scheduleItems.map((scheduleItem,index) => { //utilizando item da array
                    return(
                        <div key={scheduleItem.week_day}className="schedule-item"> {/*seleciodando apenas um dia na semana*/}
                        <Select 
                            name="week_day" 
                            label="Dia da semana"
                            value={scheduleItem.week_day} //settando váriavel a ser armazanado o valor
                            onChange={(e)=>{setScheduleItemValue(index, "week_day", e.target.value)}}
                            options={[
                                {value: "0", label: "Domingo"},
                                {value: "1", label: "Segunda"},
                                {value: "2", label: "Terça"},
                                {value: "3", label: "Quarta"},
                                {value: "4", label: "Quinta"},
                                {value: "5", label: "Sexta"},
                                {value: "6", label: "Sábado"},
                                
                            ]}
                            />

                        <Input name="from" label="Das" type="time" value={scheduleItem.from} onChange={(e)=>{setScheduleItemValue(index, "from", e.target.value)}}/>
                        <Input name="to" label="Até" type="time"value={scheduleItem.to} onChange={(e)=>{setScheduleItemValue(index, "to", e.target.value)}}></Input>
                    </div>
                    )
                })}  
                
                </fieldset>


            <footer>
                <p>
                    <img src={warningIcon} alt="Aviso importante"/>
                    Importante! <br />
                    Preencha todos os dados
                </p>
                <button type="submit"> 
                    Salvar cadastro
                </button>
            </footer>
            </form>
        </main>
     </div>
    )
}

export default TeacherForm;