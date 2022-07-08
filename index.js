// FORM DETAILS
const form = document.querySelector(".form_container");
const region = document.querySelector("#region");
const API = document.querySelector("#api");
const submitBtn = document.querySelector("#submit_btn");

// RESULTS
const results = document.querySelector(".results");
const regionData = document.querySelector("#reg_table_data");
const carbonData = document.querySelector("#carbon_table_data");
const fuelData = document.querySelector("#fuel_table_data");
const resetBtn = document.querySelector("#reset");

onPageLoad();

// DISPLAY FORM AND HIDE RESULTS WHEN THE PAGE LOADS
function onPageLoad() {
  form.hidden = false;
  submitBtn.hidden = false;
  results.hidden = true;
}

// HANDLE SUBMIT DETAILS
submitBtn.addEventListener("click", (e) => handleSubmit(e));

// FUNCTION TO HANDLE SUBMIT
function handleSubmit(e) {
  e.preventDefault();
  if (API.value != "" && region.value != "") {
    displayCarbonData(API.value, region.value);
  } else {
    alert("ERROR: PLEASE ENTER CORRECT DETAILS");
  }
}

// HANDLE RESET DETAILS
resetBtn.addEventListener("click", (e) => resetData(e));

// FUNCTION TO RESET DATA
function resetData() {
  e.preventDefault();
  location.reload();
}

async function displayCarbonData(apiKey, regionCode) {
  const URL = `https://cors-anywhere.herokuapp.com/https://api.co2signal.com/v1/latest?countryCode=${regionCode}`;
  const options = {
    headers: {
      "auth-token": apiKey,
    },
  };
  const response = await fetch(URL, options);
  if (!response.ok) {
    alert(
      response.status +
        " ERROR: SORRY, THERE SEEMS TO BE AN ERROR."
    );
  } else {
    const data = await response.json();
    const CO2_value = Math.floor(data.data.carbonIntensity);
    const FuelPercent = data.data.fossilFuelPercentage.toFixed(2);
    carbonData.innerHTML = `<span> ${CO2_value} grams C0<sub>2</sub> emitted per Kwhr</span>`;
    fuelData.textContent = `${FuelPercent} % of fossil fuels used to generate electricity)`;
    regionData.textContent = regionCode;
    form.hidden = true;
    submitBtn.hidden = true;
    results.hidden = false;
  }
}
