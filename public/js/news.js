const forNews = document.querySelector('.forNews');
const newsImg = document.querySelector('.newsImg');
const newSection = document.getElementById("newSection");
let newsLoading = document.getElementById("news-loading");


const getSportsNewsData = async (category) => {
    try
    {
        newsLoading.innerHTML = `<span class="spinner-border spinner-border-md" role="status"  aria-hidden="true"></span>`;
        const url = `http://newsapi.org/v2/top-headlines?country=in&category=${category}&pageSize=50&apiKey=306a0143180f4bd7ae1ef8515453c2be`;
        const response = await fetch(url);
        const data = await response.json();
        if (data) {
            newsLoading.style.display = "none";
            console.log(data);
            showSportsNewsData(data);
        }
        else{
            newsLoading.innerText = "Failed to fetch News !!";
            newsLoading.style.display = "block";
        }
        
        
    } 
    catch (error) 
    {
        console.log(error);
    }
    
}

const showSportsNewsData = async (data) => {
    let news = "";
    data.articles.map((element, index)=>{
        console.log(element.urlToImage)
        const published = element.publishedAt.split("T", 2);
        const time = published[1].slice(0,-1);
         news += 
        `
    <div class="col-lg-6">
        <div class=" row my-4 main-news">
            <div class="forImg col-4">
                <img src=${element.urlToImage != null ? element.urlToImage : "images/news.jpg"} alt="" class="newsImg shadow-lg rounded">
            </div>
            <div class="forNews col-8">
                <div class="first d-flex justify-content-between align-items-center">
                    <div class="news-author">
                        ${element.source.name}
                    </div>
                    <div class="news-time">
                    ${time}
                    </div>
                    <div class="news-date">
                      ${published[0]}
                    </div>
                </div>
                <div class="second">
                    <div class="news-title fw-bold">
                    ${element.title}
                    </div>
                    <div class="news-description">
                    ${element.description}
                    </div>
                    <a class="read-more" href = ${element.url}>
                    Read more
                    </a>
                </div>
            </div>
        </div> 
    </div>       
        `;
    });

    newSection.innerHTML = news;
    
}

let category = window.location.href;
category = category.split("/").splice(-1);
category = category.toString();
console.log("it is url = " + category);

switch (category) {
    case "sports":
        getSportsNewsData("sports");
        break;

    case "business":
        getSportsNewsData("business");
        break;   
        
    case "health":
        getSportsNewsData("health");
        break;   

    case "entertainment":
        getSportsNewsData("entertainment");
        break;   

    case "science":
        getSportsNewsData("science");
        break;   

    case "general":
        getSportsNewsData("general");
        break;   

    case "technology":
        getSportsNewsData("technology");
        break;   

    default:
        break;
};

