# Comprobar si existe la carpeta dist y limpiar conservando archivos de Linux
if (Test-Path "dist") {
    Write-Host "Limpiando carpeta dist (conservando Linux)..." -ForegroundColor Yellow
    Get-ChildItem "dist" | Where-Object {
        $_.Name -ne "latest-linux.yml" -and
        $_.Extension -ne ".deb" -and
        $_.Extension -ne ".AppImage"
    } | Remove-Item -Recurse -Force
    Write-Host "Limpieza completada." -ForegroundColor Green
}
else {
    Write-Host "No existe carpeta dist previa." -ForegroundColor Cyan
}

npm i

# Ejecutar el comando de construcción definido en package.json
Write-Host "Iniciando construcción Windows (npm run dist:win)..." -ForegroundColor Yellow
npm run dist:win

# Renombrar archivos .exe y .blockmap reemplazando espacios por guiones
Get-ChildItem "dist" | Where-Object { ($_.Extension -eq ".exe" -or $_.Extension -eq ".blockmap") -and $_.Name -match " " } | ForEach-Object {
    $newName = $_.Name -replace " ", "-"
    Rename-Item -Path $_.FullName -NewName $newName
    Write-Host "Renombrado: $($_.Name) -> $newName" -ForegroundColor Cyan
}