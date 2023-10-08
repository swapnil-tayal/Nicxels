const imageWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search input");
const lightBox = document.querySelector(".lightbox");
const closeBtn = lightBox.querySelector(".uil-times");
const downloadImgBtn = lightBox.querySelector(".uil-import");

const apiKey = "d1Tqx2D3Q98YDEJwFIfmTIAidYzWdq3gdzW5jDWNqZgmBQCbXwXy5EmQ";
const perPage = 15;
let currentPage = 1;
let searchWord = null;

const downloadImg = (imgUrl) => {
    
    fetch(imgUrl).then(res => res.blob()).then(file => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = new Date().getTime();
        a.click();
    }).catch(() => alert("~Failed to download image"));
}

const showLightbox = (name, img) => {
    lightBox.querySelector("img").src = img;
    lightBox.querySelector("span").innerHTML = name;
    downloadImgBtn.setAttribute("data-img", img);
    lightBox.classList.add("show");
    document.body.style.overflow = "hidden";
}

const hideLightBox = () => {
    lightBox.classList.remove("show");
    document.body.style.overflow = "auto";
}

const generateHTML = (images) => {

    imageWrapper.innerHTML += images.map(img => 
        `<li class="card" onclick="showLightbox('${img.photographer}', '${img.src.large2x}')">
            <img src="${img.src.large2x}" alt="img">
            <div class="details">
                <div class="photographer">
                    <i class="uil uil-camera"></i>
                    <span>${img.photographer}</span>
                </div>
                <button onclick="downloadImg('${img.src.large2x}');">
                    <i class="uil uil-import"></i>
                </button>
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

const loadMoreImages = () => {
    currentPage++;
    let apiUrl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
    apiUrl = searchWord 
             ? `https://api.pexels.com/v1/search?query=${searchWord}&page=${currentPage}&per_page=${perPage}`
             : apiUrl;
    getImages(apiUrl);
}

const loadSearchImages = (e) => {
    if(e.target.value === "") return searchWord = null; 
    if(e.key === "Enter"){
        searchWord = e.target.value;
        currentPage = 1;
        imageWrapper.innerHTML = "";
        getImages(`https://api.pexels.com/v1/search?query=${searchWord}&page=1&per_page=${perPage}`);
    }
}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`)
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);
closeBtn.addEventListener("click", hideLightBox);   
downloadImgBtn.addEventListener("click", (e) => downloadImg(e.target.dataset.img));