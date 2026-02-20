
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, 
  ArrowRight, 
  Menu, 
  X, 
  MessageSquare, 
  Send, 
  Loader2, 
  Instagram, 
  Linkedin,
  ArrowLeft,
  Cookie,
  ShieldAlert,
  Lock,
  Eye,
  Database,
  UserCheck,
  CheckCircle2,
  BookOpen,
  Scale,
  Cpu,
  Trophy
} from 'lucide-react';
import { SERVICES, MENTORS, FOUNDERS, FAQ } from './constants';

type ViewType = 'home' | 'terms' | 'cookies' | 'privacy' | 'contactForm' | 'structure' | 'baas' | 'consultancy';

const Logo: React.FC<{ className?: string; invert?: boolean }> = ({ className = "h-12", invert = true }) => (
  <img 
    src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/ordo_logo_black.png" 
    alt="ORDO Advisory" 
    className={`${className} ${invert ? 'brightness-[100] invert' : ''}`}
    style={invert ? { filter: 'brightness(0) invert(1)' } : {}}
  />
);

const Brasao: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <div className={`flex items-center justify-center bg-neutral-900 rounded-[58px] ${className}`}>
    <img 
      src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/ordo_logo_black.png" 
      alt="ORDO Brasão" 
      className="w-2/3 h-auto opacity-80 brightness-[100] invert"
      style={{ filter: 'brightness(0) invert(1)', objectFit: 'contain' }}
    />
  </div>
);

const Navbar: React.FC<{ onNavigate: (view: ViewType) => void, currentView: string }> = ({ onNavigate, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const isDarkView = currentView !== 'contactForm';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      if (currentView === 'home') {
        const sections = ['sobre', 'assessoria', 'metodo', 'expertise', 'contato'];
        const current = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 160 && rect.bottom >= 160;
          }
          return false;
        });
        if (current) setActiveSection(current);
        else if (window.scrollY < 100) setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const navLinks = [
    { name: 'Sobre', href: '#sobre', id: 'sobre' },
    { name: 'Assessoria', href: '#assessoria', id: 'assessoria' },
    { name: 'Método', href: '#metodo', id: 'metodo' },
    { name: 'Expertise', href: '#expertise', id: 'expertise' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.replace('#', '');
    
    if (currentView !== 'home') {
      e.preventDefault();
      onNavigate('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? (isDarkView ? 'bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800' : 'bg-white/95 backdrop-blur-md border-b border-neutral-100') : 'bg-transparent'} py-4 md:py-6`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => onNavigate('home')} className="hover:opacity-80 transition-opacity">
            <Logo className="h-8 md:h-10" invert={isDarkView} />
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-widest">
          {navLinks.map((link) => (
            <a 
              key={link.id}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`transition-all relative py-2 ${isDarkView ? (activeSection === link.id ? 'text-white' : 'text-neutral-400 hover:text-white') : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              {link.name}
              {activeSection === link.id && currentView === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 animate-in fade-in zoom-in duration-300"></span>
              )}
            </a>
          ))}
          <button 
            onClick={() => onNavigate('contactForm')}
            className={`px-8 py-2.5 rounded-full transition-all font-bold tracking-widest ${isDarkView ? 'bg-white text-neutral-950 hover:bg-neutral-200' : 'bg-neutral-950 text-white hover:bg-neutral-800'}`}
          >
            Contato
          </button>
        </div>

        <button className={`md:hidden p-2 ${isDarkView ? 'text-white' : 'text-neutral-900'}`} onClick={() => setIsOpen(!isOpen)} aria-label="Abrir menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className={`md:hidden absolute top-full left-0 right-0 border-b p-6 flex flex-col space-y-6 animate-in fade-in slide-in-from-top-4 shadow-2xl ${isDarkView ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-100'}`}>
          {navLinks.map((link) => (
            <a 
              key={link.id}
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.href)} 
              className={`text-xl font-bold transition-colors ${activeSection === link.id && currentView === 'home' ? 'text-emerald-500' : (isDarkView ? 'text-neutral-200' : 'text-neutral-900')}`}
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => { onNavigate('contactForm'); setIsOpen(false); }} 
            className={`text-left text-xl font-black transition-colors ${isDarkView ? 'text-white' : 'text-neutral-900'}`}
          >
            Contato
          </button>
        </div>
      )}
    </nav>
  );
};

const ContactForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    cnpj: '',
    userName: '',
    email: '',
    phone: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsDone(true);
  };

  if (isDone) {
    return (
      <div className="min-h-screen bg-white pt-40 px-6 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-500">
          <CheckCircle2 className="text-white" size={40} />
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6 tracking-tight">Recebemos sua solicitação.</h2>
        <p className="text-neutral-500 text-lg max-w-lg mb-12">
          Nossa equipe de especialistas irá analisar o seu projeto e entrará em contato em breve para o agendamento do diagnóstico estratégico.
        </p>
        <button 
          onClick={onBack}
          className="px-12 py-4 bg-neutral-900 text-white rounded-full font-bold hover:bg-neutral-800 transition-all"
        >
          Voltar para o Início
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-6 md:px-12 animate-in fade-in duration-700">
      <div className="container mx-auto max-w-5xl">
        <button 
          onClick={onBack}
          className="flex items-center text-neutral-400 font-bold mb-16 hover:text-neutral-900 transition-colors group"
        >
          <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
          Sair do formulário
        </button>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
              <div className="space-y-4">
                <span className="text-neutral-300 font-bold uppercase tracking-[0.4em] text-xs">Etapa 01 — Identificação</span>
                <h1 className="text-5xl md:text-7xl font-black text-neutral-900 tracking-tight leading-[1.1]">
                  Vamos começar pela <br /> <span className="text-neutral-400">sua empresa.</span>
                </h1>
              </div>

              <div className="space-y-16 pt-8 max-w-2xl">
                <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 group-focus-within:text-neutral-900 transition-colors">Nome da Empresa</label>
                  <input 
                    type="text" 
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Sua operação"
                    className="w-full bg-transparent border-b border-neutral-200 py-4 text-2xl md:text-3xl font-medium text-neutral-900 placeholder:text-neutral-100 focus:outline-none focus:border-neutral-900 transition-all"
                    required
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 group-focus-within:text-neutral-900 transition-colors">CNPJ da Empresa</label>
                  <input 
                    type="text" 
                    name="cnpj"
                    value={formData.cnpj}
                    onChange={handleChange}
                    placeholder="00.000.000/0000-00"
                    className="w-full bg-transparent border-b border-neutral-200 py-4 text-2xl md:text-3xl font-medium text-neutral-900 placeholder:text-neutral-100 focus:outline-none focus:border-neutral-900 transition-all"
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 group-focus-within:text-neutral-900 transition-colors">Seu Nome</label>
                  <input 
                    type="text" 
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    placeholder="Nome e Sobrenome"
                    className="w-full bg-transparent border-b border-neutral-200 py-4 text-2xl md:text-3xl font-medium text-neutral-900 placeholder:text-neutral-100 focus:outline-none focus:border-neutral-900 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="pt-12">
                <button 
                  type="button"
                  onClick={handleNext}
                  disabled={!formData.companyName || !formData.userName}
                  className="px-12 py-5 bg-neutral-900 text-white rounded-full font-black text-lg hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center"
                >
                  Continuar
                  <ArrowRight className="ml-2" size={24} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
              <div className="space-y-4">
                <span className="text-neutral-300 font-bold uppercase tracking-[0.4em] text-xs">Etapa 02 — Contato</span>
                <h1 className="text-5xl md:text-7xl font-black text-neutral-900 tracking-tight leading-[1.1]">
                  Como podemos nos <br /> <span className="text-neutral-400">comunicar?</span>
                </h1>
              </div>

              <div className="space-y-16 pt-8 max-w-2xl">
                <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 group-focus-within:text-neutral-900 transition-colors">E-mail Corporativo</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@suaempresa.com"
                    className="w-full bg-transparent border-b border-neutral-200 py-4 text-2xl md:text-3xl font-medium text-neutral-900 placeholder:text-neutral-100 focus:outline-none focus:border-neutral-900 transition-all"
                    required
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 group-focus-within:text-neutral-900 transition-colors">Telefone / WhatsApp</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    className="w-full bg-transparent border-b border-neutral-200 py-4 text-2xl md:text-3xl font-medium text-neutral-900 placeholder:text-neutral-100 focus:outline-none focus:border-neutral-900 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="pt-12 flex space-x-6">
                <button 
                  type="button"
                  onClick={handlePrev}
                  className="px-8 py-5 text-neutral-400 font-bold hover:text-neutral-900 transition-colors"
                >
                  Voltar
                </button>
                <button 
                  type="button"
                  onClick={handleNext}
                  disabled={!formData.email || !formData.phone}
                  className="px-12 py-5 bg-neutral-900 text-white rounded-full font-black text-lg hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center"
                >
                  Quase lá
                  <ArrowRight className="ml-2" size={24} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
              <div className="space-y-4">
                <span className="text-neutral-300 font-bold uppercase tracking-[0.4em] text-xs">Etapa 03 — O Projeto</span>
                <h1 className="text-5xl md:text-7xl font-black text-neutral-900 tracking-tight leading-[1.1]">
                  Conte um pouco <br /> <span className="text-neutral-400">do seu desafio.</span>
                </h1>
              </div>

              <div className="space-y-16 pt-8 max-w-2xl">
                <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 group-focus-within:text-neutral-900 transition-colors">Descreva sua necessidade (Opcional)</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Ex: Estamos estruturando uma fintech de crédito imobiliário e precisamos de apoio no BaaS e compliance..."
                    rows={4}
                    className="w-full bg-transparent border-b border-neutral-200 py-4 text-xl md:text-2xl font-medium text-neutral-900 placeholder:text-neutral-100 focus:outline-none focus:border-neutral-900 transition-all resize-none"
                  />
                </div>
              </div>

              <div className="pt-12 flex space-x-6">
                <button 
                  type="button"
                  onClick={handlePrev}
                  className="px-8 py-5 text-neutral-400 font-bold hover:text-neutral-900 transition-colors"
                >
                  Voltar
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-12 py-5 bg-emerald-500 text-white rounded-full font-black text-lg hover:bg-emerald-600 transition-all flex items-center shadow-xl shadow-emerald-500/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={24} />
                      Enviando...
                    </>
                  ) : (
                    'Solicitar Diagnóstico'
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const GenericContentPage: React.FC<{ 
  title: string, 
  subtitle: string, 
  content: React.ReactNode, 
  icon: React.ReactNode,
  onBack: () => void 
}> = ({ title, subtitle, content, icon, onBack }) => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <button 
          onClick={onBack}
          className="flex items-center text-emerald-500 font-bold mb-12 hover:text-emerald-400 transition-colors group"
        >
          <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
          Voltar para Início
        </button>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 flex items-center justify-center shrink-0">
            {icon}
          </div>
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">{title}</h1>
            <p className="text-emerald-500 font-bold uppercase tracking-widest text-sm mt-2">{subtitle}</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none text-neutral-300 space-y-8 text-lg leading-relaxed">
          {content}
        </div>
        
        <div className="mt-16 p-8 glass rounded-[40px] border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Precisa de apoio estratégico?</h3>
            <p className="text-neutral-400">Podemos estruturar sua operação com segurança e inteligência.</p>
          </div>
          <button 
            onClick={() => onBack()} // In a real app this would go to contact
            className="px-8 py-4 bg-emerald-500 text-white rounded-full font-bold hover:bg-emerald-400 transition-all whitespace-nowrap"
          >
            Falar com Especialista
          </button>
        </div>
      </div>
    </div>
  );
};

const StructurePage: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <GenericContentPage 
    onBack={onBack}
    title="Estrutura Fintech no Brasil"
    subtitle="Guia Regulatório e Operacional"
    icon={<Scale className="text-emerald-500" size={32} />}
    content={
      <>
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">O Cenário Regulatório</h2>
          <p>Estruturar uma fintech no Brasil exige um entendimento profundo das resoluções do Banco Central (BCB). Diferente de outros mercados, o ecossistema brasileiro é altamente regulado, mas oferece diversos caminhos de entrada.</p>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass p-6 rounded-2xl">
            <h3 className="text-white font-bold mb-2">Instituição de Pagamento (IP)</h3>
            <p className="text-sm">Modelos focados em emissão de moeda eletrônica, credenciamento e iniciação de pagamento.</p>
          </div>
          <div className="glass p-6 rounded-2xl">
            <h3 className="text-white font-bold mb-2">SCD e SEP</h3>
            <p className="text-sm">Sociedades de Crédito Direto e de Empréstimo entre Pessoas para operações de crédito próprias.</p>
          </div>
        </div>
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Os Pilares da Estruturação</h2>
          <p>Na Ordo Advisory, focamos em quatro pilares fundamentais para que a sua fintech saia do papel com segurança:</p>
          <ul className="space-y-4 mt-4">
            <li className="flex items-start"><ChevronRight className="text-emerald-500 mr-2 mt-1 shrink-0" size={20}/> <div><strong>Viabilidade Econômica:</strong> O modelo de negócio sustenta os custos regulatórios?</div></li>
            <li className="flex items-start"><ChevronRight className="text-emerald-500 mr-2 mt-1 shrink-0" size={20}/> <div><strong>Compliance & AML:</strong> Prevenção à Lavagem de Dinheiro não é opcional, é o core da operação.</div></li>
            <li className="flex items-start"><ChevronRight className="text-emerald-500 mr-2 mt-1 shrink-0" size={20}/> <div><strong>Arquitetura de Dados:</strong> Como as informações fluem entre você e seu parceiro bancário?</div></li>
            <li className="flex items-start"><ChevronRight className="text-emerald-500 mr-2 mt-1 shrink-0" size={20}/> <div><strong>Governança:</strong> Políticas internas que garantem a perenidade do negócio.</div></li>
          </ul>
        </section>
      </>
    }
  />
);

const BaasPage: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <GenericContentPage 
    onBack={onBack}
    title="BaaS no Brasil"
    subtitle="Banking as a Service e Ecossistemas"
    icon={<Cpu className="text-emerald-500" size={32} />}
    content={
      <>
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">O que é Banking as a Service?</h2>
          <p>O BaaS permite que empresas não financeiras ofereçam serviços bancários através de APIs conectadas a uma instituição licenciada. No Brasil, essa se tornou a principal porta de entrada para empresas que desejam monetizar suas bases de clientes.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Vantagens da Estrutura BaaS</h2>
          <p>Diferente de buscar uma licença própria (que pode levar anos), o modelo BaaS oferece:</p>
          <div className="space-y-4 mt-6">
            <div className="p-4 border-l-2 border-emerald-500 bg-white/5">
              <h4 className="text-white font-bold">Time-to-Market Reduzido</h4>
              <p className="text-sm">Lançamento em semanas ao invés de meses ou anos.</p>
            </div>
            <div className="p-4 border-l-2 border-emerald-500 bg-white/5">
              <h4 className="text-white font-bold">Foco no Produto</h4>
              <p className="text-sm">Você cuida do cliente e da experiência; o parceiro cuida da regulação.</p>
            </div>
            <div className="p-4 border-l-2 border-emerald-500 bg-white/5">
              <h4 className="text-white font-bold">Escalabilidade Operacional</h4>
              <p className="text-sm">Infraestrutura pronta para processar milhões de transações.</p>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">O Papel da Ordo no BaaS</h2>
          <p>Muitas empresas falham ao escolher o parceiro errado. Nossa consultoria ajuda no diagnóstico do melhor provedor, na negociação das taxas e na integração estratégica das políticas de risco.</p>
        </section>
      </>
    }
  />
);

const ConsultancyPage: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <GenericContentPage 
    onBack={onBack}
    title="Consultoria Fintech"
    subtitle="Estratégia Boutique de Ponta a Ponta"
    icon={<Trophy className="text-emerald-500" size={32} />}
    content={
      <>
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Consultoria vs. Assessoria de Boutique</h2>
          <p>Diferente de consultorias tradicionais que entregam relatórios genéricos, a Ordo Advisory atua como um braço estratégico da sua operação. Somos uma boutique porque focamos na exclusividade e na profundidade de cada projeto.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Nossa Metodologia 360°</h2>
          <p>Nossa atuação não termina na entrega de um projeto. Acompanhamos a liberação das credenciais e a entrada em operação:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 list-none p-0">
            <li className="flex items-center gap-3 p-4 glass rounded-xl"><CheckCircle2 className="text-emerald-500 shrink-0" size={18} /> Diagnóstico Técnico</li>
            <li className="flex items-center gap-3 p-4 glass rounded-xl"><CheckCircle2 className="text-emerald-500 shrink-0" size={18} /> Desenho Operacional</li>
            <li className="flex items-center gap-3 p-4 glass rounded-xl"><CheckCircle2 className="text-emerald-500 shrink-0" size={18} /> Organização de Dataroom</li>
            <li className="flex items-center gap-3 p-4 glass rounded-xl"><CheckCircle2 className="text-emerald-500 shrink-0" size={18} /> Interface com Liquidantes</li>
            <li className="flex items-center gap-3 p-4 glass rounded-xl"><CheckCircle2 className="text-emerald-500 shrink-0" size={18} /> Treinamento de Equipe</li>
            <li className="flex items-center gap-3 p-4 glass rounded-xl"><CheckCircle2 className="text-emerald-500 shrink-0" size={18} /> Roadmap de Evolução</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Por que a Ordo?</h2>
          <p>Acumulamos experiência em mais de 200 projetos. Sabemos onde os problemas acontecem e como evitá-los. Nossa missão é garantir que você tenha a <strong>estrutura</strong> correta antes de buscar a <strong>escala</strong>.</p>
        </section>
      </>
    }
  />
);

const TermsOfUse: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <button onClick={onBack} className="flex items-center text-emerald-500 font-bold mb-12 hover:text-emerald-400 transition-colors group">
          <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
          Voltar para Início
        </button>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">Termos de Uso</h1>
        <p className="text-emerald-500 font-bold mb-12 uppercase tracking-widest text-sm">Ordo Advisory • Última atualização: 19/02/2026</p>
        <div className="prose prose-invert max-w-none space-y-12 text-neutral-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Aceitação dos Termos</h2>
            <p className="leading-relaxed text-lg">Ao acessar este site, o usuário concorda com os presentes Termos de Uso.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Natureza da Atividade</h2>
            <p className="leading-relaxed text-lg mb-4">A Ordo Advisory é uma assessoria estratégica especializada na estruturação de fintechs.</p>
            <ul className="space-y-3 list-none pl-0">
              <li className="flex items-start"><ChevronRight className="text-emerald-500 mr-2 shrink-0 mt-1" size={18} /> <span>Não é instituição financeira.</span></li>
              <li className="flex items-start"><ChevronRight className="text-emerald-500 mr-2 shrink-0 mt-1" size={18} /> <span>Não realiza intermediação financeira.</span></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

const CookiePolicy: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <button onClick={onBack} className="flex items-center text-emerald-500 font-bold mb-12 hover:text-emerald-400 transition-colors group">
          <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
          Voltar para Início
        </button>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">Política de Cookies</h1>
        <p className="text-emerald-500 font-bold mb-12 uppercase tracking-widest text-sm">Ordo Advisory • Última atualização: 19/02/2026</p>
        <div className="prose prose-invert max-w-none space-y-12 text-neutral-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. O que são Cookies</h2>
            <p className="leading-relaxed text-lg">Cookies são pequenos arquivos de texto armazenados no seu dispositivo para melhorar sua experiência de navegação.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

const PrivacyPolicy: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <button onClick={onBack} className="flex items-center text-emerald-500 font-bold mb-12 hover:text-emerald-400 transition-colors group">
          <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
          Voltar para Início
        </button>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">Política de Privacidade</h1>
        <p className="text-emerald-500 font-bold mb-12 uppercase tracking-widest text-sm">Ordo Advisory • Última atualização: 19/02/2026</p>
        <div className="prose prose-invert max-w-none space-y-12 text-neutral-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center"><Eye className="mr-3 text-emerald-500" size={24} /> 1. Quem Somos</h2>
            <p className="leading-relaxed text-lg mb-4">A Ordo Advisory é uma assessoria estratégica especializada na estruturação de fintechs e operações BaaS no Brasil.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

const CookieConsent: React.FC<{ onAccept: () => void, onPrivacyClick: () => void }> = ({ onAccept, onPrivacyClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const consent = localStorage.getItem('ordo_cookie_consent');
    if (!consent) setTimeout(() => setIsVisible(true), 2000);
  }, []);
  const handleAction = (type: 'accept' | 'decline') => {
    localStorage.setItem('ordo_cookie_consent', type);
    setIsVisible(false);
    if (type === 'accept') onAccept();
  };
  if (!isVisible) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-6 animate-in slide-in-from-bottom-full duration-700">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 p-6 md:p-8 rounded-[32px] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0"><Cookie className="text-emerald-500" size={24} /></div>
            <div>
              <h4 className="text-white font-bold mb-1">Privacidade & Cookies</h4>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl">Utilizamos cookies para personalizar sua experiência. Ao continuar, você concorda com nossa <button onClick={onPrivacyClick} className="text-emerald-500 underline">política de privacidade</button>.</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <button onClick={() => handleAction('decline')} className="px-6 py-3 text-neutral-400 text-sm font-bold">Recusar</button>
            <button onClick={() => handleAction('accept')} className="px-8 py-3 bg-emerald-500 text-white rounded-full text-sm font-bold shadow-lg shadow-emerald-500/20">Aceitar Todos</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC<{ onStartDiagnosis: () => void, onNavigate: (view: ViewType) => void }> = ({ onStartDiagnosis, onNavigate }) => {
  return (
    <>
      <section className="relative pt-40 pb-20 md:pt-56 md:pb-32 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full"></div>
        </div>
        <div className="container mx-auto max-w-5xl text-center relative">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Boutique de Estratégia Fintech</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 gradient-text leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Estrutura estratégica <br className="hidden md:block" /> completa para fintechs.
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            Diagnóstico, assessoria operacional, compliance, documentação, negociação com parceiros e acompanhamento até a liberação das credenciais.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
            <button onClick={onStartDiagnosis} className="w-full sm:w-auto px-8 py-4 bg-white text-neutral-950 rounded-full font-bold hover:bg-neutral-200 transition-all flex items-center justify-center group">
              Solicitar Diagnóstico Estratégico
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <a href="#metodo" onClick={(e) => { e.preventDefault(); document.getElementById('metodo')?.scrollIntoView({behavior:'smooth'}); }} className="w-full sm:w-auto px-8 py-4 bg-transparent border border-neutral-800 text-white rounded-full font-bold hover:bg-white/5 transition-all">
              Conhecer nosso método
            </a>
          </div>
        </div>
      </section>

      <section id="sobre" className="py-24 px-6 scroll-mt-24">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-500 mb-6">Sobre Nós</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8">A estrutura antes da escala.</h3>
              <div className="space-y-6 text-neutral-400 text-lg leading-relaxed">
                <p>A Ordo Advisory é uma assessoria estratégica especializada na estruturação de fintechs e operações BaaS no Brasil.</p>
                <p>Atuamos de forma completa: diagnóstico de viabilidade, arquitetura operacional, organization documental, criação de políticas regulatórias e interface com parceiros.</p>
              </div>
              <div className="mt-8 flex items-center space-x-4 border-l-4 border-emerald-500 pl-6">
                <p className="text-white font-bold italic text-xl">"Não somos instituição financeira. <br/> Somos a estrutura antes da escala."</p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[60px] overflow-hidden glass p-1 relative z-10"><Brasao /></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full"></div>
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="assessoria" className="py-24 px-6 bg-neutral-900/50 scroll-mt-24">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 space-y-4 md:space-y-0">
            <div className="max-w-xl">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-500 mb-4">O Que Fazemos</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Assessoria Completa Ponta a Ponta</h3>
            </div>
            <p className="text-neutral-400 max-w-md">Não entregamos apenas documentos ou consultas. Entregamos a estrutura e participação para evitar obstáculos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, idx) => (
              <div key={idx} className="glass p-8 rounded-3xl group hover:border-emerald-500/50 transition-all duration-500">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">{service.icon}</div>
                <h4 className="text-xl font-bold mb-4 text-white">{service.title}</h4>
                <ul className="space-y-3">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-neutral-400"><ChevronRight className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Conhecimento Estratégico */}
      <section className="py-24 px-6 bg-neutral-950 border-y border-neutral-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-500 mb-4">Especialidade</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Páginas de Conhecimento</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div onClick={() => onNavigate('structure')} className="glass p-10 rounded-[40px] cursor-pointer hover:bg-white/5 transition-all group">
              <Scale className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
              <h4 className="text-2xl font-bold text-white mb-4">Estrutura Fintech no Brasil</h4>
              <p className="text-neutral-400 text-sm mb-8">Entenda as exigências regulatórias e os caminhos para operar no maior ecossistema da AL.</p>
              <span className="text-emerald-500 font-bold flex items-center text-sm uppercase tracking-widest">Saber mais <ArrowRight size={16} className="ml-2" /></span>
            </div>
            <div onClick={() => onNavigate('baas')} className="glass p-10 rounded-[40px] cursor-pointer hover:bg-white/5 transition-all group">
              <Cpu className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
              <h4 className="text-2xl font-bold text-white mb-4">BaaS no Brasil</h4>
              <p className="text-neutral-400 text-sm mb-8">Como o Banking as a Service permite que empresas comuns virem bancos em tempo recorde.</p>
              <span className="text-emerald-500 font-bold flex items-center text-sm uppercase tracking-widest">Saber mais <ArrowRight size={16} className="ml-2" /></span>
            </div>
            <div onClick={() => onNavigate('consultancy')} className="glass p-10 rounded-[40px] cursor-pointer hover:bg-white/5 transition-all group">
              <Trophy className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
              <h4 className="text-2xl font-bold text-white mb-4">Consultoria Fintech</h4>
              <p className="text-neutral-400 text-sm mb-8">Por que uma boutique estratégica é a melhor escolha para quem busca longevidade e escala.</p>
              <span className="text-emerald-500 font-bold flex items-center text-sm uppercase tracking-widest">Saber mais <ArrowRight size={16} className="ml-2" /></span>
            </div>
          </div>
        </div>
      </section>

      <section id="metodo" className="py-24 px-6 scroll-mt-24">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-20"><h2 className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-500 mb-4">Nosso Método</h2><h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Caminho para o Sucesso</h3></div>
          <div className="relative space-y-12">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-neutral-800 -translate-x-1/2 hidden md:block"></div>
            {[
              { n: "01", t: "Diagnóstico", d: "Análise profunda do modelo e viabilidade." },
              { n: "02", t: "Estruturação", d: "Desenho da arquitetura operacional e BaaS." },
              { n: "03", t: "Organização", d: "Construção do dataroom e políticas regulatórias." },
              { n: "04", t: "Interface", d: "Negociação e acompanhamento com liquidantes." },
              { n: "05", t: "Implantação", d: "Suporte assistido até a entrada em operação." },
            ].map((step, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 w-full md:w-auto mb-8 md:mb-0"><div className={`p-8 glass rounded-3xl ${i % 2 === 0 ? 'md:ml-12' : 'md:mr-12'} hover:bg-white/5 transition-colors`}><span className="text-emerald-500 font-bold text-lg mb-2 block">{step.n}</span><h4 className="text-2xl font-bold text-white mb-2">{step.t}</h4><p className="text-neutral-400">{step.d}</p></div></div>
                <div className="w-8 h-8 rounded-full bg-neutral-950 border-4 border-emerald-500 z-10 hidden md:block"></div>
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="expertise" className="py-24 px-6 bg-neutral-900/30 scroll-mt-24">
        <div className="container mx-auto">
          <div className="text-center mb-16"><h2 className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-500 mb-4">Visão Estratégica Profunda</h2><h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Mentores de Mercado</h3></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {MENTORS.map((mentor, i) => (
              <div key={i} className="flex flex-col items-center glass p-8 rounded-[40px] text-center group hover:border-white/20 transition-all">
                <img src={mentor.image} alt={mentor.name} className="w-32 h-32 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ring-4 ring-neutral-800 mb-6" />
                <h4 className="text-xl font-bold text-white mb-1">{mentor.name}</h4>
                <p className="text-emerald-500 font-bold uppercase tracking-widest text-[10px] mb-4">{mentor.role}</p>
                <p className="text-neutral-400 text-sm leading-relaxed italic">"{mentor.description}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="py-24 px-6 scroll-mt-24">
        <div className="container mx-auto max-w-5xl glass p-12 md:p-20 rounded-[60px] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Pronto para estruturar?</h2>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">Elevamos sua fintech para o nível de boutique estratégica. Agende agora uma reunião de diagnóstico.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button onClick={onStartDiagnosis} className="w-full sm:w-auto px-12 py-5 bg-white text-neutral-900 rounded-full font-bold hover:bg-neutral-200 transition-all">Falar com Especialista</button>
          </div>
        </div>
      </section>
    </>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('home');

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${view === 'contactForm' ? 'bg-white' : 'bg-neutral-950'}`}>
      <Navbar onNavigate={setView} currentView={view} />
      
      {view === 'home' && <Home onStartDiagnosis={() => setView('contactForm')} onNavigate={setView} />}
      {view === 'terms' && <TermsOfUse onBack={() => setView('home')} />}
      {view === 'cookies' && <CookiePolicy onBack={() => setView('home')} />}
      {view === 'privacy' && <PrivacyPolicy onBack={() => setView('home')} />}
      {view === 'contactForm' && <ContactForm onBack={() => setView('home')} />}
      {view === 'structure' && <StructurePage onBack={() => setView('home')} />}
      {view === 'baas' && <BaasPage onBack={() => setView('home')} />}
      {view === 'consultancy' && <ConsultancyPage onBack={() => setView('home')} />}

      {view !== 'contactForm' && (
        <footer className="pt-16 pb-0 border-t border-neutral-900 bg-neutral-950">
          <div className="container mx-auto px-6 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-6">
                  <button onClick={() => setView('home')}><Logo className="h-8 md:h-10" invert={true} /></button>
                </div>
                <p className="text-neutral-500 text-sm max-w-sm mb-6">A Ordo Advisory é uma assessoria estratégica especializada em estruturação de fintechs.</p>
                <div className="text-neutral-600 text-xs space-y-1 mb-8">
                  <p className="font-bold text-neutral-500 uppercase tracking-widest text-[10px]">Informações Corporativas</p>
                  <p>Ordo Advisory Ltda</p>
                  <p>CNPJ: 64.666.677/0001-46</p>
                  <p>São Paulo, SP, Brasil</p>
                </div>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/company/ordo-advisory/" className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-all"><Linkedin size={18} /></a>
                  <a href="https://www.instagram.com/ordoadvisory/" className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-all"><Instagram size={18} /></a>
                </div>
              </div>
              <div>
                <h5 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Artigos & Estrutura</h5>
                <ul className="space-y-4 text-sm text-neutral-500">
                  <li><button onClick={() => setView('structure')} className="hover:text-white transition-colors">Estrutura Fintech Brasil</button></li>
                  <li><button onClick={() => setView('baas')} className="hover:text-white transition-colors">BaaS no Brasil</button></li>
                  <li><button onClick={() => setView('consultancy')} className="hover:text-white transition-colors">Consultoria Fintech</button></li>
                </ul>
              </div>
              <div>
                <h5 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Jurídico</h5>
                <ul className="space-y-4 text-sm text-neutral-500">
                  <li><button onClick={() => setView('privacy')} className="hover:text-white transition-colors">Privacidade</button></li>
                  <li><button onClick={() => setView('terms')} className="hover:text-white transition-colors">Termos de Uso</button></li>
                  <li><button onClick={() => setView('cookies')} className="hover:text-white transition-colors">Cookies</button></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="py-8 bg-neutral-950 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] text-neutral-600 font-medium tracking-widest uppercase container mx-auto px-6">
            <span>© 2026 ORDO ADVISORY. TODOS OS DIREITOS RESERVADOS.</span>
            <span>STRATEGIC BOUTIQUE • FINTECH ADVISORY</span>
          </div>
        </footer>
      )}

      {view !== 'contactForm' && <CookieConsent onAccept={() => {}} onPrivacyClick={() => setView('privacy')} />}
    </div>
  );
};

export default App;
