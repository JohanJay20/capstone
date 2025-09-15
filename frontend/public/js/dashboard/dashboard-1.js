(function($) {
    "use strict"

 var dzChartlist = function(){
	var marketChart = function(){
		 var options = {
          series: [{
          name: 'series1',
          data: [200, 400, 300, 400, 200, 400, 200,300, 200, 300]
        }],
          chart: {
          height: 350,
          type: 'area',
		  toolbar:{
			  show:false
		  }
        },
		colors:["#00ADA3"],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
		  width:3
        },
		legend:{
			show:false
		},
		grid:{
			show:false,
			strokeDashArray: 6,
			borderColor: '#dadada',
		},
		yaxis: {
		  labels: {
			style: {
				colors: '#B5B5C3',
				fontSize: '12px',
				fontFamily: 'Poppins',
				fontWeight: 400
				
			},
			formatter: function (value) {
			  return value + "k";
			}
		  },
		},
        xaxis: {
          categories: ["Week 01","Week 02","Week 03","Week 04","Week 05","Week 06","Week 07","Week 08","Week 09","Week 10"],
		  labels:{
			  style: {
				colors: '#B5B5C3',
				fontSize: '12px',
				fontFamily: 'Poppins',
				fontWeight: 400
				
			},
		  }
        },
		fill:{
			type:'solid',
			opacity:0.05
		},
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
        };

        var chart = new ApexCharts(document.querySelector("#marketChart"), options);
        chart.render();
	}

	

	
	
	/* Function ============ */
		return {
			init:function(){
			},
			
			
			load:function(){
					marketChart();
				
			},
			
			resize:function(){
			}
		}
	}();
	jQuery(window).on('load',function(){
		setTimeout(function(){
			dzChartlist.load();
		}, 1000); 
		
	});

	jQuery(window).on('resize',function(){
		
		
	});     

})(jQuery);