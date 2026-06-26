# Rebuild app.zip with forward-slash entry names (Linux/rsync compatible)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$src = 'C:\Contract management\NDA\deploy'
$dst = 'C:\Contract management\NDA\app.zip'

if (Test-Path $dst) { Remove-Item $dst -Force }

$srcFull = (Resolve-Path $src).Path.TrimEnd('\') + '\'
$files = Get-ChildItem -Path $src -Recurse -File -Force

$zipStream = [System.IO.File]::Open($dst, [System.IO.FileMode]::Create)
$zip = New-Object System.IO.Compression.ZipArchive($zipStream, [System.IO.Compression.ZipArchiveMode]::Create)

try {
    foreach ($f in $files) {
        $rel = $f.FullName.Substring($srcFull.Length).Replace('\','/')
        $entry = $zip.CreateEntry($rel, [System.IO.Compression.CompressionLevel]::Optimal)
        $es = $entry.Open()
        try {
            $fs = [System.IO.File]::OpenRead($f.FullName)
            try { $fs.CopyTo($es) } finally { $fs.Dispose() }
        } finally { $es.Dispose() }
    }
} finally {
    $zip.Dispose()
    $zipStream.Dispose()
}

$item = Get-Item $dst
"Built: $($item.Name) Size=$([math]::Round($item.Length/1MB,2)) MB Files=$($files.Count)"

# Sanity check first 10 entries
$verifyStream = [System.IO.File]::OpenRead($dst)
$verifyZip = New-Object System.IO.Compression.ZipArchive($verifyStream, [System.IO.Compression.ZipArchiveMode]::Read)
"Sample entries:"
$verifyZip.Entries | Select-Object -First 10 | ForEach-Object { "  $($_.FullName)" }
$bad = $verifyZip.Entries | Where-Object { $_.FullName -match '\\' } | Measure-Object | Select-Object -ExpandProperty Count
"Backslash entries: $bad"
$verifyZip.Dispose(); $verifyStream.Dispose()
