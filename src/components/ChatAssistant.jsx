import { useEffect, useRef, useState } from 'react';
import { Bot, MessageCircle, Send, X, Minus } from 'lucide-react';

const knowledge = [
  { keys: ['about','who','yourself','introduce','sino','asnor'], answer: "I'm Asnor Ali, a Grade 11 student and aspiring web developer from the Philippines. I enjoy building thoughtful, responsive digital experiences and learning by creating real projects." },
  { keys: ['skill','stack','technology','language','tech'], answer: "My current toolkit includes HTML, CSS, JavaScript, React, Next.js, TypeScript, Python, Java, Luau, Git/GitHub, Vite, Vercel, Supabase, PostgreSQL and MongoDB fundamentals. I'm continuously improving these skills." },
  { keys: ['project','work','built','portfolio'], answer: "Some projects I'm working on include MUNI, a student study-planner platform; Wicked Coffee, a coffee-shop website concept; and KDYNN Market. You can explore the Work section for project details. Some are works in progress or concepts." },
  { keys: ['muni'], answer: "MUNI is a student-focused study planner and review platform concept, with schedules, reminders, reviewers, flashcards and quizzes. It is currently in development." },
  { keys: ['wicked','coffee'], answer: "Wicked Coffee is a website concept created to explore a cozy, artistic and community-driven coffee brand experience. It is a demo concept, not an official business website." },
  { keys: ['kydnn','k dynn','market'], answer: "KDYNN Market is one of my web project showcases. Check the Work section for its current project details." },
  { keys: ['education','school','grade','study'], answer: "I'm currently a Grade 11 senior high school student while developing my skills in web development." },
  { keys: ['certificate','credential','training','breakpoint'], answer: "I completed the BreakpointLabs Full-Stack Developer Program in September 2026, including all 74 activities. You can view the supporting credential and my CV in the Credentials section." },
  { keys: ['contact','email','hire','reach','message'], answer: "You can reach me at asnorali.dev@gmail.com, or use the Contact section on this portfolio. You can also find my LinkedIn and GitHub through the social links." },
  { keys: ['github','linkedin','facebook','social'], answer: "Find me on GitHub at github.com/azuleermenu-dot and LinkedIn at linkedin.com/in/asnor-ali-006b50446. The homepage has my social links." },
  { keys: ['hire','service','website','freelance'], answer: "I'm interested in creating websites and digital experiences based on a client's goals. Send a message through the Contact section and tell me about your project." }
];

function replyTo(message) {
  const q = message.toLowerCase();
  const match = knowledge.find((item) => item.keys.some((key) => q.includes(key)));
  if (match) return match.answer;
  if (/(hi|hello|hey|kumusta|kamusta)/i.test(q)) return "Hey! Thanks for stopping by. Ask me about Asnor, skills, projects, education, credentials or contact details.";
  return "I don't have a verified answer for that yet. Try asking about my background, tech stack, projects, MUNI, credentials or how to contact me.";
}

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'assistant', text: "Hey! I'm Asnor's portfolio assistant. Ask me about his background, skills, projects or credentials." }]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { if (open && !minimized) bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, open, minimized]);
  useEffect(() => { if (open && !minimized) inputRef.current?.focus(); }, [open, minimized]);

  const send = (value = input) => {
    const text = value.trim();
    if (!text) return;
    setMessages((current) => [...current, { role: 'user', text }, { role: 'assistant', text: replyTo(text) }]);
    setInput('');
  };

  return (
    <aside className="portfolio-chat" aria-label="Portfolio chat assistant">
      {open && !minimized && <section className="portfolio-chat__panel" role="dialog" aria-label="Chat with portfolio assistant">
        <header className="portfolio-chat__header">
          <div className="portfolio-chat__avatar"><Bot size={18} /></div>
          <div><strong>Asnor's Assistant</strong><small><i /> Portfolio guide · Usually replies instantly</small></div>
          <button type="button" onClick={() => setMinimized(true)} aria-label="Minimize chat"><Minus size={17} /></button>
          <button type="button" onClick={() => { setOpen(false); setMinimized(false); }} aria-label="Close chat"><X size={17} /></button>
        </header>
        <div className="portfolio-chat__messages" aria-live="polite">
          {messages.map((message, index) => <div key={index} className={`portfolio-chat__message portfolio-chat__message--${message.role}`}>
            <span>{message.text}</span><small>{message.role === 'assistant' ? 'ASNOR / ASSISTANT' : 'YOU'}</small>
          </div>)}
          <div ref={bottomRef} />
        </div>
        {messages.length === 1 && <div className="portfolio-chat__suggestions">
          {['Tell me about Asnor', 'What are his skills?', 'Show me his projects'].map((q) => <button key={q} type="button" onClick={() => send(q)}>{q}</button>)}
        </div>}
        <form className="portfolio-chat__form" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask me anything..." aria-label="Your message" maxLength={500} />
          <button type="submit" aria-label="Send message" disabled={!input.trim()}><Send size={17} /></button>
        </form>
        <p className="portfolio-chat__note">Answers are based on information published on this portfolio.</p>
      </section>}
      <button className={`portfolio-chat__launcher ${open && !minimized ? 'is-open' : ''}`} type="button" onClick={() => { setOpen(true); setMinimized(false); }} aria-label="Open portfolio chat">
        {open && !minimized ? <X size={21} /> : <><MessageCircle size={20} /><span>Ask about me</span></>}
      </button>
    </aside>
  );
}
