Write-Host "==========================================" -ForegroundColor Green
Write-Host "    FREE LOCAL WHATSAPP GATEWAY STARTER" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

# Set NODE_PATH to SSD directory to load dependencies cleanly
$env:NODE_PATH = "C:\Users\KALPESH DEORA\.gemini\antigravity\doppio-deps\node_modules"

# Append portable Node to PATH for any background scripts
$env:PATH += ";C:\Users\KALPESH DEORA\.gemini\antigravity\node-v20.11.1-win-x64"

# Use portable node executable
$nodeExe = "C:\Users\KALPESH DEORA\.gemini\antigravity\node-v20.11.1-win-x64\node.exe"

Write-Host "`nLaunching gateway... A QR code will display shortly in this terminal." -ForegroundColor Green
Write-Host "You can also view and scan the QR directly in the POS Settings!" -ForegroundColor Cyan
Write-Host "Leave this terminal window open." -ForegroundColor Yellow

& $nodeExe "$PSScriptRoot\whatsapp-gateway.js"
