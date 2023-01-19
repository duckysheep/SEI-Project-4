from typing import List
from uuid import UUID
from app.models.user_model import User
from app.models.event_model import Event
from app.schemas.event_schema import EventCreate, EventUpdate

class EventService:
    @staticmethod
    async def list_events(user: User) -> List[Event]:
        events = await Event.find(Event.owner.id == user.id).to_list()
        return events
    
    @staticmethod
    async def create_event(user: User, data: EventCreate) -> Event:
        event = Event(**data.dict(), owner=user)
        return await event.insert()
    
    @staticmethod
    async def retrieve_event(current_user: User, event_id: UUID):
        event = await Event.find_one(Event.event_id == event_id, Event.owner.id == current_user.id)
        return event
    
    @staticmethod
    async def update_event(current_user: User, event_id: UUID, data: EventUpdate):
        event = await EventService.retrieve_event(current_user, event_id)
        await event.update({"$set": data.dict(exclude_unset=True)})
        
        await event.save()
        return event
    
    @staticmethod
    async def delete_event(current_user: User, event_id: UUID) -> None:
        event = await EventService.retrieve_event(current_user, event_id)
        if event:
            await event.delete()
            
        return None