// Variable para almacenar la lista de amigos. Es un array.
let amigos = [];

// Función para añadir un amigo a la lista
function agregarAmigo() {
    // 1. Obtener el elemento input y la lista de amigos del HTML
    let inputAmigo = document.getElementById('amigo');
    let listaHTML = document.getElementById('listaAmigos');

    // 2. Validar que el campo no esté vacío
    if (inputAmigo.value == '') {
        alert('Por favor, escribe el nombre del amigo.');
        return; // Detiene la ejecución de la función
    }

    // 3. Validar que el nombre no esté ya en la lista (evitar duplicados)
    if (amigos.includes(inputAmigo.value)) {
        alert('Este nombre ya ha sido añadido. Por favor, introduce un nombre diferente.');
        inputAmigo.value = ''; // Limpiar el campo
        return;
    }
    
    // 4. Añadir el nombre del amigo al array 'amigos'
    amigos.push(inputAmigo.value);

    // 5. Actualizar la lista visible en el HTML
    // Si la lista estaba vacía, simplemente añade el nombre.
    if (listaHTML.textContent == '') {
        listaHTML.textContent = inputAmigo.value;
    } else {
        // Si ya hay nombres, añade una coma y luego el nuevo nombre.
        listaHTML.textContent = listaHTML.textContent + ', ' + inputAmigo.value;
    }

    // 6. Limpiar el campo de texto para el siguiente nombre
    inputAmigo.value = '';
}

// Función para realizar el sorteo del amigo secreto
function sortearAmigo() {
    // 1. Validar que haya suficientes personas para jugar (mínimo 4 para que sea divertido)
    if (amigos.length < 4) {
        alert('Debes agregar al menos 4 amigos para poder sortear.');
        return; // Detiene la ejecución
    }

    // 2. Barajar (desordenar) la lista de amigos
    // Este bucle recorre el array desde el final hacia el principio
    for (let i = amigos.length - 1; i > 0; i--) {
        // Elige un índice aleatorio entre 0 e i (incluido)
        const j = Math.floor(Math.random() * (i + 1));
        // Intercambia el elemento actual (i) con el elemento aleatorio (j)
        [amigos[i], amigos[j]] = [amigos[j], amigos[i]];
    }

    // 3. Asignar las parejas y mostrar el resultado
    let resultadoHTML = document.getElementById('resultado');
    resultadoHTML.innerHTML = ''; // Limpiar resultados anteriores

    // Este bucle crea las parejas: el amigo en la posición 'i' le regala al de la posición 'i + 1'
    for (let i = 0; i < amigos.length; i++) {
        let pareja;
        // Si es el último de la lista, su amigo secreto será el primero (para cerrar el círculo)
        if (i == amigos.length - 1) {
            pareja = amigos[i] + ' --> ' + amigos[0];
        } else {
            // De lo contrario, su amigo secreto es el siguiente en la lista barajada
            pareja = amigos[i] + ' --> ' + amigos[i + 1];
        }
        
        // Añadir la pareja a la lista de resultados en el HTML
        resultadoHTML.innerHTML += `<li>${pareja}</li>`;
    }
}
