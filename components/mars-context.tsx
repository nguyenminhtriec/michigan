
import { createContext, useContext, useState } from "react";
import type { MarsPhoto } from "@/lib/mars";

interface MarsContextProps  {
    selectedPhoto?: MarsPhoto,
    setSelectedPhoto: (photo: MarsPhoto) => void,
} 

const initial: MarsContextProps = 
    {
        selectedPhoto: undefined,
        setSelectedPhoto: (_: MarsPhoto) => {},
    }
  
export const MarsContext = createContext<MarsContextProps>(initial);

export const usePhoto = () => useContext(MarsContext);

export function MarsContextProvider({children}: {children: React.ReactNode}) {
    const [selectedPhoto, setSelectedPhoto] = useState<MarsPhoto>();
    return (
        <MarsContext value = {{selectedPhoto, setSelectedPhoto}} >
            {children}
        </MarsContext>
    )
}

