from fastapi import APIRouter
from app.api.api_v1.handlers import user
from app.api.api_v1.handlers import event
from app.api.auth.jwt import auth_router

router = APIRouter()

router.include_router(user.user_router, prefix='/users', tags=["users"])
router.include_router(event.event_router, prefix='/event', tags=["event"])
router.include_router(auth_router, prefix='/auth', tags=["auth"])