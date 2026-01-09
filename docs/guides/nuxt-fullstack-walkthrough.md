# Building a Full-Stack Nuxt App: Complete Walkthrough

> **Build a professional Nuxt 3 application with database, modern CSS, and Vite+ - No coding experience required!**

## What You'll Build

A complete web application with:
- **Frontend:** Nuxt 3 with Vue Composition API
- **Styling:** Modern CSS (Grid, Flexbox, Custom Properties)
- **Build Tool:** Vite+ for lightning-fast performance
- **Database:** PostgreSQL with Neon
- **Deployment:** Cloudflare Pages
- **Features:** User authentication, data management, responsive design

**Time Required:** 45-60 minutes

---

## Step-by-Step Guide

### Step 1: Set Up Your Project (5 minutes)

#### 1.1 Create Project Folder

Open your terminal:

```bash
# Create a new folder for your app
mkdir my-nuxt-app
cd my-nuxt-app

# Download Sidekick
git clone https://github.com/dylanburkey/claude-code-sidekick.git temp-sidekick
cd temp-sidekick

# Copy Sidekick files to your project
cp -r .claude/ ../
cp PROJECT_STARTER.md ../
cp .env.example ../

# Go back to your project
cd ..
rm -rf temp-sidekick
```

**What you now have:**
- A fresh project folder
- All Sidekick configuration files
- Ready for customization

#### 1.2 Configure Your Project

Open `PROJECT_STARTER.md` in your text editor.

**Fill out the project information:**

```markdown
## Project Information

### Project Name
Task Master Pro

### Project Description
A full-stack task management application built with Nuxt 3. Users can create accounts, manage tasks, set priorities, and track progress. Features a modern, responsive design with real-time updates.

### Project Type
web-app
```

**Select the Vue/Nuxt preset:**

Find this section and change it to:

```markdown
### Project Preset

- [ ] **Static Website**
- [ ] **Astro Site**
- [ ] **React App**
- [ ] **Next.js App**
- [x] **Vue/Nuxt** - Vue 3, Nuxt, Composition API  ← Put the X here
- [ ] **SvelteKit**
- [ ] **Full Stack**
- [ ] **Custom**
```

**Verify Master Toggles are enabled:**

```markdown
### Master Toggles

- **MCP Servers**: `TRUE`
- **Development Hooks**: `TRUE`
- **Code Quality Rules**: `TRUE`
- **AI Agents**: `TRUE`
```

#### 1.3 Customize for Full-Stack

Since we want full-stack features, scroll down to **Code Rules Configuration**:

```markdown
### Language Standards

- **Modern JavaScript**: `TRUE`
- **TypeScript**: `TRUE`  ← Change this to TRUE
- **Node.js**: `TRUE`     ← Change this to TRUE
- **Python**: `FALSE`

### Backend & API

- **Hono**: `FALSE`
- **Express/Fastify**: `TRUE`  ← Change this to TRUE
- **REST API**: `TRUE`          ← Change this to TRUE
- **GraphQL**: `FALSE`
```

**Enable database MCP:**

```markdown
## MCP Configuration

### Database & Storage

- **Neon Database**: `TRUE`  ← Make sure this is TRUE
- **Supabase**: `FALSE`
- **Turso**: `FALSE`
```

#### 1.4 Run Quick Start

In your terminal:

```bash
/quick-start
```

**Output you'll see:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Quick Start Complete: Vue/Nuxt
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Preset Applied
✓ Code Rules Configured (8 rules)
  - Modern JavaScript (ES6+)
  - TypeScript
  - Vue/Nuxt Conventions
  - Modern CSS
  - WCAG AA Accessibility
  - SEO Optimization
  - Performance
  - Security
✓ MCP Servers Enabled (4 servers)
  - GitHub
  - Neon Database
  - Vercel
  - Sentry
✓ Development Hooks Installed (7 hooks)
✓ Project Structure Created

Next Steps:
1. Copy .env.example to .env and add API keys
2. Run /project-planner to create your plan
3. Start building!

Ready! 🚀
```

---

### Step 2: Set Up External Services (10 minutes)

#### 2.1 GitHub (For Code Storage)

1. **Create GitHub account** (if you don't have one):
   - Go to https://github.com
   - Click "Sign up"
   - Follow the prompts

2. **Create a new repository:**
   - Click the "+" in top right
   - Select "New repository"
   - Name: `task-master-pro`
   - Make it public or private (your choice)
   - Don't initialize with README (we already have files)
   - Click "Create repository"

3. **Get your GitHub token:**
   - Go to Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Name: "Task Master Pro"
   - Select scopes: `repo`, `workflow`
   - Click "Generate token"
   - **Copy the token** (you won't see it again!)

4. **Connect your project:**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/task-master-pro.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

#### 2.2 Neon Database (For Data Storage)

1. **Create Neon account:**
   - Go to https://neon.tech
   - Click "Sign Up"
   - Use GitHub to sign in (easiest option)

2. **Create your first project:**
   - Click "Create a project"
   - Name: "Task Master Pro"
   - Region: Choose closest to you
   - Click "Create project"

3. **Get your API key:**
   - Click on your profile (top right)
   - Select "Account settings"
   - Click "API keys"
   - Click "Generate new API key"
   - Name: "Task Master Pro Development"
   - **Copy the key**

4. **Get your database connection string:**
   - Go back to your project
   - Click "Dashboard"
   - Click "Connection string"
   - Copy the connection string (starts with `postgres://`)

#### 2.3 Vercel (For Deployment)

1. **Create Vercel account:**
   - Go to https://vercel.com
   - Click "Sign Up"
   - Use GitHub to sign in

2. **Get your token:**
   - Go to Settings → Tokens
   - Click "Create Token"
   - Name: "Task Master Pro"
   - Scope: "Full Access"
   - **Copy the token**

#### 2.4 Configure Environment Variables

Create your `.env` file:

```bash
cp .env.example .env
```

Open `.env` and add your keys:

```env
# GitHub
GITHUB_TOKEN=ghp_your_token_here

# Neon Database
NEON_API_KEY=your_neon_api_key_here
DATABASE_URL=postgres://your_connection_string_here

# Vercel
VERCEL_TOKEN=your_vercel_token_here

# Sentry (optional, for error tracking)
SENTRY_AUTH_TOKEN=your_sentry_token_if_you_want

# Google Analytics (optional)
GA4_MEASUREMENT_ID=G-your_id_if_you_want
```

**Important:** Never commit `.env` to Git! It's already in `.gitignore`.

---

### Step 3: Define Your Application (10 minutes)

#### 3.1 Describe Your Features

In `PROJECT_STARTER.md`, scroll to **Goals & Objectives**:

```markdown
## Goals & Objectives

### Primary Goal

Create a modern task management application where users can:

1. **Authentication**
   - Create an account with email and password
   - Log in securely
   - Reset forgotten passwords
   - Manage profile information

2. **Task Management**
   - Create new tasks with title, description, and due date
   - Assign priority levels (High, Medium, Low)
   - Mark tasks as complete
   - Edit existing tasks
   - Delete tasks
   - Filter tasks by status, priority, or date

3. **Organization**
   - Create projects to group related tasks
   - Use tags for categorization
   - Search across all tasks
   - Sort by various criteria

4. **User Experience**
   - Clean, modern interface
   - Mobile-responsive design
   - Fast performance
   - Accessible to all users (WCAG AA)
   - Dark mode support

### Success Criteria

- Users can create a task in under 10 seconds
- Application loads in under 2 seconds
- Works perfectly on mobile phones and tablets
- Lighthouse score of 95+ for performance and accessibility
- All data is saved securely to the database
- Real-time updates without page refreshes
```

#### 3.2 Add Functional Requirements

```markdown
### Functional Requirements

1. **WHEN** user signs up **THE SYSTEM SHALL** create a new account and send confirmation email
2. **WHEN** user logs in **THE SYSTEM SHALL** verify credentials and create a session
3. **WHEN** user creates a task **THE SYSTEM SHALL** save it to the database and update the UI
4. **WHEN** user marks task complete **THE SYSTEM SHALL** update status in real-time
5. **WHEN** user edits a task **THE SYSTEM SHALL** save changes without page reload
6. **WHEN** user deletes a task **THE SYSTEM SHALL** show confirmation before removing
7. **WHILE** user is logged in **THE SYSTEM SHALL** auto-save all changes
8. **WHERE** user has no tasks **THE SYSTEM SHALL** show helpful onboarding message
9. **IF** network fails **THEN THE SYSTEM SHALL** queue changes and sync when reconnected
```

---

### Step 4: Generate Your Project Plan (5 minutes)

Run the project planner:

```bash
/project-planner
```

**What happens:**
- AI analyzes your requirements
- Creates a multi-phase implementation plan
- Identifies technical approach for each feature
- Breaks work into manageable chunks

**Output file:** `project-plan/phase_1.md`

Open it to see:

```markdown
# Task Master Pro - Phase 1 Implementation Plan

## Phase Overview

Phase 1 focuses on core infrastructure and basic task management.

**Duration:** 2-3 development sessions
**Prerequisites:** Environment setup complete

## Technical Approach

### Frontend Stack
- **Nuxt 3** with auto-imports and file-based routing
- **Vue 3 Composition API** for component logic
- **Pinia** for state management
- **Modern CSS** with CSS Grid and Custom Properties
- **Vite+** for optimized builds

### Backend Stack
- **Nuxt Server Routes** for API endpoints
- **PostgreSQL** via Neon for data persistence
- **Prisma ORM** for database operations
- **JWT** for authentication

### Features to Implement

#### 1. Database Schema
- Users table
- Tasks table
- Projects table (for future phases)
- Indexes for performance

#### 2. Authentication System
- Registration endpoint
- Login endpoint
- Session management
- Protected routes

#### 3. Task CRUD Operations
- Create task API
- Read/list tasks API
- Update task API
- Delete task API

#### 4. Basic UI Components
- Layout with navigation
- Task list component
- Task form component
- User profile component

... (more details)
```

---

### Step 5: Generate Implementation Tasks (5 minutes)

Create specific, actionable tasks:

```bash
/task-planner
```

**Output file:** `tasks/phase-1-tasks.md`

This breaks down everything into individual tasks:

```markdown
# Phase 1 Tasks

## Database Setup (Agent: database)

### Task 1.1: Create Database Schema
**Description:** Set up PostgreSQL database with tables for users and tasks

**Actions:**
- Initialize Prisma
- Create schema for users table
- Create schema for tasks table
- Add indexes for performance
- Generate migrations

**Success Criteria:**
- Schema file exists and is valid
- Migrations run without errors
- Tables created in Neon database

**Estimated Time:** 15 minutes
**Priority:** High
**Dependencies:** None

---

### Task 1.2: Seed Development Data
**Description:** Add sample data for testing

**Actions:**
- Create seed script
- Add 5 sample users
- Add 20 sample tasks
- Run seeder

**Success Criteria:**
- Seed script runs successfully
- Data visible in database
- Can query data via API

**Estimated Time:** 10 minutes
**Priority:** Medium
**Dependencies:** Task 1.1

---

## Authentication (Agent: backend-api)

### Task 2.1: Implement Registration
... (more tasks)
```

---

### Step 6: Let the Agents Build It (15-20 minutes)

Now the magic happens! Run:

```bash
/task-runner
```

**You'll see agents working:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Task Runner Started
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Database Agent] Starting Task 1.1: Create Database Schema
→ Installing Prisma...
→ Creating schema file...
→ Defining User model...
→ Defining Task model...
→ Adding indexes...
→ Generating migration...
✓ Task 1.1 Complete (14.2s)

[Database Agent] Starting Task 1.2: Seed Development Data
→ Creating seed script...
→ Generating sample users...
→ Generating sample tasks...
→ Running seeder...
✓ Task 1.2 Complete (8.7s)

[Backend API Agent] Starting Task 2.1: Implement Registration
→ Creating auth utilities...
→ Building registration endpoint...
→ Adding validation...
→ Writing tests...
✓ Task 2.1 Complete (18.3s)

... (continues for all tasks)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
All Tasks Complete!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total Time: 12 minutes 34 seconds
Tasks Completed: 24/24
Tests Passed: 87/87
Files Created: 45
Lines of Code: 2,847

Your application is ready to run!
```

---

### Step 7: Install Dependencies and Run (5 minutes)

#### 7.1 Install Everything

```bash
npm install
```

This installs all the tools and libraries needed.

#### 7.2 Set Up Database

```bash
npx prisma migrate dev
```

This creates your database tables in Neon.

#### 7.3 Seed Sample Data

```bash
npx prisma db seed
```

This adds sample users and tasks for testing.

#### 7.4 Start the Development Server

```bash
npm run dev
```

**You'll see:**

```
Nuxt 3.15.0 with Nitro 2.10.3

  ➜ Local:    http://localhost:3000/
  ➜ Network:  http://192.168.1.10:3000/

✔ Vite+ server built in 1.2s
✔ Nitro built in 0.8s

Ready in 2.1s
```

#### 7.5 Open Your App

Go to http://localhost:3000 in your browser.

**You'll see your app running!**

---

### Step 8: Explore Your Application (5 minutes)

#### 8.1 What Got Created

```
my-nuxt-app/
├── server/                  # Backend API
│   ├── api/
│   │   ├── auth/           # Authentication endpoints
│   │   └── tasks/          # Task management endpoints
│   ├── middleware/         # Auth protection
│   └── utils/              # Helper functions
├── components/             # Vue components
│   ├── TaskList.vue       # Task list display
│   ├── TaskForm.vue       # Create/edit tasks
│   ├── TaskCard.vue       # Individual task
│   └── Navigation.vue     # App navigation
├── pages/                  # Nuxt pages (auto-routed)
│   ├── index.vue          # Home/dashboard
│   ├── login.vue          # Login page
│   ├── register.vue       # Registration
│   └── tasks/
│       ├── index.vue      # All tasks
│       └── [id].vue       # Single task detail
├── composables/            # Vue composables
│   ├── useAuth.ts         # Authentication logic
│   ├── useTasks.ts        # Task management logic
│   └── useApi.ts          # API calls
├── stores/                 # Pinia stores
│   ├── auth.ts            # Auth state
│   └── tasks.ts           # Tasks state
├── assets/
│   └── styles/
│       ├── main.css       # Global styles
│       ├── variables.css  # CSS custom properties
│       └── components/    # Component styles
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── migrations/        # Database migrations
│   └── seed.ts            # Sample data
├── tests/                  # Automated tests
├── .env                    # Your secrets (not in git)
└── nuxt.config.ts         # Nuxt configuration
```

#### 8.2 Test the Features

**Register a New User:**
1. Click "Sign Up"
2. Enter email and password
3. Submit form
4. You're automatically logged in!

**Create a Task:**
1. Click "New Task"
2. Enter task details
3. Set priority
4. Click "Save"
5. Task appears in your list instantly

**Edit a Task:**
1. Click on any task
2. Modify the details
3. Changes save automatically

**Mark Complete:**
1. Check the checkbox on a task
2. Task updates in real-time
3. Moves to "Completed" section

**Delete a Task:**
1. Click the delete icon
2. Confirm deletion
3. Task removed from database

---

### Step 9: Customize the Design (10 minutes)

#### 9.1 Update Colors

Open `assets/styles/variables.css`:

```css
:root {
  /* Change these to your brand colors */
  --color-primary: #3B82F6;      /* Blue */
  --color-secondary: #8B5CF6;    /* Purple */
  --color-success: #10B981;      /* Green */
  --color-danger: #EF4444;       /* Red */
  --color-warning: #F59E0B;      /* Orange */

  /* Or use your own colors */
  --color-primary: #FF6B6B;      /* Coral */
  --color-secondary: #4ECDC4;    /* Teal */

  /* Background colors */
  --color-background: #FFFFFF;
  --color-surface: #F3F4F6;
  --color-border: #E5E7EB;

  /* Text colors */
  --color-text: #1F2937;
  --color-text-light: #6B7280;
}
```

**Save the file** and your app updates instantly with new colors!

#### 9.2 Customize Typography

Still in `variables.css`:

```css
:root {
  /* Change fonts */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'Fira Code', monospace;

  /* Or use different fonts */
  --font-sans: 'Poppins', sans-serif;
  --font-display: 'Playfair Display', serif;

  /* Font sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
}
```

#### 9.3 Adjust Spacing

```css
:root {
  /* Spacing scale */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
}
```

#### 9.4 Enable Dark Mode

Open `components/ThemeToggle.vue` (it was created automatically):

```vue
<template>
  <button @click="toggleTheme" class="theme-toggle">
    {{ isDark ? '☀️' : '🌙' }}
  </button>
</template>

<script setup>
const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}
</script>
```

Dark mode colors in `variables.css`:

```css
.dark {
  --color-background: #1F2937;
  --color-surface: #111827;
  --color-border: #374151;
  --color-text: #F3F4F6;
  --color-text-light: #9CA3AF;
}
```

---

### Step 10: Add More Features

#### 10.1 Add a New Feature

Let's add task categories:

Create `specs/task-categories.md`:

```markdown
# Task Categories Feature

## Description
Users can organize tasks into categories (Work, Personal, Shopping, etc.)

## Requirements

1. **WHEN** user creates a task **THE SYSTEM SHALL** allow selecting a category
2. **WHEN** user views tasks **THE SYSTEM SHALL** show category tag
3. **WHEN** user clicks a category **THE SYSTEM SHALL** filter to show only that category
4. **THE SYSTEM SHALL** provide default categories (Work, Personal, Shopping, Health, Other)
5. **WHEN** user creates custom category **THE SYSTEM SHALL** save it for future use

## UI Components

- Category selector dropdown
- Category tag display
- Category filter buttons
- Category management modal

## Database Changes

- Add `categories` table
- Add `categoryId` to tasks table
- Add relationship between tasks and categories
```

#### 10.2 Generate and Execute

```bash
# Generate tasks for this feature
/task-planner specs/task-categories.md

# Build the feature
/task-runner
```

**The agents will:**
- Update the database schema
- Create the category management system
- Build the UI components
- Add filtering logic
- Write tests
- Update documentation

**Refresh your browser** and the new feature is live!

---

### Step 11: Deploy to Production (10 minutes)

#### 11.1 Build for Production

```bash
npm run build
```

This creates an optimized version of your app.

#### 11.2 Deploy to Vercel

```bash
npx vercel
```

**Follow the prompts:**
- "Set up and deploy?" → Yes
- "Which scope?" → Your account
- "Link to existing project?" → No
- "What's your project's name?" → task-master-pro
- "In which directory is your code?" → ./
- "Want to override settings?" → No

**Deployment starts:**

```
🔗 Deploying to production...
✓ Building...
✓ Uploading...
✓ Running checks...
✓ Complete!

🎉 Deployed to production!

https://task-master-pro.vercel.app
```

#### 11.3 Set Up Environment Variables

In the Vercel dashboard:
1. Go to your project
2. Click "Settings" → "Environment Variables"
3. Add all variables from your `.env`:
   - `NEON_API_KEY`
   - `DATABASE_URL`
   - etc.

#### 11.4 Redeploy

```bash
vercel --prod
```

**Your app is now live!**

Visit your URL: `https://task-master-pro.vercel.app`

---

### Step 12: Monitor and Maintain

#### 12.1 Set Up Error Tracking (Sentry)

If you enabled Sentry:

1. Go to https://sentry.io
2. Create a new project (Nuxt 3)
3. Copy your DSN
4. Add to `.env`:

```env
SENTRY_DSN=your_dsn_here
```

Errors are now automatically tracked!

#### 12.2 Set Up Analytics

If you enabled Google Analytics:

1. Go to https://analytics.google.com
2. Create a new property
3. Get your Measurement ID
4. Already configured in your app!

Track:
- Page views
- User interactions
- Task completions
- Feature usage

#### 12.3 Monitor Performance

Open your deployed app and check:

```bash
# Run Lighthouse audit
npx lighthouse https://task-master-pro.vercel.app
```

You should see:
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

---

## Troubleshooting

### Common Issues

**"Cannot connect to database"**
- Check `DATABASE_URL` in `.env`
- Verify Neon project is running
- Run `npx prisma migrate dev` again

**"Port 3000 already in use"**
- Stop other apps using port 3000
- Or use a different port: `npm run dev -- --port 3001`

**"Module not found"**
- Run `npm install` again
- Delete `node_modules` and run `npm install`

**"Build failed on Vercel"**
- Check environment variables are set
- Verify build works locally first
- Check Vercel logs for specific error

**"Tasks not saving"**
- Check browser console for errors
- Verify API endpoints are working: `/api/tasks`
- Check database connection

---

## Next Steps

### Enhance Your App

**Add Authentication Providers:**
- Google OAuth
- GitHub login
- Magic link email

**Add Real-Time Features:**
- WebSocket connections
- Live task updates
- Collaborative editing

**Improve UX:**
- Add animations and transitions
- Improve mobile experience
- Add keyboard shortcuts
- Add drag-and-drop task reordering

**Add Business Features:**
- Task assignments (multi-user)
- Due date reminders
- Email notifications
- File attachments
- Comments and discussions
- Time tracking
- Reports and analytics

### Learn More

- **Nuxt Documentation:** https://nuxt.com/docs
- **Vue Documentation:** https://vuejs.org/guide
- **Vite Documentation:** https://vitejs.dev
- **Prisma Documentation:** https://www.prisma.io/docs
- **Modern CSS:** https://web.dev/learn/css

---

## Complete Code Examples

### Example: Task Component

The agents created this component (`components/TaskCard.vue`):

```vue
<template>
  <article class="task-card" :class="{ 'task-card--complete': task.completed }">
    <div class="task-card__header">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="toggleComplete"
        class="task-card__checkbox"
      >
      <h3 class="task-card__title">{{ task.title }}</h3>
      <span
        class="task-card__priority"
        :class="`task-card__priority--${task.priority.toLowerCase()}`"
      >
        {{ task.priority }}
      </span>
    </div>

    <p class="task-card__description">{{ task.description }}</p>

    <div class="task-card__footer">
      <time class="task-card__date">{{ formatDate(task.dueDate) }}</time>
      <div class="task-card__actions">
        <button @click="editTask" class="btn-icon">
          <span class="sr-only">Edit</span>
          ✏️
        </button>
        <button @click="deleteTask" class="btn-icon btn-danger">
          <span class="sr-only">Delete</span>
          🗑️
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle', 'edit', 'delete'])

const toggleComplete = () => emit('toggle', props.task.id)
const editTask = () => emit('edit', props.task.id)
const deleteTask = () => emit('delete', props.task.id)

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>

<style scoped>
.task-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;
}

.task-card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.task-card--complete {
  opacity: 0.6;
}

.task-card--complete .task-card__title {
  text-decoration: line-through;
}

.task-card__header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.task-card__checkbox {
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
}

.task-card__title {
  flex: 1;
  font-size: var(--text-lg);
  font-weight: 600;
  margin: 0;
}

.task-card__priority {
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
}

.task-card__priority--high {
  background: var(--color-danger);
  color: white;
}

.task-card__priority--medium {
  background: var(--color-warning);
  color: white;
}

.task-card__priority--low {
  background: var(--color-success);
  color: white;
}

.task-card__description {
  color: var(--color-text-light);
  margin-bottom: var(--space-3);
}

.task-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-card__date {
  font-size: var(--text-sm);
  color: var(--color-text-light);
}

.task-card__actions {
  display: flex;
  gap: var(--space-2);
}

.btn-icon {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: var(--space-1);
  opacity: 0.6;
  transition: opacity 0.2s;
}

.btn-icon:hover {
  opacity: 1;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
```

**Notice:**
- Modern Vue 3 Composition API with `<script setup>`
- Semantic HTML (article, time, button)
- Accessible (screen reader text, proper labels)
- Modern CSS (custom properties, Grid, Flexbox)
- Responsive and interactive

---

## Summary

**Congratulations!** You've built a complete full-stack Nuxt 3 application with:

✅ Vue 3 Composition API
✅ TypeScript support
✅ Modern CSS (no frameworks needed!)
✅ Vite+ for fast builds
✅ PostgreSQL database
✅ User authentication
✅ CRUD operations
✅ Responsive design
✅ Accessibility (WCAG AA)
✅ Deployed to production
✅ Error tracking
✅ Analytics

**Total time:** ~60 minutes from zero to production!

**You can:**
- ✅ Add new features in minutes
- ✅ Customize any aspect of the design
- ✅ Scale to thousands of users
- ✅ Maintain code quality automatically
- ✅ Deploy updates instantly

**Welcome to modern full-stack development!** 🚀
