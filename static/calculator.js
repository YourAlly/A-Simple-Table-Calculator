// Gantt Chart Size
const GANTT_SIZE = 40;

// Object that holds the functions
const ALGORITHMS = {
    'FCFS': {
        'function': fcfs,
        'columns': ['1-Process', '2-Burst_Time', '2B-Arrival_Time'],
        'requirements': ['1-Process', '2-Burst_Time'],
        'unique': ['1-Process']
    },

    'Shortest Job First': {
        'function': sjf,
        'columns': ['1-Process', '2-Burst_Time', '2B-Arrival_Time', 'Random Column'],
        'requirements': ['1-Process', '2-Burst_Time'],
        'unique': ['1-Process']
    },

    'SRTF': {
        'function': not_yet_implemented
    },

    // Example function
    'SUM': { // Select option name
        'function': calculate_sum, // Function to be used
        'columns': ['Column 1', 'Column 2'], // Additional columns
        'requirements': ['Column 1', 'Column 2'], // Required inputs
        'fill_columns': { 'Column 3': Math.floor(Math.random() * 101) }, // Columns to be filled by value if not found
        'unique': [] // Columns to have unique inputs
    }
}


/*/                                     ///
            Insert Functions Here
///                                     /*/

// Completed
function fcfs(data) {
    data['extras'] = {};

    // If arrival time exists
    if (data['2B-Arrival_Time']) {
        dict = sort_data(data['1-Process'], data['2-Burst_Time'], data['2B-Arrival_Time']);
        data['1-Process'] = dict['value_name'];
        data['2-Burst_Time'] = dict['duration'];
        data['2B-Arrival_Time'] = data['2B-Arrival_Time'].sort();
    }

    // Calculates Waiting Time
    var times = [];
    var wait = 0;
    var total_w = 0;
    for (var i = 0; i < rows; i++) {
        times.push(wait);
        total_w += wait;
        wait += parseInt(data['2-Burst_Time'][i]);
    }
    data['2A-Waiting_Time'] = times;
    data['extras']['Average_Waiting_Time'] = total_w / rows;

    // Calculates Turn Around Time
    times = [];
    var ta, total_ta = 0;
    for (var i = 0; i < rows; i++) {
        ta = parseInt(data['2-Burst_Time'][i]) + parseInt(data['2A-Waiting_Time'][i]);
        times.push(ta);
        total_ta += ta;
    }
    data['2B-Turn_Around_Time'] = times;
    data['extras']['Average_Turn_Around_Time'] = total_ta / rows;

    // Creates a gantt chart accoding to the sorted data
    create_chart(sort_data(
        data['1-Process'],
        data['2-Burst_Time'],
        data['2A-Waiting_Time']));

    return data;
}

function sjf(data) {

    console.log(data);
    data['extras'] = {};
    var dict = {};

    if (!data['2B-Arrival_Time']) {
        dict = sort_data(data['1-Process'],
            data['2-Burst_Time'],
            data['2-Burst_Time']);

        data['1-Process'] = dict['value_name'];
        data['2-Burst_Time'] = dict['duration'];
        console.log(data);
    }

    create_chart(dict);

    // Calculates Waiting Time
    var times = [];
    var wait = 0;
    var total_w = 0;
    for (var i = 0; i < rows; i++) {
        times.push(wait);
        total_w += wait;
        wait += parseInt(data['2-Burst_Time'][i]);
    }
    data['2A-Waiting_Time'] = times;
    data['extras']['Average_Waiting_Time'] = total_w / rows;

    // Calculates Turn Around Time
    times = [];
    var ta, total_ta = 0;
    for (var i = 0; i < rows; i++) {
        ta = parseInt(data['2-Burst_Time'][i]) + parseInt(data['2A-Waiting_Time'][i]);
        times.push(ta);
        total_ta += ta;
    }
    data['2B-Turn_Around_Time'] = times;
    data['extras']['Average_Turn_Around_Time'] = total_ta / rows;


    return data;
}

function not_yet_implemented(data) {
    console.log('Function not yet implemented');
    document.querySelector('#error').innerHTML('Not yet implemented');
    return data;
}

// New Function
function calculate_sum(data) {
    var sums = [];
    for (var i = 0; i < rows; i++) {
        sums.push(parseInt(data['Column 1'][i]) + parseInt(data['Column 2'][i]));
    }
    var row_name = 'Sum of Column 1 and Column 2';
    data[row_name] = sums;

    return data;
}