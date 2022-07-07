// FORM DETAILS
const form = document.querySelector(".form_container");
const region = document.querySelector("#region");
const apiKey = document.querySelector("#api");
const submitBtn = document.querySelector("#submit_btn");

// RESULTS
const results = document.querySelector(".results");
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
    console.log("no value");
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
  handleData(apiKey.value, region.value);
}

// COLLECT DETAILS AND DISPLAY TO VIEW
function handleData(apiKey, region) {
  localStorage.setItem("apiKey", apiKey);
  localStorage.setItem("regionName", region);
  results.hidden = false;
  form.hidden = true;
  submitBtn.hidden = true;
  displayCarbonData(apiKey, region);
}

// RESET ALL DATA
function resetData(e) {
  e.preventDefault();
  localStorage.removeItem("regionName");
  location.reload();
}

async function displayCarbonData(apiKey, region) {
  const res = await fetch(
    `https://cors-anywhere.herokuapp.com/https://api.co2signal.com/v1/latest?countryCode=${region}`,
    {
      headers: {
        "auth-token": apiKey,
      },
    }
  );
  const data = await res.json();
  const CO2_value = data.data.carbonIntensity;
}
