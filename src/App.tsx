import { useMemo, useState } from "react";
import {
  Bot,
  Box,
  Compass,
  Gamepad2,
  Globe2,
  MessageSquare,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  Users,
  Wand2
} from "lucide-react";

type Workspace = "chat" | "search" | "assets" | "agents" | "templates";

const agents = [
  "Game Director",
  "World Builder",
  "Character Agent",
  "Weapon Agent",
  "Animation Agent",
  "NPC / Roleplay Agent",
  "Companion Agent",
  "Base Guard Agent",
  "Quest Agent",
  "Multiplayer Agent",
  "QA Agent",
  "Optimization Agent",
  "Release Agent"
];

const templates = [
  { name: "Creature Survival", tags: ["survival", "taming", "building"] },
  { name: "Open-World Survival", tags: ["survival", "crafting", "PvP/PvE"] },
  { name: "Tactical FPS", tags: ["FPS", "teams", "objectives"] },
  { name: "Battle Royale", tags: ["arena", "loot", "squads"] },
  { name: "Extraction", tags: ["PvPvE", "loot", "risk"] },
  { name: "Persistent Roleplay", tags: ["jobs", "factions", "economy"] }
];

export default function App() {
  const [workspace, setWorkspace] = useState<Workspace>("chat");
  const [prompt, setPrompt] = useState("");
  const [assetName, setAssetName] = useState("No asset selected");

  const title = useMemo(() => {
    const labels: Record<Workspace, string> = {
      chat: "Game Creation Chat",
      search: "Global Game Search",
      assets: "3D Asset Lab",
      agents: "Agent Reach",
      templates: "Game Templates"
    };
    return labels[workspace];
  }, [workspace]);

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">E</div>
          <div>
            <strong>Elitze Gaming</strong>
            <span>Game Creation Studio</span>
          </div>
        </div>

        <nav>
          <button className={workspace === "chat" ? "nav-item active" : "nav-item"} onClick={() => setWorkspace("chat")}><MessageSquare size={17} /> Chat</button>
          <button className={workspace === "search" ? "nav-item active" : "nav-item"} onClick={() => setWorkspace("search")}><Globe2 size={17} /> Global Search</button>
          <button className={workspace === "assets" ? "nav-item active" : "nav-item"} onClick={() => setWorkspace("assets")}><Box size={17} /> 3D Asset Lab</button>
          <button className={workspace === "agents" ? "nav-item active" : "nav-item"} onClick={() => setWorkspace("agents")}><Network size={17} /> Agent Reach</button>
          <button className={workspace === "templates" ? "nav-item active" : "nav-item"} onClick={() => setWorkspace("templates")}><Gamepad2 size={17} /> Templates</button>
        </nav>

        <div className="sidebar-bottom">
          <div className="status"><ShieldCheck size={15} /> Project-safe execution</div>
          <div className="status"><Users size={15} /> Creator-first permissions</div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <span className="eyebrow">ELITZE GAMING</span>
            <h1>{title}</h1>
          </div>
          <div className="topbar-actions">
            <button className="ghost"><Compass size={16} /> Studio</button>
            <button className="primary"><Sparkles size={16} /> New Project</button>
          </div>
        </header>

        {workspace === "chat" && (
          <section className="panel-stack">
            <div className="hero-panel">
              <div className="hero-copy">
                <span className="badge"><Wand2 size={14} /> Agent-native game building</span>
                <h2>Describe the game. Frontier-class agents build the systems.</h2>
                <p>Design worlds, gameplay, characters, assets, roleplay, multiplayer systems and production workflows from one project-aware workspace.</p>
                <div className="composer">
                  <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Example: Build a cyberpunk survival world with intelligent NPCs, an AI companion and a base defense system." />
                  <div className="composer-footer">
                    <span>{prompt.length ? `${prompt.length} characters` : "Ready"}</span>
                    <button className="primary" onClick={() => setPrompt((v) => v || "Build the game plan")}>Run Game Director</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid-3">
              {[
                ["Content Agents", "Specialists for world, characters, weapons, animation, quests, AI and QA.", Bot],
                ["Agent Reach", "Controlled access to files, tools, game engines, builds and testing.", Network],
                ["360° Asset Lab", "Inspect, repair, restyle, rig, animate, optimize and export game-ready assets.", Box]
              ].map(([name, copy, Icon]) => {
                const C = Icon as typeof Bot;
                return <article className="feature-card" key={name as string}><C size={20} /><h3>{name as string}</h3><p>{copy as string}</p></article>;
              })}
            </div>
          </section>
        )}

        {workspace === "search" && (
          <section className="panel search-panel">
            <div className="search-box"><Search size={19} /><input placeholder="Search engines, docs, Steam, YouTube, GitHub, assets, mechanics..." /><button className="primary">Search</button></div>
            <div className="empty-state"><Globe2 size={28} /><h2>Global Game Search</h2><p>Research game mechanics, technical documentation, assets, animation workflows, engines, modding APIs and creator references.</p></div>
          </section>
        )}

        {workspace === "assets" && (
          <section className="panel-stack">
            <div className="asset-toolbar panel"><div><span className="eyebrow">ASSET LAB</span><h2>Upload → inspect → transform → game</h2></div><label className="primary upload-btn"><Upload size={16} /> Upload Asset<input type="file" hidden onChange={(e) => setAssetName(e.target.files?.[0]?.name ?? "No asset selected")} /></label></div>
            <div className="asset-layout">
              <div className="viewer"><div className="viewer-grid"><Box size={56} /></div><div className="viewer-caption"><strong>{assetName}</strong><span>360° viewport · orbit · zoom · inspect</span></div></div>
              <div className="panel controls"><h3>Transformation</h3><label>Style<select><option>Original</option><option>Photorealistic</option><option>Anime</option><option>Cartoon</option><option>Stylized 3D</option><option>Cyberpunk</option></select></label><label>Target<select><option>Unreal</option><option>Unity</option><option>Roblox</option><option>Frontier Runtime</option></select></label><div className="control-list"><span>Geometry repair</span><span>Retopology / LOD</span><span>Materials / PBR</span><span>Rigging / animation</span><span>Collision / physics</span><span>Game-ready validation</span></div><button className="primary full">Run Asset Agent</button></div>
            </div>
          </section>
        )}

        {workspace === "agents" && (
          <section className="panel-stack">
            <div className="panel"><span className="eyebrow">AGENT REACH</span><h2>Specialized game production team</h2><p>Agents operate through explicit project permissions and work against the actual game project.</p></div>
            <div className="agent-grid">{agents.map((agent) => <article className="agent-card" key={agent}><Bot size={18} /><strong>{agent}</strong><span>Ready</span></article>)}</div>
          </section>
        )}

        {workspace === "templates" && (
          <section className="panel-stack">
            <div className="panel"><span className="eyebrow">GAME TEMPLATE LIBRARY</span><h2>Mechanic-first starting points</h2><p>Start from a genre and mechanics profile, then make the world, characters, assets, lore and implementation original.</p></div>
            <div className="template-grid">{templates.map((template) => <article className="template-card" key={template.name}><div className="template-icon"><Gamepad2 size={19} /></div><h3>{template.name}</h3><div className="tags">{template.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button className="ghost full">Use Template</button></article>)}</div>
          </section>
        )}
      </section>
    </main>
  );
}
