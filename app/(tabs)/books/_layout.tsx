import { Stack, Link } from "expo-router";
import { Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { BookContextProvider } from "@/components/book-context";


export default function BooksLayout() {

    return (
        <BookContextProvider>             
            <Stack screenOptions={{
                headerShown: true,
                title:'Exploring Books',
                headerTintColor: '#4ac',
                headerStyle: {backgroundColor:'#146f'},
                headerRight: () => 
                    <Link style={{marginEnd: 8}} href='/search'>
                        <FontAwesome name="building" size={24}/>
                    </Link>
                }} 
            />
            <Text style={{textAlign: 'center', color:'blue'}}>This Screen is rendered in Books Layout</Text>                  
        </BookContextProvider>
    )   
}
