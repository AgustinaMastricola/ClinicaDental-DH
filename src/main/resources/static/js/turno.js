window.addEventListener('load', function () {
    /* Formulario POST */
    const containerFormPost = document.getElementById('contenedor-form-post-tur');
    const formPost = document.getElementById('form-post-tur');
    const hora = document.getElementById('hora-tur');
    const fecha = document.getElementById('fecha-tur');
    const containerOptionOdont = document.getElementById("odontologo-tur");
    const mensajeExitoso = document.getElementById('submitSuccessMessage-tur');
    const mensajeError = document.getElementById('submitErrorMessage-tur');

    /* Formulario PUT */
    const containerFormPut = document.getElementById('contenedor-form-put-tur');
    const formPut = document.getElementById('form-put-tur');
    const horaPut = document.getElementById('hora-tur-put');
    const fechaPut = document.getElementById('fecha-tur-put');
    const containerOptionOdontPut = document.getElementById("odontologo-tur-put");
    const mensajeExitosoPut = document.getElementById('submitSuccessMessage-tur-put');
    const mensajeErrorPut = document.getElementById('submitErrorMessage-tur-put');

    /* Endpoints */
    const url = 'http://localhost:8080/turnos';
    const urlTurAll = 'http://localhost:8080/turnos/all';
    const urlOdon = 'http://localhost:8080/odontologos';

    /* Botones */
    const botonNuevo = document.getElementById('nuevo-tur');
    const botonListar = document.getElementById('listar-tur');

    /* Renderizado de Listado Turnos */
    const containerListTur = document.getElementById('contenedor-listado-tur');
    const listItemsTur = document.getElementById('listado-turnos')


    /* Ecuchar evento submit del form */
    formPost.addEventListener('submit', function(event){
        event.preventDefault()
        postTurno()
        formPost.reset()
    })

    /* Hacer el POST */
    async function postTurno(){
        let data = capturarDatos()
        let settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(data),
        }
        try{
            const response = await fetch(url, settings);
            mensajeExitoso.classList.remove('d-none')
        }
        catch{
            mensajeError.classList.remove('d-none')
        }
    }
    /* Capturo la hora elegida */
    function obtenerHora(selected){
        let horaSelected = selected.value
        return horaSelected;
    }
    /* Capturo el ID del odontologo elegido */
    function obtenerIdOdonSelected(selected){
        let odonSelected = selected.value
        return parseInt(odonSelected);
    }
    /* Capturar los datos del form */
    function capturarDatos(){
        const odontologoId = obtenerIdOdonSelected(containerOptionOdont);
        let horaSelect = obtenerHora(hora);
        let horaParse = horaSelect.padStart(5,0)
        let fechaNum = fecha.valueAsNumber;
        let fechaParse = new Date(fechaNum);
        let year = fechaParse.getFullYear().toString();
        let mes = (fechaParse.getMonth() +1).toString().padStart(2,'0');
        let dia = (fechaParse.getDate() +1).toString().padStart(2,'0');
        const formData = {
            fecha_hora: `${year}-${mes}-${dia}T${horaParse}:00`,
            paciente: {id: 802},
            odontologo: {id: odontologoId}
        }
        return formData;
    }
    /* -------- BOTON CREAR 'NUEVO' -------------*/
    botonNuevo.addEventListener('click', function(event) {
        containerListTur.classList.add('d-none');
        generarOptionsOdon(containerOptionOdont)
        containerFormPost.classList.remove('d-none');
    })
    /* ----------- BOTON 'VER TODOS' ---------------*/
    botonListar.addEventListener('click', function(event){
        containerFormPost.classList.add('d-none');
        containerFormPut.classList.add('d-none');
        listarTodos();
        containerListTur.classList.remove('d-none');
    })

    /* Renderizado de Nombres de Odontologos en el Formulario */
    async function generarOptionsOdon(contenedor){
        const response = await fetch(`${urlOdon}/all`);
        const datos = await response.json();
        renderizarListaOdontologos(datos, contenedor);
    }
    function renderizarListaOdontologos(lista, contenedor){
        contenedor.innerHTML = `
            <option selected>Profesional</option>
        `;
        lista.forEach(odont => {
            contenedor.innerHTML += `
                <option value="${odont.id}">${odont.nombre} ${odont.apellido}</option>
            `
        });
    }

    /*----------- LISTAR TODOS ---------------------*/
    async function listarTodos(){
        const response = await fetch(urlTurAll);
        const datos = await response.json();
        renderizarTurno(datos)
    }

    function renderizarTurno(list){
        listItemsTur.innerHTML = '';
        list.forEach( turno => {
            let fechaHora = turno.fecha_hora.replace('T', ' / ').slice(0,18)
            listItemsTur.innerHTML += `
                <tr id="item-tur-${turno.id}">
                    <td class="invisible">${turno.id}</td>
                    <td>${fechaHora}</td>
                    <td>PACIENTE</td>
                    <td>${turno.odontologo.nombre} ${turno.odontologo.apellido}</td>
                    <td>
                        <button class="btn btn-primary m-2 boton-modificar-tur" id="${turno.id}">Modificar</button>
                        <button class="btn btn-primary m-2 boton-eliminar-tur" id="${turno.id}">Eliminar</button>
                    </td>
                </tr>
            `
        })
        eliminarTurno()
        modificarTurno()
    }
    /*----------- DELETE BY ID ---------------------*/
    async function eliminarTurno(){
        const botonEliminar = document.querySelectorAll('.boton-eliminar-tur');
        botonEliminar.forEach(boton => {
            boton.addEventListener('click', (event) => {
                const id = event.target.id
                eliminarById(id)
            })
        })
    }
    function eliminarById(id){
        const idItem = document.getElementById('item-tur-' + id);
        const settings = {
            method: 'DELETE'
        }
        fetch(`${url}/${id}`, settings)
        .then(idItem.remove())
    }

    /*------------ MODIFICAR DATOS - PUT -----------------*/
    async function modificarTurno(){
        const botonModificar = document.querySelectorAll('.boton-modificar-tur');
        botonModificar.forEach(boton => {
            boton.addEventListener('click', (event) => {
                containerListTur.classList.add('d-none');
                containerFormPut.classList.remove('d-none');
                generarOptionsOdon(containerOptionOdontPut)
                const id = event.target.id
                putTurno(id)
            })
        })
    }

    function putTurno(id){
        formPut.addEventListener('submit', function(event){
            event.preventDefault()
            const odontologoId = obtenerIdOdonSelected(containerOptionOdontPut);
            let horaSelect = obtenerHora(horaPut);
            let horaParse = horaSelect.padStart(5,0)
            let fechaNum = fechaPut.valueAsNumber;
            let fechaParse = new Date(fechaNum);
            let year = fechaParse.getFullYear().toString();
            let mes = (fechaParse.getMonth() +1).toString().padStart(2,'0');
            let dia = (fechaParse.getDate() +1).toString().padStart(2,'0');
            const formData = {
                id: id,
                fecha_hora: `${year}-${mes}-${dia}T${horaParse}:00`,
                paciente: {id: 802},
                odontologo: {id: odontologoId}
            }
            const settings = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(formData)
            }
            fetch(url, settings)
            .then(mensajeExitosoPut.classList.remove('d-none'))
    })
}

})