let BASE_URL = 'http://[::1]:3000';
let home = document.getElementById('homeButton')
let addShow = document.getElementById('new-show')
let alphaShow = document.getElementById('alpha-show')

document.addEventListener('DOMContentLoaded', init)

function init() {
    fetchShows()
    addShow.addEventListener('click', createNewShow);
    home.addEventListener('click', wipeShowInfo);
    alphaShow.addEventListener('click', newAlphashow);
}

function newAlphashow() {
    var BASE_URL = 'http://[::1]:3000';
    let showInfoContainer = document.getElementById('invertedMenu')
    showInfoContainer.innerHTML = ""
    fetch(`${BASE_URL}/shows`)
        .then(response => response.json())
        .then(json => {
            json.sort(function(a, b) {
                var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            });
            for (let show of json) {
                Show.renderSideBar(show)
            }
        })

}

function createNewShow() {
    Show.newShow()
}

async function fetchShows() {
    const showData = await App.getAllShows();
    showData.forEach((show) => {
        show = new Show(show);
        //debugger
        Show.renderSideBar(show);
    });

}

//function fetchShows() {
//    var BASE_URL = 'http://[::1]:3000';
//    fetch(`${BASE_URL}/shows`)
//        .then(response => response.json())
//        .then(json => {

//            for (let show of json) {
//                Show.renderSideBar(show)
//            }
//        })
//}


function renderShowProfile(event) {
    let id = event.currentTarget.dataset.id
        //const app = new Show(id)
    App.fetchOneShow(id).then(showJson => {
        renderNewShowProfile(showJson)
    })
}

function createSegment(name) {
    let columnDiv = document.querySelector('.twelve')
    let segmentDiv = document.createElement('div')
    let labelDiv = document.createElement('div')
    let addButtonDiv = document.createElement('div')
    let cardsDiv = document.createElement('div')
    let formDiv = document.createElement('div')

    segmentDiv.classList.add("ui", "segment")
    labelDiv.classList.add("ui", "top", "attached", "label")
    addButtonDiv.classList.add("ui", "blue", "button")
    cardsDiv.classList.add("ui", "cards")

    formDiv.id = "form"

    addButtonDiv.innerText = "Add New"
    labelDiv.innerText = name

    columnDiv.appendChild(segmentDiv)
    segmentDiv.append(labelDiv, addButtonDiv, formDiv, cardsDiv)

    return segmentDiv
}

function renderNewShowProfile(showJson) {
    Show.renderShowSegment(showJson)
    Artist.createArtistSegment(showJson)
    Venue.createVenueSegment(showJson)
}

function wipeShowInfo() {
    let showInfoContainer = document.getElementById('twelve')
    showInfoContainer.innerHTML = ""
}