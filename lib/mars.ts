
export interface MarsPhoto {
    id: string, 
    img_src: string,
    earth_date: string,
    rover_name: string,
    camera_name: string,
};

export async function fetchPhotos (earthDate: string) {       
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
    return photos;
}    




