export interface Movie{
    id: number,
      title: string,
      description: string,
      releaseDate: Date,
      duration: number,
      rating: number,
      isMovie: boolean,
      episodes: number,
      subscription: boolean,
      imageUrl: string,
      videoUrl: string,
      genres: any[],
}