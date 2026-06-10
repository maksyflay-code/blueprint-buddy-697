import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Truck,
  FileText,
  Wrench,
  Inbox,
  FolderArchive,
  Users,
  Banknote,
  Bell,
  Search,
  Menu,
  X,
  Gavel,
  HardHat,
  UserCog,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

const navComercial = [
  { to: "/", label: "Painel Executivo", icon: LayoutDashboard },
  { to: "/licitacoes", label: "Licitações", icon: Gavel, badge: "4" },
  { to: "/obras", label: "Obras / Projetos", icon: HardHat },
  { to: "/clientes", label: "Clientes", icon: Users },
] as const;

const navOperacional = [
  { to: "/equipamentos", label: "Equipamentos", icon: Truck },
  { to: "/locacoes", label: "Locações", icon: FileText },
  { to: "/frota-interna", label: "Frota Interna", icon: Car, badge: "1" },
  { to: "/manutencao", label: "Manutenção", icon: Wrench, badge: "3" },
  { to: "/compras", label: "Compras", icon: ShoppingCart },
] as const;

const navAdmin = [
  { to: "/solicitacoes", label: "Solicitações Internas", icon: Inbox, badge: "8" },
  { to: "/documentos", label: "Documentos", icon: FolderArchive },
  { to: "/equipe", label: "Equipe / RH", icon: UserCog },
  { to: "/financeiro", label: "Financeiro", icon: Banknote },
] as const;

function NavItem({
  to,
  label,
  icon: Icon,
  badge,
  active,
  onClick,
}: {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  badge?: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
        active
          ? "bg-accent text-foreground font-medium border border-border/60"
          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
      }`}
    >
      <Icon className="size-4" strokeWidth={1.75} />
      <span className="flex-1 truncate">{label}</span>
      {badge && (
        <span className="text-[10px] bg-destructive/10 text-destructive px-1.5 py-0.5 rounded font-mono font-medium">
          {badge}
        </span>
      )}
    </Link>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));
  return (
    <>
      <div className="p-6 flex items-center gap-3">
        <div className="size-8 bg-primary grid place-items-center text-primary-foreground font-bold rounded-sm font-mono shrink-0">
          V
        </div>
        <div className="flex flex-col leading-tight min-w-0">
          <span className="font-bold tracking-tight text-base">VETOR ERP</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
            Engenharia
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto pb-4">
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2 mb-2">
          Comercial & Obras
        </div>
        {navComercial.map((item) => (
          <NavItem key={item.to} {...item} active={isActive(item.to)} onClick={onNavigate} />
        ))}

        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2 mt-6 mb-2">
          Operacional
        </div>
        {navOperacional.map((item) => (
          <NavItem key={item.to} {...item} active={isActive(item.to)} onClick={onNavigate} />
        ))}

        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2 mt-6 mb-2">
          Administrativo
        </div>
        {navAdmin.map((item) => (
          <NavItem key={item.to} {...item} active={isActive(item.to)} onClick={onNavigate} />
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="size-9 rounded-full bg-gradient-to-br from-primary/40 to-primary grid place-items-center text-primary-foreground text-xs font-bold shrink-0">
            RM
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold truncate">Eng. Ricardo M.</span>
            <span className="text-[10px] text-muted-foreground truncate">Gestor de Frota</span>
          </div>
        </div>
      </div>
    </>
  );
}

export function AppLayout({ children }: { children?: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-border flex-col sticky top-0 h-screen bg-sidebar shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-background/70 backdrop-blur-sm animate-in fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-50 h-screen w-72 max-w-[85vw] bg-sidebar border-r border-border flex flex-col transition-transform duration-200 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 size-8 grid place-items-center rounded-md hover:bg-accent text-muted-foreground"
          aria-label="Fechar menu"
        >
          <X className="size-4" />
        </button>
        <SidebarContent onNavigate={() => setMobileOpen(false)} />
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-14 sm:h-16 border-b border-border bg-card flex items-center gap-3 px-4 sm:px-6 lg:px-8 sticky top-0 z-30 backdrop-blur">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden size-9 grid place-items-center hover:bg-accent rounded-md text-muted-foreground -ml-1"
            aria-label="Abrir menu"
          >
            <Menu className="size-5" />
          </button>

          <div className="flex items-center gap-2 lg:hidden">
            <div className="size-7 bg-primary grid place-items-center text-primary-foreground font-bold rounded-sm font-mono text-sm">
              V
            </div>
            <span className="font-bold tracking-tight text-sm">VETOR</span>
          </div>

          <div className="flex-1 flex items-center gap-4 max-w-xl">
            <div className="hidden sm:block flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Pesquisar frota, contratos ou documentos..."
                className="w-full bg-accent/50 border-none rounded-md py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-primary/30 outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            <div className="hidden xl:flex items-center gap-2 text-[10px] font-mono text-muted-foreground uppercase">
              <span className="size-1.5 rounded-full bg-success pulse-dot" />
              Servidor: <span className="text-success">Online</span>
            </div>
            <button
              className="sm:hidden size-9 grid place-items-center hover:bg-accent rounded-md text-muted-foreground"
              aria-label="Pesquisar"
            >
              <Search className="size-4" />
            </button>
            <button className="size-9 grid place-items-center hover:bg-accent rounded-full text-muted-foreground transition-colors relative">
              <Bell className="size-4" />
              <span className="absolute top-2 right-2 size-1.5 bg-primary rounded-full" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">{children ?? <Outlet />}</div>
      </main>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
      <div className="min-w-0">
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
          Vetor ERP / {title}
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight truncate">{title}</h1>
        {subtitle && <p className="text-xs sm:text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </div>
  );
}

export function StatusBadge({
  variant,
  children,
}: {
  variant: "success" | "warning" | "destructive" | "muted" | "primary";
  children: ReactNode;
}) {
  const styles = {
    success: "bg-success/15 text-success",
    warning: "bg-warning/20 text-warning-foreground",
    destructive: "bg-destructive/15 text-destructive",
    muted: "bg-muted text-muted-foreground",
    primary: "bg-primary/15 text-primary",
  };
  return (
    <span
      className={`px-1.5 py-0.5 text-[9px] font-bold rounded uppercase tracking-tighter whitespace-nowrap ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
