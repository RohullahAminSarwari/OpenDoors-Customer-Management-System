# Mass commit generator - creates thousands of individual commits
# This will create commits for every tiny change possible

Write-Host "Starting mass commit generation for 10,000+ commits..."

$commitCount = 0
$targetCommits = 10000

# Function to create multiple commits for a single line
function Create-LineCommits {
    param($content, $filePath)
    
    # Split content into words and create commits for each word addition
    $words = $content -split '\s+'
    $currentLine = ""
    
    foreach ($word in $words) {
        $currentLine += $word + " "
        $currentLine.Trim() | Out-File -FilePath $filePath -Encoding utf8
        git add $filePath
        git commit -m "Added new file"
        $script:commitCount++
        
        if ($script:commitCount -ge $targetCommits) { return $true }
        
        if ($script:commitCount % 100 -eq 0) {
            Write-Host "Created $($script:commitCount) commits..."
        }
    }
    return $false
}

# Create a sample file and break it down into thousands of commits
$sampleFile = "sample_commits.txt"

# Generate content that can be broken into many commits
$content = @()
for ($i = 1; $i -le 1000; $i++) {
    $content += "This is line ${i} with some sample content for commit ${i}."
    $content += "Adding more text content to create multiple commits per line."
    $content += "Each word will be a separate commit to reach 10000 commits."
    $content += "Line ${i}: Customer management system development progress."
    $content += "Frontend development: React components and styling."
    $content += "Backend development: Laravel API and database setup."
    $content += "Authentication system implementation for line ${i}."
    $content += "Database migrations and seeders setup ${i}."
    $content += "API endpoints configuration number ${i}."
    $content += "User interface improvements iteration ${i}."
}

Write-Host "Generated $($content.Count) lines of content to process..."

# Create empty file first
"" | Out-File -FilePath $sampleFile -Encoding utf8
git add $sampleFile
git commit -m "Added new file"
$commitCount++

# Process each line and create multiple commits per line
foreach ($line in $content) {
    if ($commitCount -ge $targetCommits) { break }
    
    # Break each line into word-by-word commits
    $words = $line -split '\s+'
    $currentContent = Get-Content $sampleFile -ErrorAction SilentlyContinue
    if (-not $currentContent) { $currentContent = @() }
    
    $currentLine = ""
    foreach ($word in $words) {
        if ($commitCount -ge $targetCommits) { break }
        
        $currentLine += $word + " "
        
        # Update file with new content
        $newContent = $currentContent + $currentLine.Trim()
        $newContent | Out-File -FilePath $sampleFile -Encoding utf8
        
        git add $sampleFile
        git commit -m "Added new file"
        $commitCount++
        
        if ($commitCount % 100 -eq 0) {
            Write-Host "Created $commitCount commits..."
        }
    }
    
    # Finalize the line
    $currentContent += $currentLine.Trim()
}

# Create additional commits by modifying the file in small ways
while ($commitCount -lt $targetCommits) {
    # Add timestamp commits
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Add-Content -Path $sampleFile -Value "Timestamp: $timestamp"
    git add $sampleFile
    git commit -m "Added new file"
    $commitCount++
    
    # Add numbered entries
    Add-Content -Path $sampleFile -Value "Entry number: $commitCount"
    git add $sampleFile
    git commit -m "Added new file"
    $commitCount++
    
    # Add system info
    Add-Content -Path $sampleFile -Value "Commit progress: $commitCount/$targetCommits"
    git add $sampleFile
    git commit -m "Added new file"
    $commitCount++
    
    if ($commitCount % 100 -eq 0) {
        Write-Host "Progress: $commitCount/$targetCommits commits created..."
    }
    
    # Small delay to prevent overwhelming the system
    if ($commitCount % 50 -eq 0) {
        Start-Sleep -Milliseconds 10
    }
}

Write-Host "Mass commit generation completed!"
Write-Host "Target commits: $targetCommits"
Write-Host "Actually created: $commitCount"
Write-Host "Total commits in repository: $(git log --oneline | Measure-Object | Select-Object -ExpandProperty Count)"

# Clean up
Remove-Item $sampleFile -Force -ErrorAction SilentlyContinue