let date = new Date();
let date_year = date.getFullYear();
let date_month = date.getMonth() + 1;
let date_day = date.getDate();

formatMonthDate();
formatDate();
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

    /* TIMEZONES AHEAD + UNAVAILABLE DATES FIX */
    if (data.code == 400) {
        console.log(`• Called from function "sendAPIRequest()" - ERROR: ${date}`);
        date = date_latest;
        console.log(`• Called from function "sendAPIRequest()" - FIX: ${date}`);
        response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}&concept_tags=True`);
        console.log(response);
        data = await response.json();
        console.log(data);
    }

    useAPIData(data); 
}

function useAPIData(data) {
    document.querySelector("#apod-date").innerHTML = `<h2 class="zoom-300">${data.date}</h2>`;
    document.querySelector("#apod-image").innerHTML = `<img src="${data.url}" width="50%" height="100%">`;
    document.querySelector("#apod-title").innerHTML = `<p class="zoom-200 fw-bold text-decoration-underline">${data.title}</p>`;
    document.querySelector("#apod-explanation").innerHTML = `<p class="zoom-200">${data.explanation}</p>`;
    document.querySelector("#apod-copyright").innerHTML = `<p class="zoom-200"><span class="fw-bold">Copyright:</span> ${data.copyright}</p>`;
}

function inputDate() {
    date = prompt("Enter date (YYYY-MM-DD):");
    sendAPIRequest(date);
}

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

function formatDate() {
    if (date_month <= 9 && date_day <= 9) date = `${date_year}-0${date_month}-0${date_day}`;
    else if (date_day <= 9) date = `${date_year}-${date_month}-0${date_day}`;
    else if (date_month <= 9) date = `${date_year}-0${date_month}-${date_day}`;
    else if (date_month > 9 && date_day > 9) date = `${date_year}-${date_month}-${date_day}`;
};