import { useState, useEffect, useRef } from "react";

const PLAYER_EMOJIS = ["⚽", "🏃", "🦶", "💨", "🔥", "⭐", "👑", "🎯", "🦁", "🐐"];
const VIBE_TRAITS = [
  { name: "Glass Ankles", desc: "Injury-prone but insane dribbling", color: "#ff6b6b" },
  { name: "Main Character", desc: "Shoots every time", color: "#ffd93d" },
  { name: "Locker Room Cancer", desc: "Debuffs teammates, elite stats", color: "#9b59b6" },
  { name: "Flop Artist", desc: "Earns penalties, risks red cards", color: "#e67e22" },
  { name: "Clutch Gene", desc: "+30% stats in final minutes", color: "#2ecc71" },
  { name: "Pace Merchant", desc: "Just runs fast. That's it.", color: "#3498db" },
  { name: "Penalty Bottler", desc: "Misses every pen. Every. One.", color: "#e74c3c" },
  { name: "Vibes Only", desc: "Random stats each match", color: "#1abc9c" },
  { name: "Ballon d'Fraud", desc: "Stats inflated by system", color: "#f39c12" },
  { name: "Park the Bus", desc: "Defensive wall, 0 attack", color: "#7f8c8d" },
];

const RARITY = [
  { name: "Bronze", color: "#cd7f32", bg: "linear-gradient(135deg, #cd7f32 0%, #8B5E3C 100%)", glow: "0 0 15px #cd7f3266" },
  { name: "Silver", color: "#c0c0c0", bg: "linear-gradient(135deg, #c0c0c0 0%, #808080 100%)", glow: "0 0 15px #c0c0c066" },
  { name: "Gold", color: "#ffd700", bg: "linear-gradient(135deg, #ffd700 0%, #b8860b 100%)", glow: "0 0 20px #ffd70066" },
  { name: "Diamond", color: "#b9f2ff", bg: "linear-gradient(135deg, #b9f2ff 0%, #00bcd4 100%)", glow: "0 0 25px #b9f2ff66" },
  { name: "Ballon d'Fraud", color: "#ff00ff", bg: "linear-gradient(135deg, #ff00ff 0%, #8b00ff 50%, #ff006e 100%)", glow: "0 0 30px #ff00ff88" },
];

const FIRST_NAMES = ["Sergio", "Kylian", "Erling", "Jude", "Vini", "Lamine", "Bukayo", "Phil", "Rodri", "Bruno", "Jamal", "Florian", "Antoine", "Dusan", "Rafael", "Nico", "Pedri", "Gavi", "Sandro", "Achraf"];
const LAST_NAMES = ["McThunder", "Van Degen", "De Ponzi", "El Flopo", "Von Stake", "O'Whale", "Al-Pump", "Di Rugged", "Le Shill", "Dos Santos", "McSweep", "Van Hype", "El Hodl", "De Moon", "O'Liquidated", "McYOLO", "Von Ape", "Di Based", "Le Ratio", "Al-Gigachad"];

function generatePlayer(id) {
  const rarityIdx = Math.random() < 0.05 ? 4 : Math.random() < 0.15 ? 3 : Math.random() < 0.35 ? 2 : Math.random() < 0.6 ? 1 : 0;
  const rarity = RARITY[rarityIdx];
  const baseMultiplier = [1, 1.3, 1.6, 2, 2.5][rarityIdx];
  const trait = VIBE_TRAITS[Math.floor(Math.random() * VIBE_TRAITS.length)];
  const basePrice = [0.5, 2, 8, 25, 100][rarityIdx] * (0.8 + Math.random() * 0.4);
  const holders = Math.floor(Math.random() * 200) + 1;
  const priceChange = (Math.random() - 0.4) * 60;

  return {
    id,
    firstName: FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)],
    lastName: LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)],
    emoji: PLAYER_EMOJIS[Math.floor(Math.random() * PLAYER_EMOJIS.length)],
    rarity,
    rarityIdx,
    trait,
    stats: {
      pace: Math.min(99, Math.floor((40 + Math.random() * 40) * baseMultiplier)),
      shooting: Math.min(99, Math.floor((35 + Math.random() * 40) * baseMultiplier)),
      passing: Math.min(99, Math.floor((35 + Math.random() * 40) * baseMultiplier)),
      defense: Math.min(99, Math.floor((30 + Math.random() * 40) * baseMultiplier)),
      stamina: Math.min(99, Math.floor((40 + Math.random() * 40) * baseMultiplier)),
    },
    price: Math.round(basePrice * 100) / 100,
    priceChange: Math.round(priceChange * 10) / 10,
    holders,
    overall: 0,
  };
}

function calcOverall(stats) {
  return Math.floor((stats.pace + stats.shooting + stats.passing + stats.defense + stats.stamina) / 5);
}

const initialPlayers = Array.from({ length: 20 }, (_, i) => {
  const p = generatePlayer(i);
  p.overall = calcOverall(p.stats);
  return p;
});

const FEED_MESSAGES = [
  { type: "buy", msg: "🐋 WHALE ALERT: xX_DegenKing_Xx bought {player} for ${price}" },
  { type: "sell", msg: "📉 PAPER HANDS: hodl_master dumped {player} at a loss" },
  { type: "match", msg: "⚔️ UPSET: noob_fc beat whale_united 3-0 with a Bronze squad" },
  { type: "pump", msg: "🚀 {player} price up {change}% in the last hour" },
  { type: "dump", msg: "💀 RUG PULL ENERGY: {player} dropped {change}% — sellers in shambles" },
  { type: "shame", msg: "🤡 WALK OF SHAME: crypto_baller69 lost 500 $BALL in a single match" },
  { type: "ref", msg: "🔗 SCOUT NETWORK: el_recruiter just earned $12 from referral trades" },
  { type: "season", msg: "🔄 SEASON 4 ENDS IN 3 DAYS — dump or diamond hands?" },
  { type: "injury", msg: "🏥 BREAKING: {player} got Glass Ankles trait after season reshuffle" },
  { type: "legend", msg: "👑 NEW BALLON D'FRAUD: {player} just minted — floor price: $420.69" },
];

function generateFeedItem(players) {
  const template = FEED_MESSAGES[Math.floor(Math.random() * FEED_MESSAGES.length)];
  const p = players[Math.floor(Math.random() * players.length)];
  const msg = template.msg
    .replace("{player}", `${p.firstName} ${p.lastName}`)
    .replace("{price}", (p.price * (0.8 + Math.random() * 0.5)).toFixed(2))
    .replace("{change}", (Math.random() * 40 + 5).toFixed(1));
  return { ...template, msg, time: Date.now() };
}

// ─── Components ───────────────────────────────

function StatBar({ label, value, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
      <span style={{ width: 28, fontSize: 10, color: "#8a8f98", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase" }}>{label}</span>
      <div style={{ flex: 1, height: 6, background: "#1a1d24", borderRadius: 3, overflow: "hidden" }}>
        <div style={{
          width: `${value}%`, height: "100%", borderRadius: 3,
          background: value > 85 ? "linear-gradient(90deg, #00ff87, #60efff)" : value > 70 ? "linear-gradient(90deg, #ffd700, #ff8c00)" : "linear-gradient(90deg, #666, #888)",
          transition: "width 0.8s ease",
        }} />
      </div>
      <span style={{ width: 24, fontSize: 11, color: value > 85 ? "#00ff87" : value > 70 ? "#ffd700" : "#8a8f98", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>{value}</span>
    </div>
  );
}

function PlayerCard({ player, onClick, compact, owned }) {
  const [hovered, setHovered] = useState(false);
  if (compact) {
    return (
      <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? "#1e2130" : "#14161e", border: "1px solid #2a2d3a", borderRadius: 12,
          padding: "12px 14px", cursor: "pointer", transition: "all 0.2s",
          transform: hovered ? "translateY(-2px)" : "none",
          boxShadow: hovered ? player.rarity.glow : "none",
        }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, background: player.rarity.bg,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
            }}>{player.emoji}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#e8e9ed" }}>{player.firstName} <span style={{ color: player.rarity.color }}>{player.lastName}</span></div>
              <div style={{ fontSize: 10, color: player.trait.color, marginTop: 2 }}>{player.trait.name} • OVR {player.overall}</div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#e8e9ed", fontFamily: "'JetBrains Mono', monospace" }}>${player.price.toFixed(2)}</div>
            <div style={{ fontSize: 11, color: player.priceChange >= 0 ? "#00ff87" : "#ff4757", fontFamily: "'JetBrains Mono', monospace" }}>
              {player.priceChange >= 0 ? "▲" : "▼"} {Math.abs(player.priceChange)}%
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: "#14161e", border: `1px solid ${hovered ? player.rarity.color + "66" : "#2a2d3a"}`, borderRadius: 16,
        padding: 16, cursor: "pointer", transition: "all 0.3s",
        transform: hovered ? "translateY(-4px) scale(1.02)" : "none",
        boxShadow: hovered ? player.rarity.glow : "none",
        position: "relative", overflow: "hidden",
      }}>
      {owned && <div style={{ position: "absolute", top: 8, right: 8, background: "#00ff8733", color: "#00ff87", fontSize: 9, padding: "2px 8px", borderRadius: 20, fontWeight: 700, letterSpacing: 1 }}>OWNED</div>}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 14, background: player.rarity.bg,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28,
          boxShadow: player.rarity.glow,
        }}>{player.emoji}</div>
        <div>
          <div style={{ fontSize: 11, color: player.rarity.color, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>{player.rarity.name}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#e8e9ed", lineHeight: 1.2 }}>{player.firstName}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: player.rarity.color, lineHeight: 1.2 }}>{player.lastName}</div>
        </div>
      </div>
      <div style={{ background: player.trait.color + "15", border: `1px solid ${player.trait.color}33`, borderRadius: 8, padding: "6px 10px", marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: player.trait.color }}>{player.trait.name}</div>
        <div style={{ fontSize: 10, color: "#8a8f98" }}>{player.trait.desc}</div>
      </div>
      <StatBar label="PAC" value={player.stats.pace} />
      <StatBar label="SHO" value={player.stats.shooting} />
      <StatBar label="PAS" value={player.stats.passing} />
      <StatBar label="DEF" value={player.stats.defense} />
      <StatBar label="STA" value={player.stats.stamina} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 12, borderTop: "1px solid #2a2d3a" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 900, color: "#e8e9ed", fontFamily: "'JetBrains Mono', monospace" }}>${player.price.toFixed(2)}</div>
          <div style={{ fontSize: 11, color: player.priceChange >= 0 ? "#00ff87" : "#ff4757", fontFamily: "'JetBrains Mono', monospace" }}>
            {player.priceChange >= 0 ? "▲" : "▼"} {Math.abs(player.priceChange)}%
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 10, color: "#8a8f98" }}>OVR</span>
          <span style={{ fontSize: 24, fontWeight: 900, color: player.overall > 85 ? "#00ff87" : player.overall > 70 ? "#ffd700" : "#8a8f98", fontFamily: "'JetBrains Mono', monospace" }}>{player.overall}</span>
        </div>
      </div>
      <div style={{ fontSize: 10, color: "#555", marginTop: 6 }}>{player.holders} holders</div>
    </div>
  );
}

function MatchSimulator({ squad, onClose }) {
  const [phase, setPhase] = useState("preview"); // preview, simulating, result
  const [score, setScore] = useState([0, 0]);
  const [minute, setMinute] = useState(0);
  const [events, setEvents] = useState([]);
  const [stakeAmount, setStakeAmount] = useState(10);
  const [betPlaced, setBetPlaced] = useState(false);

  const opponentNames = ["FC Whale", "Rug Pull United", "Pump & Dump FC", "HODL City", "Degen Athletic"];
  const opponent = useRef(opponentNames[Math.floor(Math.random() * opponentNames.length)]);

  const EVENT_TYPES = ["⚽ GOOOAL!", "🟨 Yellow Card", "💨 Great Save!", "🦶 Free Kick", "🔄 Substitution", "🤕 Injury!", "🎯 Shot on Target", "📐 Corner Kick"];

  function simulateMatch() {
    setPhase("simulating");
    setBetPlaced(true);
    let min = 0;
    let s = [0, 0];
    let evts = [];
    const squadPower = squad.reduce((a, p) => a + p.overall, 0) / squad.length;
    const oppPower = 55 + Math.random() * 30;

    const interval = setInterval(() => {
      min += Math.floor(Math.random() * 8) + 3;
      if (min > 90) {
        min = 90;
        clearInterval(interval);
        setPhase("result");
      }
      setMinute(min);

      if (Math.random() < 0.35) {
        const isGoal = Math.random() < 0.4;
        const forUs = Math.random() < (squadPower / (squadPower + oppPower));
        if (isGoal) {
          if (forUs) { s = [s[0] + 1, s[1]]; }
          else { s = [s[0], s[1] + 1]; }
          setScore([...s]);
          evts = [...evts, { min, text: `${min}' ⚽ ${forUs ? "YOUR TEAM" : opponent.current} SCORES!`, goal: true }];
        } else {
          const evt = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)];
          evts = [...evts, { min, text: `${min}' ${evt}`, goal: false }];
        }
        setEvents([...evts]);
      }
    }, 600);
  }

  const won = score[0] > score[1];
  const draw = score[0] === score[1];

  return (
    <div style={{ position: "fixed", inset: 0, background: "#0a0b10ee", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#12141c", borderRadius: 20, width: "100%", maxWidth: 420, maxHeight: "85vh", overflow: "auto", border: "1px solid #2a2d3a" }}>
        <div style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: "#8a8f98", letterSpacing: 2, textTransform: "uppercase" }}>
              {phase === "preview" ? "Match Preview" : phase === "simulating" ? "⚡ LIVE" : won ? "🏆 VICTORY" : draw ? "🤝 DRAW" : "💀 DEFEAT"}
            </span>
            <button onClick={onClose} style={{ background: "none", border: "none", color: "#8a8f98", fontSize: 20, cursor: "pointer" }}>✕</button>
          </div>

          {/* Scoreboard */}
          <div style={{ background: "#1a1d24", borderRadius: 16, padding: 20, marginBottom: 20, textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 24 }}>
              <div>
                <div style={{ fontSize: 12, color: "#00ff87", fontWeight: 700, marginBottom: 4 }}>YOUR TEAM</div>
                <div style={{ fontSize: 48, fontWeight: 900, color: "#e8e9ed", fontFamily: "'JetBrains Mono', monospace" }}>{score[0]}</div>
              </div>
              <div style={{ fontSize: 14, color: "#555" }}>VS</div>
              <div>
                <div style={{ fontSize: 12, color: "#ff4757", fontWeight: 700, marginBottom: 4 }}>{opponent.current.toUpperCase()}</div>
                <div style={{ fontSize: 48, fontWeight: 900, color: "#e8e9ed", fontFamily: "'JetBrains Mono', monospace" }}>{score[1]}</div>
              </div>
            </div>
            {phase === "simulating" && (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#ffd700", fontFamily: "'JetBrains Mono', monospace" }}>{minute}'</div>
                <div style={{ width: "100%", height: 4, background: "#2a2d3a", borderRadius: 2, marginTop: 8 }}>
                  <div style={{ width: `${(minute / 90) * 100}%`, height: "100%", background: "linear-gradient(90deg, #00ff87, #ffd700)", borderRadius: 2, transition: "width 0.5s" }} />
                </div>
              </div>
            )}
          </div>

          {/* Staking */}
          {phase === "preview" && (
            <div style={{ background: "#1a1d24", borderRadius: 12, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#8a8f98", marginBottom: 8, fontWeight: 700 }}>💰 STAKE YOUR $BALL</div>
              <div style={{ display: "flex", gap: 8 }}>
                {[5, 10, 25, 50, 100].map(amt => (
                  <button key={amt} onClick={() => setStakeAmount(amt)}
                    style={{
                      flex: 1, padding: "8px 4px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer",
                      fontFamily: "'JetBrains Mono', monospace",
                      background: stakeAmount === amt ? "#00ff8722" : "#0d0f14",
                      border: `1px solid ${stakeAmount === amt ? "#00ff87" : "#2a2d3a"}`,
                      color: stakeAmount === amt ? "#00ff87" : "#8a8f98",
                    }}>${amt}</button>
                ))}
              </div>
              <button onClick={simulateMatch}
                style={{
                  width: "100%", marginTop: 12, padding: "14px", borderRadius: 12, border: "none",
                  background: "linear-gradient(135deg, #00ff87, #00b894)", color: "#000", fontSize: 14,
                  fontWeight: 800, cursor: "pointer", letterSpacing: 1,
                }}>⚡ KICK OFF — STAKE ${stakeAmount}</button>
            </div>
          )}

          {/* Events */}
          {events.length > 0 && (
            <div style={{ maxHeight: 200, overflow: "auto" }}>
              {events.slice().reverse().map((e, i) => (
                <div key={i} style={{
                  padding: "8px 12px", marginBottom: 4, borderRadius: 8,
                  background: e.goal ? "#ffd70011" : "#1a1d24",
                  border: e.goal ? "1px solid #ffd70033" : "1px solid transparent",
                  fontSize: 12, color: e.goal ? "#ffd700" : "#8a8f98",
                  fontFamily: "'JetBrains Mono', monospace",
                }}>{e.text}</div>
              ))}
            </div>
          )}

          {/* Result */}
          {phase === "result" && (
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <div style={{
                fontSize: 28, fontWeight: 900, marginBottom: 8,
                color: won ? "#00ff87" : draw ? "#ffd700" : "#ff4757",
              }}>{won ? "💰 YOU WON!" : draw ? "🤝 DRAW" : "💀 REKT"}</div>
              <div style={{ fontSize: 14, color: "#8a8f98", fontFamily: "'JetBrains Mono', monospace" }}>
                {won ? `+$${(stakeAmount * 1.8).toFixed(0)} $BALL` : draw ? "Stake returned" : `-$${stakeAmount} $BALL`}
              </div>
              {!won && !draw && (
                <div style={{ fontSize: 11, color: "#ff475788", marginTop: 8, fontStyle: "italic" }}>
                  🤡 This loss will be posted on the Walk of Shame
                </div>
              )}
              <button onClick={onClose}
                style={{
                  marginTop: 16, padding: "12px 32px", borderRadius: 12, border: "none",
                  background: "#1a1d24", color: "#e8e9ed", fontSize: 13, fontWeight: 700, cursor: "pointer",
                }}>Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PlayerModal({ player, onClose, onBuy, owned }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#0a0b10ee", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: "#12141c", borderRadius: 20, width: "100%", maxWidth: 380, border: "1px solid #2a2d3a", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ background: player.rarity.bg, padding: "24px 20px", textAlign: "center", position: "relative" }}>
          <div style={{ fontSize: 56 }}>{player.emoji}</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", textShadow: "0 2px 8px #00000066", marginTop: 8 }}>
            {player.firstName} {player.lastName}
          </div>
          <div style={{
            display: "inline-block", background: "#00000044", borderRadius: 20, padding: "4px 14px", marginTop: 8,
            fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: 1.5,
          }}>{player.rarity.name.toUpperCase()} • OVR {player.overall}</div>
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ background: player.trait.color + "15", border: `1px solid ${player.trait.color}33`, borderRadius: 10, padding: "10px 14px", marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: player.trait.color }}>⚡ {player.trait.name}</div>
            <div style={{ fontSize: 11, color: "#8a8f98", marginTop: 2 }}>{player.trait.desc}</div>
          </div>
          <StatBar label="PAC" value={player.stats.pace} />
          <StatBar label="SHO" value={player.stats.shooting} />
          <StatBar label="PAS" value={player.stats.passing} />
          <StatBar label="DEF" value={player.stats.defense} />
          <StatBar label="STA" value={player.stats.stamina} />

          {/* Bonding Curve Mini Chart */}
          <div style={{ background: "#1a1d24", borderRadius: 10, padding: 12, marginTop: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 10, color: "#8a8f98", marginBottom: 8, fontWeight: 700, letterSpacing: 1 }}>BONDING CURVE</div>
            <svg viewBox="0 0 200 60" style={{ width: "100%", height: 50 }}>
              <path d={`M 0 55 Q 40 ${55 - player.holders * 0.2} 80 ${35 - Math.random() * 10} T 160 ${20 - Math.random() * 10} T 200 ${10 + Math.random() * 5}`}
                fill="none" stroke={player.rarity.color} strokeWidth="2" />
              <circle cx={Math.min(190, player.holders * 0.95)} cy={Math.max(8, 55 - player.holders * 0.25)} r="4" fill={player.rarity.color} />
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#555" }}>
              <span>0 holders</span>
              <span>{player.holders} holders (you are here)</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => { onBuy(player); onClose(); }}
              style={{
                flex: 1, padding: "14px", borderRadius: 12, border: "none",
                background: owned ? "linear-gradient(135deg, #ff4757, #c0392b)" : "linear-gradient(135deg, #00ff87, #00b894)",
                color: owned ? "#fff" : "#000", fontSize: 14, fontWeight: 800, cursor: "pointer",
              }}>{owned ? `SELL $${(player.price * 0.95).toFixed(2)}` : `BUY $${player.price.toFixed(2)}`}</button>
          </div>
          <div style={{ textAlign: "center", fontSize: 10, color: "#555", marginTop: 8 }}>
            {owned ? "5% fee on sell" : "Price increases after your purchase"}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ───────────────────────────────

export default function DegenFootball() {
  const [tab, setTab] = useState("market");
  const [players] = useState(initialPlayers);
  const [mySquad, setMySquad] = useState([initialPlayers[0], initialPlayers[3], initialPlayers[7]]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showMatch, setShowMatch] = useState(false);
  const [feed, setFeed] = useState(() => Array.from({ length: 8 }, () => generateFeedItem(initialPlayers)));
  const [balance, setBalance] = useState(250.00);
  const [sortBy, setSortBy] = useState("price");
  const [filterRarity, setFilterRarity] = useState("all");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeed(prev => [generateFeedItem(players), ...prev.slice(0, 19)]);
    }, 4000);
    return () => clearInterval(interval);
  }, [players]);

  function showNotif(msg, type = "success") {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  }

  function handleBuy(player) {
    const owned = mySquad.find(p => p.id === player.id);
    if (owned) {
      setMySquad(prev => prev.filter(p => p.id !== player.id));
      setBalance(prev => Math.round((prev + player.price * 0.95) * 100) / 100);
      showNotif(`Sold ${player.firstName} ${player.lastName} for $${(player.price * 0.95).toFixed(2)}`, "sell");
    } else {
      if (balance < player.price) { showNotif("Not enough $BALL!", "error"); return; }
      setMySquad(prev => [...prev, player]);
      setBalance(prev => Math.round((prev - player.price) * 100) / 100);
      showNotif(`Bought ${player.firstName} ${player.lastName} for $${player.price.toFixed(2)}`);
    }
  }

  const filteredPlayers = players
    .filter(p => filterRarity === "all" || p.rarity.name === filterRarity)
    .sort((a, b) => sortBy === "price" ? b.price - a.price : sortBy === "overall" ? b.overall - a.overall : b.priceChange - a.priceChange);

  const squadPower = mySquad.length > 0 ? Math.floor(mySquad.reduce((a, p) => a + p.overall, 0) / mySquad.length) : 0;

  const tabs = [
    { id: "market", label: "Market", icon: "🏪" },
    { id: "squad", label: "Squad", icon: "⚔️" },
    { id: "arena", label: "Arena", icon: "🏟️" },
    { id: "feed", label: "Feed", icon: "📡" },
  ];

  return (
    <div style={{
      fontFamily: "'Satoshi', 'DM Sans', -apple-system, sans-serif",
      background: "#0a0b10", color: "#e8e9ed", minHeight: "100vh",
      maxWidth: 480, margin: "0 auto", position: "relative", overflow: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=JetBrains+Mono:wght@400;700;800&display=swap" rel="stylesheet" />
      {/* Notification */}
      {notification && (
        <div style={{
          position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 2000,
          background: notification.type === "error" ? "#ff4757" : notification.type === "sell" ? "#e67e22" : "#00ff87",
          color: notification.type === "error" || notification.type === "sell" ? "#fff" : "#000",
          padding: "10px 20px", borderRadius: 12, fontSize: 13, fontWeight: 700,
          boxShadow: "0 4px 20px #00000066", animation: "slideDown 0.3s ease",
        }}>{notification.msg}</div>
      )}

      {/* Header */}
      <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1a1d24" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: -0.5 }}>⚽ <span style={{ background: "linear-gradient(135deg, #00ff87, #60efff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>DEGENBALL</span></div>
          <div style={{ fontSize: 10, color: "#555", letterSpacing: 2 }}>SEASON 4 • 12d 6h left</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#1a1d24", padding: "8px 14px", borderRadius: 10 }}>
          <span style={{ fontSize: 12 }}>💰</span>
          <span style={{ fontSize: 14, fontWeight: 800, color: "#00ff87", fontFamily: "'JetBrains Mono', monospace" }}>${balance.toFixed(2)}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "12px 16px", paddingBottom: 80, minHeight: "calc(100vh - 130px)" }}>

        {/* ── MARKET ── */}
        {tab === "market" && (
          <>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 4 }}>Transfer Market</div>
              <div style={{ fontSize: 12, color: "#8a8f98" }}>Buy low, shill hard, sell high. Repeat.</div>
            </div>
            {/* Filters */}
            <div style={{ display: "flex", gap: 6, marginBottom: 12, overflowX: "auto", paddingBottom: 4 }}>
              {["all", ...RARITY.map(r => r.name)].map(r => (
                <button key={r} onClick={() => setFilterRarity(r)}
                  style={{
                    padding: "6px 12px", borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
                    background: filterRarity === r ? "#2a2d3a" : "transparent",
                    border: `1px solid ${filterRarity === r ? "#3a3d4a" : "#1a1d24"}`,
                    color: filterRarity === r ? "#e8e9ed" : "#555",
                  }}>{r === "all" ? "All" : r}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
              {[{ id: "price", label: "$ Price" }, { id: "overall", label: "OVR" }, { id: "trending", label: "🔥 Hot" }].map(s => (
                <button key={s.id} onClick={() => setSortBy(s.id)}
                  style={{
                    padding: "5px 10px", borderRadius: 6, fontSize: 10, fontWeight: 700, cursor: "pointer",
                    background: sortBy === s.id ? "#00ff8722" : "transparent",
                    border: `1px solid ${sortBy === s.id ? "#00ff8744" : "#1a1d24"}`,
                    color: sortBy === s.id ? "#00ff87" : "#555",
                  }}>{s.label}</button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {filteredPlayers.map(p => (
                <PlayerCard key={p.id} player={p} onClick={() => setSelectedPlayer(p)} owned={mySquad.find(s => s.id === p.id)} />
              ))}
            </div>
          </>
        )}

        {/* ── SQUAD ── */}
        {tab === "squad" && (
          <>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 4 }}>Your Squad</div>
              <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                <div style={{ background: "#1a1d24", borderRadius: 12, padding: "12px 16px", flex: 1 }}>
                  <div style={{ fontSize: 10, color: "#8a8f98", letterSpacing: 1 }}>SQUAD POWER</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: squadPower > 75 ? "#00ff87" : "#ffd700", fontFamily: "'JetBrains Mono', monospace" }}>{squadPower}</div>
                </div>
                <div style={{ background: "#1a1d24", borderRadius: 12, padding: "12px 16px", flex: 1 }}>
                  <div style={{ fontSize: 10, color: "#8a8f98", letterSpacing: 1 }}>PORTFOLIO</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#e8e9ed", fontFamily: "'JetBrains Mono', monospace" }}>${mySquad.reduce((a, p) => a + p.price, 0).toFixed(0)}</div>
                </div>
                <div style={{ background: "#1a1d24", borderRadius: 12, padding: "12px 16px", flex: 1 }}>
                  <div style={{ fontSize: 10, color: "#8a8f98", letterSpacing: 1 }}>PLAYERS</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#e8e9ed", fontFamily: "'JetBrains Mono', monospace" }}>{mySquad.length}</div>
                </div>
              </div>
            </div>
            {mySquad.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "#555" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🤷</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>No players yet</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>Hit the Market and start building your squad, degen</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {mySquad.map(p => (
                  <PlayerCard key={p.id} player={p} compact onClick={() => setSelectedPlayer(p)} owned />
                ))}
              </div>
            )}
          </>
        )}

        {/* ── ARENA ── */}
        {tab === "arena" && (
          <>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 4 }}>Match Arena</div>
              <div style={{ fontSize: 12, color: "#8a8f98" }}>Stake $BALL. Win glory. Or get rekt.</div>
            </div>
            <div style={{ background: "linear-gradient(135deg, #1a1d24, #12141c)", borderRadius: 16, padding: 20, border: "1px solid #2a2d3a", marginBottom: 16 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 12, color: "#8a8f98", letterSpacing: 2, marginBottom: 12 }}>YOUR SQUAD POWER</div>
                <div style={{ fontSize: 56, fontWeight: 900, color: squadPower > 75 ? "#00ff87" : "#ffd700", fontFamily: "'JetBrains Mono', monospace" }}>{squadPower}</div>
                <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 12, marginBottom: 20 }}>
                  {mySquad.slice(0, 5).map((p, i) => (
                    <div key={i} style={{ width: 40, height: 40, borderRadius: 10, background: p.rarity.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{p.emoji}</div>
                  ))}
                  {mySquad.length < 5 && Array.from({ length: 5 - Math.min(mySquad.length, 5) }).map((_, i) => (
                    <div key={`e${i}`} style={{ width: 40, height: 40, borderRadius: 10, background: "#1a1d24", border: "1px dashed #2a2d3a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#555" }}>?</div>
                  ))}
                </div>
                <button onClick={() => mySquad.length >= 3 ? setShowMatch(true) : showNotif("Need at least 3 players!", "error")}
                  style={{
                    width: "100%", padding: "16px", borderRadius: 14, border: "none",
                    background: mySquad.length >= 3 ? "linear-gradient(135deg, #ff006e, #8338ec)" : "#1a1d24",
                    color: mySquad.length >= 3 ? "#fff" : "#555",
                    fontSize: 16, fontWeight: 800, cursor: mySquad.length >= 3 ? "pointer" : "default",
                    letterSpacing: 1, textTransform: "uppercase",
                  }}>⚡ Find Match</button>
                {mySquad.length < 3 && <div style={{ fontSize: 11, color: "#ff4757", marginTop: 8 }}>Need at least 3 players to play</div>}
              </div>
            </div>
            {/* Recent results */}
            <div style={{ fontSize: 13, fontWeight: 700, color: "#8a8f98", marginBottom: 8, letterSpacing: 1 }}>RECENT RESULTS</div>
            {[{ w: true, s: "3-1", opp: "FC Whale", gain: "+$45" }, { w: false, s: "0-2", opp: "Rug Pull Utd", gain: "-$20" }, { w: true, s: "2-0", opp: "HODL City", gain: "+$30" }].map((r, i) => (
              <div key={i} style={{ background: "#14161e", borderRadius: 10, padding: "10px 14px", marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center", border: `1px solid ${r.w ? "#00ff8722" : "#ff475722"}` }}>
                <div>
                  <span style={{ color: r.w ? "#00ff87" : "#ff4757", fontWeight: 700, fontSize: 13 }}>{r.w ? "W" : "L"}</span>
                  <span style={{ color: "#8a8f98", fontSize: 12, marginLeft: 8 }}>vs {r.opp}</span>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontWeight: 800, fontSize: 14, fontFamily: "'JetBrains Mono', monospace" }}>{r.s}</span>
                  <span style={{ color: r.w ? "#00ff87" : "#ff4757", fontWeight: 700, fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>{r.gain}</span>
                </div>
              </div>
            ))}
          </>
        )}

        {/* ── FEED ── */}
        {tab === "feed" && (
          <>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 4 }}>Live Feed</div>
              <div style={{ fontSize: 12, color: "#8a8f98" }}>Real-time degen activity. FOMO guaranteed.</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {feed.map((f, i) => (
                <div key={i} style={{
                  background: "#14161e", borderRadius: 10, padding: "10px 14px",
                  border: "1px solid #1a1d24", fontSize: 12, color: "#c0c4cc",
                  opacity: Math.max(0.4, 1 - i * 0.05),
                  fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.4,
                }}>{f.msg}</div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 480, background: "#0a0b10", borderTop: "1px solid #1a1d24",
        display: "flex", padding: "8px 8px", paddingBottom: "max(8px, env(safe-area-inset-bottom))",
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              background: "none", border: "none", cursor: "pointer", padding: "6px 0",
              color: tab === t.id ? "#00ff87" : "#555", transition: "color 0.2s",
            }}>
            <span style={{ fontSize: 18 }}>{t.icon}</span>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5 }}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Modals */}
      {selectedPlayer && (
        <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)}
          onBuy={handleBuy} owned={!!mySquad.find(s => s.id === selectedPlayer.id)} />
      )}
      {showMatch && <MatchSimulator squad={mySquad} onClose={() => setShowMatch(false)} />}

      <style>{`
        @keyframes slideDown { from { opacity: 0; transform: translate(-50%, -20px); } to { opacity: 1; transform: translate(-50%, 0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #2a2d3a; border-radius: 2px; }
        body { background: #0a0b10; }
      `}</style>
    </div>
  );
}
