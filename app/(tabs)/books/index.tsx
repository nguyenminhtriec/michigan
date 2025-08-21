
import { useState } from 'react'; 
import {View, Text, Image, Pressable, FlatList, TextInput} from 'react-native';
import { type Book } from '@/lib/books';

import Ionicons from '@expo/vector-icons/Ionicons';
import {useBook} from '@/components/book-context';
import { router } from 'expo-router';
// import { useRouter } from 'expo-router';


export default function Books() {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState<Book[]>([]);
    const {setSelectedBook} = useBook();

    const handleBookClick = (book: Book) => {
        setSelectedBook(book);
        router.push(`/books/${book.id}`);
    }

    const fetchBooks = async () => {
        const baseUrl = 'https://www.googleapis.com/books/v1/volumes?';
        const params = new URLSearchParams();
        params.set('q', query);
        params.set("maxResults", "20");
        // params.set("printType", "books");
        const fullUrl = baseUrl + params.toString();
        
        const respond = await fetch(fullUrl, {
           cache: 'force-cache'
        });
        if (!respond.ok) return;

        const data = await respond.json();
        const items: Book[] = data.items;
        
        setBooks(items);        
    }
    console.log("Books retrieved:", books.length, books[0]);    

    return (    
        <View style={{flex: 1, alignItems:'center', justifyContent:'center', gap: 8, paddingTop: 8, backgroundColor: '#6ab'}}>
            <View style={{ 
                flexDirection:'row', 
                justifyContent:'space-between', 
                alignItems:'center', minWidth: 400, padding: 4,
                borderWidth: .5, borderRadius:4, borderColor:'def' }}
            >
                <TextInput
                    value={query} 
                    onChangeText={(text) => setQuery(text)} 
                    // onBlur={(e:any) => setQuery(e.target.value)}
                    placeholder='Input search text' 
                    placeholderTextColor='#dcc'
                    style={{ minWidth:320, padding: 4, fontSize: 16}} />
                <Pressable onPress={() => setQuery('')} style={{width:32, height:32, padding:4, borderRadius:4}}> 
                    <Ionicons name='trash' size={24} />
                </Pressable>
                <Pressable onPress={fetchBooks} style={{width:32, height:32, padding:4, borderRadius:4}}> 
                    <Ionicons name='search' size={24} />
                </Pressable>    
            </View> 
           
            <FlatList numColumns={2} style={{flex: 1, minWidth: 400, padding: 8, backgroundColor:'#08a8'}}
                data={books}
                keyExtractor={book => book.id}
                renderItem={({item}) => (
                    <View style={{padding: 4}}> 
                    <Pressable onPress={() => {
                        handleBookClick(item);
                    }}>
                        <Image 
                            source={{uri: item.volumeInfo.imageLinks?.thumbnail}} alt='Book image'
                            style={{minWidth:180, minHeight:270}} resizeMode='contain'  />
                    </Pressable>
                    </View>
                )}>
            </FlatList>
        </View>            
    )    
}