import { useEffect, useState } from 'react'
import apiClient from '../services/api-client';
import { CanceledError } from 'axios';

interface Genre {
    id:number;
    name:string;
}

interface FetchGenresResponse{
    count:number;
    results:Genre[];
}

const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [error, setError] = useState("");
    const [isLoading,setIsLoding] = useState(false);
    useEffect(() => {
      const controller = new AbortController();
      setIsLoding(true)
      apiClient
        .get<FetchGenresResponse>("/genres",{signal:controller.signal})
        .then((res) => {setGenres(res.data.results);
          setIsLoding(false)})
        .catch((err) => {if(err instanceof CanceledError) return;
            setError(err.message);
            setIsLoding(false)});
      return () => controller.abort();
    },[]);
    return { genres ,error ,isLoading }
}

export default useGenres;
