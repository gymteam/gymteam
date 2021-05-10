const db = firebase.firestore();

let cerrar = document.querySelectorAll('.cierre')[0];
let abrir = document.querySelectorAll('.modal1')[0];
let editar = document.querySelectorAll('.btnsedi')[0];
let modal = document.querySelectorAll('.modal')[0];
let modalC = document.querySelectorAll('.contenedor-modal')[0];
let modal2 = document.querySelectorAll('.modal')[0];
let modalC2 = document.querySelectorAll('.contenedor-modal')[0];
let buscar = document.querySelectorAll('.btnbuscar')[0];

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
//--------------------------------------------------------------------------------------------------------------------
const buscando = db.collection('proveedordb');
const user = document.getElementById('proveedor').value;
buscar.addEventListener('click', function(){
    var clienteBuscado = buscando.where('nombre', '==', user);
    const usuario = clienteBuscado.data();
    console.log(usuario)
})
//---------------------------------------------------------------------------------------------------------------------
const regproveedor = document.getElementById('regproveedor');
const cuerpo = document.getElementById('cuerpo');

let editEstado = false;
let id = '';

const guardarProveedor = (nombre, direccion, telefono, correo) =>
    db.collection('proveedordb').doc().set({
        nombre: nombre,
        direccion: direccion,
        telefono: telefono,
        correo: correo
    });

const obtenerProveedores = () => db.collection('proveedordb').get();
const onProveedores = (llamar) => db.collection('proveedordb').onSnapshot(llamar);
const eliminarProveedor = id =>db.collection('proveedordb').doc(id).delete();
const obtenerDProveedor = (id) => db.collection('proveedordb').doc(id).get();
const actualizarProveedor = (id, updatedTask) => db.collection('proveedordb').doc(id).update(updatedTask);

window.addEventListener('DOMContentLoaded', async (e) => {

    onProveedores((querySnapshot) => {
        cuerpo.innerHTML = '';
        querySnapshot.forEach(doc => {
           // console.log(doc.data())
    
            const tdatos = doc.data();
            tdatos.id = doc.id;
            cuerpo.innerHTML += 
            `
            <td class="tdcampos">${tdatos.nombre}</td>
            <td class="tdcampos">${tdatos.direccion}</td>
            <td class="tdcampos">${tdatos.telefono}</td>
            <td class="tdcampos">${tdatos.correo}</td>
            <td class="tdbotones">
                <button class="btn btnEdit" data-id="${tdatos.id}">Editar</button>
                <button class="btn btnDelete" data-id="${tdatos.id}">Elimar</button>
            </td>
            `;

            const btnsDelete = document.querySelectorAll('.btnDelete');
            btnsDelete.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    
                    await eliminarProveedor(e.target.dataset.id);
                })
            })

            const btnsEdit = document.querySelectorAll('.btnEdit');
            btnsEdit.forEach((btn) => {
                btn.addEventListener('click', async (e) => {
                    const doc = await obtenerDProveedor(e.target.dataset.id)
                    //console.log(doc.data())
                        e.preventDefault();
                        modalC2.style.opacity = "1";
                        modalC2.style.visibility = "visible";
                        modal2.classList.toggle("cierre-modal");
                    
                        const valor = doc.data();
                        editEstado = true;
                        id = doc.id;

                        regproveedor['nombre'].value = valor.nombre;
                    regproveedor['direccion'].value = valor.direccion;
                    regproveedor['telefono'].value = valor.telefono;
                    regproveedor['correo'].value = valor.correo;
                    regproveedor['btn-enviar'].innerText = 'Actualizar';
                })
            })
        })
    })
})

regproveedor.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = regproveedor['nombre'];
    const direccion = regproveedor['direccion'];
    const telefono = regproveedor['telefono'];
    const correo = regproveedor['correo'];

    if(!editEstado){
        await guardarProveedor(nombre.value, direccion.value, telefono.value, correo.value);
    }else{
        await actualizarProveedor(id, {
            nombre: nombre.value,
            direccion: direccion.value,
            telefono: telefono.value,
            correo: correo.value
        })
        editEstado = false;
        id = '';
        regproveedor['btn-enviar'].innerText = 'Guardar';
    }
    regproveedor.reset();

})
//---------------------------------------------------------------------------------------------------------------------

/*
class Busqueda{
    constructor(){
        this.personas = [
            {nombre:"Juan", edad:34},
            {nombre:"Pedro", edad:23},
            {nombre:"Marian", edad:22}
        ];
        this.personasBk = this.personas;
        this.onInit();
        console.log(this.personas)
    }
    onInit(){
        let cuerpo = document.getElementById('cuerpo');
        while(cuerpo.rows.length > 0){
            cuerpo.deleteRow(0);
        }
        this.personas.forEach(persona => {
            let fila = cuerpo.insertRow(cuerpo.rows.length);
            fila.insertCell(0).innerHTML = persona.nombre;
            fila.insertCell(1).innerHTML = persona.edad;
        });
    }
    buscar(id){
        let busqueda = document.getElementById(id).value;
        this.personas = this.personasBk;
        this.personas = this.personas.filter(persona => {
            return persona.nombre.toLowerCase().indexOf(busqueda) > -1;
        });
        this.onInit();
    }
}
let busqueda = new Busqueda();
let form = document.getElementById('buscarCliente');
form.addEventListener('submit', () => {
    busqueda.buscar('cliente');
})
*/