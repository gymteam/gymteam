const db = firebase.firestore();
//Modal de agregar --------------------------------------------------------
let cerrar = document.querySelectorAll('.cierre')[0];
let abrir = document.querySelectorAll('.modal1')[0];
let editar = document.querySelectorAll('.btnsedi')[0];
let modal = document.querySelectorAll('.modal')[0];
let modalC = document.querySelectorAll('.contenedor-modal')[0];
let modal2 = document.querySelectorAll('.modal')[0];
let modalC2 = document.querySelectorAll('.contenedor-modal')[0];



abrir.addEventListener("click", function(e){
    e.preventDefault();
    modalC.style.opacity = "1";
    modalC.style.visibility = "visible";
    modal.classList.toggle("cierre-modal");
});
cerrar.addEventListener("click", function(){
    modal.classList.toggle("cierre-modal");
    setTimeout(function(){
        modalC.style.opacity = "0";
        modalC.style.visibility = "hidden"
    },700)
});
//modal para editar---------------------------------------------------------------
/*editar.addEventListener("click", function(e){
    e.preventDefault();
    modalC.style.opacity = "1";
    modalC.style.visibility = "visible";
    modal.classList.toggle("cierre-modal");
});
//modal para eliminar-------------------------------------------------
eliminar.addEventListener("click", function(e){
    e.preventDefault();
    modalC3.style.opacity = "1";
    modalC3.style.visibility = "visible";
    modal3.classList.toggle("cierre-modal3");
});
cerrar3.addEventListener("click", function(){
    modal3.classList.toggle("cierre-modal3");
    setTimeout(function(){
        modalC3.style.opacity = "0";
        modalC3.style.visibility = "hidden"
    },700)
});*/
//cerrar modal-------------------------------------------


//Aqui termina el modal y comienza el crud--------------------------------------------------------------

//agregar
const regcoach = document.getElementById('regcoach');
const card = document.getElementById('cardcoach');

let editEstado = false;
let id = '';

const guardarCoach = (nombre, alias, desc) =>
    db.collection('coaches').doc().set({
        nombre,
        alias,
        desc
    });

const mostrarCoach = () => db.collection('coaches').get();
const onmostrarCoach = (llamar) => db.collection('coaches').onSnapshot(llamar)
const eliminarDatos = (id) => db.collection('coaches').doc(id).delete();
const obtenerDatos = (id) => db.collection('coaches').doc(id).get();
const actualizarDatos = (id, updatedTask) => db.collection('coaches').doc(id).update(updatedTask);

window.addEventListener('DOMContentLoaded', async (e) => {   
    onmostrarCoach((querySnapshot) => {
        card.innerHTML=' ';
        querySnapshot.forEach(doc =>{
            const dato = doc.data();
            dato.id = doc.id;
            //console.log(dato)

            card.innerHTML += `<div class="aza">
                <img src="./img/logo.png" alt="entrenador" class="entrenador">
                <h3 class="nombre">Coach: ${doc.data().nombre}</h3>
                <h4 class="alias">${doc.data().alias}</h4>
                <p class="desc">${doc.data().desc}</p>
                <button class="btn btn-delete" data-id="${dato.id}">Eliminar</button>
                <button class="btn btn-edit data-id" data-id="${dato.id}">Editar</button>
            </div>`
        });

            const btns = card.querySelectorAll('.btn-delete');
            btns.forEach((btn) => 
                btn.addEventListener('click', async (e) => {
                    await eliminarDatos(e.target.dataset.id);
                })
            );

            const btnsEdit = card.querySelectorAll('.btn-edit');
            btnsEdit.forEach((btn) => {
                btn.addEventListener('click', async (e) => {
                    const doc = await obtenerDatos(e.target.dataset.id)
                    //console.log(doc.data())
                        e.preventDefault();
                        modalC2.style.opacity = "1";
                        modalC2.style.visibility = "visible";
                        modal2.classList.toggle("cierre-modal");
                    
                        const valor = doc.data();
                        editEstado = true;
                        id = doc.id;

                        regcoach['nombre'].value = valor.nombre;
                    regcoach['alias'].value = valor.alias;
                    regcoach['desc'].value = valor.desc;
                    regcoach['btn-enviar'].innerText = 'Actualizar';
                })
            })
        })
    })    


regcoach.addEventListener('submit', async (e)=>{
    e.preventDefault();

    //var storageRef = firebase.storage().ref();

    const nombre = regcoach['nombre'];
    const alias = regcoach['alias'];
    const desc = regcoach['desc'];
    const imagen = regcoach['img-coach'].value;

    if(!editEstado){
        await guardarCoach(nombre.value, alias.value, desc.value);
    }else{
        await actualizarDatos(id, {
            nombre: nombre.value,
            alias: alias.value,
            desc: desc.value
        })
        editEstado = false;
        id='';
        regcoach['btn-enviar'].innerText = 'Guardar';
    }
    //var imagenAsubir = imagen.files[0];
    
    regcoach.reset();
    
    //var uploadTask = storageRef.child('imagenes/' + imagenAsubir.name).put(imagenAsubir);

    //console.log(nombre, alias, desc)
})

//eliminar