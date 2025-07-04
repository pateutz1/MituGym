<#
  convert-icons.ps1  –  PNG ➜ SVG  (trace filled shapes)
  • Source dir : C:\Personal\MituGym\public\images\icons
  • Input      : All *.png files in the icons directory
  • Output     : Corresponding *.svg files
  • Requires   : Potrace 1.16+
#>

Add-Type -AssemblyName System.Drawing

# ─── CONFIG ────────────────────────────────────────────────────────────────────
$IconDir     = 'C:\Personal\MituGym\public\images\icons'
$PotraceExe  = 'C:\Tools\Potrace\potrace.exe'     # ← point to your Potrace installation
# ───────────────────────────────────────────────────────────────────────────────

#–––––––– CHECKS ––––––––
if (-not (Test-Path $IconDir))   { throw "Icon folder not found: $IconDir" }
if (-not (Test-Path $PotraceExe)){ throw "Potrace not found: $PotraceExe" }

Set-Location $IconDir

function Convert-PngToPbm {
    param([string]$PngPath, [string]$PbmPath)
    
    try {
        # Load the PNG image
        $bitmap = [System.Drawing.Bitmap]::FromFile($PngPath)
        
        # Create PBM content
        $width = $bitmap.Width
        $height = $bitmap.Height
        $pbmContent = "P1`n$width $height`n"
        
        # Process each pixel
        for ($y = 0; $y -lt $height; $y++) {
            $line = ""
            for ($x = 0; $x -lt $width; $x++) {
                $pixel = $bitmap.GetPixel($x, $y)
                # Check if pixel is transparent or very light
                if ($pixel.A -lt 128 -or ($pixel.R + $pixel.G + $pixel.B) / 3 -gt 200) {
                    $line += "0 "  # White/transparent = 0 in PBM
                } else {
                    $line += "1 "  # Dark/opaque = 1 in PBM
                }
            }
            $pbmContent += $line.TrimEnd() + "`n"
        }
        
        # Save PBM file
        [System.IO.File]::WriteAllText($PbmPath, $pbmContent)
        $bitmap.Dispose()
        return $true
    } catch {
        Write-Warning "Failed to convert $PngPath to PBM: $_"
        if ($bitmap) { $bitmap.Dispose() }
        return $false
    }
}

# Find all PNG files in the directory
$pngFiles = Get-ChildItem -Path $IconDir -Filter "*.png" -File

if ($pngFiles.Count -eq 0) {
    Write-Warning "No PNG files found in $IconDir"
    exit 1
}

Write-Host "Found $($pngFiles.Count) PNG file(s) to convert..." -Foreground Cyan

foreach ($pngFile in $pngFiles) {
    $base = [System.IO.Path]::GetFileNameWithoutExtension($pngFile.Name)
    $png = $pngFile.Name
    $pbm = "$base-mask.pbm"
    $svg = "$base.svg"

    Write-Host "→  $png   →   $svg" -Foreground Cyan

    # Create PBM mask using .NET
    Write-Host "   Creating PBM mask..." -Foreground Yellow
    $pbmCreated = Convert-PngToPbm $pngFile.FullName (Join-Path $PWD $pbm)
    
    if (-not $pbmCreated) {
        Write-Warning "   Cannot create PBM mask. Skipping $png"
        continue
    }

    # Potrace to SVG (for filled shapes, not centerline)
    try {
        & $PotraceExe $pbm --svg --output $svg --turdsize 2 --alphamax 1.0
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
