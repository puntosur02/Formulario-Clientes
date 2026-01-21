// Configuración - Reemplaza este valor con tu URL de Web App
const CONFIG = {
    // URL de tu Web App de Google Sheets (obtenida al publicar el script)
    WEBAPP_URL: 'https://script.google.com/macros/s/AKfycby_-iYUO4sndWaeZWhM_tfvzBmiAQhTSzAucCEuXkl-lXt31-zEeI0_tAbfC9uKv2aJUw/exec'
};

// Variables globales
let clientes = [];
let clienteEditando = null;

// Elementos del DOM
const modal = document.getElementById('modalCliente');
const btnNuevoCliente = document.getElementById('btnNuevoCliente');
const btnActualizar = document.getElementById('btnActualizar');
const btnCancelar = document.getElementById('btnCancelar');
const closeModal = document.getElementsByClassName('close')[0];
const formCliente = document.getElementById('formCliente');
const searchInput = document.getElementById('searchInput');
const cuerpoTabla = document.getElementById('cuerpoTabla');
const mensaje = document.getElementById('mensaje');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    cargarClientes();
});

btnNuevoCliente.addEventListener('click', () => {
    abrirModal();
});

btnActualizar.addEventListener('click', () => {
    cargarClientes();
});

closeModal.addEventListener('click', () => {
    cerrarModal();
});

btnCancelar.addEventListener('click', () => {
    cerrarModal();
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        cerrarModal();
    }
});

formCliente.addEventListener('submit', (e) => {
    e.preventDefault();
    guardarCliente();
});

searchInput.addEventListener('input', (e) => {
    filtrarClientes(e.target.value);
});

// Funciones principales
async function cargarClientes() {
    try {
        mostrarCargando();
        
        // Opción 1: Usando Web App (RECOMENDADO)
        const response = await fetch(`${CONFIG.WEBAPP_URL}?action=getAll`);
        
        if (!response.ok) {
            throw new Error('Error al cargar los clientes');
        }
        
        const data = await response.json();
        clientes = data.clientes || [];
        
        mostrarClientes(clientes);
        mostrarMensaje('Clientes cargados correctamente', 'success');
        
    } catch (error) {
        console.error('Error:', error);
        mostrarError();
        mostrarMensaje('Error al cargar clientes. Verifica la configuración.', 'error');
    }
}

async function guardarCliente() {
    const clienteData = {
        nombre: document.getElementById('nombre').value,
        telefono: document.getElementById('telefono').value,
        direccion: document.getElementById('direccion').value,
        localidad: document.getElementById('localidad').value,
        email: document.getElementById('email').value,
        notas: document.getElementById('notas').value
    };

    try {
        const action = clienteEditando ? 'update' : 'add';
        const url = `${CONFIG.WEBAPP_URL}?action=${action}`;
        
        if (clienteEditando) {
            clienteData.id = clienteEditando.id;
        }

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(clienteData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al guardar el cliente');
        }

        const result = await response.json();
        
        if (result.success) {
            cerrarModal();
            cargarClientes();
            mostrarMensaje(
                clienteEditando ? 'Cliente actualizado correctamente' : 'Cliente agregado correctamente',
                'success'
            );
        } else {
            throw new Error(result.message || 'Error al guardar');
        }

    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al guardar el cliente', 'error');
    }
}

async function eliminarCliente(id, nombre) {
    if (!confirm(`¿Estás seguro de eliminar a ${nombre}?`)) {
        return;
    }

    try {
        const response = await fetch(`${CONFIG.WEBAPP_URL}?action=delete`, {
            method: 'POST',
            body: JSON.stringify({ id: id }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el cliente');
        }

        const result = await response.json();
        
        if (result.success) {
            cargarClientes();
            mostrarMensaje('Cliente eliminado correctamente', 'success');
        } else {
            throw new Error(result.message || 'Error al eliminar');
        }

    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al eliminar el cliente', 'error');
    }
}

function editarCliente(cliente) {
    clienteEditando = cliente;
    
    document.getElementById('modalTitulo').textContent = 'Editar Cliente';
    document.getElementById('nombre').value = cliente.nombre;
    document.getElementById('telefono').value = cliente.telefono;
    document.getElementById('direccion').value = cliente.direccion || '';
    document.getElementById('localidad').value = cliente.localidad || '';
    document.getElementById('email').value = cliente.email || '';
    document.getElementById('notas').value = cliente.notas || '';
    
    modal.style.display = 'block';
}

// Funciones de UI
function mostrarClientes(clientesArray) {
    if (clientesArray.length === 0) {
        cuerpoTabla.innerHTML = '<tr><td colspan="7" class="no-data">No hay clientes registrados. ¡Agrega el primero!</td></tr>';
        return;
    }

    cuerpoTabla.innerHTML = clientesArray.map(cliente => `
        <tr>
            <td><strong>${cliente.nombre}</strong></td>
            <td>${cliente.telefono}</td>
            <td>${cliente.direccion || '-'}</td>
            <td>${cliente.localidad || '-'}</td>
            <td>${cliente.email || '-'}</td>
            <td>${cliente.notas || '-'}</td>
            <td>
                <button class="btn btn-small btn-edit" onclick="editarCliente(${JSON.stringify(cliente).replace(/"/g, '&quot;')})">✏️ Editar</button>
                <button class="btn btn-small btn-delete" onclick="eliminarCliente(${cliente.id}, '${cliente.nombre}')">🗑️ Eliminar</button>
            </td>
        </tr>
    `).join('');
}

function filtrarClientes(termino) {
    const terminoLower = termino.toLowerCase();
    const clientesFiltrados = clientes.filter(cliente => 
        cliente.nombre.toLowerCase().includes(terminoLower) ||
        cliente.telefono.includes(terminoLower) ||
        (cliente.direccion && cliente.direccion.toLowerCase().includes(terminoLower)) ||
        (cliente.localidad && cliente.localidad.toLowerCase().includes(terminoLower)) ||
        (cliente.email && cliente.email.toLowerCase().includes(terminoLower))
    );
    mostrarClientes(clientesFiltrados);
}

function abrirModal() {
    clienteEditando = null;
    document.getElementById('modalTitulo').textContent = 'Nuevo Cliente';
    formCliente.reset();
    modal.style.display = 'block';
}

function cerrarModal() {
    modal.style.display = 'none';
    formCliente.reset();
    clienteEditando = null;
}

function mostrarCargando() {
    cuerpoTabla.innerHTML = '<tr><td colspan="7" class="loading">Cargando clientes...</td></tr>';
}

function mostrarError() {
    cuerpoTabla.innerHTML = '<tr><td colspan="7" class="no-data">⚠️ Error al cargar. Verifica la configuración de Google Sheets.</td></tr>';
}

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${tipo}`;
    mensaje.style.display = 'block';
    
    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 3000);
}
