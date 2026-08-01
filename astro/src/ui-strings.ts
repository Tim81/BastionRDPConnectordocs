// GENERATED FILE — do not edit by hand.
//
// Every user-visible label in the schematic screens comes from here, lifted
// verbatim from source/Localization.cs in the BastionRDPConnector repo. The
// first version of these figures invented its translations (the German screen
// said "Monitore" and "Einzeln" where the application says "Monitor-Konfiguration" and
// "Einzelner Monitor"), so nothing here is typed by hand any more.
//
// Regenerate with:
//   node scripts/extract-strings.mjs <path-to>/source/Localization.cs src/ui-strings.ts
//
// Keys resolved: 50

export type Lang = 'en' | 'nl' | 'de' | 'fr' | 'es' | 'pt';

export const UI: Record<string, Record<Lang, string>> = {
  "AppTitle": {
    "en": "Azure Bastion RDP Connector",
    "nl": "Azure Bastion RDP Connector",
    "de": "Azure Bastion RDP Connector",
    "fr": "Azure Bastion RDP Connector",
    "es": "Azure Bastion RDP Connector",
    "pt": "Azure Bastion RDP Connector"
  },
  "Language": {
    "en": "🌐 Language",
    "nl": "🌐 Taal",
    "de": "🌐 Sprache",
    "fr": "🌐 Langue",
    "es": "🌐 Idioma",
    "pt": "🌐 Idioma"
  },
  "Refresh": {
    "en": "Refresh",
    "nl": "Ververs",
    "de": "Aktualisieren",
    "fr": "Actualiser",
    "es": "Actualizar",
    "pt": "Atualizar"
  },
  "Connect": {
    "en": "Connect",
    "nl": "Verbinden",
    "de": "Verbinden",
    "fr": "Connecter",
    "es": "Conectar",
    "pt": "Ligar"
  },
  "Change": {
    "en": "Change",
    "nl": "Wijzig",
    "de": "Ändern",
    "fr": "Modifier",
    "es": "Cambiar",
    "pt": "Alterar"
  },
  "OK": {
    "en": "OK",
    "nl": "OK",
    "de": "OK",
    "fr": "OK",
    "es": "OK",
    "pt": "OK"
  },
  "Loading": {
    "en": "Loading...",
    "nl": "Laden...",
    "de": "Laden...",
    "fr": "Chargement...",
    "es": "Cargando...",
    "pt": "A carregar..."
  },
  "Exit": {
    "en": "Exit",
    "nl": "Afsluiten",
    "de": "Beenden",
    "fr": "Quitter",
    "es": "Salir",
    "pt": "Sair"
  },
  "Show": {
    "en": "Show",
    "nl": "Toon",
    "de": "Anzeigen",
    "fr": "Afficher",
    "es": "Mostrar",
    "pt": "Mostrar"
  },
  "BastionSubscription": {
    "en": "Bastion Subscription",
    "nl": "Bastion Subscription",
    "de": "Bastion-Abonnement",
    "fr": "Abonnement Bastion",
    "es": "Suscripción de Bastion",
    "pt": "Subscrição de Bastion"
  },
  "VMSubscription": {
    "en": "VM Subscription",
    "nl": "VM Subscription",
    "de": "VM Subscription",
    "fr": "Abonnement VM",
    "es": "Suscripción de VM",
    "pt": "Subscrição de VM"
  },
  "Bastion": {
    "en": "Bastion",
    "nl": "Bastion",
    "de": "Bastion",
    "fr": "Bastion",
    "es": "Bastion",
    "pt": "Bastion"
  },
  "VirtualMachine": {
    "en": "Virtual Machine",
    "nl": "Virtuele Machine",
    "de": "Virtueller Computer",
    "fr": "Machine virtuelle",
    "es": "Máquina virtual",
    "pt": "Máquina virtual"
  },
  "IPAddress": {
    "en": "IP Address",
    "nl": "IP-adres",
    "de": "IP-Adresse",
    "fr": "Adresse IP",
    "es": "Dirección IP",
    "pt": "Endereço IP"
  },
  "TargetPort": {
    "en": "Target Port",
    "nl": "Doel poort",
    "de": "Zielport",
    "fr": "Port cible",
    "es": "Puerto de destino",
    "pt": "Porta de destino"
  },
  "LocalPort": {
    "en": "Local Port",
    "nl": "Lokale poort",
    "de": "Lokaler Port",
    "fr": "Port local",
    "es": "Puerto local",
    "pt": "Porta local"
  },
  "TabIPAddress": {
    "en": "IP Address",
    "nl": "IP-adres",
    "de": "IP-Adresse",
    "fr": "Adresse IP",
    "es": "Dirección IP",
    "pt": "Endereço IP"
  },
  "TabAzureVM": {
    "en": "Azure VM",
    "nl": "Azure VM",
    "de": "Azure VM",
    "fr": "Azure VM",
    "es": "Azure VM",
    "pt": "Azure VM"
  },
  "TabActiveTunnels": {
    "en": "Active Tunnels",
    "nl": "Actieve Tunnels",
    "de": "Aktive Tunnel",
    "fr": "Tunnels actifs",
    "es": "Túneles activos",
    "pt": "Túneis ativos"
  },
  "ConnectionMethod": {
    "en": "Connection Method",
    "nl": "Verbindingsmethode",
    "de": "Verbindungsmethode",
    "fr": "Méthode de connexion",
    "es": "Método de conexión",
    "pt": "Método de ligação"
  },
  "ConnectionMethodTunnel": {
    "en": "Tunnel",
    "nl": "Tunnel",
    "de": "Tunnel",
    "fr": "Tunnel",
    "es": "Túnel",
    "pt": "Túnel"
  },
  "ConnectionMethodRDGateway": {
    "en": "RD Gateway",
    "nl": "RD Gateway",
    "de": "RD Gateway",
    "fr": "RD Gateway",
    "es": "RD Gateway",
    "pt": "RD Gateway"
  },
  "StopTunnel": {
    "en": "Stop Tunnel",
    "nl": "Tunnel stoppen",
    "de": "Tunnel stoppen",
    "fr": "Arrêter le tunnel",
    "es": "Detener túnel",
    "pt": "Parar túnel"
  },
  "TunnelConnectedMessage": {
    "en": "{0} → localhost:{1}",
    "nl": "{0} → localhost:{1}",
    "de": "{0} → localhost:{1}",
    "fr": "{0} → localhost:{1}",
    "es": "{0} → localhost:{1}",
    "pt": "{0} → localhost:{1}"
  },
  "NoActiveTunnels": {
    "en": "No active tunnels",
    "nl": "Geen actieve tunnels",
    "de": "Keine aktiven Tunnel",
    "fr": "Aucun tunnel actif",
    "es": "No hay túneles activos",
    "pt": "Nenhum túnel ativo"
  },
  "NoActiveTunnelsMessage": {
    "en": "No active tunnels.\n\nCreate a connection in the IP Address or Azure VM tab.",
    "nl": "Geen actieve tunnels.\n\nMaak een verbinding in het IP-adres of Azure VM tabblad.",
    "de": "Keine aktiven Tunnel.\n\nErstellen Sie eine Verbindung in der IP-Adresse oder Azure VM Registerkarte.",
    "fr": "Aucun tunnel actif.\n\nCréez une connexion dans l'onglet Adresse IP ou Azure VM.",
    "es": "No hay túneles activos.\n\nCree una conexión en la pestaña Dirección IP o Azure VM.",
    "pt": "Nenhum túnel ativo.\n\nCrie uma ligação no separador Endereço IP ou Azure VM."
  },
  "TunnelTarget": {
    "en": "Target",
    "nl": "Doel",
    "de": "Ziel",
    "fr": "Cible",
    "es": "Destino",
    "pt": "Destino"
  },
  "ConnectRDP": {
    "en": "Connect RDP",
    "nl": "Verbind RDP",
    "de": "RDP verbinden",
    "fr": "Connecter RDP",
    "es": "Conectar RDP",
    "pt": "Conectar RDP"
  },
  "PowerState": {
    "en": "Power State",
    "nl": "Status",
    "de": "Status",
    "fr": "État",
    "es": "Estado",
    "pt": "Estado"
  },
  "RefreshPowerState": {
    "en": "Refresh power state",
    "nl": "Status verversen",
    "de": "Status aktualisieren",
    "fr": "Actualiser l'état",
    "es": "Actualizar estado",
    "pt": "Atualizar estado"
  },
  "PowerStateRunning": {
    "en": "Running",
    "nl": "Actief",
    "de": "Aktiv",
    "fr": "En cours d'exécution",
    "es": "En ejecución",
    "pt": "Em execução"
  },
  "StartVM": {
    "en": "Start VM",
    "nl": "Start VM",
    "de": "VM starten",
    "fr": "Démarrer la VM",
    "es": "Iniciar VM",
    "pt": "Iniciar VM"
  },
  "UseEntraIdAuth": {
    "en": "Use EntraID Authentication",
    "nl": "Gebruik EntraID Authenticatie",
    "de": "EntraID-Authentifizierung verwenden",
    "fr": "Utiliser l'authentification EntraID",
    "es": "Usar autenticación de EntraID",
    "pt": "Usar autenticação EntraID"
  },
  "EntraIdAuthInfo": {
    "en": "Enable for same-tenant VMs. Disable for cross-tenant or partner VMs.",
    "nl": "Inschakelen voor VM's in dezelfde tenant. Uitschakelen voor cross-tenant of partner VM's.",
    "de": "Aktivieren für VMs im selben Mandanten. Deaktivieren für mandantenübergreifende oder Partner-VMs.",
    "fr": "Activer pour les VM du même locataire. Désactiver pour les VM inter-locataires ou partenaires.",
    "es": "Habilitar para VM del mismo inquilino. Deshabilitar para VM entre inquilinos o de socios.",
    "pt": "Ativar para VMs do mesmo inquilino. Desativar para VMs entre inquilinos ou parceiros."
  },
  "MonitorConfiguration": {
    "en": "Monitor Configuration",
    "nl": "Monitor Configuratie",
    "de": "Monitor-Konfiguration",
    "fr": "Configuration des moniteurs",
    "es": "Configuración de monitores",
    "pt": "Configuração de monitores"
  },
  "SingleMonitor": {
    "en": "Single Monitor",
    "nl": "Enkel beeldscherm",
    "de": "Einzelner Monitor",
    "fr": "Moniteur unique",
    "es": "Monitor único",
    "pt": "Monitor único"
  },
  "AllMonitors": {
    "en": "All Monitors",
    "nl": "Alle schermen",
    "de": "Alle Monitore",
    "fr": "Tous les moniteurs",
    "es": "Todos los monitores",
    "pt": "Todos os monitores"
  },
  "Logout": {
    "en": "Logout",
    "nl": "Afmelden",
    "de": "Abmelden",
    "fr": "Se déconnecter",
    "es": "Cerrar sesión",
    "pt": "Sair"
  },
  "Account": {
    "en": "Account",
    "nl": "Account",
    "de": "Konto",
    "fr": "Compte",
    "es": "Cuenta",
    "pt": "Conta"
  },
  "SelectTenant": {
    "en": "Select Azure Tenant",
    "nl": "Selecteer Azure Tenant",
    "de": "Azure-Mandant auswählen",
    "fr": "Sélectionner le locataire Azure",
    "es": "Seleccionar inquilino de Azure",
    "pt": "Selecionar inquilino do Azure"
  },
  "AboutMenuItem": {
    "en": "About Azure Bastion RDP Connector",
    "nl": "Over Azure Bastion RDP Connector",
    "de": "Über Azure Bastion RDP Connector",
    "fr": "À propos d'Azure Bastion RDP Connector",
    "es": "Acerca de Azure Bastion RDP Connector",
    "pt": "Sobre Azure Bastion RDP Connector"
  },
  "About": {
    "en": "About",
    "nl": "Over",
    "de": "Über",
    "fr": "À propos",
    "es": "Acerca de",
    "pt": "Sobre"
  },
  "OpenLogFolder": {
    "en": "Open Log Folder",
    "nl": "Open logmap",
    "de": "Log-Ordner öffnen",
    "fr": "Ouvrir le dossier de log",
    "es": "Abrir carpeta de log",
    "pt": "Abrir pasta de log"
  },
  "CopyDiagnosticInfo": {
    "en": "Copy Diagnostic Info",
    "nl": "Diagnostische info kopiëren",
    "de": "Diagnoseinformationen kopieren",
    "fr": "Copier les informations de diagnostic",
    "es": "Copiar información de diagnóstico",
    "pt": "Copiar informações de diagnóstico"
  },
  "Close": {
    "en": "Close",
    "nl": "Sluiten",
    "de": "Schließen",
    "fr": "Fermer",
    "es": "Cerrar",
    "pt": "Fechar"
  },
  "VmSearchPlaceholder": {
    "en": "Filter on VM name...",
    "nl": "Filter op VM-naam...",
    "de": "Nach VM-Name filtern...",
    "fr": "Filtrer par nom de VM...",
    "es": "Filtrar por nombre de VM...",
    "pt": "Filtrar por nome da VM..."
  },
  "VmTagFilterPlaceholder": {
    "en": "Filter by tag (key:value)",
    "nl": "Filter op tag (sleutel:waarde)",
    "de": "Nach Tag filtern (Schlüssel:Wert)",
    "fr": "Filtrer par balise (clé:valeur)",
    "es": "Filtrar por etiqueta (clave:valor)",
    "pt": "Filtrar por tag (chave:valor)"
  },
  "SearchCurrentSubscription": {
    "en": "VM Subscription",
    "nl": "VM Subscription",
    "de": "VM-Abonnement",
    "fr": "Abonnement VM",
    "es": "Suscripción de VM",
    "pt": "Subscrição de VM"
  },
  "SearchAllSubscriptions": {
    "en": "All subscriptions",
    "nl": "Alle subscriptions",
    "de": "Alle Abonnements",
    "fr": "Tous les abonnements",
    "es": "Todas las subs",
    "pt": "Todas as subscrições"
  },
  "AllSubscriptions": {
    "en": "All subscriptions",
    "nl": "Alle abonnementen",
    "de": "Alle Abonnements",
    "fr": "Tous les abonnements",
    "es": "Todas las suscripciones",
    "pt": "Todas as subscrições"
  }
} as const;

/** Look up an application string. Falls back to English, then to the key. */
export function s(key: string, lang: Lang = 'en'): string {
  const row = UI[key];
  if (!row) return key;
  return row[lang] ?? row.en ?? key;
}

/** Split a multi-line application string into lines for <text> runs. */
export function lines(key: string, lang: Lang = 'en'): string[] {
  return s(key, lang).split('\n');
}
