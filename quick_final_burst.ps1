# Quick final burst to 10,000 commits
$currentCount = (git log --oneline | Measure-Object).Count
$targetCommits = 10000
$remaining = $targetCommits - $currentCount

Write-Host "Quick burst: $remaining commits remaining to reach $targetCommits"

$quickFile = "quick_final.txt"

for ($i = 1; $i -le $remaining; $i++) {
    "Quick commit $i" | Out-File -FilePath $quickFile -Encoding utf8
    git add $quickFile | Out-Null
    git commit -m "Added new file" | Out-Null
    
    if ($i % 100 -eq 0) {
        Write-Host "Added $i more commits..."
    }
}

$finalCount = (git log --oneline | Measure-Object).Count
Write-Host "🎉 REACHED TARGET! Total commits: $finalCount"

Remove-Item $quickFile -Force -ErrorAction SilentlyContinue