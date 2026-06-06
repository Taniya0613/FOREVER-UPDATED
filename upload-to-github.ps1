# PowerShell script to upload project to GitHub
# Make sure Git is installed and accessible in your PATH

Write-Host "Checking Git installation..." -ForegroundColor Cyan

# Try to find git
$gitCmd = $null
$possiblePaths = @(
    "git",
    "C:\Program Files\Git\cmd\git.exe",
    "C:\Program Files (x86)\Git\cmd\git.exe",
    "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe"
)

foreach ($path in $possiblePaths) {
    try {
        $result = & $path --version 2>&1
        if ($LASTEXITCODE -eq 0) {
            $gitCmd = $path
            Write-Host "Found Git at: $path" -ForegroundColor Green
            break
        }
    } catch {
        continue
    }
}

if (-not $gitCmd) {
    Write-Host "ERROR: Git is not installed or not in PATH." -ForegroundColor Red
    Write-Host "Please install Git from https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "Or add Git to your system PATH." -ForegroundColor Yellow
    exit 1
}

Write-Host "`nStep 1: Checking git status..." -ForegroundColor Cyan
& $gitCmd status

Write-Host "`nStep 2: Adding all files..." -ForegroundColor Cyan
& $gitCmd add .

Write-Host "`nStep 3: Committing changes..." -ForegroundColor Cyan
$commitMessage = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Initial commit: MERN E-Commerce project"
}
& $gitCmd commit -m $commitMessage

Write-Host "`nStep 4: Checking remote..." -ForegroundColor Cyan
& $gitCmd remote -v

Write-Host "`nStep 5: Pushing to GitHub..." -ForegroundColor Cyan
$branch = & $gitCmd branch --show-current
if ([string]::IsNullOrWhiteSpace($branch)) {
    $branch = "main"
    & $gitCmd branch -M main
}

Write-Host "Pushing to origin/$branch..." -ForegroundColor Yellow
& $gitCmd push -u origin $branch

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSUCCESS! Project uploaded to GitHub!" -ForegroundColor Green
    Write-Host "Repository: https://github.com/Taniya0613/E-commerce.git" -ForegroundColor Cyan
} else {
    Write-Host "`nERROR: Push failed. You may need to:" -ForegroundColor Red
    Write-Host "1. Set up authentication (GitHub token or SSH key)" -ForegroundColor Yellow
    Write-Host "2. Check if the repository exists on GitHub" -ForegroundColor Yellow
    Write-Host "3. Ensure you have write access to the repository" -ForegroundColor Yellow
}

