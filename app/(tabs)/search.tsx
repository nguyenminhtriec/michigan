
import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import { TextInput, View, Text } from 'react-native';
// import {Divider} from 'react-native-elements';

export default function Search() {
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);

  return (  
    <View style={{flex:1, alignItems:'center', justifyContent:'center', gap: 16}}>
      <TextInput
        // value={search}
        onChangeText={search => {
          setSearch(search);
          router.setParams({ query: search });
        }}
        placeholderTextColor="#888"
        placeholder="Search"
        style={{
          borderRadius: 12,
          backgroundColor: '#fff',
          fontSize: 24,
          color: '#000',
          margin: 12,
          padding: 16,
        }}
      /> 
      <Text onPress={() => router.push('/mars')}>Go Mars</Text>  
      <Text onPress={() => router.push('/books')}>Go Books</Text>
    </View>    
  );
}
