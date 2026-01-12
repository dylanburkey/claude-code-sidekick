# Troubleshooting Guide

> **Quick solutions to common issues**

## Quick Start Issues

### "Multiple presets selected"

**Error:**

```
Error: Multiple presets selected
Found: Astro Site, React App

Please select only ONE preset or choose Custom.
```

**Solution:**

1. Open `PROJECT_STARTER.md`
2. Find the Project Preset section
3. Make sure only ONE option has `[x]`, all others should be `[ ]`

**Correct:**

```markdown
- [ ] **Static Website**
- [x] **Astro Site** ← Only one X
- [ ] **React App**
```

**Incorrect:**

```markdown
- [x] **Static Website**
- [x] **Astro Site** ← Two X's!
- [ ] **React App**
```

---

### "No preset selected"

**Error:**

```
Error: No preset selected
Please select a preset or choose Custom.
```

**Solution:** Change at least one `[ ]` to `[x]`:

```markdown
- [x] **Astro Site** ← Add the X
```

---

### "Master toggle disabled but services configured"

**Warning:**

```
Warning: MCP Servers toggle is FALSE but individual MCPs are enabled
Ignoring MCP configuration.
```

**Solution:** Either:

1. Enable the master toggle:

```markdown
- **MCP Servers**: `TRUE`
```

Or: 2. Accept that MCPs won't be configured (leave it `FALSE`)

**Remember:** Master toggles override everything. `FALSE` = entire section
skipped.

---

## Installation Issues

### "Command not found: /quick-start"

**Problem:** Claude Code doesn't recognize the command.

**Solutions:**

1. **Check you're in the right directory:**

```bash
pwd
# Should show your project directory with .claude/ folder
ls -la .claude/
# Should list command files
```

2. **Verify command file exists:**

```bash
ls .claude/commands/quick-start.md
```

3. **Restart Claude Code:** Close and reopen your terminal/Claude Code session.

---

### "Permission denied"

**Error:**

```bash
cp: permission denied
```

**Solutions:**

**On Mac/Linux:**

```bash
sudo cp -r .claude/ /your-project/
```

**On Windows:**

- Right-click your terminal
- Select "Run as Administrator"
- Try again

---

### "Directory already exists"

**Error:**

```
cp: .claude already exists
```

**Solutions:**

**Option 1 - Backup and replace:**

```bash
mv .claude .claude.backup
cp -r /path/to/sidekick/.claude/ .
```

**Option 2 - Merge:**

```bash
cp -r /path/to/sidekick/.claude/* .claude/
```

**Option 3 - Start fresh:**

```bash
rm -rf .claude
cp -r /path/to/sidekick/.claude/ .
```

---

## Configuration Issues

### "Cannot find PROJECT_STARTER.md"

**Error:**

```
Error: PROJECT_STARTER.md not found
```

**Solution:**

```bash
# Check if file exists
ls PROJECT_STARTER.md

# If not, copy it
cp /path/to/sidekick/PROJECT_STARTER.md .

# Verify it's there
ls -l PROJECT_STARTER.md
```

---

### "Invalid TRUE/FALSE value"

**Error:**

```
Error: Expected TRUE or FALSE, got "true"
```

**Solution:** Values must be UPPERCASE:

**Correct:**

```markdown
- **MCP Servers**: `TRUE`
- **Hooks**: `FALSE`
```

**Incorrect:**

```markdown
- **MCP Servers**: `true` ← Lowercase
- **Hooks**: `false` ← Lowercase
```

---

### "Environment variables not found"

**Error:**

```
Error: NEON_API_KEY not found in environment
```

**Solution:**

1. **Create .env file:**

```bash
cp .env.example .env
```

2. **Add your keys:**

```env
NEON_API_KEY=your_actual_key_here
DATABASE_URL=postgres://your_connection_string
GITHUB_TOKEN=ghp_your_github_token
```

3. **Verify:**

```bash
cat .env
# Should show your values (not "your_actual_key_here")
```

**Important:** Never commit `.env` to Git!

---

## Database Issues

### "Cannot connect to database"

**Symptoms:**

- App starts but can't save data
- Database queries fail
- "Connection refused" errors

**Solutions:**

1. **Check DATABASE_URL in .env:**

```bash
grep DATABASE_URL .env
# Should show: postgres://...
```

2. **Verify Neon project is active:**

- Log into https://neon.tech
- Check project status
- Ensure it's not paused/suspended

3. **Test connection:**

```bash
npx prisma db execute --url="$DATABASE_URL" --stdin <<< "SELECT 1;"
```

If this fails, your DATABASE_URL is wrong.

4. **Regenerate connection string:**

- Go to Neon dashboard
- Click "Connection string"
- Copy the new string
- Update `.env`

---

### "Prisma migration failed"

**Error:**

```
Error: Migration failed to apply
```

**Solutions:**

1. **Reset database (DEVELOPMENT ONLY):**

```bash
npx prisma migrate reset
```

**⚠️ Warning:** This deletes all data!

2. **Force migration:**

```bash
npx prisma migrate deploy
```

3. **Check for conflicts:**

```bash
npx prisma migrate status
```

4. **Start fresh:**

```bash
# Delete migrations
rm -rf prisma/migrations

# Recreate
npx prisma migrate dev --name init
```

---

### "Database schema out of sync"

**Error:**

```
Error: Schema and database are out of sync
```

**Solution:**

```bash
# Generate Prisma client
npx prisma generate

# Apply migrations
npx prisma migrate deploy

# Restart your app
npm run dev
```

---

## Build Issues

### "Module not found"

**Error:**

```
Error: Cannot find module 'some-package'
```

**Solutions:**

1. **Install dependencies:**

```bash
npm install
```

2. **Clear cache and reinstall:**

```bash
rm -rf node_modules package-lock.json
npm install
```

3. **Check package.json:**

```bash
cat package.json
# Verify the package is listed
```

4. **Install specific package:**

```bash
npm install some-package
```

---

### "Port 3000 already in use"

**Error:**

```
Error: Port 3000 is already in use
```

**Solutions:**

**Option 1 - Stop other app:**

```bash
# Find what's using port 3000
lsof -i :3000

# Kill it (replace PID with actual number)
kill -9 PID
```

**Option 2 - Use different port:**

```bash
# Nuxt/Vite
npm run dev -- --port 3001

# Next.js
npm run dev -p 3001
```

**Option 3 - Change default port:**

In `package.json`:

```json
{
  "scripts": {
    "dev": "nuxt dev --port 3001"
  }
}
```

---

### "Out of memory"

**Error:**

```
FATAL ERROR: JavaScript heap out of memory
```

**Solution:**

Increase Node.js memory:

```bash
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

Or update `package.json`:

```json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' nuxt build"
  }
}
```

---

## Deployment Issues

### "Vercel build failed"

**Error in Vercel dashboard:**

```
Build failed: [some error]
```

**Solutions:**

1. **Check environment variables:**

- Vercel Dashboard → Settings → Environment Variables
- Add ALL variables from `.env`
- Including: DATABASE_URL, API keys, etc.

2. **Verify build works locally:**

```bash
npm run build
```

If it fails locally, fix errors before deploying.

3. **Check build logs in Vercel:**

- Go to Deployments
- Click failed deployment
- Read full error message

4. **Check Node version:**

In `package.json`:

```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

### "Database not accessible in production"

**Problem:** App works locally but fails in production.

**Solutions:**

1. **Add DATABASE_URL to Vercel:**

- Go to Settings → Environment Variables
- Add: `DATABASE_URL`
- Value: Your Neon connection string
- **Important:** Select "Production" environment

2. **Whitelist Vercel IPs in Neon:**

- Some databases restrict IPs
- Check Neon → Settings → Allowed IPs
- Add Vercel's IP ranges (or set to allow all)

3. **Use connection pooling:**

For Neon, use the pooled connection string:

```
DATABASE_URL=postgres://user:pass@host/db?pgbouncer=true
```

---

### "Environment variables not working"

**Problem:** Variables work locally but not in production.

**Solutions:**

1. **Check variable names match exactly:**

```bash
# Local .env
NEON_API_KEY=...

# Vercel settings
NEON_API_KEY=...  ← Must be EXACTLY the same
```

2. **Redeploy after adding variables:**

```bash
vercel --prod
```

Changes to environment variables require redeployment.

3. **Check environment scopes:**

- Production vs. Preview vs. Development
- Make sure variables are set for Production

---

## Git Issues

### "Nothing to commit"

**Message:**

```
nothing to commit, working tree clean
```

**This is fine!** It means:

- All changes are already committed
- You're up to date

To check what's committed:

```bash
git log --oneline -5
```

---

### "Your branch is behind"

**Message:**

```
Your branch is behind 'origin/main' by 2 commits
```

**Solution:**

```bash
# Get latest changes
git pull

# If you have local changes, you may need:
git pull --rebase
```

---

### "Merge conflict"

**Error:**

```
CONFLICT (content): Merge conflict in file.js
```

**Solution:**

1. **Open conflicted file**
2. **Look for conflict markers:**

```javascript
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> branch-name
```

3. **Choose what to keep:**

```javascript
// Remove markers, keep what you want
Your final code here
```

4. **Mark as resolved:**

```bash
git add file.js
git commit -m "Resolved merge conflict"
```

---

### "Permission denied (publickey)"

**Error:**

```
Permission denied (publickey).
fatal: Could not read from remote repository.
```

**Solution:**

1. **Generate SSH key:**

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

2. **Add to GitHub:**

```bash
# Copy your public key
cat ~/.ssh/id_ed25519.pub

# Go to GitHub → Settings → SSH Keys → New SSH Key
# Paste the key
```

3. **Test connection:**

```bash
ssh -T git@github.com
```

---

## Agent Issues

### "Agent failed to complete task"

**Error:**

```
Agent 'database' failed: [error message]
```

**Solutions:**

1. **Read the error message** - It usually tells you what's wrong

2. **Check agent logs:**

```bash
cat .claude/logs/agent-database.log
```

3. **Retry the task:**

```bash
/task-runner --retry failed
```

4. **Skip and do manually:**

```bash
/task-runner --skip database-task-1
```

---

### "Agent timeout"

**Error:**

```
Agent timed out after 300 seconds
```

**Solutions:**

1. **Increase timeout:**

In `PROJECT_STARTER.md`:

```markdown
### Agent Configuration

- **Timeout**: `600` ← Increase from 300
```

2. **Break task into smaller pieces:**

- Split large tasks
- Run separately

3. **Check system resources:**

```bash
# Memory usage
free -h

# CPU usage
top
```

Close other applications if resources are low.

---

## Performance Issues

### "App is slow"

**Solutions:**

1. **Check Lighthouse score:**

```bash
npx lighthouse http://localhost:3000
```

2. **Enable production mode locally:**

```bash
npm run build
npm run preview
```

3. **Check bundle size:**

```bash
npm run build
# Look for large bundles
```

4. **Optimize images:**

- Use WebP format
- Compress images
- Use appropriate sizes

5. **Check database queries:**

- Add indexes
- Optimize N+1 queries
- Use query caching

---

### "Build is slow"

**Solutions:**

1. **Clear build cache:**

```bash
rm -rf .nuxt .next .astro dist
npm run build
```

2. **Upgrade to Vite+:** Already configured in presets!

3. **Use Turbo:**

```bash
npm install -g turbo
turbo build
```

---

## Common Errors and Solutions

### "Hydration mismatch"

**Error:**

```
Warning: Text content did not match. Server: "X" Client: "Y"
```

**Solution:** Ensure server and client render the same content:

**Bad:**

```vue
<template>
  <div>{{ Date.now() }}</div>
  ← Different each render
</template>
```

**Good:**

```vue
<script setup>
const timestamp = ref(null);
onMounted(() => {
  timestamp.value = Date.now();
});
</script>

<template>
  <div>{{ timestamp }}</div>
</template>
```

---

### "Cannot read property of undefined"

**Error:**

```
TypeError: Cannot read property 'name' of undefined
```

**Solution:** Use optional chaining and nullish coalescing:

**Bad:**

```javascript
const name = user.profile.name;
```

**Good:**

```javascript
const name = user?.profile?.name ?? 'Guest';
```

---

### "CORS error"

**Error:**

```
Access to fetch at 'api.example.com' has been blocked by CORS policy
```

**Solution:**

In your API server:

```javascript
// Nuxt server/middleware/cors.ts
export default defineEventHandler((event) => {
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
});
```

---

## Getting Additional Help

### 1. Check Documentation

- [Beginner's Guide](beginner-guide.md) - Start here if new
- [Quick Start Guide](quick-start-guide.md) - Preset setup
- [Configuration Guide](configuration.md) - All options
- [Nuxt Walkthrough](nuxt-fullstack-walkthrough.md) - Full-stack example

### 2. Search Issues

Check if someone else had the same problem:

- GitHub Issues: https://github.com/dylanburkey/claude-code-sidekick/issues
- Search for error message

### 3. Ask Claude Code

Claude Code can help debug:

```
I'm getting this error: [paste error]
Can you help me understand what's wrong?
```

### 4. Create an Issue

If you found a bug:

1. Go to GitHub repository
2. Click "Issues" → "New Issue"
3. Include:
   - Error message
   - What you were trying to do
   - Your preset/configuration
   - Steps to reproduce

### 5. Community Help

- Discord: [Link if available]
- Stack Overflow: Tag `claude-code-sidekick`

---

## Debug Mode

### Enable Verbose Logging

```bash
# Set debug environment variable
DEBUG=* npm run dev

# Or specific namespaces
DEBUG=claude:* npm run dev
```

### Check All Logs

```bash
# Agent logs
ls -la .claude/logs/

# Application logs
npm run dev 2>&1 | tee debug.log
```

### Validate Configuration

```bash
# Check if presets are valid
/quick-start --validate

# Check MCP configuration
/mcp-setup --validate

# Check hooks
/hooks-setup --validate
```

---

## Prevention Tips

### Best Practices to Avoid Issues

1. **Always use version control:**

```bash
git init
git add .
git commit -m "Initial commit"
```

2. **Never commit .env:**

```bash
# Verify .env is in .gitignore
grep ".env" .gitignore
```

3. **Keep dependencies updated:**

```bash
npm update
npm audit fix
```

4. **Test before deploying:**

```bash
npm run build
npm run preview
# Test thoroughly
```

5. **Use consistent Node version:**

```bash
# Install nvm
nvm install 18
nvm use 18
```

6. **Back up your database:**

```bash
# Export before major changes
npx prisma db pull
```

---

## Emergency Recovery

### Complete Reset (Last Resort)

If everything is broken:

```bash
# 1. Backup your work
cp -r . ../project-backup

# 2. Remove all generated files
rm -rf node_modules .nuxt .next dist .claude/logs

# 3. Reset git (if needed)
git reset --hard HEAD

# 4. Reinstall
npm install

# 5. Rebuild
npm run build

# 6. Restart
npm run dev
```

### Restore from Backup

```bash
# If you have a backup
cp -r ../project-backup/* .
npm install
npm run dev
```

### Start Over

If all else fails:

1. Save your `PROJECT_STARTER.md`
2. Save any custom code
3. Delete project folder
4. Follow [Getting Started](getting-started.md) again
5. Copy back your custom code

---

## Quick Reference

### Diagnostic Commands

```bash
# Check versions
node --version
npm --version
git --version

# Check project status
git status
npm run build
npx prisma validate

# Check logs
tail -f .claude/logs/agent.log

# Check processes
lsof -i :3000
ps aux | grep node

# Check disk space
df -h

# Check memory
free -h
```

### Common Fixes

```bash
# Clear everything and start fresh
rm -rf node_modules package-lock.json .nuxt
npm install
npm run dev

# Reset database
npx prisma migrate reset
npx prisma db seed

# Force redeploy
git commit --allow-empty -m "Force redeploy"
git push
```

---

**Still stuck?**
[Open an issue](https://github.com/dylanburkey/claude-code-sidekick/issues)
with:

- Your error message
- Your configuration
- Steps to reproduce
- What you've tried

We're here to help! 🚀
