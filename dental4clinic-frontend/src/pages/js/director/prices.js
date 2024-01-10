import { post } from "../core/rest.js";
import {cretePriceContent, currentPrice, initPrices, pricesDialog} from "../core/page/prices.js";

const createForm = document.getElementById("create-form");
const editForm = document.getElementById("edit-form");

initPrices();

const createPriceDialog = document.querySelector('#createPriceDialog');
document.querySelector('#openCreatePriceDialog').onclick = () => {
  createPriceDialog.style.display = 'flex';
  createPriceDialog.show();
}
document.querySelector('#createPriceDialogClose').onclick = () => {
  createPriceDialog.style.display = null;
  createPriceDialog.close();
}
document.querySelector('#createPriceDialogSave').onclick = () => {
  const createPriceBody = {
    name: createForm.name.value,
    cost: createForm.cost.value,
    description: createForm.description.value,
    pluses: createForm.pluses.value
  }
  post('price/create', createPriceBody).then((data) => {
    cretePriceContent(data);
    createPriceDialog.style.display = null;
    createPriceDialog.close();
  }).catch((error) => console.error(error))
}

const editPriceDialog = document.querySelector('#editPriceDialog');
document.querySelector('#openEditPriceDialog').onclick = () => {
  pricesDialog.style.display = null;
  pricesDialog.close();
  editForm.nameEdit.value = currentPrice.name
  editForm.costEdit.value = currentPrice.price
  editForm.descriptionEdit.value = currentPrice.description
  editForm.plusesEdit.value = currentPrice.pluses
  editPriceDialog.style.display = 'flex';
  editPriceDialog.show();
}
document.querySelector('#editPriceDialogClose').onclick = () => {
  editPriceDialog.style.display = null;
  editPriceDialog.close();
}
document.querySelector('#editPriceDialogSave').onclick = () => {
  const editPriceBody = {
    name: editForm.nameEdit.value,
    cost: editForm.costEdit.value,
    description: editForm.descriptionEdit.value,
    pluses: editForm.plusesEdit.value
  }
  post('price/edit', editPriceBody).then((data) => {
    cretePriceContent(data);
    createPriceDialog.style.display = null;
    createPriceDialog.close();
  }).catch((error) => console.error(error))
  editPriceDialog.style.display = null;
  editPriceDialog.close();
}

const deletePriceDialog = document.querySelector('#deletePriceDialog');
document.querySelector('#openDeletePriceDialog').onclick = () => {
  pricesDialog.style.display = null;
  pricesDialog.close();
  deletePriceDialog.style.display = 'flex';
  deletePriceDialog.show();
}
document.querySelector('#deletePriceDialogClose').onclick = () => {
  post('price/delete', currentPrice).then((data) => {
    cretePriceContent(data);
    createPriceDialog.style.display = null;
    createPriceDialog.close();
  }).catch((error) => console.error(error))
  deletePriceDialog.style.display = null;
  deletePriceDialog.close();
}
document.querySelector('#backButtonDeletePriceDialogClose').onclick = () => {
  deletePriceDialog.style.display = null;
  deletePriceDialog.close();
  pricesDialog.style.display = 'flex';
  pricesDialog.show();
}
