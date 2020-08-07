import {StyleSheet} from "react-native"

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor:"#8257E5",
        justifyContent: "center",
        padding: 50,
        
        
    },
    banner: {
        width: "100%", //redenriza 100% na tela respeitando ar margens de cada lado.
        resizeMode: "contain", //mantém no formato original sem distorçoes.
        marginTop: 50


    },
    title: {
        fontFamily: "Archivo_400Regular",
        color: "#fff",
        fontSize: 20,
        lineHeight: 30,
        marginTop: 15
        

    },
    titleBold:{
        fontFamily:"Poppins_600SemiBold"
    },

    buttonsContainer: {
        flexDirection: "row",
        marginTop: 30,
        justifyContent: "space-between"
    },
    button:{
        height: 150,
        width: "48%",
        backgroundColor: "#333",
        borderRadius: 8,
        padding: 24,
        justifyContent: "space-between"

    },
    buttonPrimary: {
        backgroundColor: "#9871F5"

    },
    buttonSecundary: {
        backgroundColor: "#04d361"

    },
    buttonText: {
        fontFamily: "Archivo_700Bold",
        color: "#FFF",
        fontSize: 20
    },
    totalConnections: {
        fontFamily: "Poppins_400Regular",
        color: "#d4c2ff",
        fontSize: 12,
        lineHeight: 20,
        maxWidth: 140,
        marginTop: 20
       
    }


    
})

export default styles;