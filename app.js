console.log("Let's get this party started!");
const submitButton = document.querySelector('#form-submit');
const clearButton = document.querySelector('#form-clear-images');
const imageList = document.querySelector('#image-list');

async function getGIF(query){
    if (query.length < 3){
        alert('query length is too short. Must be at least 3');
    }
    else{
        try {
            const request = await axios.get('https://api.giphy.com/v1/gifs/search', {params: {api_key: "Ozsv6SvE0Xrcg8KcjgFpRZVyBqGem4gg", q: query, limit: 1}});
            const images = request.data.data;
            images.forEach(function(image){
                createGif(image.images.original.url);
            })
        }
        catch(e){
            alert('error occured');
            console.log(e);
    
        }
    }
}

function createGif(source){
    const gifImage = document.createElement('img');
    gifImage.src = source;
    gifImage.classList.toggle('giphyImage');
    imageList.append(gifImage);
}

function removeImages(){
    imageList.innerHTML = '';
}

submitButton.addEventListener('click', function(event){
    event.preventDefault();
    const search = document.querySelector('#query');
    console.log(search.value);
    getGIF(search.value);
    search.value = '';
});

clearButton.addEventListener('click', function(event){
    event.preventDefault();
    removeImages();
})