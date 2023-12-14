const premiosTable = document.getElementById('premios-table');
const alertContainer = document.getElementById('alert-container');
const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const codigoInput = document.getElementById('codigo');
    const codigo = codigoInput.value;

    // Realizar una solicitud para obtener el premio por el código ingresado
    fetch(`http://localhost:3000/api/getAward/${codigo}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const codigo = data.codigo;
            if (codigo) {
                premiosTable.classList.remove('d-none'); // Mostrar la tabla
                premiosTable.querySelector('tbody').innerHTML = ''; // Limpiamos el cuerpo de la tabla antes de mostrar el resultado

                const row = document.createElement('tr');
                const nombreCell = document.createElement('td');
                const descripcionCell = document.createElement('td');

                nombreCell.textContent = codigo.nombre;
                descripcionCell.textContent = codigo.descripcion;

                row.appendChild(nombreCell);
                row.appendChild(descripcionCell);

                premiosTable.querySelector('tbody').appendChild(row);
                alertContainer.classList.add('d-none'); // Ocultar el mensaje de alerta
            } else {
                console.error('Código no encontrado.');
                premiosTable.classList.add('d-none'); // Ocultar la tabla
                alertContainer.classList.remove('d-none'); // Mostrar el mensaje de alerta
            }
        })
        .catch(error => {
            console.error('Error al obtener el premio:', error);
        });
});

window.addEventListener('beforeunload', function (event) {
    // Aquí puedes mostrar un mensaje de confirmación
    event.returnValue = '¿Seguro que quieres recargar la página?';
});