

import {View, StyleSheet, Text, FlatList, Image, Pressable} from 'react-native';
import { useState } from 'react';
import { WebDatePicker, NativeDatePicker } from '@/components/MyDatePicker';
import { Platform } from 'react-native';
import { Link, router } from 'expo-router';

import { MarsPhoto } from '@/lib/mars';
import { usePhoto } from '@/components/mars-context';


export default function PhotosGrid() {
    const [earthDate, setEarthDate] = useState<string>("2025-07-01");
    const [photos, setPhotos] = useState<MarsPhoto[]>([]);
    const [show, setShow] = useState(true);
    const {setSelectedPhoto} = usePhoto();

    const fetchPhotos = async () => {       
        const response = await fetch("/mars/mars", {  
            cache: 'force-cache',         
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({earthDate})
        });    
        const data = await response.json();
        const apiPhotos = data.photos;
        const photos: MarsPhoto[] = apiPhotos.map((photo: any) => {
            return  {
                id: photo.id, 
                img_src:photo.img_src, 
                rover_name: photo.rover.name, 
                camera_name: photo.camera.name, 
                earth_date: photo.earth_date 
            } as MarsPhoto;
        });           
        setPhotos(photos);
        console.log("Number of photos: ", photos.length);     
    };       
    return (
    <>   
        <View style={{flex: 1, alignItems:'center', justifyContent:'center', gap: 16, paddingTop: 8}}>
            { Platform.OS === 'web' ?
                <WebDatePicker 
                    onChange={(e) => setEarthDate(e.target.value)}
                    handleSearch={fetchPhotos}
                    photoCount={photos?.length} />  
                : <NativeDatePicker                    
                    isoStringDate={earthDate.split("T")[0]}
                    showCalendar={() => setShow(true)}
                    onChange={(_: any, seclectedDate?: Date) => {
                        if (seclectedDate) {
                            setEarthDate(seclectedDate.toISOString());
                            setShow(false);
                        }
                    }}
                    handleSearch={fetchPhotos}
                    isShowingCalendar={show} 
                    photoCount={photos?.length}                 
                />                  
            }
            <FlatList numColumns={4} style={{}}
                data={photos}
                keyExtractor={(item) => item.id}
                renderItem = {({item}) =>                    
                    <View style={{backgroundColor: 'lightblue', padding: 4}}>
                        <Text style={{top: 0, left: 0, zIndex: 100, color:'blue'}}>{item.id}</Text>               
                        <Pressable 
                            onPress={() => {
                                setSelectedPhoto(item);
                                router.push(`/mars/${item.id}`);
                            }}                            
                        >
                            <Image source={{uri:item.img_src}} style={{minWidth:100, minHeight: 100, }} resizeMode='contain' />                                         
                        </Pressable>
                    </View>
                    }
                >
            </FlatList>            
        </View>
        
    </>   
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
