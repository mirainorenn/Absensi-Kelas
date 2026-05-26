// GANTI PAKE URL DEPLOYMENT GOOGLE SCRIPT BARU LU!
const URL_API = "https://script.google.com/macros/s/AKfycbwc79WlYqNcngrrjNe8kIOUtnXKBWJ2SzRmv-ePVDfNYbLxLzR_JpfJz7cBzYLeTVsZTQ/exec";

const DATABASE_SISWA = {
    "reval": "Reval",
"adly": "Adly",
"afandi": "Afandi",
"affan": "Affan",
"akbar sam": "Akbar Sam",
"alsya": "Alsya",
"bunga": "Bunga",
"chelsy": "Chelsy",
"dewi": "Dewi",
"zuan": "Zuan",
"early": "Early",
"elena": "Elena",
"endang": "Endang",
"felix": "Felix",
"ferdiansyah": "Ferdiansyah",
"glen": "Glen",
"indra": "Indra",
"junita": "Junita",
"karisah": "Karisah",
"maris": "Maris",
"hakim": "Hakim",
"akbar suyandi": "Akbar Suyandi",
"najwa": "Najwa",
"novia": "Novia",
"novianti": "Novianti",
"panji": "Panji",
"resti": "Resti",
"rehan": "Rehan",
"rifki": "Rifki",
"seli": "Seli",
"sima": "Sima",
"fatimah": "Fatimah",
"wiwin": "Wiwin",
"yumna": "Yumna",
"zaki": "Zaki",

"bobo": "Indra",
"perdi": "Ferdiansyah",
"dot": "Ferdiansyah",
"teple": "Resti",
"renn": "Adly",
"aman": "Hakim"
};

let html5QrCode;
let roleDipilih = "siswa";

// === FITUR: SPLASH SCREEN ===
window.onload = () => {
    setTimeout(() => { document.getElementById('splash-screen').classList.add('hidden'); }, 1500);
    cekTheme();
};

// === FITUR: JAM REAL-TIME ===
setInterval(() => {
    let now = new Date();
    document.getElementById('jam-digital').innerText = now.toLocaleTimeString('id-ID') + ' WIB';
}, 1000);

// === FITUR: DARK MODE ===
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    let isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.getElementById('theme-toggle').innerText = isDark ? '☀️ Light' : '🌙 Dark';
}
function cekTheme() {
    if(localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-toggle').innerText = '☀️ Light';
    }
}

// === LOGIKA LOGIN ===
function gantiRole(role) {
    roleDipilih = role; 
  // Fungsi untuk ngubah waktu mesin (ISO) jadi waktu manusia (WIB)
function formatWaktuBener(waktuMentah) {
    if (typeof waktuMentah === 'string' && waktuMentah.includes('T') && waktuMentah.includes('Z')) {
        let d = new Date(waktuMentah);
        let tgl = d.getDate().toString().padStart(2, '0');
        let bln = (d.getMonth() + 1).toString().padStart(2, '0');
        let thn = d.getFullYear();
        let jam = d.getHours().toString().padStart(2, '0');
        let mnt = d.getMinutes().toString().padStart(2, '0');
        let dtk = d.getSeconds().toString().padStart(2, '0');
        return `${tgl}/${bln}/${thn} ${jam}:${mnt}:${dtk}`;
    }
    return waktuMentah; // Kalau formatnya udah bener, dibiarin aja
}
    let tabSiswa = document.getElementById("tab-siswa"), tabAdmin = document.getElementById("tab-admin");
    let passwordGroup = document.getElementById("password-group"), usernameInput = document.getElementById("username");

    if (role === "admin") {
        tabAdmin.classList.add("active"); tabSiswa.classList.remove("active");
        passwordGroup.classList.remove("hidden"); usernameInput.placeholder = "Username Admin";
    } else {
        tabSiswa.classList.add("active"); tabAdmin.classList.remove("active");
        passwordGroup.classList.add("hidden"); usernameInput.placeholder = "Username / Nama Siswa";
        document.getElementById("password").value = ""; 
    }
}

function cekLogin() {
    let role = localStorage.getItem("role");
    let nama = localStorage.getItem("nama");

    document.getElementById("login-page").classList.add("hidden");
    document.getElementById("siswa-page").classList.add("hidden");
    document.getElementById("admin-page").classList.add("hidden");

    if (role === "siswa") {
        document.getElementById("siswa-page").classList.remove("hidden");
        document.getElementById("welcome-siswa").innerText = "Halo, " + nama + "!";
        loadAbsen(); 
    } else if (role === "admin") {
        document.getElementById("admin-page").classList.remove("hidden");
    } else {
        document.getElementById("login-page").classList.remove("hidden");
    }
}

function login() {
    let nama = document.getElementById("username").value.trim(); 
    let pass = document.getElementById("password").value;
    
    if (roleDipilih === "admin") {
        if (nama !== "admin" || pass !== "Admin927#51akH") {
            Swal.fire({ title: 'Gagal!', text: 'Username atau Password Admin salah.', icon: 'error' });
            return;
        }
    } else {
        if (nama === "") {
            Swal.fire({ title: 'Isi Dulu!', text: 'Nama tidak boleh kosong.', icon: 'warning' });
            return;
        }
        let namaAsli = DATABASE_SISWA[nama.toLowerCase()];
        if (!namaAsli) {
            Swal.fire({ title: 'Ditolak!', text: 'Nama kamu ga terdaftar di kelas XI-G.', icon: 'error' });
            return; 
        }
        nama = namaAsli;
    }

    localStorage.setItem("nama", nama);
    localStorage.setItem("role", roleDipilih);
    cekLogin();
}

function logout() {
    Swal.fire({
        title: 'Yakin mau keluar?', icon: 'question', showCancelButton: true,
        confirmButtonColor: '#c0392b', confirmButtonText: 'Ya, Keluar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("nama"); localStorage.removeItem("role");
            cekLogin();
        }
    });
}

// === SCANNER KAMERA BELAKANG ===
function mulaiScan() {
    document.getElementById("reader").style.display = "block";
    document.getElementById("btn-scan").classList.add("hidden");
    document.getElementById("btn-izin").classList.add("hidden"); 
    document.getElementById("btn-batal-scan").classList.remove("hidden");

    html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
        { facingMode: "environment" }, { fps: 10, qrbox: {width: 250, height: 250} },
        onScanSuccess, (err) => {}
    ).catch((err) => {
        Swal.fire('Error', 'Gagal buka kamera. Pastikan izin aktif.', 'error');
        batalScan();
    });
}

function sembunyikanScanner() {
    document.getElementById("reader").style.display = "none";
    document.getElementById("btn-scan").classList.remove("hidden");
    document.getElementById("btn-izin").classList.remove("hidden");
    document.getElementById("btn-batal-scan").classList.add("hidden");
}

function batalScan() {
    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then(() => { html5QrCode.clear(); sembunyikanScanner(); }).catch(() => { sembunyikanScanner(); });
    } else { sembunyikanScanner(); }
}

function onScanSuccess(decodedText) {
    if (decodedText === "ABSEN-GLORY") {
        html5QrCode.stop().then(() => {
            html5QrCode.clear(); sembunyikanScanner();
            Swal.fire({ title: 'Valid!', text: 'Melacak lokasi lu...', icon: 'success', timer: 1500, showConfirmButton: false })
            .then(() => { absenSekarang(); });
        });
    } else { Swal.fire({ title: 'Gagal!', text: 'Bukan QR kelas kita!', icon: 'error' }); }
}

// === FITUR: ABSEN MANUAL (IZIN/SAKIT) ===
function absenManual() {
    let nama = localStorage.getItem("nama");
    Swal.fire({
        title: 'Keterangan Ga Hadir', text: 'Pilih alasan lu:', icon: 'info',
        showCancelButton: true, showDenyButton: true,
        confirmButtonColor: '#f39c12', denyButtonColor: '#3498db', cancelButtonColor: '#7f8c8d',
        confirmButtonText: 'Sakit 🤒', denyButtonText: 'Izin 📝', cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) kirimIzin(nama, "Sakit");
        else if (result.isDenied) kirimIzin(nama, "Izin");
    });
}

function kirimIzin(nama, alasan) {
    Swal.fire({ title: 'Mengirim Permintaan...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    let url = URL_API + "?action=izin&nama=" + encodeURIComponent(nama) + "&alasan=" + encodeURIComponent(alasan);
    fetch(url).then(res => res.text()).then(data => {
        Swal.fire({ title: 'Terkirim!', text: data, icon: 'success' }); loadAbsen();
    }).catch(err => Swal.fire('Error', 'Gagal jaringan', 'error'));
}

// === FITUR: GEOFENCING (RADIUS LOKASI) ===
function hitungJarak(lat1, lon1, lat2, lon2) {
    const R = 6371e3; const p1 = lat1 * Math.PI / 180; const p2 = lat2 * Math.PI / 180;
    const dp = (lat2 - lat1) * Math.PI / 180; const dl = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dp / 2) * Math.sin(dp / 2) + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) * Math.sin(dl / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.floor(R * c);
}

// === UPDATE: GEOFENCING DENGAN TIMEOUT ANTI-FREEZE ===
function absenSekarang() {
    let nama = localStorage.getItem("nama");
    
    // Munculin loading biar layar ga diem doang pas nyari satelit
    Swal.fire({
        title: 'Mencari Sinyal GPS...',
        text: 'Lagi ngunci lokasi lu (Maksimal 10 detik)...',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => { 
                let latSiswa = position.coords.latitude;
                let lonSiswa = position.coords.longitude;
                
                // KOORDINAT SEKOLAH
                let latSekolah = -6.756983; 
                let lonSekolah = 108.548510; 

                let jarak = hitungJarak(latSiswa, lonSiswa, latSekolah, lonSekolah);
                let lokasiStr = latSiswa + ", " + lonSiswa;

                if (jarak <= 500) { // Radius 50 KM buat ngetes dari rumah
                    kirimData(nama, lokasiStr);
                } else {
                    Swal.fire({
                        title: 'Kejauhan Bro!',
                        text: `Jarak lu ${jarak} meter dari sekolah. Absen ga otomatis masuk. Minta ACC manual?`,
                        icon: 'warning', showCancelButton: true,
                        confirmButtonColor: '#f39c12', cancelButtonColor: '#7f8c8d',
                        confirmButtonText: 'Ya, Minta ACC'
                    }).then((result) => {
                        if (result.isConfirmed) kirimIzin(nama, "Luar Radius Sekolah"); 
                    });
                }
            },
            (error) => { 
                // Kalo loading nyari lokasi gagal/timeout, larinya ke sini
                Swal.fire({
                    title: 'Sinyal GPS Lemah!', 
                    text: 'Coba keluar ruangan atau deket jendela biar kebaca gpsnya.', 
                    icon: 'error'
                }); 
            },
            {
                // INI KUNCI FIX-NYA BRE
                enableHighAccuracy: true,
                timeout: 10000, // Batal otomatis kalo nyari sinyal lebih dari 10 detik
                maximumAge: 0
            }
        );
    } else { 
        Swal.fire('Error', 'HP lu ga support GPS', 'error'); 
    }
}

function kirimData(nama, lokasi) {
    Swal.fire({ title: 'Mengirim...', allowOutsideClick: false, showConfirmButton: false, didOpen: () => { Swal.showLoading(); }});
    let url = URL_API + "?action=absen&nama=" + encodeURIComponent(nama) + "&lokasi=" + encodeURIComponent(lokasi);
    fetch(url).then(response => response.text()).then(data => {
        Swal.fire({ title: 'Berhasil!', text: data, icon: 'success' }); loadAbsen();
    }).catch(error => { Swal.fire({ title: 'Error', text: 'Gagal jaringan', icon: 'error' }); });
}

// === FITUR: SKELETON LOADING LIST ABSEN ===
function loadAbsen() {
    let listElement = document.getElementById("list-absen");
    if (!listElement) return;
    listElement.innerHTML = `<div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>`;
    
    fetch(URL_API + "?action=read").then(response => response.text()).then(textData => {
        let data = JSON.parse(textData);
        listElement.innerHTML = "";
        if (data.length <= 1) { listElement.innerHTML = "<li>Belum ada yang absen.</li>"; } 
        else {
            for (let i = data.length - 1; i >= 1; i--) { 
                let row = data[i];
                let li = document.createElement("li");
                li.innerText = `[${formatWaktuBener(row.waktu)}] ${row.nama} - ${row.status}`;
                listElement.appendChild(li);
            }
        }
    }).catch(() => { listElement.innerHTML = "<li>Gagal muat data. Cek koneksi lu.</li>"; });
}

// === FITUR: ADMIN ACC PERMINTAAN ===
function loadPendingIzin() {
    let listPending = document.getElementById("list-pending");
    listPending.innerHTML = "<li class='skeleton'></li>";

    fetch(URL_API + "?action=read").then(res => res.text()).then(textData => {
        let data = JSON.parse(textData);
        updateStatistik(data);
        listPending.innerHTML = "";
        let adaYangPending = false;

        for (let i = data.length - 1; i >= 1; i--) { 
            let row = data[i];
            if (row.status.includes("Menunggu")) {
                adaYangPending = true;
                let alasanAsli = row.status.includes("Sakit") ? "Sakit" : (row.status.includes("Luar Radius Sekolah") ? "Hadir (Luar Radius)" : "Izin");
                
                let li = document.createElement("li");
                li.style.background = "var(--bg-card)"; li.style.padding = "10px"; li.style.marginBottom = "8px";
                li.style.borderRadius = "6px"; li.style.border = "1px solid var(--border-line)";
                li.innerHTML = `
                    <div style="font-size: 13px; color: var(--text-main); margin-bottom: 8px;">
                        <strong>${row.nama}</strong> (${formatWaktuBener(row.waktu)})<br>
                        Status: <span style="color:#f39c12;">${row.status}</span>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button onclick="prosesIzin(${row.row}, 'acc', '${alasanAsli}')" style="background:#1abc9c; margin:0; padding:6px; font-size:12px;">✅ ACC</button>
                        <button onclick="prosesIzin(${row.row}, 'tolak', '')" style="background:#c0392b; margin:0; padding:6px; font-size:12px;">❌ Tolak</button>
                    </div>
                `;
                listPending.appendChild(li);
            }
        }
        if (!adaYangPending) { listPending.innerHTML = "<li style='padding:10px; font-size:13px;'>Ga ada permintaan izin yang perlu di-ACC bre. Aman!</li>"; }
    }).catch(err => listPending.innerHTML = "<li>Gagal koneksi ke server.</li>");
}

function prosesIzin(rowExcel, tipeAksi, statusTujuan) {
    Swal.fire({ title: 'Memproses...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    let url = URL_API;
    if (tipeAksi === 'acc') url += "?action=acc&row=" + rowExcel + "&status=" + encodeURIComponent(statusTujuan);
    else url += "?action=tolak&row=" + rowExcel;

    fetch(url).then(res => res.text()).then(data => {
        Swal.fire('Beres!', data, 'success'); loadPendingIzin(); loadAbsen();
    }).catch(err => Swal.fire('Error', 'Gagal memproses', 'error'));
}

// === FITUR: AUTO LOGOUT SAAT REFRESH ===
window.addEventListener('beforeunload', function() {
    localStorage.clear(); 
});

cekLogin();
