const apiKey = "d1Tqx2D3Q98YDEJwFIfmTIAidYzWdq3gdzW5jDWNqZgmBQCbXwXy5EmQ";
const perPage = 15;
let currentPage = 1;
const imageWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
let searchInput = document.querySelector(".search-box input");
let searchWord = null;

const generateHTML = (images) => {

    imageWrapper.innerHTML += images.map(img => 
        `<li class="card">
        <img src="${img.src.large2x}" alt="img">
        <div class="details">
            <div class="photographer">
                <i class="uil uil-camera"></i>
                <span>${img.photographer}</span>
            </div>
            <button><i class="uil uil-import"></i></button>
        </div>
        </li>`    
    ).join("");

}

const getImages = (apiURL) => {

    loadMoreBtn.innerHTML = "Loading...";
    loadMoreBtn.classList.add("disabled");

    fetch(apiURL, {
        headers: {Authorization: apiKey}
    }).then(res => res.json()).then(data => {
        generateHTML(data.photos);
        loadMoreBtn.innerHTML = "Load More";
        loadMoreBtn.classList.remove("disabled");
    }).catch(() => alert("Failed to load images"));
}

console.log(searchInput);

const loadMoreImages = () => {
    currentPage++;
    let apiUrl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
    apiUrl = searchInput 
             ? `https://api.pexels.com/v1/search?query=${searchInput}/page=${currentPage}&per_page=${perPage}`
             : apiUrl;
    getImages(apiUrl);
}

const loadSearchImages = (e) => {
    if(e.target.value === "") return searchWord = null; 
    if(e.key == "Enter"){
        searchInput = e.target.value;
        currentPage = 1;
        imageWrapper.innerHTML = "";
        let apiUrl = `https://api.pexels.com/v1/search?query=${searchInput}/page=${currentPage}&per_page=${perPage}`;
        getImages(apiUrl);
    }
}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`)
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);