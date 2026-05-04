

const sb = SUPABASE_URL.includes("PEGA_AQUI") ? null : supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
let cloud = false;
let activeCode = "";
let activeClient = "";

async function login(){
  const code=document.getElementById("codeInput").value.trim().toUpperCase();
  if(!code)return;
  const err=document.getElementById("loginError"); err.style.display="none";
  if(!sb){err.textContent="Supabase no está configurado. Revisa SUPABASE_URL y SUPABASE_ANON_KEY en el HTML."; err.style.display="block"; return;}
  document.getElementById("loginBtn").textContent="Comprobando…";
  const {data,error}=await sb.from("briefings").select("*").eq("access_code",code).single();
  document.getElementById("loginBtn").textContent="Acceder";
  if(error||!data){err.style.display="block";return;}
  cloud=true; activeCode=data.access_code; activeClient=data.client_name; setData(data.responses||{}); openApp();
  setSync("ok","Conectado · nube"); if(data.updated_at) document.getElementById("lastSaved").textContent=new Date(data.updated_at).toLocaleString("es-ES");
}

function startLocal(){
  console.warn("Modo local desactivado. El formulario debe conectarse a Supabase.");
}

async function save(show=false){
  const data=getData(),now=new Date();
  if(!cloud||!sb){setSync("err","No conectado a Supabase");console.error("Guardado bloqueado: Supabase no está conectado.");return;}
  setSync("","Guardando…");
  const {error}=await sb.from("briefings").update({responses:data,updated_at:now.toISOString()}).eq("access_code",activeCode);
  if(error){setSync("err","Error al guardar");console.error(error);return;}
  setSync("ok","Guardado en nube");
  document.getElementById("lastSaved").textContent=now.toLocaleString("es-ES");
  if(show)toast();
}