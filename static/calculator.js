const COLUMN_VALUES = ['1-Process', '2-Burst_Time', '3-Arrival_Time', '4-Priority']

// Object that holds the functions
const ALGORITHMS = {
    'SUM':  calculate_sum,
    'FCFS': '',
    'SJF':  '',
    'SRTF': '',
    'PS':   '',
    'RR':   ''
}

let rows, cols;

/*/                                     ///
        The front-end JavaScript
 ///                                   /*/

document.addEventListener('DOMContentLoaded', () => {

    // Loads the table size selectors
    document.querySelectorAll('.size').forEach((selector) => {
        max = parseInt(selector.dataset.max);
        min = parseInt(selector.dataset.min)

        // Fills it with the options available
        for (var i = min; i <= max; i++) {
            var item = document.createElement('option');
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
    CV_copy = COLUMN_VALUES;
    var head = document.querySelector('#table-header');
    head.innerHTML = '';
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
    body.innerHTML = '';
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


function fill_table(data) {
    table = document.querySelector('table');
    table.innerHTML = '';

    // Table Header
    table_head = document.createElement('thead');
    head_row = document.createElement('tr');

    for (key of Object.keys(data)) {
        cell = document.createElement('td');
        cell.innerHTML = key.split('_').join(" ");
        cell.innerHTML = cell.innerHTML.replace(`${parseInt(cell.innerHTML)}-`, "");
        head_row.append(cell);
    }
    table_head.append(head_row);
    table.append(table_head);

    // Table Rows
    table_body = document.createElement('tbody');
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


/*/                                     ///
        The actual Math Stuff
 ///                                   /*/

function submit_form() {
    request = new XMLHttpRequest();

    // Opens up a connection to the url (It's like opening a file)
    request.open("POST", "/submit");
    request.responseType = 'json';

    // Sets XML Http Request's onload value to a function
    request.onload = () => {
        let response = request.response;
        document.querySelector('.messages').innerHTML = '';
        if (!response['error']) {
            calculate_answer(response);
        }
        else {
            document.querySelector('#error').innerHTML = response['error'];
        }
    };

    // Sending the form data to server just to get a js object back
    request.send(new FormData(document.querySelector("#form")));
}


function calculate_answer(data) {

    // If Arrival_Time column doesn't exist set all to 0
    if (!data['3-Arrival_Time']) {
        var values = [];
        for (var i = 0; i < rows; i++) {
            values.push(0);
        }
        data['3-Arrival_Time'] = values;
    }

    // Calculations time
    data = ALGORITHMS[document.querySelector('#algo').value](data);

    // Logs data into the console and fills the table
    console.log(data);
    fill_table(data);
}


// Just to try out the calculator functionality
function calculate_sum(data) {
    // TODO
    var sums = [];
    for (var i = 0; i < rows; i++) {
        sums.push(parseInt(data['2-Burst_Time'][i]) + parseInt(data['3-Arrival_Time'][i]));
    }
    var row_name = 'Sum_of_Burst_time_and_Arrival_time';
    data[row_name] = sums;
    console.log(data[row_name]);

    return data;
}

// Insert functions here

