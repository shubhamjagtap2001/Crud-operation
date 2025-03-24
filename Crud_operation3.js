// start  to function
var registerForm= document.querySelector("#register-form");
var allInput = registerForm.querySelectorAll("INPUT");
var AddBtn=document.querySelector("#Add-Btn");
var model=document.querySelector(".model");
var colseBtn=document.querySelector(".fa-x");
AddBtn.onclick = function(){
   model.classList.add("active");
}
colseBtn.addEventListener("click",()=>{
    model.classList.remove("active");

})   

//start all global variable

var idEl= document.getElementById("fname");
var nameEl = document.getElementById("Aname");
var l_nameEl = document.querySelector("#lname");
var emailEd=document.querySelector("#Ename");
var officeEl= document.querySelector("#Officename");
var jobTitleEl = document.querySelector("#jname");
var registerBtn =document.querySelector("#register-Btn");
var registerForm= document.querySelector("#register-form");
var imgUrl;
//end all global variable  
console.log("button", registerBtn);
//start register code
registerBtn.onsubmit = function(e){

          e.preventDefault();
          console.log(idEl, "idEl");
          console.log(e);
        //  registionData();
        //  getdataFromLocal();
        //  registerForm.reset('');  
        //  colseBtn.click();
}
var userdata=[];

if(localStorage.getItem("userdata")!= null){
userdata = JSON.parse(localStorage.getItem("userdata"));
}
 
function registionData(){
    userdata.push({
        fname : idEl.value,
       Aname : nameEl.value,
        lname : l_nameEl.value,
        Ename : emailEd.value,
        Officename : officeEl.value,
        jname: jobTitleEl.value,
        profilepic: imgUrl ==undefined ? "C:/Users/HP/Downloads/avtar.png" : imgUrl
    });

    var userString = JSON.stringify(userdata);
    //Json.Stringify(userdata);
    localStorage.setItem("userdata",userString);
    swal("Good job!", "Registration Success!", "Succcess");
}  

//start returning data on page form localstorage
var tabledata = document.querySelector("#table-data");
const getdataFromLocal = () =>{
    tabledata.innerHTML ="";
    userdata.forEach((data,index)=>{
       tabledata.innerHTML += ` 
       <tr index='${index}'>
                    <td>${index+1}</td>
                    <td><img src="${data.profilepic}" width="30" height"30"></td>
                    <td>${data.fname}</td>
                    <td>${data.Aname}</td>
                    <td>${data.lname}</td>
                    <td>${data.Ename}</td>
                    <td>${data.Officename}</td>
                    <td>${data.jname}</td>
                    <td> 
                        <button class="edit-btn"><i class="fa fa-eye" style="width: 48px;"></i></button>
                        <button class="del-btn" style="background-color: #EE534f;"><i class="fa fa-trash"></i></button>
                    </td>
                </tr>     
       `;
    })

// start delete coding
var i;
var allDelBtn = document.querySelectorAll(".del-btn")

for(i=0; i<allDelBtn.length;i++){
    allDelBtn[i].onclick =function(){
    var tr =this.parentElement.parentElement;
    var id= tr.getAttribute("index")
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            userdata.splice(id,1);
    localStorage.setItem("userdata",JSON.stringify(userdata));
    tr.remove();

          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
      
    
    }
}

// start update coding
var allEdit = document.querySelectorAll(".edit-btn");

var updateBtn= document.querySelector("#update-btn");
 for(i=0; i < allEdit.length;i++){

    allEdit[i].onclick = function(){
    var tr = this.parentElement.parentElement;
    var td = tr.getElementsByTagName("TD");
    var index = tr.getAttribute("index");
    var imgTag = td[1].getElementsByTagName("IMG");
    var profilePic = imgTag[0].src;
    var fname = td[2].innerHTML; 
    var Aname = td[3].innerHTML;
    var lname = td[4].innerHTML;
    var Ename = td[5].innerHTML;
    var Officename = td[6].innerHTML;
    var jname = td[7].innerHTML;
    AddBtn.click();
    idEl.value = fname;
    nameEl.value = Aname;
    l_nameEl.value = lname;
    emailEd.value = Ename;
    officeEl.value = Officename;
    jobTitleEl.value = jname;
  profile_pic.src = profilePic;
  updateBtn.onclick = function(e){
   userdata[index] ={
            fname : idEl.value,
            Aname : nameEl.value,
            lname : l_nameEl.value,
            Ename : emailEd.value,
            Officename : officeEl.value,
            jname: jobTitleEl.value,
            profilepic: upload_pic.value =="" ?  profile_pic.src: imgUrl
   }
   localStorage.setItem("userdata",JSON.stringify(userdata));
  }





    }
 }

}
getdataFromLocal();

//IMAGE PROCESING

var fReader = new FileReader();
var profile_pic= document.querySelector("#Profile-pic");
fReader.onload = function(e){
     imgUrl = e.target.result;
    profile_pic.src = imgUrl;
}
var upload_pic = document.querySelector("#upload-pic");

upload_pic.onchange =function(){
    if(upload_pic.files[0].size < 1000000){
         
      
        fReader.readAsDataURL(upload_pic.files[0])
    }else{
         alert("file size is to long");
    }
}


// start search coding
var searchEl = document.querySelector("#empId");
searchEl.oninput = function(){
    var tr = tabledata.querySelector("TR");
    searchFuc();
}
function searchFuc(){
    var tr =tabledata.querySelectorAll("TR");
    var filter = searchEl.value.toLowerCase();
    var i; 
    for(i=0; i<tr.length; i++){
        var fname = tr[i].getElementsByTagName("TD")[2].innerHTML;
        var Aname = tr[i].getElementsByTagName("TD")[3].innerHTML;
        var lname = tr[i].getElementsByTagName("TD")[4].innerHTML;
        var Ename = tr[i].getElementsByTagName("TD")[5].innerHTML;
        var Officename = tr[i].getElementsByTagName("TD")[6].innerHTML;
        var jname = tr[i].getElementsByTagName("TD")[7].innerHTML;

    if(fname.toLowerCase().indexOf(filter) > -1){
        tr[i].style.display = "";
    }
    else if(Aname.toLowerCase().indexOf(filter) > -1){
        tr[i].style.display = "";
    }
   else  if(lname.toLowerCase().indexOf(filter) > -1){
        tr[i].style.display = "";
    }
    else if(Ename.toLowerCase().indexOf(filter) > -1){
        tr[i].style.display = "";
    }
    else if(Officename.toLowerCase().indexOf(filter) > -1){
        tr[i].style.display = "";
    }
    else if(jname.toLowerCase().indexOf(filter) > -1){
        tr[i].style.display = "";
    }

    else{
        tr[i].style.display = "none";
    }
    }
   
}

//start clear all data
var delAllBtn = document.querySelector("#del-all-btn");
var allDelBox = document.querySelector("#del-all-box");
delAllBtn.addEventListener('click',()=>{
    if(allDelBox.checked == true){
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                 localStorage.removeItem("userdata")
                 window.location =location.href;
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your imaginary file is safe!");
            }
          });
          
    }
    else{
        swal("check the Box!", "please check the box to delete data","Warning");
    }
})


console.log(this);

console.log(a);

var a;

alert("aniket");

function alert(name){
    console.log("hello" + name);
}


let userName = prompt("What is your name?");

// Check if the user provided input
if (userName) {
  alert("Hello, " + userName + "!");
} else {
  alert("Hello, Stranger!");
}


var firstName = "aniket";
var lastname = "jagtap";
var fullName = firstName + lastname;
console.log(fullName);


var fullnameNew = `${firstName} ${lastname}`; 
console.log(fullnameNew);