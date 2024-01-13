document.addEventListener('DOMContentLoaded', function () {
    fetchPrenotations();
    fetchMessages();
});

function fetchPrenotations() {
    fetch('../php/fetch_prenotations.php') 
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error:', data.error);
        } else {
            populateTable(data);
        }
    }).catch(error => {
        console.error('Error:', error);
    });
}


function populateTable(prenotations) {
    const tableBody = document.getElementById('prenotations-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    prenotations.forEach(prenotation => {
        let row = tableBody.insertRow();
        row.insertCell(0).textContent = prenotation.data;
        row.insertCell(1).textContent = prenotation.ora;
        row.insertCell(2).textContent = prenotation.attivita; 
        row.insertCell(3).textContent = prenotation.campo;
        row.insertCell(4).textContent = prenotation.utente;
    });
}

function fetchMessages() {
    fetch('../php/admin.php')
    .then(response => response.json())
    .then(messages => {
        if (messages.error) {
            console.error('Errore:', messages.error);
        } else {
            displayMessages(messages);
        }
    }).catch(error => {
        console.error('Errore:', error);
    });
}

function displayMessages(messages) {
    const container = document.createElement('div');
    container.className = 'messages-container';

    messages.forEach(message => {
        let messageBox = document.createElement('div');
        messageBox.className = 'message-box';

        let title = document.createElement('h3');
        title.className = 'message-title';
        title.textContent = message.titolo;

        let name = document.createElement('p');
        name.className = 'message-name';
        name.textContent = `Nome: ${message.nome}`; 

        let email = document.createElement('p');
        email.className = 'message-email';
        email.textContent = `Email: ${message.email}`; 

        let content = document.createElement('p');
        content.className = 'message-content';
        content.textContent = message.testo;

        messageBox.appendChild(title);
        messageBox.appendChild(name);
        messageBox.appendChild(email);
        messageBox.appendChild(content);

        container.appendChild(messageBox);
    });

    const section = document.getElementById('messaggi-utenti');
    section.innerHTML = '';
    section.appendChild(container);
}