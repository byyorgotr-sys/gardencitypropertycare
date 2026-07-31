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
