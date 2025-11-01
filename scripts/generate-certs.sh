#!/bin/bash

# Cross-platform SSL certificate generation for local development
# Supports mkcert (preferred) and openssl (fallback)

set -e

CERT_DIR="frontend/certs"
KEY_FILE="$CERT_DIR/localhost-key.pem"
CERT_FILE="$CERT_DIR/localhost.pem"

echo "🔐 Generating SSL certificates for local development..."

# Clean up existing certificates
if [ -d "$CERT_DIR" ]; then
    echo "🧹 Cleaning up existing certificates..."
    rm -rf "$CERT_DIR"
fi

# Create certs directory
mkdir -p "$CERT_DIR"

# Try mkcert first (preferred method)
if command -v mkcert &> /dev/null; then
    echo "📋 Using mkcert (preferred method)..."
    mkcert -install 2>/dev/null || echo "⚠️  CA installation skipped (may require admin rights)"
    mkcert -key-file "$KEY_FILE" -cert-file "$CERT_FILE" localhost 127.0.0.1 ::1
    echo "✅ SSL certificates generated with mkcert!"
else
    echo "📋 mkcert not found, using openssl fallback..."
    
    # Generate private key
    openssl genrsa -out "$KEY_FILE" 2048
    
    # Create certificate signing request config
    cat > "$CERT_DIR/localhost.conf" << EOF
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no

[req_distinguished_name]
C = US
ST = Local
L = Local
O = AI Job Portal
OU = Development
CN = localhost

[v3_req]
keyUsage = keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
IP.1 = 127.0.0.1
IP.2 = ::1
EOF
    
    # Generate certificate
    openssl req -new -x509 -key "$KEY_FILE" -out "$CERT_FILE" -days 365 -config "$CERT_DIR/localhost.conf" -extensions v3_req
    
    # Clean up config file
    rm "$CERT_DIR/localhost.conf"
    
    echo "✅ SSL certificates generated with openssl!"
    echo "⚠️  You may need to manually trust the certificate in your browser"
fi

echo "🚀 Certificates ready at:"
echo "   Key: $KEY_FILE"
echo "   Cert: $CERT_FILE"
echo ""
echo "💡 Installation instructions:"
echo "   macOS: brew install mkcert"
echo "   Windows: choco install mkcert or scoop install mkcert"
echo "   Linux: https://github.com/FiloSottile/mkcert#installation"
echo ""
echo "🔧 If you get SSL errors, try:"
echo "   1. Clear browser cache and restart"
echo "   2. Run this script again"
echo "   3. Check firewall/antivirus settings"