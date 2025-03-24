from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

# Load product data from JSON file
with open("data/products.json", "r", encoding="utf-8") as file:
    PRODUCTS = json.load(file)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/suggest")
def suggest():
    query = request.args.get("q", "").lower()
    suggestions = [p for p in PRODUCTS if query in p["name"].lower()]
    return jsonify(suggestions[:10])  # Return top 10 matches

if __name__ == "__main__":
    app.run(debug=True)

