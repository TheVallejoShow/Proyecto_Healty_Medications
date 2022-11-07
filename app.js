import {saveTask, getTasks, onGetTasks, deleteMedicine, getMedicine, updateMedicine} from './JS/firebase.js'

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

let editStatus = false;
let id_Medicine = "";

window.addEventListener('DOMContentLoaded', async () => {
    
    onGetTasks((querySnapshot) => {
        let html = "";

        //const querySnapshot = await getTasks();
        querySnapshot.forEach(doc => {
            //console.log(doc.data());
            const medicine = doc.data();
            const idMedicine = doc._key.path.segments[6];
            
            html += `
                <div id="${idMedicine}" class="medicine">
                    <img class="imageMecicine" src="${medicine.image}">
                    <div class="containerText">
                        <p class="tittleMedicine">${medicine.name}</p>
                        <p class="descriptionMedicine">${medicine.description}</p>
                    </div>
                    <div>
                        <button id-button="${doc.id}" class="buttonEdit btn btn-success">Editar</button>
                        <button id-button="${doc.id}" class="buttonDelete btn btn-danger">Eliminar</button>
                    </div>
                </div>
            `
        })
    
        tasksContainer.innerHTML = html;
        
        const btnsDelete = tasksContainer.querySelectorAll(".buttonDelete");

        btnsDelete.forEach( btn => {
            btn.addEventListener("click", (event)  => {
                const idMedicine = event.target.attributes[0].value;
                deleteMedicine(idMedicine);
            })
        });

        const btnsEdit = tasksContainer.querySelectorAll(".buttonEdit");
        btnsEdit.forEach( btn => {
            btn.addEventListener("click", async (event)  => {
                const idMedicine = event.target.attributes[0].value;
                const doc = await getMedicine(idMedicine);
                const medicine = doc.data();
                
                taskForm['nameMedicine'].value = medicine.name;
                taskForm['desciptionMedicine'].value = medicine.description;
                taskForm['precautionsMedicine'].value = medicine.precautions;
                taskForm['imageMedicine'].value = medicine.image;
                taskForm['priceMedicine'].value = medicine.price;
                taskForm['placeMedicine'].value = medicine.place;

                editStatus = true;
                id_Medicine = doc.id;

                //taskForm['btn-task-save'].innerText = "Actualizar";
            })

        })
    })
})


const buttonPrueba = document.getElementById("btn-task-save");

buttonPrueba.addEventListener("click", (event) => {
    // No se refrescara el formulario
    event.preventDefault()

    const name = taskForm['nameMedicine'];
    const description = taskForm['desciptionMedicine'];
    const precautions = taskForm['precautionsMedicine'];
    const image = taskForm['imageMedicine'];
    const price = taskForm['priceMedicine'];
    const place = taskForm['placeMedicine'];

    if(!editStatus) {
        saveTask(name.value, description.value, precautions.value, image.value, price.value, place.value);
    } else {
        updateMedicine(id_Medicine, {name: name.value, description: description.value, precautions: precautions.value, image: image.value, price: price.value, place: place.value})
        //taskForm['btn-task-save'].innerText = "Guardar";
        editStatus = false;
    }

    taskForm.reset();
})