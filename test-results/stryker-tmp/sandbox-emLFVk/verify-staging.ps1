$ErrorActionPreference = 'SilentlyContinue'
$base = 'https://clm-ndaflow-v2-2605191449-staging.azurewebsites.net'
try { $r = Invoke-WebRequest -Uri "$base/login" -UseBasicParsing -TimeoutSec 45; "Staging /login: HTTP $($r.StatusCode), $($r.RawContentLength) bytes" } catch { "Staging /login ERR: $($_.Exception.Message)" }
try { $r2 = Invoke-WebRequest -Uri "$base/_next/static/LBOtgokFr0CuHH58gNJL3/_buildManifest.js" -UseBasicParsing -TimeoutSec 30; "BuildManifest (new): HTTP $($r2.StatusCode), $($r2.RawContentLength) bytes" } catch { "BuildManifest (new) ERR: $($_.Exception.Message)" }
try { $r3 = Invoke-WebRequest -Uri "$base/_next/static/48bCAlKQmogRSGV8B-a5e/_buildManifest.js" -UseBasicParsing -TimeoutSec 30; "BuildManifest (old): HTTP $($r3.StatusCode)" } catch { "BuildManifest (old) ERR: $($_.Exception.Message)" }
