import {onGetTasks} from './firebase.js'

const tasksContainer = document.getElementById("tasks-container");
const groupOfMedicines = [];

window.addEventListener('DOMContentLoaded', async () => {
    
    onGetTasks((querySnapshot) => {
        let html = "";

        //const querySnapshot = await getTasks();
        querySnapshot.forEach(doc => {
            const medicine = doc.data();
            medicine.id = doc._key.path.segments[6];
            groupOfMedicines.push(medicine);

            html += `
            <div id="${medicine.id}" class="medicine" onclick="consultarMedicina(id)">
                <img class="imageMecicine" src="${medicine.image}">
                <div class="containerText">
                    <p class="tittleMedicine">${medicine.name}</p>
                    <p class="descriptionMedicine">${medicine.description}</p>
                </div>
            </div>
            `
        })

        tasksContainer.innerHTML = html;
    })
})

const inputConsult = document.querySelector("#inputConsult");
const buttonConsult = document.querySelector("#buttonConsult");

const filtrar = () =>  {
    tasksContainer.innerHTML = "";
    let textUser = inputConsult.value.toLowerCase();

    for (let medicine of groupOfMedicines) {
        let name = medicine.name.toLowerCase();

        if (name.indexOf(textUser) !== -1) {

            tasksContainer.innerHTML += `
            <div id="${medicine.id}" class="medicine" onclick="consultarMedicina(id)">
                <img class="imageMecicine" src="${medicine.image}">
                <div class="containerText">
                    <p class="tittleMedicine">${medicine.name}</p>
                    <p class="descriptionMedicine">${medicine.description}</p>
                </div>
            </div>
            `
        }   
    }

    if ( tasksContainer.innerHTML === "") {
        tasksContainer.innerHTML += `
            <div class="medicine">
                <div class="containerText">
                    <p class="tittleMedicine">No se encontraron productos con la palabra clave...</p>
                </div>
            </div>
            `
    }
}

buttonConsult.addEventListener("click", filtrar);
inputConsult.addEventListener("keyup", filtrar);

filtrar();