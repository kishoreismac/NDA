$d = 'C:\Contract management\NDA\deploy'
$all = Get-ChildItem $d -Recurse -Force -ErrorAction SilentlyContinue
$totalBytes = ($all | Measure-Object Length -Sum).Sum
"Total files: $($all.Count), Total size: $([math]::Round($totalBytes/1MB,1)) MB"

$nm = Join-Path $d 'node_modules'
if (Test-Path $nm) {
    $nmFiles = Get-ChildItem $nm -Recurse -File -Force -ErrorAction SilentlyContinue
    $nmDirs  = Get-ChildItem $nm -Recurse -Directory -Force -ErrorAction SilentlyContinue
    "node_modules: $($nmFiles.Count) files, $($nmDirs.Count) dirs, $([math]::Round((($nmFiles | Measure-Object Length -Sum).Sum)/1MB,1)) MB"
    "Top-level packages:"
    Get-ChildItem $nm -Directory | Select-Object Name | Format-Table -AutoSize | Out-String
}

$next = Join-Path $d '.next'
if (Test-Path $next) {
    $nFiles = Get-ChildItem $next -Recurse -File -Force -ErrorAction SilentlyContinue
    ".next: $($nFiles.Count) files, $([math]::Round((($nFiles | Measure-Object Length -Sum).Sum)/1MB,1)) MB"
}
