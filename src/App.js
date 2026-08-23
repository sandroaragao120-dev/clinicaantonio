import { useState, useRef, useEffect } from "react";

const EMPRESA = {
  nome: "AtendePro",
  slogan: "Gestão de Atendimento",
  cor: "#1E40AF",
  corClara: "#DBEAFE",
  inicial: "A",
};

const USUARIOS = [
  { email: "admin@atendepro.com", senha: "admin123", nome: "Administrador", cargo: "Admin" },
  { email: "atendente@atendepro.com", senha: "123456", nome: "Atendente", cargo: "Atendente" },
];

function TelaLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function handleLogin() {
    setErro("");
    if (!email.trim()) { setErro("Digite seu e-mail."); return; }
    if (!senha.trim()) { setErro("Digite sua senha."); return; }
    setCarregando(true);
    setTimeout(() => {
      const user = USUARIOS.find(u => u.email === email && u.senha === senha);
      if (user) { onLogin(user); }
      else { setErro("E-mail ou senha incorretos."); setCarregando(false); }
    }, 1000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: `linear-gradient(135deg, ${EMPRESA.cor}, #7c3aed)` }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mb-4 shadow-lg" style={{ background: EMPRESA.cor }}>{EMPRESA.inicial}</div>
          <h1 className="text-2xl font-bold text-gray-800">{EMPRESA.nome}</h1>
          <p className="text-sm text-gray-400">{EMPRESA.slogan}</p>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">E-mail</label>
            <input value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="seu@email.com" type="email" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Senha</label>
            <div className="relative">
              <input value={senha} onChange={e => setSenha(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 pr-10"
                placeholder="••••••••" type={mostrarSenha ? "text" : "password"} />
              <button onClick={() => setMostrarSenha(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{mostrarSenha ? "🙈" : "👁️"}</button>
            </div>
          </div>
          {erro && <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-2 rounded-xl">{erro}</div>}
          <button onClick={handleLogin} disabled={carregando} className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all disabled:opacity-60" style={{ background: EMPRESA.cor }}>
            {carregando ? "⏳ Entrando..." : "Entrar →"}
          </button>
        </div>
        <div className="mt-6 p-3 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-400 font-semibold mb-1">Acesso de teste:</p>
          <p className="text-xs text-gray-500">📧 admin@atendepro.com</p>
          <p className="text-xs text-gray-500">🔑 admin123</p>
        </div>
      </div>
    </div>
  );
}

const now = () => new Date();
const fmtHora = d => d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
const fmtData = d => new Date(d + "T00:00").toLocaleDateString("pt-BR");
const diffMin = (a, b) => Math.floor((b - a) / 60000);
const SLA_LIMITE = { Alta: 60, Média: 180, Baixa: 480 };
const mkDate = m => { const d = new Date(); d.setMinutes(d.getMinutes() - m); return d; };
const isMobile = () => window.innerWidth < 768;

const initialTickets = [
  { id: 1, cliente: "Maria Silva", assunto: "Produto com defeito", prioridade: "Alta", status: "Aberto", data: "2026-08-20", descricao: "Recebi o produto com a embalagem danificada.", atendente: "João", criadoEm: mkDate(75) },
  { id: 2, cliente: "Carlos Souza", assunto: "Dúvida sobre fatura", prioridade: "Média", status: "Em andamento", data: "2026-08-19", descricao: "Não entendi itens da minha fatura.", atendente: "Ana", criadoEm: mkDate(120) },
  { id: 3, cliente: "Fernanda Lima", assunto: "Cancelamento de pedido", prioridade: "Baixa", status: "Resolvido", data: "2026-08-18", descricao: "Gostaria de cancelar o pedido #4521.", atendente: "João", criadoEm: mkDate(300) },
  { id: 4, cliente: "Roberto Alves", assunto: "Entrega atrasada", prioridade: "Alta", status: "Aberto", data: "2026-08-20", descricao: "Meu pedido deveria ter chegado há 5 dias.", atendente: "", criadoEm: mkDate(30) },
  { id: 5, cliente: "Juliana Costa", assunto: "Troca de produto", prioridade: "Média", status: "Em andamento", data: "2026-08-17", descricao: "Quero trocar o produto por outro tamanho.", atendente: "Ana", criadoEm: mkDate(200) },
];

const initialChats = [
  { id: 1, nome: "Maria Silva", telefone: "(81) 99999-1111", avatar: "M", cor: "bg-pink-400", status: "online", ultimaMensagem: "Oi, quero saber sobre meu pedido!", hora: "10:32", naoLidas: 2, mensagens: [{ id: 1, texto: "Olá! Boa tarde!", de: "cliente", hora: "10:30" }, { id: 2, texto: "Oi Maria! Como posso ajudar?", de: "atendente", hora: "10:31" }, { id: 3, texto: "Quero saber sobre meu pedido!", de: "cliente", hora: "10:32" }] },
  { id: 2, nome: "Carlos Souza", telefone: "(81) 98888-2222", avatar: "C", cor: "bg-blue-400", status: "offline", ultimaMensagem: "Ok, aguardo.", hora: "09:15", naoLidas: 0, mensagens: [{ id: 1, texto: "Bom dia! Tenho uma dúvida.", de: "cliente", hora: "09:10" }, { id: 2, texto: "Bom dia! Qual a dúvida?", de: "atendente", hora: "09:12" }, { id: 3, texto: "Ok, aguardo.", de: "cliente", hora: "09:15" }] },
  { id: 3, nome: "Roberto Alves", telefone: "(81) 97777-3333", avatar: "R", cor: "bg-green-400", status: "online", ultimaMensagem: "Meu pedido não chegou!", hora: "11:05", naoLidas: 1, mensagens: [{ id: 1, texto: "Meu pedido não chegou!", de: "cliente", hora: "11:05" }] },
];

const respostasRapidas = ["Olá! Como posso te ajudar? 😊", "Aguarde um momento.", "Seu pedido está sendo processado.", "Problema resolvido!", "Vou encaminhar seu caso."];
const prioColors = { Alta: "bg-red-100 text-red-700", Média: "bg-yellow-100 text-yellow-700", Baixa: "bg-green-100 text-green-700" };
const statusColors = { Aberto: "bg-blue-100 text-blue-700", "Em andamento": "bg-orange-100 text-orange-700", Resolvido: "bg-gray-100 text-gray-500" };
const statusIcons = { Aberto: "🔵", "Em andamento": "🟠", Resolvido: "✅" };

function SLABadge({ ticket }) {
  const [, forceRender] = useState(0);
  useEffect(() => { const t = setInterval(() => forceRender(n => n + 1), 30000); return () => clearInterval(t); }, []);
  if (ticket.status === "Resolvido") return <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">✅ Resolvido</span>;
  const elapsed = diffMin(ticket.criadoEm, now());
  const limite = SLA_LIMITE[ticket.prioridade];
  const pct = Math.min(100, Math.round((elapsed / limite) * 100));
  const vencido = elapsed > limite;
  return (
    <div className="flex flex-col gap-0.5">
      <span className={`text-xs font-semibold ${vencido ? "text-red-600" : pct > 75 ? "text-orange-500" : "text-green-600"}`}>{vencido ? "⚠️ Vencido" : `⏱ ${limite - elapsed}min`}</span>
      <div className="w-20 bg-gray-100 rounded-full h-1.5"><div className={`h-1.5 rounded-full ${vencido ? "bg-red-500" : pct > 75 ? "bg-orange-400" : "bg-green-400"}`} style={{ width: `${pct}%` }}></div></div>
    </div>
  );
}

export default function App() {
  const [tickets, setTickets] = useState(initialTickets);
  const [chats, setChats] = useState(initialChats);
  const [page, setPage] = useState("dashboard");
  const [selected, setSelected] = useState(null);
  const [chatAtivo, setChatAtivo] = useState(null);
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [searchChat, setSearchChat] = useState("");
  const [form, setForm] = useState({ cliente: "", assunto: "", prioridade: "Média", descricao: "", atendente: "" });
  const [formErr, setFormErr] = useState({});
  const [msgInput, setMsgInput] = useState("");
  const [showRespostas, setShowRespostas] = useState(false);
  const [notifs, setNotifs] = useState([]);
  const [mobile, setMobile] = useState(isMobile());
  const [user, setUser] = useState(null);
  const msgEndRef = useRef(null);

  if (!user) return <TelaLogin onLogin={setUser} />;

  useEffect(() => {
    const handleResize = () => setMobile(isMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = tickets.length;
  const abertos = tickets.filter(t => t.status === "Aberto").length;
  const andamento = tickets.filter(t => t.status === "Em andamento").length;
  const resolvidos = tickets.filter(t => t.status === "Resolvido").length;
  const totalNaoLidas = chats.reduce((a, c) => a + c.naoLidas, 0);
  const filtered = tickets.filter(t => (filter === "Todos" || t.status === filter) && (search === "" || t.cliente.toLowerCase().includes(search.toLowerCase()) || t.assunto.toLowerCase().includes(search.toLowerCase())));
  const filteredChats = chats.filter(c => searchChat === "" || c.nome.toLowerCase().includes(searchChat.toLowerCase()));

  useEffect(() => { msgEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatAtivo, chats]);

  function addNotif(msg) {
    const key = Date.now().toString();
    setNotifs(prev => [...prev, { key, msg }]);
    setTimeout(() => setNotifs(prev => prev.filter(n => n.key !== key)), 4000);
  }

  function openTicket(t) { setSelected(t); setPage("detalhe"); }

  function updateStatus(id, status) {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    setSelected(prev => ({ ...prev, status }));
    addNotif(`Status: "${status}"`);
  }

  function submitForm() {
    const e = {};
    if (!form.cliente.trim()) e.cliente = "Campo obrigatório";
    if (!form.assunto.trim()) e.assunto = "Campo obrigatório";
    if (!form.descricao.trim()) e.descricao = "Campo obrigatório";
    if (Object.keys(e).length) { setFormErr(e); return; }
    setTickets(prev => [{ ...form, id: prev.length + 1, status: "Aberto", data: new Date().toISOString().slice(0, 10), criadoEm: now() }, ...prev]);
    setForm({ cliente: "", assunto: "", prioridade: "Média", descricao: "", atendente: "" });
    setFormErr({});
    addNotif("✅ Chamado registrado!");
    setPage("atendimentos");
  }

  function abrirChat(chat) { setChatAtivo(chat.id); setChats(prev => prev.map(c => c.id === chat.id ? { ...c, naoLidas: 0 } : c)); }

  function enviarMensagem(texto) {
    if (!texto.trim() || !chatAtivo) return;
    setChats(prev => prev.map(c => c.id === chatAtivo ? { ...c, mensagens: [...c.mensagens, { id: Date.now(), texto, de: "atendente", hora: fmtHora(now()) }], ultimaMensagem: texto } : c));
    setMsgInput(""); setShowRespostas(false);
  }

  function exportarRelatorio() {
    const linhas = [["ID", "Cliente", "Assunto", "Prioridade", "Status", "Atendente", "Data"], ...tickets.map(t => [t.id, t.cliente, t.assunto, t.prioridade, t.status, t.atendente || "—", t.data])];
    const blob = new Blob(["\uFEFF" + linhas.map(r => r.join(";")).join("\n")], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "relatorio.csv"; a.click();
    addNotif("📄 Relatório exportado!");
  }

  const chatAtivoData = chats.find(c => c.id === chatAtivo);
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "atendimentos", label: "Chamados", icon: "📋" },
    { id: "whatsapp", label: "WhatsApp", icon: "💬", badge: totalNaoLidas },
    { id: "relatorio", label: "Relatório", icon: "📄" },
    { id: "novo", label: "Novo", icon: "➕" },
  ];

  const navStyle = id => page === id || (page === "detalhe" && id === "atendimentos")
    ? { background: EMPRESA.corClara, color: EMPRESA.cor, fontWeight: 600 }
    : { color: "#4b5563" };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Inter, sans-serif", display: "flex", flexDirection: mobile ? "column" : "row" }}>
      <aside className="bg-white flex flex-col" style={{ width: mobile ? "100%" : "220px", borderRight: mobile ? "none" : "1px solid #e5e7eb", borderBottom: mobile ? "1px solid #e5e7eb" : "none" }}>
        {!mobile && (
          <div className="p-5" style={{ background: EMPRESA.cor }}>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center font-bold text-lg" style={{ color: EMPRESA.cor }}>{EMPRESA.inicial}</div>
              <div><p className="font-bold text-white text-sm">{EMPRESA.nome}</p><p className="text-xs text-blue-200">{EMPRESA.slogan}</p></div>
            </div>
          </div>
        )}
        <nav className={mobile ? "flex flex-row overflow-x-auto p-2 gap-1" : "flex-1 p-3"}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all whitespace-nowrap relative ${mobile ? "flex-col text-xs gap-0.5 min-w-14 justify-center" : "w-full mb-1"}`} style={navStyle(n.id)}>
              <span className={mobile ? "text-xl" : ""}>{n.icon}</span>
              <span>{n.label}</span>
              {n.badge > 0 && <span className="text-white text-xs rounded-full w-4 h-4 flex items-center justify-center absolute top-0 right-0" style={{ background: EMPRESA.cor }}>{n.badge}</span>}
            </button>
          ))}
        </nav>
        {!mobile && (
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: EMPRESA.cor }}>{user.nome[0]}</div>
              <div><p className="text-xs font-semibold text-gray-700">{user.nome}</p><p className="text-xs text-gray-400">{user.cargo}</p></div>
              <button onClick={() => setUser(null)} className="ml-auto text-xs text-red-400 hover:text-red-600" title="Sair">🚪</button>
            </div>
          </div>
        )}
      </aside>

      <main className="flex-1 flex flex-col overflow-auto">
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {mobile && <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: EMPRESA.cor }}>{EMPRESA.inicial}</div>}
            <h1 className="text-base font-bold text-gray-800">
              {page === "dashboard" && "Dashboard"}{page === "atendimentos" && "Atendimentos"}
              {page === "whatsapp" && "WhatsApp"}{page === "relatorio" && "Relatório"}
              {page === "novo" && "Novo Chamado"}{page === "detalhe" && "Detalhe"}
            </h1>
          </div>
          <div className="flex gap-2 items-center">
            {notifs.map(n => <div key={n.key} className="text-xs px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hidden md:block">{n.msg}</div>)}
          </div>
        </header>

        <div className="flex-1 p-4">
          {page === "dashboard" && (
            <div>
              <div className={`grid gap-3 mb-4 ${mobile ? "grid-cols-2" : "grid-cols-4"}`}>
                {[{ label: "Total", val: total, icon: "📁" }, { label: "Abertos", val: abertos, icon: "🔵" }, { label: "Em Andamento", val: andamento, icon: "🟠" }, { label: "Resolvidos", val: resolvidos, icon: "✅" }].map((c, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2"><p className="text-xs text-gray-500">{c.label}</p><span>{c.icon}</span></div>
                    <p className="text-2xl font-bold text-gray-800">{c.val}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-4 flex items-center justify-between text-white mb-4" style={{ background: `linear-gradient(135deg, ${EMPRESA.cor}, #7c3aed)` }}>
                <div><p className="font-bold text-sm mb-1">🚀 {EMPRESA.nome}</p><p className="text-xs opacity-80">Sistema de Atendimento Profissional</p></div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-700">Chamados Recentes</p>
                  <button onClick={() => setPage("atendimentos")} className="text-xs" style={{ color: EMPRESA.cor }}>Ver todos</button>
                </div>
                {tickets.slice(0, 5).map(t => (
                  <div key={t.id} className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer" onClick={() => openTicket(t)}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-700">{t.cliente}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[t.status]}`}>{statusIcons[t.status]} {t.status}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-400">{t.assunto}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${prioColors[t.prioridade]}`}>{t.prioridade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {page === "atendimentos" && (
            <div>
              <div className="flex gap-2 mb-3 flex-wrap items-center">
                <div className="flex gap-1 flex-wrap">
                  {["Todos", "Aberto", "Em andamento", "Resolvido"].map(f => (
                    <button key={f} onClick={() => setFilter(f)} className="px-3 py-1 rounded-full text-xs font-medium border transition-all"
                      style={filter === f ? { background: EMPRESA.cor, color: "white", borderColor: EMPRESA.cor } : { background: "white", color: "#6b7280", borderColor: "#e5e7eb" }}>
                      {f} {f !== "Todos" && <span className="opacity-70">{tickets.filter(t => t.status === f).length}</span>}
                    </button>
                  ))}
                </div>
                <input value={search} onChange={e => setSearch(e.target.value)} className="flex-1 min-w-32 border border-gray-200 rounded-full px-3 py-1 text-xs outline-none" placeholder="🔍 Buscar..." />
                <button onClick={() => setPage("novo")} className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ background: EMPRESA.cor }}>+ Novo</button>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                {filtered.length === 0 && <p className="px-4 py-8 text-center text-gray-400 text-sm">Nenhum chamado encontrado.</p>}
                {filtered.map(t => (
                  <div key={t.id} className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer" onClick={() => openTicket(t)}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-700">{t.cliente}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[t.status]}`}>{statusIcons[t.status]} {t.status}</span>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-gray-500">{t.assunto}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${prioColors[t.prioridade]}`}>{t.prioridade}</span>
                    </div>
                    <SLABadge ticket={t} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {page === "whatsapp" && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden" style={{ height: mobile ? "calc(100vh - 200px)" : "calc(100vh - 160px)", display: "flex" }}>
              {(!mobile || !chatAtivo) && (
                <div className={mobile ? "w-full flex flex-col" : "w-72 border-r border-gray-100 flex flex-col"} style={{ background: "#f0f2f5" }}>
                  <div className="p-3" style={{ background: EMPRESA.cor }}>
                    <p className="text-white font-semibold text-sm mb-2">💬 WhatsApp</p>
                    <input value={searchChat} onChange={e => setSearchChat(e.target.value)} className="w-full px-3 py-1.5 rounded-full text-xs outline-none bg-white" placeholder="Buscar..." />
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {filteredChats.map(c => (
                      <div key={c.id} onClick={() => abrirChat(c)} className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-gray-100 ${chatAtivo === c.id ? "bg-white" : "hover:bg-gray-100"}`}>
                        <div className="relative">
                          <div className={`w-10 h-10 rounded-full ${c.cor} flex items-center justify-center text-white font-bold text-sm`}>{c.avatar}</div>
                          <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${c.status === "online" ? "bg-green-400" : "bg-gray-300"}`}></span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between"><p className="text-sm font-semibold text-gray-800 truncate">{c.nome}</p><p className="text-xs text-gray-400">{c.hora}</p></div>
                          <div className="flex justify-between"><p className="text-xs text-gray-500 truncate">{c.ultimaMensagem}</p>{c.naoLidas > 0 && <span className="text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1" style={{ background: EMPRESA.cor }}>{c.naoLidas}</span>}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {!chatAtivo && !mobile && <div className="flex-1 flex flex-col items-center justify-center" style={{ background: "#e5ddd5" }}><div className="text-5xl mb-3">💬</div><p className="text-gray-500 text-sm">Selecione uma conversa</p></div>}
              {chatAtivo && (
                <div className="flex-1 flex flex-col" style={{ background: "#e5ddd5" }}>
                  <div className="flex items-center gap-3 px-4 py-3" style={{ background: EMPRESA.cor }}>
                    {mobile && <button onClick={() => setChatAtivo(null)} className="text-white text-lg mr-1">←</button>}
                    <div className={`w-8 h-8 rounded-full ${chatAtivoData?.cor} flex items-center justify-center text-white font-bold text-sm`}>{chatAtivoData?.avatar}</div>
                    <div><p className="text-white font-semibold text-sm">{chatAtivoData?.nome}</p><p className="text-blue-200 text-xs">{chatAtivoData?.status === "online" ? "🟢 online" : "⚫ offline"}</p></div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
                    {chatAtivoData?.mensagens.map(m => (
                      <div key={m.id} className={`flex ${m.de === "atendente" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-xs px-3 py-2 rounded-lg shadow-sm text-sm ${m.de === "atendente" ? "rounded-br-none" : "bg-white rounded-bl-none"}`} style={m.de === "atendente" ? { background: "#d1fae5" } : {}}>
                          <p className="text-gray-800">{m.texto}</p>
                          <p className="text-right text-xs text-gray-400 mt-1">{m.hora} {m.de === "atendente" && "✓✓"}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={msgEndRef} />
                  </div>
                  {showRespostas && (
                    <div className="px-3 py-2 bg-white border-t border-gray-100">
                      <p className="text-xs text-gray-400 mb-1">⚡ Respostas rápidas</p>
                      <div className="flex flex-col gap-1">{respostasRapidas.map((r, i) => <button key={i} onClick={() => enviarMensagem(r)} className="text-left text-xs px-3 py-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-gray-700">{r}</button>)}</div>
                    </div>
                  )}
                  <div className="px-3 py-2 bg-white border-t border-gray-100 flex items-center gap-2">
                    <button onClick={() => setShowRespostas(p => !p)} className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={showRespostas ? { background: EMPRESA.cor, color: "white" } : { background: "#f3f4f6", color: "#6b7280" }}>⚡</button>
                    <input value={msgInput} onChange={e => setMsgInput(e.target.value)} onKeyDown={e => e.key === "Enter" && enviarMensagem(msgInput)} className="flex-1 border border-gray-200 rounded-full px-3 py-2 text-sm outline-none" placeholder="Digite..." />
                    <button onClick={() => enviarMensagem(msgInput)} className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm" style={{ background: EMPRESA.cor }}>➤</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {page === "relatorio" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">Visão geral dos atendimentos.</p>
                <button onClick={exportarRelatorio} className="flex items-center gap-2 px-4 py-2 text-white text-xs font-semibold rounded-lg" style={{ background: EMPRESA.cor }}>📥 Exportar CSV</button>
              </div>
              <div className={`grid gap-3 mb-4 ${mobile ? "grid-cols-2" : "grid-cols-4"}`}>
                {[{ label: "Total", val: total }, { label: "Resolução", val: `${Math.round((resolvidos / total) * 100)}%` }, { label: "SLA Vencidos", val: tickets.filter(t => t.status !== "Resolvido" && diffMin(t.criadoEm, now()) > SLA_LIMITE[t.prioridade]).length }, { label: "Tempo Médio", val: `${Math.round(tickets.reduce((a, t) => a + diffMin(t.criadoEm, now()), 0) / total)}min` }].map((c, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-center">
                    <p className="text-2xl font-bold text-gray-800">{c.val}</p>
                    <p className="text-xs text-gray-400 mt-1">{c.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                {tickets.map(t => {
                  const elapsed = diffMin(t.criadoEm, now());
                  const vencido = t.status !== "Resolvido" && elapsed > SLA_LIMITE[t.prioridade];
                  return (
                    <div key={t.id} className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer" onClick={() => openTicket(t)}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-700">{t.cliente}</p>
                        <span className={`text-xs font-semibold ${t.status === "Resolvido" ? "text-green-500" : vencido ? "text-red-500" : "text-green-600"}`}>{t.status === "Resolvido" ? "✅ OK" : vencido ? "⚠️ Vencido" : "✅ No prazo"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${prioColors[t.prioridade]}`}>{t.prioridade}</span>
                        <p className="text-xs text-gray-400">{elapsed}min / {SLA_LIMITE[t.prioridade]}min</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {page === "novo" && (
            <div className="max-w-2xl">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex flex-col gap-3 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Nome do Cliente *</label>
                    <input value={form.cliente} onChange={e => setForm(p => ({ ...p, cliente: e.target.value }))} className={`w-full border rounded-lg px-3 py-2 text-sm outline-none ${formErr.cliente ? "border-red-400" : "border-gray-200"}`} placeholder="Ex: Maria Silva" />
                    {formErr.cliente && <p className="text-xs text-red-500 mt-1">{formErr.cliente}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Assunto *</label>
                    <input value={form.assunto} onChange={e => setForm(p => ({ ...p, assunto: e.target.value }))} className={`w-full border rounded-lg px-3 py-2 text-sm outline-none ${formErr.assunto ? "border-red-400" : "border-gray-200"}`} placeholder="Ex: Produto com defeito" />
                    {formErr.assunto && <p className="text-xs text-red-500 mt-1">{formErr.assunto}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Prioridade</label>
                      <select value={form.prioridade} onChange={e => setForm(p => ({ ...p, prioridade: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
                        <option>Alta</option><option>Média</option><option>Baixa</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Atendente</label>
                      <input value={form.atendente} onChange={e => setForm(p => ({ ...p, atendente: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none" placeholder="Nome" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Descrição *</label>
                    <textarea value={form.descricao} onChange={e => setForm(p => ({ ...p, descricao: e.target.value }))} rows={4} className={`w-full border rounded-lg px-3 py-2 text-sm outline-none resize-none ${formErr.descricao ? "border-red-400" : "border-gray-200"}`} placeholder="Descreva o problema..." />
                    {formErr.descricao && <p className="text-xs text-red-500 mt-1">{formErr.descricao}</p>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={submitForm} className="flex-1 py-2.5 text-white text-sm font-semibold rounded-lg" style={{ background: EMPRESA.cor }}>Registrar Chamado</button>
                  <button onClick={() => setPage("atendimentos")} className="px-4 py-2.5 bg-gray-100 text-gray-600 text-sm rounded-lg">Cancelar</button>
                </div>
              </div>
            </div>
          )}

          {page === "detalhe" && selected && (() => {
            const t = tickets.find(t => t.id === selected.id) || selected;
            return (
              <div className="max-w-2xl">
                <button onClick={() => setPage("atendimentos")} className="flex items-center gap-1 text-sm mb-4" style={{ color: EMPRESA.cor }}>← Voltar</button>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div><p className="text-xs text-gray-400 mb-1">Chamado #{t.id} • {fmtData(t.data)}</p><h2 className="text-base font-bold text-gray-800">{t.assunto}</h2></div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[t.status]}`}>{statusIcons[t.status]} {t.status}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div><p className="text-xs text-gray-400">Cliente</p><p className="text-xs font-semibold text-gray-700">{t.cliente}</p></div>
                    <div><p className="text-xs text-gray-400">Prioridade</p><span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${prioColors[t.prioridade]}`}>{t.prioridade}</span></div>
                    <div><p className="text-xs text-gray-400">Atendente</p><p className="text-xs font-semibold text-gray-700">{t.atendente || "—"}</p></div>
                  </div>
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-400 mb-1">SLA</p><SLABadge ticket={t} /></div>
                  <div className="mb-4"><p className="text-xs font-semibold text-gray-500 mb-2">DESCRIÇÃO</p><p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{t.descricao}</p></div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2">ATUALIZAR STATUS</p>
                    <div className="flex gap-2 flex-wrap">
                      {["Aberto", "Em andamento", "Resolvido"].map(s => (
                        <button key={s} onClick={() => updateStatus(t.id, s)} className="flex-1 py-2 rounded-lg text-xs font-medium border transition-all"
                          style={t.status === s ? { background: EMPRESA.cor, color: "white", borderColor: EMPRESA.cor } : { background: "white", color: "#4b5563", borderColor: "#e5e7eb" }}>
                          {statusIcons[s]} {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </main>
    </div>
  );
}