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

})


function table_change() {
    var column_values_length = COLUMN_VALUES.length;
    var head = document.querySelector('#table-header')
    const rows = parseInt(document.querySelector('#rows').value);
    const cols = parseInt(document.querySelector('#cols').value);
    head.innerHTML = '';
    // Head selectors
    for (var i = 0; i < cols; i++){
        var select = document.createElement("select");
        select.dataset.column = 1;
        for (var j = 0; j < column_values_length; j++){
            var item = document.createElement('option');
            item.value = COLUMN_VALUES[j];
            item.innerHTML = COLUMN_VALUES[j];

            select.append(item);
        }
        head.append(select)
    }
}