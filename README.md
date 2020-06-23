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

IDK how to explain it, but one can easily add new algorithms to be calculated (of course, a little bit of JS knowledge is required)

    // Just to try it out
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

And add the function with to the object with a key

    // Object that holds the functions
    const ALGORITHMS = {
        'FCFS': fcfs,
        'SJF': (data) => { console.log("Not Yet Implemented"); return data; },
        'SRTF': (data) => { console.log("Not Yet Implemented"); return data; },
        'PS': (data) => { console.log("Not Yet Implemented"); return data; },
        'RR': (data) => { console.log("Not Yet Implemented"); return data; },
        'SUM': calculate_sum
    }

I found it easy, I hope others will find it that way too.

## Was it worth it?

Definitely, yes

I could've just solved the problems like a normal person, I just used it as a reason to learn more about JavaScript (and I did).

It isn't really a project that made me spent 3 days for nothing as I learned stuff (and the calculator's kind of flexible).
