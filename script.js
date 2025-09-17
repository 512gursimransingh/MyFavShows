const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');
const channelList = document.getElementById('channelList');
const punjabiChannelList = document.getElementById('punjabi-channelList');

async function loadChannels(){
  try{
    const res = await fetch('./channels.json');
    const urls = await res.json();

    function formatNameFromId(id){
      let name = id.replace(/[_-]+/g,' ');
      name = name.replace(/([a-z])([A-Z])/g,'$1 $2');
      return name.replace(/\b\w/g,c=>c.toUpperCase()).trim();
    }

    function randomColor(){
      const colors = ["#e74c3c","#27ae60","#2980b9","#8e44ad","#f39c12","#16a085","#d35400","#2c3e50"];
      return colors[Math.floor(Math.random()*colors.length)];
    }

    let channels = urls.map((ch,index)=>({
      id: ch.id,
      url: `https://www.youtube.com/@${ch.id}`,
      name: formatNameFromId(ch.id),
      added: index+1
    }));

    function render(list, query=''){
      channelList.innerHTML = '';
      list.forEach(ch=>{
        const logoLetter = ch.name.charAt(0).toUpperCase();
        const regex = new RegExp(`(${query})`,'gi');
        const highlightedName = query ? ch.name.replace(regex,'<mark>$1</mark>') : ch.name;

        const card = document.createElement('a');
        card.href = ch.url;
        card.target="_blank";
        card.className="channel-card";
        const logoColor = randomColor();
        card.innerHTML = `
          <div class="logo" style="background:${logoColor}">${logoLetter}</div>
          <div class="channel-name">${highlightedName}</div>
        `;
        channelList.appendChild(card);
      });
    }

    // Default sort: newest first
    channels.sort((a,b)=>b.added - a.added);
    render(channels);

    searchInput.addEventListener('input', ()=>{
      const query = searchInput.value.toLowerCase();
      const filtered = channels.filter(ch=>ch.name.toLowerCase().includes(query));
      render(filtered, query);
    });

    sortSelect.addEventListener('change', ()=>{
      let sorted = [...channels];
      const val = sortSelect.value;
      if(val==='az') sorted.sort((a,b)=>a.name.localeCompare(b.name));
      else if(val==='za') sorted.sort((a,b)=>b.name.localeCompare(a.name));
      else if(val==='new') sorted.sort((a,b)=>b.added - a.added);
      else if(val==='old') sorted.sort((a,b)=>a.added - b.added);
      render(sorted, searchInput.value.toLowerCase());
    });

    function generateFavicon(letter,color){
      const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const bgColor = isDark ? '#333' : color;
      const canvas = document.createElement('canvas'); canvas.width=192; canvas.height=192;
      const ctx = canvas.getContext('2d'); ctx.fillStyle = bgColor; ctx.fillRect(0,0,192,192);
      ctx.fillStyle="#fff"; ctx.font="120px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle";
      ctx.fillText(letter,96,96);
      const link = document.createElement('link'); link.rel='icon'; link.href=canvas.toDataURL();
      document.head.appendChild(link);
    }
    generateFavicon(channels[0].name.charAt(0).toUpperCase(), randomColor());

  }catch(err){ console.error(err); }
}

async function loadPunjabiChannels(){
  try{
    const res = await fetch('./punjabi-channels.json');
    const urls = await res.json();

    function formatNameFromId(id){
      let name = id.replace(/[_-]+/g,' ');
      name = name.replace(/([a-z])([A-Z])/g,'$1 $2');
      return name.replace(/\b\w/g,c=>c.toUpperCase()).trim();
    }

    function randomColor(){
      const colors = ["#e74c3c","#27ae60","#2980b9","#8e44ad","#f39c12","#16a085","#d35400","#2c3e50"];
      return colors[Math.floor(Math.random()*colors.length)];
    }

    let channels = urls.map((ch,index)=>({
      id: ch.id,
      url: `https://www.youtube.com/@${ch.id}`,
      name: formatNameFromId(ch.id),
      added: index+1
    }));

    function render(list, query=''){
      punjabiChannelList.innerHTML = '';
      list.forEach(ch=>{
        const logoLetter = ch.name.charAt(0).toUpperCase();
        const regex = new RegExp(`(${query})`,'gi');
        const highlightedName = query ? ch.name.replace(regex,'<mark>$1</mark>') : ch.name;

        const card = document.createElement('a');
        card.href = ch.url;
        card.target="_blank";
        card.className="channel-card";
        const logoColor = randomColor();
        card.innerHTML = `
          <div class="logo" style="background:${logoColor}">${logoLetter}</div>
          <div class="channel-name">${highlightedName}</div>
        `;
        punjabiChannelList.appendChild(card);
      });
    }

    // Default sort: newest first
    channels.sort((a,b)=>b.added - a.added);
    render(channels);

    searchInput.addEventListener('input', ()=>{
      const query = searchInput.value.toLowerCase();
      const filtered = channels.filter(ch=>ch.name.toLowerCase().includes(query));
      render(filtered, query);
    });

    sortSelect.addEventListener('change', ()=>{
      let sorted = [...channels];
      const val = sortSelect.value;
      if(val==='az') sorted.sort((a,b)=>a.name.localeCompare(b.name));
      else if(val==='za') sorted.sort((a,b)=>b.name.localeCompare(a.name));
      else if(val==='new') sorted.sort((a,b)=>b.added - a.added);
      else if(val==='old') sorted.sort((a,b)=>a.added - b.added);
      render(sorted, searchInput.value.toLowerCase());
    });

    function generateFavicon(letter,color){
      const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const bgColor = isDark ? '#333' : color;
      const canvas = document.createElement('canvas'); canvas.width=192; canvas.height=192;
      const ctx = canvas.getContext('2d'); ctx.fillStyle = bgColor; ctx.fillRect(0,0,192,192);
      ctx.fillStyle="#fff"; ctx.font="120px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle";
      ctx.fillText(letter,96,96);
      const link = document.createElement('link'); link.rel='icon'; link.href=canvas.toDataURL();
      document.head.appendChild(link);
    }
    generateFavicon(channels[0].name.charAt(0).toUpperCase(), randomColor());

  }catch(err){ console.error(err); }
}

loadChannels();
loadPunjabiChannels();

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('./service-worker.js')
    .then(()=>console.log('Service Worker registered'))
    .catch(err=>console.error(err));
}
