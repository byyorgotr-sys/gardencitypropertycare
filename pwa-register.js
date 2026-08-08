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
})();
