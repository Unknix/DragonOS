window.onload = function () {
    document.getElementById('login-screen').style.transform = 'scale(1)';
};

function handleLogin() {
    const pseudo = document.getElementById('pseudo').value;

    if (pseudo) {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pseudo })
        })
            .then(response => {
                if (response.ok) {
                    window.location.href = '/';
                } else {
                    document.getElementById('error-message').style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Erreur:', error);
                document.getElementById('error-message').style.display = 'block';
            });
    } else {
        alert('Veuillez entrer un pseudo');
    }
}

document.getElementById('login-button').addEventListener('click', handleLogin);

document.getElementById('pseudo').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        handleLogin();
    }
});
