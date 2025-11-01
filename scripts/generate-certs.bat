@echo off
setlocal enabledelayedexpansion

REM Cross-platform SSL certificate generation for Windows
REM Supports mkcert (preferred) and openssl (fallback)

set CERT_DIR=frontend\certs
set KEY_FILE=%CERT_DIR%\localhost-key.pem
set CERT_FILE=%CERT_DIR%\localhost.pem

echo 🔐 Generating SSL certificates for local development...

REM Clean up existing certificates
if exist "%CERT_DIR%" (
    echo 🧹 Cleaning up existing certificates...
    rmdir /s /q "%CERT_DIR%"
)

REM Create certs directory
mkdir "%CERT_DIR%"

REM Try mkcert first (preferred method)
where mkcert >nul 2>nul
if %errorlevel% == 0 (
    echo 📋 Using mkcert (preferred method)...
    mkcert -install 2>nul || echo ⚠️  CA installation skipped (may require admin rights)
    mkcert -key-file "%KEY_FILE%" -cert-file "%CERT_FILE%" localhost 127.0.0.1 ::1
    echo ✅ SSL certificates generated with mkcert!
) else (
    echo 📋 mkcert not found, checking for openssl...
    where openssl >nul 2>nul
    if !errorlevel! == 0 (
        echo 🔧 Using openssl fallback...
        
        REM Generate private key
        openssl genrsa -out "%KEY_FILE%" 2048
        
        REM Create certificate config
        (
            echo [req]
            echo distinguished_name = req_distinguished_name
            echo req_extensions = v3_req
            echo prompt = no
            echo.
            echo [req_distinguished_name]
            echo C = US
            echo ST = Local
            echo L = Local
            echo O = AI Job Portal
            echo OU = Development
            echo CN = localhost
            echo.
            echo [v3_req]
            echo keyUsage = keyEncipherment, dataEncipherment
            echo extendedKeyUsage = serverAuth
            echo subjectAltName = @alt_names
            echo.
            echo [alt_names]
            echo DNS.1 = localhost
            echo IP.1 = 127.0.0.1
            echo IP.2 = ::1
        ) > "%CERT_DIR%\localhost.conf"
        
        REM Generate certificate
        openssl req -new -x509 -key "%KEY_FILE%" -out "%CERT_FILE%" -days 365 -config "%CERT_DIR%\localhost.conf" -extensions v3_req
        
        REM Clean up config file
        del "%CERT_DIR%\localhost.conf"
        
        echo ✅ SSL certificates generated with openssl!
        echo ⚠️  You may need to manually trust the certificate in your browser
    ) else (
        echo ❌ Neither mkcert nor openssl found!
        echo Please install one of them:
        echo   mkcert: choco install mkcert or scoop install mkcert
        echo   openssl: https://slproweb.com/products/Win32OpenSSL.html
        exit /b 1
    )
)

echo 🚀 Certificates ready at:
echo    Key: %KEY_FILE%
echo    Cert: %CERT_FILE%
echo.
echo 💡 Installation instructions:
echo    Windows: choco install mkcert or scoop install mkcert
echo    Or download from: https://github.com/FiloSottile/mkcert/releases
echo.
echo 🔧 If you get SSL errors, try:
echo    1. Clear browser cache and restart
echo    2. Run this script as administrator
echo    3. Check firewall/antivirus settings

pause