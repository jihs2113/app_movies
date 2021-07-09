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
                data : {results},
                data 
                //data 오브젝트 안에서 results를 가진다.
                //혹시data안에 results가 없을경우에는 작동하지 않는다
                //results 오브젝트나 array를 가지고있지않다
                
            } = await makeRequest(path, params);
            // return [results, null];
            return [results || data, null]
            //data안에 results가 없을경우에 results를 리턴하거나 data전체를 리턴해준다. 
          } catch (e){
            return [null, e];
          }
    };
    
export const movieApi = {
    //promise를 가지는 axios를 return한다.
    nowPlaying: () => makeRequest("/movie/now_playing"),
    //movies에서 now playing 한다.
    popular: () => makeRequest("/movie/popular"),
    upcoming: () => makeRequest("/movie/upcoming", {region: "kr"}),
    //지역
    search: query => makeRequest("/search/movie", { query }),
    //단어에 따라서
    movie: id => makeRequest(`/movie/${id}`),
    //id에 따라서
    discover: () => makeRequest("/discover/movie")
    //여기있는 리스트들은 전부 results를 가진다.
}

export const tvApi = {
    today: () => getAnything("/tv/airing_today"),
    thisWeek: () => getAnything("/tv/on_the_air"),
    topRated: () => getAnything("/tv/top_rated"),
    popular: () => getAnything("/tv/popular"),
    search: query => getAnything("/search/tv", { query }),
    show: id => getAnything(`/tv/${id}`)
  };
  
  export const apiImage = path => `https://image.tmdb.org/t/p/w500${path}`;