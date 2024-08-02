from os import environ
from fastapi import FastAPI
import uvicorn


app = FastAPI(
    title="Waffle Example ECS API",
    version="1.0.0",
    root_path=f"/Prod/{environ.get('STACK_ID')}",
)


@app.get("/health_check")
def get_health_check() -> str:
    return "OK"


@app.get("/hello_world")
def get_hello_world() -> str:
    return f"Hello World from {environ.get('STACK_ID')}!"


def get_app() -> FastAPI:
    return app


if __name__ == "__main__":
    uvicorn.run("http_server:get_app", factory=True, port=80, host="0.0.0.0")
