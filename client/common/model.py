from dataclasses import dataclass
from datetime import datetime


@dataclass
class Profile:
    name: str
    age: int
    dob: datetime
    description: str | None = None
