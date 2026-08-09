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

// Instant Smart Estimate: transparent community-value pricing.
(()=>{
  if(document.querySelector('#instant-estimate')) return;
  const anchor=document.querySelector('.proof-strip') || document.querySelector('.hero');
  if(!anchor) return;

  const style=document.createElement('style');
  style.textContent=`
    .estimate-section{padding:76px 0;background:linear-gradient(145deg,#f5fbff,#f1fff6);border-top:1px solid #dcecf1;border-bottom:1px solid #dcecf1}
    .estimate-shell{display:grid;grid-template-columns:.9fr 1.1fr;gap:42px;align-items:center}
    .estimate-copy h2{font-size:clamp(34px,5vw,54px);line-height:1.05;margin:10px 0 16px;color:#0b315e}
    .estimate-copy p{color:#52645d;font-size:17px}
    .value-badge{display:inline-flex;align-items:center;gap:8px;background:#e7fff0;color:#086735;border:1px solid #a9efc3;border-radius:99px;padding:8px 13px;font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
    .estimate-points{display:grid;gap:10px;margin-top:22px;color:#24433a;font-weight:800}
    .estimate-card{background:#fff;border:1px solid #d9e9e1;border-radius:26px;padding:26px;box-shadow:0 20px 55px rgba(10,42,33,.12)}
    .estimate-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .estimate-card label{font-size:13px;color:#304b42}
    .estimate-card select{background:#fff}
    .estimate-result{margin-top:18px;padding:20px;border-radius:20px;background:linear-gradient(135deg,#062f65,#087ba8);color:#fff;display:grid;gap:10px}
    .estimate-result small{color:#d7efff}
    .price-line{display:flex;justify-content:space-between;gap:18px;align-items:end}
    .market-price{font-size:18px;text-decoration:line-through;opacity:.72;font-weight:800}
    .our-price{font-size:clamp(30px,5vw,43px);font-weight:950;line-height:1;color:#79ff9d}
    .save-chip{display:inline-flex;width:max-content;background:#78ff9d;color:#07331b;border-radius:99px;padding:6px 10px;font-size:12px;font-weight:950}
    .estimate-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}
    .estimate-use{background:linear-gradient(135deg,#18bd63,#72ef86);color:#062716;cursor:pointer}
    .estimate-note{font-size:12px;color:#687a73;margin:13px 2px 0;line-height:1.5}
    @media(max-width:850px){.estimate-shell{grid-template-columns:1fr}.estimate-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  const section=document.createElement('section');
  section.id='instant-estimate';
  section.className='estimate-section';
  section.innerHTML=`
    <div class="container estimate-shell">
      <div class="estimate-copy">
        <span class="value-badge">💚 Community Value Pricing</span>
        <h2>See a price range before you call.</h2>
        <p>Choose the service, property size and current condition. We will show an instant planning estimate designed around approximately 20% value savings versus our local benchmark assumptions.</p>
        <div class="estimate-points">
          <span>✓ No email required to see the estimate</span>
          <span>✓ Transparent benchmark comparison</span>
          <span>✓ Photo-based final quote available</span>
        </div>
      </div>
      <div class="estimate-card">
        <div class="estimate-grid">
          <label>Service
            <select data-est-service>
              <option value="house">House Cleaning</option>
              <option value="deep">Deep Cleaning</option>
              <option value="move">Move-In / Move-Out Cleaning</option>
              <option value="office">Office / Commercial Cleaning</option>
              <option value="pressure">Pressure Washing</option>
              <option value="gutter">Gutter Cleaning</option>
              <option value="lawn">Lawn & Garden Care</option>
              <option value="yard">Seasonal Yard Cleanup</option>
              <option value="maintenance">Property Maintenance</option>
            </select>
          </label>
          <label>Property / job size
            <select data-est-size>
              <option value="small">Small — up to ~1,000 sq ft</option>
              <option value="medium" selected>Medium — ~1,000–2,000 sq ft</option>
              <option value="large">Large — ~2,000–3,000 sq ft</option>
              <option value="xl">Extra large — 3,000+ sq ft</option>
            </select>
          </label>
          <label>Current condition
            <select data-est-condition>
              <option value="standard" selected>Standard / maintained</option>
              <option value="build">Needs extra attention</option>
              <option value="heavy">Heavy buildup / major cleanup</option>
            </select>
          </label>
          <label>Location
            <select data-est-location>
              <option value="richmond" selected>Richmond</option>
              <option value="metro">Other Metro Vancouver area</option>
            </select>
          </label>
        </div>
        <div class="estimate-result" aria-live="polite">
          <small>Typical local planning benchmark</small>
          <div class="price-line"><span class="market-price" data-market-price>$240–$300</span><span class="save-chip">Approx. 20% value savings</span></div>
          <small>Your Garden City planning estimate</small>
          <div class="our-price" data-our-price>$190–$240</div>
          <small data-est-summary>House Cleaning · Medium · Standard / maintained · Richmond</small>
        </div>
        <div class="estimate-actions">
          <button class="btn estimate-use" type="button" data-use-estimate>Use This Estimate →</button>
          <a class="btn" style="background:#edf5f1;color:#174738" href="https://wa.me/17787899154" target="_blank" rel="noopener">Ask on WhatsApp</a>
        </div>
        <p class="estimate-note">Planning estimate only, not a binding quote. Final price depends on exact scope, access, measurements, materials, condition and photos/site review. Taxes and special disposal/material charges may be additional. “20% value savings” refers to our internal local benchmark assumptions and is not a guarantee against every competitor's price.</p>
      </div>
    </div>`;
  anchor.insertAdjacentElement('afterend',section);

  const serviceEl=section.querySelector('[data-est-service]');
  const sizeEl=section.querySelector('[data-est-size]');
  const conditionEl=section.querySelector('[data-est-condition]');
  const locationEl=section.querySelector('[data-est-location]');
  const marketEl=section.querySelector('[data-market-price]');
  const ourEl=section.querySelector('[data-our-price]');
  const summaryEl=section.querySelector('[data-est-summary]');

  const benchmarks={
    house:{small:[150,195],medium:[240,300],large:[330,420],xl:[430,560]},
    deep:{small:[220,285],medium:[330,420],large:[450,580],xl:[590,760]},
    move:{small:[210,270],medium:[320,410],large:[440,560],xl:[575,735]},
    office:{small:[165,220],medium:[250,340],large:[360,480],xl:[490,650]},
    pressure:{small:[180,240],medium:[275,375],large:[390,520],xl:[540,720]},
    gutter:{small:[170,220],medium:[220,285],large:[285,365],xl:[365,470]},
    lawn:{small:[65,90],medium:[90,125],large:[125,170],xl:[170,240]},
    yard:{small:[170,235],medium:[250,350],large:[360,500],xl:[510,690]},
    maintenance:{small:[145,200],medium:[220,300],large:[310,420],xl:[430,580]}
  };
  const labels={house:'House Cleaning',deep:'Deep Cleaning',move:'Move-In / Move-Out Cleaning',office:'Office / Commercial Cleaning',pressure:'Pressure Washing',gutter:'Gutter Cleaning',lawn:'Lawn & Garden Care',yard:'Seasonal Yard Cleanup',maintenance:'Property Maintenance'};
  const sizeLabels={small:'Small',medium:'Medium',large:'Large',xl:'Extra large'};
  const conditionLabels={standard:'Standard / maintained',build:'Needs extra attention',heavy:'Heavy buildup / major cleanup'};
  const conditionMultiplier={standard:1,build:1.22,heavy:1.48};

  function money(n){return '$'+Math.round(n/5)*5;}
  function calculate(){
    const service=serviceEl.value;
    const size=sizeEl.value;
    const condition=conditionEl.value;
    const location=locationEl.value;
    const base=benchmarks[service][size];
    const conditionFactor=conditionMultiplier[condition];
    const travelFactor=location==='metro'?1.08:1;
    const low=base[0]*conditionFactor*travelFactor;
    const high=base[1]*conditionFactor*travelFactor;
    const ourLow=low*.80;
    const ourHigh=high*.80;
    marketEl.textContent=`${money(low)}–${money(high)}`;
    ourEl.textContent=`${money(ourLow)}–${money(ourHigh)}`;
    summaryEl.textContent=`${labels[service]} · ${sizeLabels[size]} · ${conditionLabels[condition]} · ${location==='richmond'?'Richmond':'Metro Vancouver'}`;
    section.dataset.estimate=`${money(ourLow)}–${money(ourHigh)}`;
    section.dataset.service=labels[service];
    section.dataset.summary=summaryEl.textContent;
  }
  [serviceEl,sizeEl,conditionEl,locationEl].forEach(el=>el.addEventListener('change',calculate));
  calculate();

  section.querySelector('[data-use-estimate]').addEventListener('click',()=>{
    const form=document.querySelector('#leadForm');
    if(!form) return;
    const serviceSelect=form.querySelector('select[name="service"]');
    if(serviceSelect){
      const wanted=section.dataset.service;
      [...serviceSelect.options].some(option=>{
        if(option.textContent.trim()===wanted || (wanted==='Deep Cleaning' && option.textContent.includes('House Cleaning')) || (wanted==='Office / Commercial Cleaning' && option.textContent.includes('Commercial Cleaning'))){
          serviceSelect.value=option.value;
          return true;
        }
        return false;
      });
    }
    const details=form.querySelector('textarea[name="details"]');
    if(details && !details.value.trim()){
      details.value=`Smart Estimate: ${section.dataset.estimate}\nSelections: ${section.dataset.summary}\n\nPlease confirm the final quote for this project.`;
    }
    document.querySelector('#quote')?.scrollIntoView({behavior:'smooth',block:'start'});
    setTimeout(()=>form.querySelector('input[name="name"]')?.focus({preventScroll:true}),500);
  });
})();
