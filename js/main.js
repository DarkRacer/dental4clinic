import {GetCookie, GetUrl} from "./service/service";

export function LoadPage() {
  var token = GetCookie("access_token")
  debugger
  if (token) {
    GetUrl('role')
      .then(data => {
        SelectFunctionalByRole(data['role'])
      })
      .catch((error) => {
        console.error('Error:', error);
        location.assign('/unauthorized/unauthorized.html')
      });
  } else {
    location.assign('/unauthorized/unauthorized.html')
  }
}


export function SelectFunctionalByRole(role) {
  if (role === "USER") {
    location.assign('/user/home')
  } else if (role === "DOCTOR") {
    location.assign('/doctor/home')
  } else if (role === "ADMIN") {
    location.assign('/admin/home')
  } else if (role === "DIRECTOR") {
    location.assign('/director/home')
  } else {
    location.assign('/unauthorized/home')
  }
}
