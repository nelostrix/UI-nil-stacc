# ==============================================================================
# NELO CLI — Windows PowerShell Headless Installer Script
# ==============================================================================

Write-Host ""
Write-Host "  _   _ _____ _     ___     ____ _     ___ " -ForegroundColor Cyan
Write-Host " | \ | | ____| |   / _ \   / ___| |   |_ _|" -ForegroundColor Cyan
Write-Host " |  \| |  _| | |  | | | | | |   | |    | | " -ForegroundColor Cyan
Write-Host " | |\  | |___| |__| |_| | | |___| |___ | | " -ForegroundColor Cyan
Write-Host " |_| \_|_____|_____\___/   \____|_____|___|" -ForegroundColor Cyan
Write-Host ""
Write-Host "Headless Robotics Intelligence & 1000Hz Simulation CLI (v1.0.0)" -ForegroundColor White
Write-Host ""

Write-Host "Installing nelo-cli via pip..." -ForegroundColor Yellow
pip install --upgrade nelo-cli

Write-Host "Installation Complete! Try running: nelo --help" -ForegroundColor Green
