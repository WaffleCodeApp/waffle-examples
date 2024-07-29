import json
from http_server import app

if __name__ == "__main__":
    app.openapi()
    with open("openapi-schema.json", "w") as f:
        f.write(json.dumps(app.openapi_schema))
