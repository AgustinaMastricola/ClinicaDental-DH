window.addEventListener('load', function(){
    const submitSuccess = document.getElementById('submitSuccessMessage-odon');
    const submitError = document.getElementById('submitErrorMessage-odon');
    const url = 'http://localhost:8080/odontologos';
    const nombre = document.getElementById('nombre-odon');
    const apellido = document.getElementById('apellido-odon');
    const nro_matricula = document.getElementById("nro_matricula");
    const formulario = document.getElementById('odontologo-form-post');
    const containerForm = document.getElementById('contenedor-form-post_odon');
    const containerFormUpd = document.getElementById('contenedor-form-put_odon');
    const containerList = document.getElementById('contenedor-listado-odon');
    const odontologList = document.getElementById('lista-odontologos');
    const botonNuevo = document.getElementById('nuevo-odon');
    const botonListar = document.getElementById('listar-odon');
    const urlOdont = 'http://localhost:8080/odontologos/all';

/*---------- POST -------------*/
    formulario.addEventListener('submit', function(event){
        event.preventDefault()
        postOdontologo()
        formulario.reset()
    })

    async function postOdontologo() {
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
        const formData = {
            nombre: nombre.value,
            apellido: apellido.value,
            nro_matricula: nro_matricula.value
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
        listarTodosOdontologos();
        containerList.classList.remove('d-none');
    })

/*----------- LISTAR TODOS ---------------------*/
    async function listarTodosOdontologos(){
            const response = await fetch(urlOdont);
            const datos = await response.json();
            renderizarOdontologo(datos)
    }
    function renderizarOdontologo(list){
        odontologList.innerHTML = '';
        list.forEach( odonto => {
            odontologList.innerHTML += `
                <tr id="fila-odonto-${odonto.id}">
                    <td class="invisible">${odonto.id}</td>
                    <td>${odonto.nombre} ${odonto.apellido}</td>
                    <td>${odonto.nro_matricula}</td>
                    <td>
                        <button class="btn btn-primary m-2 boton-modificar-odon" id="${odonto.id}">Modificar</button>
                        <button class="btn btn-primary m-2 boton-eliminar-odon" id="${odonto.id}">Eliminar</button>
                    </td>
                </tr>
            `
        })
        eliminarOdontologo()
        modificarOdontologo()
    }
/*----------- DELETE BY ID ---------------------*/
    async function eliminarOdontologo(){
        const botonEliminar = document.querySelectorAll('.boton-eliminar-odon');
        botonEliminar.forEach(boton => {
            boton.addEventListener('click', (event) => {
                const id = event.target.id
                eliminarById(id)
            })
        })
    }
    function eliminarById(id){
        const idFila = document.getElementById('fila-odonto-' + id);
        const settings = {
            method: 'DELETE'
        }
        fetch(`${url}/${id}`, settings)
        .then(idFila.remove())
    }

/*------------ MODIFICAR DATOS - PUT -----------------*/
    async function modificarOdontologo(){
        const botonModificar = document.querySelectorAll('.boton-modificar-odon');
        botonModificar.forEach(boton => {
            boton.addEventListener('click', (event) => {
                containerList.classList.add('d-none');
                containerFormUpd.classList.remove('d-none');
                const id = event.target.id
                putOdontologo(id)
            })
        })
    }

    function putOdontologo(id){
        const formUpd = document.getElementById('odontologo-form-put_odon');
        const nombreUpd = document.getElementById('nombre-upd-odon')
        const apellidoUpd = document.getElementById('apellido-upd-odon')
        const nro_matriculaUpd = document.getElementById('nro_matricula-upd')
        const updateSuccess = document.getElementById('submitSuccessMessage-upd-odon')

        formUpd.addEventListener('submit', function(event){
            event.preventDefault()
            const formData = {
                id: id,
                nombre: nombreUpd.value,
                apellido: apellidoUpd.value,
                nro_matricula: nro_matriculaUpd.value
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
            .then(updateSuccess.classList.remove('d-none'))
        })
    }
})