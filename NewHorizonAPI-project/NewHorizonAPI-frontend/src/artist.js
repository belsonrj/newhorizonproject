class Artist {
    constructor(name, genre, comment, show_id) {
        this.name = name;
        this.genre = genre;
        this.comment = comment;
        this.show_id = show_id;
    }

    static createArtistSegment(showJson) {
        let segmentDiv = createSegment("Artists")
        let cardsDiv = segmentDiv.querySelector('.cards')
        segmentDiv.querySelector('.button').dataset.id = showJson.id
        segmentDiv.querySelector('.button').addEventListener('click', Artist.renderNewArtistForm)
            //debugger
        if (showJson.artists.length > 0) {
            showJson.artists.forEach(artist => {
                Artist.addArtistCard(artist, cardsDiv)
            })
            Artist.artistCardEventListeners()
        }
    }

    static artistCardEventListeners() {
        document.querySelectorAll('#edit-artist').forEach(editButton => {
            editButton.addEventListener('click', Artist.renderEditForm)
        })
        document.querySelectorAll('#delete-artist').forEach(deleteButton => {
            deleteButton.addEventListener('click', Artist.deleteArtist)
        })
    }

    static addArtistCard(artist, cardsDiv) {
        cardsDiv.innerHTML += `<div class="card" data-id="${artist.id}" id="artist-${artist.id}">
          ${Artist.renderCard(artist)}
        </div>`
    }

    static renderCard(artist) {
        return `<div class="content">
          <div class="header">
            ${artist.name}
          </div>
          <div class="description">
            <b>Genre: </b><p id="genre">${artist.genre}</p>
            <b>Comments: </b><p id="comment">${artist.comment}</p><br>
          </div>
          <div class="extra content">
            <div class="ui two buttons">
              <div class="ui basic blue button" id="edit-artist" data-id="${artist.id}">Edit</div>
              <div class="ui basic red button" id="delete-artist" data-id="${artist.id}">Delete</div>
            </div>
          </div>
        </div>`
    }

    static renderNewArtistForm(e) {
        let form = e.currentTarget.parentNode.querySelector('#form')
        let id = e.currentTarget.dataset.id
        form.innerHTML = ""
        form.innerHTML = `<form class="ui form">
        <h4 class="ui dividing header">New Artist</h4>
        <div class="field">
          <div class="one field">
            <label>Type *</label>
            <div class="field">
              <input type="text" id="name" placeholder="Name">
            </div>
            <label>Genre *</label>
            <div class="field">
              <input type="text" id="genre" placeholder="Genre">
            </div>
            <label>Comments?</label>
            <div class="field">
              <input type="text" id="comment" placeholder="Comments">
            </div>
            <div class="ui button" id="new-artist-submit" data-id="${id}" tabindex="0">Submit</div>
            </form>`

        let createButton = document.getElementById('new-artist-submit')
        createButton.addEventListener('click', Artist.createNewArtist)
    }

    static createNewArtist(e) {
        let showid = e.currentTarget.dataset.id
        let formInputs = e.currentTarget.parentNode.querySelectorAll('input')
            //debugger
        App.postFetchArtist(formInputs[0].value, formInputs[1].value, formInputs[2].value, showid)
    }

    static renderEditForm(e) {
        let id = e.currentTarget.dataset.id
        let artist
        let form = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('#form')
            //debugger
        App.fetchOneArtist(id).then(json => {
            artist = json
            form.innerHTML = `<form class="ui form">
        <h4 class="ui dividing header">Edit This Artist</h4>
        <div class="field">
          <div class="one field">
          <label>Name *</label>
          <div class="field">
            <input type="text" id="name" value="${artist.name}">
          </div>
          <label>Genre *</label>
          <div class="field">
            <input type="text" id="genre" value="${artist.genre}">
          </div>
          <label>Comment?</label>
          <div class="field">
            <input type="text" id="comment" value="${artist.comment}">
          </div>
          <div class="ui button" id="submit-edit-artist" data-id="${artist.id}" tabindex="0">Submit</div>
            </form>`

            let editButton = document.getElementById('submit-edit-artist')
            editButton.addEventListener('click', Artist.updateArtist)
        })
    }

    static updateArtist(e) {
        let id = e.currentTarget.dataset.id
        let formInputs = e.currentTarget.parentNode.querySelectorAll('input')
        let cards = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.querySelectorAll('.card')
        let formDiv = e.currentTarget.parentNode.parentNode.parentNode.parentNode
        App.patchFetchArtist(id, formInputs[0].value, formInputs[1].value, formInputs[2].value).then(json => {
            cards.forEach(card => {
                if (card.dataset.id == id) {
                    card.innerHTML = Artist.renderCard(json)
                    card.querySelector('#edit-artist').addEventListener('click', Artist.renderEditForm)
                    card.querySelector('#delete-artist').addEventListener('click', Artist.deleteArtist)
                }
            })
            formDiv.innerHTML = ""
        })
    }

    static deleteArtist(e) {
        let id = e.currentTarget.dataset.id
        fetch(`http://localhost:3000/artists/${id}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(json => {
                document.getElementById(`artist-${id}`).remove()
            })
    }
}