#!/bin/bash

# Generate SSL certificates for local development
# Requires mkcert to be installed

echo "🔐 Generating SSL certificates for local development..."

# Check if mkcert is installed
if ! command -v mkcert &> /dev/null; then
    echo "❌ mkcert is not installed. Please install it first:"
    echo "   macOS: brew install mkcert"
    echo "   Windows: choco install mkcert"
    echo "   Linux: https://github.com/FiloSottile/mkcert#installation"
    exit 1
fi

# Create certs directory
mkdir -p frontend/certs

# Install local CA
echo "📋 Installing local CA..."
mkcert -install

# Generate certificates
echo "🔑 Generating certificates for localhost..."
mkcert -key-file frontend/certs/localhost-key.pem -cert-file frontend/certs/localhost.pem localhost 127.0.0.1 ::1

echo "✅ SSL certificates generated successfully!"
echo "🚀 You can now run the app with HTTPS at https://localhost:5173"
echo ""
echo "Note: Add frontend/certs/ to your .gitignore to avoid committing certificates"