// ================= Master Data Initializer =================
const DEFAULT_FACILITIES = [
  {
    id: "land_att_01",
    park: "東京ディズニーランド",
    area: "ファンタジーランド",
    category: "アトラクション",
    name: "美女と野獣“魔法のものがたり”",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500",
    url: "https://www.tokyodisneyresort.jp/tdl/attraction/detail/191/",
    maintenance: [],
    dpa: true,
    standbyPass: false,
    mobileOrder: false
  },
  {
    id: "land_att_02",
    park: "東京ディズニーランド",
    area: "トゥモローランド",
    category: "アトラクション",
    name: "ベイマックスのハッピーライド",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500",
    url: "https://www.tokyodisneyresort.jp/tdl/attraction/detail/192/",
    maintenance: [],
    dpa: true,
    standbyPass: false,
    mobileOrder: false
  },
  {
    id: "land_show_01",
    park: "東京ディズニーランド",
    area: "パーク全体",
    category: "エンターテイメント",
    name: "ディズニー・ハーモニー・イン・カラー",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=500",
    url: "https://www.tokyodisneyresort.jp/tdl/show/detail/951/",
    maintenance: [],
    dpa: true,
    standbyPass: false,
    mobileOrder: false
  },
  {
    id: "land_show_02",
    park: "東京ディズニーランド",
    area: "パーク全体",
    category: "エンターテイメント",
    name: "東京ディズニーランド・エレクトリカルパレード・ライツ＆マジック",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500",
    url: "https://www.tokyodisneyresort.jp/tdl/show/detail/901/",
    maintenance: [],
    dpa: true,
    standbyPass: false,
    mobileOrder: false
  },
  {
    id: "sea_att_01",
    park: "東京ディズニーシー",
    area: "メディテレーニアンハーバー",
    category: "アトラクション",
    name: "ソアリン：ファンタスティック・フライト",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500",
    url: "https://www.tokyodisneyresort.jp/tds/attraction/detail/246/",
    maintenance: [],
    dpa: true,
    standbyPass: false,
    mobileOrder: false
  },
  {
    id: "sea_show_01",
    park: "東京ディズニーシー",
    area: "メディテレーニアンハーバー",
    category: "エンターテイメント",
    name: "ビリーヴ！〜シー・オブ・ドリームス〜",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500",
    url: "https://www.tokyodisneyresort.jp/tds/show/detail/963/",
    maintenance: [],
    dpa: true,
    standbyPass: false,
    mobileOrder: false
  },
  {
    id: "sea_show_02",
    park: "東京ディズニーシー",
    area: "アメリカンウォーターフロント",
    category: "エンターテイメント",
    name: "ビッグバンドビート：ダンス・ザ・グローブ",
    image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=500",
    url: "https://www.tokyodisneyresort.jp/tds/show/detail/921/",
    maintenance: [],
    dpa: true,
    standbyPass: false,
    mobileOrder: false
  },
  {
    id: "sea_show_03",
    park: "東京ディズニーシー",
    area: "ロストリバーデルタ",
    category: "エンターテイメント",
    name: "ドリームス・テイク・フライト",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500",
    url: "https://www.tokyodisneyresort.jp/tds/show/detail/930/",
    maintenance: [],
    dpa: true,
    standbyPass: false,
    mobileOrder: false
  }
];

// State Management
let masterFacilities = [];
let savedLogs = [];
let currentLog = null;

// Initialize App
window.onload = function() {
  loadStorage();
  initStartDateField();
};

function loadStorage() {
  const masterData = localStorage.getItem('tdr_master_facilities');
  if (masterData) {
    masterFacilities = JSON.parse(masterData);
  } else {
    masterFacilities = [...DEFAULT_FACILITIES];
    saveMasterStorage();
  }

  const historyData = localStorage.getItem('tdr_saved_logs');
  if (historyData) {
    savedLogs = JSON.parse(historyData);
  }
}

function saveMasterStorage() {
  localStorage.setItem('tdr_master_facilities', JSON.stringify(masterFacilities));
}

function saveLogsStorage() {
  localStorage.setItem('tdr_saved_logs', JSON.stringify(savedLogs));
}

function initStartDateField() {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('start-date').value = today;
}

// Navigation
function navigateTo(screenId) {
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');

  if (screenId === 'screen-history') renderHistoryList();
  if (screenId === 'screen-admin') renderAdminList();
}

// ================= 1. Start & Setup Flow =================
function startDayLog() {
  const date = document.getElementById('start-date').value;
  const arrivalTime = document.getElementById('start-arrival-time').value;
  const park = document.querySelector('input[name="start-park"]:checked').value;

  if (!date || !arrivalTime) {
    alert("日付と現地到着時間を入力してください。");
    return;
  }

  currentLog = {
    id: `log_${date}_${Date.now()}`,
    date,
    arrivalTime,
    park,
    setupTime: "",
    events: []
  };

  navigateTo('screen-setup');
}

function setSetupTimeNow() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('setup-time').value = `${hours}:${minutes}`;
}

function confirmSetupTime() {
  const setupTime = document.getElementById('setup-time').value;
  if (!setupTime) {
    alert("立ち上げ時間を入力してください。");
    return;
  }
  currentLog.setupTime = setupTime;
  setupMainLogScreen();
  navigateTo('screen-main');
}

// ================= 2. Main Log Screen =================
function setupMainLogScreen() {
  document.getElementById('main-header-title').innerText = currentLog.park;
  document.getElementById('main-header-info').innerText = `${currentLog.date} (${currentLog.arrivalTime}到着)`;

  setupPassSelect();
  setupFacilityDatalist();
  renderCurrentTimeline();
}

// DPA / パス選択肢生成 (メンテ除外)
function setupPassSelect() {
  const select = document.getElementById('pass-facility-select');
  select.innerHTML = '';

  const activeFacilities = filterActiveFacilities(currentLog.park, currentLog.date);
  const passFacilities = activeFacilities.filter(f => f.dpa || f.standbyPass);

  passFacilities.forEach(f => {
    const opt = document.createElement('option');
    opt.value = f.id;
    opt.innerText = `[${f.category}] ${f.name}`;
    select.appendChild(opt);
  });
}

// 体験ログ検索候補 (メンテ除外)
function setupFacilityDatalist() {
  const datalist = document.getElementById('facility-datalist');
  datalist.innerHTML = '';

  const activeFacilities = filterActiveFacilities(currentLog.park, currentLog.date);
  activeFacilities.forEach(f => {
    const opt = document.createElement('option');
    opt.value = f.name;
    datalist.appendChild(opt);
  });
}

// メンテナンス期間判定による絞り込み
function filterActiveFacilities(park, logDate) {
  return masterFacilities.filter(f => {
    if (f.park !== park) return false;
    if (!f.maintenance || f.maintenance.length === 0) return true;

    // メンテナンス期間チェック
    return !f.maintenance.some(m => {
      return logDate >= m.start && logDate <= m.end;
    });
  });
}

function onFacilitySelect() {
  const val = document.getElementById('facility-search').value;
  const match = masterFacilities.find(f => f.name === val);
  const box = document.getElementById('facility-info-preview');

  if (match) {
    document.getElementById('prev-park').innerText = match.park;
    document.getElementById('prev-area').innerText = match.area;
    document.getElementById('prev-name').innerText = match.name;
    box.style.display = 'block';
  } else {
    box.style.display = 'none';
  }
}

// ログ記録：パス
function recordPassLog() {
  const getTime = document.getElementById('pass-get-time').value;
  const startTime = document.getElementById('pass-start-time').value;
  const facilityId = document.getElementById('pass-facility-select').value;
  const facility = masterFacilities.find(f => f.id === facilityId);

  if (!getTime || !startTime || !facility) {
    alert("パス情報を入力してください。");
    return;
  }

  // 過去ログ独立のためスナップショットを保存
  currentLog.events.push({
    id: `evt_${Date.now()}`,
    type: "pass",
    time: getTime,
    startTime: startTime,
    facilityName: facility.name,
    facilityImage: facility.image,
    facilityUrl: facility.url,
    category: facility.category
  });

  renderCurrentTimeline();
  alert("パスログを記録しました。");
}

// ログ記録：体験
function recordExperienceLog() {
  const searchName = document.getElementById('facility-search').value;
  const startTime = document.getElementById('log-start-time').value;
  const preshowTime = document.getElementById('log-preshow-time').value;
  const rideTime = document.getElementById('log-ride-time').value;
  const waitTime = document.getElementById('log-wait-time').value;

  const facility = masterFacilities.find(f => f.name === searchName);
  if (!searchName || !facility) {
    alert("施設を選択してください。");
    return;
  }

  currentLog.events.push({
    id: `evt_${Date.now()}`,
    type: "experience",
    time: startTime || rideTime || preshowTime || "",
    startTime,
    preshowTime,
    rideTime,
    waitTime,
    facilityName: facility.name,
    facilityImage: facility.image,
    facilityUrl: facility.url,
    category: facility.category
  });

  renderCurrentTimeline();
  alert("体験ログを保存しました。");
}

// ログ記録：自由記述メモ
function toggleMemoTimeInput(showTime) {
  document.getElementById('memo-time-group').style.display = showTime ? 'flex' : 'none';
}

function recordMemoLog() {
  const isTimeMode = document.querySelector('input[name="memo-type"]:checked').value === 'time';
  const memoTime = isTimeMode ? document.getElementById('memo-time').value : '';
  const memoText = document.getElementById('memo-text').value;

  if (!memoText) {
    alert("メモ内容を入力してください。");
    return;
  }

  currentLog.events.push({
    id: `evt_${Date.now()}`,
    type: "memo",
    time: memoTime,
    hasTime: isTimeMode,
    text: memoText
  });

  renderCurrentTimeline();
  document.getElementById('memo-text').value = '';
  alert("メモを追加しました。");
}

function renderCurrentTimeline() {
  const container = document.getElementById('current-timeline');
  container.innerHTML = '';

  // 時間順ソート（時刻なしは最後）
  const sortedEvents = [...currentLog.events].sort((a, b) => {
    if (!a.time) return 1;
    if (!b.time) return -1;
    return a.time.localeCompare(b.time);
  });

  sortedEvents.forEach(evt => {
    const item = document.createElement('div');
    item.className = 'timeline-item';

    let contentHtml = '';
    if (evt.type === 'pass') {
      contentHtml = `<strong>[パス取得] ${evt.facilityName}</strong><br>利用開始：${evt.startTime}`;
    } else if (evt.type === 'experience') {
      contentHtml = `<strong>[${evt.category}] ${evt.facilityName}</strong><br>` +
                    (evt.waitTime ? `表記待ち時間：${evt.waitTime}分 ` : '') +
                    (evt.preshowTime ? `プレショー：${evt.preshowTime} ` : '') +
                    (evt.rideTime ? `乗車：${evt.rideTime}` : '');
    } else if (evt.type === 'memo') {
      contentHtml = `📝 ${evt.text}`;
    }

    item.innerHTML = `
      <div class="timeline-time">${evt.time || '時刻なし'}</div>
      <div class="timeline-content">${contentHtml}</div>
    `;
    container.appendChild(item);
  });
}

function saveDayLogFinal() {
  if (confirm("一日のログを保存して終了しますか？")) {
    savedLogs.unshift(currentLog);
    saveLogsStorage();
    alert("保存が完了しました。");
    navigateTo('screen-history');
  }
}

// ================= 3. History Screens =================
function renderHistoryList() {
  const container = document.getElementById('history-list-container');
  container.innerHTML = '';

  if (savedLogs.length === 0) {
    container.innerHTML = '<p class="desc-text">保存された過去ログはありません。</p>';
    return;
  }

  savedLogs.forEach(log => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.cursor = 'pointer';
    card.style.marginBottom = '10px';
    card.onclick = () => showDetail(log.id);

    card.innerHTML = `
      <div style="font-weight:bold; font-size:1.05rem;">${log.date}</div>
      <div style="color:var(--primary-color); font-weight:bold; margin-top:4px;">${log.park}</div>
      <div class="desc-text" style="margin-top:4px;">到着 ${log.arrivalTime} / 立ち上げ ${log.setupTime}</div>
    `;
    container.appendChild(card);
  });
}

function showDetail(logId) {
  const log = savedLogs.find(l => l.id === logId);
  if (!log) return;

  document.getElementById('detail-header-date').innerText = log.date;
  document.getElementById('detail-header-park').innerText = log.park;
  document.getElementById('detail-arrival').innerText = log.arrivalTime;
  document.getElementById('detail-setup').innerText = log.setupTime;

  const container = document.getElementById('detail-timeline-container');
  container.innerHTML = '';

  const sortedEvents = [...log.events].sort((a, b) => {
    if (!a.time) return 1;
    if (!b.time) return -1;
    return a.time.localeCompare(b.time);
  });

  sortedEvents.forEach(evt => {
    const item = document.createElement('div');
    item.className = 'timeline-item';

    let contentHtml = '';
    if (evt.type === 'memo') {
      contentHtml = `📝 ${evt.text}`;
    } else {
      contentHtml = `<strong>${evt.facilityName}</strong><br>`;
      if (evt.facilityImage) {
        contentHtml += `<img src="${evt.facilityImage}" class="facility-card-img" alt="${evt.facilityName}">`;
      }
      if (evt.type === 'pass') {
        contentHtml += `利用開始時間：${evt.startTime}<br>`;
      } else if (evt.type === 'experience') {
        if (evt.waitTime) contentHtml += `表記待ち時間：${evt.waitTime}分<br>`;
        if (evt.preshowTime) contentHtml += `プレショー空間に入った時間：${evt.preshowTime}<br>`;
        if (evt.rideTime) contentHtml += `アトラクション乗車時間：${evt.rideTime}<br>`;
      }
      if (evt.facilityUrl) {
        contentHtml += `<a href="${evt.facilityUrl}" target="_blank" class="detail-link-btn">施設の詳細を見る ➔</a>`;
      }
    }

    item.innerHTML = `
      <div class="timeline-time">${evt.time || '時刻なし'}</div>
      <div class="timeline-content">${contentHtml}</div>
    `;
    container.appendChild(item);
  });

  navigateTo('screen-detail');
}

// ================= 4. Admin Management =================
function renderAdminList() {
  const container = document.getElementById('admin-facility-list');
  container.innerHTML = '';

  masterFacilities.forEach(f => {
    const div = document.createElement('div');
    div.className = 'admin-item';
    div.innerHTML = `
      <div>
        <strong>[${f.park.includes('ランド') ? 'TDL' : 'TDS'}] ${f.name}</strong><br>
        <span class="desc-text">${f.category} / ${f.area}</span>
      </div>
      <button class="btn secondary" style="width:auto; padding:6px 12px;" onclick="openFacilityForm('${f.id}')">編集</button>
    `;
    container.appendChild(div);
  });
}

function openFacilityForm(facilityId = null) {
  const modal = document.getElementById('admin-modal');
  modal.style.display = 'flex';

  if (facilityId) {
    const f = masterFacilities.find(item => item.id === facilityId);
    document.getElementById('modal-title').innerText = "施設情報の編集";
    document.getElementById('edit-facility-id').value = f.id;
    document.getElementById('edit-name').value = f.name;
    document.getElementById('edit-park').value = f.park;
    document.getElementById('edit-area').value = f.area;
    document.getElementById('edit-category').value = f.category;
    document.getElementById('edit-image').value = f.image || '';
    document.getElementById('edit-url').value = f.url || '';
    document.getElementById('edit-dpa').checked = f.dpa;
    document.getElementById('edit-sp').checked = f.standbyPass;
    document.getElementById('edit-mo').checked = f.mobileOrder;

    if (f.maintenance && f.maintenance.length > 0) {
      document.getElementById('edit-maint-start').value = f.maintenance[0].start;
      document.getElementById('edit-maint-end').value = f.maintenance[0].end;
    } else {
      document.getElementById('edit-maint-start').value = '';
      document.getElementById('edit-maint-end').value = '';
    }
  } else {
    document.getElementById('modal-title').innerText = "新規施設の追加";
    document.getElementById('edit-facility-id').value = '';
    document.getElementById('edit-name').value = '';
    document.getElementById('edit-area').value = '';
    document.getElementById('edit-image').value = '';
    document.getElementById('edit-url').value = '';
    document.getElementById('edit-dpa').checked = false;
    document.getElementById('edit-sp').checked = false;
    document.getElementById('edit-mo').checked = false;
    document.getElementById('edit-maint-start').value = '';
    document.getElementById('edit-maint-end').value = '';
  }
}

function closeFacilityModal() {
  document.getElementById('admin-modal').style.display = 'none';
}

function saveFacilityMaster() {
  const id = document.getElementById('edit-facility-id').value || `fac_${Date.now()}`;
  const name = document.getElementById('edit-name').value;
  if (!name) {
    alert("施設名を入力してください。");
    return;
  }

  const maintStart = document.getElementById('edit-maint-start').value;
  const maintEnd = document.getElementById('edit-maint-end').value;
  const maintenance = (maintStart && maintEnd) ? [{ start: maintStart, end: maintEnd }] : [];

  const facilityData = {
    id,
    name,
    park: document.getElementById('edit-park').value,
    area: document.getElementById('edit-area').value,
    category: document.getElementById('edit-category').value,
    image: document.getElementById('edit-image').value,
    url: document.getElementById('edit-url').value,
    dpa: document.getElementById('edit-dpa').checked,
    standbyPass: document.getElementById('edit-sp').checked,
    mobileOrder: document.getElementById('edit-mo').checked,
    maintenance
  };

  const index = masterFacilities.findIndex(f => f.id === id);
  if (index >= 0) {
    masterFacilities[index] = facilityData;
  } else {
    masterFacilities.push(facilityData);
  }

  saveMasterStorage();
  closeFacilityModal();
  renderAdminList();
  alert("マスターデータを保存しました。");
}

function resetDefaultMaster() {
  if (confirm("マスターデータを初期状態に戻しますか？")) {
    masterFacilities = [...DEFAULT_FACILITIES];
    saveMasterStorage();
    renderAdminList();
    alert("初期化しました。");
  }
}