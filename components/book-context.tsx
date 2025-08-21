
import { createContext, useContext, useState } from "react";
import { type Book } from "@/lib/books";


interface BookContextProps {
    selectedBook?: Book,
    setSelectedBook: (book: Book) => void,
}

const initial: BookContextProps = 
    {
        selectedBook: undefined,
        setSelectedBook: (_: Book) => {},
    }

export const BookContext = createContext<BookContextProps>(initial);

export const useBook = () => useContext(BookContext);

export function BookContextProvider({children}: {children: React.ReactNode}) {
    const [selectedBook, setSelectedBook] = useState<Book>();
    return (
        <BookContext value={{selectedBook, setSelectedBook}}>
            {children}
        </BookContext>
    )
}