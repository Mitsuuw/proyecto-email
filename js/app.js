document.addEventListener('DOMContentLoaded', function() {
    // Elementos de la interfaz
    // querySelector selecciona los elemetos en el HTML
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');

    //Asignar eventos
    //addEventListener escucha el evento 
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);
    
    function validar(evento) {
    //trim elimina los espacios en blanco
        if(evento.target.value.trim() === '') {
            mostrarAlerta();
        } else {
            console.log('si hay algo...');
        }
    }

    function mostrarAlerta() {
    //Generar alerta en HTML
    //document.createElement crea un elemento
    const error = document.createElement('P');
    //.textContent agrega contenido al elemento creado
    error.textContent = 'Hubo un error...';
    //.classList.add manipula el estilo de la clase del elemento
    error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

    // Inyectar el error al formulario
    formulario.appendChild(error);
    }
})