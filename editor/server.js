// rjzyweb 本地数据编辑器 - 本地服务
// 仅监听 127.0.0.1，零 npm 依赖（Node 原生 http）
// 作用：读取/写回 js/data.js 与 js/tutorials-data.js，保存前自动校验+备份
"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");          // 项目根目录
const EDITOR_DIR = __dirname;
const BACKUP_DIR = path.join(EDITOR_DIR, ".backups");
const PORT = 8600;

const DATA_FILE = path.join(ROOT, "js", "data.js");
const TUT_FILE = path.join(ROOT, "js", "tutorials-data.js");

const DATA_HEADER = `// ============================================================
//  软件库数据层
//  说明：本文件由「数据编辑器」自动生成（双击 数据编辑器.bat）
//  含三部分：categories 分类配置 / catIcons 分类图标 / softwareData 软件数据
//  如需手改：请保持逗号、括号成对；保存后可运行 push-data.bat 自动查错
// ============================================================

`;

const TUT_HEADER = `/* 安装教程库数据 - 由「数据编辑器」自动生成（双击 数据编辑器.bat）
   字段：id / title / category / catIcon / date / views / excerpt / steps
   steps 块类型：
     {t:'h2', x:'小标题'}  {t:'p', x:'段落'}  {t:'quote', x:'注意/警告'}
     {t:'note', x:'提示'}  {t:'ol', x:['步骤1',...]}
     {t:'img', alt:'', cap:'说明', src:'可选真实地址'}
   如需手改：保持逗号、括号成对即可。
*/

`;

// ---------------- 工具 ----------------
function readUtf8(f) { return fs.readFileSync(f, "utf8"); }

function loadVars(file, names) {
  const code = readUtf8(file);
  const sandbox = { console: console, Date: Date, Math: Math, JSON: JSON };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: file });
  const out = {};
  names.forEach(function (n) { out[n] = sandbox[n]; });
  return out;
}

function safeFilename(s) {
  return String(s).replace(/[\\/:*?"<>|]/g, "_").slice(0, 60);
}

function ts() {
  const d = new Date();
  function p(n) { return (n < 10 ? "0" : "") + n; }
  return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) +
         "_" + p(d.getHours()) + p(d.getMinutes()) + p(d.getSeconds());
}

// ---------------- JS 序列化（生成 单引号/裸 key/两空格 风格） ----------------
function lit(v) {
  if (v === null || v === undefined) return "null";
  const t = typeof v;
  if (t === "string") {
    return "'" + v.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\r/g, "").replace(/\n/g, "\\n") + "'";
  }
  if (t === "number") return Number.isFinite(v) ? String(v) : "0";
  if (t === "boolean") return String(v);
  return "null";
}
function bareKey(k) {
  if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(k)) return true;
  return /^[^\s'"\\,:;]*$/.test(k) && k.length > 0; // 中文等非 ASCII 裸 key（与现文件一致）
}
function keyOf(k) { return bareKey(k) ? k : lit(k); }
function pad(ind) { return "  ".repeat(ind); }
function isLeaf(v) { return v === null || v === undefined || ["string", "number", "boolean"].indexOf(typeof v) >= 0; }
function estInline(o) {
  let n = 2;
  for (const k of Object.keys(o)) {
    const l = lit(o[k]);
    n += (bareKey(k) ? k.length : l.length) + l.length + 2;
  }
  return n;
}
function serInline(o) {
  return "{" + Object.keys(o).map(function (k) { return keyOf(k) + ": " + lit(o[k]); }).join(", ") + "}";
}
function serArr(a, ind) {
  if (!a.length) return "[]";
  return "[\n" + a.map(function (x) { return pad(ind + 1) + serVal(x, ind + 1); }).join(",\n") + "\n" + pad(ind) + "]";
}
function serObj(o, ind) {
  const ks = Object.keys(o);
  if (!ks.length) return "{}";
  const allLeaf = ks.every(function (k) { return isLeaf(o[k]); });
  if (allLeaf && estInline(o) <= 120) return serInline(o);
  return "{\n" + ks.map(function (k) {
    return pad(ind + 1) + keyOf(k) + ": " + serVal(o[k], ind + 1);
  }).join(",\n") + "\n" + pad(ind) + "}";
}
function serVal(v, ind) {
  ind = ind || 0;
  if (Array.isArray(v)) return serArr(v, ind);
  if (v && typeof v === "object") return serObj(v, ind);
  return lit(v);
}

function buildDataFile(categories, catIcons, list) {
  return DATA_HEADER +
    "var categories = " + serVal(categories, 0) + ";\n\n" +
    "// 分类对应的卡片图标\n" +
    "var catIcons = " + serVal(catIcons, 0) + ";\n\n" +
    "// ---- 软件数据 ----\n" +
    "var softwareData = " + serVal(list, 0) + ";\n";
}
function buildTutFile(list) {
  return TUT_HEADER + "var tutorialData = " + serVal(list, 0) + ";\n";
}

// ---------------- 校验 + 规范化 ----------------
function errorsOf(list) { return list.filter(function (e) { return !!e; }); }

function validateAll(categories, catIcons, softwareData, tutorialData) {
  const errs = [];

  if (!Array.isArray(categories)) errs.push("categories 不是数组");
  const slugs = {};
  (Array.isArray(categories) ? categories : []).forEach(function (c, i) {
    if (!c || !c.slug) { errs.push("分类配置第 " + (i + 1) + " 项缺 slug"); return; }
    if (slugs[c.slug]) errs.push("分类 slug 重复: " + c.slug);
    slugs[c.slug] = 1;
  });

  if (!softwareData || !Array.isArray(softwareData)) errs.push("softwareData 不是数组");
  else {
    const ids = {};
    softwareData.forEach(function (s, i) {
      if (!s || typeof s !== "object") { errs.push("软件第 " + (i + 1) + " 项不是对象"); return; }
      const id = s.id;
      if (id === undefined || id === null || id === "") errs.push("软件第 " + (i + 1) + " 项缺 id");
      else if (ids[id]) errs.push("软件 id 重复: " + id);
      else ids[id] = 1;
      if (!s.name) errs.push("id=" + (id === undefined ? "?" : id) + " 缺名称 name");
      if (s.category !== undefined && s.category !== "" && !slugs[s.category])
        errs.push("id=" + id + " 的分类不在分类配置中: " + s.category);
      if (s.versions !== undefined && !Array.isArray(s.versions)) errs.push("id=" + id + " 的 versions 不是数组");
      (Array.isArray(s.versions) ? s.versions : []).forEach(function (v, vi) {
        if (!v || typeof v !== "object") { errs.push("id=" + id + " 版本第 " + (vi + 1) + " 项不是对象"); return; }
        if (v.links !== undefined && !Array.isArray(v.links)) errs.push("id=" + id + " 版本 " + v.ver + " 的 links 不是数组");
        (Array.isArray(v.links) ? v.links : []).forEach(function (l, li) {
          if (l && typeof l === "object") {
            if (l.url === undefined && l.label === undefined)
              errs.push("id=" + id + " 版本 " + v.ver + " 链接第 " + (li + 1) + " 项为空");
          } else errs.push("id=" + id + " 版本 " + v.ver + " 链接第 " + (li + 1) + " 项格式错误");
        });
      });
    });
  }

  if (!tutorialData || !Array.isArray(tutorialData)) errs.push("tutorialData 不是数组");
  else {
    const ids = {};
    tutorialData.forEach(function (t, i) {
      if (!t || typeof t !== "object") { errs.push("教程第 " + (i + 1) + " 项不是对象"); return; }
      const id = t.id;
      if (id === undefined || id === null || id === "") errs.push("教程第 " + (i + 1) + " 项缺 id");
      else if (ids[id]) errs.push("教程 id 重复: " + id);
      else ids[id] = 1;
      if (!t.title) errs.push("教程 id=" + id + " 缺标题 title");
      if (t.steps !== undefined && !Array.isArray(t.steps)) errs.push("教程 id=" + id + " 的 steps 不是数组");
      (Array.isArray(t.steps) ? t.steps : []).forEach(function (st, si) {
        if (!st || typeof st !== "object") { errs.push("教程 id=" + id + " 步骤第 " + (si + 1) + " 项不是对象"); return; }
        const allow = ["h2", "p", "quote", "note", "ol", "img"];
        if (allow.indexOf(st.t) < 0) errs.push("教程 id=" + id + " 步骤第 " + (si + 1) + " 项类型不支持: " + st.t);
        if (st.t === "ol" && !Array.isArray(st.x)) errs.push("教程 id=" + id + " 步骤 " + (si + 1) + " 是列表但 x 不是数组");
      });
    });
  }
  return errorsOf(errs);
}

function ensureDefaults(categories, catIcons, softwareData, tutorialData) {
  const icons = catIcons && typeof catIcons === "object" ? catIcons : {};
  (Array.isArray(softwareData) ? softwareData : []).forEach(function (s) {
    if (!s || typeof s !== "object") return;
    if (!Array.isArray(s.versions)) s.versions = [];
    s.versions.forEach(function (v) {
      if (v && typeof v === "object" && !Array.isArray(v.links)) v.links = [];
    });
    if (!s.category && Array.isArray(categories) && categories.length) s.category = categories[0].slug;
    if (!s.icon) s.icon = icons[s.category] || "fa-cube";
  });
  (Array.isArray(tutorialData) ? tutorialData : []).forEach(function (t) {
    if (!t || typeof t !== "object") return;
    if (!Array.isArray(t.steps)) t.steps = [];
  });
}

function checkSyntax(content, fileHint) {
  const sandbox = { console: console };
  vm.createContext(sandbox);
  vm.runInContext(content, sandbox, { filename: fileHint || "data.js" });
}

// ---------------- HTTP ----------------
function sendJson(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(body);
}
function readBody(req, cb) {
  let d = "";
  req.on("data", function (c) {
    d += c;
    if (d.length > 50 * 1024 * 1024) { req.destroy(); }
  });
  req.on("end", function () {
    if (!d) return cb(null);
    try { cb(JSON.parse(d)); } catch (e) { cb(null); }
  });
  req.on("error", function () { cb(null); });
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2"
};

function backupFile(src, prefix) {
  if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
  const dst = path.join(BACKUP_DIR, prefix + "." + ts() + ".bak");
  fs.copyFileSync(src, dst);
  return path.basename(dst);
}

function getBackups() {
  if (!fs.existsSync(BACKUP_DIR)) return [];
  return fs.readdirSync(BACKUP_DIR)
    .filter(function (n) { return /\.bak$/.test(n); })
    .map(function (n) {
      const st = fs.statSync(path.join(BACKUP_DIR, n));
      return { file: n, kind: /^data\.js\./.test(n) ? "软件库" : "教程库", size: st.size, mtime: st.mtimeMs };
    })
    .sort(function (a, b) { return b.mtime - a.mtime; });
}

const server = http.createServer(function (req, res) {
  const u = new URL(req.url, "http://127.0.0.1:" + PORT);
  const p = u.pathname;
  try {
    // ---- 静态资源（编辑器自身） ----
    if (req.method === "GET" && (p === "/" || p === "/index.html")) {
      const f = path.join(EDITOR_DIR, "index.html");
      res.writeHead(200, { "Content-Type": MIME[".html"] });
      return res.end(readUtf8(f));
    }
    if (req.method === "GET" && p === "/app.js") {
      const f = path.join(EDITOR_DIR, "app.js");
      res.writeHead(200, { "Content-Type": MIME[".js"] });
      return res.end(readUtf8(f));
    }
    if (req.method === "GET" && p === "/favicon.svg") {
      const f = path.join(EDITOR_DIR, "favicon.svg");
      if (fs.existsSync(f)) { res.writeHead(200, { "Content-Type": MIME[".svg"] }); return res.end(readUtf8(f)); }
    }

    // ---- 读取全部数据 ----
    if (req.method === "GET" && p === "/api/data") {
      const d = loadVars(DATA_FILE, ["categories", "catIcons", "softwareData"]);
      const t = loadVars(TUT_FILE, ["tutorialData"]);
      return sendJson(res, 200, {
        ok: true,
        software: { categories: d.categories || [], catIcons: d.catIcons || {}, softwareData: d.softwareData || [] },
        tutorials: { tutorialData: t.tutorialData || [] },
        backups: getBackups()
      });
    }

    // ---- 保存 ----
    if (req.method === "POST" && p === "/api/save") {
      return readBody(req, function (body) {
        if (!body || typeof body !== "object") return sendJson(res, 400, { ok: false, error: "请求体不是 JSON" });
        const wantSoft = body.software !== undefined;
        const wantTut = body.tutorials !== undefined;
        if (!wantSoft && !wantTut) return sendJson(res, 400, { ok: false, error: "没有要保存的内容" });

        let categories = [], catIcons = {}, softwareData = [], tutorialData = [];
        if (wantSoft) {
          categories = (body.software && body.software.categories) || [];
          catIcons = (body.software && body.software.catIcons) || {};
          softwareData = (body.software && body.software.softwareData) || [];
        } else {
          const cur = loadVars(DATA_FILE, ["categories", "catIcons", "softwareData"]);
          categories = cur.categories || []; catIcons = cur.catIcons || {}; softwareData = cur.softwareData || [];
        }
        if (wantTut) {
          tutorialData = (body.tutorials && body.tutorials.tutorialData) || [];
        } else {
          const cur = loadVars(TUT_FILE, ["tutorialData"]);
          tutorialData = cur.tutorialData || [];
        }

        ensureDefaults(categories, catIcons, softwareData, tutorialData);
        const errs = validateAll(categories, catIcons, softwareData, tutorialData);
        if (errs.length) return sendJson(res, 400, { ok: false, error: "校验未通过（未写入任何文件）：\n- " + errs.join("\n- ") });

        const saved = [];
        try {
          if (wantSoft) {
            checkSyntax(buildDataFile(categories, catIcons, softwareData), "js/data.js");
            backupFile(DATA_FILE, "data.js");
            fs.writeFileSync(DATA_FILE, buildDataFile(categories, catIcons, softwareData), "utf8");
            checkSyntax(readUtf8(DATA_FILE), "js/data.js"); // 写后复检，异常则回滚
            saved.push("js/data.js");
          }
          if (wantTut) {
            checkSyntax(buildTutFile(tutorialData), "js/tutorials-data.js");
            backupFile(TUT_FILE, "tutorials-data.js");
            fs.writeFileSync(TUT_FILE, buildTutFile(tutorialData), "utf8");
            checkSyntax(readUtf8(TUT_FILE), "js/tutorials-data.js");
            saved.push("js/tutorials-data.js");
          }
        } catch (e) {
          // 任一环节失败：从备份恢复被改文件，保证不破坏线上数据
          const bk = fs.readdirSync(BACKUP_DIR).filter(function (n) { return /\.bak$/.test(n); }).sort();
          try {
            if (wantSoft) {
              const last = bk.filter(function (n) { return /^data\.js\./.test(n); }).pop();
              if (last) fs.copyFileSync(path.join(BACKUP_DIR, last), DATA_FILE);
            }
            if (wantTut) {
              const last = bk.filter(function (n) { return /^tutorials-data\.js\./.test(n); }).pop();
              if (last) fs.copyFileSync(path.join(BACKUP_DIR, last), TUT_FILE);
            }
          } catch (e2) { /* ignore */ }
          return sendJson(res, 500, { ok: false, error: "写盘失败，已自动回滚：" + e.message });
        }
        return sendJson(res, 200, { ok: true, saved: saved, backups: getBackups() });
      });
    }

    // ---- 备份列表 ----
    if (req.method === "GET" && p === "/api/backups") {
      return sendJson(res, 200, { ok: true, backups: getBackups() });
    }

    // ---- 从备份恢复 ----
    if (req.method === "POST" && p === "/api/restore") {
      return readBody(req, function (body) {
        const file = body && body.file;
        if (!file || !/^(data|tutorials-data)\.js\.\d{4}-\d{2}-\d{2}_\d{6}\.bak$/.test(file))
          return sendJson(res, 400, { ok: false, error: "非法的备份文件名" });
        const target = /^data\.js\./.test(file) ? DATA_FILE : TUT_FILE;
        const src = path.join(BACKUP_DIR, file);
        if (!fs.existsSync(src)) return sendJson(res, 404, { ok: false, error: "备份文件不存在" });
        try {
          const content = readUtf8(src);
          checkSyntax(content, path.basename(target));            // 恢复前校验
          backupFile(target, /^data\.js\./.test(file) ? "data.js" : "tutorials-data.js"); // 当前版本先留档（可撤销）
          fs.writeFileSync(target, content, "utf8");
          checkSyntax(readUtf8(target), path.basename(target));
          return sendJson(res, 200, { ok: true, restored: path.basename(target), backups: getBackups() });
        } catch (e) {
          return sendJson(res, 500, { ok: false, error: "恢复失败：" + e.message });
        }
      });
    }

    sendJson(res, 404, { ok: false, error: "Not found: " + p });
  } catch (e) {
    sendJson(res, 500, { ok: false, error: "Server error: " + e.message });
  }
});

server.on("error", function (e) {
  if (e.code === "EADDRINUSE") {
    console.error("[ERROR] Port " + PORT + " is already in use.");
    console.error("Maybe the editor is already running. Close its window and retry.");
    process.exit(1);
  }
  if (e.code === "EACCES") {
    console.error("[ERROR] Cannot bind port " + PORT + " (permission denied).");
    console.error("On Windows this usually means the port is reserved by the system");
    console.error("(Hyper-V/WSL excluded port ranges) or blocked by another rule.");
    console.error("Please tell your assistant the message above - the fix is to");
    console.error("change the PORT number in editor/server.js to a free port.");
    process.exit(1);
  }
  throw e;
});

server.listen(PORT, "127.0.0.1", function () {
  console.log("========================================");
  console.log("  rjzyweb Data Editor is running");
  console.log("  Open:  http://127.0.0.1:" + PORT);
  console.log("  Close this window to stop the editor.");
  console.log("  Note: edits only write files when you");
  console.log("  click 'Save to file'. Then use push-data.bat");
  console.log("  to publish to GitHub as usual.");
  console.log("========================================");
});
