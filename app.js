async function getData() {
  const response = await fetch("./data.json");
  const myData = await response.json();

  const xData = [];
  const yData = [];
  const barColors = [];
  const hoverBarColors = [];
  const weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const mediaQuery = window.matchMedia('(min-width: 820px)'); //for changing font size and caret padding

  for (let i = 0; i < 7; i++) {
    xData.push(myData[i].day);
    yData.push(myData[i].amount);
    barColors.push("hsl(10, 79%, 65%)");   //color every bar soft red
    hoverBarColors.push("hsla(10, 79%, 65%, 0.7)"); //color on hover every bar transparent red
  }

  //get the current day and convert it so the week starts on Monday  
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const todayIndex = (currentDay + 6) % 7;

  barColors[todayIndex] = "hsl(186, 34%, 60%)";
  hoverBarColors[todayIndex] = "hsla(186, 34%, 60%, 0.7)";

  //get the sum of all values and show it in the total
  //add text with data for screen readers
  var sum = 0;
  var text = "";
  for (let i = 0; i < 7; i++) {
    sum += yData[i];
    text += weekday[i] + " $" + yData[i] + " ";
  }
  document.getElementById("total").textContent = "$" + sum.toFixed(2);
  document.getElementById("chartText").textContent = text;

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
