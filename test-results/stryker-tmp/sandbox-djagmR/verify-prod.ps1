$ErrorActionPreference = 'SilentlyContinue'
$prod = 'https://clm-ndaflow-v2-2605191449.azurewebsites.net'
$stg  = 'https://clm-ndaflow-v2-2605191449-staging.azurewebsites.net'

Write-Host "=== PRODUCTION ==="
try { $r = Invoke-WebRequest -Uri "$prod/login" -UseBasicParsing -TimeoutSec 60; "Prod /login: HTTP $($r.StatusCode), $($r.RawContentLength) bytes" } catch { "Prod /login ERR: $($_.Exception.Message)" }
try { $r2 = Invoke-WebRequest -Uri "$prod/_next/static/LBOtgokFr0CuHH58gNJL3/_buildManifest.js" -UseBasicParsing -TimeoutSec 30; "Prod new build: HTTP $($r2.StatusCode), $($r2.RawContentLength) bytes" } catch { "Prod new build ERR: $($_.Exception.Message)" }
try { $r3 = Invoke-WebRequest -Uri "$prod/_next/static/48bCAlKQmogRSGV8B-a5e/_buildManifest.js" -UseBasicParsing -TimeoutSec 30; "Prod old build: HTTP $($r3.StatusCode)" } catch { "Prod old build (expect 404): $($_.Exception.Message)" }

Write-Host ""
Write-Host "=== STAGING ==="
try { $r = Invoke-WebRequest -Uri "$stg/login" -UseBasicParsing -TimeoutSec 60; "Staging /login: HTTP $($r.StatusCode), $($r.RawContentLength) bytes" } catch { "Staging /login ERR: $($_.Exception.Message)" }
