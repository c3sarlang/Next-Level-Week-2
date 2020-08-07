import React from "react"
import {View, Image, Text, TouchableOpacity} from "react-native"
import {useNavigation} from "@react-navigation/native"

import {RectButton} from "react-native-gesture-handler" //importando botao da bliblioteca

import styles from "./styles";

import ladingImg from "../../assets/images/landing.png"
import studyIcon from "../../assets/images/icons/study.png"
import giveClassesIcon from "../../assets/images/icons/give-classes.png"
import HeartIcon from "../../assets/images/icons/heart.png"

function Landing (){

    const {navigate} = useNavigation() //usando navegacao

    function handleNavigateToGiveClassesPage(){ //passando qual rota vai ser acessada
        navigate("GiveClasses")

    }
    function handleNavigateToStudyPaGes(){
        navigate("Study")
    }

    return(
        <View style={styles.container}>
            <Image source={ladingImg} style={styles.banner}/>

            <Text style={styles.title}>
                Seja bem-vindo, {"\n"} {/*quebra de linha numa variavel text*/}
                <Text style={styles.titleBold}>O que deseja fazer?</Text>
            </Text>

            <View style={styles.buttonsContainer}> 
                <RectButton 
                    onPress={handleNavigateToStudyPaGes}
                    style={[styles.button,styles.buttonPrimary]}>  
                    <Image source={studyIcon}/>

                    <Text style={styles.buttonText}>Estudar</Text>
                    
                </RectButton>

                <RectButton 
                    onPress={handleNavigateToGiveClassesPage}
                    style={[styles.button,styles.buttonSecundary]}> 

                    <Image source={giveClassesIcon}/>

                    <Text style={styles.buttonText}>Dar aulas</Text>
                    
                </RectButton>

            </View>


            <Text style={styles.totalConnections}>
                Total de 285  já realizadas {" "}
                <Image source={HeartIcon}/>
            </Text>
            
        </View>

        

    )
}

export default Landing;