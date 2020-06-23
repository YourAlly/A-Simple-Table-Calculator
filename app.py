from flask import Flask, render_template, request, redirect, url_for, jsonify, Response
import re

REQUIRED = ['1-Process', '2-Burst_Time']

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/submit", methods=["POST"])
def submit():

    # Gets the size of the table
    row_num = request.form.get('rows')
    col_num = request.form.get('cols')
    columns_values = {}
    head_names = set()
    for i in range(int(col_num)):

        # Checks if no header values are alike
        if request.form.get(f'col-header-{i + 1}') in head_names:
            return jsonify({'error': 'Error: There can only be one of each header values'}), 400
        head_names.add(request.form.get(f'col-header-{i + 1}'))

        # Checks if all fields have values
        if '' in request.form.getlist(f'col-{i + 1}'):
            return jsonify({'error': 'Error: All fields should have values'}), 400
        
        # Gets a list for every column
        columns_values[request.form.get(f'col-header-{i + 1}')] = request.form.getlist(f'col-{i + 1}')

    # Checks if Process and Burst Time inputs exist
    for required in REQUIRED:
        if not required in head_names:
            return jsonify({'error': f'Error: [Input-{required}] should exist'}), 400

    print(columns_values)

    return jsonify(columns_values), 200
