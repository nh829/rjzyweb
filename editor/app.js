/* rjzyweb 数据编辑器 - 前端逻辑（本地工具，仅在编辑器页面使用） */
"use strict";

var DB = { categories: [], catIcons: {}, softwareData: [], tutorialData: [] };
var S = {
  tab: "soft",           // soft | tut
  softCat: "all",        // 当前软件分类筛选
  softId: null,          // 正在编辑的软件 id
  tutCat: "all",
  tutId: null,
  softSearch: "",
  tutSearch: "",
  dirtySoft: false,
  dirtyTut: false
};

function byId(id) { return document.getElementById(id); }
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function attrVal(s) { return esc(s); }
function clone(x) { return JSON.parse(JSON.stringify(x)); }
function fmtTime(d) {
  function p(n) { return (n < 10 ? "0" : "") + n; }
  return p(d.getHours()) + ":" + p(d.getMinutes()) + ":" + p(d.getSeconds());
}

/* ---------- Toast / 状态 ---------- */
var toastTimer = null;
function toast(msg, isErr) {
  var t = byId("toast");
  t.textContent = msg;
  t.className = "toast show" + (isErr ? " err" : "");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { t.className = "toast"; }, 3200);
}
function refreshState() {
  var el = byId("saveState");
  if (S.dirtySoft || S.dirtyTut) { el.textContent = "\u25CF 有未保存修改"; el.className = "save-state err"; }
  else { el.textContent = "已同步"; el.className = "save-state ok"; }
}

/* ---------- API ---------- */
function http(method, url, body) {
  return fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  }).then(function (r) { return r.json().catch(function () { return { ok: false, error: "响应解析失败" }; }); });
}
function loadAll() {
  return http("GET", "/api/data").then(function (d) {
    if (!d.ok) throw new Error(d.error || "读取失败");
    DB = { categories: d.software.categories, catIcons: d.software.catIcons, softwareData: d.software.softwareData, tutorialData: d.tutorials.tutorialData };
    S.softCat = "all"; S.softId = null; S.tutCat = "all"; S.tutId = null;
    S.dirtySoft = false; S.dirtyTut = false;
    renderAll();
    refreshState();
  });
}

/* ================== 软件库 ================== */
function softById(id) {
  for (var i = 0; i < DB.softwareData.length; i++)
    if (String(DB.softwareData[i].id) === String(id)) return DB.softwareData[i];
  return null;
}
function renderSoftCats() {
  var el = byId("catList");
  var h = "";
  var cat = DB.categories;
  function count(slug) {
    if (slug === "all") return DB.softwareData.length;
    var n = 0;
    DB.softwareData.forEach(function (s) { if (s.category === slug) n++; });
    return n;
  }
  var list = [{ slug: "all", name: "\u5168\u90E8\u8D44\u6E90" }].concat(cat.filter(function (c) { return c.slug !== "all"; }));
  list.forEach(function (c) {
    h += '<button class="cat-item' + (S.softCat === c.slug ? " on" : "") + '" data-cat="' + esc(c.slug) + '"><span>' + esc(c.name || c.slug) + '</span><span class="n">' + count(c.slug) + '</span></button>';
  });
  el.innerHTML = h;
}
function renderSoftList() {
  var el = byId("softList");
  var kw = S.softSearch.toLowerCase().trim();
  var items = DB.softwareData.filter(function (s) {
    if (S.softCat !== "all" && s.category !== S.softCat) return false;
    if (kw) {
      var hay = (s.name + " " + (s.description || "")).toLowerCase();
      if (hay.indexOf(kw) < 0) return false;
    }
    return true;
  });
  if (!items.length) { el.innerHTML = '<div class="emptytip">没有匹配的软件</div>'; return; }
  var h = "";
  items.forEach(function (s) {
    var vn = (s.versions || []).length;
    var on = S.softId != null && String(s.id) === String(S.softId) ? " on" : "";
    h += '<div class="soft-item' + on + '" data-sid="' + esc(s.id) + '">' +
      '<div class="soft-ic' + (s.iconImg ? " custom" : "") + '">' + (s.iconImg ? '<img src="' + esc(s.iconImg) + '" alt="">' : '<i class="' + esc(s.icon || "fa-cube") + '"></i>') + '</div>' +
      '<div class="soft-txt"><div class="nm">' + esc(s.name || "(未命名)") + '</div>' +
      '<div class="sb">' + esc(s.category || "") + (vn ? " · " + vn + " 个版本" : " · 暂无版本") + '</div></div></div>';
  });
  el.innerHTML = h;
}
function updateSoftRowText(s) {
  var rows = document.querySelectorAll('.soft-item[data-sid="' + CSS.escape(String(s.id)) + '"]');
  rows.forEach(function (r) {
    var nm = r.querySelector(".nm");
    var sb = r.querySelector(".sb");
    var vn = (s.versions || []).length;
    if (nm) nm.textContent = s.name || "(未命名)";
    if (sb) sb.textContent = (s.category || "") + (vn ? " · " + vn + " 个版本" : " · 暂无版本");
  });
}

function catOptions(cur) {
  var h = "";
  DB.categories.forEach(function (c) {
    if (c.slug === "all") return;
    h += '<option value="' + esc(c.slug) + '"' + (c.slug === cur ? " selected" : "") + ">" + esc(c.name || c.slug) + "</option>";
  });
  return h;
}
function pillInfo(lk) {
  var u = String(lk.url || "").trim();
  var la = String(lk.label || "").trim();
  if (u) return { cls: "green", txt: la || "下载" };
  if (la) return { cls: "gray", txt: "\u5F85\u66F4\u65B0 \u00B7 " + la };
  return { cls: "gray", txt: "\u5F85\u66F4\u65B0" };
}
function updatePill(row) {
  var vi = row.dataset.vi, li = row.dataset.li;
  var s = softById(S.softId);
  var lk = s && s.versions[vi] && s.versions[vi].links[li];
  var pill = row.querySelector(".pill");
  if (!lk || !pill) return;
  var info = pillInfo(lk);
  pill.className = "pill " + info.cls;
  pill.textContent = info.txt;
  pill.title = lk.url || "";
}

function renderSoftEdit() {
  var pane = byId("softEdit");
  var s = softById(S.softId);
  if (!s) { pane.innerHTML = '<div class="emptytip">从左侧列表点选一个软件开始编辑；\n或在列表下方点击「＋ 新增软件」。</div>'; return; }
  var h = "";
  h += '<div class="edit-head"><span class="tt">' + esc(s.name || "未命名") + '</span>' +
    '<button class="mini del" data-act="delsoft">删除软件</button></div>';
  h += '<div class="fld"><label>名称</label><input data-f="name" value="' + attrVal(s.name) + '"></div>';
  h += '<div class="fld"><label>分类</label><select data-f="category">' + catOptions(s.category) + '</select></div>';
  h += '<div class="fld"><label>卡片图标（Font Awesome 类名，如 fa-code）</label><input data-f="icon" value="' + attrVal(s.icon || "") + '" placeholder="fa-code">' +
    '<div class="ico-hint">图标取自 Font Awesome Free（fa- 开头，不带 fas 前缀），填错会显示成方块。</div></div>';
  h += '<div class="fld"><label>简介（卡片上的小字）</label><input data-f="desc" value="' + attrVal(s.description || "") + '"></div>';
  h += '<div class="fld"><label>详细介绍（点开软件的正文）</label><textarea data-f="detail" rows="3">' + esc(s.detailDesc || "") + '</textarea></div>';
  h += '<div class="sub-title">版本与下载链接<button class="mini add" data-act="addver">\uFF0B 添加版本</button></div>';

  var vs = s.versions || [];
  vs.forEach(function (v, vi) {
    var links = v.links || [];
    h += '<div class="ver-card">';
    h += '<div class="ver-head"><input class="ver-name" data-f="ver" data-vi="' + vi + '" value="' + attrVal(v.ver || "") + '" placeholder="版本号，如 CAD2024">' +
      '<button class="mini" data-act="verup" data-vi="' + vi + '" title="上移">\u2191</button>' +
      '<button class="mini" data-act="verdown" data-vi="' + vi + '" title="下移">\u2193</button>' +
      '<button class="mini del" data-act="verdel" data-vi="' + vi + '">删除版本</button></div>';
    links.forEach(function (lk, li) {
      var info = pillInfo(lk);
      h += '<div class="lk-row" data-vi="' + vi + '" data-li="' + li + '">' +
        '<input data-f="url" data-vi="' + vi + '" data-li="' + li + '" value="' + attrVal(lk.url || "") + '" placeholder="https://…（留空 = 待更新）">' +
        '<input data-f="label" data-vi="' + vi + '" data-li="' + li + '" value="' + attrVal(lk.label || "") + '" placeholder="按钮文字">' +
        '<span class="pill ' + info.cls + '" title="' + esc(lk.url || "") + '">' + esc(info.txt) + '</span>' +
        '<button class="mini del" data-act="lkul" data-vi="' + vi + '" data-li="' + li + '">\u2715</button></div>';
    });
    h += '<button class="mini add lk-add" data-act="addlk" data-vi="' + vi + '">\uFF0B 添加链接</button></div>';
  });
  h += '<div class="fld" style="margin-top:10px"><div class="ico-hint">链接规则：填了网址 = 绿色可点；网址留空但填了按钮文字 = 灰色「待更新」占位；两行都空的链接会在保存时自动移除。</div></div>';
  pane.innerHTML = h;
}

function markSoft() {
  S.dirtySoft = true;
  refreshState();
}
function markTut() {
  S.dirtyTut = true;
  refreshState();
}

/* ---------- 软件事件 ---------- */
function onSoftInput(e) {
  var t = e.target;
  var f = t.dataset.f;
  var s = softById(S.softId);
  if (!s || !f) return;
  var vi = +t.dataset.vi, li = +t.dataset.li;
  if (f === "name") { s.name = t.value; updateSoftRowText(s); }
  else if (f === "category") { s.category = t.value; updateSoftRowText(s); renderSoftCats(); }
  else if (f === "icon") s.icon = t.value;
  else if (f === "desc") s.description = t.value;
  else if (f === "detail") s.detailDesc = t.value;
  else if (f === "ver") { if (s.versions[vi]) s.versions[vi].ver = t.value; }
  else if (f === "url") { var lk1 = s.versions[vi] && s.versions[vi].links[li]; if (lk1) { lk1.url = t.value; updatePill(t.closest(".lk-row")); } }
  else if (f === "label") { var lk2 = s.versions[vi] && s.versions[vi].links[li]; if (lk2) { lk2.label = t.value; updatePill(t.closest(".lk-row")); } }
  else return;
  markSoft();
}
function onSoftClick(e) {
  var btn = e.target.closest("[data-act]");
  if (!btn) return;
  var act = btn.dataset.act;
  var s = softById(S.softId);
  if (!s) return;
  var vs = s.versions || (s.versions = []);
  var vi = +btn.dataset.vi;
  if (act === "delsoft") {
    if (!confirm("确定删除软件「" + (s.name || "") + "」吗？此操作在点击「保存到文件」后生效。")) return;
    DB.softwareData = DB.softwareData.filter(function (x) { return String(x.id) !== String(s.id); });
    S.softId = null;
    markSoft(); renderSoftCats(); renderSoftList(); renderSoftEdit();
    toast("已删除「" + (s.name || "") + "」，记得保存");
    return;
  }
  if (act === "addver") {
    vs.push({ ver: "", links: [] });
    markSoft(); renderSoftEdit(); return;
  }
  if (act === "verdel") {
    if (!confirm("删除该版本？")) return;
    vs.splice(vi, 1);
    markSoft(); renderSoftEdit(); updateSoftRowText(s); return;
  }
  if (act === "verup" && vi > 0) { var a = vs.splice(vi, 1)[0]; vs.splice(vi - 1, 0, a); markSoft(); renderSoftEdit(); return; }
  if (act === "verdown" && vi < vs.length - 1) { var b = vs.splice(vi, 1)[0]; vs.splice(vi + 1, 0, b); markSoft(); renderSoftEdit(); return; }
  if (act === "addlk") {
    var v = vs[vi]; if (!v) return;
    (v.links || (v.links = [])).push({ url: "", label: "" });
    markSoft(); renderSoftEdit(); return;
  }
  if (act === "lkul") {
    var v2 = vs[vi]; if (!v2) return;
    (v2.links || []).splice(+btn.dataset.li, 1);
    markSoft(); renderSoftEdit(); return;
  }
}

/* ================== 教程库 ================== */
function tutById(id) {
  for (var i = 0; i < DB.tutorialData.length; i++)
    if (String(DB.tutorialData[i].id) === String(id)) return DB.tutorialData[i];
  return null;
}
function tutCats() {
  var m = {};
  DB.tutorialData.forEach(function (t) { if (t.category) m[t.category] = (m[t.category] || 0) + 1; });
  return m;
}
function renderTutCats() {
  var el = byId("tutCatList");
  var h = '<button class="tut-cat-item' + (S.tutCat === "all" ? " on" : "") + '" data-cat="all"><span>全部教程</span><span class="n">' + DB.tutorialData.length + '</span></button>';
  var m = tutCats();
  Object.keys(m).forEach(function (c) {
    h += '<button class="tut-cat-item' + (S.tutCat === c ? " on" : "") + '" data-cat="' + esc(c) + '"><span>' + esc(c) + '</span><span class="n">' + m[c] + '</span></button>';
  });
  el.innerHTML = h;
}
function renderTutList() {
  var el = byId("tutList");
  var kw = S.tutSearch.toLowerCase().trim();
  var items = DB.tutorialData.filter(function (t) {
    if (S.tutCat !== "all" && t.category !== S.tutCat) return false;
    if (kw && (t.title || "").toLowerCase().indexOf(kw) < 0) return false;
    return true;
  });
  if (!items.length) { el.innerHTML = '<div class="emptytip">没有匹配的教程</div>'; return; }
  var h = "";
  items.forEach(function (t) {
    var on = S.tutId != null && String(t.id) === String(S.tutId) ? " on" : "";
    h += '<div class="tut-item' + on + '" data-tid="' + esc(t.id) + '">' +
      '<div class="soft-ic"><i class="' + esc(t.catIcon || "fa-book") + '"></i></div>' +
      '<div class="soft-txt"><div class="nm">' + esc(t.title || "(未命名)") + '</div>' +
      '<div class="sb">' + esc(t.category || "") + (t.date ? " · " + esc(t.date) : "") + '</div></div></div>';
  });
  el.innerHTML = h;
}
function updateTutRowText(t) {
  var rows = document.querySelectorAll('.tut-item[data-tid="' + CSS.escape(String(t.id)) + '"]');
  rows.forEach(function (r) {
    var nm = r.querySelector(".nm");
    var sb = r.querySelector(".sb");
    if (nm) nm.textContent = t.title || "(未命名)";
    if (sb) sb.textContent = (t.category || "") + (t.date ? " · " + t.date : "");
  });
}

var STEP_NAMES = { h2: "小标题", p: "段落", quote: "引用/警告", note: "提示", ol: "步骤列表", img: "图片" };
function renderStepBody(st, bi) {
  var h = "";
  if (st.t === "ol") {
    var xs = st.x || (st.x = []);
    xs.forEach(function (v, li) {
      h += '<div style="display:flex;gap:5px;margin-bottom:4px"><span style="flex:0 0 22px;color:#94a3b8;font-size:12px;padding-top:5px">' + (li + 1) + '.</span>' +
        '<input data-f="olx" data-bi="' + bi + '" data-li="' + li + '" value="' + attrVal(v) + '" placeholder="步骤内容">' +
        '<button class="mini del" data-act="olrm" data-bi="' + bi + '" data-li="' + li + '">\u2715</button></div>';
    });
    h += '<button class="mini add" data-act="oladd" data-bi="' + bi + '">\uFF0B 添加一步</button>';
    return h;
  }
  if (st.t === "img") {
    h += '<input data-f="imgcap" data-bi="' + bi + '" value="' + attrVal(st.cap || "") + '" placeholder="截图说明（显示在图片下方）">';
    h += '<input data-f="imgalt" data-bi="' + bi + '" value="' + attrVal(st.alt || "") + '" placeholder="图片描述（可选，alt 文本）">';
    h += '<input data-f="imgsrc" data-bi="' + bi + '" value="' + attrVal(st.src || "") + '" placeholder="图片地址（可选，http… 留空则不显示图片）">';
    return h;
  }
  var ph = st.t === "h2" ? "小标题文字" : st.t === "p" ? "段落文字" : "提示/警告文字";
  h += '<textarea data-f="x" data-bi="' + bi + '" placeholder="' + ph + '" rows="2">' + esc(st.x || "") + "</textarea>";
  return h;
}
function renderTutEdit() {
  var pane = byId("tutEdit");
  var t = tutById(S.tutId);
  if (!t) { pane.innerHTML = '<div class="emptytip">从左侧列表点选一篇教程开始编辑；\n或点「＋ 新增教程」。</div>'; return; }
  var h = "";
  h += '<div class="edit-head"><span class="tt">' + esc(t.title || "未命名教程") + '</span>' +
    '<button class="mini del" data-act="deltut">删除教程</button></div>';
  h += '<div class="fld"><label>标题</label><input data-f="title" value="' + attrVal(t.title || "") + '"></div>';
  h += '<div class="fld"><label>分类（自由填写，与软件分类一致更佳）</label><input data-f="tcat" value="' + attrVal(t.category || "") + '" placeholder="如 CAD / 编程开发">' +
    '<div class="ico-hint">左侧教程分类会自动汇总你填写的分类。</div></div>';
  h += '<div class="fld"><label>分类图标（FA 类名）</label><input data-f="catIcon" value="' + attrVal(t.catIcon || "") + '" placeholder="fa-drafting-compass"></div>';
  h += '<div class="fld"><label>发布日期</label><input data-f="date" type="date" value="' + attrVal(t.date || "") + '"></div>';
  h += '<div class="fld"><label>浏览量（数字）</label><input data-f="views" type="number" value="' + esc(t.views == null ? "" : t.views) + '"></div>';
  h += '<div class="fld"><label>摘要（列表页显示）</label><textarea data-f="excerpt" rows="2">' + esc(t.excerpt || "") + "</textarea></div>";
  h += '<div class="sub-title">正文内容（步骤块）</div>';
  (t.steps || []).forEach(function (st, bi) {
    h += '<div class="stp-card t-' + esc(st.t) + '">' +
      '<div class="stp-bar"><span class="stp-tag">' + esc(STEP_NAMES[st.t] || st.t) + '</span>' +
      '<span class="stp-tools">' +
      '<button class="mini" data-act="stpup" data-bi="' + bi + '">\u2191</button>' +
      '<button class="mini" data-act="stpdown" data-bi="' + bi + '">\u2193</button>' +
      '<button class="mini del" data-act="stpdel" data-bi="' + bi + '">删除</button></span></div>' +
      '<div class="stp-body">' + renderStepBody(st, bi) + "</div></div>";
  });
  if (!(t.steps || []).length) h += '<div class="emptytip" style="padding:10px 0">还没有正文，用下方按钮添加段落</div>';
  h += '<div class="stp-adds">';
  h += '<button class="mini add" data-act="addstp" data-t="h2">＋ 小标题</button>';
  h += '<button class="mini add" data-act="addstp" data-t="p">＋ 段落</button>';
  h += '<button class="mini add" data-act="addstp" data-t="note">＋ 提示</button>';
  h += '<button class="mini add" data-act="addstp" data-t="quote">＋ 引用/警告</button>';
  h += '<button class="mini add" data-act="addstp" data-t="ol">＋ 步骤列表</button>';
  h += '<button class="mini add" data-act="addstp" data-t="img">＋ 图片占位</button>';
  h += "</div>";
  pane.innerHTML = h;
}

function onTutInput(e) {
  var t = e.target;
  var f = t.dataset.f;
  var tut = tutById(S.tutId);
  if (!tut || !f) return;
  var bi = +t.dataset.bi, li = +t.dataset.li;
  var steps = tut.steps || (tut.steps = []);
  if (f === "title") { tut.title = t.value; updateTutRowText(tut); }
  else if (f === "tcat") { tut.category = t.value; renderTutCats(); updateTutRowText(tut); }
  else if (f === "catIcon") tut.catIcon = t.value;
  else if (f === "date") tut.date = t.value;
  else if (f === "views") tut.views = t.value === "" ? 0 : +t.value;
  else if (f === "excerpt") tut.excerpt = t.value;
  else if (f === "x") { if (steps[bi]) steps[bi].x = t.value; }
  else if (f === "olx") { if (steps[bi] && steps[bi].x) steps[bi].x[li] = t.value; }
  else if (f === "imgcap") { if (steps[bi]) steps[bi].cap = t.value; }
  else if (f === "imgalt") { if (steps[bi]) steps[bi].alt = t.value; }
  else if (f === "imgsrc") { if (steps[bi]) steps[bi].src = t.value; }
  else return;
  markTut();
}
function onTutClick(e) {
  var btn = e.target.closest("[data-act]");
  if (!btn) return;
  var act = btn.dataset.act;
  var tut = tutById(S.tutId);
  var steps;
  if (tut) steps = tut.steps || (tut.steps = []);
  if (act === "deltut") {
    if (!confirm("确定删除教程「" + (tut.title || "") + "」吗？")) return;
    DB.tutorialData = DB.tutorialData.filter(function (x) { return String(x.id) !== String(tut.id); });
    S.tutId = null;
    markTut(); renderTutCats(); renderTutList(); renderTutEdit();
    return;
  }
  var bi = +btn.dataset.bi;
  if (act === "addstp") {
    if (!tut) return;
    var nt = btn.dataset.t;
    var obj = { t: nt };
    if (nt === "ol") obj.x = [""];
    if (nt === "img") obj = { t: "img", alt: "", cap: "" };
    steps.push(obj);
    markTut(); renderTutEdit(); return;
  }
  if (act === "stpdel") { steps.splice(bi, 1); markTut(); renderTutEdit(); return; }
  if (act === "stpup" && bi > 0) { var a = steps.splice(bi, 1)[0]; steps.splice(bi - 1, 0, a); markTut(); renderTutEdit(); return; }
  if (act === "stpdown" && bi < steps.length - 1) { var b = steps.splice(bi, 1)[0]; steps.splice(bi + 1, 0, b); markTut(); renderTutEdit(); return; }
  if (act === "oladd") { var st = steps[bi]; if (st) (st.x || (st.x = [])).push(""); markTut(); renderTutEdit(); return; }
  if (act === "olrm") { var st2 = steps[bi]; if (st2) st2.x.splice(+btn.dataset.li, 1); markTut(); renderTutEdit(); return; }
}

/* ================== 保存 / 备份 ================== */
function cleanSoftList(list) {
  return clone(list).map(function (s) {
    if (!s.versions || !s.versions.length) return s;
    s.versions = s.versions
      .filter(function (v) { return String(v.ver || "").trim() !== "" || ((v.links || []).length > 0); })
      .map(function (v) {
        var lks = (v.links || []).filter(function (l) {
          return String(l.url || "").trim() !== "" || String(l.label || "").trim() !== "";
        });
        v.links = lks;
        return v;
      });
    return s;
  });
}
function cleanTutList(list) {
  return clone(list).map(function (t) {
    (t.steps || []).forEach(function (st) {
      if (st.t === "ol") st.x = (st.x || []).filter(function (v) { return String(v).trim() !== ""; });
    });
    return t;
  });
}
function doSave() {
  var body = {};
  if (S.dirtySoft) body.software = {
    categories: clone(DB.categories),
    catIcons: clone(DB.catIcons),
    softwareData: cleanSoftList(DB.softwareData)
  };
  if (S.dirtyTut) body.tutorials = { tutorialData: cleanTutList(DB.tutorialData) };
  if (!body.software && !body.tutorials) { toast("没有需要保存的修改", true); return; }
  byId("btnSave").disabled = true;
  return http("POST", "/api/save", body).then(function (r) {
    byId("btnSave").disabled = false;
    if (!r.ok) { toast(r.error || "保存失败", true); return; }
    S.dirtySoft = false; S.dirtyTut = false;
    refreshState();
    toast("已保存到文件：" + r.saved.join("、") + "（自动备份已生成）");
    return http("GET", "/api/data").then(function () { /* 后台刷新备份列表即可 */ });
  }).catch(function (e) {
    byId("btnSave").disabled = false;
    toast("保存失败：" + e.message, true);
  });
}
function openBackups() {
  byId("bkModal").classList.add("show");
  renderBk();
}
function closeBackups() { byId("bkModal").classList.remove("show"); }
function renderBk() {
  http("GET", "/api/backups").then(function (r) {
    var el = byId("bkList");
    if (!r.ok || !r.backups.length) { el.innerHTML = '<div class="bk-empty">暂无备份。每次点「保存到文件」前都会自动备份上一版，可随时回滚。</div>'; return; }
    var h = "";
    r.backups.forEach(function (b) {
      var d = new Date(b.mtime);
      h += '<div class="bk-row"><span class="bk-k">' + esc(b.kind) + '</span><span class="bk-nm">' + esc(b.file) +
        '<br><span style="color:#94a3b8;font-size:11px">' + d.toLocaleString() + " · " + Math.round(b.size / 1024) + " KB</span></span>" +
        '<button class="mini" data-bk="' + esc(b.file) + '">恢复此版本</button></div>';
    });
    el.innerHTML = h;
  });
}
function restoreBk(file) {
  if (S.dirtySoft || S.dirtyTut) {
    if (!confirm("当前有未保存的修改，恢复备份将丢弃它们。继续？")) return;
  }
  if (!confirm("确定恢复「" + file + "」？恢复前会自动为当前版本留档。")) return;
  return http("POST", "/api/restore", { file: file }).then(function (r) {
    if (!r.ok) { toast(r.error || "恢复失败", true); return; }
    toast("已恢复 " + r.restored + "，正在刷新…");
    closeBackups();
    loadAll();
  });
}

/* ================== 渲染汇总 & 事件绑定 ================== */
function renderSoftPane() { renderSoftCats(); renderSoftList(); renderSoftEdit(); }
function renderTutPane() { renderTutCats(); renderTutList(); renderTutEdit(); }
function renderAll() {
  renderSoftCats(); renderSoftList(); renderSoftEdit();
  renderTutCats(); renderTutList(); renderTutEdit();
}

function switchTab(tab) {
  S.tab = tab;
  byId("tabSoft").className = "tab" + (tab === "soft" ? " on" : "");
  byId("tabTut").className = "tab" + (tab === "tut" ? " on" : "");
  byId("panelSoft").className = "panel" + (tab === "soft" ? " on" : "");
  byId("panelTut").className = "panel" + (tab === "tut" ? " on" : "");
}

function init() {
  // 顶部按钮
  byId("tabSoft").addEventListener("click", function () { switchTab("soft"); });
  byId("tabTut").addEventListener("click", function () { switchTab("tut"); });
  byId("btnSave").addEventListener("click", doSave);
  byId("btnBackup").addEventListener("click", openBackups);
  byId("bkClose").addEventListener("click", closeBackups);
  byId("bkModal").addEventListener("click", function (e) {
    if (e.target === byId("bkModal")) closeBackups();
    var b = e.target.closest("[data-bk]");
    if (b) restoreBk(b.dataset.bk);
  });

  // 软件分类
  byId("catList").addEventListener("click", function (e) {
    var b = e.target.closest("[data-cat]");
    if (!b) return;
    S.softCat = b.dataset.cat;
    renderSoftCats(); renderSoftList();
  });
  // 软件列表选择
  byId("softList").addEventListener("click", function (e) {
    var row = e.target.closest("[data-sid]");
    if (!row) return;
    S.softId = row.dataset.sid;
    renderSoftList(); renderSoftEdit();
  });
  // 新增软件
  byId("btnAddSoft").addEventListener("click", function () {
    var maxId = 0;
    DB.softwareData.forEach(function (s) { if (+s.id > maxId) maxId = +s.id; });
    var cat = S.softCat !== "all" ? S.softCat : (DB.categories[1] ? DB.categories[1].slug : "");
    var icon = DB.catIcons[cat] || "fa-cube";
    var obj = { id: maxId + 1, name: "新软件", category: cat, platform: "cross", icon: icon, description: "", detailDesc: "", versions: [] };
    DB.softwareData.push(obj);
    S.softCat = "all";
    S.softId = obj.id;
    markSoft();
    renderSoftCats(); renderSoftList(); renderSoftEdit();
    toast("已新增「新软件」，请改名并填写内容，然后保存");
  });
  // 搜索
  byId("softSearch").addEventListener("input", function (e) { S.softSearch = e.target.value; renderSoftList(); });

  // 编辑表单委托
  byId("softEdit").addEventListener("input", onSoftInput);
  byId("softEdit").addEventListener("click", onSoftClick);

  // 教程
  byId("tutCatList").addEventListener("click", function (e) {
    var b = e.target.closest("[data-cat]");
    if (!b) return;
    S.tutCat = b.dataset.cat;
    renderTutCats(); renderTutList();
  });
  byId("tutList").addEventListener("click", function (e) {
    var row = e.target.closest("[data-tid]");
    if (!row) return;
    S.tutId = row.dataset.tid;
    renderTutList(); renderTutEdit();
  });
  byId("btnAddTut").addEventListener("click", function () {
    var maxId = 0;
    DB.tutorialData.forEach(function (t) { if (+t.id > maxId) maxId = +t.id; });
    var d = new Date();
    function p(n) { return (n < 10 ? "0" : "") + n; }
    var today = d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
    var obj = { id: maxId + 1, title: "新教程标题", category: S.tutCat !== "all" ? S.tutCat : "", catIcon: "fa-book", date: today, views: 0, excerpt: "", steps: [] };
    DB.tutorialData.push(obj);
    S.tutCat = "all";
    S.tutId = obj.id;
    markTut();
    renderTutCats(); renderTutList(); renderTutEdit();
    toast("已新增教程，请填写标题与正文，然后保存");
  });
  byId("tutSearch").addEventListener("input", function (e) { S.tutSearch = e.target.value; renderTutList(); });
  byId("tutEdit").addEventListener("input", onTutInput);
  byId("tutEdit").addEventListener("click", onTutClick);

  // 关闭页面前提醒未保存
  window.addEventListener("beforeunload", function (e) {
    if (S.dirtySoft || S.dirtyTut) { e.preventDefault(); e.returnValue = ""; }
  });

  loadAll().catch(function (err) {
    toast("加载失败：" + err.message + "（确认已通过「数据编辑器.bat」启动服务）", true);
  });
}

document.addEventListener("DOMContentLoaded", init);
