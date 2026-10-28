#!/usr/bin/env bash
# ==============================================================================
# NELO STUDIO — Linux Installer
# Installs the latest published release from github.com/nelostrix/NELO-Releases:
# the .pacman package on Arch, the .deb on Debian/Ubuntu, otherwise the AppImage.
#   curl -fsSL https://nelorobotics.tech/install.sh | bash
# ==============================================================================

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
NC='\033[0m'

REPO="nelostrix/NELO-Releases"

die() {
    echo -e "${RED}✗ $*${NC}" >&2
    exit 1
}

echo -e "${CYAN}${BOLD}"
echo "  _   _ _____ _     ___     ____ _____ _   _ ____ ___ ___ "
echo " | \ | | ____| |   / _ \   / ___|_   _| | | |  _ \_ _/ _ \ "
echo " |  \| |  _| | |  | | | |  \___ \ | | | | | | | | | | | | |"
echo " | |\  | |___| |__| |_| |   ___) || | | |_| | |_| | | |_| |"
echo " |_| \_|_____|_____\___/   |____/ |_|  \___/|____/___\___/ "
echo -e "${NC}"

OS="$(uname -s)"
ARCH="$(uname -m)"
echo -e "Detecting environment: ${GREEN}${OS} (${ARCH})${NC}"

[ "$OS" = "Linux" ] || die "This installer is for Linux. Get the macOS and Windows builds from https://nelorobotics.tech/downloads"
[ "$ARCH" = "x86_64" ] || die "NELO Studio is built for x86_64 only (this machine is ${ARCH})."
command -v curl >/dev/null 2>&1 || die "curl is required."

# Package installs need root; the script asks for it itself, so run it as your own user.
if [ "$(id -u)" -eq 0 ]; then SUDO=""; else SUDO="sudo"; fi

# Latest published release: tag, then "<sha256> <url>" for each file. GitHub's JSON lists each
# file's "digest" before its "browser_download_url", so the last digest seen belongs to the URL.
RELEASE_JSON="$(curl -fsSL -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/${REPO}/releases/latest")" \
    || die "Could not reach GitHub to find the latest NELO Studio release."
TAG="$(printf '%s\n' "$RELEASE_JSON" | sed -n 's/^  "tag_name": "\(.*\)",$/\1/p' | head -n1)"
[ -n "$TAG" ] || die "GitHub returned no published release for ${REPO}."

asset() { # asset <filename regex>: prints "<sha256 or -> <url>" for the first matching file
    printf '%s\n' "$RELEASE_JSON" | awk -v pat="$1" '
        /"digest":/ { d = $0; sub(/.*"sha256:/, "", d); sub(/".*/, "", d); if ($0 ~ /null/) d = "-" }
        /"browser_download_url":/ {
            u = $0; sub(/.*"browser_download_url": "/, "", u); sub(/".*/, "", u)
            if (u ~ pat) { print (d == "" ? "-" : d), u; exit }
            d = ""
        }'
}

download() { # download <filename regex> <dest>: fetches the file and checks its SHA-256
    local info sha url
    info="$(asset "$1")"
    [ -n "$info" ] || die "Release ${TAG} has no file matching ${1}. See https://github.com/${REPO}/releases"
    sha="${info%% *}"
    url="${info#* }"
    echo -e "Downloading ${BOLD}${url##*/}${NC} (${TAG})..."
    curl -fL --progress-bar "$url" -o "$2" || die "Download failed: $url"
    if [ "$sha" != "-" ] && command -v sha256sum >/dev/null 2>&1; then
        echo "${sha}  $2" | sha256sum -c --status || { rm -f "$2"; die "Checksum mismatch for ${url##*/}; the file was deleted."; }
        echo -e "${GREEN}✓ SHA-256 verified${NC}"
    fi
}

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

if command -v pacman >/dev/null 2>&1; then
    echo -e "${GREEN}✓ Arch Linux detected — installing the pacman package.${NC}"
    download '[.]pacman$' "$TMP_DIR/nelo-studio.pacman"
    # Packages up to v1.0.4 list http-parser and libappindicator-gtk3, which Arch no longer ships
    # and NELO Studio doesn't use; tell pacman to treat them as present.
    $SUDO pacman -U --noconfirm --assume-installed http-parser --assume-installed libappindicator-gtk3 "$TMP_DIR/nelo-studio.pacman"
elif command -v apt-get >/dev/null 2>&1; then
    echo -e "${GREEN}✓ Debian / Ubuntu detected — installing the .deb package.${NC}"
    download '[.]deb$' "$TMP_DIR/nelo-studio.deb"
    chmod 644 "$TMP_DIR/nelo-studio.deb"
    chmod 755 "$TMP_DIR"
    $SUDO apt-get install -y "$TMP_DIR/nelo-studio.deb"
else
    # The AppImage installs into the user's home, so it must not run as root.
    [ "$(id -u)" -ne 0 ] || die "Run this installer as your normal user (without sudo) so NELO Studio installs into your home folder."
    echo -e "${GREEN}✓ Installing the AppImage into ~/.local/bin.${NC}"
    mkdir -p "$HOME/.local/bin" "$HOME/.local/share/applications"
    APPIMAGE_PATH="$HOME/.local/bin/nelo-studio"
    download '[.]AppImage$' "$TMP_DIR/nelo-studio.AppImage"
    install -m 755 "$TMP_DIR/nelo-studio.AppImage" "$APPIMAGE_PATH"
    cat <<EOF > "$HOME/.local/share/applications/nelo-studio.desktop"
[Desktop Entry]
Name=NELO Studio
Comment=Robotics IDE with live simulation and AI coding agents
Exec=$APPIMAGE_PATH
Icon=nelo-studio
Terminal=false
Type=Application
Categories=Development;Engineering;Science;
EOF
    echo -e "${GREEN}✓ Installed to ${APPIMAGE_PATH}${NC}"
    echo -e "${YELLOW}If it won't start, install libfuse2 (AppImages need FUSE 2).${NC}"
fi

echo -e "\n${GREEN}${BOLD}✓ NELO Studio ${TAG} installed.${NC}"
echo -e "Launch it from your application menu, or run ${BOLD}nelo-studio${NC}.\n"
