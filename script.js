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
