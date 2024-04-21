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
document.addEventListener('DOMContentLoaded', () => {
    const locations = 'https://www.finnkino.fi/xml/TheatreAreas/';
    const events = 'https://www.finnkino.fi/xml/Schedule/';
    const parser = new DOMParser();
    const listLocation = document.getElementById("listContainer");
    let locationsList;
    let name;
    const menuLocation = document.getElementById("locationMenu");



    fetch(locations)
        .then(response => response.text())
        .then(xmlData => {
            const xmlDoc = parser.parseFromString(xmlData, "text/xml");
            locationsList = xmlDoc.getElementsByTagName("TheatreArea");
        })


        .then(() => {

            menuLoader(locationsList);
            console.log("Location fetch successful");
        })


        .catch(error => {
            console.error('Error fetching data', error);
        });

    fetch(events)
        .then(response => response.text())
        .then(xmlData => {
            const eventsList = parser.parseFromString(xmlData, "text/xml").getElementsByTagName("Show");
            console.log("Event fetch successful");
        })
        .catch(error => {
            console.error('Error fetching data', error);
        })




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

    function locationSelected() {
        const selectedLocation = document.getElementById("locationMenu").value;
        const selectedLocationData = findLocationData(selectedLocation);
        if (selectedLocationData) {
            console.log("Valittu sijainti:", selectedLocationData);
        } else {
            console.error("Sijainnin tietoja ei löytynyt:", selectedLocation);
        }
    }

    function findLocationData(locationName) {
        // Käy läpi eventList ja etsi sijainti sen nimen perusteella
        // Palauta sijainnin tiedot, jos se löytyy, muuten palauta null
        for (let i = 0; i < eventList.length; i++) {
            const eventData = eventList[i];
            if (eventData.location === locationName) {
                return eventData;
            }
        }
        return null; // Sijaintia ei löytynyt eventLististä
    }



    function elementLoader(list) {

        for (let i = 0; i < list.length; i++) {
            let variable = list[i];
            elementCreator(variable)
        }
    }

    function elementCreator(variable) {
        let newElement = document.createElement("div");
        const nameElement = variable.querySelector("Name");
        newElement.textContent = nameElement.textContent;
        newElement.classList.add("Location");

        let checkButton = document.createElement("button");
        checkButton.textContent = "Valitse";
        checkButton.classList.add("check-button");
        //checkButton.addEventListener("click", function () {
        //checkButton.classList.toggle("checked");
        //  task.done = !task.done;
        // localStorage.setItem("tasks", JSON.stringify(tasksArray));

        listLocation.appendChild(checkButton);
        listLocation.appendChild(newElement);
    }









































})