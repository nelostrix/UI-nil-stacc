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
# Keep this public installer from silently putting users back on the old 1.0.7
# build while 1.1.1 is being published. Future releases pass this floor.
MINIMUM_RELEASE="1.1.1"

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

DISTRO_ID=""
DISTRO_LIKE=""
DISTRO_NAME="Linux"
if [ -r /etc/os-release ]; then
    . /etc/os-release
    DISTRO_ID="${ID:-}"
    DISTRO_LIKE="${ID_LIKE:-}"
    DISTRO_NAME="${PRETTY_NAME:-${NAME:-Linux}}"
fi
IS_ARCH=0
IS_DEBIAN=0
case "${DISTRO_ID} ${DISTRO_LIKE}" in
    *arch*|*manjaro*|*endeavouros*) IS_ARCH=1 ;;
esac
case "${DISTRO_ID} ${DISTRO_LIKE}" in
    *debian*|*ubuntu*) IS_DEBIAN=1 ;;
esac
echo -e "Distribution: ${GREEN}${DISTRO_NAME}${NC}"

# Native package installs need root; the script asks for it itself, so run it as your own user.
if [ "$(id -u)" -eq 0 ]; then SUDO=""; else SUDO="sudo"; fi
run_system_install() {
    if [ -n "$SUDO" ]; then "$SUDO" "$@"; else "$@"; fi
}

# Latest published release: tag, then "<sha256> <url>" for each file. GitHub's JSON lists each
# file's "digest" before its "browser_download_url", so the last digest seen belongs to the URL.
RELEASE_JSON="$(curl -fsSL -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/${REPO}/releases/latest")" \
    || die "Could not reach GitHub to find the latest NELO Studio release."
TAG="$(printf '%s\n' "$RELEASE_JSON" | sed -n 's/^  "tag_name": "\(.*\)",$/\1/p' | head -n1)"
[ -n "$TAG" ] || die "GitHub returned no published release for ${REPO}."
LATEST_VERSION="${TAG#v}"
if [ "$(printf '%s\n%s\n' "$MINIMUM_RELEASE" "$LATEST_VERSION" | sort -V | sed -n '1p')" != "$MINIMUM_RELEASE" ]; then
    die "The latest published build is ${TAG}; NELO Studio ${MINIMUM_RELEASE} or newer is required. The release has not been published yet. Try again after https://github.com/${REPO}/releases shows it."
fi

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
    # curl's carriage-return progress bar is rendered as a fresh line by some
    # embedded terminals (including NELO's terminal), flooding the screen.
    # Keep output stable: one status line followed by one completion line.
    echo -e "Downloading ${BOLD}${url##*/}${NC} (${TAG}). This may take a few minutes..."
    curl --fail --location --silent --show-error --retry 3 --retry-all-errors --retry-delay 1 \
        --connect-timeout 20 --output "$2" "$url" || die "Download failed: $url"
    echo -e "${GREEN}✓ Download complete${NC}"
    if [ "$sha" != "-" ] && command -v sha256sum >/dev/null 2>&1; then
        echo "${sha}  $2" | sha256sum -c --status || { rm -f "$2"; die "Checksum mismatch for ${url##*/}; the file was deleted."; }
        echo -e "${GREEN}✓ SHA-256 verified${NC}"
    fi
}

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

PACMAN_ASSET="$(asset '[.]pacman$')"
DEB_ASSET="$(asset '[.]deb$')"
APPIMAGE_ASSET="$(asset '[.]AppImage$')"
INSTALLED=0

if [ "$IS_ARCH" -eq 1 ] && command -v pacman >/dev/null 2>&1 && [ -n "$PACMAN_ASSET" ]; then
    echo -e "${GREEN}✓ Arch-based distro detected — installing the native pacman package.${NC}"
    download '[.]pacman$' "$TMP_DIR/nelo-studio.pacman"
    if run_system_install pacman -U --noconfirm "$TMP_DIR/nelo-studio.pacman"; then
        INSTALLED=1
    else
        echo -e "${YELLOW}Native package installation failed; trying the AppImage instead.${NC}"
    fi
elif [ "$IS_DEBIAN" -eq 1 ] && command -v apt-get >/dev/null 2>&1 && [ -n "$DEB_ASSET" ]; then
    echo -e "${GREEN}✓ Debian-based distro detected — installing the .deb package.${NC}"
    download '[.]deb$' "$TMP_DIR/nelo-studio.deb"
    chmod 644 "$TMP_DIR/nelo-studio.deb"
    chmod 755 "$TMP_DIR"
    if run_system_install apt-get install -y "$TMP_DIR/nelo-studio.deb" >"$TMP_DIR/apt-install.log" 2>&1; then
        INSTALLED=1
    else
        echo -e "${YELLOW}The .deb dependencies are unavailable from this system's package sources; trying the AppImage instead.${NC}"
    fi
fi

if [ "$INSTALLED" -eq 0 ]; then
    [ -n "$APPIMAGE_ASSET" ] || die "Release ${TAG} has no compatible installer for ${DISTRO_NAME}. See https://github.com/${REPO}/releases"
    if [ "$(id -u)" -eq 0 ]; then
        APPIMAGE_PATH="/usr/local/bin/nelo-studio"
        DESKTOP_FILE="/usr/local/share/applications/nelo-studio.desktop"
    else
        APPIMAGE_PATH="$HOME/.local/bin/nelo-studio"
        DESKTOP_FILE="$HOME/.local/share/applications/nelo-studio.desktop"
    fi
    echo -e "${GREEN}✓ Installing the verified AppImage fallback.${NC}"
    mkdir -p "$(dirname "$APPIMAGE_PATH")" "$(dirname "$DESKTOP_FILE")"
    download '[.]AppImage$' "$TMP_DIR/nelo-studio.AppImage"
    install -m 755 "$TMP_DIR/nelo-studio.AppImage" "$APPIMAGE_PATH"
    cat <<EOF > "$DESKTOP_FILE"
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
