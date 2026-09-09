@echo off
setlocal
cd /d "%~dp0"

echo ============================================
echo  rjzyweb Data Editor (local tool)
echo ============================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js not found on this PC.
  echo Please install Node.js first: https://nodejs.org
  pause
  exit /b 1
)

echo  Starting local server on http://127.0.0.1:8600 ...
echo  Your browser will open automatically.
echo  Keep this window open while editing.
echo  Close this window to stop the editor.
echo.
echo  TIP: after saving, publish with push-data.bat as usual.
echo.

start "" "http://127.0.0.1:8600"
node "editor\server.js"
echo.
echo  The editor has stopped.
pause >nul
exit /b 0
