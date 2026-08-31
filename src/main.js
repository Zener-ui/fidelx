document.documentElement.classList.add('js');
// Fidelx shared navigation
(function(){
  const nav=document.querySelector('.nav');
  const menu=document.querySelector('.menu');
  const links=document.querySelector('.nav nav');
  if(!nav) return;
  const onScroll=()=>nav.classList.toggle('scrolled',window.scrollY>28);
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
  if(menu&&links){menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',open?'true':'false');menu.textContent=open?'×':'☰';});
    links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰';}));
  }
})();

/* Fidelx editorial typewriter ticker */
(function(){
  const ticker=document.querySelector('.page-home .ticker > div');
  if(!ticker) return;
  const words=['Are you hungry?','You don chop?','Ị rī nri?','¿O ti jẹun?'];
  let wi=0,ci=0,phase='typing';
  ticker.innerHTML='';
  const text=document.createElement('span');
  const cursor=document.createElement('span'); cursor.className='cursor';
  ticker.append(text,cursor);
  function tick(){
    const word=words[wi];
    if(phase==='typing'){
      ci++; text.textContent=word.slice(0,ci);
      if(ci>=word.length){phase='pause';setTimeout(tick,1500);return}
      setTimeout(tick,95);
    }else if(phase==='pause'){
      phase='deleting';setTimeout(tick,55);
    }else{
      ci--; text.textContent=word.slice(0,ci);
      if(ci<=0){wi=(wi+1)%words.length;phase='typing';setTimeout(tick,400);return}
      setTimeout(tick,58);
    }
  }
  tick();
})();

// Reveal partner-page sections after the shared script adds the .js class.
(function(){
  const fades=document.querySelectorAll('.page-partners .fade');
  if(!fades.length) return;
  const show=(el)=>el.classList.add('show');
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){show(entry.target);io.unobserve(entry.target);}
    }),{threshold:.12});
    fades.forEach(el=>io.observe(el));
  }else{
    fades.forEach(show);
  }
})();
