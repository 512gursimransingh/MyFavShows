const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');
const channelList = document.getElementById('channelList');
const rawData = document.getElementById('channelData').textContent;
let urls = JSON.parse(rawData);

function formatNameFromUrl(url){
  const match = url.match(/@([^/]+)/);
  if(!match) return url;
  let name = match[1];
  name = name.replace(/[_-]+/g,' ');
  name = name.replace(/([a-z])([A-Z])/g,'$1 $2');
  name = name.replace(/\b\w/g,c=>c.toUpperCase()).trim();
  return name;
}

function formatSubs(num){
  if(num>=1e6) return (num/1e6).toFixed(1)+'M';
  if(num>=1e3) return (num/1e3).toFixed(1)+'K';
  return num;
}

let channels = urls.map((ch,index)=>({
  name: formatNameFromUrl(ch.url),
  url: ch.url,
  added: index+1,
  subs: ch.subs
}));

function randomColor(){
  const colors=["#e74c3c","#27ae60","#2980b9","#8e44ad","#f39c12","#16a085","#d35400","#2c3e50"];
  return colors[Math.floor(Math.random()*colors.length)];
}

function renderChannels(list, query=''){
  channelList.innerHTML='';
  list.forEach(ch=>{
    const logoLetter = ch.name.charAt(0).toUpperCase();
    const regex = new RegExp(`(${query})`,'gi');
    const highlightedName = query?ch.name.replace(regex,'<mark>$1</mark>'):ch.name;
    const card = document.createElement('a');
    card.href = ch.url;
    card.target="_blank";
    card.className="channel-card";
    const logoColor = randomColor();
    card.innerHTML=`
      <div class="logo" style="background:${logoColor}">${logoLetter}</div>
      <div class="channel-details">
        <span class="channel-name">${highlightedName}</span>
        <span class="subs">${formatSubs(ch.subs)}</span>
      </div>
    `;
    channelList.appendChild(card);
  });
}

function updateSummary(list){
  const totalChannels = list.length;
  const totalSubs = list.reduce((sum,ch)=>sum+ch.subs,0);
  const summaryDiv = document.getElementById('summary');
  summaryDiv.innerHTML=`
    <div class="summary-badge">🎬 Channels: <span>${totalChannels}</span></div>
    <div class="summary-badge">👥 Subscribers: <span>${formatSubs(totalSubs)}</span></div>
  `;
}

// Initial render (Most Subs First)
channels.sort((a,b)=>b.subs-a.subs);
renderChannels(channels);
updateSummary(channels);

// Search
searchInput.addEventListener('input',()=>{
  const query = searchInput.value.toLowerCase();
  const filtered = channels.filter(ch=>ch.name.toLowerCase().includes(query));
  renderChannels(filtered, query);
  updateSummary(filtered);
});

// Sort
sortSelect.addEventListener('change',()=>{
  let sorted = [...channels];
  const val = sortSelect.value;
  if(val==='az') sorted.sort((a,b)=>a.name.localeCompare(b.name));
  else if(val==='za') sorted.sort((a,b)=>b.name.localeCompare(a.name));
  else if(val==='new') sorted.sort((a,b)=>b.added-a.added);
  else if(val==='old') sorted.sort((a,b)=>a.added-b.added);
  else if(val==='subs_desc') sorted.sort((a,b)=>b.subs-a.subs);
  else if(val==='subs_asc') sorted.sort((a,b)=>a.subs-b.subs);
  renderChannels(sorted, searchInput.value.toLowerCase());
  updateSummary(sorted);
});