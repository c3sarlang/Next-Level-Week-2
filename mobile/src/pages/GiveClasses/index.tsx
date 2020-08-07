import React from "react"
import {Text, View, ImageBackground} from "react-native"

import giveClassesImage from "../../assets/images/give-classes-background.png"

import styles from "./styles"
import { RectButton } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"



function GiveClasses() {

   
        const {goBack} = useNavigation(); //importando funcao que volta para página anterior

        function handleNavigateBack() { //voltar para página anterior
            goBack();
        }
    

    
    

    return(
       <View style={styles.container}>
           <ImageBackground 
                resizeMode="contain" //contido no tamanho do elemento
                source={giveClassesImage} 
                style={styles.content}
            > 
             <Text style={styles.title}>Que ser um Proffy?</Text>
             <Text style={styles.description}>
                 Para começar, você precisa se cadastrar como professor na nossa plataforma web.
            </Text>
           </ImageBackground>

            <RectButton 
                onPress={handleNavigateBack}
                style={styles.okButton}>
                <Text style={styles.okButtonText}>Tudo Bem</Text>
            </RectButton>

       </View>

    )
}

export default GiveClasses;