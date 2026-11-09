"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Activity, ArrowLeft, BarChart3, Check, ChevronRight, CircleAlert, Clock3, Database, Download, ExternalLink, Globe2, LockKeyhole, LogOut, RefreshCw, Save, Server, Settings2, ShieldCheck, Users, Zap } from "lucide-react";

type Analytics = {
    totals: { users: number; activeSessions: number; posts: number; comments: number; messages: number; communities: number; openReports: number; attachmentBytes: number };
    reports: Record<string, number>;
    daily: Array<{ date: string; signups: number; posts: number; messages: number }>;
    topCommunities: Array<{ name: string; slug: string; members: number }>;
    latestAudit: Array<{ action: string; detail: string; created_at: number }>;
    generatedAt: string;
};
type Settings = { network_name: string; public_site_url: string; support_email: string; registration_enabled: string };
type Snapshot = { analytics: Analytics; settings: Settings; environment: Record<string, boolean> };
type Tab = "overview" | "settings" | "deployment";

const initialSettings: Settings = { network_name: "NELO Network", public_site_url: "", support_email: "", registration_enabled: "true" };
const fmt = (value: number) => new Intl.NumberFormat().format(value || 0);
const bytes = (value: number) => value < 1024 * 1024 ? `${(value / 1024).toFixed(0)} KB` : `${(value / (1024 * 1024)).toFixed(1)} MB`;
const dateTime = (value: string | number) => new Date(value).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });

function Metric({ label, value, detail, icon: Icon, tint }: { label: string; value: string; detail: string; icon: typeof Users; tint: string }) {
    return <article className="admin-panel group p-5 transition-colors hover:border-white/15">
        <div className="flex items-center justify-between"><span className="admin-eyebrow">{label}</span><span className={`grid h-9 w-9 place-items-center rounded-lg border border-white/5 ${tint}`}><Icon size={16}/></span></div>
        <p className="mt-5 text-3xl font-semibold tracking-tight text-white">{value}</p><p className="mt-1 text-xs text-zinc-500">{detail}</p>
    </article>;
}

function TrendChart({ rows }: { rows: Analytics["daily"] }) {
    const points = useMemo(() => {
        const width = 700, height = 190, pad = 18;
        const max = Math.max(1, ...rows.flatMap((row) => [row.signups, row.posts, row.messages]));
        const line = (key: "signups" | "posts" | "messages") => rows.map((row, index) => `${index === 0 ? "M" : "L"} ${pad + index * ((width - pad * 2) / Math.max(1, rows.length - 1))} ${height - pad - (row[key] / max) * (height - pad * 2)}`).join(" ");
        return { width, height, signup: line("signups"), posts: line("posts"), messages: line("messages") };
    }, [rows]);
    return <div className="mt-5 overflow-hidden">
        <div className="mb-3 flex flex-wrap gap-x-5 gap-y-2 text-[10px] uppercase tracking-widest text-zinc-500"><span className="flex items-center gap-2"><i className="h-1.5 w-5 rounded bg-[#ff6b35]"/>New members</span><span className="flex items-center gap-2"><i className="h-1.5 w-5 rounded bg-[#c8ff00]"/>Posts</span><span className="flex items-center gap-2"><i className="h-1.5 w-5 rounded bg-[#58c8ff]"/>Messages</span></div>
        <svg viewBox={`0 0 ${points.width} ${points.height}`} className="h-48 w-full" role="img" aria-label="Daily signups, posts and messages over the last 14 days">
            {[0, 1, 2, 3].map((n) => <line key={n} x1="0" x2={points.width} y1={24 + n * 48} y2={24 + n * 48} stroke="rgba(255,255,255,.07)" strokeDasharray="3 6"/>)}
            <path d={points.signup} fill="none" stroke="#ff6b35" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/><path d={points.posts} fill="none" stroke="#c8ff00" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/><path d={points.messages} fill="none" stroke="#58c8ff" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
        </svg>
        <div className="flex justify-between text-[10px] text-zinc-600"><span>{rows[0]?.date || "—"}</span><span>LAST 14 DAYS</span><span>{rows.at(-1)?.date || "—"}</span></div>
    </div>;
}

export default function AdminPage() {
    const [origin, setOrigin] = useState("");
    const [token, setToken] = useState("");
    const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
    const [settings, setSettings] = useState<Settings>(initialSettings);
    const [tab, setTab] = useState<Tab>("overview");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [lastUpdated, setLastUpdated] = useState("");

    useEffect(() => { setOrigin(window.localStorage.getItem("nelo-admin-origin") || ""); }, []);

    async function callAdmin(base = origin, key = token, method: "GET" | "POST" = "GET", body?: unknown) {
        const clean = base.trim().replace(/\/$/, "");
        let parsed: URL;
        try { parsed = new URL(clean); } catch { throw new Error("Enter your Network service URL, such as https://network.example.com."); }
        if (parsed.protocol !== "https:" && parsed.hostname !== "localhost" && parsed.hostname !== "127.0.0.1") throw new Error("The Network admin connection must use HTTPS.");
        if (parsed.pathname !== "/" || parsed.search || parsed.hash) throw new Error("Enter only the Network site origin, without a path.");
        if (key.trim().length < 32) throw new Error("Enter the admin token configured on the Network server.");
        const response = await fetch(`${clean}/api/social/admin`, { method, redirect: "error", cache: "no-store", headers: { Authorization: `Bearer ${key.trim()}`, ...(body ? { "Content-Type": "application/json" } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}) });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || `Network admin request failed (${response.status}).`);
        return result;
    }

    async function connect(event?: FormEvent) {
        event?.preventDefault(); setBusy(true); setError(""); setNotice("");
        try { const result = await callAdmin(); setSnapshot(result); setSettings(result.settings); setLastUpdated(new Date().toISOString()); window.localStorage.setItem("nelo-admin-origin", origin.trim().replace(/\/$/, "")); setNotice("Connected securely to the Network service."); }
        catch (e) { setSnapshot(null); setError(e instanceof Error ? e.message : "Could not connect to Network."); }
        finally { setBusy(false); }
    }

    async function refresh() { await connect(); }
    async function saveSettings(event: FormEvent) {
        event.preventDefault(); setBusy(true); setError(""); setNotice("");
        try { await callAdmin(origin, token, "POST", { settings }); const result = await callAdmin(); setSnapshot(result); setSettings(result.settings); setLastUpdated(new Date().toISOString()); setNotice("Runtime settings saved to the Network service."); }
        catch (e) { setError(e instanceof Error ? e.message : "Could not save settings."); }
        finally { setBusy(false); }
    }
    function disconnect() { setSnapshot(null); setToken(""); setNotice(""); setError(""); }
    function exportAnalytics() {
        if (!snapshot) return;
        const totals = snapshot.analytics.totals;
        const rows = [["metric", "value"], ["users", totals.users], ["active_sessions", totals.activeSessions], ["posts", totals.posts], ["comments", totals.comments], ["messages", totals.messages], ["communities", totals.communities], ["open_reports", totals.openReports], ["attachment_bytes", totals.attachmentBytes], ["", ""], ["date", "signups", "posts", "messages"], ...snapshot.analytics.daily.map((row) => [row.date, row.signups, row.posts, row.messages])];
        const csv = rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
        const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
        const link = document.createElement("a"); link.href = url; link.download = `nelo-network-analytics-${new Date().toISOString().slice(0, 10)}.csv`; link.click();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    const metrics = snapshot?.analytics.totals;
    const env = snapshot?.environment;
    const checklist = [
        ["Public Network URL", env?.networkUrlConfigured, "BETTER_AUTH_URL"],
        ["Authentication secret", env?.authSecretConfigured, "BETTER_AUTH_SECRET"],
        ["Account email delivery", env?.emailDeliveryConfigured, "RESEND_API_KEY + NELO_AUTH_FROM_EMAIL"],
        ["Email verification required", env?.emailVerificationRequired, "NELO_REQUIRE_EMAIL_VERIFICATION=1"],
        ["Admin API token", env?.adminTokenConfigured, "NELO_SOCIAL_ADMIN_TOKEN"],
        ["Moderator account", env?.moderatorConfigured, "NELO_SOCIAL_MODERATOR_EMAILS"],
        ["Trusted browser origins", env?.trustedOriginsConfigured, "BETTER_AUTH_TRUSTED_ORIGINS"],
    ] as const;

    return <main className="min-h-screen bg-[#08090b] text-zinc-200">
        <div className="admin-grid min-h-screen lg:grid-cols-[248px_minmax(0,1fr)]">
            <aside className="border-b border-white/8 bg-[#0b0c0f] px-5 py-5 lg:border-b-0 lg:border-r lg:px-6">
                <a href="/" className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[.16em] text-zinc-300"><ArrowLeft size={14}/> NELO ROBOTICS</a>
                <div className="mt-10"><div className="admin-eyebrow text-[#ff6b35]">CONTROL ROOM</div><h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">Network Admin</h1><p className="mt-1 text-xs text-zinc-600">Service operations console</p></div>
                <nav className="mt-10 space-y-1" aria-label="Admin sections">
                    {([{ id: "overview", label: "Overview", icon: BarChart3 }, { id: "settings", label: "Runtime settings", icon: Settings2 }, { id: "deployment", label: "Deployment health", icon: Server }] as const).map((item) => { const Icon = item.icon; return <button key={item.id} onClick={() => setTab(item.id)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs transition ${tab === item.id ? "border border-white/8 bg-white/[.06] text-white" : "text-zinc-500 hover:bg-white/[.03] hover:text-zinc-300"}`}><Icon size={15}/>{item.label}<ChevronRight className="ml-auto opacity-40" size={13}/></button>; })}
                </nav>
                <div className="mt-10 rounded-xl border border-white/8 bg-white/[.02] p-3.5"><div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-400"><ShieldCheck size={14} className="text-[#c8ff00]"/> Privileged access</div><p className="mt-2 text-[10px] leading-relaxed text-zinc-600">Admin credentials are sent directly to your Network service over HTTPS. The token is held in memory only and is never saved in this browser.</p></div>
                <div className="mt-8 hidden border-t border-white/5 pt-5 text-[10px] leading-relaxed text-zinc-700 lg:block">NELO NETWORK<br/>OPERATIONS · PRIVATE</div>
            </aside>

            <section className="min-w-0 px-4 py-5 sm:px-7 lg:px-10 lg:py-8">
                <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/8 pb-5"><div><div className="admin-eyebrow">SYSTEM / {tab.toUpperCase()}</div><h2 className="mt-1 text-lg font-medium text-white">{snapshot?.settings.network_name || "Network service"}</h2><p className="mt-1 text-[11px] text-zinc-600">{snapshot ? `Connected to ${origin}` : "Connect to your deployed shared-network backend"}</p></div><div className="flex items-center gap-2">{snapshot&&<><span className="hidden items-center gap-1.5 text-[10px] text-[#c8ff00] sm:inline-flex"><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c8ff00]"/> CONNECTED</span><button onClick={()=>void refresh()} disabled={busy} className="admin-icon-btn" aria-label="Refresh analytics"><RefreshCw size={14} className={busy?"animate-spin":""}/></button><button onClick={disconnect} className="admin-icon-btn" aria-label="Disconnect"><LogOut size={14}/></button></>}</div></header>

                {(error||notice)&&<div role="status" className={`mt-5 flex items-center gap-2 rounded-lg border px-3 py-2.5 text-xs ${error?"border-red-400/20 bg-red-400/5 text-red-200":"border-[#c8ff00]/20 bg-[#c8ff00]/5 text-[#d5ff42]"}`}>{error?<CircleAlert size={14}/>:<Check size={14}/>}<span>{error||notice}</span></div>}

                {!snapshot ? <form onSubmit={connect} className="mx-auto mt-14 max-w-xl admin-panel p-6 sm:p-8"><div className="grid h-11 w-11 place-items-center rounded-xl border border-[#ff6b35]/20 bg-[#ff6b35]/[.08] text-[#ff8050]"><LockKeyhole size={18}/></div><h3 className="mt-5 text-xl font-semibold text-white">Connect your Network</h3><p className="mt-2 text-sm leading-relaxed text-zinc-500">Enter the public URL and admin token from the Network server deployment. The token is not persisted; reconnect after refreshing this page.</p><label className="admin-label mt-6">NETWORK SERVICE URL<input required type="url" value={origin} onChange={e=>setOrigin(e.target.value)} placeholder="https://network.example.com" className="admin-input mt-2" autoComplete="url"/></label><label className="admin-label mt-4">ADMIN API TOKEN<input required type="password" value={token} onChange={e=>setToken(e.target.value)} placeholder="Paste NELO_SOCIAL_ADMIN_TOKEN" className="admin-input mt-2" autoComplete="off"/></label><button disabled={busy} className="admin-primary mt-5 w-full">{busy?<RefreshCw size={14} className="animate-spin"/>:<Zap size={14}/>}Connect to admin console</button><p className="mt-4 text-[10px] leading-relaxed text-zinc-700">Use a 32+ character random token. Configure matching `NELO_SOCIAL_ADMIN_TOKEN` and this website origin in the Network server environment before connecting.</p></form> : <>
                    {tab === "overview" && <>
                        <div className="mt-6 flex items-center justify-between"><div><p className="admin-eyebrow">LIVE TELEMETRY</p><p className="mt-1 text-[11px] text-zinc-500">Usage and activity across your shared Network instance.</p></div><div className="flex items-center gap-3"><span className="hidden text-[10px] text-zinc-600 sm:inline">UPDATED {lastUpdated ? dateTime(lastUpdated) : dateTime(snapshot.analytics.generatedAt)}</span><button onClick={exportAnalytics} className="admin-icon-btn !flex !w-auto gap-2 px-2.5 text-[9px] font-semibold tracking-widest" aria-label="Export analytics as CSV"><Download size={13}/> EXPORT</button></div></div>
                        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                            <Metric label="MEMBER ACCOUNTS" value={fmt(metrics!.users)} detail="All registered accounts" icon={Users} tint="bg-[#ff6b35]/10 text-[#ff8050]"/>
                            <Metric label="ACTIVE SESSIONS" value={fmt(metrics!.activeSessions)} detail="Sessions not yet expired" icon={Activity} tint="bg-[#c8ff00]/10 text-[#c8ff00]"/>
                            <Metric label="POSTS & COMMENTS" value={fmt(metrics!.posts + metrics!.comments)} detail={`${fmt(metrics!.posts)} posts · ${fmt(metrics!.comments)} comments`} icon={BarChart3} tint="bg-[#58c8ff]/10 text-[#58c8ff]"/>
                            <Metric label="MESSAGES" value={fmt(metrics!.messages)} detail="Across direct and group chats" icon={Zap} tint="bg-violet-400/10 text-violet-300"/>
                            <Metric label="COMMUNITIES" value={fmt(metrics!.communities)} detail="Created on this instance" icon={Globe2} tint="bg-sky-400/10 text-sky-300"/>
                            <Metric label="OPEN REPORTS" value={fmt(metrics!.openReports)} detail={`${fmt(snapshot.analytics.reports.resolved || 0)} resolved`} icon={CircleAlert} tint="bg-red-400/10 text-red-300"/>
                            <Metric label="ATTACHMENT STORAGE" value={bytes(metrics!.attachmentBytes)} detail="Uploaded community files" icon={Database} tint="bg-amber-400/10 text-amber-200"/>
                            <Metric label="SERVICE HEALTH" value="ONLINE" detail="Admin API responded successfully" icon={Server} tint="bg-emerald-400/10 text-emerald-300"/>
                        </div>
                        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(260px,.8fr)]">
                            <article className="admin-panel p-5"><div className="flex items-center justify-between"><div><h3 className="text-sm font-medium text-white">Activity over time</h3><p className="mt-1 text-[10px] text-zinc-600">Signups, posts, and messages by day</p></div><BarChart3 size={15} className="text-zinc-600"/></div><TrendChart rows={snapshot.analytics.daily}/></article>
                            <article className="admin-panel p-5"><h3 className="text-sm font-medium text-white">Most active communities</h3><p className="mt-1 text-[10px] text-zinc-600">Ranked by current membership</p><div className="mt-5 space-y-4">{snapshot.analytics.topCommunities.map((community,index)=><div key={community.slug}><div className="flex items-center justify-between gap-3"><span className="truncate text-xs text-zinc-300"><b className="mr-2 font-mono text-[10px] text-zinc-600">0{index+1}</b>{community.name}</span><span className="shrink-0 text-[10px] text-zinc-500">{fmt(community.members)}</span></div><div className="mt-2 h-1 rounded bg-white/5"><div className="h-full rounded bg-[#c8ff00]/70" style={{width:`${Math.max(5,community.members/Math.max(1,snapshot.analytics.topCommunities[0]?.members)*100)}%`}}/></div></div>)}{!snapshot.analytics.topCommunities.length&&<p className="py-5 text-xs text-zinc-600">No communities created yet.</p>}</div></article>
                        </div>
                        <article className="admin-panel mt-4 p-5"><div className="flex items-center justify-between"><div><h3 className="text-sm font-medium text-white">Admin activity</h3><p className="mt-1 text-[10px] text-zinc-600">Recent settings changes</p></div><Clock3 size={15} className="text-zinc-600"/></div><div className="mt-4 divide-y divide-white/5">{snapshot.analytics.latestAudit.map((item,index)=><div key={`${item.created_at}-${index}`} className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-[11px]"><span className="text-zinc-300">{item.detail.replaceAll("_"," ")} <span className="ml-2 text-zinc-600">{item.action}</span></span><time className="text-[10px] text-zinc-600">{dateTime(item.created_at)}</time></div>)}{!snapshot.analytics.latestAudit.length&&<p className="py-3 text-xs text-zinc-600">Settings activity will appear here.</p>}</div></article>
                    </>}

                    {tab === "settings" && <div className="mt-7 max-w-3xl"><p className="admin-eyebrow">APPLICATION CONFIGURATION</p><h3 className="mt-2 text-2xl font-semibold text-white">Runtime settings</h3><p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500">These safe application settings are stored in the Network database and update immediately. Authentication secrets, domains, tokens, and infrastructure values must be changed in your hosting provider’s environment settings.</p><form onSubmit={saveSettings} className="admin-panel mt-6 space-y-5 p-5 sm:p-7"><label className="admin-label block">NETWORK DISPLAY NAME<input className="admin-input mt-2" value={settings.network_name} maxLength={80} onChange={e=>setSettings({...settings,network_name:e.target.value})}/><span className="mt-1 block font-normal normal-case tracking-normal text-zinc-600">Displayed in the Network experience and admin console.</span></label><label className="admin-label block">PUBLIC WEBSITE URL<input className="admin-input mt-2" type="url" value={settings.public_site_url} placeholder="https://nelorobotics.tech" onChange={e=>setSettings({...settings,public_site_url:e.target.value})}/></label><label className="admin-label block">SUPPORT EMAIL<input className="admin-input mt-2" type="email" value={settings.support_email} placeholder="support@example.com" onChange={e=>setSettings({...settings,support_email:e.target.value})}/></label><div className="flex flex-col justify-between gap-3 border-t border-white/5 pt-5 sm:flex-row sm:items-center"><div><p className="admin-label">NEW ACCOUNT REGISTRATION</p><p className="mt-1 text-[11px] text-zinc-600">Close registration while keeping existing accounts active.</p></div><button type="button" role="switch" aria-checked={settings.registration_enabled === "true"} onClick={()=>setSettings({...settings,registration_enabled:settings.registration_enabled === "true"?"false":"true"})} className={`relative h-7 w-12 rounded-full transition ${settings.registration_enabled === "true"?"bg-[#c8ff00]":"bg-zinc-700"}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-[#090a0b] transition-all ${settings.registration_enabled === "true"?"left-6":"left-1"}`}/><span className="sr-only">{settings.registration_enabled === "true"?"Registration open":"Registration closed"}</span></button></div><div className="flex justify-end border-t border-white/5 pt-5"><button disabled={busy} className="admin-primary"><Save size={14}/>Save runtime settings</button></div></form></div>}

                    {tab === "deployment" && <div className="mt-7 max-w-3xl"><p className="admin-eyebrow">CONFIGURATION AUDIT</p><h3 className="mt-2 text-2xl font-semibold text-white">Deployment health</h3><p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500">Check required server settings. Secret values are never returned to the browser.</p><div className="admin-panel mt-6 divide-y divide-white/5 p-2">{checklist.map(([label,ready,key])=><div key={key} className="flex flex-wrap items-center justify-between gap-3 px-3 py-4"><div className="flex items-center gap-3"><span className={`grid h-8 w-8 place-items-center rounded-lg ${ready?"bg-[#c8ff00]/10 text-[#c8ff00]":"bg-amber-400/10 text-amber-200"}`}>{ready?<Check size={15}/>:<CircleAlert size={15}/>}</span><div><p className="text-xs font-medium text-zinc-200">{label}</p><code className="mt-1 text-[10px] text-zinc-600">{key}</code></div></div><span className={`text-[10px] font-semibold tracking-widest ${ready?"text-[#c8ff00]":"text-amber-200"}`}>{ready?"CONFIGURED":"MISSING"}</span></div>)}</div><article className="admin-panel mt-4 p-5"><h4 className="text-xs font-semibold text-white">Host-managed secrets</h4><p className="mt-2 text-xs leading-relaxed text-zinc-500">Use your server or hosting provider’s environment settings to set and rotate secrets. Never paste them into this dashboard or commit them to the website repository. Restart/redeploy the Network service after changing environment variables.</p><a href="https://github.com/nelostrix/NELO-Studio" className="mt-3 inline-flex items-center gap-1 text-[10px] text-[#58c8ff]">Network deployment guide <ExternalLink size={11}/></a></article></div>}
                </>}
            </section>
        </div>
    </main>;
}
