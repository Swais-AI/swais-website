from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from sqlalchemy import func, case
from typing import List, Optional
from pydantic import BaseModel

from app.database import get_db
from app.models import User
from app.schemas import UserOut
from app.auth import get_current_user, require_super_admin

router = APIRouter(prefix="/admin", tags=["admin"])


class UpdateStatusRequest(BaseModel):
    userIds: List[int]
    newStatus: str


class UserResponse(BaseModel):
    user_id: int
    name: str
    email: str
    phone: Optional[str]
    interest: Optional[str]
    is_active: bool
    registration_complete: bool
    record_status: Optional[str]
    created_at: Optional[str]
    status: str


class UsersListResponse(BaseModel):
    success: bool
    users: List[UserResponse]


class UpdateStatusResponse(BaseModel):
    success: bool
    message: str
    updatedUsers: List[dict]


class StatsResponse(BaseModel):
    success: bool
    stats: dict


def get_super_admin_user(request: Request, db: Session = Depends(get_db)) -> User:
    """Dependency — must be authenticated AND have SUPER_ADMIN (or HEAD) role."""
    user = get_current_user(request, db)
    return require_super_admin(user)


@router.get("/users", response_model=UsersListResponse)
def get_users(
    search: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    _: User = Depends(get_super_admin_user),
):
    """
    List users with search and status filtering.
    Matches Next.js API expectations for user management.
    """
    # Base query - exclude deleted unless explicitly requested
    query = db.query(User).filter(
        (User.record_status != 'D') | (User.record_status == None)
    )

    # Search filter
    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            (User.name.ilike(search_pattern)) |
            (User.email_id.ilike(search_pattern)) |
            (User.phone_number.ilike(search_pattern))
        )

    # Status filter
    if status and status != 'All':
        if status == 'A':  # Active
            query = query.filter(User.is_active == True, User.registration_complete == True)
        elif status == 'P':  # Pending
            query = query.filter(
                (User.is_active == False) | (User.registration_complete == False)
            )
        elif status == 'I':  # Inactive
            query = query.filter(User.is_active == False, User.registration_complete == True)
        elif status == 'D':  # Deleted
            query = db.query(User).filter(User.record_status == 'D')

    users = query.order_by(User.id.desc()).all()

    # Transform to match frontend expected format
    user_responses = []
    for user in users:
        # Determine status letter
        if user.is_active and user.registration_complete:
            status_letter = 'A'
        elif not user.is_active and user.registration_complete:
            status_letter = 'I'
        elif user.record_status == 'D':
            status_letter = 'D'
        else:
            status_letter = 'P'

        user_responses.append(UserResponse(
            user_id=user.id,
            name=user.name or "",
            email=user.email_id or user.email,
            phone=user.phone_number,
            interest=user.user_type,
            is_active=user.is_active,
            registration_complete=user.registration_complete,
            record_status=user.record_status,
            created_at=user.createdAt.isoformat() if user.createdAt else None,
            status=status_letter
        ))

    return UsersListResponse(success=True, users=user_responses)


@router.get("/users/stats", response_model=StatsResponse)
def get_user_stats(
    db: Session = Depends(get_db),
    _: User = Depends(get_super_admin_user),
):
    """
    Get user statistics for admin dashboard.
    Must be declared BEFORE /users/{user_id} so 'stats' isn't matched as a user_id.
    """
    total = db.query(func.count(User.id)).scalar()
    deleted = db.query(func.count(User.id)).filter(User.record_status == 'D').scalar()
    active = db.query(func.count(User.id)).filter(
        User.record_status != 'D',
        User.is_active == True,
        User.registration_complete == True
    ).scalar()
    inactive = db.query(func.count(User.id)).filter(
        User.record_status != 'D',
        User.is_active == False,
        User.registration_complete == True
    ).scalar()
    pending = db.query(func.count(User.id)).filter(
        User.record_status != 'D',
        (User.is_active == False) | (User.registration_complete == False),
        ~((User.is_active == False) & (User.registration_complete == True))
    ).scalar()

    return StatsResponse(
        success=True,
        stats={
            "active": active or 0,
            "inactive": inactive or 0,
            "pending": pending or 0,
            "deleted": deleted or 0,
            "total": total or 0
        }
    )


@router.get("/users/{user_id}", response_model=UserOut)
def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_super_admin_user),
):
    """Get a single user by ID."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


@router.put("/users/update-status", response_model=UpdateStatusResponse)
def update_user_status(
    request: UpdateStatusRequest,
    db: Session = Depends(get_db),
    _: User = Depends(get_super_admin_user),
):
    """
    Bulk update user status (activate/deactivate/delete).
    Matches Next.js API expectations.
    """
    if not request.userIds or len(request.userIds) == 0:
        raise HTTPException(status_code=400, detail="No users selected")

    # Map status letter to database fields
    status_message = ""
    if request.newStatus == 'A':
        update_fields = {'is_active': True, 'registration_complete': True}
        status_message = "activated"
    elif request.newStatus == 'I':
        update_fields = {'is_active': False, 'registration_complete': True}
        status_message = "deactivated"
    elif request.newStatus == 'P':
        update_fields = {'is_active': False, 'registration_complete': False}
        status_message = "set to pending"
    elif request.newStatus == 'D':
        update_fields = {'record_status': 'D'}
        status_message = "deleted"
    else:
        raise HTTPException(status_code=400, detail="Invalid status")

    # Update users
    updated_users = []
    for user_id in request.userIds:
        user = db.query(User).filter(User.id == user_id).first()
        if user:
            for field, value in update_fields.items():
                setattr(user, field, value)
            updated_users.append({"user_id": user.id, "name": user.name})

    db.commit()

    return UpdateStatusResponse(
        success=True,
        message=f"{len(updated_users)} user(s) {status_message}",
        updatedUsers=updated_users
    )


@router.put("/users/{user_id}/activate", response_model=UserOut)
def activate_user(
    user_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_super_admin_user),
):
    """HEAD activates a registered user — grants dashboard access."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    user.is_active = True
    db.commit()
    db.refresh(user)
    return user


@router.put("/users/{user_id}/deactivate", response_model=UserOut)
def deactivate_user(
    user_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_super_admin_user),
):
    """HEAD deactivates a user — revokes dashboard access."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    user.is_active = False
    db.commit()
    db.refresh(user)
    return user
