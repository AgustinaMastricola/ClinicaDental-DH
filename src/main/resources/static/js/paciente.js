window.addEventListener('load', function () {
    const submitSuccess = document.getElementById('submitSuccessMessage-pac');
    const submitError = document.getElementById('submitErrorMessage-pac');
    const url = 'http://localhost:8080/pacientes';
    const nombre = document.getElementById('nombre-pac');
    const apellido = document.getElementById('apellido-pac');
    const dni = document.getElementById("dni-pac");
    const calle = document.getElementById('calle');
    const numero = document.getElementById('numero');
    const localidad = document.getElementById('localidad');
    const provincia = document.getElementById("provincia");

    const formulario = document.getElementById('paciente-form-post');
    const containerForm = document.getElementById('contenedor-form-post_pac');
    const containerFormUpd = document.getElementById('contenedor-form-put_pac');
    const containerList = document.getElementById('contenedor-listado-pac');
    const pacienteList = document.getElementById('lista-pacientes');
    const botonNuevo = document.getElementById('nuevo-pac');
    const botonListar = document.getElementById('listar-pac');
    const urlAll = 'http://localhost:8080/pacientes/all';

    /*---------- POST -------------*/
    formulario.addEventListener('submit', function(event){
        event.preventDefault()
        postPaciente()
        formulario.reset()
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
            submitSuccess.classList.remove('d-none')
        }
        catch{
            submitError.classList.remove('d-none')
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
        fecha_ingreso: `${year}-${mes}-${dia}`,
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
        containerList.classList.add('d-none');
        containerForm.classList.remove('d-none');
    })
    /* ----------- BOTON 'VER TODOS' ---------------*/
    botonListar.addEventListener('click', function(event){
        containerForm.classList.add('d-none');
        containerFormUpd.classList.add('d-none');
        listarTodos();
        containerList.classList.remove('d-none');
    })

    /*----------- LISTAR TODOS ---------------------*/
    async function listarTodos(){
            const response = await fetch(urlAll);
            const datos = await response.json();
            renderizarPaciente(datos)
    }
    function renderizarPaciente(list){
        pacienteList.innerHTML = '';
        list.forEach( paciente => {

            pacienteList.innerHTML += `
                <tr id="fila-paciente-${paciente.id}">
                    <td class="invisible">${paciente.id}</td>
                    <td>${paciente.nombre} ${paciente.apellido}</td>
                    <td>${paciente.dni}</td>
                    <td>${paciente.fecha_ingreso}</td>
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
        const idFila = document.getElementById('fila-paciente-' + id);
        const settings = {
            method: 'DELETE'
        }
        fetch(`${url}/${id}`, settings)
        .then(idFila.remove())
    }

    /*------------ MODIFICAR DATOS - PUT -----------------*/
    async function modificarPaciente(){
        const botonModificar = document.querySelectorAll('.boton-modificar-pac');
        botonModificar.forEach(boton => {
            boton.addEventListener('click', (event) => {
                containerList.classList.add('d-none');
                containerFormUpd.classList.remove('d-none');
                const id = event.target.id
                putPaciente(id)
            })
        })
    }

    function putPaciente(id){
        const formUpd = document.getElementById('paciente-form-put_pac');
        const nombreUpd = document.getElementById('nombre-upd-pac')
        const apellidoUpd = document.getElementById('apellido-upd-pac')
        const dniUpd = document.getElementById('dni-upd-pac')
        const calleUpd = document.getElementById('calle-upd')
        const numeroUpd = document.getElementById('numero-upd')
        const localidadUpd = document.getElementById('localidad-upd')
        const provinciaUpd = document.getElementById('provincia-upd')
        const updateSuccessUpd = document.getElementById('submitSuccessMessage-upd-pac')

        formUpd.addEventListener('submit', function(event){
            event.preventDefault()
            const formData = {
                id: id,
                nombre: nombreUpd.value,
                apellido: apellidoUpd.value,
                dni: dniUpd.value,
                domicilio: {
                    calle: calleUpd.value,
                    numero: numeroUpd.value,
                    localidad: localidadUpd.value,
                    provincia: provinciaUpd.value
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
            .then(res => res.json())
            .then(updateSuccessUpd.classList.remove('d-none'))
        })
    }
})