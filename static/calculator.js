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
    'SUM': {                                                                // Select option name
        'function': calculate_sum,                                          // Function to be used
        'columns': ['Column 1', 'Column 2'],                                // Additional columns
        'requirements': ['Column 1', 'Column 2'],                           // Required inputs
        'fill_columns': { 'Column 3': Math.floor(Math.random() * 101) },    // Columns to be filled by value if not found
        'unique': []                                                        // Columns to have unique inputs
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


/*/                                         ///
            The front-end JavaScript
///                                         /*/


let rows, cols;

document.addEventListener('DOMContentLoaded', () => {
    // Loads the table size selectors
    document.querySelectorAll('.size').forEach((selector) => {
        var max = parseInt(selector.dataset.max);
        var min = parseInt(selector.dataset.min);

        // Fills it with the options available
        var item;
        for (var i = min; i <= max; i++) {
            item = document.createElement('option');
            item.value = i;
            item.innerHTML = i;
            selector.append(item);
        }

        // It looks cooler when you do it like this
        selector.onchange = () => {
            print_form();
        };
    })

    // Loads Algorithm Selectors
    var option, algo = document.querySelector('#algo');
    for (key of Object.keys(ALGORITHMS)) {
        option = document.createElement('option');
        option.innerHTML = key;
        option.value = key;
        algo.append(option);
    }
    algo.onchange = () => {
        print_head_options();
    };

    // Sets form's onsubmit value to a function
    document.querySelector('#submit').onclick = () => {
        submit_form();
    };

    // Creates Table Once
    print_form();
})

function print_form() {
    rows = parseInt(document.querySelector('#rows').value);
    cols = parseInt(document.querySelector('#cols').value);

    // Prints Head selectors
    print_head_options();

    // Table input fields
    print_input_forms(rows, cols);
}

function print_head_options() {
    cols = parseInt(document.querySelector('#cols').value);

    // Head selectors
    var CV_copy = [];

    var key = document.querySelector('#algo').value;

    if (ALGORITHMS[key]['columns']) {
        for (key of ALGORITHMS[key]['columns']) {
            CV_copy.push(key);
        }
    }

    var head = document.querySelector('#table-header');
    head.innerHTML = null;
    head.append(document.createElement('br'));

    for (var i = 0; i < cols; i++) {
        var select = document.createElement("select");
        select.className = `select-area`;
        select.name = `col-header-${i + 1}`;

        for (var j = 0; j < CV_copy.length; j++) {
            var item = document.createElement('option');
            item.value = CV_copy[j];
            item.innerHTML = CV_copy[j].split('_').join(' ').replace(/[a-zA-Z1-9]+-/, '');

            // Just to make it look and feel nicer
            if (i === j) {
                select.value = item.value;
                item.selected = "selected";
            }
            select.append(item);
        }
        head.append(select);
    }
}

function print_input_forms(rows, cols) {
    var body = document.querySelector('#table-body');
    body.innerHTML = null;
    for (var i = 0; i < rows; i++) {
        row = document.createElement('div');
        row.className = `row-${i + 1}`;

        for (var j = 0; j < cols; j++) {
            var field = document.createElement('input');
            field.type = 'text';
            field.className = 'input-area';
            field.name = `col-${j + 1}`;
            field.autocomplete = 'off';
            row.append(field);
        }
        body.append(row);
    }
    body.append(document.createElement('br'));
}

// Submits the form via an XML Http request
function submit_form() {
    var request = new XMLHttpRequest();

    // Opens up a connection to the url (It's like opening a file)
    request.open("POST", "/submit");
    request.responseType = 'json';

    // Sets XML Http Request's onload value to a function
    request.onload = () => {
        let response = request.response;
        document.querySelector('.messages').innerHTML = null;
        if (!response['error']) {
            process_data(response);
        }
        else {
            alert("Something went wrong");
            document.querySelector('#error').innerHTML = response['error'];
        }
    };

    // Sending the form data to server just to get a js object back
    request.send(new FormData(document.querySelector("#form")));
}

function create_chart(arrays) {

    // Gantt Chart Title
    document.querySelector('#gantt-title').innerHTML = "Gantt Chart:<br>";

    // Creates the Gantt Chart
    var lc = 0, current = 0;
    var printed = false, start = true;
    total = arrays['duration'].reduce((x, y) => { return x + y });
    var gantt = document.querySelector('#gantt-title');
    for (var i = 0; i < rows; i++) {
        lc = Math.round(GANTT_SIZE * (arrays['duration'][i]) / total);

        if (start) {
            gantt.innerHTML += `| ${current} |`;
            start = false;
        }

        if (lc < 1) {
            gantt.innerHTML += ` <b>${arrays['value_name'][i]}</b> `;
            printed = !printed;
        }

        for (var j = 0; j < lc; j++) {
            if (j == Math.floor(lc / 2) && !printed) {
                gantt.innerHTML += ` <b>${arrays['value_name'][i]}</b> `;
                printed = !printed;
            }
            gantt.innerHTML += '-';
        }

        current += sorted['duration'][i];
        gantt.innerHTML += `| ${current} |`;
        printed = false;
    }
}

// Creates the table for the answer
function fill_table(data) {
    document.querySelector('#table-title').innerHTML = document.querySelector('#algo').value;
    var table = document.querySelector('table');
    table.innerHTML = null;
    var row, cell;

    // Table Header
    var table_head = document.createElement('thead');
    var head_row = document.createElement('tr');

    for (key of Object.keys(data)) {
        if (key == 'extras') { continue }
        cell = document.createElement('td');
        cell.innerHTML = key.split('_').join(' ').replace(/[a-zA-Z1-9]+-/, "");
        head_row.append(cell);
    }
    table_head.append(head_row);
    table.append(table_head);

    // Table Rows
    var table_body = document.createElement('tbody');
    for (var i = 0; i < rows; i++) {
        row = document.createElement('tr');
        for (key of Object.keys(data)) {
            if (key == 'extras') { continue }
            cell = document.createElement('td');
            cell.innerHTML = data[key][i];
            row.append(cell);
        }
        table_body.append(row);
    }
    table.append(table_body);
}

function print_extras(extras) {
    var span;
    var div = document.querySelector('#extras');
    for (key of Object.keys(extras)) {
        span = document.createElement('span');
        span.className = 'extras';
        span.innerHTML = `${key.split('_').join(' ')}: ${extras[key]}`;
        div.append(span);
        div.append(document.createElement('br'));
    }
}


/*/                                        ///
        Not-too front-end stuff
///                                         /*/


// The heart of the program
function process_data(data) {

    // Returns a console log if function returns nothing
    data = check_data(data);
    if (!data) {
        return alert('Something went wrong');
    }

    // Removes the Gantt Chart and extras if they exist
    document.querySelector('#gantt-title').innerHTML = null;
    document.querySelector('#gantt').innerHTML = null;
    document.querySelector('#extras').innerHTML = null;
    // Calculations time

    data = ALGORITHMS[document.querySelector('#algo').value]['function'](data);
    // Fills the table and extras
    
    fill_table(data);
    if (data['extras']) {
        print_extras(data['extras']);
    }
}

// Checks for the required columns, fills the columns, and checks if the values are unique
function check_data(data) {
    var selected = document.querySelector('#algo').value;
    var error = document.querySelector('#error');

    if (ALGORITHMS[selected]['fill_columns']) {
        for (key of Object.keys(ALGORITHMS[selected]['fill_columns'])) {
            if (!data[key]) {
                arr = [];
                for (var i = 0; i < rows; i++) {
                    arr.push(ALGORITHMS[selected]['fill_columns'][key])
                }
                data[key] = arr;
            }
        }
    }

    if (ALGORITHMS[selected]['requirements']) {
        for (requirement of ALGORITHMS[selected]['requirements']) {
            if (!data[requirement]) {
                error.innerHTML = `Error: COLUMN-${requirement} doesn't exist`;
                return null;
            }
        }
    }

    if (ALGORITHMS[selected]['unique']) {
        for (unique of ALGORITHMS[selected]['unique']) {
            if (!data[unique]) {
                error.innerHTML = `Error: COLUMN-${unique} doesn't exist`;
                return null;
            }

            var set = new Set();
            var arr = data[unique];

            for (value of data[unique]) {
                if (set.has(value)) {
                    error.innerHTML = `Error: COLUMN-${unique} can't have similar values`;
                    return null;
                }
                set.add(value);
            }
        }
    }

    return data;
}

function sort_data(value_name, duration, sort_by) {

    // Sorts the Values
    var values = [];
    for (var i = 0; i < rows; i++) {
        values.push([value_name[i], parseInt(duration[i]), parseInt(sort_by[i])]);
    }
    values = values.sort((a, b) => { return a[2] - b[2] });

    // Creates an object to hold the sorted data
    sorted = {
        'value_name': [],
        'duration': [],
        'sort_by': []
    }

    for (value of values) {
        sorted['value_name'].push(value[0]);
        sorted['duration'].push(value[1]);
        sorted['sort_by'].push(value[2]);
    }

    return sorted
}
