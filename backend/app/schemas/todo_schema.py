from datetime import datetime
from typing import Optional
from uuid import UUID
from enum import Enum
from pydantic import BaseModel, Field


class TodoCreate(BaseModel):
    title: str = Field(..., title='Title', min_length=1, max_length=55)
    description: str = Field(..., title='Description', min_length=1, max_length=755)
    eventdatetime: datetime = Field(..., title='Eventdatetime')
    location: str = Field(..., title='Location', min_length=1, max_length=55)
    # joinpermission: str = Field(..., title='Joinpermission', min_length=1, max_length=755)
    status: Optional[bool] = False
    
    
class TodoUpdate(BaseModel):
    title: Optional[str] = Field(..., title='Title', min_length=1, max_length=55)
    description: Optional[str] = Field(..., title='Description', min_length=1, max_length=755)
    eventdatetime: datetime = Field(..., title='Eventdatetime')
    location: str = Field(..., title='Location', min_length=1, max_length=55)
    # joinpermission: str = Field(..., title='Joinpermission', min_length=1, max_length=755)
    status: Optional[bool] = False
    

class TodoOut(BaseModel):
    todo_id: UUID
    status: bool
    title: str
    description: str
    eventdatetime: datetime
    location: str
    # joinpermission: str
    created_at: datetime
    updated_at: datetime
    