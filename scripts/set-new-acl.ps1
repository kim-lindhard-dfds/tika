[CmdletBinding()]

param(    
  [Parameter(Mandatory = $False, Position = 0, ValueFromPipeline = $false)]
  [switch]
  $DisableDryRun = $false
)

$response = Invoke-WebRequest -Uri 'http://localhost:3000/service-accounts' -Method GET

$result = ($response.Content | ConvertFrom-Json)
$result = $result | Where-Object { $_.Description -eq "Creating with TikaService" -or $_.Description -eq "Creating with TikaService using KafkaJanitor"}

if ($DisableDryRun) {
  foreach ($ServiceAccount in $result) {
    Write-Host "Creating ACL for $($ServiceAccount.Name)"
    Invoke-Expression "ccloud kafka acl create --cluster lkc-4npj6 --allow --service-account $($ServiceAccount.Id) --operation READ --topic pub. --prefix"
  }
} else {
  Write-Host "Dry-Run`n`n`n"

  foreach ($ServiceAccount in $result) {
    Write-Host "$($ServiceAccount.Name)"
  }
  
  Write-Host "`n`n"
  
  foreach ($ServiceAccount in $result) {
    Write-Host "ccloud kafka acl create --cluster lkc-4npj6 --allow --service-account $($ServiceAccount.Id) --operation READ --topic pub. --prefix"
  }
}