(function(){
  const ready=window.supabase&&window.FIDELX_SUPABASE_URL&&!window.FIDELX_SUPABASE_URL.includes('YOUR_')&&window.FIDELX_SUPABASE_ANON_KEY&&!window.FIDELX_SUPABASE_ANON_KEY.includes('YOUR_');
  let db=null;
  if(ready){try{db=window.supabase.createClient(window.FIDELX_SUPABASE_URL,window.FIDELX_SUPABASE_ANON_KEY);}catch(err){console.error('Fidelx Supabase initialization failed:',err);}}
  function msg(el,text,ok){if(el){el.textContent=text;el.className='form-status '+(ok?'success':'error');}}
  async function send(form,table,out,payload){
    if(!db){msg(document.querySelector(out),'Form is not connected yet. Add your Supabase URL and anon key.',false);return;}
    const btn=form.querySelector('button[type=submit]'), old=btn?.textContent;
    if(btn){btn.disabled=true;btn.textContent='Sending…';}
    try{const {error}=await db.from(table).insert(payload(form));if(error)throw error;form.reset();msg(document.querySelector(out),'Thanks — your message has been received.',true);}
    catch(e){console.error(e);msg(document.querySelector(out),e?.code==='23505'?'You are already subscribed.':'Something went wrong. Please try again.',false);}
    finally{if(btn){btn.disabled=false;btn.textContent=old;}}
  }
  const c=document.querySelector('[data-contact-form]');
  if(c)c.addEventListener('submit',e=>{e.preventDefault();send(c,'contact_submissions','[data-contact-status]',f=>({name:f.name.value.trim(),email:f.email.value.trim(),phone:f.phone.value.trim()||null,role:f.role.value||null,message:f.message.value.trim()||null}));});
  const p=document.querySelector('[data-partner-form]');
  if(p)p.addEventListener('submit',e=>{e.preventDefault();send(p,'partner_inquiries','[data-partner-status]',f=>({name:f.name.value.trim(),organization:f.organization.value.trim()||null,email:f.email.value.trim(),phone:f.phone.value.trim()||null,interest:f.interest.value||null,message:f.message.value.trim()||null}));});
  document.querySelectorAll('[data-newsletter-form]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();send(f,'newsletter_subscribers','[data-newsletter-status]',x=>({email:x.email.value.trim()}));}));
})();