const loadPhones = async (search = 'iphone') => {
    url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data);
}

const displayPhone = phones => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = ``;
    // display 10 results only
    phones = phones.slice(0, 10);


    // display no result found message
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }
    // display all search results
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit longer.</p>
                </div>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);
        // console.log(phone);
    });

    // stop loading spinner
    toggleSpinner(false)
}

document.getElementById('btn-search').addEventListener('click', function () {
    // start loading spinner
    toggleSpinner(true);
    hideResultContainer(false);

    const searchText = document.getElementById('search-field');
    const search = searchText.value;
    searchText.value = ``;
    loadPhones(search);

});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loading-spinner');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

const hideResultContainer = isHidden => {
    const resultContainer = document.getElementById('result-container');
    if (isHidden) {
        resultContainer.classList.add('d-none');
    }
    else {
        resultContainer.classList.remove('d-none');
    }
}

// loadPhones();