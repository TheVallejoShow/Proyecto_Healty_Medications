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
            html += `
                <div class="medicine">
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
                taskForm['imageMedicine'].value = medicine.image;

                editStatus = true;
                id_Medicine = doc.id;

                taskForm['btn-task-save'].innerText = "Actualizar";
            })

        })
    })
})


taskForm.addEventListener("submit", (event) => {
    // No se refrescara el formulario
    event.preventDefault()

    const name = taskForm['nameMedicine'];
    const description = taskForm['desciptionMedicine'];
    const image = taskForm['desciptionMedicine'];

    if(!editStatus) {
        saveTask(name.value, description.value, image.value);
    } else {
        updateMedicine(id_Medicine, {name: name.value, description: description.value, description: image.value})
        taskForm['btn-task-save'].innerText = "Guardar";
        editStatus = false;
    }

    taskForm.reset();
})