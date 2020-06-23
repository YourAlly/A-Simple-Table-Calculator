const COLUMN_VALUES = ['1-Process', '2-Burst_Time', '3-Arrival_Time', '4-Priority']
const ALGORITHMS = ['FCFS', 'SJF', 'SRTF', 'PS', 'RR']
let rows, cols;

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
            table_change();
        };

    })

    // Loads Algorithm Selector
    for (algorithm of ALGORITHMS) {
        option = document.createElement('option');
        option.innerHTML = algorithm;
        option.value = algorithm;
        document.querySelector('#algo').append(option);
    }

    // Sets form's onsubmit value to a function
    document.querySelector('#submit').onclick = () => {
        submit_form();
    };

    // Creates Table Once
    table_change();
})

function table_change() {
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
            // Just to make it look nicer
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
    data['Sum_of_burst_time_and_arrival_time'] = calculate_sum(data);
    console.log(data['Sum_of_burst_time_and_arrival_time']);

    console.log(data);
    fill_table(data);
}

// Just to try out the calculator functionality

// Calculations
function calculate_sum(data) {
    // TODO
    var sums = [];
    for (var i = 0; i < rows; i++) {
        sums.push(parseInt(data['2-Burst_Time'][i]) + parseInt(data['3-Arrival_Time'][i]));
    }
    return sums;
}

