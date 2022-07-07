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

submitBtn.addEventListener("click", (e) => handleSubmit(e));
resetBtn.addEventListener("click", (e) => resetData(e));

// INITIALIZE PAGE ON START
initialize();

function initialize() {
  // LETS CHECK IF API AND REGION IN IN STORAGE TO PICK UP
  const storedApiKey = localStorage.getItem("apiKey");
  const storedRegionKey = localStorage.getItem("regionName");

  // IF THERE IS NOTHING IN STORAGE
  if (storedApiKey === null || storedRegionKey === null) {
    form.hidden = false;
    submitBtn.hidden = false;
    results.hidden = true;
  } else {
    displayCarbonData(storedApiKey, storedRegionKey);
    form.hidden = true;
    submitBtn.hidden = true;
    results.hidden = false;
  }
}

// HANDLE SUBMIT DATA
function handleSubmit(e) {
  e.preventDefault();
  if (API.value != "" && region.value != "") {
    handleData(API.value, region.value);
  }
}

// COLLECT DETAILS AND DISPLAY TO VIEW
function handleData(apiKey, region_code) {
  localStorage.setItem("apiKey", apiKey);
  localStorage.setItem("regionName", region_code);
  results.hidden = false;
  form.hidden = true;
  submitBtn.hidden = true;
  displayCarbonData(apiKey, region_code);
}

// RESET ALL DATA
function resetData(e) {
  e.preventDefault();
  localStorage.removeItem("regionName");
  location.reload();
}

// DISPLAY ALL INPUT DATA TO VIEW
async function displayCarbonData(apiKey, region_code) {
  const URL = `https://cors-anywhere.herokuapp.com/https://api.co2signal.com/v1/latest?countryCode=${region_code}`;
  const options = {
    headers: {
      "auth-token": apiKey,
    },
  };
  fetch(URL, options)
    .then((response) => response.json())
    .then((data) => {
      const CO2_value = Math.floor(data.data.carbonIntensity);
      const FuelPercent = data.data.fossilFuelPercentage.toFixed(2);
      carbonData.innerHTML = `<span> ${CO2_value} grams C0<sub>2</sub> emitted per Kwhr</span>`;
      fuelData.textContent = `${FuelPercent} % of fossil fuels used to generate electricity)`;
      regionData.textContent = region_code;
    })
    .catch((error) => console.error(error));
}
