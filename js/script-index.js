let date = new Date();
let date_year = date.getFullYear();
let date_month = date.getMonth() + 1;
let date_day = date.getDate();

formatDate(0);
let date_latest = date;

sendAPIRequest();

    /* FUNCTIONS */

async function sendAPIRequest() {
    console.log(`• Called from function "sendAPIRequest()": ${date}`);
    const api_key = "dCibGf4uxxR98Be0x5jLTtQVExyirXsiKBzQTBbO";
	let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}&concept_tags=True`);
	console.log(response);
    let data = await response.json();
    console.log(data);

    /* TIMEZONES AHEAD FIX */
    if (data.code == 404) {
        console.log(`• Called from function "sendAPIRequest()" - ERROR (CODE 404): ${date}`);
        formatDate(1);
        console.log(`• Called from function "sendAPIRequest()" - FIX (DATE_LATEST - 1): ${date}`);
        response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}&concept_tags=True`);
        console.log(response);
        data = await response.json();
        console.log(data);
    }

    /* UNAVAILABLE DATES FIX */
    if (data.code == 400) {
        console.log(`• Called from function "sendAPIRequest()" - ERROR (CODE 400): ${date}`);
        formatDate(1);
        console.log(`• Called from function "sendAPIRequest()" - FIX (DATE_LATEST): ${date}`);
        response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}&concept_tags=True`);
        console.log(response);
        data = await response.json();
        console.log(data);
    }

    useAPIData(data); 
}

function useAPIData(data) {
    document.querySelector("#apod-date").innerHTML = `<h2 class="zoom-300">${data.date}</h2>`;
    if (data.media_type == "image") document.querySelector("#apod-media").innerHTML =
    `<div id="apod-image" class="col-12 d-flex justify-content-center align-items-center">
        <img src="${data.url}" width="50%" height="100%">
    </div>`;
    // else if (data.media_type == "video") document.querySelector("#apod-media").innerHTML = `<a href="${data.url}" target="_blank">Link To The Video</a>`;
    else if (data.media_type == "video") document.querySelector("#apod-media").innerHTML =
    `<div id="apod-video">
        <iframe class="video" src="${data.url}&autoplay=1" title="YouTube Video Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking" allowfullscreen></iframe>
    </div>`;
    document.querySelector("#apod-title").innerHTML = `<p class="zoom-200 fw-bold text-decoration-underline">${data.title}</p>`;
    document.querySelector("#apod-explanation").innerHTML = `<p class="zoom-200">${data.explanation}</p>`;
    document.querySelector("#apod-copyright").innerHTML = `<p class="zoom-200"><span class="fw-bold">Copyright:</span> ${data.copyright}</p>`;
}

function inputDate() {
    date = prompt("Enter date (YYYY-MM-DD):");
    formatDate(0);
    sendAPIRequest(date);
}

function formatDate(i) {
    if (date_day - i <= 0) {
        if (date_month - 1 <= 0) date_year--;
        date_month--;
        if (date_month == 1 || date_month == 3 || date_month == 5 || date_month == 7 || date_month == 8 || date_month == 10 || date_month == 12) date_day = 31 + date_day - i;
        else if (date_month == 4 || date_month == 6 || date_month == 9 || date_month == 11) date_day = 30 + date_day - i;
        else if (date_month == 2) {
            if (date_year % 4 == 0) date_day = 29 + date_day - i;
            else date_day = 28 + date_day - i;
        }

        if (date_month <= 9 && date_day <= 9) date = `${date_year}-0${date_month}-0${date_day}`;
        else if (date_day <= 9) date = `${date_year}-${date_month}-0${date_day}`;
        else if (date_month <= 9) date = `${date_year}-0${date_month}-${date_day}`;
        else if (date_month > 9 && date_day > 9) date = `${date_year}-${date_month}-${date_day}`;
    }
    else {
        if (date_month <= 9 && date_day <= 9) date = `${date_year}-0${date_month}-0${date_day - i}`;
        else if (date_day <= 9) date = `${date_year}-${date_month}-0${date_day - i}`;
        else if (date_month <= 9) date = `${date_year}-0${date_month}-${date_day - i}`;
        else if (date_month > 9 && date_day > 9) date = `${date_year}-${date_month}-${date_day - i}`;
    }
};

function formatMonthDate() {
    if (date_month == 1 || date_month == 3 || date_month == 5 || date_month == 7 || date_month == 8 || date_month == 10 || date_month == 12) {
        if (date_day == 32) {
            date_month++
            date_day = 1;
        }
    }
    else if (date_month == 4 || date_month == 6 || date_month == 9 || date_month == 11) {
        if (date_day == 31) {
            date_month++
            date_day = 1;
        }
    }
    else if (date_month == 2) {
        if (date_year % 4 == 0) {
            if (date_day == 29) {
                date_month++
                date_day = 1;
            }
        }
        else {
            if (date_day == 28) {
                date_month++
                date_day = 1;
            }
        }
    }
}