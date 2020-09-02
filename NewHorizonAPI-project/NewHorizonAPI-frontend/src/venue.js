class Venue {
    constructor(name, locale, venue_type, comment, show_id) {
        this.name = name;
        this.locale = locale;
        this.venue_type = venue_type;
        this.comment = comment;
        this.show_id = show_id;
    }

    static createVenueSegment(shwJson) {
        let segmentDiv = createSegment("Venues")
        segmentDiv.querySelector('.button').dataset.id = shwJson.id
        segmentDiv.querySelector('.button').addEventListener('click', Venue.renderNewVenueForm)
        let cardsDiv = segmentDiv.querySelector('.cards')
        if (shwJson.venues.length > 0) {
            shwJson.venues.forEach(ven => {
                Venue.addVenueCard(ven, cardsDiv)
            })
            Venue.venueCardEventListeners()
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
        cardsDiv.innerHTML += `<div class="card" data-id="${venue.id}" id="venue-${venue.id}">
          ${Venue.renderCard(venue)}
        </div>`
    }
    static renderCard(venue) {
        return `<div class="content">
      <div class="header">
        ${venue.name}
      </div>
      <div class="description">
        <b>Genre: </b><p id="genre">${venue.locale}</p>
        <b>Venue Type: </b><p id="comment">${venue.venue_type}</p><br>
        <b>Comment: </b><p id="comment">${venue.comment}</p><br>
      </div>
      <div class="extra content">
        <div class="ui two buttons">
          <div class="ui basic blue button" id="edit-artist" data-id="${artist.id}">Edit</div>
          <div class="ui basic red button" id="delete-artist" data-id="${artist.id}">Delete</div>
        </div>
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
            <label>Venue Type *</label>
            <div class="field">
              <input type="text" id="venue_type" placeholder="Venue Type">
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
        let showid = e.currentTarget.dataset.id
        let formInputs = e.currentTarget.parentNode.querySelectorAll('input')
        App.postFetchVenue(formInputs[0].value, formInputs[1].value, formInputs[2].value, formInputs[3].value, showid)
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

    static deleteVenue(venue) {
        let id = venue.currentTarget.dataset.id
        fetch(`http://localhost:3000/venues/${id}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(json => {
                document.getElementById(`venue-${id}`).remove()
            })
    }
}