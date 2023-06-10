// give varyables from the code-1
let Searchinput=document.getElementById("Search");
let SearchByT=document.getElementById("SearchByT");
let mainReult=document.querySelector(".main-reult");
let deleteallbtn=document.getElementById("delete-all");
let SearchByC=document.getElementById("SearchByC");

let removedisappear=[Searchinput,SearchByT,mainReult,deleteallbtn,SearchByC];
let choosewhatSe=[SearchByT,SearchByC];
let contthem=document.querySelector(".contthem");
let chooseone;

// give varyables from the code-2
let updateit=document.getElementById("Updatenewelem");
let mainarray=[]
let mainid=0;
let Title=document.getElementById("Title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discont=document.getElementById("discont");
let Count=document.getElementById("Count");
let Catigory=document.getElementById("Catigory");
let mainReultincoming=document.querySelector(".main-reult .contaner table");

let btntotal=document.querySelector(".btntotal");
let createbtn=document.getElementById("createnewelem");
// idkwhat
getiteams();
// Saveing the mainid value
if(localStorage.getItem("valueofid")){
  mainid=localStorage.getItem("valueofid");
}

// Cheking if the needed data present
setInterval(() => {
  if(price.value !="" && taxes.value !="" && ads.value !=""){
    givingthetotal();
  }else{
    removethetotal()
  }
  if(Title.value !="" && price.value !="" && taxes.value !="" && ads.value !="" && discont.value !="" && Catigory.value !=""){
    createbtn.classList.remove("disable");
  }else{
    createbtn.classList.add("disable");
  }
}, 1000);

// Create the data and add it to mainarry
createbtn.addEventListener("click",function(){
    removegiveitall();
    giveitall();
    if(Count.value !==""){
      for(let i=0;i<Count.value ;i++){
        mainid++;
        fillinto(mainid,Title.value,price.value,taxes.value,ads.value,discont.value,Catigory.value);
      }
    }else{
      mainid++;
      fillinto(mainid,Title.value,price.value,taxes.value,ads.value,discont.value,Catigory.value);
    }
    makeitclear();
})

// Refiling the mainarray
if(localStorage.getItem("InfoNeed")){
  mainarray= JSON.parse(localStorage.getItem("InfoNeed"));
}

// Delete All the data
deleteallbtn.addEventListener("click",function(){
  localStorage.clear();
  mainid=0;
  mainarray=[];
  removegiveitall();
})

// change if the buttons
choosewhatSe.forEach(one =>{
  one.addEventListener("click",function(){
    Searchinput.value="";
    makelastdata(mainarray);
    choosewhatSe.forEach(Sea =>{
      Sea.classList.remove("chooseone");
    })
    one.classList.add("chooseone");
  })
})

// Search input
choosetheone()
Searchinput.addEventListener("keyup",function(){
  if(Searchinput.value !=""){
    choosetheone()
    let newarray=[];
    let boxvalue=Searchinput.value.toLowerCase();

    newarray=mainarray.filter((data) =>{
      return data[chooseone].toLowerCase().startsWith(boxvalue);
    })
    makelastdata(newarray);
  }else{
    makelastdata(mainarray);
  }
})
// functions
function giveitall(){
  removedisappear.forEach(one =>{
    one.classList.remove("disappear")
  })
}
function removegiveitall(){
  removedisappear.forEach(one =>{
    one.classList.add("disappear");
  })
}
function makeitclear(){
  Title.value="";
  price.value="";
  taxes.value="";
  ads.value="";
  discont.value="";
  Count.value="";
  Catigory.value="";
}
function givingthetotal(){
  btntotal.innerHTML= parseInt(parseInt(price.value) + parseInt(taxes.value) + parseInt(ads.value) - discont.value);
  btntotal.classList.add("full");
}
function removethetotal(){
  btntotal.innerHTML="Total";
  btntotal.classList.remove("full");
}
function fillinto(mainid,TitleValue,priceValue,taxesValue,adsValue,discontValue,CatigoryValue){
  const maindata={
    id:Date.now(),
    mainid:mainid,
    Title:TitleValue,
    Price:priceValue,
    taxes:taxesValue,
    ads:adsValue,
    discont:discontValue,
    Catigory:CatigoryValue
  }
  mainarray.push(maindata);
  makelastdata(mainarray);
  putintolocal(mainarray,mainid);
}
function makelastdata(anyarray){
  mainReultincoming.innerHTML="";
  contthem.innerHTML=mainarray.length;

  let maintr=document.createElement("tr");
  mainReultincoming.appendChild(maintr);
  let mainth10=document.createElement("th");
  mainth10.innerText="Delete";
  let mainth9=document.createElement("th");
  mainth9.innerText="UPDATE";
  let mainth8=document.createElement("th");
  mainth8.innerText="CATEGORY";
  let mainth7=document.createElement("th");
  mainth7.innerText="TOTAL";
  let mainth6=document.createElement("th");
  mainth6.innerText="DISCONT";
  let mainth5=document.createElement("th");
  mainth5.innerText="ADS";
  let mainth4=document.createElement("th");
  mainth4.innerText="TAXES";
  let mainth3=document.createElement("th");
  mainth3.innerText="PRICE";
  let mainth2=document.createElement("th");
  mainth2.innerText="TITLE";
  let mainth1=document.createElement("th");
  mainth1.innerText="ID";

  maintr.appendChild(mainth1);
  maintr.appendChild(mainth2);
  maintr.appendChild(mainth3);
  maintr.appendChild(mainth4);
  maintr.appendChild(mainth5);
  maintr.appendChild(mainth6);
  maintr.appendChild(mainth7);
  maintr.appendChild(mainth8);
  maintr.appendChild(mainth9);
  maintr.appendChild(mainth10);

  anyarray.forEach((smalldata) =>{
    let tr=document.createElement("tr");
    tr.dataset.id= `${smalldata.id}`
    mainReultincoming.appendChild(tr);

    let th10=document.createElement("th");
    let debutton=document.createElement("button");
    debutton.classList.add("delete");
    debutton.innerText="Delete";
    th10.appendChild(debutton);
    let th9=document.createElement("th");
    let upbutton=document.createElement("button");
    upbutton.classList.add("update");
    upbutton.innerText="Update";
    th9.appendChild(upbutton);
    let th8=document.createElement("th");
    th8.innerHTML=smalldata.Catigory;
    let th7=document.createElement("th");
    th7.innerHTML=parseFloat(parseFloat(smalldata.Price) + parseFloat(smalldata.taxes) + parseFloat(smalldata.ads) - parseFloat(smalldata.discont));;
    let th6=document.createElement("th");
    th6.innerHTML=smalldata.discont;
    let th5=document.createElement("th");
    th5.innerHTML=smalldata.ads;
    let th4=document.createElement("th");
    th4.innerHTML=smalldata.taxes;
    let th3=document.createElement("th");
    th3.innerHTML=smalldata.Price;
    let th2=document.createElement("th");
    th2.innerHTML=smalldata.Title;
    let th1=document.createElement("th");
    th1.innerText= smalldata.mainid;

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    tr.appendChild(th6);
    tr.appendChild(th7);
    tr.appendChild(th8);
    tr.appendChild(th9);
    tr.appendChild(th10);

    debutton.addEventListener("click",function(){
      removefromlocal(debutton.parentElement.parentElement.dataset.id);
      debutton.parentElement.parentElement.remove();
    })

    upbutton.addEventListener("click",function(){
      createbtn.classList.add("disappear");
      updateit.classList.remove("disappear");
      
      Count.classList.add("disable");

      Title.value=th2.innerHTML;
      price.value=th3.innerHTML;
      taxes.value = th4.innerHTML;
      ads.value = th5.innerHTML;
      discont.value = th6.innerHTML;
      Catigory.value =th8.innerHTML;
      
      updateit.addEventListener("click",function(){
        updatedata(debutton.parentElement.parentElement,Title.value,price.value,taxes.value,ads.value,discont.value,Catigory.value);
      })
    })
  })
}
function updatedata(mainone,ti,p,ta,a,d,c){
  let tvalue=ti;
  let pvalue=p;
  let tavalue=ta;
  let avalue=a;
  let dvalue=d;
  let cvalue=c;
  let temp = localStorage.getItem("valueofid");
  let id=mainone.dataset.id;
  createbtn.classList.remove("disappear");
  updateit.classList.add("disappear");
  for(let i=0;i<mainarray.length;i++){
    if(mainarray[i].id == id){
      mainarray[i].Title=tvalue;
      mainarray[i].Price=pvalue;
      mainarray[i].taxes=tavalue;
      mainarray[i].ads=avalue;
      mainarray[i].discont=dvalue;
      mainarray[i].Catigory=cvalue;
    }
  }
  
  Count.classList.remove("disable");
  putintolocal(mainarray,temp)
  makelastdata(mainarray);
  makeitclear()
}
function putintolocal(anyarray,idlastvalue){
  localStorage.setItem("InfoNeed",JSON.stringify(anyarray));
  localStorage.setItem("valueofid",idlastvalue)
}
function getiteams(){
  if(localStorage.getItem("InfoNeed")){
    let data=JSON.parse(localStorage.getItem("InfoNeed"));
    removegiveitall();
    giveitall();
    contthem.innerHTML=data.length;
    makelastdata(data);
  }
}
function removefromlocal(mainone){
  mainarray=mainarray.filter((thisone)=> thisone.id != mainone);
  contthem.innerHTML=mainarray.length;
  putintolocal(mainarray,mainid);
}
function choosetheone(){
  chooseone=document.querySelector(".chooseone").innerHTML.slice(10);
}

// start of the code

// direct once


contthem.innerHTML=mainarray.length;
// end of the code