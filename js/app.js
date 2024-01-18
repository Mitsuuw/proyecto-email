document.addEventListener('DOMContentLoaded', function() {

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // Elementos de la interfaz
    // querySelector selecciona los elemetos en el HTML
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    //Asignar eventos
    //addEventListener escucha el evento 
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(evento) {
        evento.preventDefault();
        resetFormulario();
    })

    function enviarEmail(evento) {
        evento.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            //remueve el flex del css y agrega hidden que es para ocultar el elemento
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetFormulario();

            // Crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);
            // Son los segundos para que se ejecute
            setTimeout(() => {
                alertaExito.remove(); 
            }, 3000);
        }, 3000);
    }
    
    function validar(evento) {
    //trim elimina los espacios en blanco
        if(evento.target.value.trim() === '') {
            // Los id de los input seleccionados del elemento padre
            mostrarAlerta(`El Campo ${evento.target.id} es obligatorio`, evento.target.parentElement);
            // target.name 
            email[evento.target.name] = '';
            comprobarEmail();
            return;
        }
        //comprueba las dos condiciones para validarlas
        if(evento.target.id === 'email' && !validarEmail(evento.target.value)) {
            mostrarAlerta('El email no es válido', evento.target.parentElement);
            email[evento.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(evento.target.parentElement);

        // Asignar los valores
        email[evento.target.name] = evento.target.value.trim().toLowerCase();

        // Comprobar el objeto de email
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);
    //Generar alerta en HTML
    //document.createElement crea un elemento
    const error = document.createElement('p');
    //.textContent agrega contenido al elemento creado
    error.textContent = mensaje;
    //.classList.add manipula el estilo de la clase del elemento
    error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

    // Inyectar el error al formulario
    referencia.appendChild(error);
    }
    function limpiarAlerta(referencia) {
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return
        } 
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetFormulario() {
        // reiniciar el objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }
});