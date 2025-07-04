# Alternative Trace-Icons.ps1 using .NET System.Drawing
Add-Type -AssemblyName System.Drawing

$IconDir   = 'C:\Personal\MituGym\public\images\programs'
$Potrace   = 'C:\Tools\Potrace\potrace.exe'        # ← adjust if you unzipped elsewhere
$Icons     = @('muscle','cardio','health')         # basenames (NO "-icon.png")

#–––––––– CHECKS ––––––––
if (-not (Test-Path $IconDir))   { throw "Icon folder not found: $IconDir" }
if (-not (Test-Path $Potrace))   { throw "Potrace not found: $Potrace" }

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

foreach ($name in $Icons) {
    $png = "$name-icon.png"
    $pbm = "$name-mask.pbm"
    $svg = "$name.svg"

    Write-Host "→  $png   →   $svg" -Foreground Cyan

    if (-not (Test-Path $png)) {
        Write-Warning "   SKIP – file not found."
        continue
    }

    # Create PBM mask using .NET
    Write-Host "   Creating PBM mask..." -Foreground Yellow
    $pbmCreated = Convert-PngToPbm (Resolve-Path $png).Path (Join-Path $PWD $pbm)
    
    if (-not $pbmCreated) {
        Write-Warning "   Cannot create PBM mask. Skipping $png"
        continue
    }

    # Potrace to SVG
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