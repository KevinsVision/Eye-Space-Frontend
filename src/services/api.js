const baseUrl = 'http://localhost:3000'
const signinUrl = baseUrl + '/signin'
const signupUrl = baseUrl + '/signup'
const allRenamedPlanetsUrl = baseUrl + '/rename_planets'
const newUserPlanetURL = baseUrl + '/user_planets'

export function signin (username, password) {
	return fetch(signinUrl, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    }).then(resp => resp.json())
}

export function validate () {
    return fetch('http://localhost:3000/validate', {
	    headers: { 'Authorization': localStorage.token }
    }).then(resp => resp.json())
}

export function signup(username, password) {
    return fetch(signupUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    }).then(resp => resp.json())
}

export function getUserPlanets () {
    return fetch('http://localhost:3000/user_planets', {
        headers: { 'Authorization': localStorage.token }
    }).then(resp => resp.json())
}

export function getAllPlanets () {
    return fetch('http://localhost:3000/planets', {
        headers: { 'Authorization': localStorage.token }
    }).then(resp => resp.json())
}

export function createUserPlanet( planetId ) {
    return fetch(newUserPlanetURL, {
        method: "POST",
        headers: { "Content-Type": "application/json", 'Authorization': localStorage.token },
        body: JSON.stringify({ planetId })
    }).then(resp => resp.json())
}

export function getAllRenamedPlanets () {
    return fetch(allRenamedPlanetsUrl, {
        headers: { 'Authorization': localStorage.token }
    }).then(resp => resp.json())
}

export function createRenamedPlanet( planetId ) {
    return fetch(allRenamedPlanetsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", 'Authorization': localStorage.token },
        body: JSON.stringify({ planetId })
    }).then(resp => resp.json())
}

window.getPlanets = createUserPlanet