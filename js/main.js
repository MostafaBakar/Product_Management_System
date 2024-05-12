let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
// should add value mood should know the website is create or update ;
let mood='Create';
//should globe value help to catch any value enter block function any code
let temp;
//get totale
function getTotal() {
    if(price.value !=""){
        let result=(+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML=result;
        total.style.background='#040'; 
    }
    else{
        total.innerHTML=" ";
        total.style.background='#a00d02'
    }
}
let dataProduct;
//Create item
if(localStorage.product !=null){
    dataProduct=JSON.parse(localStorage.product);
}
else{
    dataProduct=[];
}

submit.onclick=function(){
    let newPro ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    //count
    if(title.value !=''&& price.value!='' && category.value!=''){
        if(mood==='Create'){
            if(newPro.count>1){
                for(let i=0;i<newPro.count;i++){
                    dataProduct.push(newPro); 
                }
            }
            else{
                dataProduct.push(newPro);
        
            }
        }
        else{
            dataProduct[temp]=newPro;
            submit.innerHTML='Create';
            count.style.display='block';
    
        }  
        clearDate();
    }

  
    
    //save localstorage
    localStorage.setItem('product',JSON.stringify(dataProduct));

    showDate();
   
}
//clear input
function clearDate(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    category.value='';
    count.value='';
    total.innerHTML='';
}
//readDate
function showDate(){
    getTotal();
    let table ='';
    for(let i=0;i<dataProduct.length;i++){
        table +=
     `<tr>
        <td>${i}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick='updateDate(${i})' id="update">update</button></td>
        <td><button onclick='deleteDate(${i})' id="Delete">Delete</button></td>
      </tr> `
    }
    document.getElementById('tbody').innerHTML=table;
    let btnDelete= document.getElementById('btnDelete');
    if(dataProduct.length>0){
        btnDelete.innerHTML=`
        <button onclick="deleteAll()">DeleteAll (${dataProduct.length})</button>
        `
    }
    else{
        btnDelete.innerHTML='';
    }
} 
showDate();
//deletitem
function deleteDate(i){
    dataProduct.splice(i,1);
    localStorage.product=JSON.stringify(dataProduct);
    showDate();
}
//deleteAll
function deleteAll(){
    localStorage.clear();
    dataProduct.splice(0);
    showDate();
}
//updateDate
function updateDate(i){
    title.value=dataProduct[i].title;
    price.value=dataProduct[i].price;
    taxes.value=dataProduct[i].taxes;
    ads.value=dataProduct[i].ads;
    discount.value=dataProduct[i].discount;
    getTotal();
    category.value=dataProduct[i].category;
    mood='update';
    count.style.display='none';
    submit.innerHTML='update';
    temp=i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}

//search

let searchMood='title';
function getSearchMood(id){
    let Search=document.getElementById('Search');
    if(id ==='searchTitle'){
        searchMood = "Title";
    }
    else{
        searchMood='Category';
    }
    Search.placeholder='Search By ' +searchMood;
    Search.focus();
    Search.value='';
    showDate();
}
function searchDate(value){
    let table='';
    for(let i=0;i<dataProduct.length;i++){
        if(searchMood === 'Title'){
            if(dataProduct[i].title.includes(value.toLowerCase())){
                table +=
                `<tr>
                    <td>${i}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick='updateDate(${i})' id="update">update</button></td>
                    <td><button onclick='deleteDate(${i})' id="Delete">Delete</button></td>
              </tr> `
            }
        }
        else{
            if(dataProduct[i].category.includes(value.toLowerCase())){
                table +=
                `<tr>
                    <td>${i}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick='updateDate(${i})' id="update">update</button></td>
                    <td><button onclick='deleteDate(${i})' id="Delete">Delete</button></td>
              </tr> `
            }

        }
    }
    document.getElementById('tbody').innerHTML=table;

     
}
//cleat

