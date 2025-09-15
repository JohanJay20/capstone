(function($) {
    "use strict" 


 var dzChartlist = function(){
	let draw = Chart.controllers.line.__super__.draw; //draw shadow
	var screenWidth = $(window).width();

	
	var pieChart = function(){
		 var options = {
          series: [34, 12, 41, 22, 20,30,25],
          chart: {
          type: 'donut',
		  height:200
        },
		dataLabels: {
          enabled: false
        },
		stroke: {
          width: 0,
        },
		colors:['#374C98', '#FFAB2D', '#FF782C', '#00ADA3', '#A3E635', '#FB7185', '#F3C81E'],
		legend: {
              position: 'bottom',
			  show:false
            },
        responsive: [{
          breakpoint: 768,
          options: {
           chart: {
			  width:200
			},
          }
        }]
        };

        var chart = new ApexCharts(document.querySelector("#pieChart"), options);
        chart.render();
    
	}
	
	/* Function ============ */
		return {
			init:function(){
			},
			
			
			load:function(){			
		
				pieChart();
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