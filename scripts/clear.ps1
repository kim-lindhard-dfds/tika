[CmdletBinding()]

param(    
  [Parameter(Mandatory = $False, Position = 0, ValueFromPipeline = $false)]
  [string]
  $ServiceAccountId = "",

  [Parameter(Mandatory = $False, Position = 1, ValueFromPipeline = $false)]
  [string]
  $Prefix = "",

  [Parameter(Mandatory = $False, Position = 2, ValueFromPipeline = $false)]
  [string]
  $Cluster = "",

  [Parameter(Mandatory = $False, Position = 3, ValueFromPipeline = $false)]
  [switch]
  $DisableDryRun = $false
)

function Generate-Acl {
  param(
    [string] $method = "",
    [string] $cluster = "",
    [string] $type = "",
    [string] $serviceAccountId = "",
    [string] $operation = "",
    [string] $topic = "",
    [string] $consumerGroup = ""
   )

   $command = "ccloud kafka acl $method --cluster $cluster --$type --service-account $serviceAccountId --operation $operation"
   if (0 -ne $topic.Length) {
     $command += " --topic $topic --prefix"
   } elseif (0 -ne $consumerGroup.Length) {
     $command += " --consumer-group $consumerGroup --prefix"
   } else {
     $command += " --cluster-Scope"
   }

   return $command
}

function Exec-Command {
  param(
    [string] $val = ""
  )

  $command = {
    param($command)
    Invoke-Expression $command
    #Write-Host "$command`n"
  }

  return Start-Job -Command $command -ArgumentList $val
}

$responseServiceAccounts = (Invoke-WebRequest -Uri 'http://localhost:3000/service-accounts' -Method GET).Content | ConvertFrom-Json
$responseApiKeys = (Invoke-WebRequest -Uri 'http://localhost:3000/api-keys' -Method GET).Content | ConvertFrom-Json
$responseAcls = (Invoke-WebRequest -Uri 'http://localhost:3000/access-control-lists' -Method GET).Content | ConvertFrom-Json

$serviceAccount = $responseServiceAccounts | Where-Object { $_.Id -eq $ServiceAccountId}
$apiKeys = $responseApiKeys | Where-Object { $_.Owner -eq $ServiceAccountId}
$acls = $responseAcls | Where-Object { $_.ServiceAccountId -eq $ServiceAccountId}


if ($DisableDryRun) {

  Write-Host "Service account:`n"
  foreach ($ServiceAccount in $serviceAccount) {
    Write-Host $ServiceAccount
    Invoke-Expression "ccloud service-account delete $($ServiceAccount.Id)"
  }
  
  Write-Host "`n"
  
  Write-Host "API keys:`n"
  foreach ($ApiKey in $apiKeys) {
    $jobs += Exec-Command -val "ccloud api-key delete $($ApiKey.Key)"
    Write-Host $ApiKey
    Invoke-Expression "ccloud api-key delete $($ApiKey.Key)"
  }

  Write-Host "`n"
  
  Write-Host "ACLs:`n"
  Invoke-Expression "./clear.sh $Cluster $ServiceAccountId $Prefix true"

} else {
  Write-Host "::DryRun::`n`n"


  Write-Host "Service account:`n"
  foreach ($ServiceAccount in $serviceAccount) {
    Write-Host $ServiceAccount
  }
  
  Write-Host "API keys:`n"
  foreach ($ApiKey in $apiKeys) {
    Write-Host $ApiKey
  }

  Write-Host "ACLs:`n"
  foreach ($Acl in $acls) {
    Write-Host $Acl
  }

  # Commands that will be run if this is the case

  Write-Host "`nCommands that would've been run if this wasn't a dry-run:`n"

  Write-Host "Service account:`n"
  foreach ($ServiceAccount in $serviceAccount) {
    Write-Host "ccloud service-account delete $($ServiceAccount.Id)"
  }
  
  Write-Host "`n"
  
  Write-Host "API keys:`n"
  foreach ($ApiKey in $apiKeys) {
    Write-Host "ccloud api-key delete $($ApiKey.Key)"
  }

  Write-Host "`n"

  if ($acls.Length -gt 0) {
    Write-Host "ACLs:`n"
    Write-Host "ccloud kafka acl delete --cluster $($Cluster) --allow --service-account $($ServiceAccountId) --operation WRITE --topic $($Prefix) --prefix"
    Write-Host "ccloud kafka acl delete --cluster $($Cluster) --allow --service-account $($ServiceAccountId) --operation WRITE --topic pub.$($Prefix) --prefix" 
    Write-Host "ccloud kafka acl delete --cluster $($Cluster) --allow --service-account $($ServiceAccountId) --operation READ --topic $($Prefix) --prefix" 
    Write-Host "ccloud kafka acl delete --cluster $($Cluster) --allow --service-account $($ServiceAccountId) --operation READ --topic pub. --prefix" 
    Write-Host "ccloud kafka acl delete --cluster $($Cluster) --allow --service-account $($ServiceAccountId) --operation CREATE --topic $($Prefix) --prefix" 
    Write-Host "ccloud kafka acl delete --cluster $($Cluster) --allow --service-account $($ServiceAccountId) --operation DESCRIBE --topic $($Prefix) --prefix" 
    Write-Host "ccloud kafka acl delete --cluster $($Cluster) --allow --service-account $($ServiceAccountId) --operation DESCRIBE-CONFIGS --topic $($Prefix) --prefix" 
  
    Write-Host "ccloud kafka acl delete --cluster $($Cluster) --allow --service-account $($ServiceAccountId) --operation WRITE --consumer-group $($Prefix) --prefix" 
    Write-Host "ccloud kafka acl delete --cluster $($Cluster) --allow --service-account $($ServiceAccountId) --operation CREATE --consumer-group $($Prefix) --prefix" 
    Write-Host "ccloud kafka acl delete --cluster $($Cluster) --allow --service-account $($ServiceAccountId) --operation READ --consumer-group $($Prefix) --prefix" 
  
    Write-Host "ccloud kafka acl delete --cluster $($Cluster) --deny --service-account $($ServiceAccountId) --operation alter --cluster-scope" 
    Write-Host "ccloud kafka acl delete --cluster $($Cluster) --deny --service-account $($ServiceAccountId) --operation alter-configs --cluster-scope" 
    Write-Host "ccloud kafka acl delete --cluster $($Cluster) --deny --service-account $($ServiceAccountId) --operation cluster-action --cluster-scope" 
    Write-Host "ccloud kafka acl delete --cluster $($Cluster) --deny --service-account $($ServiceAccountId) --operation create --topic '' --prefix" 
  }

}