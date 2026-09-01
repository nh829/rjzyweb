// ============================================================
//  应用逻辑 - 渲染、搜索、模态框、收藏、主题、快捷键
//  理论上你不需要修改这个文件
// ============================================================

// ---- 状态 ----
var FAV_KEY = 'rjzy_favs', THEME_KEY = 'rjzy_theme';
var state = {activeCat:'all', searchKeyword:'', results:[], resultIdx:-1, searchMode:false, favs:[], curId:null};
function $(id){return document.getElementById(id);}
var navList = $('navList'), gridCt = $('gridContainer'), searchIn = $('searchInput');
var pageTitle = $('pageTitle'), totalCt = $('totalCount');
var modal = $('swModal'), mName = $('mName'), mCat = $('mCat'), mIcon = $('mIcon'), mDesc = $('mDesc'), mVer = $('mVerList');
var mainEl = document.querySelector('.main');

// ---- 收藏 ----
function loadFavs(){try{state.favs=JSON.parse(localStorage.getItem(FAV_KEY)||'[]');}catch(e){state.favs=[];}}
function saveFavs(){try{localStorage.setItem(FAV_KEY,JSON.stringify(state.favs));}catch(e){}}
function isFav(id){return state.favs.indexOf(id)!==-1;}
function toggleFav(id){
  if(isFav(id)){state.favs=state.favs.filter(function(x){return x!==id;});}
  else{state.favs.push(id);}
  saveFavs();updateFavUI(id);updateNavCounts();
}
function setFavBtn(el,id){
  if(!el)return;
  var on=isFav(id);
  el.classList.toggle('on',on);
  el.innerHTML='<i class="fa'+(on?'s':'r')+' fa-star"></i>';
}
function updateFavUI(id){
  document.querySelectorAll('.card-fav[data-fav="'+id+'"]').forEach(function(el){setFavBtn(el,id);});
  var mb=$('mFav');
  if(mb&&state.curId===id)setFavBtn(mb,id);
}

// ---- 主题 ----
function applyTheme(t){if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}else{document.documentElement.removeAttribute('data-theme');}}
function initTheme(){
  var t=localStorage.getItem(THEME_KEY)||'light';
  applyTheme(t);
  var tb=$('themeToggle');
  if(tb)tb.innerHTML='<i class="fas '+(t==='dark'?'fa-sun':'fa-moon')+'"></i>';
}
function toggleTheme(){
  var nxt=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';
  applyTheme(nxt);localStorage.setItem(THEME_KEY,nxt);
  var tb=$('themeToggle');
  if(tb)tb.innerHTML='<i class="fas '+(nxt==='dark'?'fa-sun':'fa-moon')+'"></i>';
}

// ---- 构建导航 ----
function buildNav(){
  navList.innerHTML='';
  categories.forEach(function(c,i){
    var li=document.createElement('li');
    li.className='nav-item'+(i===0?' active':'');
    li.dataset.cat=c.slug;
    var cnt=document.createElement('span');
    cnt.className='count';cnt.id='cnt_'+c.slug;
    var total=c.slug==='all'?softwareData.length:softwareData.filter(function(s){return s.category===c.slug;}).length;
    cnt.textContent=total;
    li.innerHTML='<i class="fas '+c.icon+'"></i><span>'+c.name+'</span>';
    li.appendChild(cnt);
    li.addEventListener('click',function(){switchCat(this.dataset.cat);});
    navList.appendChild(li);
  });
  // 收藏入口
  var fl=document.createElement('li');
  fl.className='nav-item nav-fav';fl.dataset.cat='fav';
  fl.innerHTML='<i class="fas fa-star"></i><span>我的收藏</span>';
  var fcnt=document.createElement('span');
  fcnt.className='count';fcnt.id='cnt_fav';fcnt.textContent=state.favs.length;
  fl.appendChild(fcnt);
  fl.addEventListener('click',function(){switchCat('fav');});
  navList.appendChild(fl);
  // 安装教程库入口（最末位）
  var tl=document.createElement('li');
  tl.className='nav-item nav-tut';
  tl.innerHTML='<i class="fas fa-book"></i><span><a href="tutorials.html" style="color:inherit;text-decoration:none;display:contents">安装教程库</a></span>';
  navList.appendChild(tl);
}

function updateNavCounts(){
  categories.forEach(function(c){
    var el=$('cnt_'+c.slug);
    if(el){el.textContent=c.slug==='all'?softwareData.length:softwareData.filter(function(s){return s.category===c.slug;}).length;}
  });
  var fe=$('cnt_fav');if(fe)fe.textContent=state.favs.length;
}

function switchCat(slug){
  if(slug===state.activeCat&&!state.searchMode)return;
  state.activeCat=slug; state.searchKeyword=''; searchIn.value=''; state.searchMode=false;
  state.results=[]; state.resultIdx=-1; hideSearchBar();
  document.querySelectorAll('.nav-item').forEach(function(el){el.classList.remove('active');});
  document.querySelectorAll('.nav-item[data-cat="'+slug+'"]').forEach(function(el){el.classList.add('active');});
  renderAll();
  if(window.innerWidth<=768){$('sidebar').classList.remove('show');$('overlay').classList.remove('show');}
}

// ---- 渲染 ----
function renderAll(){
  if(state.searchMode){renderSearch();return;}
  updateNavCounts();
  if(state.activeCat==='fav'){
    pageTitle.textContent='我的收藏';
    var fitems=softwareData.filter(function(s){return isFav(s.id);});
    totalCt.textContent='共 '+fitems.length+' 款';
    gridCt.innerHTML=renderSection({name:'我的收藏',icon:'fa-star'},fitems);
    bindCardClicks();return;
  }
  var title='全部资源',count=softwareData.length;
  if(state.activeCat!=='all'){
    var c=categories.find(function(x){return x.slug===state.activeCat;});
    if(c)title=c.name;
    count=softwareData.filter(function(s){return s.category===state.activeCat;}).length;
  }
  pageTitle.textContent=title;
  totalCt.textContent='共 '+count+' 款';
  var html='';
  if(state.activeCat==='all'){
    categories.slice(1).forEach(function(cat){
      var items=softwareData.filter(function(s){return s.category===cat.slug;});
      if(items.length===0)return;
      html+=renderSection(cat,items);
    });
  }else{
    var cat=categories.find(function(x){return x.slug===state.activeCat;});
    var items=softwareData.filter(function(s){return s.category===state.activeCat;});
    html+=renderSection(cat||state.activeCat,items);
  }
  gridCt.innerHTML=html;
  bindCardClicks();
}

function cardFavHTML(s){
  return '<button class="card-fav'+(isFav(s.id)?' on':'')+'" data-fav="'+s.id+'" title="收藏/取消收藏"><i class="fa'+(isFav(s.id)?'s':'r')+' fa-star"></i></button>';
}

function renderSection(cat,items){
  var name=typeof cat==='object'?cat.name:cat;
  var icon=cat.icon||catIcons[name]||'fa-cube';
  var h='<div class="category-section"><div class="category-head"><i class="fas '+icon+'"></i><h3>'+name+'</h3><span class="count-badge">'+items.length+'款</span></div><div class="grid">';
  if(items.length===0){
    h+='<div class="no-data"><i class="fas fa-inbox"></i><h3>暂无资源</h3><p>'+(state.activeCat==='fav'?'还没有收藏任何软件，点击卡片上的星标收藏吧':'该分类还没有收录资源')+'</p></div>';
  }else{
    items.forEach(function(s){
      var si=catIcons[s.category]||'fa-cube';
      h+='<div class="card" data-id="'+s.id+'">'+cardFavHTML(s);
      h+='<div class="card-icon"><i class="fas '+(s.icon||si)+'"></i></div>';
      h+='<div class="card-body"><div class="card-name">'+esc(s.name)+'</div><div class="card-desc">'+esc(s.description)+'</div></div>';
      h+='</div>';
    });
  }
  h+='</div></div>';
  return h;
}

// ---- 搜索 ----
function performSearch(){
  var kw=searchIn.value.trim();
  if(!kw){state.searchMode=false;state.searchKeyword='';state.results=[];state.resultIdx=-1;hideSearchBar();renderAll();return;}
  state.searchKeyword=kw;state.searchMode=true;state.activeCat='all';
  document.querySelectorAll('.nav-item').forEach(function(el){el.classList.remove('active');});
  document.querySelectorAll('.nav-item[data-cat="all"]').forEach(function(el){el.classList.add('active');});
  renderSearch();
}

function renderSearch(){
  var kw=state.searchKeyword.toLowerCase();
  if(!kw){renderAll();return;}
  var results=softwareData.filter(function(s){
    return s.name.toLowerCase().indexOf(kw)!==-1||s.description.toLowerCase().indexOf(kw)!==-1||s.detailDesc.toLowerCase().indexOf(kw)!==-1;
  });
  state.results=results;state.resultIdx=-1;
  if(results.length>0)showSearchBar(results.length);else hideSearchBar();
  pageTitle.textContent='搜索结果';totalCt.textContent='共 '+results.length+' 项';
  var html='<div class="category-section"><div class="category-head"><i class="fas fa-search"></i><h3>搜索结果 ('+results.length+')</h3></div><div class="grid">';
  if(results.length===0){
    html+='<div class="no-data"><i class="fas fa-search-minus"></i><h3>未找到匹配资源</h3><p>试试其他关键词</p></div>';
  }else{
    results.forEach(function(s,idx){
      var si=catIcons[s.category]||'fa-cube';
      html+='<div class="card" data-id="'+s.id+'" data-idx="'+idx+'">'+cardFavHTML(s);
      html+='<div class="card-icon"><i class="fas '+(s.icon||si)+'"></i></div>';
      html+='<div class="card-body"><div class="card-name">'+hl(esc(s.name),kw)+'</div><div class="card-desc">'+hl(esc(s.description),kw)+'</div></div>';
      html+='</div>';
    });
  }
  html+='</div></div>';
  gridCt.innerHTML=html;
  bindCardClicks();
}

function showSearchBar(cnt){
  var bar=$('searchBar');
  if(!bar){bar=document.createElement('div');bar.id='searchBar';bar.className='search-bar-info';gridCt.parentNode.insertBefore(bar,gridCt);}
  bar.classList.add('show');
  bar.innerHTML='<span>找到 <strong id="sCnt">'+cnt+'</strong> 个结果</span><div class="hints"><span id="sPos">1/'+cnt+'</span> <kbd>↑</kbd><kbd>↓</kbd> 导航 <kbd>Enter</kbd> 打开 <kbd>/</kbd> 搜索</div>';
}
function hideSearchBar(){var bar=$('searchBar');if(bar)bar.classList.remove('show');}
function updateSPos(){var el=$('sPos');if(el)el.textContent=(state.resultIdx+1)+'/'+state.results.length;}
function navSearch(dir){
  if(state.results.length===0)return;
  document.querySelectorAll('.card.search-current').forEach(function(el){el.classList.remove('search-current');});
  if(dir==='up')state.resultIdx=(state.resultIdx<=0)?state.results.length-1:state.resultIdx-1;
  else state.resultIdx=(state.resultIdx>=state.results.length-1)?0:state.resultIdx+1;
  var card=document.querySelector('.card[data-idx="'+state.resultIdx+'"]');
  if(card){card.classList.add('search-current');card.scrollIntoView({behavior:'smooth',block:'center'});updateSPos();}
}
function openCurResult(){
  if(state.results.length===0)return;
  if(state.resultIdx<0)state.resultIdx=0;          // 修复：搜索后直接回车打开首个结果
  var sw=state.results[state.resultIdx];if(sw)openModal(sw);
}

// ---- 模态框 ----
function openModal(sw){
  if(!sw)return;
  state.curId=sw.id;
  var cat=categories.find(function(c){return c.slug===sw.category;});
  mName.textContent=sw.name;
  mCat.textContent=cat?cat.name:'未分类';
  mIcon.className='fas '+(sw.icon||(cat?cat.icon:'fa-cube'));
  mDesc.textContent=sw.detailDesc||sw.description||'暂无详细介绍';
  var mb=$('mFav');if(mb)setFavBtn(mb,sw.id);
  var vh='';
  if(sw.versions&&sw.versions.length>0){
    sw.versions.forEach(function(v){
      vh+='<div class="version-item"><div><span class="v-name">'+v.ver+'</span></div><div class="v-dls">';
      if(v.url1){vh+='<a href="'+v.url1+'" class="v-dl green" target="_blank" rel="noopener"><i class="fas fa-cloud-download-alt"></i> '+v.label1+'</a>';}
      else{vh+='<span class="v-dl green"><i class="fas fa-cloud-download-alt"></i> '+v.label1+'</span>';}
      if(v.url2){vh+='<a href="'+v.url2+'" class="v-dl" target="_blank" rel="noopener"><i class="fas fa-download"></i> '+v.label2+'</a>';}
      else if(v.label2){vh+='<span class="v-dl"><i class="fas fa-download"></i> '+v.label2+'</span>';}
      vh+='</div></div>';
    });
  }else{
    vh='<div class="no-ver"><i class="fas fa-info-circle"></i><p>暂无版本信息</p></div>';
  }
  mVer.innerHTML=vh;
  modal.classList.add('active');
}
function closeModalFn(){modal.classList.remove('active');state.curId=null;}

// ---- 工具函数 ----
function hl(text,kw){
  if(!kw)return text;
  var r=new RegExp('('+kw.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','gi');
  return text.replace(r,'<span class="hl">$1</span>');
}
function esc(t){var d=document.createElement('div');d.textContent=t;return d.innerHTML;}

function bindCardClicks(){
  document.querySelectorAll('.card').forEach(function(el){
    el.addEventListener('click',function(){
      var id=parseInt(this.dataset.id);
      var sw=softwareData.find(function(s){return s.id===id;});
      if(sw)openModal(sw);
    });
  });
  document.querySelectorAll('.card-fav').forEach(function(el){
    el.addEventListener('click',function(e){e.stopPropagation();toggleFav(parseInt(this.dataset.fav));});
  });
}

// ---- 事件绑定 ----
function onScroll(){
  var b=$('toTop');
  if(!b)return;
  if(mainEl.scrollTop>320)b.classList.add('show');else b.classList.remove('show');
}
function bindEvents(){
  searchIn.addEventListener('input',function(){
    var v=this.value.trim();
    if(!v){state.searchMode=false;state.searchKeyword='';state.results=[];state.resultIdx=-1;hideSearchBar();renderAll();}
  });
  searchIn.addEventListener('keydown',function(e){
    if(e.key==='Enter'){e.preventDefault();if(state.searchMode&&state.results.length>0)openCurResult();else performSearch();}
    if(e.key==='ArrowUp'){e.preventDefault();if(state.searchMode)navSearch('up');}
    if(e.key==='ArrowDown'){e.preventDefault();if(state.searchMode)navSearch('down');}
    if(e.key==='Escape'){e.preventDefault();searchIn.value='';state.searchMode=false;state.searchKeyword='';state.results=[];state.resultIdx=-1;hideSearchBar();renderAll();}
  });
  $('searchBtn').addEventListener('click',performSearch);
  $('mClose').addEventListener('click',closeModalFn);
  $('mCloseMB').addEventListener('click',closeModalFn);
  var mf=$('mFav');if(mf)mf.addEventListener('click',function(){if(state.curId!=null)toggleFav(state.curId);});
  var tt=$('themeToggle');if(tt)tt.addEventListener('click',toggleTheme);
  var tb=$('toTop');if(tb)tb.addEventListener('click',function(){mainEl.scrollTo({top:0,behavior:'smooth'});});
  var ham=$('hamburger');var ovl=$('overlay');
  function closeMobileMenu(){var sb=$('sidebar');if(sb)sb.classList.remove('show');if(ovl)ovl.classList.remove('show');}
  if(ham)ham.addEventListener('click',function(){
    var sb=$('sidebar');var opened=sb&&sb.classList.contains('show');
    if(opened){closeMobileMenu();}else{
      if(sb)sb.classList.add('show');
      if(ovl)ovl.classList.add('show');
    }
  });
  if(ovl)ovl.addEventListener('click',closeMobileMenu);
  modal.addEventListener('click',function(e){if(e.target===this)closeModalFn();});
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&modal.classList.contains('active')){closeModalFn();return;}
    if(!modal.classList.contains('active')&&document.activeElement!==searchIn){
      if(e.key==='/'){
        if(/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName))return;
        e.preventDefault();searchIn.focus();
      }else if(e.key==='k'&&(e.ctrlKey||e.metaKey)){
        e.preventDefault();searchIn.focus();
      }
    }
  });
  if(mainEl)mainEl.addEventListener('scroll',onScroll);
}

// ---- 启动 ----
function init(){
  loadFavs();initTheme();
  buildNav();renderAll();bindEvents();
  onScroll();
}
init();
