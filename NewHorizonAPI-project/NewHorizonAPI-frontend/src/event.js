class Event {
    constructor(date) {
        this.name = name;
        this.date = date;
        this.img_url = img_url;
    }

    static renderSideBar(event) {
        let sideBar = document.getElementById('invertedMenu')
        let a = document.createElement('a')
        a.addEventListener('click', renderEventProfile)
        a.classList.add("active", "item")
        sideBar.appendChild(a)
        a.innerText = event.name
        a.dataset.id = event.id
        a.id = `sidebar-${event.id}`
    }

    static newEvent() {
        let eventForm = document.getElementById('new-event-form')
        eventForm.innerHTML = ""
        eventForm.innerHTML = `<form class="ui form">
        <h4 class="ui dividing header">Create A New Event</h4>
        <div class="field">
          <label>Name *</label>
          <div class="one field">
            <div class="field">
              <input type="text" id="new-event-name" placeholder="Event Name">
            </div>
            <label>Date *</label>
            <div class="field">
              <input type="text" id="new-event-date" placeholder="MM/DD/YYYY">
            </div>
            <label>Image URL *</label>
            <div class="field">
              <input type="text" id="new-event-url" placeholder="Image URL">
            </div>
            <div class="ui button" id="new-event-button" tabindex="0">Create Event</div>
            </form>`
        let createButton = document.getElementById('new-event-button')
        createButton.addEventListener('click', this.makeNewEvent)
    }

    static makeNewEvent() {
        let event = document.getElementById('new-event-form')
        let eventName = document.getElementById('new-event-name').value
        let eventDate = document.getElementById('new-event-date').value
        let img_url = document.getElementById('new-event-url').value
        App.postFetchTrip(eventDate, eventName, img_url)
        event.innerHTML = ""
    }
}