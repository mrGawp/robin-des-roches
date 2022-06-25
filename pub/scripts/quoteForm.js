

var calDate = "none";
document.addEventListener('DOMContentLoaded', function() {
var calendarEl = document.getElementById('calendar');
var calendar = new FullCalendar.Calendar(calendarEl, {
selectable: true,
longPressDelay: 0.5,
themeSystem: 'standard',
headerToolbar: {
  left: 'title',
  right: 'prev,next',
},
    aspectRatio: 1,
    showNonCurrentDates:false,
    fixedWeekCount:false,
    contentHeight:"auto",
    handleWindowResize:true,
    dateClick: function(info) {
      calDate = info.dateStr;
    document.querySelectorAll(".fc-daygrid-bg-harness").forEach(Element => {
      Element.classList.remove("fc-daygrid-bg-harness");
    })
    document.querySelectorAll(".fc-harness-text").forEach(Element => {
      Element.classList.remove("fc-harness-text");
    })
    document.querySelectorAll(".fc-day").forEach(Element => {
      let dataDate = Element.getAttribute('data-date');
      if (dataDate == calDate) {
        Element.querySelector('.fc-daygrid-day-bg').classList.add("fc-daygrid-bg-harness");
        Element.querySelector('.fc-daygrid-day-number').classList.add("fc-harness-text")
      }
    })
}
 
});
calendar.render();
});




document.querySelectorAll('.servPickCard_inner').forEach(Element => {
  Element.addEventListener('click', function() {
    var serviceTitleText = Element.getElementsByClassName('serviceTitles')[0].innerText;
    document.getElementById("service_Options_title").classList.remove("formP_titlesRequired");
    var secParent = Element.querySelector('.IconContainer');
    var secPlus = Element.querySelector('.icon-plus-1');
    var secCheck = Element.querySelector('.icon-check');

    if (secPlus.style.display == "none") {
      anime ({
        targets: Element,
        keyframes: [
          {translateX: -2},
          {translateX: 2},
          {translateX: -1},
          {translateX: 1},
          {translateX: 0},
        ],
        duration: 400
      });
      var serviceId = Element.parentElement.id;
      var getServiceId = serviceId.toString().replace(/_/g, ' ');
      document.querySelectorAll('.serviceTitle').forEach(Element => {
        if (getServiceId == Element.innerText) {
          Element.parentElement.remove();
          anime ({
            targets: secCheck,
            translateY: {value: '-9%', duration: 250},
            opacity: {value: 0, duration: 500},
            complete: function() {
              secPlus.style.display = "block";
              var servicesContainer = document.getElementById("services_container");
              var services_children = servicesContainer.children.length;
              if (services_children < 3) {
                noServices_para.style.display = "block";
                anime ({
                  targets: noServices_para,
                  opacity: 0.5,
                  easing: "easeInQuad",
                  duration: 200,
              })
             }
            }
          })
        }
      })

    } else {
    anime ({
      targets: Element,
      keyframes: [
        {translateY: '-3%', scale: 0.95},
        {translateY: '1%'},
        {translateY: '-1.5%'},
        {translateY: '0.5%'},
        {translateY: '-0.4%', scale: 1},
        {translateY: '0'}
      ],
      easing: 'easeInOutQuad',
      duration: 600
    })

    var addServiceTL = anime.timeline({
      easing: 'easeOutExpo',
    });
    addServiceTL
    .add({
      targets: secParent,
      translateY: '-9%',
      scale: 0.5,
      opacity: 0,
      duration: 200,
      complete: function() {
        if (secPlus.style.display == "" || secPlus.style.display == "block") {
        addItemToCart (serviceTitleText);
        secPlus.style.display = "none";
        }
      }
    })
    .add ({
      targets: secParent,
      translateY: '0',
      scale: 1,
      opacity: 1,
      duration: 0,
    })
    .add ({
      targets: secCheck,
      keyframes: [
        {translateY: '-9%', scale: 0, opacity: 0, duration: 150},
        {translateY: '0', scale: 1, opacity: 0.4, duration: 150}
      ],
      duration: 100
    })
  }
  })
})


const addService = document.getElementsByClassName('servPickCard_inner');
const noServices_para = document.getElementById("noServices_id");
var varTitleService = document.getElementsByClassName('serviceTitle');
function addItemToCart (serviceTitle) {
  var productRow = document.createElement('div');
  productRow.classList.add('ServiceContainer_p');
  var productRows = document.getElementById('services_container');

  //for "no services added"
  anime ({
    targets: noServices_para,
    opacity: 0,
    easing: "easeInQuad",
    duration: 200,
    complete: function() {
      noServices_para.style.display = "none";
    }
  })


  switch (serviceTitle) {
      case "Réparation du pavé":
        cartRowItems = `
        <h3 class="serviceTitle">Réparation du pavé</h3>
        <div class="serviceInputContainer">
        <input class="serviceEdit" id="interlock_Length" placeholder="Longueur" type="number" min="1" max="1500" onkeyup="calc_interlockSft(this.value);">
        <input class="serviceEdit" id="interlock_Width" placeholder="Largeur" type="number" min="1" max="1500" onkeyup="calc_interlockSft(this.value);">
        <input class="checkService serviceEdit getServiceInput" id="interlock_squareFeet" placeholder="0" type="number" min="5" max="1500" required>
        <label for="serviceEdit" class="yourServicesLabelAbsolute">pi²</label>
         </div>
         <button class="deleteServiceButton" type="button"><i class="icon-cancel-1"></i></button> 
            `;
      break;
      case "Réparation des marches":
        cartRowItems = `
        <h3 class="serviceTitle">Réparation des marches</h3>
        <div class="serviceInputContainer">
        <input class="checkService serviceEdit getServiceInput" placeholder="0" type="number" min="1" max="100" required>
        <label for="serviceEdit" class="yourServicesLabelAbsolute">Montant</label>
         </div>
         <button class="deleteServiceButton" type="button"><i class="icon-cancel-1"></i></button> 
            `;
      break;
      default:
        cartRowItems = `
        <h3 class="serviceTitle">${serviceTitle}</h3>
        <div class="serviceInputContainer">
        <input class="checkService serviceEdit getServiceInput" placeholder="0" type="number" min="1" max="100" required>
        <label for="serviceEdit" class="yourServicesLabelAbsolute">Montant</label>
         </div>
         <button class="deleteServiceButton" type="button"><i class="icon-cancel-1"></i></button> 
            `;
  }
  productRow.innerHTML = cartRowItems;
  productRows.append(productRow);
  productRow.querySelector('.deleteServiceButton').addEventListener('click', removeItem)
}


function removeItem (Element) {
  btnClicked = Element.target;
  let targetServiceTitle = Element.target.parentElement.querySelector('.serviceTitle');
  let targetServiceId_before = targetServiceTitle.innerText;
  let targetServiceId_after = targetServiceId_before.toString().replace(/ /g, '_');
  let gotTargetId = document.getElementById(targetServiceId_after);

  anime ({
    targets: gotTargetId,
    keyframes: [
      {translateX: -2},
      {translateX: 2},
      {translateX: -1},
      {translateX: 1},
      {translateX: 0},
    ],
    duration: 400
  });

  let dsecOk = gotTargetId.querySelector('.icon-check');
  var secplus = gotTargetId.querySelector('.icon-plus-1');

  anime ({
    targets: dsecOk,
    translateY: {value: '-9%', duration: 250},
    opacity: {value: 0, duration: 500},
    complete: function() {
      secplus.style.display = "block";
    }
  })

  btnClicked.parentElement.remove();

  var servicesContainer = document.getElementById("services_container");
  var services_children = servicesContainer.children.length;
  if (services_children < 3) {
    noServices_para.style.display = "block";
    anime ({
      targets: noServices_para,
      opacity: 0.5,
      easing: "easeInQuad",
      duration: 200,
  })
 }
};




function calc_interlockSft() {
  var w, l = 1;
  l = document.getElementById("interlock_Length").value;
  w = document.getElementById("interlock_Width").value;
  document.getElementById("interlock_squareFeet").value = Math.round(w * l);
}



//dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop
//dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop
//dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop  dragAndDrop
const initApp = () => {
  const droparea = document.querySelector('.droparea');
  const active = () => droparea.classList.add("fileHover_border");
  const inactive = () => droparea.classList.remove("fileHover_border");
  const prevents = (e) => e.preventDefault();
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evtName => {
      droparea.addEventListener(evtName, prevents);
  });
  ['dragenter', 'dragover'].forEach(evtName => {
      droparea.addEventListener(evtName, active);
  });
  ['dragleave', 'drop'].forEach(evtName => {
      droparea.addEventListener(evtName, inactive);
  });
  droparea.addEventListener("drop", handleDrop);
}
document.addEventListener("DOMContentLoaded", initApp);

var uploadFiles_arr = [];
var uploadFiles_arrName = [];
var uploadFiles_size = [];
var uploadFiles_Name = [];
var uploadFiles_arrData = [];
const handleDrop = (e) => {
  const dt = e.dataTransfer;
  const dragDrop_file = dt.files;
  for (let i = 0; i < dragDrop_file.length; i++) {
      uploadFiles_arr.push(dragDrop_file[i])
    }
    handleFiles()
}
const fileSelector = document.getElementById('file-upload');
fileSelector.addEventListener('change', (event) => {
  const clickUpload_file = event.target.files;
  for (let i = 0; i < clickUpload_file.length; i++) {
    uploadFiles_arr.push(clickUpload_file[i])
  }
  handleFiles()
});

const handleFiles = () => {
  document.getElementById("dragNdrop_iPara").style.display = "none";
  document.getElementById("dragNdrop_size").style.display = "block";
  var fileText = document.getElementById("dragNdrop_files");
  fileText.style.display = "block";
  
  uploadFiles_size = [];
  uploadFiles_Name = [];
  uploadFiles_arrName = [];
  uploadFiles_arrData = [];
  for (let i = 0; i < uploadFiles_arr.length; i++) {
    let parts = uploadFiles_arr[i].type.split('/');
    switch (parts[0].toString().toLowerCase()) {
      case 'image':
        uploadFiles_size.push(uploadFiles_arr[i].size)
        uploadFiles_Name.push(makeid(9)+"-"+Date.now()+"-"+uploadFiles_arr[i].name);
        uploadFiles_arrName.push(uploadFiles_arr[i].name)
        uploadFiles_arrData.push({
          filename: uploadFiles_Name[i],
          path: "./uploads/"+uploadFiles_Name[i]
          })
          fileText.innerText = "";
        break;
        default:
          document.querySelector('.dragNdrop_iNotAccepted').innerText = uploadFiles_arr[i].name+" is not an accepted file type";
          uploadFiles_arr.splice(i, 1);
          anime ({
            targets: '.dragNdrop_iNotAccepted',
            keyframes: [
              {opacity: 1, duration: 300},
              {opacity: 1},
              {opacity: 1},
              {opacity: 1},
              {opacity: 0}
            ],
            duration: 3000,
            easing: 'linear',
            complete: function() {
              return handleFiles();
            }
          })
          if (uploadFiles_arr.length < 1) {
          fileText.innerText = "Aucun fichier sélectionné";
          }
    }
}
    if (uploadFiles_arrName.length > 4) {
    var fileSlice = uploadFiles_arrName.slice(-4);
    var fileWhatsLeft = uploadFiles_arrName.length - 4;
    fileText.innerText += fileSlice.toString().replace(/,/g, ', ')+" et "+fileWhatsLeft+" plus de fichiers.";
    } else {
      fileText.innerText += uploadFiles_arrName.toString().replace(/,/g, ', ');
    }  
  let uploadFiles_sizeSum = 0;
  for (let i = 0; i < uploadFiles_size.length; i++) {
    uploadFiles_sizeSum += uploadFiles_size[i];
  }
  function bytesToSize(uploadFiles_sizeSum) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (uploadFiles_sizeSum == 0) return '0 Bytes';
    var i = parseInt(Math.floor(Math.log(uploadFiles_sizeSum) / Math.log(1024)));
    return Math.round(uploadFiles_sizeSum / Math.pow(1024, i), 2) + ' ' + sizes[i];
 }
document.getElementById("dragNdrop_size").innerText = bytesToSize(uploadFiles_sizeSum) + " / 50MB";

}

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}


//SubmitButton  SubmitButton  SubmitButton  SubmitButton  SubmitButton  SubmitButton SubmitButton   SubmitButton 
//SubmitButton  SubmitButton  SubmitButton  SubmitButton  SubmitButton  SubmitButton SubmitButton   SubmitButton 
//SubmitButton  SubmitButton  SubmitButton  SubmitButton  SubmitButton  SubmitButton SubmitButton   SubmitButton 
document.getElementById("submitButtonClick").addEventListener('click', function() {
  let uploadFiles_sizeSum = 0;
  for (let i = 0; i < uploadFiles_size.length; i++) {
    uploadFiles_sizeSum += uploadFiles_size[i];
  }
  if(uploadFiles_sizeSum > 50000000) {
    document.querySelector(".submitErr").innerText = "Taille de téléchargement trop grande !, essayez d'actualiser et de réessayer";
    return cancelSubmit();
   }
var inputChecker = 0;
var servicesContainer = document.getElementById("services_container");
var services_children = servicesContainer.children.length;
 document.querySelectorAll(".checkService").forEach(Element => {
    if(Element.value == 0) {
      inputChecker++;
    }
  })
 if (inputChecker == 0 && services_children >= 3) {
  serviceMath();
 } else if (inputChecker > 0 || services_children < 3) {
  document.querySelector(".submitErr").innerText = "*Paramètres manquants";
  cancelSubmit();
 }

 inputChecker = 0;
});



//serviceMathPrices  serviceMathPrices  serviceMathPrices  serviceMathPrices  serviceMathPrices  serviceMathPrices
//serviceMathPrices  serviceMathPrices  serviceMathPrices  serviceMathPrices  serviceMathPrices  serviceMathPrices
//serviceMathPrices  serviceMathPrices  serviceMathPrices  serviceMathPrices  serviceMathPrices  serviceMathPrices
function serviceMath() {
  document.querySelector('.submitSpan').style.display = "block";
    anime ({
      targets: '.submitSpan',
      width: anime.random(45, 60)+"%",
      easing: 'steps('+anime.random(5, 9)+')',
      duration: anime.random(1200, 2000)
    })
    if (uploadFiles_arr.length > 0) {
      upload()
    } else {
      sendMail()
    }
  }

  function sendMail() {
    var servicesCalcD = [];
    var servicesCustomerData = [];
    var servicePrices = [];
    document.querySelectorAll(".ServiceContainer_p").forEach(Element => {
        switch (Element.querySelector(".serviceTitle").innerText) {
          case 'Réparation du pavé':
            let interlock_Size = Element.querySelector(".getServiceInput").value;
            let interlock_L = document.getElementById("interlock_Length").value;
            let interlock_W = document.getElementById("interlock_Width").value;
            let interlock_price = interlock_Size * 20;
            if (interlock_Size > 25) {
              interlock_price = interlock_Size * 18.75;
            }
            if (interlock_Size > 40) {
              interlock_price = interlock_Size * 18;
            }
            if (interlock_Size > 50) {
              interlock_price = interlock_Size * 16.66;
            }
            let interlock_info = (
              "Réparation du pavé"+"\n"+
              "montant: "+interlock_Size+"ft²\n"+
              "largeur:"+interlock_W+"\n"+
              "longueur:"+interlock_L+"\n"+
              "prix: "+interlock_price+"$ \n\n"
            );
            let cutomer_interlockInfo = (
              "Réparation du pavé"+"\n"+
              "montant: "+interlock_Size+"ft²\n"+
              "prix: "+interlock_price+"$ \n\n"
            );
            servicesCustomerData.push(cutomer_interlockInfo)
            servicesCalcD.push(interlock_info);
            servicePrices.push(interlock_price)
          break
          case 'Réparation des marches':
            let stairRepair_Size = Element.querySelector(".getServiceInput").value;
            let stairRepair_price = stairRepair_Size * 150;
            let stairRepair_info = (
              "Réparation des marches"+"\n"+
              "montant: "+stairRepair_Size+"\n"+
              "prix: "+stairRepair_price+"$ \n\n"
            );
            let cutomer_stairRepairInfo = (
              "Réparation des marches"+"\n"+
              "montant: "+stairRepair_Size+"\n"+
              "prix: "+stairRepair_price+"$ \n\n"
            );
            servicesCustomerData.push(cutomer_stairRepairInfo)
            servicesCalcD.push(stairRepair_info)
            servicePrices.push(stairRepair_price)
          break
          case 'Entrée simple':
            let singleDrivway_Size = Element.querySelector(".getServiceInput").value;
            let singleDrivway_price = singleDrivway_Size * 1000;
            let singleDrivway_info = (
              "Entrée simple"+"\n"+
              "montant: "+singleDrivway_Size+"\n"+
              "prix: "+singleDrivway_price+"$ \n\n"
            );
            let cutomer_singleDrivwayInfo = (
              "Entrée simple"+"\n"+
              "montant: "+singleDrivway_Size+"\n"+
              "prix: "+singleDrivway_price+"$ \n\n"
            );
            servicesCustomerData.push(cutomer_singleDrivwayInfo)
            servicesCalcD.push(singleDrivway_info)
            servicePrices.push(singleDrivway_price)
          break
          case 'Entrée double':
            let doubleDrivway_Size = Element.querySelector(".getServiceInput").value;
            let doubleDrivway_price = doubleDrivway_Size * 1350;
            let doubleDrivway_info = (
              "Entrée double"+"\n"+
              "montant: "+doubleDrivway_Size+"\n"+
              "prix: "+doubleDrivway_price+"$ \n\n"
            );
            let cutomer_doubleDrivwayInfo = (
              "Entrée double"+"\n"+
              "montant: "+doubleDrivway_Size+"\n"+
              "prix: "+doubleDrivway_price+"$ \n\n"
            );
            servicesCustomerData.push(cutomer_doubleDrivwayInfo)
            servicesCalcD.push(doubleDrivway_info)
            servicePrices.push(doubleDrivway_price)
          break
          case 'Bordures de stationnement':
            let drivewayBorder_Size = Element.querySelector(".getServiceInput").value;
            let drivewayBorder_price = drivewayBorder_Size * 1150;
            let drivewayBorder_info = (
              "Bordures de stationnement"+"\n"+
              "montant: "+drivewayBorder_Size+"\n"+
              "prix: "+drivewayBorder_price+"$ \n\n"
            );
            let cutomer_drivewayBorderInfo = (
              "Bordures de stationnement"+"\n"+
              "montant: "+drivewayBorder_Size+"\n"+
              "prix: "+drivewayBorder_price+"$ \n\n"
            );
            servicesCustomerData.push(cutomer_drivewayBorderInfo)
            servicesCalcD.push(drivewayBorder_info)
            servicePrices.push(drivewayBorder_price)
          break
          default: 
          document.querySelector(".submitErr").innerText = "Une erreur s'est produite :(, essayez d'actualiser et de réessayer";
          return cancelSubmit();
      }
    })
      let servicePrices_Sum = 0;
      for (let i = 0; i < servicePrices.length; i++) {
        servicePrices_Sum += servicePrices[i];
      }
      var servicePrices_SumDevCut = servicePrices_Sum+50;

      var requestTime = Date.now().toString();
      var priceGraph = "$";
      if (servicePrices_Sum < 1500) {
        priceGraph = "$";
      }
      if (servicePrices_Sum >= 1500) {
        priceGraph = "$$";
      }
      if (servicePrices_Sum >= 2500) {
        priceGraph = "$$$";
      }

      var c_fname = document.getElementById("firstname").value;
      var c_lname = document.getElementById("lastname").value;
      var c_email = document.getElementById("email").value;
      var c_phonenumber = document.getElementById("phonenumber").value;
  
      var a_address = document.getElementById("address").value;
      var a_city = document.getElementById("city").value;
      var a_province = document.getElementById("province").value;
      var a_postalcode = document.getElementById("postalcode").value;
      
      var c_companyName = document.getElementById("companyName").value;
      if (c_companyName == '') {
        c_companyName = "none";
      }
      var moreInfo = document.getElementById("textbox").value
      if (moreInfo == '') {
        moreInfo = "none";
      }

      let formData = {
        first_name: c_fname,
        last_name: c_lname,
        companyName: c_companyName,
        email: c_email,
        phonenumber: c_phonenumber,
  
        address: a_address,
        city: a_city,
        province: a_province,
        postalCode: a_postalcode,
  
        services: servicesCalcD,
        customerServices: servicesCustomerData,
  
        startDate: calDate,
        info: moreInfo,
  
        total: servicePrices_Sum,
        total_dc: servicePrices_SumDevCut,
  
        linkedImgs: uploadFiles_arrData,

        priceViewer: priceGraph,
        timeSent: requestTime
      }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.onload = function() {
      console.log(xhr.responseText);
      if(xhr.responseText == 'success') {
      submitButtonAni();
    } else {
      anime ({
        targets: '.submitSpan',
        opacity: 0,
        duration: 200
      })
      document.querySelector(".submitErr").innerText = "Une erreur s'est produite :(, essayez d'actualiser et de réessayer";
      cancelSubmit();
    }
  }
  xhr.send(JSON.stringify(formData));
}
  //upload images
  async function upload() {
    if (uploadFiles_arr.length > 25) {
      document.querySelector(".submitErr").innerText = "Trop de fichiers !, le maximum autorisé est de 25.\n Actualisez votre page et réessayez";
      return cancelSubmit();
    } else {
    const opts = {
      method: 'POST',
      body: new FormData()
    };
    for (let i = 0; i < uploadFiles_arr.length; i++) {
       opts.body.append(`name`, uploadFiles_arr[i], uploadFiles_Name[i]);//uploadFiles_Name);
      } 
      try {
        const response = await fetch('/upload', opts);
        if (response.ok) {
        await response.json();
        sendMail();
        } else {
        document.querySelector(".submitErr").innerText = "Une erreur s'est produite :(, essayez d'actualiser et de réessayer";
        return cancelSubmit();
        }
      } catch {
        document.querySelector(".submitErr").innerText = "Une erreur s'est produite :(, essayez d'actualiser et de réessayer";
        return cancelSubmit();
      }
    }
  }


function submitButtonAni() {
  var submit_tl = anime.timeline({
    easing: 'easeInQuad',
  });
  submit_tl
  .add ({
    targets: '.submitSpan',
    width: "100%",
    easing: 'steps('+anime.random(2, 4)+')',
    duration: anime.random(400, 900)
  })
  .add ({
    targets: '.submitSpan',
    opacity: 0,
    duration: 200
  })
  .add({
    targets: '#submit_plane',
    translateX: 15,
    translateY: -9,
    scale: 0,
    duration: 500
  })
  .add({
    targets: '#submit_check',
    opacity: 1,
    duration: 350,
    complete: function() {
      window.open("./","_self");
    }
  })
}


//cancel submit cancel submit cancel submit cancel submit cancel submit cancel submit
//cancel submit cancel submit cancel submit cancel submit cancel submit cancel submit
//cancel submit cancel submit cancel submit cancel submit cancel submit cancel submit
function cancelSubmit() {
  var servicesContainer = document.getElementById("services_container");
  var services_children = servicesContainer.children.length;
  document.querySelectorAll(".checkService").forEach(Element => {
    if (Element.value == '') {
      Element.classList.add("inputRequired");
    }
    if (services_children < 3) {
      document.getElementById("service_Options_title").classList.add("formP_titlesRequired");
    }
    Element.addEventListener("click", function() {
      Element.classList.remove("inputRequired");
    })
  })

  document.querySelector('.submitSpan').style.display = "none";
  var submitButtonContainer = document.querySelectorAll(".submit_p");
  anime ({
    targets: submitButtonContainer,
    keyframes: [
      {translateX: -2},
      {translateX: 2},
      {translateX: -1},
      {translateX: 1},
      {translateX: 0},
    ],
    duration: 350
  })
  anime ({
    targets: '.submitErr',
    keyframes: [
      {translateX: 0, delay: 0, duration: 0},
      {translateX: -4, duration: 70},
      {translateX: 4, duration: 80},
      {translateX: -3, duration: 60},
      {translateX: 3, duration: 55},
      {translateX: -2, duration: 45},
      {translateX: 2, duration: 42},
      {translateX: -1, duration: 50},
      {translateX: 1, duration: 50},
      {translateX: 0, duration: 1548},
      {translateX: 40, duration: 600},
    ],
    opacity: [
      {value: 1, duration: 0},
      {value: 1, duration: 2000},
      {value: 0, duration: 600},
    ],
    backgroundColor: [
      {value: 'rgba(255, 0, 0, 0.1)', duration: 0},
      {value: 'rgba(255, 0, 0, 0.1)', duration: 600},
      {value: 'rgba(255, 0, 0, 0)', duration: 2000},
      {value: 'rgba(255, 0, 0, 0.1)', duration: 0},
    ],
    duration: 2600
  })
}


//page animations page animations page animations page animations page animations

function getScrollPercent() {
  var h = document.documentElement,
  b = document.body,
  st = 'scrollTop',
  sh = 'scrollHeight';
  return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 400;
}

const header = anime.timeline({ autoplay: false });

  
header.add({
  targets: ".headerMainSpan",
  opacity: [
    {value: 0},
    {value: 1}
  ],
  duration: 6000, 
  easing: 'linear'
 });

 const headerUnder = anime.timeline({ autoplay: false });

  
 headerUnder.add({
  targets: ".headerUnder",
  opacity: [
    {value: 1},
    {value: 0}
  ],
  duration: 6000, 
  easing: 'linear'
 });



   
var animateCounter = 1;
window.addEventListener('scroll', () => {
  let persentage = getScrollPercent();
  let persentageText = getScrollPercent();
  header.seek(header.duration * (persentage * 0.01));
  headerUnder.seek(headerUnder.duration * (persentage * 0.015));
  
  if (persentageText < 5) {
    persentageText = 5;
  }

  if(persentage >= 6 && animateCounter == 1) {
    animateCounter = 0;
    anime ({
      targets: ".reqQuoteH1",
      translateY: [
        {value: 9},
        {value: -18},
      ],
      opacity: 0,
      duration: 2000 / persentageText, 
      easing: 'linear' 
    });
    anime ({
      targets: ".reqQuoteP",
      translateY: [
        {value: 9},
        {value: -18},
      ],
      opacity: 0,
      duration: 2000 / persentageText, 
      easing: 'linear',
      delay: 2000 / persentageText
    });
  }


  if(persentage < 6 && animateCounter == 0) {
    animateCounter = 1;
    anime ({
      targets: ".reqQuoteP",
      translateY: [
        {value: 9},
        {value: -3},
        {value: 0},
      ],
      opacity: 1,
      duration: 2000 / persentageText, 
      easing: 'linear' 
    });
    anime ({
      targets: ".reqQuoteH1",
      translateY: [
        {value: 9},
        {value: -3},
        {value: 0},
      ],
      opacity: 1,
      duration: 2000 / persentageText, 
      easing: 'linear',
      delay: 2000 / persentageText
    });
  }
});


// fontSize_optionTarget.querySelectorAll(".fontsize_OptionItem").forEach(Element => {
//   Element.addEventListener('click', function() {
//     document.querySelectorAll(".fontsize_OptionItemSelected").forEach(Element => {
//       Element.classList.remove("fontsize_OptionItemSelected");
//     })
//     Element.classList.add("fontsize_OptionItemSelected");
//     var r = document.querySelector(':root');
//     switch(Element.id) {
//       case "font_small":
//         r.style.setProperty('--mainTextSize', '7px');
//         break;
//       case "font_medium":
//         r.style.setProperty('--mainTextSize', '9px');
//         break;
//         case "font_large":
//           r.style.setProperty('--mainTextSize', '14px');
//           break;
//       default:

//     }
//   })
// })


// background header ani  background header ani  background header ani  background header ani  


const backgroundHeader = document.querySelector(".headerBackground");
let rockAmount = 18;
let brickAmount = 3;
let counter = 0;

function isOdd(i) { return i % 2;}

// background Colors for the raindrop
const background = [
  "#037971",
  "#0c6e67",
  "#056e67"

];
const br = [
  "30% 70% 72% 28% / 30% 30% 70% 70% ",
  "30% 70% 39% 61% / 30% 30% 70% 70% ",
  "69% 31% 39% 61% / 67% 30% 70% 33% ",
  "69% 31% 39% 61% / 67% 78% 22% 33% ",
  "63% 37% 81% 19% / 48% 45% 55% 52% "
];
function playBackgroundAni() {
let i = 0;
let k = 0;
let rock, brick, rockProperties, brickProperties;

while (i < rockAmount) {
  rock = document.createElement("i");
  var widthHeigth = anime.random(0, 1) + "vw";
  rockProperties = {
    width: widthHeigth,
    height: widthHeigth,
    positionX: (100/rockAmount) * i+anime.random(1,2) + "%",
    positionY: anime.random(90, 95)+"%",
    ani_translateX: anime.random(-20, 20)+"px",
    ani_rotate: anime.random(180, 360)+"deg",
    bg: background[Math.floor(Math.random() * background.length)],
    borderRadius: br[Math.floor(Math.random() * br.length)],
    delay: Math.random() * -20 + "s",
    duration: Math.floor(Math.random() * 18.9) + 18.8 + "s",
    opacityBorder: "0."+anime.random(3, 4),
    opacityBackground: "0."+anime.random(2, 3),
  };
  rock.style.width = rockProperties.width;
  rock.style.height = rockProperties.height;
  rock.style.left = rockProperties.positionX;
  rock.style.top = rockProperties.positionY;
  rock.style.setProperty('--translateX', rockProperties.ani_translateX)
  rock.style.setProperty('--rotate', rockProperties.ani_rotate)
  rock.style.animationDelay = rockProperties.delay;
  rock.style.animationDuration = rockProperties.duration;
  rock.style.borderRadius = rockProperties.borderRadius;

  rock.classList.add("rock")
  rock.classList.add("backgorundHeaderItem")

  if (isOdd(i) == 1) {
    rock.classList.add("rock_p1")
    rock.style.background = rockProperties.bg;
    rock.style.opacity = rockProperties.opacityBackground
  } else {
    rock.classList.add("rock_p2")
    rock.style.opacity = rockProperties.opacityBorder
    rock.style.border = "2px solid"+rockProperties.bg;
  }


  backgroundHeader.appendChild(rock);
  counter = document.getElementsByClassName("rock").length
  i++;
}


while (k < brickAmount) {
  brick = document.createElement("i");
  brickProperties = {
    width: anime.random(14, 16) + "vw",
    height: anime.random(4, 6) + "vw",
    top: anime.random(3, 40)+"%",
    posX: (50/brickAmount) * k+1 + "%",
    bg: background[Math.floor(Math.random() * background.length)],
    borderRadius: anime.random(6, 9) + "px",
    opacity: "0.0"+anime.random(89,99),
    rotate: anime.random(-25, 25)+"deg",
  }
  brick.style.width = brickProperties.width;
  brick.style.height = brickProperties.height;
  brick.style.borderRadius = brickProperties.borderRadius;
  brick.style.opacity = brickProperties.opacity;
  brick.style.background = brickProperties.bg;
  brick.style.transform = "rotate("+brickProperties.rotate+")";
  brick.style.top = brickProperties.top;
  brick.style.right = brickProperties.posX;

  brick.classList.add("brick")
  brick.classList.add("backgorundHeaderItem")

  backgroundHeader.appendChild(brick);
  k++;
}
 if (k == brickAmount) {
  playBricksAni()
 }

 
}

function playBricksAni() {
  brickTl = anime.timeline({
    delay: 0,
  })
  brickTl
     .add ({
      targets: ".brick",
      translateY: function() {
      return anime.random(-18, 18)+"%"
      },
      translateX: function() {
      return anime.random(-18, 18)+"%"
      },
      width: function() {
      return anime.random(14, 16) + "vw"
      },
      height: function() {
      return anime.random(4, 6) + "vw"
      },
      rotate: function() {
      return anime.random(-25, 25)
      },
      loop: false,
      duration: function() {
      return anime.random(2000, 4000)
      },
      delay: anime.stagger(anime.random(0, 5000), {start: anime.random(0, 400)}),
      easing: "easeInOutBack",
  })

  .add ({
      targets: ".brick",
      translateY: function() {
      return anime.random(-9, 9)+"%"
      },
      translateX: function() {
      return anime.random(-18, 18)+"%"
      },
      width: function() {
      return anime.random(14, 16) + "vw"
      },
      height: function() {
      return anime.random(4, 6) + "vw"
      },
      rotate: function() {
      return anime.random(-9, 9)
      },
      loop: false,
      duration: function() {
      return anime.random(2000, 4000)
      },
      delay: anime.stagger(anime.random(0, 5000), {start: anime.random(0, 400)}),
      easing: "easeInOutBack",
      complete: playBricksAni
  })

}

function playBlobAni() {
    anime ({
      targets: ".blobBlur",
      loop: false,
      borderRadius: function() {
        return br[Math.floor(Math.random() * br.length)]
      },
      translateY: function() {
      return anime.random(-50, 50)+"%"
      },
      translateX: function() {
      return anime.random(-50, 50)+"%"
      },
      scale: function() {
      return "0."+anime.random(85, 99)
      },
      duration: function() {
      return anime.random(3000, 3500)
      },
      delay: 0,
      easing: "linear",
      delay: anime.stagger(anime.random(0, 300), {start: anime.random(0, 100)}),
      complete: playBlobAni
  })
}

function mainbrickChanger_aniP1() {
  var changerTl = anime.timeline({
      loop: false,
  })
  changerTl
  .add({
    targets: ".mainAni_changer",
      translateY: 0,
      translateX: 0,
      width: function() {
      return anime.random(22, 24) + "vw"
      },
      height: function() {
      return anime.random(6, 9) + "vw"
      },
      rotate: function() {
      return anime.random(-11, -9)
      },
      scale: 1,
      opacity: 0.1,
      backgroundColor: function() {
      return background[Math.floor(Math.random() * background.length)]
      },
      duration: function() {
      return anime.random(2100, 2300)
      },
      borderRadius: "0.3vw",
      easing: "easeInOutBack"
  })
  .add({
    targets: ".mainAni_changer",
      translateY: function() {
      return anime.random(6, 9)+"%"
      },
      translateX: function() {
      return "-"+anime.random(1, 3)+"%"
      },
      width: function() {
      return anime.random(32, 35) + "vw"
      },
      rotate: function() {
      return anime.random(0, 11)
      },
      duration: function() {
      return anime.random(1400, 1500)
      },
      delay: anime.random(2000, 3500),
      borderRadius: "0.2vw",
      easing: "easeInOutBack"
  })
  .add({
    targets: ".mainAni_changer",
      translateY: function() {
      return "-"+anime.random(6, 9)+"%"
      },
      translateX: function() {
      return anime.random(1, 3)+"%"
      },
      width: function() {
      return anime.random(18, 20) + "vw"
      },
      height: function() {
      return anime.random(12, 14) + "vw"
      },
      duration: function() {
      return anime.random(1800, 1900)
      },
      delay: anime.random(2000, 3500),
      borderRadius: "1vw",
      easing: "easeInOutBack"
  })
  .add({
    targets: ".mainAni_changer",
      keyframes: [
        {
        borderRadius: function() {
        return br[Math.floor(Math.random() * br.length)]
          },
        translateY: function() {
        return "-"+anime.random(6, 9)+"%"
          },
        translateX: function() {
        return "-"+anime.random(1, 3)+"%"
          },
        width: function() {
           return anime.random(18, 20) + "vw"
          },
        height: function() {
           return anime.random(12, 14) + "vw"
        },
        scale: function() {
        return "0."+anime.random(75, 85)
          },
          rotate: 360
        },
        {
        borderRadius: function() {
          return br[Math.floor(Math.random() * br.length)]
          },
        translateY: anime.random(6, 9)+"%",
        translateX: anime.random(1, 3)+"%",
          width: "16vw",
          height: "16vw",
          scale: 1.2
        },
        {
          rotate: 0,
          duration: 0
        }
      ],
      delay: anime.random(2000, 3500),
      duration: function() {
      return anime.random(1600, 6000)
      },
      easing: "easeInOutBack"
  })
  .add({
    targets: ".mainAni_changer",
      borderRadius: function() {
        return br[Math.floor(Math.random() * br.length)]
      },
      rotate: function() {
      return "-"+anime.random(9, 12)
      },
      duration: function() {
      return anime.random(1400, 1500)
      },
      easing: "easeInOutBack",
      delay: anime.random(4000, 6000),
      scale: 1
  })
  .add({
    targets: ".mainAni_changer",
      translateY: function() {
      return "-"+anime.random(50, 55)+"%"
      },
      scale: 0.3,
      borderRadius: function() {
        return br[Math.floor(Math.random() * br.length)]
      },
      rotate: function() {
      return anime.random(3, 6)
      },
      duration: function() {
      return anime.random(2500, 2600)
      },
      easing: "easeInOutBack",
      complete: mainbrickChanger_aniP2
  })
}
/*next step --------------------------*/
let p2counter = 0;
function mainbrickChanger_aniP2() {

  while (p2counter < 9) {
  aniRock = document.createElement("i");
  aniRockProperties = {
    bg: background[Math.floor(Math.random() * background.length)],
    borderRadius: br[Math.floor(Math.random() * br.length)],
    rotate: anime.random(-25, 25)+"deg",
    width: anime.random(50, 100)+"%",
    height: anime.random(50, 100)+"%",
  }
  aniRock.style.width = aniRockProperties.width;
  aniRock.style.height = aniRockProperties.height;
  aniRock.style.borderRadius = aniRockProperties.borderRadius;

  if (isOdd(p2counter) == 1) {
    aniRock.classList.add("aniRock_p1")
    aniRock.style.background = aniRockProperties.bg;
  } else {
    aniRock.classList.add("aniRock_p1")
    aniRock.style.border = "18px solid"+aniRockProperties.bg;
  }

  aniRock.classList.add("aniRock")

  document.querySelector(".mainAni_changer").appendChild(aniRock);
  p2counter++;
  }


  if (p2counter == 9) {

    var nextStepTl1 = anime.timeline({
      loop: false
  })
  nextStepTl1
  .add({
    targets: ".mainAni_changer",
      keyframes: [
        {
          scale: 0,
        },
        {
          scale: 0,
          backgroundColor: "rgba(0,0,0,0)",
        },
        {
          scale: 0.15,
          opacity: 0.1,
          duration: 0
        }
      ],
      duration: 1200,
      easing: "easeInOutBack"
  })
  .add ({
    targets: ".aniRock",
    scale: function() {
      return "0."+anime.random(55, 79);
    },
    translateX: function() {
      return anime.random(-200, 300)+"%"
    },
    translateY: function() {
      return anime.random(-100, 100)+"%"
    },
    delay: anime.stagger(100),
    opacity: 1,
    duration: 300,
    easing: "easeOutBack"
  })
  .add ({
    targets: ".aniRock",
    translateY: 700,
    scale: function() {
      return "0."+anime.random(81, 99);
    },
    delay: anime.stagger(60, {start: -600}),
    duration: 900,
    easing: "easeOutBounce"
  })
  .add ({
    targets: ".aniRock",
    translateY: -800,
    translateX: function() {
      return anime.random(-700, 800)+"%"
    },
    opacity: 0,
    delay: anime.stagger(60, {start: 600}),
    duration: 2000,
    easing: "easeInBounce",
    complete: function() {
      document.querySelectorAll(".aniRock").forEach(Element => {
        Element.remove();
      })
      let aniRockCounter = document.getElementsByClassName("aniRock").length;
      if (aniRockCounter <= 0) {
          p2counter = 0;
          mainbrickChanger_aniP1();
      }
    }
  })


  }
  
}

//start of ham nav functions

function hamnav() {
  if (ham_OnFinish == true) {
     ham_OnFinish = false;
     hamNavOk();
  } else if (ham_OnFinish == false) {
     hamchecker.checked = ham_checkAgain;
     hamErr_anim();
  }
 }
 var ham_OnFinish = true;
 var ham_checkAgain = false;
 var hamchecker = document.querySelector('.NavHam_checkInput');
 document.querySelector('.NavHam_checkInput')
 .addEventListener('click', hamnav);
 
 //-----------------------------------------------------------
 function hamNavOk() {
 let hamClass = document.getElementById("hamsvg");
 switch (hamchecker.checked) {
  case true:
   ham_checkAgain = true;
   hamClass.classList.add('ham_active');
   hamnavOn()
   hamPlay_anim();
 break;
  case false:
   ham_checkAgain = false;
   hamClass.classList.remove('ham_active');
   hamnavOff()
   hamPlay_anim();
 break;
  default: 
   console.log('err');
   return hamErr_anim();
  }
 }
 //-----------------------------------------------------------
 function hamPlay_anim() {
     anime ({
      targets: '.ham_container',
      translateX: {value: 0, duration: 0},
      translateY: [
          {value: -6},
          {value: 4},
          {value: 0}
      ],
      scale: [
          {value: 0.8},
          {value: 0.9},
          {value: 1}
      ],
      duration: 300,
      easing: 'easeInOutBack',
      complete: function() {
         ham_OnFinish = true;  
      }
  });
 }
 //-----------------------------------------------------------
 function hamErr_anim() {
     anime ({
          targets: '.ham_container',
          translateX: [
              {value: -2},
              {value: 1},
              {value: -3},
              {value: 3},
              {value: -2},
              {value: 1},
              {value: 0}
          ],
          translateY: {value: 0, duration: 0},
          scale: {value: 1, duration: 0},
          duration: 350,
          easing: 'easeInOutBack'
      })
 }

  /*ham nav href's anim*/
  function hamnavOn() {
    anime({
      targets: '.mobile_navContainer',
      keyframes: [
        {translateY: 0, duration: 0},
        {opacity: 1},
      ],
      duration: 250,
      easing: 'linear'
    })
  }
  
  function hamnavOff() {
    anime({
      targets: '.mobile_navContainer',
      keyframes: [
        {opacity: 0},
        {translateY: -200, duration: 0},
      ],
      duration: 250,
      easing: 'linear'
    })
  }


 //end ham nav
 //-----------------------------------------------------------
 //-----------------------------------------------------------
 //-----------------------------------------------------------

 
mainbrickChanger_aniP1()
playBlobAni()
playBackgroundAni();