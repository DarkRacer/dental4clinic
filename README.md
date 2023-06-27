# Dental4Clinic
Dental4Clinic is a service for dental clinics.

Dental4Clinic automates the clinic's work processes to reduce paperwork and improve quality in the processes of customer service and running a dental business.

Demo site https://67a9-46-164-217-97.ngrok-free.app/

## Routing

### Main Routes
/home - home page

/login - Login page

/registration - Registration page

/profile/{id} - Profile page of user(user, admin, director) by id

/profile/{id}/edit - Edit profile page of user(user, admin, director) by id

### Unauthorized Routes (/unauthorized)

/appointments/create -  Create appointment page

/prices - Prices of services page

/doctors - Doctors page

/clinic/info - Info about clinic page

### User Routes (/user)
/appointments -  Patient's appointments to the doctor page

/appointments/create -  Create appointment page

/payments - Payments of services page

/prices - Prices of services page

/doctors - Doctors page

/clinic/info - Info about clinic page

### Doc Routes (/doctor)
/reception - reception of patients page

/reception/{id appointments} - reception of patient page by appointments id

### Admin Routes (/admin)
/user/create - Create user page

/appointments/create -  Create appointment page

/record/list - Doctor's appointments page

/prices - Prices of services page

/doctors - Doctors page

/payments - payments check page


### Director Routes (/director)
/record/list - Doctor's appointments page

/requests - Requests page

/prices - Prices of services page

/doctors - Doctors page

/admins - Admins page


## Use Cases
![image](https://github.com/DarkRacer/dental4clinic/assets/56476550/32f5e8e8-83cd-4fc5-b0ea-2926a6e00fa7)

## Local start
You can use [docker](https://github.com/DarkRacer/dental4clinic/blob/master/docker-compose.yaml) or run [app.cjs](https://github.com/DarkRacer/dental4clinic/blob/master/app.cjs)

## Stubs

All expected backend responses are presented in [/stub](https://github.com/DarkRacer/dental4clinic/tree/master/stub)

For stub responses, you can use:
- Server https://af2f-46-164-217-97.ngrok-free.app/
- Fiddler4 with import [fiddler_script](https://github.com/DarkRacer/dental4clinic/blob/master/stub/fiddler_dental4clinic.farx)
- Run [stub-server.cjs](https://github.com/DarkRacer/dental4clinic/blob/master/stub/stub-server.cjs)


## More Information

Figma https://www.figma.com/file/0Ehn0619zN6gwgbh5yDsHH/Dental4Clinic?type=design&node-id=0%3A1&mode=design&t=yJxzctvsAmngOsiD-1

[Info about all pages ](https://github.com/DarkRacer/dental4clinic/blob/master/doc/info-about-pages.xlsx)

