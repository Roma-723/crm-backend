# CRM Backend - Deployment Guide

## Issue Fixed: `sh: 1: nest: Permission denied`

### Root Cause
The error was caused by **Node.js version incompatibility**. Render was using Node.js 24.14.1, but NestJS 10.x is designed for Node.js 18-20 LTS versions. This caused binary incompatibility when executing the `nest` CLI.

### Solution Applied

#### 1. **Node.js Version Constraint**
Added to `package.json`:
```json
"engines": {
  "node": "20.x",
  "npm": "10.x"
}
```
This tells Render and npm to use Node.js 20.x LTS (the recommended version for NestJS 10.x).

#### 2. **Local Development Consistency**
Created `.nvmrc` file:
```
20
```
This ensures developers using nvm/fnm automatically switch to Node 20 when entering the project directory.

#### 3. **Improved Build Script**
Updated `postinstall` in package.json:
```json
"postinstall": "npm run prisma:generate && chmod +x node_modules/.bin/* 2>/dev/null || true"
```
This ensures:
- Prisma bindings are generated (required for database access)
- Binary permissions are set correctly on Linux environments
- Fails gracefully on Windows (where permissions work differently)

#### 4. **Render Configuration**
Created `render.yaml` for explicit deployment settings:
```yaml
services:
  - type: web
    name: crm-backend
    env: node
    plan: free
    buildCommand: npm ci && npm run prisma:generate && npm run build
    startCommand: npm run start:prod
    envVars:
      - key: NODE_VERSION
        value: 20.11.0
      - key: NODE_ENV
        value: production
    healthCheckPath: /api/docs
```

### Files Modified/Created

| File | Action | Purpose |
|------|--------|---------|
| `package.json` | Modified | Added engines field + improved postinstall script |
| `.nvmrc` | Created | Pins Node.js 20 for local development |
| `render.yaml` | Created | Explicit Render deployment configuration |

### Deployment Instructions

#### For Render.com

**Option 1: Automatic (Recommended)**
1. Push changes to GitHub
2. Render will automatically detect `.nvmrc` and `render.yaml`
3. Build will use Node.js 20.x with the specified build command
4. ✅ No manual configuration needed

**Option 2: Manual Configuration**
If you don't use `render.yaml`, manually set on Render dashboard:

**Environment:**
```
NODE_VERSION = 20.11.0
NODE_ENV = production
```

**Build Command:**
```bash
npm ci && npm run prisma:generate && npm run build
```

**Start Command:**
```bash
npm run start:prod
```

#### For Local Development

**With nvm (Recommended):**
```bash
nvm install 20
nvm use  # Will automatically read .nvmrc
npm ci
npm run start:dev
```

**Without nvm:**
```bash
# Ensure Node.js 20.x is installed
node --version  # Should be v20.x.x
npm ci
npm run start:dev
```

### Verification Checklist

After deployment, verify:

- [ ] Render shows Node.js 20.x in build logs
- [ ] Build succeeds without permission errors
- [ ] Application starts without errors
- [ ] Health check endpoint responds: `GET /api/docs`
- [ ] Database connection works
- [ ] API endpoints are accessible

### Docker Deployment (Alternative)

If using Docker, add to `Dockerfile`:
```dockerfile
FROM node:20-alpine
# ... rest of Dockerfile
```

### Troubleshooting

**If still getting permission denied:**
```bash
# Local test
npm ci
npm run build

# Check binary permissions
ls -la node_modules/.bin/nest

# Manually fix (if needed)
chmod +x node_modules/.bin/*
```

**If Node.js version mismatch on Render:**
1. Go to Render Dashboard → Services → crm-backend
2. Settings → Environment
3. Set `NODE_VERSION` to `20.11.0`
4. Redeploy

**If Prisma errors occur:**
```bash
# Regenerate Prisma client
npm run prisma:generate

# Generate and migrate
npm run prisma:generate && npm run prisma:push
```

### Version Compatibility

| Package | Version | Node.js 20 | Node.js 24 |
|---------|---------|-----------|-----------|
| NestJS | 10.3.0 | ✅ Yes | ⚠️ Maybe |
| TypeScript | 5.3.3 | ✅ Yes | ✅ Yes |
| Prisma | 5.10.0 | ✅ Yes | ✅ Yes |

### Why Node.js 20 Over 24?

- **NestJS 10.x** was released before Node.js 24 and tested with 18-20
- **Node.js 20 is LTS** (Long Term Support) - stable for production
- **Node.js 24 is current** - newer but less battle-tested
- **Enterprise support** - Node 20 has guaranteed support until April 2026

### Prevention for Future

For new projects:
1. Always use `.nvmrc` to pin Node.js version
2. Add `engines` field to `package.json`
3. Include `render.yaml` or equivalent for explicit build config
4. Test locally before deploying to match production environment
5. Monitor Node.js LTS release cycle and plan upgrades

### Support

If issues persist after applying these fixes:
1. Check Render build logs for exact error
2. Verify `.nvmrc` file exists and contains `20`
3. Confirm `package.json` has `engines` field
4. Test build locally: `npm ci && npm run build`
5. Check Prisma schema is valid: `npx prisma validate`
