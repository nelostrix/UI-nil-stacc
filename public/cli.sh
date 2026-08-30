#!/usr/bin/env bash
# ==============================================================================
# NELO CLI — Universal Headless Terminal & Python SDK Installer
# ==============================================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

echo -e "${CYAN}${BOLD}"
echo "  _   _ _____ _     ___     ____ _     ___ "
echo " | \ | | ____| |   / _ \   / ___| |   |_ _|"
echo " |  \| |  _| | |  | | | | | |   | |    | | "
echo " | |\  | |___| |__| |_| | | |___| |___ | | "
echo " |_| \_|_____|_____\___/   \____|_____|___|"
echo -e "${NC}"
echo -e "${BOLD}Headless Robotics Intelligence & 1000Hz Simulation CLI (v1.0.0)${NC}\n"

if command -v pip3 >/dev/null 2>&1; then
    echo -e "Installing ${BOLD}nelo-cli${NC} via pip3..."
    pip3 install --upgrade pip >/dev/null 2>&1 || true
    pip3 install nelo-cli || pip3 install --user nelo-cli
elif command -v pip >/dev/null 2>&1; then
    pip install nelo-cli || pip install --user nelo-cli
else
    echo -e "${RED}Error: Python 3 / pip is required to install nelo-cli.${NC}"
    exit 1
fi

echo -e "\n${GREEN}${BOLD}✓ NELO CLI Installed Successfully!${NC}"
echo -e "Try running: ${BOLD}nelo --help${NC} or ${BOLD}nelo sim --hz 1000${NC}\n"
