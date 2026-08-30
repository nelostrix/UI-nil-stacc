cask "nelo-studio" do
  version "1.0.0"
  sha256 "4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce"

  url "https://github.com/nelostrix/NIL/releases/download/v#{version}/NELO-Studio-#{version}-universal.dmg"
  name "NELO Studio"
  desc "NIL Self-Evolving AI & STACC 1000Hz Universal Robotics Platform"
  homepage "https://nelo.ai"

  auto_updates true

  app "NELO Studio.app"

  zap trash: [
    "~/Library/Application Support/nelo-studio",
    "~/Library/Preferences/com.nelo.studio.plist",
    "~/Library/Saved Application State/com.nelo.studio.savedState",
  ]
end
