const jsonphlist = document.querySelector(".jsonphlist");

async function getUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        console.error('There was a problem with fetchin the data:', error);
    }
}

function makeCards(users) {
    users.forEach(user => {
        jsonphlist.innerHTML += `<li>${user.name} - ${user.email}</li>`
    });
}

async function displayCards() {
    const data = await getUsers();
    makeCards(data);
}

displayCards();