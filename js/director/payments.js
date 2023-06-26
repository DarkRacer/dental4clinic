import { post } from "../core/rest.js";
import {getSelectedPayment, initPayments, updatePaymentsTableValue} from "../core/page/payments.js";

initPayments()

const deleteDialog = document.querySelector('#deleteDialog');
document.querySelector('#openDeleteDialog').onclick = () => {
  deleteDialog.style.display = 'flex';
  deleteDialog.show();
}
document.querySelector('#deleteDialogClose').onclick = () => {
  const selectedPayment = getSelectedPayment();
  if (selectedPayment) {
    post('payments/delete', selectedPayment).then((data) => {
      updatePaymentsTableValue(data)
    }).catch((error) => console.error(error))
  }
  deleteDialog.style.display = null;
  deleteDialog.close();
}
document.querySelector('#backButtonDeleteDialogClose').onclick = () => {
  deleteDialog.style.display = null;
  deleteDialog.close();
}
