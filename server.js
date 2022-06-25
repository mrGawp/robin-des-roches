const express = require("express");
const nodemailer = require("nodemailer");
const multer = require('multer');
const path = require('path');
var fs = require('fs');
const hbs = require('nodemailer-express-handlebars');
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.static('pub'));
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/pub/index.html')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
  console.log(`>>> http://127.0.0.1:${PORT}`)
});





const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});
const upload = multer({
  storage: storage,
}).array('name', 25);


app.post('/upload', upload);
app.post('/upload', (req, res) => {
  res.json("response");
});





app.post('/', (req, res) => {
//console.log(req.body)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  }
});


const handlebarOptions = {
  viewEngine: {
      partialsDir: path.resolve('./sendEmails/views/layouts/'),
      defaultLayout: false,
  },
  viewPath: path.resolve('./sendEmails/views/layouts/'),
};

// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions))


const mail_data = {
from: process.env.EMAIL,
to: process.env.S_EMAIL,
subject: `Quote request: ${req.body.first_name} ${req.body.last_name}`,
template: 'custData',
context: {
  priceGraph: req.body.priceViewer,
  reqTime: req.body.timeSent,

  firstName: req.body.first_name,
  lastName: req.body.last_name,
  companyName: req.body.companyName,
  email: req.body.email,
  phoneNumber: req.body.phonenumber,

  address: req.body.address,
  city: req.body.city,
  province: req.body.province,
  postalCode: req.body.postalCode,

  date: req.body.startDate,

  services: req.body.services.toString().replace(/,/g, ''),

  info: req.body.info,

  totalBefore: req.body.total,
  totalAfter: req.body.total_dc,
},
  attachments: req.body.linkedImgs
  }


const mail_customer = {
from: process.env.EMAIL,
to: req.body.email,
subject: `Robin des roches - quote`,
template: 'email',
context: {
  lastname: req.body.last_name,
  postalCode: req.body.postalCode,
  phone: req.body.phonenumber,
  total: req.body.total_dc,
  services: req.body.customerServices.toString().replace(/,/g, '')
},
attachments: [
  {
    filename: 'logo.png',
    path: './sendEmails/images/logo.png',
    cid: 'logo'
  },
  {
    filename: 'contactUs.png',
    path: './sendEmails/images/contactUs.png',
    cid: 'contactUs'
  },
  {
    filename: 'facebookIcon.png',
    path: './sendEmails/images/facebookIcon.png',
    cid: 'facebook'
  },
  {
    filename: 'instagramIcon.png',
    path: './sendEmails/images/instagramIcon.png',
    cid: 'instagram'
  },
  {
    filename: 'locationIcon.png',
    path: './sendEmails/images/locationIcon.png',
    cid: 'location'
  },
  {
    filename: 'phoneIcon.png',
    path: './sendEmails/images/phoneIcon.png',
    cid: 'phone'
  },
  {
    filename: 'laptopCodeIcon.png',
    path: './sendEmails/images/laptopCodeIcon.png',
    cid: 'codeIcon'
  }
]
    }
  transporter.sendMail(mail_customer, (err, info) => {
    if (err) {
      console.log(err, "something went wrong. < mail customer");
      res.send("something went wrong.");
    } else {
      console.log(`\nNew request: ${req.body.timeSent}\nCustomer: ${req.body.first_name} ${req.body.last_name}\nemail sent to customer`)
      sendMailData();
    }
  });

  function sendMailData() {
  transporter.sendMail(mail_data, (err, info) => {
    if (err) {
      clearUploads();
      console.log(err, "something went wrong. < mail data");
      res.send("something went wrong.");
    } else {
      clearUploads();
      console.log(`data email sent\ndone`)
      res.send("success");
    }
  });
}

}); //end email post



const clearUploads = () => {
  const directory = './uploads';
      fs.readdir(directory, (err, files) => {
        if (err) throw err;
      
        for (const file of files) {
          fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
            });
           }
         })
      };
  