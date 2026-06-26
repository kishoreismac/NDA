param([string]$Action = "status")

$ErrorActionPreference = "Stop"
$Name = "clm-ndaflow-v2-2605191449"
$Rg   = "rg-clm-ndaflow"
$Slot = "staging"
$Scm  = "https://$Name-$Slot.scm.azurewebsites.net"

$cred = az webapp deployment list-publishing-credentials --name $Name --slot $Slot --resource-group $Rg -o json | ConvertFrom-Json
$pair = $cred.publishingUserName + ":" + $cred.publishingPassword
$b64  = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($pair))
$hdr  = @{ Authorization = "Basic $b64" }

switch ($Action) {
    "status" {
        try {
            $r = Invoke-RestMethod -Uri "$Scm/api/deployments/latest" -Headers $hdr -TimeoutSec 60
            "STATUS=$($r.status) Active=$($r.active) Id=$($r.id) Start=$($r.start_time) End=$($r.end_time) Msg=$($r.status_text)"
        } catch { "ERR: $($_.Exception.Message)" }
    }
    "deploy" {
        Write-Host "Uploading app.zip ($([math]::Round((Get-Item app.zip).Length/1MB,2)) MB) to $Scm/api/publish?type=zip&clean=true&restart=true&async=true ..."
        try {
            $resp = Invoke-WebRequest -Uri "$Scm/api/publish?type=zip&clean=true&restart=true&async=true" -Method POST -InFile "C:\Contract management\NDA\app.zip" -ContentType "application/zip" -Headers $hdr -TimeoutSec 900 -UseBasicParsing
            "HTTP=$($resp.StatusCode) Location=$($resp.Headers.Location)"
        } catch { "ERR: $($_.Exception.Message)" }
    }
    "log" {
        try {
            $latest = Invoke-RestMethod -Uri "$Scm/api/deployments/latest" -Headers $hdr -TimeoutSec 60
            $logs = Invoke-RestMethod -Uri "$Scm/api/deployments/$($latest.id)/log" -Headers $hdr -TimeoutSec 60
            foreach ($e in $logs) {
                "[$($e.log_time)] T$($e.type) $($e.message)"
                if ($e.details_url) {
                    try {
                        $sub = Invoke-RestMethod -Uri $e.details_url -Headers $hdr -TimeoutSec 60
                        foreach ($s in $sub) { "   |- [$($s.log_time)] T$($s.type) $($s.message)" }
                    } catch { "   |- (details err: $($_.Exception.Message))" }
                }
            }
        } catch { "ERR: $($_.Exception.Message)" }
    }
    "raw" {
        try {
            $r = Invoke-RestMethod -Uri "$Scm/api/deployments/latest" -Headers $hdr -TimeoutSec 60
            $r | ConvertTo-Json -Depth 6
        } catch { "ERR: $($_.Exception.Message)" }
    }
    "list" {
        try {
            $r = Invoke-RestMethod -Uri "$Scm/api/deployments" -Headers $hdr -TimeoutSec 60
            $r | Select-Object -First 5 id, status, status_text, active, start_time, end_time | Format-Table -AutoSize | Out-String
        } catch { "ERR: $($_.Exception.Message)" }
    }
}
