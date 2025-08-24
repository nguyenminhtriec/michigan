
import {useBook} from '@/components/book-context';
import { useState } from 'react';
import Ionicons  from '@expo/vector-icons/Ionicons';
import {View, ScrollView, Text, Image, StyleSheet, Pressable} from 'react-native';


export default function BookDetails() {
    const {selectedBook} = useBook();
    const [isShowingDesc, setIsShowingDesc] = useState(false);
    if (!selectedBook)
        return;
    
    const getShortDescription = () => {
        const fullDescription = selectedBook.volumeInfo.description || '';
        const length = fullDescription.length;
        const dots = " . . .   (Source: Publisher)";
        if (length === 0) return 'No introduction availlable.';
        if (length > 1000) return  fullDescription.slice(0, length/5) + dots;
        if (length > 500) return fullDescription.slice(0, length/3) + dots;
        if (length > 100) return fullDescription.slice(0, length/2) + dots;
        return fullDescription + dots;                
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerTop}>
                <Image 
                  source={{uri: selectedBook.volumeInfo.imageLinks?.smallThumbnail}} 
                  alt='Book Image' 
                  style={{width:80, height:120}} resizeMode='contain' />
                <View style={{alignItems:'flex-start', justifyContent:'center', gap: 4}} >
                    <Text style={styles.textBold}>{selectedBook.volumeInfo.title}</Text>
                    <Text style={styles.textSemiBold}>{selectedBook.volumeInfo.subtitle}</Text>
                    
                </View>
            </View>
            <View style={{alignItems:'flex-start', justifyContent:'center', gap: 4}}>
                <Text>Author(s): {selectedBook.volumeInfo.authors?.join(', ') || "Unknown"}</Text>
                <Text>Published date: {selectedBook.volumeInfo.publishedDate}</Text>
                <Text>Publisher: {selectedBook.volumeInfo.publisher}</Text>
            </View>
            <View style={styles.containerIntro}>
                <Text style={{flex:1, textAlign:'left', fontWeight:'500'}}>Introduction</Text>
                <Pressable onPress={() => setIsShowingDesc(!isShowingDesc)} disabled={!selectedBook.volumeInfo.description}>
                    <Ionicons name={isShowingDesc ? 'chevron-down' : 'chevron-forward'} size={24} />
                </Pressable>
            </View>
            <ScrollView style={{flex:1}}>
                {isShowingDesc 
                    ?  <Text style={styles.textNormal}>{selectedBook.volumeInfo.description}</Text> 
                    :  <Text style={styles.textNormal}>{getShortDescription()}</Text>}
                {isShowingDesc ? <Text style={{ textAlign:'right'}}>Source: Publisher</Text> : ''}
            </ScrollView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,  justifyContent:'center', padding:8, paddingHorizontal: 16, gap:8, 
        backgroundColor:'#cff',
    },
    containerTop: {
        flexDirection:'row', justifyContent: 'flex-start', alignItems:'center', gap:8
    },
    containerIntro: {
        flexDirection:'row', alignItems:'center', justifyContent: 'space-between',
    },
    containerBody: {
        flex:1, gap: 8
    },
    textBold: {
        flexWrap:'wrap',
        wordWrap:'wrap',
        fontWeight:'bold'
    },
    textSemiBold: {
        flexWrap:'wrap',
        wordWrap:'wrap',
        fontWeight:'500'
    },
    textNormal: {
        fontSize:14,
        fontWeight:'400',
        lineHeight: 18,
    }
    
});