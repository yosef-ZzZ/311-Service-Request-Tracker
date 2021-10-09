document.getElementById("search-form").addEventListener("submit", search);

function search(e){
    e.preventDefault();

    let encodedUrl = createUrl();

    fetch(encodedUrl)
        .then(function(result) {
            return result.json();
        })
        .then(function(reports) {
            visibility(reports);
            createTable(reports);
        });
}

function createUrl() {
    let date = document.querySelector('#date').value;
    let service_area = document.querySelector('#service-area').value;
    let service_request = document.querySelector('#service-request').value;
    let ward = document.querySelector("#ward").value;
    let neighbourhood = document.querySelector("#neighbourhood").value;

    let apiUrl = 'https://data.winnipeg.ca/resource/4her-3th5.json?';

    if (date === '' && service_area === '' && service_request === ''
        && ward === '' && neighbourhood === '') {
            apiUrl += '$order=sr_date DESC &$limit=100';
    }
    else {
        apiUrl += '$where=';

        if (date) {
            date = new Date(date).toISOString();
            let fomratedDate = date.substr(0, date.length - 1);

            apiUrl += `date_trunc_ymd(sr_date) = '${fomratedDate}'`;
        }

        if (service_area) {
            if (date)
                apiUrl += ' AND ';

            apiUrl += `lower(service_area) LIKE lower('%${service_area}%')`;
        }
        
        if (service_request) {
            if (service_area || date)
                apiUrl += ' AND ';

            apiUrl += `lower(service_request) LIKE lower('%${service_request}%')`;
        }

        if (ward) {
            if (service_request || service_area || date)
                apiUrl += ' AND ';

            apiUrl += `lower(ward) LIKE lower('%${ward}%')`;
        }

        if (neighbourhood) {
            if (ward || service_request || service_area || date)
                apiUrl += ' AND ';

            apiUrl += `lower(neighbourhood) LIKE lower('%${neighbourhood}%')`;
        }

        apiUrl += '&$order=sr_date DESC &$limit=100';
    }

    // Encode the url
    const encodedUrl = encodeURI(apiUrl);

    return encodedUrl;
}

function createTable(reports) {
    let tBody = document.querySelector('#result-body');

    // reset table
    tBody.innerHTML = "";

    for (let report of reports) {
        let row = document.createElement("tr");
        let dateCol = document.createElement("td");
        let serviceAreaCol = document.createElement("td");
        let serviceRequestCol = document.createElement("td");
        let wardCol = document.createElement("td");
        let neighbourhoodCol = document.createElement("td");

        // format date
        let date = new Date(report.sr_date);
        date = date.toLocaleString('en-ca', {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: 'numeric',
            minute: 'numeric'
        });

        dateCol.textContent = date;
        serviceAreaCol.textContent = report.service_area;
        serviceRequestCol.textContent = report.service_request;
        wardCol.textContent = report.ward;
        neighbourhoodCol.innerHTML = '<a href="http://maps.google.com/maps?z=12&t=m&q=loc:' + report.location_1.latitude + 
                                     '+' + report.location_1.longitude + '" target="_blank" class="link-dark stretched-link">' 
                                     + report.neighbourhood + '</a>';

        row.className = "position-relative";

        row.appendChild(dateCol);
        row.appendChild(serviceAreaCol);
        row.appendChild(serviceRequestCol);
        row.appendChild(wardCol);
        row.appendChild(neighbourhoodCol);

        tBody.appendChild(row);
    }
}

function visibility(reports) {
    let table = document.querySelector("#result-table");
    let errorMsg = document.querySelector('#no-result');

    if (reports.length > 0) {
        table.style.display = "block";
        errorMsg.style.display = "none";
    }
    else {
        table.style.display = "none";
        errorMsg.style.display = "block";
    }
}