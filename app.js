const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/', express.static(__dirname));

/* Main Routes */
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});
router.get('/login',function(req,res){
  res.sendFile(path.join(__dirname+'/login.html'));
});

router.get('/registration',function(req,res){
  res.sendFile(path.join(__dirname+'/registration.html'));
});

/* Routes to resources */
router.get('/unauthorized/css/main.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css/main.css'));
});
router.get('/unauthorized/img/logo.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/logo.png'));
});
router.get('/unauthorized/img/user-logo.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/user-logo.png'));
});
router.get('/unauthorized/img/phone.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/phone.png'));
});
router.get('/unauthorized/img/point-plus.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/point-plus.png'));
});
router.get('/unauthorized/img/time.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/time.png'));
});
router.get('/unauthorized/img/marker.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/marker.png'));
});
router.get('/unauthorized/img/vk.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/vk.png'));
});
router.get('/unauthorized/img/whatsapp.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/whatsapp.png'));
});
router.get('/unauthorized/img/ok.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/ok.png'));
});
router.get('/unauthorized/img/telegram.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/telegram.png'));
});


router.get('/user/css/main.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css/main.css'));
});
router.get('/user/img/logo.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/logo.png'));
});
router.get('/user/img/user-logo.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/user-logo.png'));
});
router.get('/user/img/phone.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/phone.png'));
});
router.get('/user/img/point-plus.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/point-plus.png'));
});
router.get('/user/img/time.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/time.png'));
});
router.get('/user/img/marker.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/marker.png'));
});
router.get('/user/img/vk.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/vk.png'));
});
router.get('/user/img/whatsapp.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/whatsapp.png'));
});
router.get('/user/img/ok.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/ok.png'));
});
router.get('/user/img/telegram.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/telegram.png'));
});
router.get('/user/img/user-photo.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/user-photo.png'));
});
router.get('/profile/img/logo.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/logo.png'));
});
router.get('/profile/img/user-photo.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/user-photo.png'));
});
router.get('/profile/img/phone.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/phone.png'));
});
router.get('/user/img/arrow.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/arrow.png'));
});


router.get('/doctor/img/logo.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/logo.png'));
});
router.get('/doctor/img/user-photo.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/user-photo.png'));
});
router.get('/doctor/img/phone.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/phone.png'));
});
router.get('/doctor/img/point-plus.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/point-plus.png'));
});
router.get('/doctor/img/tooth-picture.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/tooth-picture.png'));
});
router.get('/doctor/img/arrow.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/arrow.png'));
});


router.get('/admin/img/logo.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/logo.png'));
});
router.get('/admin/img/user-photo.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/user-photo.png'));
});
router.get('/admin/img/phone.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/phone.png'));
});
router.get('/admin/img/point-plus.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/point-plus.png'));
});
router.get('/admin/img/arrow.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/arrow.png'));
});


router.get('/director/img/logo.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/logo.png'));
});
router.get('/director/img/user-photo.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/user-photo.png'));
});
router.get('/director/img/phone.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/phone.png'));
});
router.get('/director/img/point-plus.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/point-plus.png'));
});
router.get('/director/img/arrow.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/arrow.png'));
});



/* Routes for Unauthorized user */
router.get('/unauthorized/home',function(req,res){
  res.sendFile(path.join(__dirname+'/unauthorized/unauthorized.html'));
});
router.get('/unauthorized/appointments/create',function(req,res){
  res.sendFile(path.join(__dirname+'/unauthorized/appointments-create.html'));
});
router.get('/unauthorized/css/unauthorized/appointments-create.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css/unauthorized/appointments-create.css'));
});
router.get('/unauthorized/doctors',function(req,res){
  res.sendFile(path.join(__dirname+'/unauthorized/doctors.html'));
});
router.get('/unauthorized/prices',function(req,res){
  res.sendFile(path.join(__dirname+'/unauthorized/prices.html'));
});
router.get('/unauthorized/clinic/info',function(req,res){
  res.sendFile(path.join(__dirname+'/unauthorized/about.html'));
});
router.get('/unauthorized/css/unauthorized/about.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css/unauthorized/about.css'));
});
router.get('/unauthorized/js/unauthorized/appointments-create.js',function(req,res){
  res.sendFile(path.join(__dirname+'/js/unauthorized/appointments-create.js'));
});



/* Routes for User */
router.get('/user/home',function(req,res){
  res.sendFile(path.join(__dirname+'/user/main-page.html'));
});
router.get('/user/appointments/create',function(req,res){
  res.sendFile(path.join(__dirname+'/user/appointments-create.html'));
});
router.get('/user/css/user/appointments-create.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css/user/appointments-create.css'));
});
router.get('/user/js/user/appointments-create.js',function(req,res){
  res.sendFile(path.join(__dirname+'/js/user/appointments-create.js'));
});
router.get('/user/doctors',function(req,res){
  res.sendFile(path.join(__dirname+'/user/doctors.html'));
});
router.get('/user/prices',function(req,res){
  res.sendFile(path.join(__dirname+'/user/prices.html'));
});
router.get('/user/clinic/info',function(req,res){
  res.sendFile(path.join(__dirname+'/user/about.html'));
});
router.get('/profile/1',function(req,res){
  res.sendFile(path.join(__dirname+'/user/profile.html'));
});
router.get('/profile/1/edit',function(req,res){
  res.sendFile(path.join(__dirname+'/user/profile-edit.html'));
});
router.get('/user/appointments',function(req,res){
  res.sendFile(path.join(__dirname+'/user/appointments.html'));
});
router.get('/user/payments',function(req,res){
  res.sendFile(path.join(__dirname+'/user/payments.html'));
});
router.get('/user/css/user/about.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css/user/about.css'));
});
router.get('/profile/css/user/profile-edit.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css/user/profile-edit.css'));
});
router.get('/profile/js/user/profile-edit.js',function(req,res){
  res.sendFile(path.join(__dirname+'/js/user/profile-edit.js'));
});
router.get('/profile/css/main.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css/main.css'));
});



/* Routes for Doctor */
router.get('/doctor/home',function(req,res){
  res.sendFile(path.join(__dirname+'/doctor/main-page.html'));
});
router.get('/doctor/reception',function(req,res){
  res.sendFile(path.join(__dirname+'/doctor/reception.html'));
});
router.get('/doctor/reception/1',function(req,res){
  res.sendFile(path.join(__dirname+'/doctor/reception-patient.html'));
});
router.get('/profile/css/doctor/profile-edit.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css/doctor/profile-edit.css'));
});
router.get('/profile/2',function(req,res){
  res.sendFile(path.join(__dirname+'/doctor/profile.html'));
});
router.get('/profile/2/edit',function(req,res){
  res.sendFile(path.join(__dirname+'/doctor/profile-edit.html'));
});
router.get('/doctor/css/doctor/reception-patient.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css/doctor/reception-patient.css'));
});
router.get('/doctor/css/main.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css/main.css'));
});
router.get('/profile/js/doctor/profile-edit.js',function(req,res){
  res.sendFile(path.join(__dirname+'/js/doctor/profile-edit.js'));
});
router.get('/doctor/js/doctor/reception-patient.js',function(req,res){
  res.sendFile(path.join(__dirname+'/js/doctor/reception-patient.js'));
});



/* Routes for Admin */
router.get('/admin/home',function(req,res){
  res.sendFile(path.join(__dirname+'/admin/main-page.html'));
});
router.get('/admin/appointments/create',function(req,res){
  res.sendFile(path.join(__dirname+'/admin/appointments-create.html'));
});
router.get('/admin/css/admin/appointments-create.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css/admin/appointments-create.css'));
});
router.get('/admin/doctors',function(req,res){
  res.sendFile(path.join(__dirname+'/admin/doctors.html'));
});
router.get('/admin/prices',function(req,res){
  res.sendFile(path.join(__dirname+'/admin/prices.html'));
});
router.get('/profile/3',function(req,res){
  res.sendFile(path.join(__dirname+'/admin/profile.html'));
});
router.get('/profile/3/edit',function(req,res){
  res.sendFile(path.join(__dirname+'/admin/profile-edit.html'));
});
router.get('/admin/payments',function(req,res){
  res.sendFile(path.join(__dirname+'/admin/payments.html'));
});
router.get('/profile/css/admin/profile-edit.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css/admin/profile-edit.css'));
});
router.get('/admin/record/list',function(req,res){
  res.sendFile(path.join(__dirname+'/admin/record-list.html'));
});
router.get('/admin/css/admin/record-list.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css/admin/record-list.css'));
});
router.get('/admin/user/create',function(req,res){
  res.sendFile(path.join(__dirname+'/admin/user-create.html'));
});
router.get('/admin/css/admin/user-create.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css/admin/user-create.css'));
});
router.get('/admin/css/main.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css/main.css'));
});
router.get('/admin/js/admin/user-create.js',function(req,res){
  res.sendFile(path.join(__dirname+'/js/admin/user-create.js'));
});
router.get('/profile/js/admin/profile-edit.js',function(req,res){
  res.sendFile(path.join(__dirname+'/js/admin/profile-edit.js'));
});
router.get('/admin/js/admin/record-list.js',function(req,res){
  res.sendFile(path.join(__dirname+'/js/admin/record-list.js'));
});
router.get('/admin/js/admin/appointments-create.js',function(req,res){
  res.sendFile(path.join(__dirname+'/js/admin/appointments-create.js'));
});



/* Routes for Director */
router.get('/director/home',function(req,res){
  res.sendFile(path.join(__dirname+'/director/main-page.html'));
});
router.get('/director/payments',function(req,res){
  res.sendFile(path.join(__dirname+'/director/payments.html'));
});
router.get('/director/doctors',function(req,res){
  res.sendFile(path.join(__dirname+'/director/doctors.html'));
});
router.get('/director/admins',function(req,res){
  res.sendFile(path.join(__dirname+'/director/admins.html'));
});
router.get('/director/prices',function(req,res){
  res.sendFile(path.join(__dirname+'/director/prices.html'));
});
router.get('/director/payments',function(req,res){
  res.sendFile(path.join(__dirname+'/director/payments.html'));
});
router.get('/director/requests',function(req,res){
  res.sendFile(path.join(__dirname+'/director/requests.html'));
});
router.get('/director/css/main.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css/main.css'));
});
router.get('/director/record/list',function(req,res){
  res.sendFile(path.join(__dirname+'/director/record-list.html'));
});
router.get('/director/css/director/record-list.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css/director/record-list.css'));
});
router.get('/director/js/director/record-list.js',function(req,res){
  res.sendFile(path.join(__dirname+'/js/director/record-list.js'));
});
router.get('/profile/4',function(req,res){
  res.sendFile(path.join(__dirname+'/director/profile.html'));
});
router.get('/profile/4/edit',function(req,res){
  res.sendFile(path.join(__dirname+'/director/profile-edit.html'));
});
router.get('/profile/css/director/profile-edit.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css/director/profile-edit.css'));
});

app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
