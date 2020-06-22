const COLUMN_VALUES = ['Process', 'Arrival Time', 'Burst Time', 'Priority']
let rows, cols;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sizeSelector').forEach((selector) => {
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
        selector.onchange = () => {table_change();};
    })

    // Creates Table Once
    table_change();
})

function table_change() {
    rows = parseInt(document.querySelector('#rows').value);
    cols = parseInt(document.querySelector('#cols').value);

    // Head selectors
    var head = document.querySelector('#table-header');
    head.innerHTML = '';
    for (var i = 0; i < cols; i++) {
        var select = document.createElement("select");
        select.className = `select-area`;
        select.name = `col-header-${i + 1}`;
        for (var j = 0; j < COLUMN_VALUES.length; j++) {
            var item = document.createElement('option');
            item.value = COLUMN_VALUES[j];
            item.innerHTML = COLUMN_VALUES[j];

            // Just to make it look nicer
            if (i === j) {
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
            field.name = `col-${j + 1}`
            row.append(field);
        }
        body.append(row);
    }

}