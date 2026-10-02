@echo off
cd /d "%~dp0"
set PORT=3000
npm run dev > dev.log 2>&1