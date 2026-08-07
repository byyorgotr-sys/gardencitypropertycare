const menu=document.querySelector('.menu');
const links=document.querySelector('.links');
menu?.addEventListener('click',()=>links.classList.toggle('open'));
document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>links?.classList.remove('open')));
document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());

const form=document.querySelector('#quoteForm');
form?.addEventListener('submit',e=>{
  e.preventDefault();
  const d=new FormData(form);
  const subject=encodeURIComponent('Free quote request — '+d.get('service'));
  const body=encodeURIComponent(`Name: ${d.get('name')}\nPhone: ${d.get('phone')||'Not provided'}\nEmail: ${d.get('email')}\nCity: ${d.get('city')}\nService: ${d.get('service')}\n\nProject details:\n${d.get('details')}`);
  location.href=`mailto:info@gardencitypropertycare.com?subject=${subject}&body=${body}`;
});

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduceMotion){
  document.querySelectorAll('.card').forEach(card=>{
    let timer;
    card.addEventListener('mouseenter',()=>{
      let count=0;
      timer=setInterval(()=>{
        const spark=document.createElement('i');
        spark.className='spark';
        spark.style.left=`${12+Math.random()*76}%`;
        spark.style.top=`${10+Math.random()*78}%`;
        spark.style.setProperty('--x',`${(Math.random()-.5)*80}px`);
        spark.style.setProperty('--y',`${-30-Math.random()*65}px`);
        card.appendChild(spark);
        spark.addEventListener('animationend',()=>spark.remove());
        if(++count>8) clearInterval(timer);
      },95);
    });
    card.addEventListener('mouseleave',()=>clearInterval(timer));
  });
}

// Premium pointer-following light and subtle 3D card movement
if(!reduceMotion){
  document.querySelectorAll('.card').forEach(card=>{
    const glow=document.createElement('span');
    glow.className='card-glow';
    card.prepend(glow);
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect();
      const x=e.clientX-r.left;
      const y=e.clientY-r.top;
      glow.style.left=`${x}px`;
      glow.style.top=`${y}px`;
      if(window.innerWidth>640){
        const rx=((y/r.height)-.5)*-7;
        const ry=((x/r.width)-.5)*9;
        card.style.transform=`translateY(-10px) scale(1.025) rotateX(${rx}deg) rotateY(${ry}deg)`;
      }
    });
    card.addEventListener('pointerleave',()=>{card.style.transform='';});
  });
}

// Recent Work gallery (localized automatically)
(()=>{
  const services=document.querySelector('#services');
  if(!services || document.querySelector('.recent-work')) return;

  const css=document.createElement('link');
  css.rel='stylesheet';
  css.href='/recent-work.css';
  document.head.appendChild(css);

  const lang=(document.documentElement.lang||'en').toLowerCase();
  const isEs=lang.startsWith('es');
  const isZh=lang.startsWith('zh');

  const copy=isEs ? {
    kicker:'Trabajos recientes',
    title:'Vea nuestro trabajo en acción.',
    intro:'Una muestra visual de los servicios de mantenimiento exterior que ofrecemos en Richmond y Metro Vancouver.',
    labels:['Cuidado del césped','Lavado a presión','Limpieza de canaletas','Limpieza del jardín','Retiro de residuos','Cotización y evaluación'],
    note:'Imágenes ilustrativas de los tipos de trabajo que realizamos.'
  } : isZh ? {
    kicker:'近期工作',
    title:'看看我们的服务现场。',
    intro:'展示我们在 Richmond 和大温哥华地区提供的室外物业维护服务类型。',
    labels:['草坪护理','高压清洗','排水槽清洁','庭院清理','垃圾清运','报价与现场评估'],
    note:'图片用于展示我们提供的服务类型。'
  } : {
    kicker:'Recent Work',
    title:'See property care in action.',
    intro:'A visual look at the exterior property services we can help with around Richmond and Metro Vancouver.',
    labels:['Lawn Care','Pressure Washing','Gutter Cleaning','Yard Cleanup','Yard Waste Removal','Free Estimate'],
    note:'Illustrative images showing the types of services we provide.'
  };

  const imgs=[
    '/ChatGPT%20Image%207%20Ag%CC%86u%202026%2003_45_15%20(1).png',
    '/ChatGPT%20Image%207%20Ag%CC%86u%202026%2003_45_15%20(2).png',
    '/ChatGPT%20Image%207%20Ag%CC%86u%202026%2003_45_15%20(3).png',
    '/ChatGPT%20Image%207%20Ag%CC%86u%202026%2003_45_15%20(4).png',
    '/ChatGPT%20Image%207%20Ag%CC%86u%202026%2003_45_16%20(5).png',
    '/ChatGPT%20Image%207%20Ag%CC%86u%202026%2003_45_16%20(6).png'
  ];

  const section=document.createElement('section');
  section.className='recent-work';
  section.id='recent-work';
  section.innerHTML=`
    <div class="container">
      <div class="recent-head">
        <div>
          <span class="recent-kicker">${copy.kicker}</span>
          <h2>${copy.title}</h2>
          <p class="recent-intro">${copy.intro}</p>
        </div>
      </div>
      <div class="recent-grid">
        ${imgs.map((src,i)=>`
          <figure class="recent-item">
            <img src="${src}" alt="${copy.labels[i]} - Garden City Property Care Richmond BC" loading="lazy" decoding="async">
            <figcaption class="recent-caption"><strong>${copy.labels[i]}</strong><span>↗</span></figcaption>
          </figure>
        `).join('')}
      </div>
      <p class="recent-note">${copy.note}</p>
    </div>`;
  services.insertAdjacentElement('afterend',section);
})();

// Reveal content gently as it enters the viewport
const revealTargets=document.querySelectorAll('main section:not(.hero), .card, .step, .faq details');
revealTargets.forEach(el=>el.classList.add('reveal'));
if('IntersectionObserver' in window && !reduceMotion){
  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  revealTargets.forEach(el=>revealObserver.observe(el));
}else{
  revealTargets.forEach(el=>el.classList.add('visible'));
}
