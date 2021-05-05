var newCard = '';
var cardContainer = document.querySelector(".card-container");
var outerContainer = document.querySelector('.outer-container');
var outerContainer2 = document.querySelector('.outer-container-2');
var addItemPop = document.querySelector('.addItem-p3');
var subItemPop = document.querySelector('.addSubItem-p3');
var emptyInfoText = document.getElementById("empty-info-text");

var cardcount = 0;
var idCount = 0;
var card_id = 0;

function addItemPopup(){    
    outerContainer.classList.add('blur');
    outerContainer2.classList.add('blur');
    addItemPop.classList.toggle('hidden');       
    if(emptyInfoText.classList.contains('hidden') == false && cardcount <= 0){
        emptyInfoText.classList.add('hidden');
    }
}

function addCard(){
    let addCardEntryCheck = document.querySelector("#addItem-card-popup").value;
    if(addCardEntryCheck != ''){
        cardcount++;
        var d = new Date();
        card_id = d.getTime();
        var newCard = "<div class='card-container-item shadow-box' id='card-"+card_id+"'>";
        newCard += "<div class='item-heading' onclick='redirectCard("+card_id+")' style='cursor:pointer'><p class='card-heading' id='redirectPara-"+card_id+"'>"+document.getElementById("addItem-card-popup").value+"</p><hr></div>";
        newCard += "<div class='item-description'><ul class='card-subitems card-subitems-p"+card_id+"' id='card-subitems-p"+card_id+"'></ul></div>";
        newCard += "<div class='footer-btn-grp'><button class='footer-trash-btn card-trash-btn-p"+card_id+"' id='card-trash-btn-p"+card_id+"' onclick='removeCard(this.id)'><i class='fas fa-trash-alt'></i></button>";
        newCard += "<a class='footer-plus-btn card-plus-btn-p"+card_id+"' id='card-plus-btn-p"+card_id+"' onclick='subItemAdd(this)'><i class='fa fa-plus-circle' aria-hidden='true'></i></a></div></div>";
        cardContainer.insertAdjacentHTML("beforeend",newCard);
        document.getElementById("addItem-card-popup").value = "";
        outerContainer.classList.toggle('blur');
        addItemPop.classList.toggle('hidden');
        redirectBack();
    }    
}

function redirectBack(){
    outerContainer2.classList.add("hidden");
    outerContainer.classList.remove("hidden");
    var del = document.querySelector("#card-container-2");
    del.innerHTML = "";
}
function redirectCard(copyCardId){
    var string = copyCardId.toString();
    if(string.startsWith("redirect") === false){
        var del = document.querySelector("#card-container-2");
        del.innerHTML = "";

        var itm = document.getElementById("card-"+copyCardId);
        var cln = itm.cloneNode(true);
        del.appendChild(cln);

        var heading_content = del.querySelector("#redirectPara-"+copyCardId).textContent;
        document.querySelector(".heading-center-2").textContent = heading_content;

        var removeAtt = document.querySelector("#card-container-2 .item-heading");
        removeAtt.removeAttribute('onclick');
        removeAtt.removeAttribute('style');
        
        outerContainer2.classList.remove("hidden");
        outerContainer.classList.add("hidden");
    }else{
        copyCardId = string.slice(8);
        console.log(copyCardId);
        var del = document.querySelector("#card-container-2");
        del.innerHTML = "";

        var itm = document.getElementById("card-"+copyCardId);
        var cln = itm.cloneNode(true);
        del.appendChild(cln);

        var heading_content = del.querySelector("#redirectPara-"+copyCardId).textContent;
        document.querySelector(".heading-center-2").textContent = heading_content;

        var removeAtt = document.querySelector("#card-container-2 .item-heading");
        removeAtt.removeAttribute('onclick');
        removeAtt.removeAttribute('style');
    }
    outerContainer2.classList.remove('blur');
}

function closeCard(){
    document.getElementById("addItem-card-popup").value = "";
    outerContainer.classList.toggle('blur');
    outerContainer2.classList.toggle('blur');
    addItemPop.classList.toggle('hidden');    
    if(cardcount <= 0){
        emptyInfoText.classList.remove('hidden');
    }
}

function subItemAdd(obj){
    outerContainer.classList.add('blur');
    outerContainer2.classList.add('blur');
    let card_id = obj.id;
    card_id = card_id.slice(15);    
    subItemPop.classList.toggle("hidden");    
    var subItem_popup_hidden = document.createElement('input');
    subItem_popup_hidden.setAttribute('type','hidden');
    subItem_popup_hidden.setAttribute('class','hidden-input-type');
    subItem_popup_hidden.setAttribute('value',card_id);
    subItem_popup_hidden.setAttribute('id','subitem-hidden-card-'+card_id);
    subItemPop.appendChild(subItem_popup_hidden);
    var input_subitem = document.querySelector("#subitem-card-popup");
    input_subitem.value = "";
}

function subItems_close(){
    outerContainer.classList.remove('blur');
    outerContainer2.classList.remove('blur');
    var close = document.querySelector(".subItem-pop-close-btn");    
    subItemPop.classList.toggle("hidden");
    var input_subitem = document.querySelector("#subitem-card-popup");
    input_subitem.value = "";
    input_subitem.classList.toggle("hidden");    
    document.querySelector(".hidden-input-type").remove();    
}

function subItems_add(){
    outerContainer.classList.remove('blur'); 
    var subItem_text = document.getElementById("subitem-card-popup").value;
    if(subItem_text != ""){
        ++idCount;            
        subItemPop.classList.toggle("hidden");         
        var li = document.createElement("li");
        li.classList.add("card-subitem");
        li.setAttribute('id','subitem-'+idCount);
        li.innerHTML = subItem_text+"<button class='mark-done' id='li-btn-"+idCount+"' onclick='line_through(this);'>Mark Done</button></li>";
        let card_id = document.querySelector(".hidden-input-type").value;
        var ulSubItem = document.querySelector("#card-subitems-p"+card_id);    
        ulSubItem.appendChild(li);
        document.querySelector(".hidden-input-type").remove();
        redirectCard("redirect"+card_id);
    }
}

function line_through(object) {
    var x = object.parentElement.id;    
    var y = document.querySelectorAll("#"+x);
    var z = document.querySelectorAll("#"+object.id);
    var ul_len = y.length;
    var li_len = z.length;
    if(ul_len == 1){
        y[0].classList.add("line-through-red");
        z[0].style.display = "none";
    }else if(ul_len == 2){
        y[0].classList.add("line-through-red");
        y[1].classList.add("line-through-red");
        z[0].style.display = "none";
        z[1].style.display = "none"; 
    }   
}

function removeCard(cardIdRemove){
    cardIdRemove = cardIdRemove.slice(16);
    document.querySelector("#card-"+cardIdRemove).remove();
    --cardcount;    
    if(cardcount <= 0){
        emptyInfoText.classList.remove('hidden');
    }
    redirectBack();
}
