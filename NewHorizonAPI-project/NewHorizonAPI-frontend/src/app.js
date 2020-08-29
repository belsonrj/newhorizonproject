class App {

    static fetchOneEvent(id) {
        return fetch(`${BASE_URL}/events/${id}`)
            .then(response => response.json())
    }

    static fetchOneArtist(id) {
        return fetch(`${BASE_URL}/artists/${id}`)
            .then(response => response.json())
    }

    static fetchOneVenue(id) {
        return fetch(`${BASE_URL}/venues/${id}`)
            .then(response => response.json())
    }

    static postFetchEvent(name, date, img_url, comment) {
        return fetch(`${BASE_URL}/events/`, {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    date: date,
                    img_url: img_url,
                    comment: comment,
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }).then(response => response.json())
            .then(json => {
                Event.renderSideBar(json)
                renderNewEventProfile(json)
            })
        let EventForm = document.getElementById('new-event-form')
        EventForm.innerHTML = ""
    }

    static postFetchArtist(name, genre, comment, trip_id) {
        fetch(`http://localhost:3000/experiences/`, {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    genre: genre,
                    comment: comment,
                    trip_id: trip_id
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }).then(response => response.json())
            .then(json => {
                let cardsDivs = document.querySelectorAll('.cards')
                Artist.addArtistCard(json, cardsDivs[2])
                cardsDivs[2].parentNode.querySelector('#form').innerHTML = ""
                Artist.expCardEventListeners()
            })
    }

    static postFetchVenue(name, locale, venue_type, comment, trip_id) {
        fetch(`http://localhost:3000/tickets/`, {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    locale: locale,
                    venue_type: venue_type,
                    comment: comment,
                    trip_id: trip_id
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }).then(response => response.json())
            .then(json => {
                let cardsDivs = document.querySelectorAll('.cards')
                Venue.addVenueCard(json, cardsDivs[1])
                cardsDivs[1].parentNode.querySelector('#form').innerHTML = ""
                Venue.venueCardEventListeners()
            })
    }

    static patchFetchArtist(id, name, genre, comment) {
        return fetch(`http://localhost:3000/tickets/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                name: name,
                genre: genre,
                comment: comment,
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(response => response.json())
    }

    static async patchFetchArtist(id, name, genre, comment) {
        const response = await fetch(`http://localhost:3000/experiences/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                name: name,
                genre: genre,
                comment: comment
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        return await response.json()
    }

    static eventEditPatch(event) {
        let current = event.currentTarget
        let id = current.dataset.id
        let sideBar = document.getElementById(`sidebar-${id}`)
        let name = document.getElementById('edit-event-name').value
        let start_date = document.getElementById('edit-event-date').value
        let img = document.getElementById('edit-event-url').value
        sideBar.innerText = name
        fetch(`http://localhost:3000/eventss/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    date: date,
                    img_url: img
                })
            }).then(response => response.json())
            .then(json => {
                renderNewEventProfile(json)
            })
    }
}