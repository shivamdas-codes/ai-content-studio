import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Sparkles, WandSparkles, Copy, Check, RefreshCw, FileText, MessageSquareText, BriefcaseBusiness, Linkedin, Mail, ChevronDown, Zap, ShieldCheck, Menu, X, ArrowUpRight, Clock3, Stars } from 'lucide-react';
import './styles.css';

const modes = [
  { id: 'blog', label: 'Blog post', icon: FileText, hint: 'Write an engaging blog post' },
  { id: 'social', label: 'Social caption', icon: MessageSquareText, hint: 'Create a scroll-stopping caption' },
  { id: 'email', label: 'Professional email', icon: Mail, hint: 'Draft a clear, professional email' },
  { id: 'linkedin', label: 'LinkedIn post', icon: Linkedin, hint: 'Share an idea with your network' },
  { id: 'resume', label: 'Resume bullet', icon: BriefcaseBusiness, hint: 'Turn work into strong resume bullets' },
];
const demo = {
  blog: `# Why every developer should learn to build with AI\n\nAI is changing the way software gets made. It is not replacing the fundamentals of development; it is giving developers a faster way to explore ideas, test solutions and focus on the problems that matter.\n\n## Start with the problem\n\nThe best AI-assisted projects begin with a clear user problem. Define who you are building for, what they need, and what a successful outcome looks like. Then use AI to help plan the smallest useful version.\n\n## Keep ownership of the code\n\nTreat AI output as a first draft, not a final answer. Read the code, test edge cases, check accessibility and understand every dependency. Your engineering judgement is still the most important part of the process.\n\n## Build, measure and improve\n\nShip a focused feature, gather feedback and iterate. Small releases make it easier to spot mistakes and learn what users actually value.\n\n**The takeaway:** AI makes experimentation faster. Strong fundamentals, curiosity and careful execution turn that speed into useful products.`,
  social: `Building with AI is not about letting a tool do all the thinking. It's about shortening the distance between an idea and a working prototype.\n\nMy approach: stay curious, understand the code, test the output, and keep shipping. 🚀\n\n#WebDevelopment #BuildInPublic #AI`,
  email: `Subject: Follow-up on the project discussion\n\nHi [Name],\n\nThank you for taking the time to discuss the project. I appreciated the opportunity to understand the goals and priorities.\n\nI am following up to see if there are any updates or next steps I should prepare for. Please let me know if you need any additional information from my side.\n\nBest regards,\n[Your Name]`,
  linkedin: `I've been exploring how AI-assisted development can make the building process more iterative.\n\nOne lesson stands out: prompting is only one part of the workflow. Good results also require clear requirements, code review, testing and a willingness to refine the output.\n\nI'm focused on building practical projects, learning the underlying technologies and sharing what I discover along the way.\n\nWhat has been the most useful part of your AI development workflow?\n\n#AI #WebDevelopment #LearningInPublic`,
  resume: `• Built responsive, user-focused web interfaces using React, JavaScript and modern CSS, with attention to reusable components and maintainable code.\n• Integrated third-party APIs and handled asynchronous data states, loading feedback and error scenarios.\n• Used AI coding assistants to accelerate prototyping and debugging while reviewing and validating generated code.`
};

function App() {
  const [mode, setMode] = useState('blog');
  const [topic, setTopic] = useState('The future of AI-powered web development');
  const [tone, setTone] = useState('Professional');
  const [length, setLength] = useState('Medium');
  const [audience, setAudience] = useState('Developers and tech enthusiasts');
  const [result, setResult] = useState('');
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeMode = modes.find(m => m.id === mode);

  async function generate() {
    if (!topic.trim()) { setError('Add a topic or brief before generating.'); return; }
    setBusy(true); setError(''); setCopied(false);
    const key = import.meta.env.VITE_GEMINI_API_KEY;
    if (!key) {
      await new Promise(resolve => setTimeout(resolve, 850));
      setResult(`${demo[mode]}\n\n---\nDemo preview: add your Gemini API key in .env to generate original content for your own prompt.`);
      setBusy(false); return;
    }
    try {
      const prompt = `You are a skilled content writer. Create a ${length.toLowerCase()} ${activeMode.label.toLowerCase()} in a ${tone.toLowerCase()} tone for ${audience}. Topic / brief: ${topic}. Make it useful, specific, well-structured and ready to edit. Do not invent facts or statistics. Return only the content.`;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 1200 } })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'Could not reach Gemini. Check your API key and try again.');
      const text = data.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('');
      if (!text) throw new Error('The AI returned an empty response. Please try again.');
      setResult(text);
    } catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }
  async function copyResult() {
    if (!result) return;
    try { await navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    catch { setError('Clipboard access is unavailable in this browser. Select and copy the text instead.'); }
  }
  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="brand"><div className="brand-mark"><Sparkles size={19}/></div><span>prompt<span className="brand-accent">forge</span></span><button className="mobile-close" onClick={() => setMobileOpen(false)}><X size={18}/></button></div>
      <div className="side-label">WORKSPACE</div>
      <button className="nav-item active"><WandSparkles size={17}/> AI Studio <span className="nav-dot"/></button>
      <div className="side-label templates-label">QUICK TEMPLATES</div>
      {modes.map(m => <button key={m.id} className={`nav-item ${mode === m.id ? 'selected' : ''}`} onClick={() => { setMode(m.id); setResult(''); setMobileOpen(false); }}><m.icon size={17}/>{m.label}</button>)}
      <div className="sidebar-bottom"><div className="pro-card"><div className="pro-icon"><Stars size={17}/></div><strong>Make ideas happen.</strong><p>Your focused space for AI-assisted writing and creation.</p></div><div className="profile"><div className="avatar">PF</div><div><strong>Personal workspace</strong><small>Free plan · Demo mode</small></div><ChevronDown size={15}/></div></div>
    </aside>
    {mobileOpen && <button className="scrim" onClick={() => setMobileOpen(false)} aria-label="Close menu"/>}
    <main className="main-area">
      <header className="topbar"><button className="menu-btn" onClick={() => setMobileOpen(true)}><Menu size={20}/></button><div className="breadcrumb">Workspace <span>/</span> <strong>AI Studio</strong></div><div className="top-right"><span className="status"><i/> All systems normal</span><div className="top-avatar">S</div></div></header>
      <div className="content-wrap">
        <section className="welcome"><div><div className="eyebrow"><span className="eyebrow-line"/> YOUR AI WRITING WORKSPACE</div><h1>Ideas into words.<br/><span>Words into impact.</span></h1><p>Make your next great thing. Choose a format, share your brief, and let AI help you get the first draft moving.</p></div><div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-spark"><Sparkles size={42}/></div><div className="float-card float-one"><Zap size={14}/> Faster first drafts</div><div className="float-card float-two"><ShieldCheck size={14}/> You stay in control</div></div></section>
        <div className="studio-grid">
          <section className="panel create-panel"><div className="panel-heading"><div><div className="panel-kicker">LET'S CREATE</div><h2>Start with a brief</h2></div><span className="step-count">01 <span>/ 02</span></span></div>
            <label className="field-label">What are we creating?</label><div className="mode-grid">{modes.map(m => <button key={m.id} className={`mode-card ${mode === m.id ? 'chosen' : ''}`} onClick={() => {setMode(m.id);setResult('');}}><m.icon size={18}/><span>{m.label}</span>{mode === m.id && <Check className="mode-check" size={14}/>}</button>)}</div>
            <label className="field-label" htmlFor="topic">Your topic or brief</label><textarea id="topic" value={topic} onChange={e => setTopic(e.target.value)} placeholder="Describe what you want to create..." rows="4"/><div className="field-hint">Be clear about the goal, key points, or message you want to communicate.</div>
            <div className="field-row"><div><label className="field-label" htmlFor="tone">Tone of voice</label><select id="tone" value={tone} onChange={e => setTone(e.target.value)}><option>Professional</option><option>Friendly</option><option>Confident</option><option>Casual</option><option>Persuasive</option><option>Creative</option></select></div><div><label className="field-label" htmlFor="length">Content length</label><select id="length" value={length} onChange={e => setLength(e.target.value)}><option>Short</option><option>Medium</option><option>Long</option></select></div></div>
            <label className="field-label" htmlFor="audience">Who is this for?</label><input id="audience" value={audience} onChange={e => setAudience(e.target.value)} placeholder="e.g. Startup founders, students..."/>
            {error && <div className="error-msg">{error}</div>}
            <button className="generate-btn" onClick={generate} disabled={busy}>{busy ? <><RefreshCw className="spin" size={17}/> Creating your draft...</> : <><Sparkles size={17}/> Generate with AI <ArrowUpRight size={16}/></>}</button>
            <div className="privacy-note"><ShieldCheck size={14}/> Review AI-generated content before publishing.</div>
          </section>
          <section className="panel output-panel"><div className="panel-heading output-heading"><div><div className="panel-kicker">YOUR CREATION</div><h2>Here's your draft</h2></div><span className="output-icon"><FileText size={18}/></span></div>
            {!result ? <div className="empty-state"><div className="empty-illustration"><div className="empty-page"><div/><div/><div/><div/></div><div className="empty-star"><Sparkles size={20}/></div></div><h3>Your next idea starts here</h3><p>Your generated content will appear here. Fine-tune your brief and hit generate when you're ready.</p><div className="empty-tip"><Sparkles size={14}/> Tip: Specific briefs lead to stronger results.</div></div> : <><div className="result-meta"><span><i/> Draft ready</span><span><Clock3 size={13}/> Just now</span></div><div className="result-text">{result}</div><div className="result-actions"><button className="copy-btn" onClick={copyResult}>{copied ? <Check size={15}/> : <Copy size={15}/>} {copied ? 'Copied!' : 'Copy text'}</button><button className="regenerate-btn" onClick={generate} disabled={busy}><RefreshCw size={15}/> Regenerate</button></div></>}
          </section>
        </div>
        <footer className="footer"><span>© 2026 PromptForge</span><span>Built with curiosity <span className="heart">✦</span> and AI</span><span className="footer-right">A learning project · React + Gemini API</span></footer>
      </div>
    </main>
  </div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
