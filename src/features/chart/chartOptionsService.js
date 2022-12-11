const duplicateItem = (arr) => {
  const countObj = {};
  arr.forEach((arrItem)=> {
    countObj[arrItem] = ++countObj[arrItem] || 1;
  });
  const values = Object.values(countObj);
  return values;
};

const createChartOptions = (categories, dateChart, max) => ({
    chart: {
        type: 'bar'
      },
      title: {
        text: `Label's words`
      },
      xAxis: {
        min: 0,
        max: max-1,
        categories,
        title: {
          text: 'Words Count'
        }
      },
      yAxis: {
        min: 0,
        max: dateChart.reduce((a, b) => Math.max(a, b), -Infinity),
        // Returns -Infinity if no parameters are provided.
        // max: Math.max(...dateChart) is equivalent. But (...) will either fail 
        // or return the wrong result if the array has too many elements.
        // Because they try to pass the array elements as function parameters
        title: {
          text: 'Record Count',
          align: 'high'
        },
        labels: {
          overflow: 'justify',
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        name: 'Record count',
        data: dateChart
      }
    ]
  });

  export { createChartOptions, duplicateItem };