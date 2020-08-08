import React, { useState } from "react"
import { View,Image, Text, Linking } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"

import styles from "./styles"
import { RectButton, ScrollView } from "react-native-gesture-handler"

import heartOutlineIcon from "../../assets/images/icons/heart-outline.png"
import unfavoriteIcon from "../../assets/images/icons/unfavorite.png"
import whatsappIcon from "../../assets/images/icons/whatsapp.png"
import api from "../../services/api"

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
    favorited: boolean; //(true or false)


}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher,favorited}) => {

    const[isFavorited,setIsFavorited] = useState(favorited) //mudando estado de favorito

    function handleLinktoWhatsapp(){
        api.post("connections",{
            user_id: teacher.id
        })
            
        
        console.log(teacher.whatsapp)
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
    }

   async function handleToogleFavorited(){

        const favorites = await AsyncStorage.getItem("favorites")//buscando todos os favoritos

        let favoritesArray = [] //convertendo numa array vazia

        if(favorites){ //verifica se já existe e se encontrar subscreve o let
            favoritesArray = JSON.parse(favorites);
           }

        if(isFavorited){
            //remover dos favoritos
            const favoriteIndex = favoritesArray.findIndex((teacherItem:Teacher)=>{
                return teacherItem.id == teacher.id
            }) //procurando posicao na array

            favoritesArray.splice(favoriteIndex, 1)
            setIsFavorited(false)


        }else{
            favoritesArray.push(teacher); //mandando um novo teacher
            //adicionar aos favoritos
            setIsFavorited(true) //momento em que adiociona aos favoritos
           
        }

        await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray)) //salvando no async em string.
    }

    return(
        
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image 
                    style={styles.avatar}
                    source={{uri:teacher.avatar}}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                    {teacher.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {"   "}
                    <Text style={styles.priceValue}>{teacher.cost}</Text>
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                   <RectButton 
                    onPress={handleToogleFavorited}
                    style={[
                        styles.favoriteButton,
                        isFavorited ? styles.favorited : {} //se tiver favoritado botar esse estilo se nao é vazio
                        ]}>
                        {isFavorited 
                            ? <Image source={unfavoriteIcon}/>  //se tiver favoritado mostrar esse icone
                            : <Image source={heartOutlineIcon}/>//se nao tiver favoritado mostrar esse icone
                        } 
                        
                   </RectButton>

                   <RectButton onPress={handleLinktoWhatsapp}  style={styles.contactButton}>
                        <Image source={whatsappIcon}/>
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                   </RectButton>
           
            </View>

           
                  

        </View>
        
    )
}

export default TeacherItem;
