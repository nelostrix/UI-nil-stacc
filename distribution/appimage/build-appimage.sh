#!/usr/bin/env bash
# ==============================================================================
# Build Standalone Linux AppImage for NELO Studio
# Bundles Electron Host + Embedded Python 3.11 + NIL Daemon + STACC Engine
# ==============================================================================

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="/tmp/nelo-studio.AppDir"
OUT_DIR="/home/lucy/work/NELO-Studio/dist"

echo "[1/4] Preparing AppDir layout..."
rm -rf "$APP_DIR"
mkdir -p "$APP_DIR/usr/bin"
mkdir -p "$APP_DIR/usr/lib"
mkdir -p "$APP_DIR/usr/share/icons/hicolor/256x256/apps"

echo "[2/4] Copying binary payloads and sidecars..."
cp -r /home/lucy/work/NELO-Studio/dist/linux-stage/nil-studio/* "$APP_DIR/usr/bin/" || true
cp /home/lucy/nelo-studio-bin/nelo-studio.desktop "$APP_DIR/nelo-studio.desktop"
cp /home/lucy/UI-nil-stacc/public/logo.png "$APP_DIR/usr/share/icons/hicolor/256x256/apps/nelo-studio.png"
cp /home/lucy/UI-nil-stacc/public/logo.png "$APP_DIR/nelo-studio.png"

echo "[3/4] Creating AppRun supervisor script..."
cat << 'EOF' > "$APP_DIR/AppRun"
#!/usr/bin/env bash
HERE="$(dirname "$(readlink -f "${0}")")"
export PATH="${HERE}/usr/bin:${PATH}"
export LD_LIBRARY_PATH="${HERE}/usr/lib:${LD_LIBRARY_PATH}"
export PYTHONPATH="${HERE}/usr/bin/packages/robotics-sdk:${HERE}/usr/bin/packages/ai-sdk:${PYTHONPATH}"

# 1. Start embedded NIL Daemon (Port 8765)
if ! curl -s http://127.0.0.1:8765/v1/system/status >/dev/null 2>&1; then
    python3 "${HERE}/usr/bin/nil_server.py" 8765 >/tmp/nil_appimage.log 2>&1 &
    NIL_PID=$!
fi

# 2. Start embedded STACC Robotics Daemon (Port 8766)
if ! curl -s http://127.0.0.1:8766/v1/system/status >/dev/null 2>&1; then
    python3 "${HERE}/usr/bin/stacc_server.py" 8766 >/tmp/stacc_appimage.log 2>&1 &
    STACC_PID=$!
fi

# 3. Launch Electron / Studio Desktop UI
exec "${HERE}/usr/bin/nil-studio" "$@"
EOF

chmod +x "$APP_DIR/AppRun"

echo "[4/4] Generating AppImage using appimagetool..."
mkdir -p "$OUT_DIR"
if command -v appimagetool >/dev/null 2>&1; then
    appimagetool "$APP_DIR" "$OUT_DIR/NELO-Studio-1.0.0.AppImage"
    echo "✓ Built $OUT_DIR/NELO-Studio-1.0.0.AppImage"
else
    echo "Notice: appimagetool not found in PATH. AppDir prepared at $APP_DIR."
fi
