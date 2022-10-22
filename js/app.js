const loadPhones = async (searchText, dataLimit) => {
    url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}

const displayPhone = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = ``;
    // display 10 results only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length >= 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none');
    }

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
            <div class="card p-2">
            <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <button onclick="loadPhoneDetailes('${phone.slug}')" href="#" class="btn btn-primary">Go somewhere</button>
                </div>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);
        // console.log(phone);
    });

    // stop loading spinner
    toggleSpinner(false)
}

const processSearch = (dataLimit) => {
    // start loading spinner
    toggleSpinner(true);
    hideResultContainer(false);

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchText.value = ``;
    loadPhones(searchText, dataLimit);
}

// handle search button click
document.getElementById('btn-search').addEventListener('click', function () {
    processSearch(10);
});

// search input field enter key handler
document.getElementById('search-field').addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
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

// not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
});

const loadPhoneDetailes = async id => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data.name);
}

// loadPhones();