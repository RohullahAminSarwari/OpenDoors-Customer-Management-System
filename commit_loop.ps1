# PowerShell script to commit each file individually
# Get all untracked files
$files = git ls-files --others --exclude-standard

# Filter out unwanted directories
$files = $files | Where-Object { 
    $_ -notlike "backend/temp-laravel/*" -and
    $_ -notlike "backend/vendor/*" -and 
    $_ -notlike "frontend/node_modules/*"
}

Write-Host "Found $($files.Count) files to commit individually"

# Loop through each file and commit it
foreach ($file in $files) {
    Write-Host "Committing: $file"
    git add $file
    git commit -m "Added new file"
    Start-Sleep -Milliseconds 100  # Small delay to avoid overwhelming git
}

Write-Host "All files committed individually!"