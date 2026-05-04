let current = 0;
let timer = null;

const form = document.getElementById("form");
const steps = [...document.querySelectorAll(".step")];
const tabsEl = document.getElementById("tabs");
const dot = document.getElementById("dot");
const statusText = document.getElementById("statusText");

steps.forEach((s,i)=>{
  const b=document.createElement("button"); b.type="button"; b.className="tab"+(i===0?" active":"");
  b.innerHTML=`<span>${String(i+1).padStart(2,"0")}</span><span>${s.dataset.title}</span>`;
  b.onclick=()=>go(i); tabsEl.appendChild(b);
});
const tabs=[...document.querySelectorAll(".tab")];

addServiceCard();
addProfileRow();
addToolRow();
addAccessRow();
document.getElementById("loginBtn").onclick=login;
document.getElementById("codeInput").addEventListener("keydown",e=>{if(e.key==="Enter")login()});

function openApp(){document.getElementById("login").style.display="none";document.getElementById("app").style.display="grid";document.getElementById("clientName").textContent=activeClient;document.getElementById("clientCode").textContent=activeCode;render();}
function setSync(type,text){dot.className="dot "+type;statusText.textContent=text;}
function getData(){const data={};[...form.elements].filter(e=>e.name).forEach(e=>{if(e.type==="checkbox"){data[e.name]=data[e.name]||[];if(e.checked)data[e.name].push(e.value)}else data[e.name]=e.value});data.servicios=[...document.querySelectorAll(".service-card")].map(card=>{const service={};card.querySelectorAll("[data-service-field]").forEach(field=>{service[field.dataset.serviceField]=field.value});return service}).filter(service=>Object.values(service).some(value=>String(value).trim().length>0));data.perfiles=[...document.querySelectorAll(".profile-row")].map(row=>({plataforma:row.querySelector("[data-profile-field='plataforma']")?.value||"",url:row.querySelector("[data-profile-field='url']")?.value||""})).filter(profile=>profile.plataforma.trim()||profile.url.trim());data.colores=[...document.querySelectorAll(".color-row")].map(row=>({hex:(row.querySelector("[data-color-field='hex']")?.value||"").trim()})).filter(color=>/^#[0-9a-fA-F]{6}$/.test(color.hex));data.competidores_extra=[...document.querySelectorAll(".competitor-row")].map(row=>({nombre:row.querySelector("[data-competitor-field='nombre']")?.value||"",web:row.querySelector("[data-competitor-field='web']")?.value||"",bien:row.querySelector("[data-competitor-field='bien']")?.value||"",mejora:row.querySelector("[data-competitor-field='mejora']")?.value||""})).filter(competitor=>competitor.nombre.trim()||competitor.web.trim()||competitor.bien.trim()||competitor.mejora.trim());data.herramientas_medicion=[...document.querySelectorAll(".tool-row")].map(row=>({herramienta:row.querySelector("[data-tool-field='herramienta']")?.value||"",detalle:row.querySelector("[data-tool-field='detalle']")?.value||""})).filter(tool=>tool.herramienta.trim()||tool.detalle.trim());data.accesos_disponibles=[...document.querySelectorAll(".access-row")].map(row=>({acceso:row.querySelector("[data-access-field='acceso']")?.value||"",detalle:row.querySelector("[data-access-field='detalle']")?.value||""})).filter(access=>access.acceso.trim()||access.detalle.trim());return data;}
function setData(data){[...form.elements].filter(e=>e.name).forEach(e=>{if(e.type==="checkbox")e.checked=Array.isArray(data[e.name])&&data[e.name].includes(e.value);else if(data[e.name]!==undefined)e.value=data[e.name];});const servicesList=document.getElementById("servicesList");servicesList.innerHTML="";const services=Array.isArray(data.servicios)&&data.servicios.length?data.servicios:[{}];services.forEach(service=>addServiceCard(service));const profilesList=document.getElementById("profilesList");profilesList.innerHTML="";const profiles=Array.isArray(data.perfiles)&&data.perfiles.length?data.perfiles:[{}];profiles.forEach(profile=>addProfileRow(profile));const colorsList=document.getElementById("colorsList");colorsList.innerHTML="";const colors=Array.isArray(data.colores)&&data.colores.length?data.colores:[];colors.forEach(color=>addColorRow(color));const competitorsList=document.getElementById("competitorsList");competitorsList.innerHTML="";const competitors=Array.isArray(data.competidores_extra)&&data.competidores_extra.length?data.competidores_extra:[];competitors.forEach(competitor=>addCompetitorRow(competitor));const toolsList=document.getElementById("toolsList");toolsList.innerHTML="";const tools=Array.isArray(data.herramientas_medicion)&&data.herramientas_medicion.length?data.herramientas_medicion:[{}];tools.forEach(tool=>addToolRow(tool));const accessList=document.getElementById("accessList");accessList.innerHTML="";const accesses=Array.isArray(data.accesos_disponibles)&&data.accesos_disponibles.length?data.accesos_disponibles:[{}];accesses.forEach(access=>addAccessRow(access));}
function progress(){
  const fields = [];
  const checkboxGroups = new Map();

  [...form.elements].forEach(el => {
    if(!el.name || el.type === "button") return;
    if(el.type === "checkbox"){
      if(!checkboxGroups.has(el.name)) checkboxGroups.set(el.name, false);
      if(el.checked) checkboxGroups.set(el.name, true);
      return;
    }
    fields.push((el.value || "").trim().length > 0);
  });

  checkboxGroups.forEach(value => fields.push(value));

  const datasetSelectors = [
    "[data-service-field]",
    "[data-profile-field]",
    "[data-color-field='hex']",
    "[data-competitor-field]",
    "[data-tool-field]",
    "[data-access-field]"
  ];

  datasetSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      fields.push((el.value || "").trim().length > 0);
    });
  });

  const total = fields.length || 1;
  const completed = fields.filter(Boolean).length;
  const pct = Math.round((completed / total) * 100);

  document.getElementById("fill").style.width = pct + "%";
  document.getElementById("progressText").textContent = pct + "%";

  steps.forEach((s, i) => {
    const stepFields = [...s.querySelectorAll("input,textarea,select,[data-service-field],[data-profile-field],[data-color-field='hex'],[data-competitor-field],[data-tool-field],[data-access-field]")];
    tabs[i].classList.toggle("done", stepFields.some(e => {
      if(e.type === "checkbox") return e.checked;
      if(e.matches && e.matches("[data-color-field='picker']")) return false;
      return (e.value || "").trim();
    }));
  });
}
function render(){steps.forEach((s,i)=>s.classList.toggle("active",i===current));tabs.forEach((t,i)=>t.classList.toggle("active",i===current));document.getElementById("prev").style.visibility=current===0?"hidden":"visible";document.getElementById("next").textContent=current===steps.length-1?"Guardar y descargar":"Siguiente";progress();}
function go(i){current=Math.max(0,Math.min(steps.length-1,i));queueSave(false);render();window.scrollTo({top:0,behavior:"smooth"});}
function queueSave(show=false){progress();clearTimeout(timer);timer=setTimeout(()=>save(show),650);}
function toast(){const t=document.getElementById("toast");t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1100);}
form.addEventListener("input",()=>queueSave(false));form.addEventListener("change",()=>queueSave(true));
document.getElementById("prev").onclick=()=>go(current-1);
document.getElementById("next").onclick=async()=>{await save(true); if(current===steps.length-1)downloadJSON();else go(current+1);}
function downloadJSON(){const data=getData();const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`briefing-${(data.empresa||activeCode||"cliente").toLowerCase().replace(/[^a-z0-9]+/gi,"-")}.json`;a.click();URL.revokeObjectURL(a.href);}
