# Fast commit loop for amin branch - creates commits rapidly
# This script will create thousands of commits very quickly

Write-Host "Starting fast commit loop on amin branch..."

$commitCount = 0
$targetCommits = 10000

# Function to create rapid commits
function Create-RapidCommits {
    param($targetCount)
    
    $testFile = "rapid_commits.txt"
    
    # Create initial file
    "" | Out-File -FilePath $testFile -Encoding utf8
    git add $testFile
    git commit -m "Added new file"
    $script:commitCount++
    
    # Rapid commit creation loop
    while ($script:commitCount -lt $targetCount) {
        # Add content rapidly
        for ($i = 1; $i -le 100; $i++) {
            if ($script:commitCount -ge $targetCount) { break }
            
            # Add simple line
            "Change number: $($script:commitCount + 1)" | Add-Content -Path $testFile
            git add $testFile > $null 2>&1
            git commit -m "Added new file" > $null 2>&1
            $script:commitCount++
            
            # Progress report every 500 commits
            if ($script:commitCount % 500 -eq 0) {
                Write-Host "Created $script:commitCount commits..."
            }
        }
        
        # Add timestamp batch
        for ($j = 1; $j -le 50; $j++) {
            if ($script:commitCount -ge $targetCount) { break }
            
            $timestamp = Get-Date -Format "HH:mm:ss.fff"
            "Timestamp: $timestamp - Commit: $($script:commitCount + 1)" | Add-Content -Path $testFile
            git add $testFile > $null 2>&1
            git commit -m "Added new file" > $null 2>&1
            $script:commitCount++
            
            if ($script:commitCount % 500 -eq 0) {
                Write-Host "Created $script:commitCount commits..."
            }
        }
        
        # Add numbered entries batch
        for ($k = 1; $k -le 25; $k++) {
            if ($script:commitCount -ge $targetCount) { break }
            
            "Entry batch $k - Total commits: $($script:commitCount + 1)" | Add-Content -Path $testFile
            git add $testFile > $null 2>&1
            git commit -m "Added new file" > $null 2>&1
            $script:commitCount++
            
            if ($script:commitCount % 500 -eq 0) {
                Write-Host "Created $script:commitCount commits..."
            }
        }
    }
}

# Execute rapid commits
Write-Host "Target: $targetCommits commits"
Write-Host "Starting rapid commit creation..."

$startTime = Get-Date
Create-RapidCommits $targetCommits
$endTime = Get-Date

$duration = $endTime - $startTime
Write-Host "Fast commit loop completed!"
Write-Host "Created: $commitCount commits"
Write-Host "Time taken: $($duration.TotalMinutes.ToString('F2')) minutes"
Write-Host "Total commits in repository: $(git log --oneline | Measure-Object | Select-Object -ExpandProperty Count)"

# Clean up
Remove-Item "rapid_commits.txt" -Force -ErrorAction SilentlyContinue