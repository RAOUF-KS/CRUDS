
let  title = document.getElementById('title');
let  price = document.getElementById('price');
let  taxes = document.getElementById('taxes');
let  ads = document.getElementById('ads');
let  discount = document.getElementById('discount');
let  total = document.getElementById('total');
let  count = document.getElementById('count');
let  category = document.getElementById('category');
let  submit = document.getElementById('submit');
let mood='create';
let tmp;



function getTotal() {
     if (price.value != ''){
          let result = (+price.value+ +taxes.value+ +ads.value)- +discount.value;
        total.innerHTML = result ;
        total.style.background = '#040';
        
     } else {
          total.innerHTML = ' ';
        total.style.background = 'red';
        
     }

}
//CREATE///
let datapro;
if(localStorage.product != null){
        datapro = JSON.parse(localStorage.product)
}else{
        datapro=[]
}


 
submit.onclick=function(){
        let newpro = {
              title:title.value.toLowerCase( ),
              price:price.value,
              taxes:taxes.value,
              ads:ads.value,
              discount:discount.value,
             total:total.innerHTML,
         count:count.value,
            category:category.value.toLowerCase( ),
            
        }
        //count//
 if(title.value !=''
        && price.value !=''
        && category.value !=''
        && newpro.count<=100

){
  if(mood ==='create'){
        if (newpro.count >1){
                for(let i=0 ; i<newpro.count ; i++){
        datapro.push(newpro);
                }
        }else{
                        datapro.push(newpro);
        
}

                }else{
                        datapro[ tmp  ]    =newpro;    
                        mood='create';
                        submit.innerHTML ='create';
                         count.style.display="block";

                }
                                 clearData() 

        }
 
        
        localStorage.setItem('product' ,      JSON.stringify(datapro)             )
              showData()
}


//CLAER//

function clearData(){
 title.value='';
  price.value='';
 taxes.value='';
 ads.value='';
 discount.value='';
  total.innerHTML='';
 count.value='';
 category.value='';


}


///read//
// ...existing code...
function showData(){
    getTotal()
    let table=' ';
    for( let  i=0; i< datapro.length;i++){
        let rowColor = 'rgba(255, 0, 0, 1)';
        table +=`  <tr>
            <td data-label="ID:">${i+1}</td>
            <td data-label="Title:">${datapro[i].title}</td>
             <td data-label="Category:">${datapro[i].category}</td>
            <td data-label="Price:">${datapro[i].price}</td>
            <td data-label="Taxes:">${datapro[i].taxes}</td>
            <td data-label="Ads:">${datapro[i].ads}</td>
            <td data-label="Discount:">${datapro[i].discount}</td>
            <td data-label="Total:" style="color: ${rowColor}">${datapro[i].total}</td>
           <td><button  onclick="updateData( ${ i } )"   <button id="update">update<svg class="svg" viewBox="0 0 512 512"> <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg> </button></td>
         <td><button  onclick="deleteData( ${ i } )"  id="delete">delete</button></td>

        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML= table;
    let btnDelete = document.getElementById('deleteAll');
    if(datapro.length > 0){
        btnDelete.innerHTML=`
        <button id="delAll" onclick="deleteAll()">delete All(${datapro.length})</button>`
    }else{
        btnDelete.innerHTML='  ';
    }
}
showData()
// ...existing code...






              //delete//
function  deleteData(i){
          datapro .splice(i,1);
          localStorage.product=JSON.stringify(datapro);
          showData( )
}
              //delete ALL//
function deleteAll( ){
        localStorage.clear();
   datapro.splice(0);
   showData()

}

//update//
function updateData(i){
title.value=datapro[i].title;
price.value=datapro[i].price;
 taxes.value=datapro[i].taxes;
 ads.value=datapro[i].ads;
 discount.value=datapro[i].discount;
 getTotal()
 count.style.display="none";
 category.value=datapro[i].category;
 submit.innerHTML='Update';
mood='update';
tmp=i;
scroll({
        top:0,
        behavior:"smooth",
})
}


//search//
let searchMood='title';

function getSearchMood(id ){
        let search= document.getElementById('search');
 if( id =='searchTitle'){
        searchMood ='Title';
 }else{
        searchMood ='Category';

 }
         search.placeholder ='Search By ' + searchMood;

        search.focus()
        search.value='';
        showData()
}


function searchData( value )
{
        let table =' ';
         for( let i=0; i<datapro.length; i++){
        if(searchMood == 'title')
        {
         {
                if(datapro[i].title. includes(value.toLowerCase( )) ){

       table +=`  <tr>
                    <td>${i+1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button  onclick="updateData( ${ i } )"   <button id="update">update<svg class="svg" viewBox="0 0 512 512"> <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg> </button></td>
                    <td><button  onclick="deleteData( ${ i } )"  id="delete">delete</button></td>
                </tr>
                `;

                }
          }  
         }else{
                searchMood == 'category';
                        {
                if(datapro[i].category . includes(value.toLowerCase( )) ){

       table +=`  <tr>
                    <td>${i+1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                <div class="responsive-table">
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                        </div>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button  onclick="updateData( ${ i } )"   <button id="update">update<svg class="svg" viewBox="0 0 512 512"> <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg> </button></td>
                    <td><button  onclick="deleteData( ${ i } )"  id="delete">delete</button></td>
                </tr>
                `;

                }
          }

        }
}
                document.getElementById('tbody').innerHTML= table;

}

// Add this function if you want to toggle responsive mode with JS
function setResponsiveTable() {
    const table = document.querySelector('table');
    if (window.innerWidth <= 393) {
        table.classList.add('responsive-table');
    } else {
        table.classList.remove('responsive-table');
    }
}
window.addEventListener('resize', setResponsiveTable);
window.addEventListener('DOMContentLoaded', setResponsiveTable);

