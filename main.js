// FORM DETAILS
const region = document.querySelector('#region');
const apiKey = document.querySelector('#api');
const submitBtn = document.querySelector('#submit_btn');


// RESULTS
const carbonData = document.querySelector('#carbon_table_data');
const fuelData = document.querySelector('#fuel_table_data');
const resetBtn = document.querySelector('#reset');
console.log(submitBtn);

submitBtn.addEventListener('click',handleSubmit(e));
resetBtn.addEventListener('click',resetData(e));