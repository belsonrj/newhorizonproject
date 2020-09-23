class Show {

    static allShows = []

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.date = data.date;
        this.comment = data.comment;
        this.img_url = data.img_url;
        Show.allShows.push(this)
        this.renderSideBar(this)
    }

    renderSideBar(show) {
        let sideBar = document.getElementById('invertedMenu')
        let a = document.createElement('a')
        a.addEventListener('click', renderShowProfile)
        a.classList.add("active", "item")
        sideBar.appendChild(a)
        a.innerText = show.name
        a.dataset.id = show.id
        a.id = `sidebar-${show.id}`
    }

    static newShow() {
        let showForm = document.getElementById('new-show-form')
        showForm.innerHTML = ""
        showForm.innerHTML = `<form class="ui form">
        <h4 class="ui dividing header">Create A New Event</h4>
        <div class="field">
          <label>Name *</label>
          <div class="one field">
            <div class="field">
              <input type="text" id="new-show-name" placeholder="Event Name">
            </div>
            <label>Date *</label>
            <div class="field">
              <input type="text" id="new-show-date" placeholder="MM/DD/YYYY">
              <label>Comment *</label>
              <div class="field">
                <input type="text" id="new-show-comment" placeholder="Comment">
              </div>
            </div>
            <label>Image URL *</label>
            <div class="field">
              <input type="text" id="new-show-url" placeholder="Image URL">
            </div>
            <div class="ui button" id="new-show-button" tabindex="0">Create Event</div>
            </form>`
        let createButton = document.getElementById('new-show-button')
        createButton.addEventListener('click', this.makeNewShow)
    }

    static makeNewShow() {
        let show = document.getElementById('new-show-form')
        let showName = document.getElementById('new-show-name').value
        let showDate = document.getElementById('new-show-date').value
        let showComment = document.getElementById('new-show-comment').value
        let img_url = document.getElementById('new-show-url').value
        App.postFetchShow(showName, showDate, showComment, img_url)
        show.innerHTML = ""
    }

    static renderShowSegment(showJson) {
        let container = document.getElementById('twelve')
        container.innerHTML = ""
        this.createShowSegment(showJson.id)
        let show_info = document.getElementById('show-description')
        let showDetails = document.createElement('div')
        let imgDiv = document.createElement('div')
        let img = document.createElement('img')
        let b = document.createElement('b')
        let b2 = document.createElement('b')
        let b3 = document.createElement('b')
        let p = document.createElement('p')
        let p2 = document.createElement('p')
        let p3 = document.createElement('p')
        img.className = 'show_img'
        imgDiv.classList.add("four", "wide", "column")
        showDetails.classList.add("four", "wide", "column")
        show_info.append(showDetails, imgDiv)
        showDetails.append(b, p, b2, p2, b3, p3)
        imgDiv.appendChild(img)
        img.src = showJson.img_url
        b.innerText = 'Event Name:'
        b2.innerText = 'Date:'
        b3.innerText = 'Comments:'
        p.innerText = showJson.name
        p2.innerText = showJson.date
        p3.innerText = showJson.comment
        img.id = 'show-img'
        p.id = 'show-name'
        p2.id = 'show-date'
        p3.id = 'show-comment'

    }

    static createShowSegment(id) {
        let segmentsDiv = document.querySelector('.twelve')
        let div = document.createElement('div')
        let div1 = document.createElement('div')
        let div2 = document.createElement('div')
        let div3 = document.createElement('div')
        let div4 = document.createElement('div')
        let div5 = document.createElement('div')
        let div6 = document.createElement('div')

        segmentsDiv.appendChild(div)
        div.append(div1, div2, div3, )
        div2.appendChild(div6)
        div3.append(div4, div5)
        div.classList.add("ui", "segment")
        div1.classList.add("ui", "top", "attached", "label")
        div2.classList.add("ui", "grid", "trip-description")
        div3.classList.add("ui", "two", "buttons")
        div4.classList.add("ui", "basic", "blue", "button")
        div5.classList.add("ui", "basic", "red", "button")

        div2.id = "show-description"
        div4.id = "edit-show"
        div5.id = "delete-show"
        div6.id = "edit-show-form"
        div1.innerText = "Event Details"
        div4.innerText = "Edit"
        div5.innerText = "Delete"

        let eButton = document.getElementById('edit-show')
        eButton.dataset.id = id
        eButton.onclick = Show.editShow
        let dButton = document.getElementById('delete-show')
        dButton.dataset.id = id
        dButton.onclick = this.deleteShow
    }

    static editShow(show) {
        let id = show.currentTarget.dataset.id
        let changeShow = document.getElementById('edit-show-form')
        changeShow.innerHTML = `<form class="ui form">
      <h4 class="ui dividing header">Edit Event</h4>
      <div class="field">
        <label>Name *</label>
        <div class="one field">
          <div class="field">
            <input type="text" id="edit-show-name" placeholder="Event Name">
          </div>
          <label>Date *</label>
          <div class="field">
            <input type="text" id="edit-show-date" placeholder="MM/DD/YYYY">
          </div>
          <label>Comments? *</label>
          <div class="field">
            <input type="text" id="edit-show-comment" placeholder="Comments">
          </div>
          <label>Image URL *</label>
          <div class="field">
            <input type="text" id="edit-show-url" placeholder="Event URL">
          </div>
          <div class="ui button" id="edit-show-button" tabindex="0">Edit Event</div>
          </form>`
        let currentName = document.getElementById('show-name').innerText
        let currentDate = document.getElementById('show-date').innerText
        let currentComment = document.getElementById('show-comment').innerText
        let currentImg = document.getElementById('show-img').src
        document.getElementById('edit-show-name').value = currentName
        document.getElementById('edit-show-date').value = currentDate
        document.getElementById('edit-show-comment').value = currentComment
        document.getElementById('edit-show-url').value = currentImg
            //debugger
        let editShowForm = document.getElementById('edit-show-button')
        editShowForm.dataset.id = id
        editShowForm.addEventListener('click', App.showEditPatch)
    }
    static deleteShow(show) {
        let id = show.currentTarget.dataset.id
        fetch(`http://[::1]:3000/shows/${id}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(json => {
                let showInfo = document.getElementById('twelve')
                let sideInfo = document.getElementById('invertedMenu')
                showInfo.innerHTML = ""
                let sideShow = document.querySelector(`#sidebar-${id}`)
                sideInfo.removeChild(sideShow)
            })
    }
}