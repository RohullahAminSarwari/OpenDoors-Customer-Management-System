# Final push to 10,000 commits on amin branch
Write-Host "Final push to 10,000 commits on amin branch..."

$currentCount = (git log --oneline | Measure-Object).Count
$targetCommits = 10000
$batchSize = 100

Write-Host "Current commits: $currentCount"
Write-Host "Target commits: $targetCommits"
Write-Host "Remaining: $($targetCommits - $currentCount)"

$commitFile = "final_commits.txt"

while ($currentCount -lt $targetCommits) {
    # Create batch of commits
    for ($i = 1; $i -le $batchSize -and $currentCount -lt $targetCommits; $i++) {
        $commitNumber = $currentCount + 1
        "Final commit batch - Commit number: $commitNumber" | Out-File -FilePath $commitFile -Encoding utf8
        
        # Add and commit with error handling
        try {
            git add $commitFile 2>$null
            git commit -m "Added new file" 2>$null
            $currentCount++
        }
        catch {
            Write-Host "Error on commit $commitNumber, continuing..."
            Start-Sleep -Milliseconds 100
        }
    }
    
    # Progress update
    Write-Host "Progress: $currentCount/$targetCommits commits created"
    
    # Small pause to prevent overwhelming
    Start-Sleep -Milliseconds 50
}

Write-Host "Reached target of $targetCommits commits!"
Write-Host "Final commit count: $(git log --oneline | Measure-Object | Select-Object -ExpandProperty Count)"

# Clean up
Remove-Item $commitFile -Force -ErrorAction SilentlyContinue