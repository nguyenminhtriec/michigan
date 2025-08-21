
import {View, StyleSheet, Text, FlatList, Image, } from 'react-native';
import { useState } from 'react';
import { WebDatePicker, NativeDatePicker } from '@/components/MyDatePicker';
import { Platform } from 'react-native';
import { Link } from 'expo-router';

import type { MarsPhoto } from '@/lib/mars';

export default function MarsPhotos() {

    // const url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=201-09-30&api_key=DEMO_KEY';
    // const baseUrl = 'https://android-kotlin-fun-mars-server.appspot.com/photos';

    const [earthDate, setEarthDate] = useState<string>("");
    const [photos, setPhotos] = useState<MarsPhoto[]>([]);
    const [show, setShow] = useState(true);
    
    console.log("Earth date:", earthDate);
    const fetchPhotos = async () => {       
        const response = await fetch("/mars", {  
            cache: 'force-cache',         
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({earthDate})
        });    
        const data = await response.json();
        const photos: MarsPhoto[] = data.photos as MarsPhoto[];
        setPhotos(photos);      
    };
   
    return (
        <View style={{flex: 1, alignItems:'center', justifyContent:'center', gap: 16}}>
            <Text>About Us</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
