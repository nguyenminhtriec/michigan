
import { usePhoto } from "@/components/mars-context";
import {View, Text, Image} from'react-native';


export default function OnePhoto() {
    const {selectedPhoto} = usePhoto();
    console.log("ID:", selectedPhoto?.id, "SRC:", selectedPhoto?.img_src);
    
    if (!selectedPhoto) 
        return <Text>No photos selected.</Text>
    return (        
        <View style={{flex: 1, alignItems:'center', justifyContent:'center', gap: 8, backgroundColor:'#20608f'}}>
            <Text style={{ alignItems:'flex-start', justifyContent:'center', padding: 8, color:'white',
                borderRadius: 8, borderColor:'gray', borderWidth: .5 }}>
                <Text>{`ID: ${selectedPhoto.id} \n`}</Text>
                <Text>{`Date: ${selectedPhoto.earth_date}\n`}</Text>
                <Text>{`Rover name: ${selectedPhoto.rover_name}\n`}</Text>
                <Text>{`Camera name: ${selectedPhoto.camera_name}`}</Text>
            </Text>
            <Image source={ {uri: selectedPhoto?.img_src} } style={{width: 400, height: 400}} resizeMode="contain" />
        </View>                        
    )}