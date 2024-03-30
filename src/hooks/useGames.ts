import { GmaeQuery } from "../App";
import useData from "./useData";


export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: { platform: Platform }[];
    metacritic: number;
  }

const useGames = (gameQuery:GmaeQuery) => useData<Game>('/games', {
  params: {genres:gameQuery.genre?.id,platforms: gameQuery.platform?.id}
},
[gameQuery.genre?.id,gameQuery.platform?.id])
export default useGames