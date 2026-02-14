from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/verify-twitter', methods=['POST'])
def verify_twitter():
    data = request.json
    # এখানে টুইটার API দিয়ে চেক করার লজিক হবে
    return jsonify({"status": "success", "message": "X Account Bound!"})

def handler(req, res):
    return app(req, res)
