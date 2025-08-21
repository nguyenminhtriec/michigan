
export type Book = {
    id: string,
    volumeInfo: VolumeInfo,
    
}

export type VolumeInfo = {
    title: string,
    subtitle: string,
    authors: string[],
    publisher: string,
    publishedDate: string,
    description: string,
    imageLinks: ImageLinks,
}

export type ImageLinks = {
    smallThumbnail: string,
    thumbnail: string,
}