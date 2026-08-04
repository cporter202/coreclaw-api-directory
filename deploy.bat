@echo off
echo ========================================
echo CoreClaw Directory - Deploy Script
echo ========================================
echo.

REM Check if wrangler is available
where wrangler >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing wrangler...
    npm install -g wrangler
)

REM Login check
echo Checking Cloudflare authentication...
call npx wrangler whoami
if %errorlevel% neq 0 (
    echo.
    echo Please login to Cloudflare:
    call npx wrangler login
)

echo.
echo Creating resources...

REM Create D1 database
echo [1/3] Creating D1 database...
call npx wrangler d1 create coreclaw-db
echo.

REM Create KV namespace
echo [2/3] Creating KV namespace...
call npx wrangler kv namespace create KV
echo.

echo.
echo ========================================
echo IMPORTANT: Copy the IDs from above
echo and update wrangler.toml before deploying
echo ========================================
echo.

REM Run migrations
echo [3/3] Running migrations...
echo Run these commands with your actual IDs:
echo.
echo   npx wrangler d1 execute coreclaw-db --file=./migrations/0001_init.sql
echo   npx wrangler d1 execute coreclaw-db --file=./migrations/0002_seed.sql
echo   npx wrangler d1 execute coreclaw-db --file=./migrations/0003_fts.sql
echo   npx wrangler d1 execute coreclaw-db --file=./migrations/0005_analytics.sql
echo.
echo Then deploy:
echo.
echo   npx wrangler deploy
echo.
echo Done!
