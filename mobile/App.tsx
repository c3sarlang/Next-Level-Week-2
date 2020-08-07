import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Landing from "./src/pages/Landing/index"
import {AppLoading} from "expo" //carregamento na tela com splashscreen

import {Archivo_400Regular,Archivo_700Bold, useFonts} from "@expo-google-fonts/archivo" //importando fontes e definindo o tamanho o fontsize e o fontweigth.
import {Poppins_400Regular, Poppins_600SemiBold} from "@expo-google-fonts/poppins"
import AppStack from './src/routes/AppStack';




export default function App() {

  let [fontsLoaded] = useFonts ({ //carregando fonts na aplicacao.
    Archivo_400Regular, Archivo_700Bold,
    Poppins_400Regular, Poppins_600SemiBold
  })
  if (!fontsLoaded) { //enquando nao carregar as fonts nao redenriza as telas da aplicacao.
    return <AppLoading />;
  } else {



  return (
    // uma tag que nao é repassada para execucao mais permite a redenrizacao dos elementos contidos dentro dela
    <> 
      <AppStack/>
      <StatusBar style="light" />
    </>
  );
  }
}


