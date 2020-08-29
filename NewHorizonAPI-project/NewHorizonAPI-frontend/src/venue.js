class Venue {

    static createVenueSegment(tripJson) {
        let segmentDiv = createSegment("Venues")
        segmentDiv.querySelector('.button').dataset.id = tripJson.id
        segmentDiv.querySelector('.button').addEventListener('click', Venue.renderNewVenueForm)
        let cardsDiv = segmentDiv.querySelector('.cards')
        if (tripJson.experiences.length > 0) {
            tripJson.venues.forEach(x => {
                Venue.addVenueCard(x, cardsDiv)
            })
            document.querySelectorAll('#edit-venue').forEach(editButton => {
                editButton.addEventListener('click', Venue.renderEditForm)
            })
            document.querySelectorAll('#delete-venue').forEach(deleteButton => {
                deleteButton.addEventListener('click', Venue.deleteVenue)
            })
        }
    }

    static venueCardEventListeners() {
        document.querySelectorAll('#edit-venue').forEach(editButton => {
            editButton.addEventListener('click', Venue.renderEditForm)
        })
        document.querySelectorAll('#delete-venue').forEach(deleteButton => {
            deleteButton.addEventListener('click', Venue.deleteVenue)
        })
    }

    static addVenueCard(venue, cardsDiv) {
        cardsDiv.innerHTML += `<div class="card" data-id="${venue.id}" id="exp-${venue.id}">
          ${Experience.renderCard(venue)}
        </div>`
    }
    static renderCard(venue) {
        return `<div class="content">
          <div class="header" id="name">${venue.name}</div>
          <div class="meta" id="locale">${venue.locale}</div>
          <div class="meta" id="venue_type">${venue.venue_type}</div>
          <div class="meta" id="comment">${venue.comment}</div>
        </div>
        <div class="extra content">
          <div class="ui two buttons">
            <div class="ui basic blue button" id="edit-experience" data-id="${exp.id}">Edit</div>
            <div class="ui basic red button" id="delete-experience" data-id="${exp.id}">Delete</div>
          </div>
        </div>`
    }

    static renderNewVenueForm(e) {
        let form = e.currentTarget.parentNode.querySelector('#form')
        let id = e.currentTarget.dataset.id
        form.innerHTML = ""
        form.innerHTML = `<form class="ui form">
        <h4 class="ui dividing header">New Venue</h4>
        <div class="field">
          <div class="one field">
            <label>Name *</label>
            <div class="field">
              <input type="text" id="name" placeholder="Venue Name">
            </div>
            <label>Locale *</label>
            <div class="field">
              <input type="text" id="locale" placeholder="Locale">
            </div>
            <label>Comments?</label>
            <div class="field">
              <input type="text" id="relevant-info" placeholder="Comments">
            </div>
            <div class="ui button" id="new-venue-submit" data-id="${id}" tabindex="0">Submit</div>
            </form>`

        let createButton = document.getElementById('new-venue-submit')
        createButton.addEventListener('click', Venue.createNewVenue)
    }

    static createNewVenue(e) {
        let eventid = e.currentTarget.dataset.id
        let formInputs = e.currentTarget.parentNode.querySelectorAll('input')
        App.postFetchVenue(formInputs[0].value, formInputs[1].value, formInputs[2].value, formInputs[3].value, tripid)
    }

    static renderEditForm(e) {
        let id = e.currentTarget.dataset.id
        let venue
        let form = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('#form')
        App.fetchOneVenue(id).then(json => {
            venue = json
            form.innerHTML = `<form class="ui form">
        <h4 class="ui dividing header">Edit This Venue</h4>
        <div class="field">
          <div class="one field">
            <label>Name *</label>
            <div class="field">
              <input type="text" id="name" value="${venue.name}">
            </div>
            <label>Locale *</label>
            <div class="field">
              <input type="text" id="date" value="${venue.locale}">
            </div>
            <label>Venue Type *</label>
            <div class="field">
              <input type="text" id="venue_type" value="${venue.venue_type}">
            </div>
            <label>Venue Comments </label>
            <div class="field">
              <input type="text" id="comment" value="${venue.comment}">
            </div>
            <div class="ui button" id="submit-edit-venue" data-id="${venue.id}" tabindex="0">Submit</div>
            </form>`

            let editButton = document.getElementById('submit-edit-venue')
            editButton.addEventListener('click', Venue.updateVenue)
        })
    }

    static updateVenue(e) {
        let id = e.currentTarget.dataset.id
        let formInputs = e.currentTarget.parentNode.querySelectorAll('input')
        let cards = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.querySelectorAll('.card')
        let formDiv = e.currentTarget.parentNode.parentNode.parentNode.parentNode
        App.patchFetchVenue(id, formInputs[0].value, formInputs[1].value, formInputs[2].value, formInputs[3].value).then(json => {
            cards.forEach(card => {
                if (card.dataset.id == id) {
                    card.innerHTML = Venue.renderCard(json)
                    card.querySelector('#edit-venue').addEventListener('click', Venue.renderEditForm)
                    card.querySelector('#delete-venue').addEventListener('click', Venue.deleteVenue)
                }
            })
            formDiv.innerHTML = ""
        })
    }

    static deleteVenue(event) {
        let id = event.currentTarget.dataset.id
        fetch(`http://localhost:3000/venues/${id}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(json => {
                document.getElementById(`venue-${id}`).remove()
            })
    }
}