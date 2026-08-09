(()=>{
  const manifest=document.createElement('link');
  manifest.rel='manifest';
  manifest.href='/manifest.webmanifest';
  document.head.appendChild(manifest);

  const appleCapable=document.createElement('meta');
  appleCapable.name='apple-mobile-web-app-capable';
  appleCapable.content='yes';
  document.head.appendChild(appleCapable);

  const appleStatus=document.createElement('meta');
  appleStatus.name='apple-mobile-web-app-status-bar-style';
  appleStatus.content='default';
  document.head.appendChild(appleStatus);

  const appleTitle=document.createElement('meta');
  appleTitle.name='apple-mobile-web-app-title';
  appleTitle.content='Garden City';
  document.head.appendChild(appleTitle);

  const touchIcon=document.createElement('link');
  touchIcon.rel='apple-touch-icon';
  touchIcon.href='/favicon.svg';
  document.head.appendChild(touchIcon);

  if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{
      navigator.serviceWorker.register('/service-worker.js').catch(()=>{});
    });
  }

  // Submit the quote form through FormSubmit's AJAX endpoint so visitors never
  // leave Garden City or land on a FormSubmit help/thank-you page.
  const leadForm=document.querySelector('#leadForm');
  if(leadForm){
    leadForm.addEventListener('submit',async event=>{
      event.preventDefault();
      event.stopImmediatePropagation();

      const submitButton=leadForm.querySelector('button[type="submit"]');
      const originalText=submitButton?.textContent || 'Send Free Quote Request';
      let status=leadForm.querySelector('[data-form-status]');
      if(!status){
        status=document.createElement('p');
        status.setAttribute('data-form-status','');
        status.setAttribute('role','status');
        status.style.margin='.7rem 0 0';
        status.style.fontWeight='800';
        leadForm.appendChild(status);
      }

      if(submitButton){
        submitButton.disabled=true;
        submitButton.textContent='Sending…';
      }
      status.textContent='Sending your request…';
      status.style.color='#0b6e4f';

      try{
        const formData=new FormData(leadForm);
        formData.delete('_next');
        formData.set('_captcha','false');

        const response=await fetch('https://formsubmit.co/ajax/byyorgotr@gmail.com',{
          method:'POST',
          headers:{'Accept':'application/json'},
          body:formData
        });
        const result=await response.json().catch(()=>({}));

        if(!response.ok || result.success===false){
          throw new Error(result.message || 'Unable to submit form');
        }

        window.location.assign('/thanks.html');
      }catch(error){
        status.textContent='We could not send the request. Please try again, or call/text us at 778-793-6624.';
        status.style.color='#b42318';
        if(submitButton){
          submitButton.disabled=false;
          submitButton.textContent=originalText;
        }
      }
    },true);
  }
})();

// Homepage hero cleaning video.
(()=>{
  const hero=document.querySelector('.hero');
  if(!hero || hero.querySelector('.hero-cleaning-video')) return;

  const style=document.createElement('style');
  style.textContent=`
    .hero{background:#061d3c!important;min-height:650px}
    .hero-cleaning-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:-6;filter:saturate(.9) contrast(1.02)}
    .hero-video-overlay{position:absolute;inset:0;z-index:-5;background:linear-gradient(90deg,rgba(3,18,40,.86) 0%,rgba(3,24,52,.67) 48%,rgba(4,38,67,.48) 100%)}
    .hero-slides,.hero-dots{display:none!important}
    .hero .hero-grid{z-index:2}
    .hero .kicker{background:rgba(4,28,56,.46);backdrop-filter:blur(7px)}
    .hero .hero-card{background:rgba(255,255,255,.93);backdrop-filter:blur(12px)}
    @media(max-width:640px){.hero-cleaning-video{object-position:56% center}.hero-video-overlay{background:linear-gradient(180deg,rgba(3,18,40,.80),rgba(3,24,52,.72))}}
    @media(prefers-reduced-motion:reduce){.hero-cleaning-video{display:none}}
  `;
  document.head.appendChild(style);

  const video=document.createElement('video');
  video.className='hero-cleaning-video';
  video.autoplay=true;
  video.muted=true;
  video.loop=true;
  video.playsInline=true;
  video.preload='metadata';
  video.setAttribute('aria-hidden','true');
  video.innerHTML='<source src="https://www.pexels.com/download/video/4109343/" type="video/mp4">';

  const overlay=document.createElement('div');
  overlay.className='hero-video-overlay';
  overlay.setAttribute('aria-hidden','true');

  hero.prepend(overlay);
  hero.prepend(video);

  video.play().catch(()=>{});
})();
