// let baseUrl = "https://api.freecurrencyapi.com/v1/latest?apikey="
// const apiKey = "fca_live_deIc4D0SqfdRqm0z6u6toqwU4HQRvEqPrCkYTUrk";

// const { defaultConfiguration } = require("express/lib/application");

let flagApiStart = "https://flagsapi.com/";
let flagApiEnd = "/flat/64.png";

// let requestUrl = `${baseUrl}${apiKey}`;

let requestUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
// console.log(requestUrl);

let fromCurrency = document.querySelector(".from select");
let toCurrency = document.querySelector(".to select");

let msg = document.querySelector(".rate");
let btn = document.querySelector(".submit-button");

let dropdowns = document.querySelectorAll(".dropdown select");
let swapBtn = document.getElementById("swap");


for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });

}





const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `${flagApiStart}${countryCode}${flagApiEnd}`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

const updateExchangeRate = async ()=>{

    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    
    if(amountVal=="" || amountVal<1){
        amountVal = 1;
        amount.value="1";
    }
    // let URL =  `${requestUrl}&currencies=${toCurrency.value}&base_currency=${fromCurrency.value}`;
    let URL =  `${requestUrl}${fromCurrency.value.toLowerCase()}.json`;

    // console.log(URL);  
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    let finalAmount = rate*amountVal;
    msg.innerText = `${amountVal} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;
};

function swap(){

    var fromc = document.getElementById("from");
    var toc = document.getElementById("to");
    var temp = fromc.value;
    fromc.value = toc.value;
    toc.value = temp;

    updateSelected(fromc);
    updateSelected(toc);
    // console.log(fromc.options[fromc.selectedIndex]);
    // console.log(toc.options[toc.selectedIndex]);
    updateExchangeRate();

    function updateSelected(selectElement){
        updateFlag(selectElement);
        var selectedValue = selectElement.value;
        var opt = selectElement.options;
        for(var i=0;i<opt.length;i++){
            if(opt[i].value === selectedValue){
                opt[i].selected = true;
            }else{
                opt[i].selected = false;
            }
        }
    }
    
}

// console.log(amount.value);

btn.addEventListener("click",(event) =>{
    event.preventDefault();
    updateExchangeRate();
});
swapBtn.addEventListener("click",(event)=>{
    event.preventDefault();
    swap();
});

window.addEventListener("load", () => {
    updateExchangeRate();
  });

// console.log(fromCurrency.options[fromCurrency.selectedIndex]);
// console.log(toCurrency.options[toCurrency.selectedIndex]);


