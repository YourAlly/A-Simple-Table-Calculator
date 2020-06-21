const COLUMN_VALUES = ['Process', 'Arrival Time', 'Burst Time', 'Turnaround Time', 'Waiting Time', 'Priority']

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sizeSelector').forEach((selector) => {
        max = parseInt(selector.dataset.max);
        min = parseInt(selector.dataset.min)

        for (var i = min; i <= max; i++) {
            var item = document.createElement('option');
            item.value = i;
            item.innerHTML = i;
            selector.append(item);
        }
        selector.onchange = table_change;
    })

    // Creates Table Once
    table_change();
})

function table_change() {
    var column_values_length = COLUMN_VALUES.length;

    const rows = parseInt(document.querySelector('#rows').value);
    const cols = parseInt(document.querySelector('#cols').value);

    // Head selectors
    var head = document.querySelector('#table-header');
    head.innerHTML = '';
    for (var i = 0; i < cols; i++) {
        var select = document.createElement("select");
        select.className = `select-area col-${i + 1}`;
        for (var j = 0; j < column_values_length; j++) {
            var item = document.createElement('option');
            item.value = COLUMN_VALUES[j];
            item.innerHTML = COLUMN_VALUES[j];

            select.append(item);
        }
        head.append(select);
    }

    // Table input fields
    var body = document.querySelector('#table-body');
    body.innerHTML = '';
    for (var i = 0; i < rows; i++) {
        row = document.createElement('div');
        row.className += `row-${i + 1}`;
        for (var j = 0; j < cols; j++) {
            var field = document.createElement('input');
            field.type = 'text';
            field.className += `input-area col-${j + 1}`;
            row.append(field);
        }
        body.append(row);
        body.append(document.createElement('br'))
    }

}