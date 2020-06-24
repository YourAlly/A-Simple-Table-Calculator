# OS Scheduling Calculator

## News

Apparently the resources I found internet are different compared to the ones that were taught to us so I'll wait for further information regarding the algorithms before continuing.

The calculator's also surpringly more flexible than I thought so I can just change some of the parts and turn it into something else so it's not that big of a problem.

Was definitely fun making this.

## Problem

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

Select the size of the table to be used and fill them up

Be warned that that the previous inputs will be gone after changing the size of the table

### Adding new functions

One can easily (I think) add new algorithms to be calculated (of course, a little bit of JS knowledge is required)

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

And add the function to the object by first naming the inserting an object with a name of your own choice with the 'function' key containing a function as it's value.

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
            'function': calculate_sum,                      // Insert the function here
            'requirements': ['1-Process', '2-Burst_Time'],  // Insert required inputs here
            'fill_columns': ['3-Arrival_Time']              // Columns to be filled with 0s (if they don't exist)
            'unique': ['1-Process']                         // Columns to have unique inputs
        }
    }

You can also add requirements (Key: 'requirements'), columns to be filled if they don't exist (Key: 'fill_columns'), and columns that should have unique values (Key: 'unique').

If it requires a different column name you can add a new one

    // You can insert new column names here
    const COLUMN_VALUES = ['1-Process', '2-Burst_Time', '3-Arrival_Time', '4-Priority']

I added '1-' to make the column go first on the table.

I found it easy, I hope others will find it that way too.

Unfortunately I haven't made a function that prints a gantt chart yet

## Was it worth it

Definitely, yes.

I could've just solved the problems like a normal person, I just used it as a reason to learn more about JavaScript (and I did).

It isn't really a project that made me spent 3 days for nothing as I learned stuff (and the calculator's kind of flexible).
