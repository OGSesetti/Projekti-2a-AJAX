/*
Käytä linkkejä:
http://www.finnkino.fi/xmlLinks to an external site.
http://www.finnkino.fi/xml/Schedule/
http://www.omdbapi.com/Links to an external site. (kuvat?)
https://github.com/public-apis/public-apis?tab=readme-ov-file#anime (saattaa olla hyödyllinen)

Nettisivu, napit muutamalle leffateatterille, pyydä niillä ehdoilla leffan nimi, kuvat?, ja
näytösaika.

Ota selvää voiko kuvat tehdä jotenkin hienosti. (vissiin voi)

kerää data
parse
tallenna arvoihin
funktio:(location numero) etsi location numerolla tapahtumat

*/
//Lataillaan tiedot sijainneista ja tapahtumista
document.addEventListener("DOMContentLoaded", () => {
    const areaURL = "https://www.finnkino.fi/xml/TheatreAreas/";
    const scheduleURL = "https://www.finnkino.fi/xml/Schedule/";
    const scheduleURLArea = "https://www.finnkino.fi/xml/Schedule/?area=";
    const eventURLArea = "https://www.finnkino.fi/xml/Events/";

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
            //etsitään oikea nimi
            if (theatreCellName === theatreName) {
                let theatreID = theatreCell.querySelector("ID").textContent;
                console.log("Selected location ID:", theatreID);
                return theatreID;
            }
        };
        console.log("ID finder failure");
    }

    function eventFetcher(areaID) {
        let fetchURL = scheduleURLArea + areaID;
        fetch(fetchURL)
            .then(response => response.text())
            .then(xmlEventData => {
                const xmlEventDoc = parser.parseFromString(xmlEventData, "text/xml");
                eventList = xmlEventDoc.getElementsByTagName("Show");
                //   console.log(eventList);
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

        //console.log("Data printing failure (lol)");
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


























})