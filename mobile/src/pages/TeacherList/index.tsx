import React, { useState} from "react"
import {View,Text, TextInput} from "react-native"
import {Feather} from "@expo/vector-icons"
import AsyncStorage from "@react-native-community/async-storage"

import styles from "./styles"
import PageHeader from "../../components/PageHeader"
import TeacherItem, { Teacher } from "../../components/TeacherItem"
import { ScrollView, BorderlessButton, RectButton } from "react-native-gesture-handler"
import api from "../../services/api"
import { response } from "express"
import { useFocusEffect } from "@react-navigation/native"



function TeacherList() {

    const [teachers, setTeachers] =  useState([]);
    const[favorites,setFavorites] = useState<number[]>([]) //diendo que o resultado deve ser em number que vai ser o id

    const [subject,setSubject] = useState("");
    const [week_day,setWeek_day] = useState("");
    const [time,setTime] = useState("");

    function loadFavorites () {
        AsyncStorage.getItem("favorites").then(response =>{
            if(response) {
                const favoritedTeachers = JSON.parse(response) //transformando a lista de favoritos numarquivo json.
                const favoritedTeachersIds = favoritedTeachers.map((teacher:Teacher) => { //percorrendo cada um e pegando somente o id dos favoritados
                    return teacher.id
                })

                setFavorites(favoritedTeachersIds) //settando favoritos
            }
        })
    }

    useFocusEffect(() => {
        loadFavorites()
    })

   

    async function handleFilterSubmit(){

        loadFavorites(); //chamando os favoritos ao submeter os filtros

        const response = await api.get("classes",{ //buscando nas tabela classes do banco de dados.
            params: {
                subject,
                week_day, //enviar número
                time
            }
        })
        setIsFiltersVisible(false)
        setTeachers(response.data)
    }

    const [isFiltersVisible,setIsFiltersVisible] = useState(false); //so abre os fitros a partir de uma açao.
    
    function handleToogleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible)//se tiver true clica fica falso//se tiver false fica true.
    }

    return(
        <View style={styles.container}>
            <PageHeader 
                title="Proffy's disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToogleFiltersVisible}>
                        <Feather name="filter" size={20} color="#fff"/>
                    </BorderlessButton>
                )}
                >
                  {isFiltersVisible &&  ( //chanmado a funcao de settar os filtros na tela.
                        <View style={styles.searchForm}>
                                <Text style={styles.label}>Matéria</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={subject}
                                        onChangeText={text => setSubject(text)}
                                        placeholder="Qual a matéria?"
                                        placeholderTextColor="#c1bccc"
                                    
                                />

                                <View style={styles.inputGroup}>
                                    <View style={styles.inputBlock}>
                                            <Text style={styles.label}>Dia da semana</Text>
                                        <TextInput
                                              value={week_day}
                                              onChangeText={text => setWeek_day(text)}
                                            style={styles.input}
                                            placeholder="Qual o dia?"
                                            placeholderTextColor="#c1bccc"
                                        />
                                    </View>

                                    <View style={styles.inputBlock}>
                                            <Text style={styles.label}>Horário</Text>
                                        <TextInput
                                            value={time}
                                            onChangeText={text => setTime(text)}
                                            style={styles.input}
                                            placeholder="Qual o horário?"
                                            placeholderTextColor="#c1bccc"
                                        />
                                    </View>
                                </View>     

                                <RectButton 
                                    onPress={handleFilterSubmit}
                                    style={styles.submitButton}>
                                    <Text style={styles.submitButtonText}>Filtrar</Text>
                                </RectButton>
                        </View>
                  )}
            </PageHeader>
              



            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((teacher:Teacher)=>{
                    return <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                            
                            />
                })}
                
            </ScrollView>

        </View>
    

        
    ) 
}
export default TeacherList;