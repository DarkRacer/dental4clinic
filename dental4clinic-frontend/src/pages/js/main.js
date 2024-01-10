import { get, token, selectFunctionalByRole } from "./core/rest.js";

let userId = '';

if (token) {
  get('role')
    .then(data => {
      userId = data.id;
      selectFunctionalByRole(data['role'])
    })
    .catch((error) => {
      console.error('Error:', error);
      location.assign('/unauthorized/home')
    });
} else {
  location.assign('/unauthorized/home')
}
