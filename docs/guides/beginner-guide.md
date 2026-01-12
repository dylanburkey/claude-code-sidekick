# Complete Beginner's Guide to Claude Code Sidekick

> **No coding experience required!** This guide walks you through creating a
> professional web application from scratch.

## What You'll Learn

By the end of this guide, you'll have:

- A fully functional web application
- Automatic code formatting and quality checks
- Database integration
- Cloud deployment setup
- Professional development workflow

**Time Required:** 30 minutes

---

## Before You Start

### What You Need

1. **A computer** (Mac, Windows, or Linux)
2. **Internet connection**
3. **Claude Code installed**
   ([Installation Guide](https://claude.ai/claude-code))

That's it! Everything else is handled automatically.

### What is Claude Code Sidekick?

Think of it as a **complete development assistant** that:

- Sets up your entire project automatically
- Writes code based on your descriptions
- Ensures professional quality standards
- Handles deployment and databases
- Provides specialized help for every task

---

## Part 1: Understanding the Basics

### Key Concepts (Non-Technical)

**Project Preset** : A template that automatically configures everything for
your type of application

**Master Toggles** : On/off switches that control major features

**MCP Servers** : Connections to external services (databases, cloud hosting,
analytics)

**Hooks** : Automated tasks that run at specific times (like auto-saving)

**Agents** : Specialized AI assistants for different tasks

---

## Part 2: Creating Your First Project

### Step 1: Copy the Sidekick Files

Open your terminal (don't worry, we'll explain each command):

```bash
# Download the Sidekick
git clone https://github.com/dylanburkey/claude-code-sidekick.git

# Go into the folder
cd claude-code-sidekick

# Copy to your new project folder
cp -r .claude/ ~/my-first-app/
cp PROJECT_STARTER.md ~/my-first-app/
cp .env.example ~/my-first-app/

# Go to your new project
cd ~/my-first-app
```

**What just happened?**

- You downloaded the Sidekick toolkit
- Copied it to a new folder called "my-first-app"
- Moved into that folder

### Step 2: Choose Your Project Type

Open the file `PROJECT_STARTER.md` in any text editor (like Notepad, TextEdit,
or VSCode).

Find this section:

```markdown
### Project Preset

- [ ] **Static Website** - Semantic HTML, Modern CSS, Vanilla JavaScript
- [ ] **Astro Site** - Astro 5, Modern CSS, Islands Architecture
- [ ] **React App** - React, TypeScript, Vite, TanStack
- [ ] **Next.js App** - Next.js 15, App Router, TypeScript
- [ ] **Vue/Nuxt** - Vue 3, Nuxt, Composition API
- [ ] **SvelteKit** - Svelte 5, SvelteKit, Runes
- [ ] **Full Stack** - Complete backend + frontend + database stack
- [x] **Custom** - Manual configuration (complete sections below)
```

**Change the `x` to mark your choice:**

For a simple website:

```markdown
- [x] **Static Website**
```

For a blog or content site:

```markdown
- [x] **Astro Site**
```

For a web application:

```markdown
- [x] **React App**
```

For a complete application with database:

```markdown
- [x] **Full Stack**
```

**Important:** Only ONE option should have `[x]`, all others should be `[ ]`.

### Step 3: Run the Quick Start

In your terminal, type:

```bash
/quick-start
```

**What happens next:**

1. Sidekick reads your project type
2. Automatically configures everything
3. Creates the project structure
4. Sets up quality checks
5. Configures external services

**You'll see output like:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Quick Start Complete: Astro Site
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Preset Applied
✓ Code Rules Configured (6 rules)
✓ MCP Servers Enabled (4 servers)
✓ Development Hooks Installed (6 hooks)
✓ Project Structure Created

Ready to start building! 🚀
```

### Step 4: Fill Out Project Information

Back in `PROJECT_STARTER.md`, scroll to the top and fill out:

```markdown
## Project Information

### Project Name

My Amazing App

### Project Description

A web application that helps users track their daily tasks

### Project Type

web-app
```

**Keep it simple!** Just describe what your app does in plain language.

### Step 5: Describe What You Want

Still in `PROJECT_STARTER.md`, find the **Goals & Objectives** section:

```markdown
## Goals & Objectives

### Primary Goal

Create a task tracking app where users can:

- Add daily tasks
- Mark tasks as complete
- View their task history
- Get reminders for important tasks

### Success Criteria

- Users can add a task in under 5 seconds
- The app works on mobile phones
- Tasks are saved even if the user closes the app
- The design is clean and easy to understand
```

**Write in plain English!** Pretend you're explaining to a friend.

### Step 6: Generate Your Project Plan

In the terminal:

```bash
/project-planner
```

**What this does:**

- Analyzes your description
- Creates a step-by-step implementation plan
- Breaks down the work into manageable tasks
- Identifies what needs to be built

**You'll get a file:** `project-plan/phase_1.md`

Open it and read through. It will show:

- What will be built in each phase
- Technical approach (simplified explanation)
- Tasks broken down step-by-step

### Step 7: Generate Tasks

```bash
/task-planner
```

**What this does:**

- Creates specific, actionable tasks
- Assigns each task to a specialized agent
- Organizes tasks by priority

**You'll get a file:** `tasks/phase-1-tasks.md`

This lists everything that needs to be done.

### Step 8: Let the Agents Build It

```bash
/task-runner
```

**What this does:**

- Specialized AI agents start working
- Code is written automatically
- Tests are created
- Documentation is generated
- Everything is validated for quality

**You can watch the progress!** The agents will show what they're doing.

---

## Part 3: Understanding Your Project

### What Got Created?

After the agents finish, you'll have:

```
my-first-app/
├── src/                    # Your application code
│   ├── components/         # Reusable UI pieces
│   ├── pages/              # Different screens/pages
│   └── styles/             # Design and layout
├── .claude/                # AI assistant configuration
├── docs/                   # Documentation
├── tests/                  # Quality checks
└── package.json            # Project dependencies
```

### How to Run Your App

```bash
# Install dependencies (only needed once)
npm install

# Start the development server
npm run dev
```

**Open your browser** to `http://localhost:3000`

**You'll see your app running!**

### How to Make Changes

1. **Describe what you want to change:**

```markdown
# In PROJECT_STARTER.md or a new file

I want to change the task list to show:

- A checkbox for completion
- The task name in bold
- The date it was created
- A delete button
```

2. **Ask Claude Code to implement it:**

In your terminal or Claude Code interface:

```
Please update the task list component to match my new requirements
```

3. **The agents will:**
   - Read your requirements
   - Update the code
   - Test the changes
   - Update documentation

4. **Refresh your browser** to see the changes!

---

## Part 4: Working with Databases

### When You Need a Database

If you selected **Full Stack** or want to save user data, you'll need a
database.

### Easy Database Setup (Neon)

Neon is already configured if you used a preset! Just:

1. **Get your free Neon account:**
   - Go to https://neon.tech
   - Click "Sign Up"
   - Use GitHub to sign in (easiest)

2. **Get your API key:**
   - Go to Account Settings
   - Click "API Keys"
   - Click "Generate New Key"
   - Copy the key

3. **Add it to your project:**

Create a file called `.env` (copy from `.env.example`):

```bash
cp .env.example .env
```

Open `.env` and add your key:

```
NEON_API_KEY=your_key_here
```

4. **Create your database:**

```bash
/mcp-setup
```

This will:

- Connect to Neon
- Create a database
- Set up tables
- Configure everything automatically

### How to Use the Database

Just describe what you want:

```
I need to save user tasks to the database. Each task should have:
- A unique ID
- The task description
- Whether it's complete
- When it was created
```

Claude Code will:

- Create the database structure
- Write the code to save/load data
- Handle all the technical details

---

## Part 5: Deploying Your App

### Making Your App Public

When you're ready to share your app with the world:

### Using Cloudflare (Free Hosting)

1. **Get a Cloudflare account:**
   - Go to https://cloudflare.com
   - Sign up (it's free!)
   - Get your API token from the dashboard

2. **Add the token to `.env`:**

```
CLOUDFLARE_API_TOKEN=your_token_here
```

3. **Deploy:**

```bash
npm run deploy
```

**That's it!** Your app is now live on the internet!

You'll get a URL like: `https://my-amazing-app.pages.dev`

### Updating Your Live App

Made changes? Just deploy again:

```bash
npm run deploy
```

Your live site updates automatically!

---

## Part 6: Common Tasks

### Adding a New Feature

1. **Describe it in plain language:**

```markdown
# features/user-profiles.md

I want users to have profiles with:

- Profile picture
- Username
- Bio
- List of completed tasks
```

2. **Generate tasks:**

```bash
/task-planner features/user-profiles.md
```

3. **Build it:**

```bash
/task-runner
```

### Fixing a Bug

1. **Describe the problem:**

```
When I click the "complete" button, nothing happens
```

2. **Claude Code will:**
   - Investigate the issue
   - Identify the cause
   - Fix the code
   - Test the fix
   - Explain what was wrong

### Improving Design

```
I want the app to:
- Use a blue and white color scheme
- Have rounded corners on buttons
- Use a modern, clean font
- Look good on mobile phones
```

Claude Code updates the styles automatically!

### Adding Analytics

```
I want to track how many people visit my app
```

If you enabled Google Analytics in your preset:

```bash
/mcp-setup
```

Analytics are automatically added!

---

## Part 7: Getting Help

### When Something Goes Wrong

1. **Check the error message** - It usually tells you what's wrong

2. **Ask Claude Code:**

```
I'm getting this error: [paste the error]
Can you help me fix it?
```

3. **Check the documentation:**
   - `docs/guides/troubleshooting.md`
   - `docs/guides/configuration.md`

### Common Issues

**"Command not found"**

- Make sure you're in the right folder
- Run `cd ~/my-first-app` first

**"Permission denied"**

- On Mac/Linux: Add `sudo` before the command
- On Windows: Run as Administrator

**"Module not found"**

- Run `npm install` to install dependencies

**"Port already in use"**

- Another app is using port 3000
- Stop the other app or use a different port

### Getting More Help

- **Documentation:** `docs/` folder
- **Examples:** `examples/` folder
- **Community:** GitHub Issues
- **Direct Help:** Ask Claude Code anything!

---

## Part 8: Best Practices

### Things to Remember

**1. Commit Your Changes Regularly**

```bash
git add .
git commit -m "Added user profiles feature"
```

This saves your progress!

**2. Test Before Deploying**

```bash
npm run test
```

Make sure everything works before going live.

**3. Keep Dependencies Updated**

```bash
npm update
```

Keeps your app secure and fast.

**4. Use Environment Variables for Secrets**

Never put API keys directly in code! Always use `.env`

**5. Read Error Messages**

They usually tell you exactly what's wrong.

---

## Part 9: Next Steps

### Expanding Your Skills

**Learn by Doing:**

1. Start with a simple preset (Static Website or Astro Site)
2. Build a small project
3. Add features one at a time
4. Learn from the code that's generated

**Explore the Agents:**

- Different agents handle different tasks
- Read `.claude/agents/` to see what each does
- Request specific agents for specific jobs

**Understand the Code:**

- Ask Claude Code to explain any code you don't understand
- Add comments to complex sections
- Read the generated documentation

### Project Ideas for Practice

**Beginner:**

- Personal portfolio website
- Recipe collection site
- Photo gallery

**Intermediate:**

- Todo list application
- Blog with comments
- Event calendar

**Advanced:**

- Social media dashboard
- E-commerce store
- Multi-user collaboration tool

---

## Glossary

**Agent** : A specialized AI assistant for specific tasks (coding, testing,
documentation, etc.)

**API** : A way for different software to communicate (like a telephone for
apps)

**Component** : A reusable piece of user interface (like a button or form)

**Database** : Where your app stores information permanently

**Deployment** : Making your app available on the internet

**Environment Variable** : A secret value (like an API key) stored securely

**Framework** : A toolkit that makes building apps easier (like React or Nuxt)

**Git** : A system for tracking changes to your code over time

**Hook** : An automated task that runs at a specific time

**MCP Server** : A connection to an external service (database, analytics, etc.)

**npm** : Node Package Manager - installs tools and libraries

**Preset** : A pre-configured template for a specific type of project

**Repository** : A folder that contains your project and its history

**Terminal** : A text-based interface for running commands

---

## Quick Reference

### Essential Commands

```bash
# Setup
/quick-start              # Configure project from preset
/project-planner          # Create project plan
/task-planner             # Generate tasks
/task-runner              # Execute tasks with agents

# Development
npm install               # Install dependencies
npm run dev               # Start development server
npm run build             # Build for production
npm run test              # Run tests

# Deployment
npm run deploy            # Deploy to production

# Git
git add .                 # Stage changes
git commit -m "message"   # Save changes
git push                  # Upload to GitHub
```

### Files You'll Edit

- `PROJECT_STARTER.md` - Project description and requirements
- `.env` - Secret keys and configuration
- `src/` - Your application code
- `docs/` - Documentation

### Files You Shouldn't Edit

- `.claude/` - AI assistant configuration
- `node_modules/` - Installed dependencies
- `package-lock.json` - Dependency versions

---

## Success Checklist

Before deploying your app, make sure:

- [ ] App runs locally without errors
- [ ] All tests pass (`npm run test`)
- [ ] Environment variables are set in `.env`
- [ ] Database is connected (if applicable)
- [ ] Design looks good on mobile
- [ ] Accessibility checks pass
- [ ] Performance is good (Lighthouse score 90+)
- [ ] Documentation is up to date
- [ ] Git repository is up to date
- [ ] Ready to share with users!

---

**Congratulations!** You've learned how to build professional web applications
with Claude Code Sidekick. Start simple, experiment, and don't be afraid to ask
for help. Happy building! 🚀
