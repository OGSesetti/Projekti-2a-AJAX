/*
Käytä linkkejä:
http://www.finnkino.fi/xmlLinks to an external site.
http://www.finnkino.fi/xml/Schedule/
http://www.omdbapi.com/Links to an external site. (kuvat?)
https://github.com/public-apis/public-apis?tab=readme-ov-file#anime (saattaa olla hyödyllinen)

Nettisivu, napit muutamalle leffateatterille, pyydä niillä ehdoilla leffan nimi, kuvat?, ja
näytösaika.

Ota selvää voiko kuvat tehdä jotenkin hienosti. (vissiin voi)
*/

document.addEventListener('DOMContentLoaded'), () =>

    async function fetchMoviesAndSchedule(theaterId, date) {
        const params = new URLSearchParams({
            area: theaterId,
            dt: date // Format: dd.mm.yyyy
        });

        const apiUrl = `API_URL/schedule?${params.toString()}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    }