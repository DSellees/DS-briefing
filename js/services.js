
function addProfileRow(profile = {}){
  const profilesList = document.getElementById("profilesList");
  if(!profilesList) return;
  const row = document.createElement("div");
  row.className = "profile-row";
  row.innerHTML = `
    <input data-profile-field="plataforma" placeholder="Plataforma" value="${escapeAttr(profile.plataforma || "")}">
    <input data-profile-field="url" placeholder="Enlace / URL" value="${escapeAttr(profile.url || "")}">
    <button type="button" class="remove-profile" onclick="removeProfileRow(this)">Eliminar</button>
  `;
  profilesList.appendChild(row);
  progress();
}

function removeProfileRow(button){
  const rows = document.querySelectorAll(".profile-row");
  if(rows.length <= 1) return;
  button.closest(".profile-row").remove();
  queueSave(true);
}

function addCompetitorRow(competitor = {}){
  const competitorsList = document.getElementById("competitorsList");
  if(!competitorsList) return;
  const count = competitorsList.querySelectorAll(".competitor-row").length + 3;
  const row = document.createElement("div");
  row.className = "competitor-row grid";
  row.innerHTML = `
    <div class="field"><label>Competidor ${count}</label><p class="hint">Nombre de una empresa, marca o profesional que compite por clientes similares.</p><input data-competitor-field="nombre" placeholder="Ej. Nombre del competidor o referente" value="${escapeAttr(competitor.nombre || "")}"></div>
    <div class="field"><label>Web</label><p class="hint">URL si la conoces.</p><input data-competitor-field="web" placeholder="https://..." value="${escapeAttr(competitor.web || "")}"></div>
    <div class="field"><label>Qué hace bien</label><p class="hint">Diseño, mensajes, posicionamiento, confianza, contenido, reseñas, oferta, etc.</p><textarea data-competitor-field="bien" placeholder="Ej. Explica bien sus servicios, tiene buenas reseñas, transmite confianza, aparece bien en Google...">${escapeHtml(competitor.bien || "")}</textarea></div>
    <div class="field"><label>Qué mejorarías</label><p class="hint">Qué ves débil, confuso, poco atractivo o poco diferenciador.</p><textarea data-competitor-field="mejora" placeholder="Ej. Web poco clara, mensajes genéricos, poca información, diseño desactualizado, mala conversión...">${escapeHtml(competitor.mejora || "")}</textarea></div>
    <div class="field full"><button type="button" class="remove-dynamic" onclick="removeDynamicRow(this, '.competitor-row')">Eliminar competidor</button></div>
  `;
  competitorsList.appendChild(row);
  progress();
}
let serviceCounter = 0;

function addServiceCard(service = {}){
  serviceCounter += 1;
  const servicesList = document.getElementById("servicesList");
  const card = document.createElement("div");
  card.className = "card service-card";
  card.dataset.serviceId = serviceCounter;
  card.innerHTML = `
    <div class="service-card-head">
      <h3>Servicio</h3>
      <button type="button" class="remove-service" onclick="removeServiceCard(this)">Eliminar</button>
    </div>
    <div class="field"><label>Nombre</label><input data-service-field="nombre" placeholder="Ej. Servicio principal, tratamiento, asesoramiento..." value="${escapeAttr(service.nombre || "")}"></div>
    <div class="field"><label>Prioridad</label><select data-service-field="prioridad"><option value="" disabled ${!service.prioridad ? "selected" : ""}>Selecciona una opción</option><option ${service.prioridad === "Alta" ? "selected" : ""}>Alta</option><option ${service.prioridad === "Media" ? "selected" : ""}>Media</option><option ${service.prioridad === "Baja" ? "selected" : ""}>Baja</option></select></div>
    <div class="field"><label>Rentabilidad</label><select data-service-field="rentabilidad"><option value="" disabled ${!service.rentabilidad ? "selected" : ""}>Selecciona una opción</option><option ${service.rentabilidad === "Alta" ? "selected" : ""}>Alta</option><option ${service.rentabilidad === "Media" ? "selected" : ""}>Media</option><option ${service.rentabilidad === "Baja" ? "selected" : ""}>Baja</option></select></div>
    <div class="field"><label>Cliente ideal</label><p class="hint">¿Para quién está pensado este servicio?</p><textarea data-service-field="cliente" placeholder="Ej. Particulares, empresas, familias, propietarios, pacientes, alumnos, profesionales...">${escapeHtml(service.cliente || "")}</textarea></div>
    <div class="field"><label>Qué necesidad cubre</label><p class="hint">Describe qué mejora, soluciona o facilita este servicio.</p><textarea data-service-field="problema" placeholder="Ej. Resolver una urgencia, mejorar resultados, ahorrar tiempo, ganar visibilidad, reducir errores, sentirse más seguro...">${escapeHtml(service.problema || "")}</textarea></div>
  `;
  servicesList.appendChild(card);
  renumberServices();
  progress();
}

function removeServiceCard(button){
  const cards = document.querySelectorAll(".service-card");
  if(cards.length <= 1) return;
  button.closest(".service-card").remove();
  renumberServices();
  queueSave(true);
}

function renumberServices(){
  document.querySelectorAll(".service-card h3").forEach((title, index) => title.textContent = `Servicio ${index + 1}`);
}

function escapeHtml(value){
  return String(value).replace(/[&<>"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[char]));
}

function escapeAttr(value){
  return escapeHtml(value).replace(/'/g, "&#039;");
}



function addToolRow(tool = {}){
  const toolsList = document.getElementById("toolsList");
  if(!toolsList) return;
  const row = document.createElement("div");
  row.className = "dynamic-row tool-row";
  row.innerHTML = `
    <input data-tool-field="herramienta" placeholder="Herramienta" value="${escapeAttr(tool.herramienta || "")}">
    <input data-tool-field="detalle" placeholder="Estado / detalle / acceso" value="${escapeAttr(tool.detalle || "")}">
    <button type="button" class="remove-dynamic" onclick="removeDynamicRow(this, '.tool-row')">Eliminar</button>
  `;
  toolsList.appendChild(row);
  progress();
}

function addAccessRow(access = {}){
  const accessList = document.getElementById("accessList");
  if(!accessList) return;
  const row = document.createElement("div");
  row.className = "dynamic-row access-row";
  row.innerHTML = `
    <input data-access-field="acceso" placeholder="Acceso / plataforma" value="${escapeAttr(access.acceso || "")}">
    <input data-access-field="detalle" placeholder="Detalle / responsable / estado" value="${escapeAttr(access.detalle || "")}">
    <button type="button" class="remove-dynamic" onclick="removeDynamicRow(this, '.access-row')">Eliminar</button>
  `;
  accessList.appendChild(row);
  progress();
}

function addColorRow(color = {}){
  const colorsList = document.getElementById("colorsList");
  if(!colorsList) return;
  const hasSavedColor = /^#[0-9a-fA-F]{6}$/.test(color.hex || "");
  const value = hasSavedColor ? color.hex : "#000000";
  const hexValue = hasSavedColor ? color.hex : "";
  const row = document.createElement("div");
  row.className = "dynamic-row color-row";
  row.innerHTML = `
    <input type="color" data-color-field="picker" value="${value}" aria-label="Selector de color">
    <input data-color-field="hex" placeholder="#000000" value="${escapeAttr(hexValue)}">
    <button type="button" class="remove-dynamic" onclick="removeDynamicRow(this, '.color-row')">Eliminar</button>
  `;
  const picker = row.querySelector("[data-color-field='picker']");
  const hex = row.querySelector("[data-color-field='hex']");
  picker.addEventListener("input", () => {
    hex.value = picker.value.toUpperCase();
    queueSave(false);
  });
  hex.addEventListener("input", () => {
    const normalized = hex.value.trim();
    if(/^#[0-9a-fA-F]{6}$/.test(normalized)){
      picker.value = normalized;
    }
  });
  colorsList.appendChild(row);
  progress();
}

function removeDynamicRow(button, selector){
  const rows = document.querySelectorAll(selector);
  if(selector !== ".competitor-row" && rows.length <= 1) return;
  button.closest(selector).remove();
  queueSave(true);
}
