from datetime import datetime
from typing import Optional
from uuid import UUID
from enum import Enum
from pydantic import BaseModel, Field
from beanie import Document, Indexed, Link, before_event, Replace, Insert
from ..models.user_model import User



class EventCreate(BaseModel):
    title: str = Field(..., title='Title', min_length=1, max_length=55)
    description: str = Field(..., title='Description', min_length=1, max_length=755)
    eventdatetime: datetime = Field(..., title='Eventdatetime')
    location: str = Field(..., title='Location', min_length=1, max_length=55)
    participants: Optional[list]=[]
    # joinpermission: str = Field(..., title='Joinpermission', min_length=1, max_length=755)
    status: Optional[bool] = False
    
    
class EventUpdate(BaseModel):
    title: Optional[str] = Field(..., title='Title', min_length=1, max_length=55)
    description: Optional[str] = Field(..., title='Description', min_length=1, max_length=755)
    eventdatetime: datetime = Field(..., title='Eventdatetime')
    location: str = Field(..., title='Location', min_length=1, max_length=55)
    participants: Optional[list]=[]
    # joinpermission: str = Field(..., title='Joinpermission', min_length=1, max_length=755)
    status: Optional[bool] = False

class ParticipantUpdate(BaseModel):
    participants: Optional[list]=[]


class EventOut(BaseModel):
    event_id: UUID
    status: bool
    title: str
    description: str
    eventdatetime: datetime
    location: str
    participants: Optional[list]=[]
    # joinpermission: str
    created_at: datetime
    updated_at: datetime
    owner:Link[User]
    