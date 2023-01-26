from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends
from app.models.user_model import User
from app.api.deps.user_deps import get_current_user
from app.schemas.event_schema import EventOut, EventCreate, EventUpdate,ParticipantUpdate
from app.services.event_service import EventService
from app.models.event_model import Event


event_router = APIRouter()

@event_router.get('/', summary="Get all events of the user", response_model=List[EventOut])
async def list(current_user: User = Depends(get_current_user)):
    return await EventService.list_events(current_user)

@event_router.get('/joined', summary="Get all joined events of the user", response_model=List[EventOut])
async def list(current_user: User = Depends(get_current_user)):
    return await EventService.list_joined_events(current_user)


@event_router.post('/create', summary="Create Events", response_model=Event)
async def create_event(data: EventCreate, current_user: User = Depends(get_current_user)):
    return await EventService.create_event(current_user, data)


# @event_router.get('/{event_id}', summary="Get event by event_id", response_model=EventOut)
# async def retrieve(event_id: UUID, current_user: User = Depends(get_current_user)):
#     return await EventService.retrieve_event(current_user, event_id)

# removed owner=current_user req so anyone with link can view
@event_router.get('/{event_id}', summary="Get a event by event_id", response_model=EventOut)
async def retrieve(event_id: UUID):
    return await EventService.retrieve_nonowner_event(event_id)


@event_router.put('/{event_id}', summary="Update event by event_id", response_model=EventOut)
async def update(event_id: UUID, data: EventUpdate, current_user: User = Depends(get_current_user)):
    return await EventService.update_event(current_user, event_id, data)


@event_router.patch('/participants/{event_id}', summary="Update participants by event_id", response_model=EventOut)
async def patch(event_id: UUID, data: ParticipantUpdate):
    return await EventService.update_participants(event_id, data)


@event_router.delete('/{event_id}', summary="Delete event by event_id")
async def delete(event_id: UUID, current_user: User = Depends(get_current_user)):
    await EventService.delete_event(current_user, event_id)
    return None

