from flask import Flask, request, jsonify
from flask_cors import CORS
from gurobipy import Model, GRB, quicksum
import numpy as np
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def tsp_solver(city_names, dist_matrix):
    n = len(city_names)

    # Create Gurobi model
    model = Model("TSP")

    # Decision variables
    x = model.addVars(n, n, vtype=GRB.BINARY, name="x")
    u = model.addVars(n, vtype=GRB.CONTINUOUS, name="u")

    # Objective function
    model.setObjective(quicksum(dist_matrix[i][j] * x[i, j] for i in range(n) for j in range(n)), GRB.MINIMIZE)

    # Constraints
    for i in range(n):
        model.addConstr(quicksum(x[i, j] for j in range(n) if i != j) == 1)
        model.addConstr(quicksum(x[j, i] for j in range(n) if i != j) == 1)

    for i in range(1, n):
        for j in range(1, n):
            if i != j:
                model.addConstr(u[i] - u[j] + n * x[i, j] <= n - 1)

    # Optimize
    model.optimize()

    # Extract solution
    if model.status == GRB.OPTIMAL:
        solution = np.zeros((n, n))
        for i in range(n):
            for j in range(n):
                if x[i, j].x > 0.5:
                    solution[i, j] = 1

        # Extract the tour sequence
        tour = []
        current_city = 0
        while len(tour) < n:
            tour.append(current_city)
            next_city = np.where(solution[current_city] == 1)[0][0]
            current_city = next_city
        tour.append(0)  # Return to the start city

        return tour, model.objVal
    else:
        return None, None

@app.route("/api/submit", methods=["POST"])
def solve_tsp():
    try:
        data = request.get_json()

        city_names = data['cityNames']
        distances = data['distances']

        # Call TSP solver
        tour, cost = tsp_solver(city_names, distances)

        if tour is None:
            return jsonify({'error': 'No optimal solution found'}), 400

        # Prepare result for frontend
        result_data = {
            'result': {
                'tour': [city_names[i] for i in tour],
                'cost': round(cost, 2)
            }
        }

        return jsonify(result_data)

    except Exception as e:
        app.logger.error("Error occurred: %s", str(e))
        return jsonify({'error': str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)
