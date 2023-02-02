async function getData() {
  const response = await fetch("./data.json");
  const myData = await response.json();

  const xData = [];
  const yData = []
  const barColors = [];
  const hoverBarColors = [];
  const mediaQuery = window.matchMedia('(min-width: 820px)'); //for changing font size and caret padding

  for (let i = 0; i < 7; i++) {
    xData.push(myData[i].day);
    yData.push(myData[i].amount);
    barColors.push("hsl(10, 79%, 65%)");   //color every bar soft red
    hoverBarColors.push("hsla(10, 79%, 65%, 0.7)"); //color on hover every bar transparent red
  }

  //search for the maximum value and color its bar cyan
  var maxValue = 0;
  var maxIndex = 0;
  for (let i = 0; i < 7; i++) {
    if (myData[i].amount > maxValue) {
      maxValue = myData[i].amount;
      maxIndex = i;
    }
  }
  barColors[maxIndex] = "hsl(186, 34%, 60%)";
  hoverBarColors[maxIndex] = "hsla(186, 34%, 60%, 0.7)";

  //get the sum of all values and show it in the total
  var sum = 0;
  for (let i = 0; i < 7; i++) {
    sum += yData[i];
  }
  document.getElementById("total").textContent = sum;

  //set defalt properties
  Chart.defaults.borderColor = 'transparent'; //remove bottom line
  Chart.defaults.font.family = 'DM Sans';

  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: xData,
      datasets: [{
        data: yData,
        backgroundColor: barColors,
        hoverBackgroundColor: hoverBarColors,
        borderRadius: 4,
        borderSkipped: false //round bottom corners
      }]
    },
    options: {
      plugins: {
        title: {
          display: false,
        },
        legend: {
          display: false,
        },
        tooltip: {
          xAlign: "center",
          yAlign: "bottom",
          backgroundColor: "hsl(25, 47%, 15%)",
          caretSize: 0,
          caretPadding: 9,
          displayColors: false,
          bodyFont: {
            size: () => {
              if (mediaQuery.matches) {
                return 18
              } else {
                return 14
              }
            },
            weight: 700
          },
          padding: () => {
            if (mediaQuery.matches) {
              return 9
            } else {
              return 4
            }
          },
          callbacks: {
            title: () => null,
            label: (context) => {
              return '$' + context.parsed.y
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: "hsl(28, 10%, 53%)",
            font: {
              size: () => {
                if (mediaQuery.matches) {
                  return 15
                } else {
                  return 12
                }
              }
            }
          },
          grid: {
            display: false
          }
        },
        y: {
          display: false,
          grace: "50%" //add space above bars
        }
      }
    }
  });
}

window.addEventListener("load", getData);
