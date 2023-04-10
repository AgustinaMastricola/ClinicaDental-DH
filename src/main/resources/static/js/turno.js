window.addEventListener('load', function () {
    const submitSuccess = document.getElementById('submitSuccessMessage-tur');
    const submitError = document.getElementById('submitErrorMessage-tur');
    const urlTurno = 'http://localhost:8080/turnos';
    const hora = document.getElementById('hora-tur');
    const fecha = document.getElementById('fecha-tur');
    const formulario = document.getElementById('turno-form-post');
    const containerForm = document.getElementById('contenedor-form-post_tur');
    const containerFormUpd = document.getElementById('contenedor-form-put_tur');
    const containerList = document.getElementById('contenedor-listado-tur');
    const turnoList = document.getElementById('lista-turnos');
    const containerListOdontologos = document.getElementById('odontologo-tur');
    const horaUpd = document.getElementById('hora-upd-tur')
    const containerListOdonUpd = document.getElementById('odontologo-upd-tur')
    const botonNuevo = document.getElementById('nuevo-tur');
    const botonListar = document.getElementById('listar-tur');
    const urlTurnos = 'http://localhost:8080/turnos/all';
    const urlOdont = 'http://localhost:8080/odontologos';

    /* Ecuchar evento submit del form */
    formulario.addEventListener('submit', function(event){
        event.preventDefault()
        postTurno()
        formulario.reset()
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

            submitSuccess.classList.remove('d-none')
        }
        catch{
            submitError.classList.remove('d-none')
        }
    }
    /* Capturo la hora elegida */
    function obtenerHora(){
        let horaSelected = hora.value
        return horaSelected;
    }
    /* Capturo el ID del odontologo elegido */
    function obtenerIdOdonSelected(){
        let odonSelected = containerListOdontologos.value
        return parseInt(odonSelected);
    }


    /* Capturar los datos del form */
    function capturarDatos(){
        const odontologoId = obtenerIdOdonSelected();
        let horaSelect = obtenerHora();
        let fechaNum = fecha.valueAsNumber;
        let fechaParse = new Date(fechaNum);
        let year = fechaParse.getFullYear().toString();
        let mes = fechaParse.getMonth().toString().padStart(2,'0');
        let dia = fechaParse.getDate().toString().padStart(2,'0');
        const formData = {
            fecha_hora: `${year}-${mes}-${dia}T0${horaSelect}:00`,
            paciente: {id: 306},
            odontologo: {id: odontologoId}
        }
        return formData;
    }
    /* -------- BOTON CREAR 'NUEVO' -------------*/
    botonNuevo.addEventListener('click', function(event) {
        containerList.classList.add('d-none');
        obtenerOdontologos(containerListOdontologos)
        containerForm.classList.remove('d-none');
    })
    /* ----------- BOTON 'VER TODOS' ---------------*/
    botonListar.addEventListener('click', function(event){
        containerForm.classList.add('d-none');
        containerFormUpd.classList.add('d-none');
        listarTodos();
        containerList.classList.remove('d-none');
    })

    /* Renderizado de Nombres de Odontologos en el Formulario */
    async function obtenerOdontologos(contenedor){
        const response = await fetch(`${urlOdont}/all`);
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
        const response = await fetch(urlTurnos);
        const datos = await response.json();
        renderizarTurno(datos)
    }

    function renderizarTurno(list){
        turnoList.innerHTML = '';
        list.forEach( turno => {
            turnoList.innerHTML += `
                <tr id="fila-turno-${turno.id}">
                    <td class="invisible">${turno.id}</td>
                    <td>${turno.fecha_hora}</td>
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
        //modificarTurno()
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
        const idFila = document.getElementById('fila-turno-' + id);
        const settings = {
            method: 'DELETE'
        }
        fetch(`${url}/${id}`, settings)
        .then(idFila.remove())
    }

})