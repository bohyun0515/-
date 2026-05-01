Write-Host "Downloading Node.js installer..."
Invoke-WebRequest -Uri "https://nodejs.org/dist/v20.12.2/node-v20.12.2-x64.msi" -OutFile "node-installer.msi"
Write-Host "Installing Node.js... (A UAC prompt might appear)"
Start-Process "msiexec.exe" -ArgumentList "/i node-installer.msi /qn" -Wait
Write-Host "Node.js installation completed."

Write-Host "Downloading Git installer..."
Invoke-WebRequest -Uri "https://github.com/git-for-windows/git/releases/download/v2.44.0.windows.1/Git-2.44.0-64-bit.exe" -OutFile "git-installer.exe"
Write-Host "Installing Git... (A UAC prompt might appear)"
Start-Process "git-installer.exe" -ArgumentList "/VERYSILENT /NORESTART" -Wait
Write-Host "Git installation completed."

Write-Host "Cleaning up installers..."
Remove-Item "node-installer.msi"
Remove-Item "git-installer.exe"
Write-Host "All installations are finished!"
