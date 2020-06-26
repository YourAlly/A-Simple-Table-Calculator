let rows, cols;

document.addEventListener('DOMContentLoaded', () => {
    // Loads the table size selectors
    document.querySelectorAll('.size').forEach((selector) => {
        const max = parseInt(selector.dataset.max);
        const min = parseInt(selector.dataset.min);

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
    const CV_copy = [],
        algo = document.querySelector('#algo').value;
    if (ALGORITHMS[algo]['columns']) {
        for (key of ALGORITHMS[algo]['columns']) {
            CV_copy.push(key);
        }
    }

    const head = document.querySelector('#table-header');
    head.innerHTML = null;
    head.append(document.createElement('br'));

    var select, item;
    for (var i = 0; i < cols; i++) {
        select = document.createElement("select");
        select.className = `select-area`;
        select.name = `col-header-${i + 1}`;

        for (var j = 0; j < CV_copy.length; j++) {
            item = document.createElement('option');
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
    const body = document.querySelector('#table-body');
    body.innerHTML = null;
    var row, field;
    for (var i = 0; i < rows; i++) {
        row = document.createElement('div');
        row.className = `row row-${i + 1}`;

        for (var j = 0; j < cols; j++) {
            field = document.createElement('input');
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


function create_chart(arrays) {

    // Gantt Chart Title
    document.querySelector('#gantt-title').innerHTML = "Gantt Chart:<br>";

    // Creates the Gantt Chart
    var lc = 0,
        current = 0,
        printed = false,
        start = true,
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
    const table = document.querySelector('table');
    table.innerHTML = null;
    var row, cell;

    // Table Header
    var table_head = document.createElement('thead'),
        head_row = document.createElement('tr');

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
    const div = document.querySelector('#extras');
    var span;
    for (key of Object.keys(extras)) {
        span = document.createElement('span');
        span.className = 'extras';
        span.innerHTML = `${key.split('_').join(' ')}: ${extras[key]}`;
        div.append(span);
        div.append(document.createElement('br'));
    }
}