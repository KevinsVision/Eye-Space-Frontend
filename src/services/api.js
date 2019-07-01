const baseUrl = 'http://localhost:3000'
const signinUrl = baseUrl + '/signin'
const signupUrl = baseUrl + '/signup'

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
    }).then(resp => resp.json());
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

window.getPlanets = getAllPlanets
//   fetch("http://localhost:4000/planets").then(resp => resp.json()).then(planets => this.setState({planets: planets}));

// export default { signin, validate, getuserplanets, signup };