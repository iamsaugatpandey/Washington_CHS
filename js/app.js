(function(){
"use strict";

/* ============================== STATE ============================== */

var state = {
  activeIds: new Set(ALL_IDS),
  hideNonMatch: false,
  compareIds: new Set(["jhach","ucsf","laPoint","agaRubio"]),
  compareAxes: new Set(COMPARE_CATEGORIES.map(function(c){ return c.key; })),
  fieldsMenuOpen: false,
  activeSubtab: { treatment: "ed" }
};

/* ============================== HELPERS ============================== */

function esc(s){ return (s===undefined||s===null) ? "" : String(s); }

function dotgrid(guidelineIds){
  var set = new Set(guidelineIds);
  var html = '<div class="dotgrid">';
  ALL_IDS.forEach(function(id){
    var on = set.has(id);
    var pop = GUIDELINES[id].pop;
    html += '<span class="dot'+(on?' on '+pop:'')+'" data-dotid="'+id+'" tabindex="0" role="button" aria-label="'+GUIDELINES[id].name+(on?' — included':' — not included')+'" title="'+GUIDELINES[id].name+(on?' — included':' — not included')+'"></span>';
  });
  html += '</div>';
  return html;
}

/* A fixed-order key so a dot's position is verifiable at a glance instead of
   requiring a hover per dot — every dotgrid() on the page uses this same order. */
function renderDotLegend(){
  var items = ALL_IDS.map(function(id){
    var g = GUIDELINES[id];
    return '<span class="legend-item" data-tooltip="'+g.name+'"><span class="sw '+g.pop+'"></span>'+g.short+'</span>';
  }).join("");
  return '<div class="dot-legend"><span class="dot-legend-label">Dot order</span>'+items+'</div>';
}

function intersects(guidelineIds){
  for (var i=0;i<guidelineIds.length;i++){ if (state.activeIds.has(guidelineIds[i])) return true; }
  return false;
}

function applyFilterClass(el, guidelineIds){
  var match = intersects(guidelineIds);
  el.classList.toggle("dim", !match && !state.hideNonMatch);
  el.classList.toggle("hidden", !match && state.hideNonMatch);
}

/* ============================== RENDERERS ============================== */

function renderChips(){
  var row = document.getElementById("chipRow");
  row.innerHTML = ALL_IDS.map(function(id){
    var g = GUIDELINES[id];
    var active = state.activeIds.has(id);
    return '<button class="chip'+(active?' active':'')+'" data-pop="'+g.pop+'" data-id="'+id+'" type="button" title="'+g.name+'"><span class="sw"></span>'+g.short+'</button>';
  }).join("");
}

function renderOverview(){
  var el = document.getElementById("panel-overview");
  var totalPeds = ALL_IDS.filter(function(id){ return GUIDELINES[id].pop==="pediatric"; }).length;
  var totalAdult = ALL_IDS.length - totalPeds;
  el.innerHTML =
    '<div class="hero">'+
      '<h2><svg class="hero-icon" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 8v8M8 12h8"/></svg>Eleven Health Systems. One syndrome.</h2>'+
      '<p class="lede">This atlas synthesizes 11 published guidelines and clinical pathways for Cannabinoid Hyperemesis Syndrome (CHS) — spanning single-institution pediatric pathways, national society consensus statements, and international emergency-medicine reviews — so you can compare diagnostic thresholds, treatment ladders, and discharge planning side by side.</p>'+
      '<div class="stat-row">'+
        '<div class="stat-tile"><div class="n tabular">11</div><div class="l">Guidelines reviewed</div></div>'+
        '<div class="stat-tile"><div class="n tabular">'+totalAdult+'</div><div class="l">Adult / general-population</div></div>'+
        '<div class="stat-tile"><div class="n tabular">'+totalPeds+'</div><div class="l">Pediatric-specific</div></div>'+
        '<div class="stat-tile"><div class="n tabular">2018–2025</div><div class="l">Publication span</div></div>'+
        '<div class="stat-tile"><div class="n tabular">US + UK</div><div class="l">Health systems represented</div></div>'+
      '</div>'+
    '</div>'+
    '<div class="section">'+
      '<div class="section-head"><h2>Where each guideline comes from</h2><p>Institutional locations as identified in the source guideline table. Click a marker to see which health system(s) are based there, then jump straight to that system\'s full diagnostic criteria or treatment guideline — no summarizing, the original wording.</p></div>'+
      '<div class="map-wrap">'+
        '<div class="map-canvas" id="usMapGrid"></div>'+
        '<div class="offmap-panel" id="offMapPanel"></div>'+
      '</div>'+
    '</div>'+
    '<div class="section">'+
      '<div class="section-head"><h2>How to use this atlas</h2></div>'+
      '<div class="universal-grid">'+
        '<div class="universal-card"><span class="tag">Filter</span><br>Use the guideline chips above to select any combination of the 11 sources. Tables and cards throughout the atlas dim to show only what your selection covers.</div>'+
        '<div class="universal-card"><span class="tag">Diagnosis</span><br>See which of 9 diagnostic criteria each guideline requires, and read the exact caveats institutions attach to Rome IV.</div>'+
        '<div class="universal-card"><span class="tag">Treatment</span><br>Step through ED, hospitalization, outpatient, and discharge management with dosing and per-guideline notes.</div>'+
        '<div class="universal-card"><span class="tag">Compare</span><br>Pick 2–4 guidelines for a synthesized side-by-side comparison across diagnosis, first-line therapy, and discharge stance.</div>'+
      '</div>'+
    '</div>';
  renderMap();
}

function renderAtlas(){
  var el = document.getElementById("panel-atlas");
  var cards = ALL_IDS.map(function(id){
    var g = GUIDELINES[id];
    var loc = [g.city, g.state, g.country].filter(Boolean).join(", ");
    return '<div class="atlas-card" data-guidelines="'+id+'">'+
      '<div class="top"><h3>'+g.name+'</h3><span class="pop-pill '+g.pop+'">'+(g.pop==="pediatric"?"Pediatric":"Adult")+'</span></div>'+
      '<div class="inst">'+g.institution+'</div>'+
      '<div class="loc">'+(g.scope? g.scope+' · ':'')+loc+'</div>'+
      '<div class="blurb">'+g.blurb+'</div>'+
      '<div class="foot">'+
        '<span class="foot-contacts">'+(CONTACTS[id]||[]).map(function(c){return c.n;}).join(", ")+'</span>'+
        (g.sourceUrl ? '<a class="source-link" href="'+g.sourceUrl+'" target="_blank" rel="noopener noreferrer">Read the guideline ↗</a>' : '')+
      '</div>'+
    '</div>';
  }).join("");
  el.innerHTML =
    '<div class="section-head"><h2>Guideline directory</h2><p>Eleven institutions and organizations, spanning three pediatric health-system pathways, single-institution adult reviews, and two national multi-society consensus statements.</p></div>'+
    '<div class="atlas-grid">'+cards+'</div>';
  refreshFilters();
}

function renderCriteria(){
  var el = document.getElementById("panel-diagnosis");
  var rows = CRITERIA.map(function(c){
    return '<div class="crit-row" data-guidelines="'+c.guidelines.join(",")+'">'+
      '<div><div class="name">'+c.name+'</div><div class="count tabular">'+c.guidelines.length+' of 11 guidelines</div></div>'+
      dotgrid(c.guidelines)+
      '<div class="notes">'+c.notes+'</div>'+
    '</div>';
  }).join("");
  var phases = PHASES.map(function(p,i){
    return '<div class="phase-card"><div class="idx">PHASE '+p.idx+'</div><h4>'+p.name+'</h4><p>'+p.text+'</p></div>';
  }).join("");
  el.innerHTML =
    '<div class="section">'+
      '<div class="section-head"><h2>Diagnostic criteria</h2><p>Which of the 9 recurring diagnostic elements each guideline requires or references, with institution-specific caveats.</p></div>'+
      renderDotLegend()+
      '<div class="crit-list">'+rows+'</div>'+
      '<div class="callout"><b>Rome IV in pediatrics:</b> JHACH and Children\'s Minnesota both flag Rome IV as adult-oriented — it requires confirmed symptom resolution after cessation, which is difficult to verify in a single ED encounter. JHACH substitutes the Lonsdale 2021 pragmatic pediatric criteria instead.</div>'+
    '</div>'+
    '<div class="section">'+
      '<div class="section-head"><h2>The 4-phase clinical framework</h2><p>Referenced explicitly by Rubio-Tapia (AGA), Won, Children\'s Minnesota, and Hsu — and implicit in how every guideline sequences its treatment ladder.</p></div>'+
      '<div class="phase-strip">'+phases+'</div>'+
    '</div>';
  refreshFilters();
}

function renderTreatment(){
  var el = document.getElementById("panel-treatment");
  var subnav = '<div class="subnav">'+TX_ORDER.map(function(s){
    return '<button data-sub="'+s+'" class="'+(state.activeSubtab.treatment===s?'active':'')+'">'+TX_LABELS[s]+'</button>';
  }).join("")+'</div>';
  var subpanels = TX_ORDER.map(function(setting){
    var groups = TX[setting].map(function(g){
      var items = g.items.map(function(it){
        return '<div class="tx-item" data-guidelines="'+it.guidelines.join(",")+'">'+
          '<div class="name">'+it.name+'</div>'+
          '<div class="dose">'+it.dose+'</div>'+
          dotgrid(it.guidelines)+
          '<div class="note">'+(it.note||'')+'</div>'+
        '</div>';
      }).join("");
      return '<div class="tx-group"><div class="tx-group-title">'+g.group+'</div>'+items+'</div>';
    }).join("");
    return '<div class="subpanel'+(state.activeSubtab.treatment===setting?' active':'')+'" data-subpanel="'+setting+'">'+groups+'</div>';
  }).join("");
  el.innerHTML =
    '<div class="section-head"><h2>Treatment ladder</h2><p>Step through emergency-department, hospitalization, outpatient, and discharge management. Dosing and per-guideline notes are drawn directly from each pathway.</p></div>'+
    renderDotLegend()+
    subnav + subpanels;
  el.querySelectorAll(".subnav button").forEach(function(btn){
    btn.addEventListener("click", function(){
      state.activeSubtab.treatment = btn.getAttribute("data-sub");
      renderTreatment();
    });
  });
  refreshFilters();
}

function renderFollowup(){
  var el = document.getElementById("panel-followup");
  var rows = FOLLOWUP.map(function(f){
    return '<div class="tx-item" data-guidelines="'+f.guidelines.join(",")+'" style="grid-template-columns:minmax(200px,1.1fr) minmax(90px,auto) minmax(220px,1.8fr);">'+
      '<div class="name">'+f.name+'</div>'+
      dotgrid(f.guidelines)+
      '<div class="note">'+f.note+'</div>'+
    '</div>';
  }).join("");
  var specials = SPECIALS.map(function(s){
    return '<div class="special-card"><h4><span class="ic">&#9888;</span>'+s.title+dotgrid(s.guidelines)+'</h4><p>'+s.text+'</p></div>';
  }).join("");
  var opioidRows = OPIOID_REASONS.map(function(r){
    return '<tr><td class="reason">'+r.reason+'</td><td>'+r.explanation+'</td></tr>';
  }).join("");
  el.innerHTML =
    '<div class="section">'+
      '<div class="section-head"><h2>Follow-up care</h2><p>Referral pathways, education materials, and behavioral-health integration after the acute episode.</p></div>'+
      renderDotLegend()+
      '<div class="tx-group">'+rows+'</div>'+
    '</div>'+
    '<div class="section">'+
      '<div class="section-head"><h2>Special considerations &amp; safety</h2><p>Exclusion criteria and safety thresholds that only a subset of guidelines specify explicitly.</p></div>'+
      '<div class="special-grid">'+specials+'</div>'+
    '</div>'+
    '<div class="section">'+
      '<div class="section-head"><h2>Why opioids are avoided in CHS</h2><p>A consistent theme across every guideline in this set.</p></div>'+
      '<div class="table-scroll"><table class="opioid-table"><thead><tr><th>Reason</th><th>Explanation</th></tr></thead><tbody>'+opioidRows+'</tbody></table></div>'+
    '</div>';
  refreshFilters();
}

function renderAVP(){
  var el = document.getElementById("panel-avp");
  var pedsOnly = isSubset(state.activeIds, "pediatric");
  var adultOnly = isSubset(state.activeIds, "adult");
  var blocks = AVP.map(function(row){
    return '<div class="avp-block">'+
      '<div class="avp-head">'+row.heading+'</div>'+
      '<div class="avp-cols">'+
        '<div class="avp-col peds'+(pedsOnly?' highlight':'')+'"><span class="col-label">Children / Adolescents</span>'+row.peds+'</div>'+
        '<div class="avp-col adult'+(adultOnly?' highlight':'')+'"><span class="col-label">Adults / General</span>'+row.adult+'</div>'+
      '</div>'+
    '</div>';
  }).join("");
  el.innerHTML =
    '<div class="section-head"><h2>Adult vs. pediatric management</h2><p>The same 11 guidelines split into 6 adult / general-population sources (LaPoint, Rubio-Tapia/AGA, Humphries/RCEM, SAEM GRACE-4, Won, Hsu) and 5 pediatric health-system pathways (JHACH, Children\'s Minnesota, UCSF, Boston Children\'s, Meyer) — compared head-to-head across every stage of care.</p></div>'+
    blocks;
}

function isSubset(activeSet, pop){
  var arr = Array.from(activeSet);
  if (arr.length===0) return false;
  return arr.every(function(id){ return GUIDELINES[id].pop===pop; });
}

/* Pulls this guideline's entries for one Compare category straight from the
   same CRITERIA / TX / FOLLOWUP arrays that drive the Diagnosis, Treatment,
   and Follow-up tabs — so Compare never holds its own paraphrased copy. */
function getGuidelineEntries(id, categoryKey){
  var cat = COMPARE_CATEGORIES.filter(function(c){ return c.key===categoryKey; })[0];
  if (!cat) return [];
  if (cat.source==="CRITERIA"){
    return CRITERIA.filter(function(c){ return c.guidelines.indexOf(id)>=0; })
      .map(function(c){ return { name:c.name, dose:"", note:c.notes||"" }; });
  }
  if (cat.source==="TX"){
    var out = [];
    (TX[cat.settingKey]||[]).forEach(function(g){
      g.items.forEach(function(it){
        if (it.guidelines.indexOf(id)>=0) out.push({ name:it.name, dose:it.dose||"", note:it.note||"" });
      });
    });
    return out;
  }
  if (cat.source==="FOLLOWUP"){
    return FOLLOWUP.filter(function(f){ return f.guidelines.indexOf(id)>=0; })
      .map(function(f){ return { name:f.name, dose:"", note:f.note||"" }; });
  }
  return [];
}

function renderCompare(){
  var el = document.getElementById("panel-compare");
  var picker = '<div class="compare-picker">'+ALL_IDS.map(function(id){
    var active = state.compareIds.has(id);
    var disabled = !active && state.compareIds.size>=4;
    return '<button class="compare-chip'+(active?' active':'')+'" data-cmp="'+id+'" '+(disabled?'disabled':'')+' type="button">'+GUIDELINES[id].short+'</button>';
  }).join("")+'</div>';

  var visibleCats = COMPARE_CATEGORIES.filter(function(c){ return state.compareAxes.has(c.key); });
  var fieldsMenu =
    '<div class="fields-filter">'+
      '<button class="fields-filter-btn" id="fieldsFilterBtn" type="button" aria-expanded="'+(state.fieldsMenuOpen?"true":"false")+'">Fields<span class="count tabular">'+visibleCats.length+'/'+COMPARE_CATEGORIES.length+'</span><span class="caret">&#9662;</span></button>'+
      '<div class="fields-filter-menu'+(state.fieldsMenuOpen?' open':'')+'" id="fieldsFilterMenu">'+
        '<div class="fields-filter-title">Show sections</div>'+
        COMPARE_CATEGORIES.map(function(c){
          var checked = state.compareAxes.has(c.key);
          return '<label><input type="checkbox" data-axis="'+c.key+'" '+(checked?'checked':'')+'/>'+
            '<span class="field-label-text">'+c.label+'</span>'+
            '<span class="tip-ic" data-tooltip="'+c.help+'" tabindex="0" role="note">&#9432;</span>'+
          '</label>';
        }).join("")+
      '</div>'+
    '</div>';

  var ids = Array.from(state.compareIds);
  var cards = ids.map(function(id){
    var g = GUIDELINES[id];
    var loc = [g.city, g.state, g.country].filter(Boolean).join(", ");
    var sections = visibleCats.length ? visibleCats.map(function(c){
      var entries = getGuidelineEntries(id, c.key);
      var body = entries.length ? '<ul class="entry-list">'+entries.map(function(e){
        return '<li>'+
          '<span class="entry-name">'+e.name+'</span>'+
          (e.dose ? '<span class="entry-dose">'+e.dose+'</span>' : '')+
          (e.note ? '<span class="entry-note">'+e.note+'</span>' : '')+
        '</li>';
      }).join("")+'</ul>' : '<p class="fields-empty">Not addressed in this entry of the source table.</p>';
      return '<div class="axis"><div class="k">'+c.label+'</div>'+body+'</div>';
    }).join("") : '<p class="fields-empty">No sections selected — use &ldquo;Fields&rdquo; above to choose what to show.</p>';
    return '<div class="compare-card"><h3>'+g.name+' <span class="pop-pill '+g.pop+'" style="margin-left:6px;">'+(g.pop==="pediatric"?"Peds":"Adult")+'</span></h3>'+
      '<div class="loc">'+g.institution+' &middot; '+loc+'</div>'+sections+'</div>';
  }).join("");

  el.innerHTML =
    '<div class="compare-toolbar">'+
      '<div class="section-head"><h2>Side-by-side comparison</h2><p>Choose 2–4 guidelines to compare. Each section below is one of the six sections of the source guideline table (Diagnoses, ED, Hospitalization, Outpatient, Discharge, Follow-up) — text shown is copied exactly from that guideline&rsquo;s entry, the same wording used on the Diagnosis, Treatment, and Follow-up tabs, never paraphrased. Open &ldquo;Fields&rdquo; and hover the &#9432; next to a section name for what it covers.</p></div>'+
      fieldsMenu+
    '</div>'+
    picker+
    '<div class="compare-hint">'+ids.length+' of 4 selected'+(ids.length<2?' — choose at least 2 to compare.':'')+'</div>'+
    (ids.length>=2 ? '<div class="compare-grid">'+cards+'</div>' : '');

  el.querySelectorAll(".compare-chip").forEach(function(btn){
    btn.addEventListener("click", function(){
      var id = btn.getAttribute("data-cmp");
      if (state.compareIds.has(id)){
        if (state.compareIds.size>2) state.compareIds.delete(id);
      } else {
        if (state.compareIds.size<4) state.compareIds.add(id);
      }
      renderCompare();
    });
  });

  var fieldsBtn = document.getElementById("fieldsFilterBtn");
  fieldsBtn.addEventListener("click", function(e){
    e.stopPropagation();
    state.fieldsMenuOpen = !state.fieldsMenuOpen;
    renderCompare();
  });
  document.getElementById("fieldsFilterMenu").addEventListener("click", function(e){ e.stopPropagation(); });
  el.querySelectorAll("[data-axis]").forEach(function(box){
    box.addEventListener("change", function(){
      var key = box.getAttribute("data-axis");
      if (box.checked) state.compareAxes.add(key); else state.compareAxes.delete(key);
      state.fieldsMenuOpen = true;
      renderCompare();
    });
  });
}

document.addEventListener("click", function(e){
  if (!state.fieldsMenuOpen) return;
  if (!e.target.closest(".fields-filter")){
    state.fieldsMenuOpen = false;
    if (document.getElementById("panel-compare").classList.contains("active")) renderCompare();
  }
});

function renderContacts(){
  var el = document.getElementById("panel-contacts");
  var cards = ALL_IDS.map(function(id){
    var g = GUIDELINES[id];
    var people = (CONTACTS[id]||[]).map(function(c){
      return '<div class="person"><span class="name">'+c.n+'</span><a href="mailto:'+c.e+'">'+c.e+'</a></div>';
    }).join("");
    return '<div class="contact-card"><h4>'+g.name+'</h4>'+people+'</div>';
  }).join("");
  el.innerHTML =
    '<div class="section-head"><h2>Contacts</h2><p>Guideline authors and institutional contacts, as listed in the source materials.</p></div>'+
    '<div class="contact-grid">'+cards+'</div>';
}

function refreshFilters(){
  document.querySelectorAll("[data-guidelines]").forEach(function(el){
    var ids = el.getAttribute("data-guidelines").split(",").filter(Boolean);
    applyFilterClass(el, ids);
  });
}

/* ============================== MAP ============================== */

function uniq(arr){
  return arr.filter(function(v,i){ return arr.indexOf(v)===i; });
}

function renderMap(){
  renderOffMapPanel();
  var canvas = document.getElementById("usMapGrid");
  if (!canvas) return;

  var byState = {};
  MAP_LOCATIONS.forEach(function(loc){
    if (!byState[loc.stateAbbr]) byState[loc.stateAbbr] = [];
    byState[loc.stateAbbr].push(loc);
  });

  var cols = 12, rows = 8;
  var cells = Object.keys(STATE_GRID).map(function(abbr){
    var s = STATE_GRID[abbr];
    var locs = byState[abbr];
    var style = "grid-column:"+(s.x+1)+";grid-row:"+(s.y+1)+";";
    if (!locs){
      return '<div class="grid-state" style="'+style+'" title="'+s.name+'">'+abbr+'</div>';
    }
    var pops = uniq(locs.map(function(l){ return GUIDELINES[l.id].pop; }));
    var colorClass = pops.length>1 ? "mixed" : pops[0];
    var label = s.name+': '+locs.length+' guideline'+(locs.length>1?'s':'')+' ('+uniq(locs.map(function(l){return GUIDELINES[l.id].short;})).join(", ")+')';
    return '<button class="grid-state has-marker '+colorClass+'" style="'+style+'" type="button" data-state-abbr="'+abbr+'" aria-label="'+label+'" title="'+label+'">'+
      '<span class="marker-abbr">'+abbr+'</span>'+
      (locs.length>1 ? '<span class="marker-count">'+locs.length+'</span>' : '')+
    '</button>';
  }).join("");

  canvas.innerHTML = '<div class="us-grid" style="grid-template-columns:repeat('+cols+',1fr);grid-template-rows:repeat('+rows+',1fr);">'+cells+'</div>';

  canvas.querySelectorAll("[data-state-abbr]").forEach(function(btn){
    btn.addEventListener("click", function(){
      var abbr = btn.getAttribute("data-state-abbr");
      openLocationModal(STATE_GRID[abbr].name, byState[abbr]);
    });
  });
}

function renderOffMapPanel(){
  var el = document.getElementById("offMapPanel");
  if (!el) return;
  el.innerHTML = '<div class="offmap-label">Beyond individual states</div>'+
    OFFMAP_LOCATIONS.map(function(loc){
      var g = GUIDELINES[loc.id];
      return '<button class="offmap-card" data-offmap-id="'+loc.id+'" data-offmap-region="'+loc.region+'" type="button">'+
        '<span class="flag" aria-hidden="true">'+(loc.kind==="international" ? "&#127468;&#127463;" : "&#9733;")+'</span>'+
        '<span><span class="offmap-region">'+loc.region+'</span><span class="offmap-name">'+g.name+'</span></span>'+
      '</button>';
    }).join("");
  el.querySelectorAll("[data-offmap-id]").forEach(function(btn){
    btn.addEventListener("click", function(){
      var id = btn.getAttribute("data-offmap-id");
      openLocationModal(btn.getAttribute("data-offmap-region"), [{ id: id, city: "" }]);
    });
  });
}

var mapModalEl = null;
function ensureMapModal(){
  if (mapModalEl) return mapModalEl;
  var overlay = document.createElement("div");
  overlay.className = "map-modal-overlay";
  overlay.innerHTML = '<div class="map-modal" role="dialog" aria-modal="true"><button class="map-modal-close" type="button" aria-label="Close">&times;</button><div class="map-modal-body"></div></div>';
  document.body.appendChild(overlay);
  overlay.addEventListener("click", function(e){ if (e.target===overlay) closeMapModal(); });
  overlay.querySelector(".map-modal-close").addEventListener("click", closeMapModal);
  document.addEventListener("keydown", function(e){ if (e.key==="Escape") closeMapModal(); });
  mapModalEl = overlay;
  return overlay;
}

function closeMapModal(){
  if (mapModalEl) mapModalEl.classList.remove("open");
}

function renderLocationDetail(body, title, loc){
  var g = GUIDELINES[loc.id];
  var locParts = [loc.city, g.state, g.country].filter(Boolean);
  body.innerHTML =
    '<div class="map-modal-eyebrow">'+title+'</div>'+
    '<h3>'+g.name+'</h3>'+
    '<div class="map-modal-inst">'+g.institution+'</div>'+
    '<div class="map-modal-loc">'+locParts.join(", ")+'</div>'+
    '<div class="map-modal-actions">'+
      '<button class="modal-cta" data-goto-tab="diagnosis" data-goto-id="'+loc.id+'" type="button">View full diagnostic criteria</button>'+
      '<button class="modal-cta" data-goto-tab="treatment" data-goto-id="'+loc.id+'" type="button">View full treatment guideline</button>'+
      (g.sourceUrl ? '<a class="modal-cta outline" href="'+g.sourceUrl+'" target="_blank" rel="noopener noreferrer">Read the original guideline ↗</a>' : '')+
    '</div>';
  body.querySelectorAll("[data-goto-tab]").forEach(function(btn){
    btn.addEventListener("click", function(){
      goToGuideline(btn.getAttribute("data-goto-id"), btn.getAttribute("data-goto-tab"));
    });
  });
}

function openLocationModal(title, locs){
  var overlay = ensureMapModal();
  var body = overlay.querySelector(".map-modal-body");
  if (locs.length>1){
    body.innerHTML =
      '<div class="map-modal-eyebrow">'+title+'</div>'+
      '<h3>'+locs.length+' health systems here</h3>'+
      '<div class="chooser-list">'+
      locs.map(function(l){
        var g = GUIDELINES[l.id];
        return '<button class="chooser-item" data-choose-id="'+l.id+'" type="button">'+
          '<span class="pop-pill '+g.pop+'">'+(g.pop==="pediatric"?"Peds":"Adult")+'</span>'+
          '<span><span class="chooser-name">'+g.name+'</span><span class="chooser-city">'+(l.city||"")+'</span></span>'+
        '</button>';
      }).join("")+
      '</div>';
    body.querySelectorAll("[data-choose-id]").forEach(function(btn){
      btn.addEventListener("click", function(){
        var id = btn.getAttribute("data-choose-id");
        var chosen = locs.filter(function(l){ return l.id===id; })[0];
        renderLocationDetail(body, title, chosen);
      });
    });
  } else {
    renderLocationDetail(body, title, locs[0]);
  }
  overlay.classList.add("open");
}

function activateTab(tabName){
  document.querySelectorAll(".tab").forEach(function(t){ t.classList.remove("active"); });
  document.querySelectorAll(".panel").forEach(function(p){ p.classList.remove("active"); });
  var tabBtn = document.querySelector('.tab[data-tab="'+tabName+'"]');
  if (tabBtn) tabBtn.classList.add("active");
  var target = document.getElementById("panel-"+tabName);
  if (target) target.classList.add("active");
  if (tabName==="avp") renderAVP();
}

function goToGuideline(id, tabName){
  state.activeIds = new Set([id]);
  state.hideNonMatch = true;
  renderChips();
  bindChipEvents();
  refreshFilters();
  var hideBox = document.getElementById("hideNonMatch");
  if (hideBox) hideBox.checked = true;
  closeMapModal();
  activateTab(tabName);
  window.scrollTo({ top:0, behavior:"smooth" });
}

function syncHeaderHeight(){
  var h = document.querySelector(".site-header").offsetHeight;
  document.documentElement.style.setProperty("--header-h", h + "px");
}

/* ============================== EVENTS ============================== */

function toggleGuideline(id){
  if (state.activeIds.has(id)){
    if (state.activeIds.size>1) state.activeIds.delete(id);
  } else {
    state.activeIds.add(id);
  }
  renderChips();
  refreshFilters();
  if (document.getElementById("panel-avp").classList.contains("active")) renderAVP();
  bindChipEvents();
}

function bindChipEvents(){
  document.querySelectorAll(".chip[data-id]").forEach(function(chip){
    chip.onclick = function(){ toggleGuideline(chip.getAttribute("data-id")); };
  });
}

document.addEventListener("click", function(e){
  var dot = e.target.closest(".dot");
  if (dot){ toggleGuideline(dot.getAttribute("data-dotid")); }
});
document.addEventListener("keydown", function(e){
  if ((e.key==="Enter"||e.key===" ") && e.target.classList && e.target.classList.contains("dot")){
    e.preventDefault(); toggleGuideline(e.target.getAttribute("data-dotid"));
  }
});

document.getElementById("btnAll").addEventListener("click", function(){
  state.activeIds = new Set(ALL_IDS);
  renderChips(); refreshFilters(); bindChipEvents();
  if (document.getElementById("panel-avp").classList.contains("active")) renderAVP();
});
document.getElementById("btnAdult").addEventListener("click", function(){
  state.activeIds = new Set(ALL_IDS.filter(function(id){ return GUIDELINES[id].pop==="adult"; }));
  renderChips(); refreshFilters(); bindChipEvents();
  if (document.getElementById("panel-avp").classList.contains("active")) renderAVP();
});
document.getElementById("btnPeds").addEventListener("click", function(){
  state.activeIds = new Set(ALL_IDS.filter(function(id){ return GUIDELINES[id].pop==="pediatric"; }));
  renderChips(); refreshFilters(); bindChipEvents();
  if (document.getElementById("panel-avp").classList.contains("active")) renderAVP();
});
document.getElementById("hideNonMatch").addEventListener("change", function(e){
  state.hideNonMatch = e.target.checked;
  refreshFilters();
});

document.querySelectorAll(".tab").forEach(function(tab){
  tab.addEventListener("click", function(){
    activateTab(tab.getAttribute("data-tab"));
  });
});

/* Theme toggle: cycles Auto -> Light -> Dark -> Auto */
var themeState = "auto";
function applyTheme(){
  var root = document.documentElement;
  if (themeState==="auto"){ root.removeAttribute("data-theme"); document.getElementById("themeIcon").textContent="◐"; document.getElementById("themeLabel").textContent="Auto"; }
  else if (themeState==="light"){ root.setAttribute("data-theme","light"); document.getElementById("themeIcon").textContent="☀"; document.getElementById("themeLabel").textContent="Light"; }
  else { root.setAttribute("data-theme","dark"); document.getElementById("themeIcon").textContent="☾"; document.getElementById("themeLabel").textContent="Dark"; }
}
document.getElementById("themeToggle").addEventListener("click", function(){
  themeState = themeState==="auto" ? "light" : themeState==="light" ? "dark" : "auto";
  applyTheme();
});

/* ============================== INIT ============================== */

renderChips();
bindChipEvents();
renderOverview();
renderAtlas();
renderCriteria();
renderTreatment();
renderFollowup();
renderAVP();
renderCompare();
renderContacts();
applyTheme();
syncHeaderHeight();
window.addEventListener("resize", syncHeaderHeight);

})();
