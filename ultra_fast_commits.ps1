# Ultra-fast commit generator for amin branch
Write-Host "Creating ultra-fast commits on amin branch..."

$commitCount = (git log --oneline | Measure-Object).Count
$targetCommits = 10000
$currentFile = "ultra_fast_commits.txt"

Write-Host "Starting from $commitCount commits, targeting $targetCommits commits"

# Create or clear the file
"" | Out-File -FilePath $currentFile -Encoding utf8

while ($commitCount -lt $targetCommits) {
    # Add simple content and commit
    "Commit number: $($commitCount + 1)" | Out-File -FilePath $currentFile -Append -Encoding utf8
    git add $currentFile | Out-Null
    git commit -m "Added new file" | Out-Null
    $commitCount++
    
    # Progress updates
    if ($commitCount % 1000 -eq 0) {
        Write-Host "Progress: $commitCount/$targetCommits commits created"
    }
}

Write-Host "Ultra-fast commit generation completed!"
Write-Host "Final commit count: $commitCount"

# Clean up
Remove-Item $currentFile -Force -ErrorAction SilentlyContinue