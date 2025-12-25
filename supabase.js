// supabase.js
const SUPABASE_URL = 'https://jgjlgdbwhkelyyxxgenq.supabase.co'; // ← ALTERE
const SUPABASE_ANON_KEY = 'sb_publishable_QDJ3xuSHtYltCtxwYdn52Q_3MWPaaZi';               // ← ALTERE

const supabase = window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Normaliza telefone: remove +258, espaços → 9 dígitos
function normalizarTelefone(phone) {
  return phone.replace(/\D/g, '').replace(/^258/, '').padStart(9, '8');
}

// Verifica login (use em páginas protegidas)
async function verificarLogin() {
  const {  { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = '/login.html';
    return;
  }
  // Salva info do usuário globalmente
  window.usuarioLogado = session.user;
}

// Logout
function fazerLogout() {
  supabase.auth.signOut().then(() => {
    window.location.href = '/login.html';
  });
}