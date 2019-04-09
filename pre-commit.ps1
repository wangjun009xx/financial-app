# Check if dotnet-format is installed
if (!(Get-Command "dotnet-format" -ErrorAction SilentlyContinue)) {
    Write-Host "dotnet-format not installed - installing"
    New-Item ".dotnet" -ItemType Directory -ErrorAction SilentlyContinue | Out-Null

    dotnet.exe tool install --tool-path .dotnet/ dotnet-format

    if ($LASTEXITCODE -ne 0) {
        return $LASTEXITCODE
    }
}

# Run prettier
pretty-quick --staged

if ($LASTEXITCODE -ne 0) {
    return $LASTEXITCODE
}

# Run dotnet-format
$CSharpFiles = $(git.exe status --porcelain=1 | ForEach-Object { $_.SubString(3) } | Where-Object { $_ -ilike "*.cs" }) -join ","

if ([String]::IsNullOrEmpty($CSharpFiles) -ne $true) {
    dotnet-format.exe --files $CSharpFiles

    if ($LASTEXITCODE -ne 0) {
        return $LASTEXITCODE
    }
}