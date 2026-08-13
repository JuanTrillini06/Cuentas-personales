if (!getToken()) {
    window.location.href = 'index.html';
}

let accounts = [];
let tags = [];
let chartInstance = null;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const user = await apiFetch('/auth/me', { method: 'GET' });
        document.getElementById('userGreeting').textContent = `Hola, ${user.firstName}!`;
    } catch (e) {
        logout();
    }

    await loadTags();
    await loadAccounts();
    await loadMovements();
    await loadDashboard();

    document.getElementById('accountForm').addEventListener('submit', handleAccountSubmit);
    document.getElementById('tagForm').addEventListener('submit', handleTagSubmit);
    document.getElementById('movementForm').addEventListener('submit', handleMovementSubmit);
});

const openModal = (id) => {
    document.getElementById(id).classList.add('active');
    if (id === 'movementModal') populateMovementSelects();
};

const closeModal = (id) => {
    document.getElementById(id).classList.remove('active');
    if (id === 'accountModal') document.getElementById('accountForm').reset();
    if (id === 'tagModal') document.getElementById('tagForm').reset();
    if (id === 'movementModal') document.getElementById('movementForm').reset();
};

const loadTags = async () => {
    try {
        tags = await apiFetch('/tags', { method: 'GET' });
        const list = document.getElementById('tagsList');
        list.innerHTML = '';
        
        if (tags.length === 0) {
            list.innerHTML = '<p class="text-muted">No tienes etiquetas.</p>';
            return;
        }

        tags.forEach(tag => {
            const el = document.createElement('span');
            el.className = 'badge';
            el.style.backgroundColor = tag.color;
            el.style.color = '#333';
            el.style.fontWeight = 'bold';
            el.innerHTML = `${tag.name} <button onclick="deleteTag('${tag._id}')" style="background:none; border:none; cursor:pointer; font-size:12px; margin-left:5px;">x</button>`;
            list.appendChild(el);
        });
    } catch (e) { console.error(e); }
};

const handleTagSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('tagName').value;
    const color = document.getElementById('tagColor').value;
    try {
        await apiFetch('/tags', {
            method: 'POST',
            body: JSON.stringify({ name, color })
        });
        closeModal('tagModal');
        await loadTags();
    } catch (e) { alert(e.message); }
};

window.deleteTag = async (id) => {
    if (confirm('¿Eliminar etiqueta?')) {
        await apiFetch(`/tags/${id}`, { method: 'DELETE' });
        await loadTags();
    }
};

const loadAccounts = async () => {
    try {
        accounts = await apiFetch('/accounts', { method: 'GET' });
        const list = document.getElementById('accountsList');
        list.innerHTML = '';
        
        if (accounts.length === 0) {
            list.innerHTML = '<p class="text-muted">No tienes cuentas. Crea una para empezar.</p>';
            return;
        }

        accounts.forEach(acc => {
            const el = document.createElement('div');
            el.className = 'list-item';
            el.innerHTML = `
                <div>
                    <strong>${acc.name}</strong> (${acc.bank})<br>
                    <small class="text-muted">${acc.currency}</small>
                </div>
                <div style="text-align:right">
                    <strong>$${acc.balance.toFixed(2)}</strong><br>
                    <button onclick="deleteAccount('${acc._id}')" style="background:none; border:none; color:var(--danger); cursor:pointer;">Eliminar</button>
                </div>
            `;
            list.appendChild(el);
        });
    } catch (e) { console.error(e); }
};

const handleAccountSubmit = async (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById('accName').value,
        bank: document.getElementById('accBank').value,
        currency: document.getElementById('accCurrency').value.toUpperCase(),
        initialBalance: document.getElementById('accInitial').value
    };
    try {
        await apiFetch('/accounts', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        closeModal('accountModal');
        await loadAccounts();
        await loadDashboard(); 
    } catch (e) { alert(e.message); }
};

window.deleteAccount = async (id) => {
    if (confirm('¿Eliminar cuenta? (Los movimientos no se borran solos)')) {
        await apiFetch(`/accounts/${id}`, { method: 'DELETE' });
        await loadAccounts();
        await loadDashboard();
    }
};

const loadMovements = async () => {
    try {
        const movements = await apiFetch('/movements', { method: 'GET' });
        const list = document.getElementById('movementsList');
        list.innerHTML = '';
        
        if (movements.length === 0) {
            list.innerHTML = '<p class="text-muted">No hay movimientos registrados.</p>';
            return;
        }

        movements.forEach(mov => {
            const el = document.createElement('div');
            el.className = 'list-item';
            const isIngreso = mov.type === 'Entrada';
            const color = isIngreso ? 'var(--success)' : 'var(--danger)';
            const sign = isIngreso ? '+' : '-';
            const accName = mov.account ? mov.account.name : 'Cuenta eliminada';
            
            let tagBadge = '';
            if (mov.tags && mov.tags.length > 0) {
                const t = mov.tags[0];
                tagBadge = `<span class="badge" style="background:${t.color}; color:#333">${t.name}</span>`;
            }

            el.innerHTML = `
                <div>
                    <strong>${mov.description}</strong> ${tagBadge}<br>
                    <small class="text-muted">${accName} - ${new Date(mov.date).toLocaleDateString()}</small>
                </div>
                <div style="text-align:right">
                    <strong style="color:${color}">${sign}$${mov.amount.toFixed(2)} ${mov.currency}</strong><br>
                    <button onclick="deleteMovement('${mov._id}')" style="background:none; border:none; color:var(--danger); cursor:pointer;">Eliminar</button>
                </div>
            `;
            list.appendChild(el);
        });
    } catch (e) { console.error(e); }
};

const populateMovementSelects = () => {
    const accSelect = document.getElementById('movAccount');
    accSelect.innerHTML = accounts.map(a => `<option value="${a._id}">${a.name} (${a.currency})</option>`).join('');
    
    const tagSelect = document.getElementById('movTag');
    tagSelect.innerHTML = '<option value="">Sin etiqueta</option>' + 
                          tags.map(t => `<option value="${t._id}">${t.name}</option>`).join('');
};

const handleMovementSubmit = async (e) => {
    e.preventDefault();
    const tagId = document.getElementById('movTag').value;
    const data = {
        account: document.getElementById('movAccount').value,
        type: document.getElementById('movType').value,
        amount: document.getElementById('movAmount').value,
        description: document.getElementById('movDesc').value,
        tags: tagId ? [tagId] : []
    };
    try {
        await apiFetch('/movements', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        closeModal('movementModal');
        await loadAccounts(); 
        await loadMovements();
        await loadDashboard(); 
    } catch (e) { alert(e.message); }
};

window.deleteMovement = async (id) => {
    if (confirm('¿Eliminar movimiento y revertir saldo de la cuenta?')) {
        await apiFetch(`/movements/${id}`, { method: 'DELETE' });
        await loadAccounts();
        await loadMovements();
        await loadDashboard();
    }
};

const loadDashboard = async () => {
    try {
        const data = await apiFetch('/dashboard', { method: 'GET' });
        
        const balancesCont = document.getElementById('balancesContainer');
        balancesCont.innerHTML = '';
        
        const currencies = Object.keys(data.balancesByCurrency);
        if (currencies.length === 0) {
            balancesCont.innerHTML = '<p class="text-muted">No hay saldo.</p>';
        } else {
            currencies.forEach(curr => {
                const el = document.createElement('h2');
                el.style.marginBottom = '10px';
                el.innerHTML = `${curr}: $${data.balancesByCurrency[curr].toFixed(2)}`;
                balancesCont.appendChild(el);
            });
        }

        renderChart(data.expensesByCategory);

    } catch (e) { console.error(e); }
};

const renderChart = (expensesObj) => {
    const labels = [];
    const amounts = [];
    const bgColors = [];

    Object.keys(expensesObj).forEach(currency => {
        Object.keys(expensesObj[currency]).forEach(tag => {
            labels.push(`${tag} (${currency})`);
            amounts.push(expensesObj[currency][tag].amount);
            bgColors.push(expensesObj[currency][tag].color);
        });
    });

    const ctx = document.getElementById('expensesChart').getContext('2d');
    
    if (chartInstance) {
        chartInstance.destroy();
    }

    if (amounts.length === 0) {
        chartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Sin Gastos'],
                datasets: [{ data: [1], backgroundColor: ['#e0e0e0'] }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
        return;
    }

    chartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: amounts,
                backgroundColor: bgColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right' }
            }
        }
    });
};
