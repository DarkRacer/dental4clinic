const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

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


app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
