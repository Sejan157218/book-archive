const searchInput = document.getElementById('serach-text');
const serachButton = document.getElementById('serach-button');
const errorMsg = document.getElementById('error-msg');
const spiner = document.getElementById('spiner');
// fetch url fuction
const urlFetch =async url=>{
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

// search value
const searchText =() =>{
    spiner.classList.remove('d-none');
    const searchValue = searchInput.value;
    if(searchValue ===''){
        errorMsg.textContent = '';
        const h2 = document.createElement('h2');
        h2.innerText = `Please Write Down A Book Name!!!`;
        errorMsg.appendChild(h2);
        searchInput.value = '';
        spiner.classList.add('d-none');
    }
    else{
        showResult(`http://openlibrary.org/search.json?q=${searchValue}`);  
    }     
}

// show result
const showResult = url =>{
    const displayResult = document.getElementById('display-result');
    displayResult.textContent = '';
    const reultCount = document.getElementById('reult-count');
    reultCount.textContent = '';    
    urlFetch(url).then((data)=>{
        if(data.numFound===0){
            errorMsg.textContent = '';
            spiner.classList.add('d-none');
            const h2 = document.createElement('h2');
            h2.innerText = `'${searchInput.value}' : no search result fund`;
            errorMsg.appendChild(h2);
            searchInput.value = '';
        }
        else{
        spiner.classList.add('d-none');
        searchInput.value = '';
        errorMsg.textContent = '';
        const h3 = document.createElement('h3');
        h3.innerText = `Total result Show : ${data.numFound}`;
        reultCount.appendChild(h3);
        // const displayResult = document.getElementById('display-result');
        // displayResult.textContent = '';
        data.docs.slice(0,30).forEach((element)=>{
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML =`
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                <div class="col-md-4">
                    <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="img-fluid rounded-start images-size" alt="...">
                </div>      
                <div class="col-md-8">  
                    <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">by ${element.author_name}</p>
                    <p class="card-text"><small class="text-muted">First published in ${element.first_publish_year}</small></p>
                    </div>
                </div>
                </div>
            </div>
            `;
            displayResult.appendChild(div);
        });
        }; 
    });
};
serachButton.addEventListener('click',function(){
    searchText();
});
