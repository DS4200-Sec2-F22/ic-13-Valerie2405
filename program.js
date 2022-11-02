// First, we need a frame
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.left - MARGINS.right;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.top - MARGINS.bottom;

// create the frame of the scatterplot 
const FRAME1 = d3.select("#graph1")
						.append("svg")
							.attr("height", FRAME_HEIGHT)
							.attr("width", FRAME_WIDTH)
							.attr("class", "frame");

                            // create the frame of the scatterplot 
const FRAME2 = d3.select("#graph2")
						.append("svg")
							.attr("height", FRAME_HEIGHT)
							.attr("width", FRAME_WIDTH)
							.attr("class", "frame");
// build the scatterplot onto the canvas using the data in the given file 

function build_graph1() {
	// read data from the file 
	d3.csv("data/city-hall.csv").then((data) => {

		// adjust the data to the pixels of the canvas 
		// since number above 10 connot be inputed this number is hardcoded
		const X_MAX = 10
		const X_SCALE = d3.scaleLinear()
							.domain([0, X_MAX])
							.range([0, VIS_HEIGHT]);

		// adjust the data according to the pixels of the canvas 
		// since numbers above 10 cannot eb inputted this number is hardcoded 
		const Y_MAX = 10 
		const Y_SCALE = d3.scaleLinear()
							.domain([0, Y_MAX])
							.range([VIS_HEIGHT, 0]);

		// make the x_axis 
		FRAME1.append("g")
						.attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")")
						.call(d3.axisBottom(X_SCALE).ticks(10))
							.attr("font-size", "10px")

		
		// make the Y-axis 
		FRAME1.append("g")
						.attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")")
						.call(d3.axisLeft(Y_SCALE).ticks(10))
							.attr("font-size", "10px");
                    
        const csvToChartData = csv =>{//shape data to include in timeseries graph
            const lines = csv.trim().split('\n');
            lines.shift(); //removes titles
            return lines.map(line =>{
                const[datetime_measured,total_demand] = line.split(',');
                return{
                    x:datetime_measured,
                    y:total_demand
                };
            
            })
        }
        


		
	});
};
build_graph1();