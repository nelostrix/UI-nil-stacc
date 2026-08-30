#!/usr/bin/env bash
# ==============================================================================
# NELO STUDIO — Universal Linux & macOS Installer Script
# Embeds NIL Cognitive AI Daemon (Port 8765) & STACC 1000Hz Engine (Port 8766)
# ==============================================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
NC='\033[0m'

echo -e "${CYAN}${BOLD}"
echo "  _   _ _____ _     ___     ____ _____ _   _ ____ ___ ___ "
echo " | \ | | ____| |   / _ \   / ___|_   _| | | |  _ \_ _/ _ \ "
echo " |  \| |  _| | |  | | | |  \___ \ | | | | | | | | | | | | |"
echo " | |\  | |___| |__| |_| |   ___) || | | |_| | |_| | | |_| |"
echo " |_| \_|_____|_____\___/   |____/ |_|  \___/|____/___\___/ "
echo -e "${NC}"
echo -e "${BOLD}Autonomous Robotics & AI Engineering Suite (v1.0.0)${NC}\n"

OS="$(uname -s)"
ARCH="$(uname -m)"

echo -e "Detecting Environment: ${GREEN}${OS} (${ARCH})${NC}..."

if [ "$OS" = "Linux" ]; then
    if command -v yay >/dev/null 2>&1; then
        echo -e "${GREEN}✓ Arch Linux environment detected with yay.${NC}"
        echo -e "Installing ${BOLD}nelo-studio-bin${NC} from AUR..."
        yay -S --needed --noconfirm nelo-studio-bin || true
    elif command -v pacman >/dev/null 2>&1; then
        echo -e "${GREEN}✓ Arch Linux environment detected.${NC}"
        echo -e "Run: ${BOLD}yay -S nelo-studio-bin${NC} or install the AppImage."
    elif command -v apt-get >/dev/null 2>&1; then
        echo -e "${GREEN}✓ Debian / Ubuntu environment detected.${NC}"
        TEMP_DEB="$(mktemp /tmp/nelo-studio.XXXXXX.deb)"
        echo -e "Downloading latest .deb package..."
        curl -fsSL "https://github.com/nelostrix/NIL/releases/download/v1.0.0/nelo-studio_1.0.0_amd64.deb" -o "$TEMP_DEB"
        echo -e "Installing package (sudo required)..."
        sudo apt install -y "$TEMP_DEB"
        rm -f "$TEMP_DEB"
    else
        echo -e "${GREEN}✓ Generic Linux detected. Installing standalone Universal AppImage...${NC}"
        mkdir -p "$HOME/.local/bin"
        mkdir -p "$HOME/.local/share/applications"
        APPIMAGE_PATH="$HOME/.local/bin/nelo-studio"
        curl -fsSL "https://github.com/nelostrix/NIL/releases/download/v1.0.0/NELO-Studio-1.0.0.AppImage" -o "$APPIMAGE_PATH"
        chmod +x "$APPIMAGE_PATH"
        
        # Create Desktop Entry
        cat <<EOF > "$HOME/.local/share/applications/nelo-studio.desktop"
[Desktop Entry]
Name=NELO Studio
Comment=NIL Cognitive AI & STACC 1000Hz Robotics Physics Suite
Exec=$APPIMAGE_PATH
Icon=nelo-studio
Terminal=false
Type=Application
Categories=Development;Engineering;Science;Robotics;
EOF
        echo -e "${GREEN}✓ Installed AppImage to ${APPIMAGE_PATH}${NC}"
    fi

elif [ "$OS" = "Darwin" ]; then
    if command -v brew >/dev/null 2>&1; then
        echo -e "${GREEN}✓ macOS environment with Homebrew detected.${NC}"
        brew install --cask nelo-studio || true
    else
        echo -e "${GREEN}✓ macOS environment detected.${NC}"
        DMG_TMP="$(mktemp /tmp/nelo-studio.XXXXXX.dmg)"
        echo -e "Downloading Universal macOS DMG..."
        curl -fsSL "https://github.com/nelostrix/NIL/releases/download/v1.0.0/NELO-Studio-1.0.0-universal.dmg" -o "$DMG_TMP"
        hdiutil attach "$DMG_TMP" -mountpoint /Volumes/NELOStudio
        cp -R "/Volumes/NELOStudio/NELO Studio.app" /Applications/
        hdiutil detach /Volumes/NELOStudio
        rm -f "$DMG_TMP"
        echo -e "${GREEN}✓ Installed to /Applications/NELO Studio.app${NC}"
    fi
fi

echo -e "\n${GREEN}${BOLD}✓ Installation Complete!${NC}"
echo -e "Launch with: ${BOLD}nelo-studio${NC} from your application launcher or terminal.\n"
