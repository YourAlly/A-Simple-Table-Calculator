from flask import Flask, render_template, request, redirect, url_for, jsonify, Response

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
            return Response(status=400)
        head_names.add(request.form.get(f'col-header-{i + 1}'))

        # Checks if all fields have values
        if '' in request.form.getlist(f'col-{i + 1}'):
            return Response(status=400)
        
        columns_values[request.form.get(f'col-header-{i + 1}')] = request.form.getlist(f'col-{i + 1}')

    return jsonify(columns_values)
