import {onGetTasks} from './firebase.js'

const tasksContainer = document.getElementById("tasks-container");
const groupOfMedicines = [];

window.addEventListener('DOMContentLoaded', async () => {
    
    onGetTasks((querySnapshot) => {
        let html = "";

        //const querySnapshot = await getTasks();
        querySnapshot.forEach(doc => {
            const medicine = doc.data();
            const idMedicine = doc._key.path.segments[6];

            groupOfMedicines.push(medicine);

            html += `
            <div id="${idMedicine}" class="medicine" onclick="consultarMedicina(id)">
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