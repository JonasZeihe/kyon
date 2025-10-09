:: scripts/windows/convert_images.bat
@echo off
setlocal EnableExtensions
cd /d "%~dp0"
echo.
echo ================================
echo   Image Optimizer · WebP tool
echo ================================
echo.
python "%~dp0\..\logic\convert_images.py" %*
echo.
pause
endlocal
