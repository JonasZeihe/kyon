@echo off
cd /d "%~dp0"
set SCRIPT_PATH=%~dp0\..\logic\scan_codebase.py
start cmd /k python "%SCRIPT_PATH%"
