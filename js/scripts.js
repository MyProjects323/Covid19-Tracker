function changeDistrict() {
  let districtSelected = decodeURIComponent($("#district").val());
  let stateSelected = decodeURIComponent($("#state").val());
  // alert(districtSelected);
  let districtData = {
    ...$global_data[stateSelected]["districtData"][districtSelected],
  };
  let chartLabels = ["active", "deceased", "confirmed", "recovered"];
  let chartData = [];
  chartLabels.forEach((label) => {
    chartData.push(districtData[label]);
  });
  document.querySelector(
    ".chart-container"
  ).innerHTML = `<canvas id="pieChart"></canvas>`;
  let myChart = document.getElementById("pieChart").getContext("2d");
  let massPopChart = new Chart(myChart, {
    type: "pie", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: "Case Study",
          data: chartData,
          backgroundColor: [
            "rgba(255, 99, 132, 0.9)",
            "rgba(154, 162, 235, 0.9)",
            "rgba(255, 206, 86, 0.9)",
            "rgba(75, 192, 192, 0.9)",
          ],
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000",
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: `Cases in ${decodeURIComponent(
          districtSelected
        )} - ${decodeURIComponent(stateSelected)}`,
        fontSize: 25,
        fontFamily: "sans-serif",
        fontStyle: "Bold",
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          fontColor: "#000",
          fontStyle: "Bold",
          fontSize:20
        },
      },
      layout: {
        padding: 10,
      },
      tooltips: {
        enabled: true,
      },
    },
  });
}

$global_data = {};
function changeState() {
  let stateSelected = decodeURIComponent($("#state").val());
  let districtsData = { ...$global_data[stateSelected]["districtData"] };
  // console.log(districtsData);
  document.getElementById(
    "district"
  ).innerHTML = `<option selected disabled>Select District</option>`;
  let districtNames = Object.keys(districtsData);
  let districtOptions = ``;
  districtNames.forEach((district) => {
    districtOptions +=
      `<option value="` +
      encodeURIComponent(district) +
      `">` +
      district +
      `</option>`;
  });
  document.getElementById("district").innerHTML += districtOptions;
}

function getData() {
  // alert('GET DATA');
  var url = "https://api.covid19india.org/state_district_wise.json";
  $.getJSON(url, function (data) {
    if (typeof data == undefined) {
      alert("ERROR IN RECEIVING DATA");
    } else {
      alert("DATA RECEIVED SUCCESSFULLY");
      // console.log('Fetched data succesffully');
      // console.log(data);
      $global_data = data;
      document.getElementById("state").innerHTML = `<option selected disabled>Select State</option>`;
      let stateNames = Object.keys($global_data);
      let stateOptions = ``;
      stateNames.forEach((state) => {
        stateOptions +=
          `<option value="` +
          encodeURIComponent(state) +
          `">` +
          state +
          `</option>`;
      });
      document.getElementById("state").innerHTML += stateOptions;
    }
  });
}
