let previousPageUrl = '';
let nextPageUrl = '';

const getTableBody = () => {
    return document.getElementById('characters-information')
}

const getCharacters = async (url) => {
    const response = await fetch(url)
    const json = await response.json()

    nextPageUrl = json.next
    previousPageUrl = json.previous

    if (previousPageUrl === null) {
        document.getElementById('previous-page').setAttribute('disabled', true)
    } else {
        document.getElementById('previous-page').removeAttribute('disabled')
    }

    if (nextPageUrl === null) {
        document.getElementById('next-page').setAttribute('disabled', true)
    } else {
        document.getElementById('next-page').removeAttribute('disabled')
    }

    const characters = json.results
    return characters
}

const setCharacters = characters => {
    const tableBody = getTableBody()
    tableBody.innerHTML = ''
    characters.forEach(character => {
        const tableRow = document.createElement('tr')
        const tableData = document.createElement('td')
        const paragraph = document.createElement('p')
        paragraph.append(document.createTextNode(character.name))
        tableData.append(paragraph)
        tableRow.append(tableData)
        tableBody.append(tableRow)
    })
}

const getAndSetCharacters = async url => {
    const characters = await getCharacters(url);
    setCharacters(characters)
}



window.onload = () => {
    getAndSetCharacters('https://swapi.dev/api/people')

    document.getElementById('next-page').addEventListener('click', () => {
        if (nextPageUrl !== null) {
            getAndSetCharacters(nextPageUrl)
        }

    })

    document.getElementById('previous-page').addEventListener('click', () => {
        if (previousPageUrl !== null) {
            getAndSetCharacters(previousPageUrl)
        }

    })

    document.getElementById('search-button').addEventListener('click', () => {
        const searchInput = document.getElementById('character-search-input')
        const searchUrl = 'https://swapi.dev/api/people/?search=' + searchInput.value
        getAndSetCharacters(searchUrl)
        searchInput.value = ''
    })

}
