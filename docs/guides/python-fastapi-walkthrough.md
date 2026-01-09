# Building a Python FastAPI + PostgreSQL App: Complete Walkthrough

> **Build a professional Python web application with FastAPI, PostgreSQL, and modern patterns - No advanced Python knowledge required!**

## What You'll Build

A complete API-based web application with:
- **Backend:** FastAPI with async/await patterns
- **Database:** PostgreSQL with SQLAlchemy ORM
- **API:** RESTful endpoints with auto-generated docs
- **Auth:** JWT-based authentication
- **Deployment:** Railway or Render
- **Features:** User management, CRUD operations, data validation

**Time Required:** 60-75 minutes

---

## Prerequisites

- Basic Python understanding (variables, functions)
- Terminal/command line access
- Text editor (VSCode recommended)

---

## Step 1: Set Up Your Project (5 minutes)

### 1.1 Create Project Folder

```bash
# Create project directory
mkdir my-fastapi-app
cd my-fastapi-app

# Download Sidekick
git clone https://github.com/dylanburkey/claude-code-sidekick.git temp-sidekick
cd temp-sidekick

# Copy Sidekick files
cp -r .claude/ ../
cp PROJECT_STARTER.md ../
cp .env.example ../

# Clean up
cd ..
rm -rf temp-sidekick
```

### 1.2 Configure PROJECT_STARTER.md

Open `PROJECT_STARTER.md`:

```markdown
## Project Information

### Project Name
Task API

### Project Description
A RESTful API for task management built with FastAPI and PostgreSQL.
Provides secure user authentication, task CRUD operations, and real-time
data validation with auto-generated API documentation.

### Project Type
api
```

### 1.3 Select Custom Preset (Python not in presets yet)

```markdown
### Project Preset

- [ ] **Static Website**
- [ ] **Astro Site**
- [ ] **React App**
- [ ] **Next.js App**
- [ ] **Vue/Nuxt**
- [ ] **SvelteKit**
- [ ] **Full Stack**
- [x] **Custom** - Manual configuration
```

### 1.4 Configure for Python

```markdown
### Master Toggles

- **MCP Servers**: `TRUE`
- **Development Hooks**: `TRUE`
- **Code Quality Rules**: `TRUE`
- **AI Agents**: `TRUE`

## Code Rules Configuration

### Language Standards

- **Modern JavaScript**: `FALSE`
- **TypeScript**: `FALSE`
- **Node.js**: `FALSE`
- **Python**: `TRUE`  ← Enable Python

### Backend & API

- **Hono**: `FALSE`
- **Express/Fastify**: `FALSE`
- **REST API**: `TRUE`  ← Enable REST patterns
- **GraphQL**: `FALSE`

### Quality & Testing

- **WCAG AA Accessibility**: `FALSE`  ← API doesn't need this
- **SEO Optimization**: `FALSE`
- **Performance**: `TRUE`
- **Security**: `TRUE`  ← Very important for APIs
- **Testing Standards**: `TRUE`  ← Enable testing

## MCP Configuration

### Database & Storage

- **Neon Database**: `TRUE`  ← PostgreSQL
- **Supabase**: `FALSE`

### Development Tools

- **GitHub**: `TRUE`
- **Sentry**: `TRUE`  ← Error tracking

## Hooks Configuration

### Git Hooks

- **Pre-Commit Validation**: `TRUE`
- **Commit Message Validation**: `TRUE`

### Code Quality Hooks

- **Security Scanning**: `TRUE`  ← Important for APIs
- **Dependency Audit**: `TRUE`
```

### 1.5 Apply Configuration

```bash
/mcp-setup      # Configure MCPs
/hooks-setup    # Configure hooks
/rules-setup    # Configure Python rules
```

---

## Step 2: Set Up External Services (10 minutes)

### 2.1 GitHub

(Same as Nuxt walkthrough - create account, repository, get token)

### 2.2 Neon Database

1. Go to https://neon.tech
2. Create account (use GitHub)
3. Create project: "Task API"
4. Get connection string (starts with `postgresql://`)
5. Get API key from Account Settings → API Keys

### 2.3 Sentry (Optional)

1. Go to https://sentry.io
2. Create account
3. Create new project (Python/FastAPI)
4. Copy DSN

### 2.4 Configure Environment

Create `.env`:

```bash
cp .env.example .env
```

Add your credentials:

```env
# Database
DATABASE_URL=postgresql://user:pass@host/db

# Neon API
NEON_API_KEY=your_neon_api_key

# GitHub
GITHUB_TOKEN=ghp_your_token

# Security
SECRET_KEY=your_secret_key_for_jwt  # Generate with: openssl rand -hex 32

# Sentry (optional)
SENTRY_DSN=your_sentry_dsn

# Environment
ENVIRONMENT=development
```

Generate a secret key:

```bash
python3 -c "import secrets; print(secrets.token_hex(32))"
# Copy the output to SECRET_KEY in .env
```

---

## Step 3: Define Your API (10 minutes)

### 3.1 Describe Features

In `PROJECT_STARTER.md`:

```markdown
## Goals & Objectives

### Primary Goal

Create a RESTful API for task management with:

1. **Authentication**
   - User registration with email/password
   - JWT-based login
   - Token refresh mechanism
   - Password hashing with bcrypt

2. **Task Management**
   - Create tasks with title, description, status
   - Read all tasks or single task
   - Update task details
   - Delete tasks
   - Filter by status (pending, in-progress, completed)
   - Search tasks by title/description

3. **User Management**
   - User profile endpoints
   - Update user information
   - List user's tasks

4. **API Features**
   - Auto-generated Swagger docs
   - Request/response validation with Pydantic
   - Error handling with proper HTTP codes
   - Rate limiting
   - CORS configuration

### Success Criteria

- API responses under 100ms for simple queries
- 100% test coverage for endpoints
- Comprehensive error handling
- Auto-generated API documentation
- Secure authentication
- PostgreSQL database with proper indexes
```

### 3.2 Add API Requirements (EARS)

```markdown
### Functional Requirements

1. **WHEN** user registers **THE SYSTEM SHALL** validate email format and password strength
2. **WHEN** user logs in **THE SYSTEM SHALL** return JWT access and refresh tokens
3. **WHEN** user creates task **THE SYSTEM SHALL** validate required fields and save to database
4. **WHEN** user requests tasks **THE SYSTEM SHALL** return only their own tasks
5. **WHEN** invalid token provided **THE SYSTEM SHALL** return 401 Unauthorized
6. **WHEN** resource not found **THE SYSTEM SHALL** return 404 Not Found
7. **THE SYSTEM SHALL** hash all passwords before storage
8. **THE SYSTEM SHALL** provide Swagger UI at /docs endpoint
9. **THE SYSTEM SHALL** log all errors to Sentry
10. **THE SYSTEM SHALL** rate limit to 100 requests per minute per IP
```

---

## Step 4: Generate Project Plan (5 minutes)

```bash
/project-planner
```

**Output:** `project-plan/phase_1.md`

This creates a plan covering:
- Database schema design
- FastAPI application structure
- Authentication system
- CRUD endpoints
- Testing strategy
- Deployment configuration

Review the plan to understand the approach.

---

## Step 5: Generate Implementation Tasks (5 minutes)

```bash
/task-planner
```

**Output:** `tasks/phase-1-tasks.md`

Tasks will include:
1. Set up FastAPI project structure
2. Configure database connection with SQLAlchemy
3. Create database models (User, Task)
4. Implement authentication (register, login, token refresh)
5. Create task CRUD endpoints
6. Add request/response validation
7. Implement error handling
8. Write tests
9. Add API documentation
10. Configure deployment

---

## Step 6: Let Agents Build It (20 minutes)

```bash
/task-runner
```

**Watch the agents work:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Task Runner Started
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Python Agent] Task 1.1: Set up FastAPI project
→ Creating virtual environment...
→ Installing FastAPI, SQLAlchemy, Pydantic...
→ Creating project structure...
✓ Complete (12.3s)

[Database Agent] Task 1.2: Configure SQLAlchemy
→ Setting up async engine...
→ Creating session management...
→ Configuring connection pooling...
✓ Complete (8.1s)

[Database Agent] Task 1.3: Create database models
→ Creating User model...
→ Creating Task model...
→ Adding relationships...
→ Generating migrations with Alembic...
✓ Complete (15.4s)

[Backend API Agent] Task 2.1: Implement authentication
→ Creating password hashing utilities...
→ Building JWT token generation...
→ Implementing register endpoint...
→ Implementing login endpoint...
→ Adding token refresh...
✓ Complete (22.7s)

[Backend API Agent] Task 2.2: Create task endpoints
→ POST /api/tasks (create)...
→ GET /api/tasks (list with filters)...
→ GET /api/tasks/{id} (retrieve)...
→ PUT /api/tasks/{id} (update)...
→ DELETE /api/tasks/{id} (delete)...
✓ Complete (18.9s)

[Testing Agent] Task 3.1: Write API tests
→ Creating test fixtures...
→ Testing authentication flow...
→ Testing CRUD operations...
→ Testing error cases...
→ Testing validation...
✓ Complete (25.1s)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
All Tasks Complete!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total Time: 18 minutes 42 seconds
Tasks Completed: 15/15
Tests Written: 47
Test Coverage: 98%
```

---

## Step 7: Project Structure Overview (5 minutes)

### What Got Created

```
my-fastapi-app/
├── app/
│   ├── __init__.py
│   ├── main.py                    # FastAPI application
│   ├── config.py                  # Configuration
│   ├── database.py                # Database setup
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py               # User model
│   │   └── task.py               # Task model
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── user.py               # User Pydantic schemas
│   │   └── task.py               # Task Pydantic schemas
│   ├── api/
│   │   ├── __init__.py
│   │   ├── deps.py               # Dependencies (auth, db)
│   │   └── routes/
│   │       ├── __init__.py
│   │       ├── auth.py           # Auth endpoints
│   │       ├── users.py          # User endpoints
│   │       └── tasks.py          # Task endpoints
│   ├── core/
│   │   ├── __init__.py
│   │   ├── security.py           # Password hashing, JWT
│   │   └── config.py             # Settings with Pydantic
│   └── tests/
│       ├── __init__.py
│       ├── conftest.py           # Test fixtures
│       ├── test_auth.py
│       ├── test_users.py
│       └── test_tasks.py
├── alembic/
│   ├── versions/                  # Database migrations
│   └── env.py
├── requirements.txt               # Python dependencies
├── .env                          # Environment variables
├── .env.example
├── alembic.ini                   # Alembic config
└── README.md
```

### Key Files Explained

**app/main.py** - FastAPI application entry point:
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import auth, users, tasks
from app.core.config import settings

app = FastAPI(
    title="Task API",
    description="RESTful API for task management",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])

@app.get("/")
async def root():
    return {"message": "Task API - Visit /docs for API documentation"}
```

**app/models/task.py** - SQLAlchemy model:
```python
from sqlalchemy import Column, Integer, String, Text, Enum, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum

class TaskStatus(str, enum.Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(Enum(TaskStatus), default=TaskStatus.PENDING)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    owner = relationship("User", back_populates="tasks")
```

**app/schemas/task.py** - Pydantic schemas for validation:
```python
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from app.models.task import TaskStatus

class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    status: TaskStatus = TaskStatus.PENDING

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = None
    status: Optional[TaskStatus] = None

class TaskResponse(TaskBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
```

**app/api/routes/tasks.py** - Task endpoints:
```python
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
from app.database import get_db
from app.models.task import Task, TaskStatus
from app.models.user import User
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse
from app.api.deps import get_current_user

router = APIRouter()

@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    task: TaskCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new task"""
    db_task = Task(**task.dict(), user_id=current_user.id)
    db.add(db_task)
    await db.commit()
    await db.refresh(db_task)
    return db_task

@router.get("/", response_model=List[TaskResponse])
async def get_tasks(
    status: Optional[TaskStatus] = None,
    search: Optional[str] = Query(None, description="Search in title/description"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all tasks for current user with optional filters"""
    query = select(Task).where(Task.user_id == current_user.id)

    if status:
        query = query.where(Task.status == status)

    if search:
        query = query.where(
            (Task.title.ilike(f"%{search}%")) |
            (Task.description.ilike(f"%{search}%"))
        )

    result = await db.execute(query)
    tasks = result.scalars().all()
    return tasks

@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(
    task_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific task"""
    result = await db.execute(
        select(Task).where(
            Task.id == task_id,
            Task.user_id == current_user.id
        )
    )
    task = result.scalar_one_or_none()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return task

@router.put("/{task_id}", response_model=TaskResponse)
async def update_task(
    task_id: int,
    task_update: TaskUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a task"""
    result = await db.execute(
        select(Task).where(
            Task.id == task_id,
            Task.user_id == current_user.id
        )
    )
    task = result.scalar_one_or_none()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Update only provided fields
    update_data = task_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)

    await db.commit()
    await db.refresh(task)
    return task

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    task_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a task"""
    result = await db.execute(
        select(Task).where(
            Task.id == task_id,
            Task.user_id == current_user.id
        )
    )
    task = result.scalar_one_or_none()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    await db.delete(task)
    await db.commit()
```

---

## Step 8: Run Your API (5 minutes)

### 8.1 Set Up Python Environment

```bash
# Create virtual environment
python3 -m venv venv

# Activate it
# On Mac/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 8.2 Run Database Migrations

```bash
# Initialize Alembic (if not done)
alembic init alembic

# Create initial migration
alembic revision --autogenerate -m "Initial schema"

# Apply migrations
alembic upgrade head
```

### 8.3 Start the Server

```bash
uvicorn app.main:app --reload
```

**You'll see:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### 8.4 Test the API

**Open your browser:**
- API Docs: http://localhost:8000/docs
- Alternative Docs: http://localhost:8000/redoc

**You'll see auto-generated Swagger UI with all endpoints!**

---

## Step 9: Test Your Endpoints (10 minutes)

### 9.1 Using Swagger UI (Easiest)

1. Go to http://localhost:8000/docs
2. Click "POST /api/auth/register"
3. Click "Try it out"
4. Enter:
```json
{
  "email": "test@example.com",
  "password": "SecurePassword123!",
  "full_name": "Test User"
}
```
5. Click "Execute"
6. See the response!

### 9.2 Using curl (Terminal)

**Register:**
```bash
curl -X POST "http://localhost:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePassword123!",
    "full_name": "Test User"
  }'
```

**Login:**
```bash
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePassword123!"
  }'
```

**Response:**
```json
{
  "access_token": "eyJhbGc...",
  "token_type": "bearer"
}
```

**Create Task (with auth):**
```bash
curl -X POST "http://localhost:8000/api/tasks" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Build amazing API",
    "description": "Using FastAPI and PostgreSQL",
    "status": "in_progress"
  }'
```

**Get All Tasks:**
```bash
curl "http://localhost:8000/api/tasks" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Filter by Status:**
```bash
curl "http://localhost:8000/api/tasks?status=in_progress" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Search Tasks:**
```bash
curl "http://localhost:8000/api/tasks?search=API" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 9.3 Using Python Requests

```python
import requests

BASE_URL = "http://localhost:8000"

# Register
response = requests.post(f"{BASE_URL}/api/auth/register", json={
    "email": "test@example.com",
    "password": "SecurePassword123!",
    "full_name": "Test User"
})
print(response.json())

# Login
response = requests.post(f"{BASE_URL}/api/auth/login", json={
    "email": "test@example.com",
    "password": "SecurePassword123!"
})
token = response.json()["access_token"]

# Create task
headers = {"Authorization": f"Bearer {token}"}
response = requests.post(
    f"{BASE_URL}/api/tasks",
    headers=headers,
    json={
        "title": "My First Task",
        "description": "Created via Python!",
        "status": "pending"
    }
)
print(response.json())

# Get all tasks
response = requests.get(f"{BASE_URL}/api/tasks", headers=headers)
print(response.json())
```

---

## Step 10: Run Tests (5 minutes)

```bash
# Run all tests
pytest

# With coverage
pytest --cov=app --cov-report=html

# Run specific test file
pytest app/tests/test_tasks.py

# Verbose output
pytest -v
```

**Output:**
```
============================= test session starts ==============================
collected 47 items

app/tests/test_auth.py ........                                          [ 17%]
app/tests/test_users.py ......                                           [ 29%]
app/tests/test_tasks.py ...............................                  [100%]

---------- coverage: platform darwin, python 3.11.5 -----------
Name                              Stmts   Miss  Cover
-----------------------------------------------------
app/__init__.py                       0      0   100%
app/main.py                          25      0   100%
app/api/routes/auth.py               45      1    98%
app/api/routes/users.py              32      0   100%
app/api/routes/tasks.py              67      2    97%
app/core/security.py                 28      0   100%
app/models/user.py                   15      0   100%
app/models/task.py                   12      0   100%
-----------------------------------------------------
TOTAL                               224      3    98%

============================== 47 passed in 12.34s =============================
```

---

## Step 11: Deploy to Production (15 minutes)

### Option 1: Deploy to Railway

**11.1 Create Railway Account**
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"

**11.2 Add PostgreSQL**
1. Click "Add Service"
2. Select "Database" → "PostgreSQL"
3. Railway automatically provisions it!
4. Copy the connection string from Variables tab

**11.3 Deploy Your API**
1. Click "Add Service" → "GitHub Repo"
2. Select your repository
3. Railway detects Python automatically

**11.4 Add Environment Variables**

In Railway dashboard:
```
DATABASE_URL=postgresql://...  (from PostgreSQL service)
SECRET_KEY=your_secret_key
ENVIRONMENT=production
SENTRY_DSN=your_sentry_dsn
```

**11.5 Add Procfile**

Create `Procfile` in project root:
```
web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
release: alembic upgrade head
```

**11.6 Deploy**

```bash
git add .
git commit -m "Add deployment configuration"
git push
```

Railway automatically deploys!

**Your API is live:** `https://your-app.railway.app`

### Option 2: Deploy to Render

**Similar process:**
1. Go to https://render.com
2. Create Web Service from GitHub
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables
6. Deploy!

---

## Step 12: Add Advanced Features

### 12.1 Add Pagination

```python
from fastapi import Query
from app.schemas.pagination import PaginatedResponse

@router.get("/", response_model=PaginatedResponse[TaskResponse])
async def get_tasks(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Calculate offset
    offset = (page - 1) * page_size

    # Get total count
    count_query = select(func.count()).select_from(Task).where(
        Task.user_id == current_user.id
    )
    total = await db.scalar(count_query)

    # Get paginated results
    query = select(Task).where(
        Task.user_id == current_user.id
    ).offset(offset).limit(page_size)

    result = await db.execute(query)
    items = result.scalars().all()

    return {
        "items": items,
        "total": total,
        "page": page,
        "page_size": page_size,
        "pages": (total + page_size - 1) // page_size
    }
```

### 12.2 Add Rate Limiting

```bash
pip install slowapi
```

```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@router.post("/")
@limiter.limit("10/minute")
async def create_task(request: Request, ...):
    ...
```

### 12.3 Add Background Tasks

```python
from fastapi import BackgroundTasks

def send_notification(user_email: str, task_title: str):
    # Send email notification
    print(f"Sending email to {user_email}: Task '{task_title}' created")

@router.post("/")
async def create_task(
    task: TaskCreate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_task = Task(**task.dict(), user_id=current_user.id)
    db.add(db_task)
    await db.commit()

    # Add background task
    background_tasks.add_task(
        send_notification,
        current_user.email,
        task.title
    )

    await db.refresh(db_task)
    return db_task
```

### 12.4 Add Caching

```bash
pip install redis aioredis
```

```python
from aioredis import Redis
import json

@router.get("/")
async def get_tasks(
    redis: Redis = Depends(get_redis),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Try cache first
    cache_key = f"tasks:user:{current_user.id}"
    cached = await redis.get(cache_key)

    if cached:
        return json.loads(cached)

    # Get from database
    result = await db.execute(
        select(Task).where(Task.user_id == current_user.id)
    )
    tasks = result.scalars().all()

    # Cache for 5 minutes
    await redis.setex(
        cache_key,
        300,
        json.dumps([task.dict() for task in tasks])
    )

    return tasks
```

---

## Troubleshooting

### "ModuleNotFoundError"

```bash
# Make sure virtual environment is activated
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

### "Database connection failed"

```bash
# Check DATABASE_URL in .env
cat .env | grep DATABASE_URL

# Test connection
python -c "
from sqlalchemy import create_engine
engine = create_engine('your_database_url')
engine.connect()
print('Connection successful!')
"
```

### "Alembic migration failed"

```bash
# Reset migrations (DEVELOPMENT ONLY)
alembic downgrade base
rm -rf alembic/versions/*
alembic revision --autogenerate -m "Initial"
alembic upgrade head
```

### "401 Unauthorized"

- Check token is included in Authorization header
- Verify token hasn't expired
- Check SECRET_KEY is same across requests

---

## Next Steps

### Enhance Your API

**Add Features:**
- File uploads for task attachments
- Task sharing between users
- Task comments/notes
- Due dates and reminders
- Task categories/tags
- Webhooks for task events

**Improve Security:**
- Refresh token rotation
- OAuth2 integration (Google, GitHub)
- API key authentication
- Request signing
- IP whitelisting

**Add Monitoring:**
- Prometheus metrics
- Grafana dashboards
- Structured logging
- Performance profiling

**Optimize Performance:**
- Database query optimization
- Connection pooling
- Caching layer (Redis)
- CDN for static assets

---

## Summary

**You now have:**
- ✅ Production-ready FastAPI application
- ✅ PostgreSQL database with migrations
- ✅ JWT authentication
- ✅ RESTful CRUD endpoints
- ✅ Auto-generated API documentation
- ✅ Comprehensive test suite
- ✅ Deployed to production
- ✅ Error tracking with Sentry

**Built in:** ~75 minutes from zero to production!

**Welcome to modern Python API development!** 🐍🚀
