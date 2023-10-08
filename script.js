const apiKey = "d1Tqx2D3Q98YDEJwFIfmTIAidYzWdq3gdzW5jDWNqZgmBQCbXwXy5EmQ";
const perPage = 15;
let currentPage = 1;

const getImages = (apiKey) => {
    fetch(apiKey, {
        
    })
}

getImages(`https://api.pexels.com/v1/curated?page${currentPage}&per_page=${perPage}`)