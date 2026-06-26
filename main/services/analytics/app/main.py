from fastapi import FastAPI
from pydantic import BaseModel

DECISION_BOUNDARY = (
    "Draft/preliminary only. Authorized personnel must review and approve before "
    "any technical, legal, certification, RBI, RLA, FFS, safety, interval, or risk acceptance decision."
)

app = FastAPI(title="AIM Platform Analytics Service", version="0.0.0-release-0")

class HealthResponse(BaseModel):
    status: str
    release: str
    decision_boundary: str

@app.get("/healthz", response_model=HealthResponse)
def healthz() -> HealthResponse:
    return HealthResponse(status="ok", release="0", decision_boundary=DECISION_BOUNDARY)
