# A Simple Table Calculator

## News

Apparently the resources I found internet are different compared to the ones that were taught to us so I'll wait for further information regarding the algorithms before continuing.

The calculator's also surpringly more flexible than I thought so I can just change some of the parts and turn it into something else so it's not that big of a problem.

Was definitely fun making this.

## Problem

Was supposed to be a program for os scheduling but I'm confused on which one to follow (The internet or my instructor).

[Link to the problem](https://docs.google.com/document/d/1ThsHtAts3uM2JMuSe31IZnwZHvrgffvD3XSHSXfvXGI/edit?usp=sharing/)

I need a way to answer these questions without having to calculate and draw a gantt chart for every item.

Thought of using Tkinter at first, but it looks like using JavaScript is better since it looks like JavaScript is really important nowadays.

## Languages I used
  
- HTML
- JavaScript
- CSS
- Python

## How to use

### Calculating

Select the size of the table to be used and fill them up.

Be warned that that the previous inputs will be gone after changing the size of the table.

### Adding new functions

One can easily (I think) add new algorithms to be calculated (of course, a little bit of JS knowledge is required) on the calculator.js file.

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

And add the function to the object by first naming the inserting an object with a name of your own choice with the 'function' key containing a function as it's value, along with the new column values they need.

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
        'SUM': {                                                                // Select option value
            'function': calculate_sum,                                          // Function to be used
            'columns': ['Column 1', 'Column 2'],                                // Additional columns
            'requirements': ['Column 1', 'Column 2'],                           // Required inputs
            'fill_columns': { 'Column 3': Math.floor(Math.random() * 101) },    // Columns to be filled by value if not found
            'unique': []                                                        // Columns to have unique inputs
        }
    }

You can also add requirements (Key: 'requirements'), columns to be filled if they don't exist (Key: 'fill_columns'), and columns that should have unique values (Key: 'unique').

You can add new columns on the MAIN_COLUMN_VALUES too.

    // You can insert new column names here
    const MAIN_COLUMN_VALUES = ['1-Process', '2-Burst_Time']

You can edit values before the dash to set the priorities (Process goes first on the table). You can also use spaces for keys, I just found using underscores more comfortable

To create a gantt chart you must use the create_chart(arrays) function which takes in an object containing arrays "value_name" and "duration", you can use the sort_data(value_name, duration, sort_by) function which returns the said required object sorted according to the values of sort_by array.

    // Creates a gantt chart accoding to the sorted data
    create_chart(sort_data(
        data['1-Process'],
        data['2-Burst_Time'],
        data['2A-Waiting_Time']));

I found it easy (Other than the gantt chart stuff), I hope others will find it that way too.

## Was it worth it

Definitely, yes.

I could've just solved the problems like a normal person, I just used it as a reason to learn more about JavaScript (and I did).

It isn't really a project that made me spent 3 days for nothing as I learned stuff (and the calculator's kind of flexible).
