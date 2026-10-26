/* ===== Unikas Spa y Peluquería ===== */
const WHATSAPP = "51972024022";

/* ---------- Servicios (edita precios aquí) ---------- */
const ICONS = {
  nails: '<svg viewBox="0 0 64 64"><path d="M24 8h16v30a8 8 0 0 1-16 0z"/><path d="M28 8v-2h8v2M24 22h16"/><path d="M20 56h24"/></svg>',
  face:  '<svg viewBox="0 0 64 64"><ellipse cx="32" cy="30" rx="16" ry="20"/><path d="M25 27h4M35 27h4M27 39c3 3 7 3 10 0"/><path d="M16 22c4-12 28-12 32 0"/></svg>',
  spa:   '<svg viewBox="0 0 64 64"><path d="M32 50c-10 0-18-8-18-18 8 0 14 4 18 10 4-6 10-10 18-10 0 10-8 18-18 18z"/><path d="M32 42c-4-6-4-14 0-22 4 8 4 16 0 22z"/><path d="M14 56h36"/></svg>',
  brush: '<svg viewBox="0 0 64 64"><path d="M40 6l12 12-22 22-12-12z"/><path d="M18 28l-8 8c-4 4-2 14-4 20 6-2 16 0 20-4l8-8"/></svg>',
  drop:  '<svg viewBox="0 0 64 64"><path d="M32 6c10 14 16 22 16 30a16 16 0 0 1-32 0c0-8 6-16 16-30z"/><path d="M24 38a8 8 0 0 0 8 8"/></svg>',
};

const SERVICES = [
  { id:"corte",    cat:"cabello",      name:"Corte + Lavado + Cepillado", desc:"Corte a tu medida, lavado con masaje y cepillado profesional.", price:25,  time:"60 min",  img:"img/s-corte.jpg",    tag:"Más pedido" },
  { id:"tinte",    cat:"color",        name:"Tinte + Corte",              desc:"Color uniforme y brillante con corte de puntas incluido.",      price:50,  time:"2 h",     img:"img/s-tinte.jpg" },
  { id:"balayage", cat:"color",        name:"Balayage + Botox",           desc:"Iluminación natural o fantasía + botox capilar reparador.",    price:140, time:"3 – 4 h", img:"img/s-balayage.jpg", tag:"Tendencia", hot:true },
  { id:"alisado",  cat:"tratamientos", name:"Alisado brasileño",          desc:"Cabello liso, suave y sin frizz por meses.",                   price:null,time:"3 h",     img:"img/s-alisado.jpg" },
  { id:"botox",    cat:"tratamientos", name:"Botox capilar",              desc:"Nutrición profunda para cabello dañado o con frizz.",          price:60,  time:"90 min",  icon:"drop" },
  { id:"peinado",  cat:"cabello",      name:"Peinado para eventos",       desc:"Ondas, recogidos y peinados para bodas, quinces y graduaciones.", price:45, time:"60 min",  icon:"brush" },
  { id:"mani",     cat:"spa",          name:"Manicure + Pedicure spa",    desc:"Limpieza, exfoliación, hidratación y esmaltado.",              price:45,  time:"90 min",  icon:"nails" },
  { id:"gel",      cat:"spa",          name:"Uñas en gel",                desc:"Esmaltado semipermanente con brillo que dura semanas.",        price:35,  time:"60 min",  icon:"nails" },
  { id:"facial",   cat:"spa",          name:"Limpieza facial profunda",   desc:"Piel limpia, luminosa y renovada con hidratación final.",      price:70,  time:"75 min",  icon:"face",  tag:"Spa" },
  { id:"dia-spa",  cat:"spa",          name:"Día Unikas (spa completo)",  desc:"Lavado con masaje, facial, manicure y peinado. Tu día libre.", price:150, time:"4 h",     icon:"spa",   tag:"Regalo ideal", hot:true },
];

const money = p => p == null ? "Consultar" : `S/ ${p.toFixed(2).replace(".", ",")}`;

/* ---------- Render tarjetas ---------- */
const grid = document.getElementById("servicesGrid");
function renderServices(filter = "all") {
  const list = SERVICES.filter(s => filter === "all" || s.cat === filter);
  grid.innerHTML = list.map((s, i) => `
    <article class="card" style="animation-delay:${i * 60}ms">
      <div class="card__media ${s.img ? "" : "card__media--icon"}">
        ${s.img ? `<img src="${s.img}" alt="${s.name}" loading="lazy">` : ICONS[s.icon]}
        ${s.tag ? `<span class="card__tag ${s.hot ? "card__tag--hot" : ""}">${s.tag}</span>` : ""}
      </div>
      <div class="card__body">
        <h3>${s.name}</h3>
        <p>${s.desc}</p>
        <div class="card__meta">
          <div class="card__price"><small>${s.price == null ? "Precio" : "Desde"}</small>${money(s.price)}</div>
          <span class="card__time">⏱ ${s.time}</span>
        </div>
        <button class="btn btn--dark btn--sm btn--block" data-book="${s.name}">Reservar</button>
      </div>
    </article>`).join("");
}
renderServices();

document.getElementById("filters").addEventListener("click", e => {
  const b = e.target.closest(".filter");
  if (!b) return;
  document.querySelectorAll(".filter").forEach(f => f.classList.toggle("is-active", f === b));
  renderServices(b.dataset.filter);
});

/* ---------- Nav ---------- */
const nav = document.getElementById("nav");
addEventListener("scroll", () => nav.classList.toggle("is-scrolled", scrollY > 40), { passive: true });
document.getElementById("navToggle").addEventListener("click", () => {
  nav.classList.toggle("is-open");
  document.body.classList.toggle("lock", nav.classList.contains("is-open"));
});
document.querySelectorAll("#navLinks a, #navLinks button").forEach(a =>
  a.addEventListener("click", () => { nav.classList.remove("is-open"); document.body.classList.remove("lock"); })
);

/* ---------- Preloader + reveal ---------- */
addEventListener("load", () => setTimeout(() => document.getElementById("preloader").classList.add("is-done"), 900));
setTimeout(() => document.getElementById("preloader").classList.add("is-done"), 3500);

const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 90}ms`;
  io.observe(el);
});

/* ---------- Toast ---------- */
const toastEl = document.getElementById("toast");
let toastT;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("is-show");
  clearTimeout(toastT);
  toastT = setTimeout(() => toastEl.classList.remove("is-show"), 2600);
}

document.getElementById("promoCode").addEventListener("click", () => {
  navigator.clipboard?.writeText("UNIKAS10").catch(() => {});
  toast("Código UNIKAS10 copiado ✨");
});
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Galería lightbox ---------- */
const lb = document.createElement("div");
lb.className = "lightbox";
lb.innerHTML = '<button aria-label="Cerrar">×</button><img alt="">';
document.body.appendChild(lb);
document.querySelectorAll(".g").forEach(g => g.addEventListener("click", () => {
  lb.querySelector("img").src = g.querySelector("img").src;
  lb.classList.add("is-open");
}));
lb.addEventListener("click", () => lb.classList.remove("is-open"));

/* ---------- Reserva ---------- */
const modal = document.getElementById("bookModal");
const steps = [...modal.querySelectorAll(".step")];
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const errEl = document.getElementById("formError");
const bar = document.getElementById("progressBar");
const state = { step: 1, service: null, date: null, time: null };

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

// lista de servicios en el modal
const pickList = document.getElementById("pickList");
pickList.innerHTML = SERVICES.map(s =>
  `<button type="button" class="pick" data-id="${s.id}"><span>${s.name}<small>${s.time}</small></span><b>${money(s.price)}</b></button>`
).join("");
pickList.addEventListener("click", e => {
  const p = e.target.closest(".pick");
  if (!p) return;
  selectService(p.dataset.id);
  setTimeout(() => go(2), 220);
});
function selectService(id) {
  state.service = SERVICES.find(s => s.id === id) || null;
  pickList.querySelectorAll(".pick").forEach(p => p.classList.toggle("is-selected", p.dataset.id === id));
}

// días: próximos 14
const daysEl = document.getElementById("days");
const timesEl = document.getElementById("times");
function buildDays() {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const html = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date(today); d.setDate(today.getDate() + i);
    html.push(`<button type="button" class="day" data-date="${d.toISOString()}"><small>${i === 0 ? "Hoy" : DAYS[d.getDay()]}</small><strong>${d.getDate()}</strong><small>${MONTHS[d.getMonth()]}</small></button>`);
  }
  daysEl.innerHTML = html.join("");
}
daysEl.addEventListener("click", e => {
  const b = e.target.closest(".day");
  if (!b) return;
  daysEl.querySelectorAll(".day").forEach(d => d.classList.toggle("is-selected", d === b));
  state.date = new Date(b.dataset.date);
  state.time = null;
  buildTimes();
});

function slotsFor(date) {
  const sunday = date.getDay() === 0;
  const [start, end] = sunday ? [10, 14] : [9, 20];
  const out = [];
  for (let h = start; h < end; h++) for (const m of [0, 30]) out.push({ h, m });
  return out;
}
function buildTimes() {
  const now = new Date();
  // "ocupados" simulados de forma estable según la fecha (solo demo)
  const seed = state.date.getDate() * 7 + state.date.getMonth();
  timesEl.innerHTML = slotsFor(state.date).map(({ h, m }, i) => {
    const t = new Date(state.date); t.setHours(h, m);
    const past = t <= now;
    const busy = (i * 13 + seed) % 5 === 0;
    const label = `${((h + 11) % 12) + 1}:${m ? "30" : "00"} ${h < 12 ? "am" : "pm"}`;
    return `<button type="button" class="time" data-t="${label}" ${past || busy ? "disabled" : ""}>${label}</button>`;
  }).join("");
  if (!timesEl.querySelector(".time:not(:disabled)"))
    timesEl.innerHTML = '<p class="times__empty">No quedan horarios este día. Prueba otra fecha 🌸</p>';
}
timesEl.addEventListener("click", e => {
  const b = e.target.closest(".time");
  if (!b || b.disabled) return;
  timesEl.querySelectorAll(".time").forEach(t => t.classList.toggle("is-selected", t === b));
  state.time = b.dataset.t;
});

const fmtDate = d => `${DAYS[d.getDay()]} ${d.getDate()} de ${MONTHS[d.getMonth()]}`;

function go(n) {
  errEl.textContent = "";
  state.step = n;
  steps.forEach(s => s.classList.toggle("is-active", +s.dataset.step === n));
  bar.style.width = `${n * 25}%`;
  prevBtn.style.visibility = n === 1 ? "hidden" : "visible";
  document.getElementById("modalActions").style.display = n === 4 ? "none" : "flex";
  nextBtn.textContent = n === 3 ? "Confirmar cita" : "Continuar";
  if (n === 3) {
    document.getElementById("summary").innerHTML = `
      <div><span>Servicio</span><b>${state.service.name}</b></div>
      <div><span>Fecha</span><b>${fmtDate(state.date)} · ${state.time}</b></div>
      <div><span>Precio</span><b>${money(state.service.price)}</b></div>`;
    setTimeout(() => document.getElementById("fName").focus(), 100);
  }
}

nextBtn.addEventListener("click", () => {
  if (state.step === 1 && !state.service) return (errEl.textContent = "Elige un servicio para continuar.");
  if (state.step === 2 && (!state.date || !state.time)) return (errEl.textContent = "Elige un día y un horario disponible.");
  if (state.step === 3) {
    const name = document.getElementById("fName").value.trim();
    const phone = document.getElementById("fPhone").value.replace(/\D/g, "");
    if (name.length < 2) return (errEl.textContent = "Escribe tu nombre.");
    if (phone.length < 9) return (errEl.textContent = "Escribe un número de celular válido (9 dígitos).");
    const note = document.getElementById("fNote").value.trim();
    const msg =
`Hola Unikas 💛 quiero reservar una cita:
• Servicio: ${state.service.name} (${money(state.service.price)})
• Fecha: ${fmtDate(state.date)}
• Hora: ${state.time}
• Nombre: ${name}
• Celular: ${phone}${note ? `\n• Nota: ${note}` : ""}`;
    document.getElementById("waConfirm").href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
    document.getElementById("doneName").textContent = name.split(" ")[0];
    try {
      const saved = JSON.parse(localStorage.getItem("unikas_citas") || "[]");
      saved.push({ servicio: state.service.name, fecha: state.date.toISOString(), hora: state.time, nombre: name, celular: phone });
      localStorage.setItem("unikas_citas", JSON.stringify(saved));
    } catch (_) {}
    return go(4);
  }
  go(state.step + 1);
});
prevBtn.addEventListener("click", () => go(Math.max(1, state.step - 1)));

function openBooking(serviceName) {
  document.getElementById("bookForm").reset();
  Object.assign(state, { service: null, date: null, time: null });
  buildDays();
  timesEl.innerHTML = '<p class="times__empty">Selecciona un día para ver horarios.</p>';
  selectService(null);
  const pre = SERVICES.find(s => s.name === serviceName);
  if (pre) { selectService(pre.id); go(2); } else go(1);
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("lock");
}
function closeBooking() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lock");
}
document.addEventListener("click", e => {
  const b = e.target.closest("[data-book]");
  if (b) { e.preventDefault(); openBooking(b.dataset.book); }
  if (e.target.closest("[data-close]")) closeBooking();
});
document.getElementById("waConfirm").addEventListener("click", () => {
  setTimeout(closeBooking, 400);
  toast("¡Gracias! Te confirmamos por WhatsApp 💛");
});
addEventListener("keydown", e => {
  if (e.key === "Escape") { closeBooking(); lb.classList.remove("is-open"); }
});
