param(
  [switch]$IncludeSanityStudio = $true
)

$ErrorActionPreference = "Stop"

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$websiteSource = "C:\Users\Timo Scharf\Documents\New project"
$studioSource = "C:\Users\Timo Scharf\Documents\studio-webseite-redaktion"
$zCompanyFolder = "_Gr" + [char]0x00FC + "newald Gruppe"
$zBasePath = Join-Path -Path (Join-Path -Path "Z:\01" -ChildPath $zCompanyFolder) -ChildPath "06\_Website"
$websiteTarget = Join-Path -Path $zBasePath -ChildPath "New project - laufender Spiegel"
$studioTarget = Join-Path -Path $zBasePath -ChildPath "studio-webseite-redaktion - laufender Spiegel"
$logDir = Join-Path -Path $zBasePath -ChildPath "sync-logs"
$logFile = Join-Path $logDir ("sync-" + (Get-Date -Format "yyyy-MM") + ".log")

$excludedDirs = @(
  "node_modules",
  ".next",
  ".git",
  "dist",
  ".sanity"
)

function Invoke-SafeRobocopy {
  param(
    [Parameter(Mandatory = $true)][string]$Source,
    [Parameter(Mandatory = $true)][string]$Target,
    [Parameter(Mandatory = $true)][string]$Name
  )

  if (-not (Test-Path -LiteralPath $Source)) {
    Add-Content -LiteralPath $logFile -Value "[$timestamp] SKIP $Name - Quelle nicht gefunden: $Source"
    return
  }

  New-Item -ItemType Directory -Force -Path $Target | Out-Null

  Add-Content -LiteralPath $logFile -Value "[$timestamp] START $Name"

  & robocopy $Source $Target /E /XD $excludedDirs /R:1 /W:1 /NP /FFT /LOG+:$logFile
  $code = $LASTEXITCODE

  if ($code -le 7) {
    Add-Content -LiteralPath $logFile -Value "[$timestamp] OK $Name - Robocopy-Code $code"
  } else {
    Add-Content -LiteralPath $logFile -Value "[$timestamp] FEHLER $Name - Robocopy-Code $code"
    exit $code
  }
}

New-Item -ItemType Directory -Force -Path $logDir | Out-Null

Invoke-SafeRobocopy -Source $websiteSource -Target $websiteTarget -Name "Website"

if ($IncludeSanityStudio) {
  Invoke-SafeRobocopy -Source $studioSource -Target $studioTarget -Name "Sanity Studio"
}

Add-Content -LiteralPath $logFile -Value "[$timestamp] FERTIG"
