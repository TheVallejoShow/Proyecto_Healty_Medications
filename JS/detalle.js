import { getItemById } from './firebase.js'

var idMedicine = sessionStorage.getItem("idMedicine");
var medicine = await getItemById(idMedicine);
console.log(medicine);

const name = medicine.name
const description = medicine.description;
const precautions = medicine.precautions;
const image = medicine.image;
const price = medicine.price;
const place = medicine.place;

const containerMedicine = document.getElementById("containerMedicine");

let html = "";

html += 
    `
    <div id="${idMedicine}" class="medicine">
        <p class="tittleMedicine">${name}</p>
        <div class="containerInformation">
            <img class="imageMecicine" src="${image}">
            <div class="containerText">
                <p class="descriptionMedicine">${description}</p>
                <p class="">${precautions}</p>
            </div>
        </div>
        <div class="containerPrice">
            <p class="textPrice">Precio: ${price}</p>
        </div>
        <div class="containerPlace">
            <p class="textPlace">Lugar de Compra:</p>
            <iframe src="${place}" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
    `

containerMedicine.innerHTML = html;