# ==============================================================================
# NELO STUDIO — Windows PowerShell Automated Installer Script
# Embeds NIL Cognitive AI Daemon (Port 8765) & STACC 1000Hz Engine (Port 8766)
# ==============================================================================

Write-Host ""
Write-Host "  _   _ _____ _     ___     ____ _____ _   _ ____ ___ ___ " -ForegroundColor Cyan
Write-Host " | \ | | ____| |   / _ \   / ___|_   _| | | |  _ \_ _/ _ \ " -ForegroundColor Cyan
Write-Host " |  \| |  _| | |  | | | |  \___ \ | | | | | | | | | | | | |" -ForegroundColor Cyan
Write-Host " | |\  | |___| |__| |_| |   ___) || | | |_| | |_| | | |_| |" -ForegroundColor Cyan
Write-Host " |_| \_|_____|_____\___/   |____/ |_|  \___/|____/___\___/ " -ForegroundColor Cyan
Write-Host ""
Write-Host "Autonomous Robotics & AI Engineering Suite (v1.0.2)" -ForegroundColor White
Write-Host ""

$exeUrl = "https://github.com/nelostrix/NELO-Releases/releases/download/v1.0.2/nelo-studio-1.0.2-x64.exe"
$installerPath = "$env:TEMP\nelo-studio-1.0.2-x64.exe"

Write-Host "Downloading NELO Studio Windows Installer..." -ForegroundColor Yellow
Invoke-WebRequest -Uri $exeUrl -OutFile $installerPath

Write-Host "Launching installer..." -ForegroundColor Green
Start-Process -FilePath $installerPath -Wait

Write-Host "Installation Complete! You can now launch NELO Studio from your Start Menu." -ForegroundColor Green
