import React,{useState} from "react"
import {View, ScrollView} from "react-native"
import {useFocusEffect} from "@react-navigation/native"

import styles from "./styles"

import PageHeader from "../../components/PageHeader"
import TeacherItem, { Teacher } from "../../components/TeacherItem"
import AsyncStorage from "@react-native-community/async-storage"

function Favorites() {
    
    const[favorites,setFavorites] = useState([]) //diendo que o resultado deve ser em number que vai ser o id


    function loadFavorites () {
        AsyncStorage.getItem("favorites").then(response =>{
            if(response) {
                const favoritedTeachers = JSON.parse(response) //transformando a lista de favoritos numarquivo json.
                setFavorites(favoritedTeachers) //settando favoritos
            }
        })
    }

    useFocusEffect(()=>{ //executa toda vez que a tela entra em foco.
        loadFavorites()
    })


    return(
        <View style={styles.container}>
        <PageHeader title="Meus proffy's favoritos"/>

        <ScrollView
            style={styles.teacherList}
            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16
            }}
        >
            {favorites.map((teacher: Teacher)=>{ //settando favoritos como e passandoo como teacheritem com as propriedades obrigatorias.
                return(
                    <TeacherItem
                        key={teacher.id}
                        teacher={teacher}
                        favorited={true}
                    />
                )
            })}
           
        </ScrollView>
    </View>
    ) 
}
export default Favorites;