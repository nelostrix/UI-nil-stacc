# NELO Studio — install the latest published Windows x64 release.
$ErrorActionPreference = "Stop"
$repo = "nelostrix/NELO-Releases"
$assetPattern = '^nelo-studio-[0-9]+\.[0-9]+\.[0-9]+-x64\.exe$'
$releaseUri = "https://api.github.com/repos/$repo/releases/latest"

Write-Host "Fetching the latest NELO Studio release..." -ForegroundColor Cyan
$release = Invoke-RestMethod -Uri $releaseUri -Headers @{ Accept = "application/vnd.github+json" }
$asset = $release.assets | Where-Object { $_.name -match $assetPattern } | Select-Object -First 1
if (-not $asset) {
    throw "Release $($release.tag_name) does not contain a Windows x64 installer. Check https://github.com/$repo/releases"
}
$installerPath = Join-Path $env:TEMP $asset.name

if ($asset.digest -notmatch '^sha256:([a-fA-F0-9]{64})$') {
    throw "GitHub did not provide a SHA-256 digest for $($asset.name); refusing an unverified installer."
}
$expectedHash = $Matches[1].ToLowerInvariant()

Write-Host "Downloading NELO Studio $($release.tag_name)..." -ForegroundColor Yellow
Invoke-WebRequest -Uri $asset.browser_download_url -OutFile $installerPath -UseBasicParsing
$actualHash = (Get-FileHash -Path $installerPath -Algorithm SHA256).Hash.ToLowerInvariant()
if ($actualHash -ne $expectedHash) {
    Remove-Item -Force $installerPath
    throw "Installer checksum mismatch; the downloaded file was deleted."
}

Write-Host "SHA-256 verified. Launching the installer..." -ForegroundColor Green
Start-Process -FilePath $installerPath -Wait
Write-Host "Installation complete. Launch NELO Studio from the Start Menu." -ForegroundColor Green
