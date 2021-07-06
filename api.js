import axios from "axios";

const TMDB_KEY = "d17864ce7c763e2980e62cbf59966aca";

const makeRequest = (path, params) => 
    axios.get(`https://api.themoviedb.org/3${path}`,{
        //object의 content를 get하는 과정이다    
        //axios는 어떤 api request든 전부 json으로 변환해주어서 res.json()을 안해줘도된다.
        params:{
            ...params,
            api_key: TMDB_KEY
        }
    });

    // makeRequest("/movies", {page:2})
    const getAnything = async (path, params = {}) => {
        try{
            const { 
                data : {results} 
            } = await makeRequest(path, params);
            return [results, null];
          } catch (e){
            return [null, e];
          }
    };
    
export const movieApi = {
    //promise를 가지는 axios를 return한다.
    nowPlaying: () => makeRequest("/movie/now_playing"),
    //movies에서 now playing 한다.
    popular: () => makeRequest("/movie/popular"),
    popular: () => makeRequest("/movie/popular"),
    //지역
    search: query => makeRequest("/search/movie", { query }),
    //단어에 따라서
    movie: id => makeRequest(`/movie/${id}`),
    //id에 따라서
    discover: () => makeRequest("/discover/movie")
}

export const tvApi = {
    today: () => makeRequest("/tv/airing_today"),
    thisWeek: () => makeRequest("/tv/on_the_air"),
    topRated: () => makeRequest("/tv/top_rated"),
    popular: () => makeRequest("/tv/popular"),
    search: query => makeRequest("/search/tv", { query }),
    show: id => makeRequest(`/tv/${id}`)
}