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
    '/recent-work-1.svg',
    '/recent-work-2.svg',
    '/recent-work-3.svg',
    '/recent-work-4.svg',
    '/recent-work-5.svg',
    '/recent-work-6.svg'
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


// Indoor & commercial cleaning services (localized automatically)
(()=>{
  const anchor=document.querySelector('.recent-work') || document.querySelector('#services');
  if(!anchor || document.querySelector('#cleaning-services')) return;

  if(!document.querySelector('link[href="/cleaning-services.css"]')){
    const css=document.createElement('link');
    css.rel='stylesheet';
    css.href='/cleaning-services.css';
    document.head.appendChild(css);
  }

  const lang=(document.documentElement.lang||'en').toLowerCase();
  const isEs=lang.startsWith('es');
  const isZh=lang.startsWith('zh');

  const data=isEs ? {
    kicker:'Limpieza interior y comercial',
    title:'Limpieza para hogares y negocios.',
    intro:'Además del cuidado exterior, ofrecemos servicios de limpieza interior para viviendas, oficinas y propiedades comerciales.',
    items:[
      ['🏠','Limpieza de casas','Casas, apartamentos y condominios.','/house-cleaning-richmond.html'],
      ['🏢','Limpieza de oficinas','Oficinas, salas de reuniones y áreas de trabajo.','/office-cleaning-richmond.html'],
      ['🏬','Limpieza comercial','Tiendas, restaurantes y espacios comerciales.','/commercial-cleaning-richmond.html'],
      ['🏭','Limpieza industrial','Fábricas, talleres y espacios industriales.','/industrial-cleaning-richmond.html'],
      ['📦','Mudanza: entrada / salida','Limpieza antes de entrar o después de salir.','/move-out-cleaning-richmond.html'],
      ['✨','Limpieza profunda','Limpieza detallada para cocinas, baños, pisos y superficies.','/house-cleaning-richmond.html'],
      ['🧱','Después de construcción','Polvo, residuos y limpieza final después de obras.','/post-construction-cleaning-richmond.html'],
      ['🏙️','Áreas comunes','Pasillos, entradas, escaleras y áreas compartidas.','/commercial-cleaning-richmond.html']
    ]
  } : isZh ? {
    kicker:'室内与商业清洁',
    title:'住宅和商业场所清洁服务。',
    intro:'除了室外物业维护，我们还提供住宅、办公室和商业物业的室内清洁服务。',
    items:[
      ['🏠','住宅清洁','房屋、公寓和共管公寓。','/house-cleaning-richmond.html'],
      ['🏢','办公室清洁','办公室、会议室和工作区域。','/office-cleaning-richmond.html'],
      ['🏬','商业清洁','商店、餐厅及其他商业空间。','/commercial-cleaning-richmond.html'],
      ['🏭','工业 / 工厂清洁','工厂、车间和工业空间。','/industrial-cleaning-richmond.html'],
      ['📦','入住 / 搬出清洁','入住前或搬出后的全面清洁。','/move-out-cleaning-richmond.html'],
      ['✨','深度清洁','厨房、浴室、地板和表面的细致清洁。','/house-cleaning-richmond.html'],
      ['🧱','装修后清洁','清除施工后的灰尘、碎屑并进行最终清洁。','/post-construction-cleaning-richmond.html'],
      ['🏙️','公共区域清洁','走廊、入口、楼梯及共享空间。','/commercial-cleaning-richmond.html']
    ]
  } : {
    kicker:'Indoor & Commercial Cleaning',
    title:'Cleaning for homes and businesses.',
    intro:'Along with exterior property care, we provide indoor cleaning for residential, office, commercial and industrial properties.',
    items:[
      ['🏠','House Cleaning','Homes, apartments and condos.','/house-cleaning-richmond.html'],
      ['🏢','Office Cleaning','Offices, meeting rooms and work areas.','/office-cleaning-richmond.html'],
      ['🏬','Commercial Cleaning','Retail, restaurants and commercial spaces.','/commercial-cleaning-richmond.html'],
      ['🏭','Industrial / Factory Cleaning','Factories, workshops and industrial spaces.','/industrial-cleaning-richmond.html'],
      ['📦','Move-In / Move-Out Cleaning','Cleaning before move-in or after move-out.','/move-out-cleaning-richmond.html'],
      ['✨','Deep Cleaning','Detailed kitchens, bathrooms, floors and surfaces.','/house-cleaning-richmond.html'],
      ['🧱','Post-Construction Cleaning','Dust, debris and final cleanup after construction.','/post-construction-cleaning-richmond.html'],
      ['🏙️','Common Area Cleaning','Hallways, entrances, stairs and shared areas.','/commercial-cleaning-richmond.html']
    ]
  };

  const section=document.createElement('section');
  section.id='cleaning-services';
  section.className='cleaning-services';
  section.innerHTML=`
    <div class="container">
      <div class="heading">
        <span class="label">${data.kicker}</span>
        <h2>${data.title}</h2>
        <p>${data.intro}</p>
      </div>
      <div class="cleaning-grid">
        ${data.items.map((x,i)=>`
          <article class="cleaning-card c${i+1}">
            <div class="cleaning-icon">${x[0]}</div>
            <h3>${x[1]}</h3>
            <p>${x[2]}</p>
            <a href="${x[3]}">${isEs?'Ver servicio':isZh?'查看服务':'View service'} →</a>
          </article>
        `).join('')}
      </div>
    </div>`;
  anchor.insertAdjacentElement('afterend',section);
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

// A calm music recommendation from licensed streaming sources.
// Audio is never copied or auto-played; visitors choose where to listen.
(()=>{
  const lang=(document.documentElement.lang||'en').toLowerCase();
  const copy=lang.startsWith('es') ? {
    button:'Música tranquila', title:'Un momento para respirar',
    text:'Passenger — Let Her Go', youtube:'Reproducir aquí', close:'Cerrar'
  } : lang.startsWith('zh') ? {
    button:'舒缓音乐', title:'放松片刻',
    text:'Passenger — Let Her Go', youtube:'在此播放', close:'关闭'
  } : {
    button:'Calm music', title:'A moment to breathe',
    text:'Passenger — Let Her Go', youtube:'Play here', close:'Close'
  };

  const button=document.createElement('button');
  button.className='music-toggle';
  button.type='button';
  button.setAttribute('aria-expanded','false');
  button.setAttribute('aria-controls','music-panel');
  button.innerHTML=`<span aria-hidden="true">♫</span><b>${copy.button}</b>`;
  const panel=document.createElement('aside');
  panel.className='music-panel';
  panel.id='music-panel';
  panel.setAttribute('aria-hidden','true');
  panel.innerHTML=`
    <button class="music-close" type="button" aria-label="${copy.close}">×</button>
    <span class="music-art" aria-hidden="true">♫</span>
    <div class="music-copy"><small>${copy.title}</small><strong>${copy.text}</strong></div>
    <div class="music-actions">
      <button class="youtube" type="button">▶ ${copy.youtube}</button>
    </div>`;
  document.body.append(panel,button);

  function setOpen(open){
    panel.classList.toggle('show',open);
    panel.setAttribute('aria-hidden',String(!open));
    button.setAttribute('aria-expanded',String(open));
  }
  button.addEventListener('click',()=>setOpen(!panel.classList.contains('show')));
  function playVideo(){
    if(panel.querySelector('.music-video')) return;
    const frame=document.createElement('div');
    frame.className='music-video';
    frame.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/RBumgq5yVrA?autoplay=1&rel=0" title="Passenger - Let Her Go" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
    panel.appendChild(frame);
    panel.querySelector('.youtube')?.remove();
  }
  panel.querySelector('.youtube').addEventListener('click',playVideo);
  panel.querySelector('.music-close').addEventListener('click',()=>{
    panel.querySelector('.music-video')?.remove();
    if(!panel.querySelector('.youtube')){
      const play=document.createElement('button');
      play.className='youtube';
      play.type='button';
      play.textContent=`▶ ${copy.youtube}`;
      play.addEventListener('click',playVideo);
      panel.querySelector('.music-actions').appendChild(play);
    }
    setOpen(false);
  });
})();
