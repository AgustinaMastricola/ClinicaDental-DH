window.addEventListener('load', function(){
    /* Formulario POST */
    const containerFormPost = document.getElementById('contenedor-form-post-odon');
    const formPost = document.getElementById('form-post-odon');
    const nombre = document.getElementById('nombre-odon');
    const apellido = document.getElementById('apellido-odon');
    const nro_matricula = document.getElementById("nro_matricula");
    const mensajeExitoso = document.getElementById('submitSuccessMessage-odon');
    const mensajeError = document.getElementById('submitErrorMessage-odon');

    /* Formulario PUT */
    const containerFormPut = document.getElementById('contenedor-form-put-odon');
    const formPut = document.getElementById('form-put-odon');
    const nombrePut = document.getElementById('nombre-odon-put')
    const apellidoPut = document.getElementById('apellido-odon-put')
    const nro_matriculaPut = document.getElementById('nro_matricula-put')
    const mensajeExitosoPut = document.getElementById('submitSuccessMessage-odon-put')
    const mensajeErrorPut = document.getElementById('submitErrorMessage-odon-put')

    /* Endpoints */
    const url = 'http://localhost:8080/odontologos';
    const urlOdontAll = 'http://localhost:8080/odontologos/all';

    /* Botones */
    const botonNuevo = document.getElementById('nuevo-odon');
    const botonListar = document.getElementById('listar-odon');

    /* Renderizado de Odontologos */
    const containerListOdont = document.getElementById('contenedor-listado-odon');
    const listItemsOdonto = document.getElementById('listado-odontologos');


/*---------- POST -------------*/
    formPost.addEventListener('submit', function(event){
        event.preventDefault()
        postOdontologo()
        formPost.reset()
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
            mensajeExitoso.classList.remove('d-none')
        }
        catch{
            mensajeError.classList.remove('d-none')
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
        containerListOdont.classList.add('d-none');
        containerFormPost.classList.remove('d-none');
    })
/* ----------- BOTON 'VER TODOS' ---------------*/
    botonListar.addEventListener('click', function(event){
        containerFormPost.classList.add('d-none');
        containerFormPut.classList.add('d-none');
        listarTodosOdontologos();
        containerListOdont.classList.remove('d-none');
    })

/*----------- LISTAR TODOS ---------------------*/
    async function listarTodosOdontologos(){
            const response = await fetch(urlOdontAll);
            const datos = await response.json();
            renderizarOdontologo(datos)
    }
    function renderizarOdontologo(list){
        listItemsOdonto.innerHTML = '';
        list.forEach( odonto => {
            listItemsOdonto.innerHTML += `
                <tr id="item-odon-${odonto.id}">
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
        const idItem = document.getElementById('item-odon-' + id);
        const settings = {
            method: 'DELETE'
        }
        fetch(`${url}/${id}`, settings)
        .then(idItem.remove())
    }

/*------------ MODIFICAR DATOS - PUT -----------------*/
    async function modificarOdontologo(){
        const botonModificar = document.querySelectorAll('.boton-modificar-odon');
        botonModificar.forEach(boton => {
            boton.addEventListener('click', (event) => {
                containerListOdont.classList.add('d-none');
                containerFormPut.classList.remove('d-none');
                const id = event.target.id
                putOdontologo(id)
            })
        })
    }

    function putOdontologo(id){
        formPut.addEventListener('submit', function(event){
            event.preventDefault()
            const formData = {
                id: id,
                nombre: nombrePut.value,
                apellido: apellidoPut.value,
                nro_matricula: nro_matriculaPut.value
            }
            const settings = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(formData)
            }
            fetch(url, settings)
            mensajeExitosoPut.classList.remove('d-none')
        })
    }
})