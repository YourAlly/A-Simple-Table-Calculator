// Submits the form via an XML Http request
function submit_form() {
    const request = new XMLHttpRequest();

    // Opens up a connection to the url (It's like opening a file)
    request.open("POST", "/submit");
    request.responseType = 'json';

    // Sets XML Http Request's onload value to a function
    request.onload = () => {
        const response = request.response;
        document.querySelector('.messages').innerHTML = null;
        if (!response['error']) {
            process_data(response);
        } else {
            alert("Something went wrong");
            document.querySelector('#error').innerHTML = response['error'];
        }
    };

    // Sending the form data to server just to get a js object back
    request.send(new FormData(document.querySelector("#form")));
}


// The heart of the program
function process_data(data) {

    // Returns an alert if function returns nothing
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
    if (!data) {
        return alert('Something went wrong');
    }

    // Fills the table and extras
    fill_table(data);
    if (data['extras']) {
        print_extras(data['extras']);
    }
}


// Checks for the required columns, fills the columns, and checks if the values are unique
function check_data(data) {
    const selected = document.querySelector('#algo').value,
        error = document.querySelector('#error');

    var arr;

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
            arr = data[unique];

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