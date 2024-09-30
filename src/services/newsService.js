// services/newsService.js
import { Q } from '@expo/html-elements';
import axios from 'axios';

// const API_KEY = '6f8c07532e4e11e811e44978d61d7c5b';
// const BASE_URL = 'https://newsapi.org/v2';


// export const getTopHeadlines = async (q = 'headlines', country = 'lk') => {
//     try {
//         let URL = `https://gnews.io/api/v4/search?q=${q}&lang=en&country=${country}&max=4&apikey=${API_KEY}`;
//         console.log(URL);
//         const response = await axios.get(URL);

//         return response.data.articles;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// };

// https://content.guardianapis.com/search?api-key=3b6f2f9a-5193-4f19-a5c6-a2104ec56be6




// let API_KEY = '0e7a7cf0-64c6-4a13-82a7-a58e219d37f6';
let API_KEY = '3b6f2f9a-5193-4f19-a5c6-a2104ec56be6';

let BASE_URL = `https://content.guardianapis.com/search?api-key=${API_KEY}&show-elements=image`;
export const getRecentNews = async () => {
    try {
        const response = await axios.get(`https://content.guardianapis.com/search?page=2&api-key=${API_KEY}&show-elements=image`);
        return response.data.response.results;
    } catch (error) {
        console.error(error);
    }
};

export const getNewsForCategory = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}&q=${query}`);

        return response.data.response.results;
    } catch (error) {
        console.error(error);
    }
};

export const getNewsById = async (id) => {

    const url = `https://content.guardianapis.com/search?ids=${id}&api-key=${API_KEY}&allowUgc=true&show-blocks=body&show-elements=image`;

    try {
        const response = await axios.get(url);
        // console.log(response.data.response.results[0].blocks.body[0].bodyTextSummary);
        return response.data
    } catch (error) {
        console.error(error);
        throw error;
    }
}


