/* 教程库 / 详情页 逻辑
   依赖：tutorials-data.js 提供的 tutorialData 数组。
   提供：initTutorialList()（教程库列表页）、initTutorialDetail()（教程详情页）。
   共用：深色模式、移动端抽屉、返回顶部、侧栏分类渲染。 */
(function(){
  'use strict';

  function $(id){return document.getElementById(id);}
  function esc(t){var d=document.createElement('div');d.textContent=t==null?'':t;return d.innerHTML;}
  function fmtViews(n){return n>=1000?(n/1000).toFixed(1)+'k':(''+n);}

  /* ---------- 深色模式（与 index.html 共用 localStorage 'theme'） ---------- */
  function applyTheme(t){
    if(t==='dark')document.documentElement.setAttribute('data-theme','dark');
    else document.documentElement.removeAttribute('data-theme');
    var tb=$('themeToggle');
    if(tb)tb.innerHTML='<i class="fas '+(t==='dark'?'fa-sun':'fa-moon')+'"></i>';
  }
  function initTheme(){
    var t=localStorage.getItem('theme');
    if(!t){t=(window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches)?'dark':'light';}
    applyTheme(t);
    var tb=$('themeToggle');
    if(tb)tb.addEventListener('click',function(){
      var cur=document.documentElement.getAttribute('data-theme')==='dark'?'dark':'light';
      var nxt=cur==='dark'?'light':'dark';
      localStorage.setItem('theme',nxt);applyTheme(nxt);
    });
  }

  /* ---------- 移动端侧栏抽屉 ---------- */
  function initMobileMenu(){
    var hb=$('hamburger'), sb=$('sidebar'), ov=$('overlay');
    if(!hb||!sb)return;
    function open(){sb.classList.add('show');ov.classList.add('show');}
    function close(){sb.classList.remove('show');ov.classList.remove('show');}
    hb.addEventListener('click',function(){sb.classList.contains('show')?close():open();});
    if(ov)ov.addEventListener('click',close);
  }

  /* ---------- 返回顶部 ---------- */
  function initToTop(){
    var btn=$('toTop');
    if(!btn)return;
    window.addEventListener('scroll',function(){
      btn.classList.toggle('show',window.scrollY>320);
    });
    btn.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
  }

  /* ---------- 教程分类统计 ---------- */
  function getCatInfo(){
    var map={};
    tutorialData.forEach(function(t){
      if(!map[t.category])map[t.category]={count:0,icon:t.catIcon||'fa-book'};
      map[t.category].count++;
    });
    return map;
  }

  /* ---------- 侧栏分类导航 ----------
     mode='filter'：列表页，href=# 阻止跳转，点击触发 onClick 过滤
     mode='link'  ：详情页，href=tutorials.html?cat=xxx，点击跳转回列表并预选分类 */
  function renderCatNav(activeCat,mode,onClick){
    var list=$('catNavList');
    if(!list)return;
    var info=getCatInfo();
    var total=tutorialData.length;
    var allActive=activeCat==='全部'||!activeCat;
    var html='<li><a class="nav-item'+(allActive?' active':'')+'" '+
      (mode==='filter'?'href="#"':'href="tutorials.html"')+' data-cat="全部">'+
      '<i class="fas fa-layer-group"></i><span>全部教程</span><span class="count">'+total+'</span></a></li>';
    Object.keys(info).forEach(function(c){
      var href=mode==='filter'?'#"':'tutorials.html?cat='+encodeURIComponent(c);
      html+='<li><a class="nav-item'+(activeCat===c?' active':'')+'" href="'+href+'" data-cat="'+esc(c)+'">'+
        '<i class="fas '+info[c].icon+'"></i><span>'+esc(c)+'</span><span class="count">'+info[c].count+'</span></a></li>';
    });
    list.innerHTML=html;
    if(mode==='filter'&&onClick){
      list.querySelectorAll('.nav-item').forEach(function(a){
        a.addEventListener('click',function(e){e.preventDefault();onClick(this.dataset.cat);});
      });
    }
  }

  /* ---------- / 快捷键聚焦搜索 ---------- */
  function initSearchShortcut(input){
    if(!input)return;
    document.addEventListener('keydown',function(e){
      if(e.key!=='/'||e.ctrlKey||e.metaKey||e.altKey)return;
      var ae=document.activeElement;
      if(ae&&(ae.tagName==='INPUT'||ae.tagName==='TEXTAREA'||ae.isContentEditable))return;
      e.preventDefault();input.focus();input.select();
    });
  }

  /* ---------- 列表页 ---------- */
  function initTutorialList(){
    initTheme();
    initMobileMenu();
    initToTop();

    var grid=$('tutGrid'), totalCount=$('totalCount'), search=$('searchInput');
    if(!grid)return;

    // 初始状态：可从 URL ?cat= 与 ?kw= 读取，便于从详情页/分享链接进入时预选
    var params=new URLSearchParams(location.search);
    var state={kw:params.get('kw')||'',cat:params.get('cat')||'全部'};
    if(search&&state.kw)search.value=state.kw;

    function renderGrid(){
      var kw=state.kw.trim().toLowerCase();
      var list=tutorialData.filter(function(t){
        var okCat=state.cat==='全部'||t.category===state.cat;
        var okKw=!kw||(t.title+t.excerpt+t.category).toLowerCase().indexOf(kw)>=0;
        return okCat&&okKw;
      });
      if(totalCount)totalCount.textContent='共 '+list.length+' 篇';
      if(list.length===0){
        grid.innerHTML='<div class="empty"><i class="fas fa-folder-open"></i><h3>没有找到相关教程</h3><p>换个关键词或分类试试</p></div>';
        return;
      }
      grid.innerHTML=list.map(function(t){
        return '<a class="tut-card" href="tutorial.html?id='+t.id+'">'+
          '<div class="tc-top">'+
            '<span class="tc-date"><i class="far fa-calendar-alt"></i>安装教程 '+esc(t.date)+'</span>'+
            '<span class="tc-cat"><i class="fas '+(t.catIcon||'fa-book')+'"></i>'+esc(t.category)+'</span>'+
          '</div>'+
          '<div class="tc-title">'+esc(t.title)+'</div>'+
          '<div class="tc-excerpt">'+esc(t.excerpt)+'</div>'+
          '<div class="tc-foot"><span class="tc-read">阅读教程 <i class="fas fa-arrow-right"></i></span></div>'+
        '</a>';
      }).join('');
    }

    function onCatClick(cat){
      state.cat=cat;
      renderCatNav(state.cat,'filter',onCatClick);
      renderGrid();
    }
    renderCatNav(state.cat,'filter',onCatClick);

    if(search){
      search.addEventListener('input',function(){state.kw=this.value;renderGrid();});
      initSearchShortcut(search);
    }
    renderGrid();
  }

  /* ---------- 详情页 ---------- */
  function renderBlocks(steps){
    return steps.map(function(b){
      if(b.t==='h2')return '<h2>'+esc(b.x)+'</h2>';
      if(b.t==='p')return '<p>'+esc(b.x)+'</p>';
      if(b.t==='quote')return '<div class="quote"><i class="fas fa-exclamation-triangle"></i><span>'+esc(b.x)+'</span></div>';
      if(b.t==='note')return '<div class="note"><i class="fas fa-info-circle"></i><span>'+esc(b.x)+'</span></div>';
      if(b.t==='ol')return '<ol>'+b.x.map(function(s){return '<li>'+esc(s)+'</li>';}).join('')+'</ol>';
      if(b.t==='img'){
        var inner=b.src
          ? '<img src="'+esc(b.src)+'" alt="'+esc(b.alt||'')+'" style="max-width:100%;border-radius:8px">'+(b.cap?'<figcaption>'+esc(b.cap)+'</figcaption>':'')
          : '<div class="ph"><i class="fas fa-image"></i><span>截图占位 · 发布时替换</span></div>'+(b.cap?'<figcaption>'+esc(b.cap)+'</figcaption>':'');
        return '<figure class="ss">'+inner+'</figure>';
      }
      return '';
    }).join('');
  }

  function initTutorialDetail(){
    initTheme();
    initMobileMenu();
    initToTop();

    var article=$('article'), relGrid=$('relGrid'), relSec=$('related'), bcTitle=$('bcTitle');
    if(!article)return;

    var id=parseInt((new URLSearchParams(location.search)).get('id'),10);
    var t=tutorialData.find(function(x){return x.id===id;});

    // 侧栏分类：当前教程分类高亮，点击跳转回列表并预选
    renderCatNav(t?t.category:'全部','link',null);

    if(!t){
      article.innerHTML='<div class="empty"><i class="fas fa-file-excel"></i><h3>未找到该教程</h3><p><a href="tutorials.html" style="color:#2563eb">返回安装教程库</a></p></div>';
      return;
    }
    document.title=t.title+' - 软件资源库';
    if(bcTitle)bcTitle.textContent=t.title;
    article.innerHTML=
      '<div class="article-head">'+
        '<span class="article-cat"><i class="fas '+(t.catIcon||'fa-book')+'"></i>'+esc(t.category)+'</span>'+
        '<h1 class="article-title">'+esc(t.title)+'</h1>'+
        '<div class="article-meta">'+
          '<span><i class="far fa-calendar-alt"></i>'+esc(t.date)+'</span>'+
          '<span><i class="fas fa-eye"></i>'+fmtViews(t.views)+' 阅读</span>'+
          '<span><i class="fas fa-tag"></i>'+esc(t.category)+'</span>'+
        '</div>'+
      '</div>'+
      '<div class="article-body">'+renderBlocks(t.steps)+'</div>';

    var rel=tutorialData.filter(function(x){return x.category===t.category&&x.id!==t.id;}).slice(0,3);
    if(rel.length){
      relSec.style.display='block';
      relGrid.innerHTML=rel.map(function(x){
        return '<a class="rel-card" href="tutorial.html?id='+x.id+'">'+
          '<div class="rc-cat"><i class="fas '+(x.catIcon||'fa-book')+'"></i> '+esc(x.category)+'</div>'+
          '<div class="rc-title">'+esc(x.title)+'</div>'+
        '</a>';
      }).join('');
    }
  }

  window.initTutorialList=initTutorialList;
  window.initTutorialDetail=initTutorialDetail;
})();
