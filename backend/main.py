from fastapi import FastAPI
from app.route.guest import router
app = FastAPI()
app.include_router(router)

