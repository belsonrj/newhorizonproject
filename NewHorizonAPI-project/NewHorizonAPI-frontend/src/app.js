class App {

    static fetchOneShow(id) {
        return fetch(`${BASE_URL}/shows/${id}`)
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

    static postFetchShow(name, date, comment, img_url) {
        let ShowForm = document.getElementById('new-show-form')
        ShowForm.innerHTML = ""
        return fetch(`${BASE_URL}/shows/`, {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    date: date,
                    comment: comment,
                    img_url: img_url
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }).then(response => response.json())
            .then(json => {
                Show.renderSideBar(json)
                renderNewShowProfile(json)
            })
    }

    static postFetchArtist(name, genre, comment, show_id) {
        fetch(`http://[::1]:3000/artists`, {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    genre: genre,
                    comment: comment,
                    show_id: show_id
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }).then(response => response.json())
            .then(json => {
                let cardsDivs = document.querySelectorAll('.cards')
                Artist.addArtistCard(json, cardsDivs[0])
                cardsDivs[0].parentNode.querySelector('#form').innerHTML = ""
                Artist.artistCardEventListeners()
            })
    }

    static postFetchVenue(name, locale, venue_type, comment, show_id) {
        fetch(`http://[::1]:3000/venues/`, {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    locale: locale,
                    venue_type: venue_type,
                    comment: comment,
                    show_id: show_id
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

    static async patchFetchArtist(id, name, genre, comment) {
        const response = await fetch(`http://[::1]:3000/artists/${id}`, {
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
        })
        return await response.json()
    }

    static async patchFetchArtist(id, name, genre, comment) {
        const response = await fetch(`http://[::1]:3000/artists/${id}`, {
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

    static showEditPatch(event) {
        let current = event.currentTarget
        let id = current.dataset.id
        let sideBar = document.getElementById(`sidebar-${id}`)
        let name = document.getElementById('edit-show-name').value
        let date = document.getElementById('edit-show-date').value
        let comment = document.getElementById('edit-show-comment').value
        let img = document.getElementById('edit-show-url').value
        sideBar.innerText = name
        fetch(`http://[::1]:3000/shows/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    date: date,
                    comment: comment,
                    img_url: img
                })
            }).then(response => response.json())
            .then(json => {
                renderNewShowProfile(json)
            })
    }
}