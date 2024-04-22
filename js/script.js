
//Lataillaan tiedot sijainneista
document.addEventListener("DOMContentLoaded", () => {
    const areaURL = "https://www.finnkino.fi/xml/TheatreAreas/";
    //const scheduleURL = "https://www.finnkino.fi/xml/Schedule/";
    const scheduleURLArea = "https://www.finnkino.fi/xml/Schedule/?area=";
    // const eventURLArea = "https://www.finnkino.fi/xml/Events/";

    const parser = new DOMParser();
    const listContainerLocation = document.getElementById("listContainer");
    let locationsList = [];
    let name;
    const menuLocation = document.getElementById("locationMenu");
    let eventList = [];
    let selectedLocationData;
    let selectedTheatre;

    fetch(areaURL)
        .then(response => response.text())
        .then(xmlLocationData => {
            const xmlLocationDoc = parser.parseFromString(xmlLocationData, "text/xml");
            locationsList = xmlLocationDoc.getElementsByTagName("TheatreArea");
        })
        .then(() => {
            menuLoader(locationsList);
            //   console.log(locationsList);
            console.log("Location fetch successful");
        })
        .catch(error => {
            console.error('Error fetching location data', error);
        });


    document.getElementById("locationMenu").addEventListener("change", selector);
    document.getElementById("reset").addEventListener("click", reset);

    function menuLoader(list) {

        for (let i = 0; i < list.length; i++) {
            let variable = list[i];
            menuCreator(variable)
        }
    }
    function menuCreator(variable) {
        const nameElement = variable.querySelector("Name");
        const selectOption = document.createElement("option");

        selectOption.textContent = nameElement.textContent;
        selectOption.value = nameElement.textContent;
        menuLocation.appendChild(selectOption);
    }



    function selector() {
        //ensin tyhjennetään aiemman hakutulokset
        listContainer.innerHTML = "";
        //otetaan valittu teatteri dropdown-menusta ja pyydetään sen ID
        let selectedTheatre = document.getElementById("locationMenu").value;
        console.log("Selected theatre:", selectedTheatre);
        areaID = findID(selectedTheatre);
        console.log("Area ID:", areaID);
        eventFetcher(areaID);
        // dataCollector(areaID);
    }


    function findID(theatreName) {
        for (let i = 0; i < locationsList.length; i++) {
            let theatreCell = locationsList[i];
            let theatreCellName = theatreCell.querySelector("Name").textContent;
            if (theatreCellName === theatreName) {
                let theatreID = theatreCell.querySelector("ID").textContent;
                return theatreID;
            }
        };
        console.log("ID finder failure");
    }

    function eventFetcher(areaID) {
        //tehdään url-osoite joka sisältää areaID:n ja haetaan sen tiedot
        let fetchURL = scheduleURLArea + areaID;
        fetch(fetchURL)
            .then(response => response.text())
            .then(xmlEventData => {
                const xmlEventDoc = parser.parseFromString(xmlEventData, "text/xml");
                eventList = xmlEventDoc.getElementsByTagName("Show");
                console.log("Event fetch successful");
                dataPrinter(eventList, areaID)
            })
            .catch(error => {
                console.error('Error fetching event data', error);
            })
    }

    function dataPrinter(list) {
        //käytetään kerättyä ID:tä ja tulostetaan tietoja element creatorilla
        for (let i = 0; i < list.length; i++) {
            let currentCell = list[i];
            let title = currentCell.querySelector("Title").textContent;
            let location = currentCell.querySelector("TheatreAndAuditorium").textContent;
            let time = currentCell.querySelector("dttmShowStart").textContent;
            elementCreator(title, location, time);
        }
        return null;

    }


    function elementCreator(title, location, time) {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
        const titleDiv = document.createElement("div");
        titleDiv.textContent = title;

        const locationDiv = document.createElement("div");
        locationDiv.textContent = location;

        const timeDiv = document.createElement("div");
        timeDiv.textContent = time;

        // Append title, location, and time divs to the event div
        eventDiv.appendChild(titleDiv);
        eventDiv.appendChild(locationDiv);
        eventDiv.appendChild(timeDiv);

        listContainerLocation.appendChild(eventDiv);
        eventDiv.style.marginTop = "8px";
        eventDiv.style.marginBottom = "8px";

    }
    function reset() {
        //pelkkä sivun refresh. Ei kovin tyylikäs mutta toimii.
        location.reload();
    }

























})