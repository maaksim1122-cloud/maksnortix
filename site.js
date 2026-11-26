(function(){
  var d=document,b=d.body,h=d.documentElement;
  var burger=d.getElementById('burger'),menu=d.getElementById('menu'),veil=d.getElementById('veil');
  function set(o){
    b.classList.toggle('open',o);
    if(burger){burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Закрити меню':'Відкрити меню');}
    if(o&&menu){var fa=menu.querySelector('a');if(fa)fa.focus();}
    else if(burger&&getComputedStyle(burger).display!=='none'){burger.focus({preventScroll:true});}
  }
  if(burger)burger.addEventListener('click',function(){set(!b.classList.contains('open'))});
  if(veil)veil.addEventListener('click',function(){set(false)});
  if(menu)menu.addEventListener('click',function(e){if(e.target.closest('a'))set(false)});

  var dScr=d.getElementById('demoScr'),cBtn=d.getElementById('chatMenuBtn'),cBg=d.getElementById('chatMenuBg'),cMenu=d.getElementById('chatMenu');
  function setCm(o){if(!dScr)return;dScr.classList.toggle('mopen',o);cBtn.setAttribute('aria-expanded',o);cMenu.setAttribute('aria-hidden',!o);}
  if(cBtn){
    cBtn.addEventListener('click',function(e){e.stopPropagation();setCm(!dScr.classList.contains('mopen'))});
    if(cBg)cBg.addEventListener('click',function(){setCm(false)});
    if(cMenu)cMenu.addEventListener('click',function(){setCm(false)});
  }
  d.addEventListener('keydown',function(e){if(e.key==='Escape'){if(b.classList.contains('open'))set(false);if(dScr&&dScr.classList.contains('mopen'))setCm(false)}});

  var bar=d.getElementById('bar'),up=d.getElementById('up'),t=false;
  var navLinks=[].slice.call(d.querySelectorAll('.dnav a'));
  var secs=navLinks.map(function(a){var id=(a.getAttribute('href')||'').slice(1);return {a:a,el:d.getElementById(id)};}).filter(function(x){return x.el});
  function sc(){
    var y=h.scrollTop||b.scrollTop,m=h.scrollHeight-h.clientHeight;
    if(bar)bar.style.transform='scaleX('+(m>0?y/m:0)+')';
    if(up)up.classList.toggle('on',y>700);
    var cur=secs.length?secs[0]:null;
    for(var i=0;i<secs.length;i++){
      if(secs[i].el.getBoundingClientRect().top<=120)cur=secs[i];
    }
    navLinks.forEach(function(a){a.classList.toggle('active',!!(cur&&cur.a===a))});
    t=false;
  }
  addEventListener('scroll',function(){if(!t){t=true;requestAnimationFrame(sc)}},{passive:true});sc();
  if(up)up.addEventListener('click',function(){scrollTo({top:0,behavior:'smooth'})});

  var els=[].slice.call(d.querySelectorAll('.rv'));
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  els.forEach(function(e,i){e.style.transitionDelay=(i%3)*80+'ms';io.observe(e)});
})();
