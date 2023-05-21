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
    location.assign('/user/user.html')
  } else if (role === "DOCTOR") {
    location.assign('/doctor/doctor.html')
  } else if (role === "ADMIN") {
    location.assign('/admin/admin.html')
  } else if (role === "DIRECTOR") {
    location.assign('/director/director.html')
  } else {
    location.assign('/unauthorized/unauthorized.html')
  }
}
