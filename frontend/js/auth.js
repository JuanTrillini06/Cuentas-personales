document.addEventListener('DOMContentLoaded', () => {
    // Si ya hay token, redirigir al dashboard
    if (localStorage.getItem('token')) {
        window.location.href = 'dashboard.html';
        return;
    }

    const loginCard = document.getElementById('loginCard');
    const registerCard = document.getElementById('registerCard');
    
    document.getElementById('showRegister').addEventListener('click', (e) => {
        e.preventDefault();
        loginCard.style.display = 'none';
        registerCard.style.display = 'block';
    });

    document.getElementById('showLogin').addEventListener('click', (e) => {
        e.preventDefault();
        registerCard.style.display = 'none';
        loginCard.style.display = 'block';
    });

    // Login logic
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            loginError.style.display = 'none';
            const data = await apiFetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            
            localStorage.setItem('token', data.token);
            window.location.href = 'dashboard.html';
        } catch (error) {
            loginError.textContent = error.message;
            loginError.style.display = 'block';
        }
    });

    // Register logic
    const registerForm = document.getElementById('registerForm');
    const regError = document.getElementById('regError');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const firstName = document.getElementById('regFirstName').value;
        const lastName = document.getElementById('regLastName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        try {
            regError.style.display = 'none';
            const data = await apiFetch('/auth/register', {
                method: 'POST',
                body: JSON.stringify({ firstName, lastName, email, password, timezone })
            });
            
            localStorage.setItem('token', data.token);
            window.location.href = 'dashboard.html';
        } catch (error) {
            regError.textContent = error.message;
            regError.style.display = 'block';
        }
    });
});
