# Trace-Icons.ps1  – vectorise PNG icons to SVG with Potrace
$IconDir   = 'C:\Personal\MituGym\public\images\programs'
$Potrace   = 'C:\Tools\Potrace\potrace.exe'        # ← adjust if you unzipped elsewhere
$Icons     = @('muscle','cardio','health')         # basenames (NO "-icon.png")

#–––––––– CHECKS ––––––––
if (-not (Test-Path $IconDir))   { throw "Icon folder not found: $IconDir" }
if (-not (Test-Path $Potrace))   { throw "Potrace not found: $Potrace" }

# Check if we have ImageMagick, if not we'll try alternative methods
$MagickAvailable = $false
try {
    $null = Get-Command "magick" -ErrorAction Stop
    $MagickAvailable = $true
    $Magick = "magick"
} catch {
    Write-Warning "ImageMagick not found in PATH. Will try alternative methods."
}

Set-Location $IconDir

foreach ($name in $Icons) {
    $png = "$name-icon.png"
    $pbm = "$name-mask.pbm"
    $svg = "$name.svg"

    Write-Host "→  $png   →   $svg" -Foreground Cyan

    if (-not (Test-Path $png)) {
        Write-Warning "   SKIP – file not found."
        continue
    }

    # Try to create PBM mask
    $pbmCreated = $false
    
    if ($MagickAvailable) {
        # Method 1: Use ImageMagick
        try {
            & $Magick $png -alpha extract -threshold 50% $pbm
            if ($LASTEXITCODE -eq 0) { $pbmCreated = $true }
        } catch {
            Write-Warning "ImageMagick conversion failed, trying alternative..."
        }
    }
    
    if (-not $pbmCreated) {
        # Method 2: Try to use the PNG directly with Potrace (if it supports PNG)
        # or skip PBM creation if it already exists
        if (Test-Path $pbm) {
            Write-Host "   Using existing PBM file: $pbm" -Foreground Yellow
            $pbmCreated = $true
        } else {
            Write-Warning "   Cannot create PBM mask. Skipping $png"
            continue
        }
    }

    # 2) Potrace to SVG (without centerline option)
    try {
        & $Potrace $pbm --svg --output $svg --turdsize 2 --alphamax 1.0
        if ($LASTEXITCODE -ne 0) { 
            throw "Potrace failed with exit code $LASTEXITCODE" 
        }
        Write-Host "   ✓ Created $svg" -Foreground Green
    } catch {
        Write-Error "   ✗ Potrace failed on $pbm $_"
        continue
    }

    # Clean up PBM file
    if (Test-Path $pbm) {
        Remove-Item $pbm -ErrorAction SilentlyContinue
    }
}

Write-Host "`n✔  Finished – SVGs saved in $IconDir" -Foreground Green
