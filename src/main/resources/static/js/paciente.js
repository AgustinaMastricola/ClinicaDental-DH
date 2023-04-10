window.addEventListener('load', function () {
    /* Formulario POST */
    const containerFormPost = document.getElementById('contenedor-form-post-odon');
    const formPost = document.getElementById('form-post-pac');
    const nombre = document.getElementById('nombre-pac');
    const apellido = document.getElementById('apellido-pac');
    const dni = document.getElementById("dni-pac");
    const calle = document.getElementById('calle');
    const numero = document.getElementById('numero');
    const localidad = document.getElementById('localidad');
    const provincia = document.getElementById("provincia");
    const mensajeExitoso = document.getElementById('submitSuccessMessage-pac');
    const mensajeError = document.getElementById('submitErrorMessage-pac');

    /* Formulario PUT */
    const containerFormPut = document.getElementById('contenedor-form-put-pac');
    const formPut = document.getElementById('form-put-pac');
    const nombrePut = document.getElementById('nombre-pac-put')
    const apellidoPut = document.getElementById('apellido-pac-put')
    const dniPut = document.getElementById('dni-pac-put')
    const callePut = document.getElementById('calle-put')
    const numeroPut = document.getElementById('numero-put')
    const localidadPut = document.getElementById('localidad-put')
    const provinciaPut = document.getElementById('provincia-put')
    const mensajeExitosoPut = document.getElementById('submitSuccessMessage-pac-put');
    const mensajeErrorPut = document.getElementById('submitErrorMessage-pac-put');

    /* Endpoints */
    const url = 'http://localhost:8080/pacientes';
    const urlPacAll = 'http://localhost:8080/pacientes/all';

    /* Botones */
    const botonNuevo = document.getElementById('nuevo-pac');
    const botonListar = document.getElementById('listar-pac');

    /* Renderizado de Pacientes */
    const containerListPac = document.getElementById('contenedor-listado-pac');
    const listItemsPac = document.getElementById('listado-pacientes');

    /*---------- POST -------------*/
    formPost.addEventListener('submit', function(event){
        event.preventDefault()
        postPaciente()
        formPost.reset()
    })

    async function postPaciente() {
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
            const datos = await response.json();
            mensajeExitoso.classList.remove('d-none')
        }
        catch{
            mensajeError.classList.remove('d-none')
        }
    }
    function capturarDatos() {
    let fechaNow = Date.now();
    let fecha = new Date(fechaNow);
    let year = fecha.getFullYear().toString();
    let mes = fecha.getMonth().toString().padStart(2,'0');
    let dia = fecha.getDate().toString().padStart(2,'0');
    const formData = {
        nombre: nombre.value,
        apellido: apellido.value,
        dni: dni.value,
        fecha_ingreso: `${year}-${mes}-${dia}` ,
        domicilio: {
            calle: calle.value,
            numero: numero.value,
            localidad: localidad.value,
            provincia: provincia.value
        }
    };
    return formData;
    }
    /* -------- BOTON CREAR 'NUEVO' -------------*/
    botonNuevo.addEventListener('click', function(event) {
        containerListPac.classList.add('d-none');
        containerFormPost.classList.remove('d-none');
    })
    /* ----------- BOTON 'VER TODOS' ---------------*/
    botonListar.addEventListener('click', function(event){
        containerFormPost.classList.add('d-none');
        containerFormPut.classList.add('d-none');
        listarTodos();
        containerListPac.classList.remove('d-none');
    })

    /*----------- LISTAR TODOS ---------------------*/
    async function listarTodos(){
            const response = await fetch(urlPacAll);
            const datos = await response.json();
            renderizarPaciente(datos)
    }
    function renderizarPaciente(list){
        listItemsPac.innerHTML = '';
        list.forEach( paciente => {
            listItemsPac.innerHTML += `
                <tr id="item-pac-${paciente.id}">
                    <td class="invisible">${paciente.id}</td>
                    <td>${paciente.nombre} ${paciente.apellido}</td>
                    <td>${paciente.dni}</td>
                    <td>${paciente.domicilio.calle} ${paciente.domicilio.numero} ${paciente.domicilio.localidad}</td>
                    <td>
                        <button class="btn btn-primary m-2 boton-modificar-pac" id="${paciente.id}">Modificar</button>
                        <button class="btn btn-primary m-2 boton-eliminar-pac" id="${paciente.id}">Eliminar</button>
                    </td>
                </tr>
            `
        })
        eliminarPaciente()
        modificarPaciente()
    }
    /*----------- DELETE BY ID ---------------------*/
    async function eliminarPaciente(){
        const botonEliminar = document.querySelectorAll('.boton-eliminar-pac');
        botonEliminar.forEach(boton => {
            boton.addEventListener('click', (event) => {
                const id = event.target.id
                eliminarById(id)
            })
        })
    }
    function eliminarById(id){
        const idItem = document.getElementById('item-pac-' + id);
        const settings = {
            method: 'DELETE'
        }
        fetch(`${url}/${id}`, settings)
        .then(idItem.remove())
    }

    /*------------ MODIFICAR DATOS - PUT -----------------*/
    async function modificarPaciente(){
        const botonModificar = document.querySelectorAll('.boton-modificar-pac');
        botonModificar.forEach(boton => {
            boton.addEventListener('click', (event) => {
                containerListPac.classList.add('d-none');
                containerFormPut.classList.remove('d-none');
                const id = event.target.id
                putPaciente(id)

            })
        })
    }

    function putPaciente(id){
        formPut.addEventListener('submit', function(event){
            event.preventDefault()
            const formData = {
                id: id,
                nombre: nombrePut.value,
                apellido: apellidoPut.value,
                dni: dniPut.value,
                domicilio: {
                    calle: callePut.value,
                    numero: numeroPut.value,
                    localidad: localidadPut.value,
                    provincia: provinciaPut.value
                }
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