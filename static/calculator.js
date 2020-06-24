// You can insert new stuff here too
const COLUMN_VALUES = ['1-Process', '2-Burst_Time', '3-Arrival_Time', '4-Priority']

// Gantt Chart Size
const GANTT_SIZE = 70;

// Object that holds the functions
const ALGORITHMS = {
    'FCFS': {
        'function': fcfs,
        'requirements': ['1-Process', '2-Burst_Time'],
        'unique': ['1-Process']
    },

    'SJF': {
        'function': not_yet_implemented
    },

    'SRTF': {
        'function': not_yet_implemented
    },

    'PS': {
        'function': not_yet_implemented
    },

    'RR': {
        'function': not_yet_implemented
    },

    // New function
    'SUM': {
        'function': calculate_sum,                          // Function to be used
        'requirements': ['1-Process', '2-Burst_Time'],      // Required inputs
        'fill_columns': ['3-Arrival_Time'],                 // Columns to be filled if they don't exist
        'unique': ['1-Process']                             // Columns to have unique inputs
    }
}


/*/                                     ///
            Insert Functions Here
///                                     /*/


function fcfs(data) {
    var wait = 0;
    var times = [];
    for (var i = 0; i < rows; i++) {
        times.push(wait);
        wait += parseInt(data['2-Burst_Time'][i])
    }
    data['5-Waiting_Time'] = times;

    // Creates a Gantt Chart
    document.querySelector('#gantt-title').innerHTML = 'Gantt Chart:';
    var gantt = '';
    var sr = 6;
    for (var i = 0; i < rows; i++) {
        lc = Math.round(GANTT_SIZE * (parseInt(data['2-Burst_Time'][i]) / wait)) - sr;
        for (var j = 0; j < lc; j++) {
            gantt += '-';
        }
        gantt += ` |<b>${data['1-Process'][i]}</b> (${data['2-Burst_Time'][i]})| `;
    }
    document.querySelector('#gantt').innerHTML = gantt;
    return data;
}


function not_yet_implemented(data) {
    console.log('Function not found');
    document.querySelector('#error').innerHTML('Not yet implemented');
    return data;
}


// New Function
function calculate_sum(data) {
    var sums = [];
    for (var i = 0; i < rows; i++) {
        sums.push(parseInt(data['2-Burst_Time'][i]) + parseInt(data['3-Arrival_Time'][i]));
    }
    var row_name = 'Sum_of_Burst_time_and_Arrival_time';
    data[row_name] = sums;
    console.log(data[row_name]);

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

    // Loads Algorithm Selector
    var option;
    for (key of Object.keys(ALGORITHMS)) {
        option = document.createElement('option');
        option.innerHTML = key;
        option.value = key;
        document.querySelector('#algo').append(option);
    }

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

    // Head selectors
    var CV_copy = COLUMN_VALUES;
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
            item.innerHTML = CV_copy[j].replace("_", " ").slice(2);

            // Just to make it look and feel nicer
            if (i === j) {
                select.value = item.value;
                item.selected = "selected";
            }
            select.append(item);
        }
        head.append(select);
    }

    // Table input fields
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

            // Removes the Gantt Chart if it exists
            document.querySelector('#gantt-title').innerHTML = null;
            document.querySelector('#gantt').innerHTML = null;
            calculate_answer(response);
        }
        else {
            document.querySelector('#error').innerHTML = response['error'];
        }
    };

    // Sending the form data to server just to get a js object back
    request.send(new FormData(document.querySelector("#form")));
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
        cell = document.createElement('td');
        cell.innerHTML = key.split('_').join(" ");
        cell.innerHTML = cell.innerHTML.replace(`${parseInt(cell.innerHTML)}-`, "");
        head_row.append(cell);
    }
    table_head.append(head_row);
    table.append(table_head);

    // Table Rows
    var table_body = document.createElement('tbody');
    for (var i = 0; i < rows; i++) {
        row = document.createElement('tr');
        for (key of Object.keys(data)) {
            cell = document.createElement('td');
            cell.innerHTML = data[key][i];
            row.append(cell);
        }
        table_body.append(row);
    }
    table.append(table_body);
}


/*/                                        ///
        The actual calculator stuff
///                                         /*/


function calculate_answer(data) {

    // If Arrival_Time column doesn't exist set all to 0
    data = check_data(data);
    if (!data) {
        return console.log('Something went wrong');
    }

    // Calculations time
    data = ALGORITHMS[document.querySelector('#algo').value]['function'](data);

    // Logs data into the console and fills the table
    console.log(data);
    fill_table(data);
}


// Checks the fills the columns, checks for the required columns, and checks if the values are unique
function check_data(data) {
    var selected = document.querySelector('#algo').value;
    var error = document.querySelector('#error');

    if (ALGORITHMS[selected]['fill_columns']) {
        for (fill_column of ALGORITHMS[selected]['fill_columns']) {
            if (!data[fill_column]) {
                arr = [];
                for (var i = 0; i < rows; i++) {
                    arr.push(0)
                }
                data[fill_column] = arr;
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
