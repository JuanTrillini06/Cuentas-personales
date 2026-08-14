// Configuración global para fetch API
const API_URL = 'https://cuentas-personales.onrender.com/api';

// Obtener token
const getToken = () => localStorage.getItem('token');

// Configurar headers
const getAuthHeaders = () => {
    const token = getToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

// Función genérica para fetch
const apiFetch = async (endpoint, options = {}) => {
    const url = `${API_URL}${endpoint}`;
    
    // Solo agregar Content-Type a JSON, no usar con FormData
    let headers = options.headers || {};
    if (!headers['Content-Type'] && options.body && typeof options.body === 'string') {
        headers = { ...headers, ...getAuthHeaders() };
    } else if (options.method === 'GET' || options.method === 'DELETE') {
        headers = { ...headers, ...getAuthHeaders() };
    }
    
    try {
        const response = await fetch(url, { ...options, headers });
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Error en la petición');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
};

// Logout global
const logout = () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
};

// Manejo del tema global
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
};

document.addEventListener('DOMContentLoaded', initTheme);
