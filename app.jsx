import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [activeMenu, setActiveMenu] = useState("home");
  const [userName, setUserName] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [playMusic, setPlayMusic] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // Countdown to January 5, 2026
  useEffect(() => {
    const targetDate = new Date("January 5, 2026 00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % 1000) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Welcome message
  useEffect(() => {
    const name = prompt("Siapa nama kamu?");
    setUserName(name || "Pengunjung");
  }, []);

  // Play music
  const audioRef = useRef(new Audio("https://files.catbox.moe/yrufso.mp3")); 

  const toggleMusic = () => {
    setPlayMusic(!playMusic);
    if (!playMusic) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  };

  // Online status indicator
  useEffect(() => {
    const onlineCheck = setInterval(() => {
      setIsOnline(prev => !prev);
    }, 5000);
    return () => clearInterval(onlineCheck);
  }, []);

  const stories = [
    {
      title: "ANTAKA",
      cover: "https://files.catbox.moe/9z4sct.jpg",  
      pdfLink: "https://cloudgood.web.id/file/Cxc4k8q.pdf",  
    },
  ];

  const skills = [
    { name: "Virtual Creator", level: 70 },
    { name: "Joki Tugas", level: 85 },
    { name: "Guru Santai", level: 90 },
    { name: "Pekerja Kantor", level: 75 },
    { name: "Development", level: 80 },
    { name: "Hacking Jiwa", level: 95 },
  ];

  const relationships = {
    teman: ["Raifa", "Wildan", "Member Martabak Team"],
    pasangan: ["Yanik Marta"],
    sahabat: ["Para Iblis", "Dosa", "Kekacauan Abadi"],
    kekuatan: {
      cahaya: 50,
      kegelapan: 70,
      keseimbangan: 200
    },
    nyawa: "Tidak diketahui"
  };

  const personalData = {
    umur: 15,
    lahir: "5 Januari 2025",
    kelas: "VIII",
    sekolah: "MTS LABTABOER",
    marga: ["January", "Karsin", "Koto", "Chaniago"]
  };

  const leakedData = [
    {
      id: "IDN-SEC-001",
      subject: "Bocoran Data Penduduk",
      description: "Nama: Andhika Pratama\nNIK: 1234567890123456\nAlamat: Jl. Cyberpunk No. 666, Jakarta Timur",
      date: "2025-04-01",
      classification: "RAHASIA"
    },
    {
      id: "IDN-SEC-002",
      subject: "Data Anggaran Negara",
      description: "Anggaran Departemen Energi & Sumber Daya Mineral:\nTotal: Rp 1.200 Triliun\nRincian:\n- Minyak: Rp 400T\n- Batu Bara: Rp 300T\n- Gas: Rp 500T",
      date: "2025-04-05",
      classification: "RAHASIA"
    },
    {
      id: "IDN-SEC-003",
      subject: "Proyek Nuklir Indonesia",
      description: "Lokasi: Pulau Sumatera\nTujuan: Pembangkit Listrik\nStatus: Draft - Belum Disetujui Presiden",
      date: "2025-04-10",
      classification: "TOP SECRET"
    },
    {
      id: "IDN-SEC-004",
      subject: "Daftar Pejabat Korupsi",
      description: "Nama: Budi Susanto\nJabatan: Mantan Dirjen Keuangan\nDugaan: Penggelapan Dana Pendidikan\nStatus: Sedang Diselidiki KPK",
      date: "2025-04-15",
      classification: "RAHASIA"
    },
  ];

  const MenuButton = ({ label }) => (
    <button
      onClick={() => {
        setActiveMenu(label.toLowerCase().replace(/\s+/g, "-"));
        document.getElementById("menu-dropdown").classList.add("hidden");
      }}
      className={`block w-full text-left px-4 py-2 hover:bg-purple-700 transition-all duration-300 ${activeMenu === label.toLowerCase().replace(/\s+/g, "-") ? "bg-red-800 font-bold" : ""}`}
    >
      {label}
    </button>
  );

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMessage = { role: "user", text: chatInput };
    const aiResponse = getAIResponse(chatInput);
    setChatLog([...chatLog, userMessage, aiResponse]);
    setChatInput("");
  };

  const getAIResponse = (message) => {
    message = message.toLowerCase();
    let reply = "";
    if (message.includes("hai") || message.includes("halo")) {
      reply = `Halo, ${userName}! Saya Anna AI. Ada yang bisa saya bantu?`;
    } else if (message.includes("karya")) {
      reply = "Saat ini tersedia satu cerita utama berjudul 'ANTAKA' dalam format PDF.";
    } else if (message.includes("profil") || message.includes("about")) {
      reply = "Kyoutaka, atau Januar Pratama. Moto hidup: 'Bekerja seenak jidat'.";
    } else if (message.includes("kontak")) {
      reply = "WhatsApp: +62 889-8096-3797 | Email: januar@kyoutaka.dev";
    } else if (message.includes("rundown")) {
      reply = `Masih tersisa ${timeLeft.days} hari menuju kebangkitan Sang Kegelapan.`;
    } else if (message.includes("kemampuan")) {
      reply = "Kemampuan: Virtual Creator 70%, Joki Tugas 85%, Guru 90%, Pekerja Kantor 75%";
    } else if (message.includes("hubungan")) {
      reply = "Teman: Raifa, Wildan, Member Martabak Team\nPasangan: Yanik Marta\nSahabat: Para Iblis, Dosa, Kekacauan Abadi";
    } else {
      reply = "Maaf, saya belum bisa memahami itu. Coba tanyakan tentang profil, karya, rundown, kemampuan, kontak, atau komentar.";
    }
    return { role: "ai", text: reply };
  };

  const handleAddComment = () => {
    if (!commentInput.trim()) return;
    setComments([
      ...comments,
      { user: userName, text: commentInput, time: new Date().toLocaleTimeString() }
    ]);
    setCommentInput("");
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-red-950 opacity-30 pointer-events-none"></div>

      {/* Neon Glow CSS */}
      <style>{`
        @keyframes flicker {
          0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 1; }
          20%, 24%, 55% { opacity: 0.4; }
        }
        .shadow-glow {
          box-shadow: 0 0 10px #a855f7, 0 0 20px #c084fc;
          animation: flicker 2s infinite;
        }
        .float {
          animation: floatUp 3s ease-in-out infinite;
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .bg-grid-pattern {
          background-image: radial-gradient(circle at 1px 1px, rgba(255, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>

      {/* Music Toggle */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-4 right-4 z-50 text-2xl font-bold"
      >
        {playMusic ? "😁" : "😠"}
      </button>

      {/* Hidden Backsound */}
      <audio ref={audioRef} src="https://files.catbox.moe/yrufso.mp3"  loop></audio>

      {/* Navigation Bar */}
      <nav className="p-6 flex justify-between items-center border-b border-red-900 backdrop-blur-md bg-black/70 fixed top-0 left-0 right-0 z-40">
        <h1 className="text-2xl font-bold neon-text text-transparent bg-clip-text bg-gradient-to-r from-white to-red-500">
          Kyoutaka / Januar
        </h1>
        <div className="flex items-center gap-2">
          <span className={`inline-block w-3 h-3 rounded-full ${isOnline ? 'bg-red-500 animate-pulse' : 'bg-gray-500'} mr-2`}></span>
          <button
            onClick={() =>
              document.getElementById("menu-dropdown").classList.toggle("hidden")
            }
            className="text-2xl font-bold text-red-400"
          >
            &spades;
          </button>
        </div>
      </nav>

      {/* Dropdown Menu Tanpa Scroll */}
      <div
        id="menu-dropdown"
        className="fixed top-16 right-6 p-2 bg-gray-900 rounded shadow-glow hidden z-40 border border-red-800 min-w-[160px]"
      >
        <ul className="space-y-2">
          <li><MenuButton label="Profile" /></li>
          <li><MenuButton label="About Me" /></li>
          <li><MenuButton label="Kebangkitan" /></li>
          <li><MenuButton label="Hubungan" /></li>
          <li><MenuButton label="Kemampuan" /></li>
          <li><MenuButton label="Karya" /></li>
          <li><MenuButton label="Bounty" /></li>
          <li><MenuButton label="Konten Rahasia" /></li>
          <li><MenuButton label="Kontak" /></li>
          <li><MenuButton label="Anna AI" /></li>
          <li><MenuButton label="Komentar" /></li>
          <li><MenuButton label="Rekomendasi Kyoutaka" /></li>
          <li><MenuButton label="Saluran WhatsApp" /></li>
        </ul>
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-6 pt-24 relative z-10">
        {activeMenu === "profile" && (
          <section className="max-w-4xl mx-auto pt-10">
            <div className="flex flex-col md:flex-row items-center gap-10 relative">
              <img
                src="https://files.catbox.moe/2ucirg.jpg" 
                alt="Profile"
                className="w-40 h-40 rounded-full border-4 border-white shadow-glow object-cover"
              />
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-bold neon-text text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-white">
                  Kyoutaka / Januar Pratama
                </h2>
                <p className="text-2xl text-red-400 mt-2">Penulis Cyberpunk & Penghisap Jiwa</p>
                <p className="mt-4 text-gray-300">
                  Halo semua! Aku Kyoutaka, atau lebih dikenal sebagai Januar.
                  Aku bukan manusia biasa—aku adalah Dewa Kontrak Jiwa.
                  Aku menghisap kehidupan orang lain untuk menciptakan dunia baru.
                </p>
                <p className="mt-2 text-gray-400 italic">
                  Moto hidup: “Bekerja seenak jidat”.
                </p>
                <div className="mt-4 text-gray-400 space-y-1">
                  <p><strong>Umur:</strong> {personalData.umur} tahun</p>
                  <p><strong>Lahir:</strong> {personalData.lahir}</p>
                  <p><strong>Kelas:</strong> {personalData.kelas}</p>
                  <p><strong>Sekolah:</strong> {personalData.sekolah}</p>
                  <p><strong>Marga:</strong> {personalData.marga.join(", ")}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeMenu === "about-me" && (
          <section className="max-w-3xl mx-auto pt-10">
            <div className="bg-gray-900 p-6 rounded-lg border border-red-800 shadow-glow">
              <h2 className="text-3xl font-bold mb-4">Tentang Diri Saya</h2>
              <p className="mb-4">
                Halo semua! Aku Kyoutaka, atau lebih dikenal sebagai Januar Pratama.
                Aku bukan manusia biasa—aku adalah penghisap jiwa, pembuat kontrak gelap, dan pencipta realitas alternatif.
              </p>
              <p className="mb-4">
                Aku menawarkan waktu hidupmu dengan imbalan apapun yang kau inginkan.
                Apakah kamu siap membayar harga jiwa?
              </p>
              <p className="text-red-400">
                Aku tidak percaya pada kerja keras, aku percaya pada efisiensi dan kesenangan sesaat.
              </p>
              <p className="mt-4 text-gray-300">
                Yoroshiku onegaishimasu... jika kau berani masuk ke duniamu sendiri.
              </p>
            </div>
          </section>
        )}

        {activeMenu === "kebangkitan" && (
          <section className="max-w-xl mx-auto pt-10 text-center">
            <h2 className="text-2xl font-bold mb-4">Menuju Kebangkitan Sang Kegelapan</h2>
            <div className="inline-flex gap-4 text-2xl font-mono mt-6 bg-gray-900 p-4 rounded shadow-glow">
              <span>{timeLeft.days}d</span>
              <span>{timeLeft.hours}h</span>
              <span>{timeLeft.minutes}m</span>
              <span>{timeLeft.seconds}s</span>
            </div>
            <p className="mt-2 text-sm text-gray-400">menuju 5 Januari 2026</p>
          </section>
        )}

        {activeMenu === "hubungan" && (
          <section className="max-w-2xl mx-auto pt-10">
            <h2 className="text-3xl font-bold mb-6">Hubungan Sang Iblis</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl text-red-400">Teman:</h3>
                <ul className="list-disc ml-6 mt-2">
                  {relationships.teman.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl text-red-400">Pasangan:</h3>
                <ul className="list-disc ml-6 mt-2">
                  {relationships.pasangan.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl text-red-400">Sahabat:</h3>
                <ul className="list-disc ml-6 mt-2">
                  {relationships.sahabat.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl text-red-400">Kekuatan Jiwa:</h3>
                <div className="mt-2 space-y-4">
                  <div>
                    Cahaya: {relationships.kekuatan.cahaya}%
                    <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${Math.min(100, relationships.kekuatan.cahaya)}%` }}></div>
                    </div>
                  </div>
                  <div>
                    Kegelapan: {relationships.kekuatan.kegelapan}%
                    <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${Math.min(100, relationships.kekuatan.kegelapan)}%` }}></div>
                    </div>
                  </div>
                  <div>
                    Keseimbangan: {relationships.kekuatan.keseimbangan}%
                    <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${Math.min(100, relationships.kekuatan.keseimbangan)}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl text-red-400">Sisa Nyawa:</h3>
                <p className="mt-2 text-gray-300">{relationships.nyawa}</p>
              </div>
            </div>
          </section>
        )}

        {activeMenu === "kemampuan" && (
          <section className="max-w-2xl mx-auto pt-10">
            <h2 className="text-2xl font-bold mb-4">Kemampuan</h2>
            {skills.map((skill, i) => (
              <div key={i} className="mb-6">
                <div className="flex justify-between mb-2">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-red-500 to-purple-500 h-2.5 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </section>
        )}

        {activeMenu === "karya" && (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
            {stories.map((story, index) => (
              <div
                key={index}
                className="bg-gray-900 p-4 rounded-lg border border-red-700 hover:border-red-500 transition-all shadow-glow"
              >
                <img
                  src={story.cover}
                  alt={story.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold">{story.title}</h3>
                <a
                  href={story.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-red-400 hover:text-red-300"
                >
                  Baca Cerpen (PDF)
                </a>
              </div>
            ))}
          </section>
        )}

        {activeMenu === "bounty" && (
          <section className="max-w-xl mx-auto pt-10 text-center">
            <h2 className="text-2xl font-bold mb-4">Poster Bounty</h2>
            <img
              src="https://files.catbox.moe/8zbj18.jpg" 
              alt="Bounty Poster"
              className="mx-auto w-full max-w-sm rounded shadow-lg"
            />
          </section>
        )}

        {activeMenu === "rekomendasi-kyoutaka" && (
          <section className="max-w-3xl mx-auto pt-10">
            <h2 className="text-2xl font-bold mb-4">Rekomendasi Kyoutaka</h2>
            <video controls className="w-full rounded shadow-lg">
              <source src="https://files.catbox.moe/21kuai.mp4"  type="video/mp4" />
              Browser Anda tidak mendukung video.
            </video>
          </section>
        )}

        {activeMenu === "konten-rahasia" && (
          <section className="max-w-4xl mx-auto pt-10">
            <h2 className="text-3xl font-bold mb-6 text-red-400">⚠️ Konten RAHASIA</h2>
            <div className="bg-gray-900 p-6 rounded border border-red-800 shadow-glow">
              <h3 className="text-xl font-bold text-red-300">🚨 AKSES TERBATAS</h3>
              <p className="mt-4 text-gray-300">
                Kamu telah melewati batas normal dan memasuki wilayah terlarang...
              </p>
              <div className="mt-6 space-y-6">
                {leakedData.map((data, index) => (
                  <div key={index} className="border border-red-700 p-4 rounded bg-gray-800">
                    <div className="font-mono text-red-500">[DATA #{data.id}]</div>
                    <div className="font-bold mt-2">{data.subject}</div>
                    <pre className="mt-2 text-sm text-gray-300 whitespace-pre-wrap">{data.description}</pre>
                    <div className="mt-2 text-xs text-gray-500">Tanggal: {data.date} • Klasifikasi: {data.classification}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <button
                  onClick={() => alert("ACCESS DENIED - File ini hanya bisa diakses oleh sistem internal.")}
                  className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition"
                >
                  Lihat Data Lebih Banyak
                </button>
              </div>
            </div>
          </section>
        )}

        {activeMenu === "kontak" && (
          <section className="max-w-xl mx-auto pt-10">
            <h2 className="text-2xl font-bold mb-4">Kontak Saya</h2>
            <ul className="space-y-2">
              <li>
                📱 WhatsApp:{" "}
                <a href="https://wa.me/6288980963797"  className="text-red-400 hover:underline">
                  +62 889-8096-3797
                </a>
              </li>
              <li>
                📧 Email:{" "}
                <a href="mailto:jahraatasya@gmail.com" className="text-red-400 hover:underline">
                  januar@kyoutaka.dev
                </a>
              </li>
            </ul>
          </section>
        )}

        {activeMenu === "anna-ai" && (
          <section className="max-w-2xl mx-auto pt-10">
            <h2 className="text-2xl font-bold mb-4">Chat dengan Anna AI</h2>
            <div className="bg-gray-900 p-4 h-60 overflow-y-scroll rounded border border-red-700 mb-4">
              {chatLog.length === 0 && (
                <div className="text-center text-gray-500 pt-10">Mulailah percakapan dengan Anna AI...</div>
              )}
              {chatLog.map((msg, i) => (
                <div key={i} className={`mb-3 ${msg.role === "user" ? "text-right" : ""}`}>
                  <span
                    className={`inline-block px-4 py-2 rounded-lg max-w-xs ${
                      msg.role === "user"
                        ? "bg-red-600 text-white"
                        : "bg-gray-800 text-gray-200"
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Tulis pesan..."
                className="flex-1 p-2 bg-gray-900 border border-gray-700 rounded focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
              >
                Kirim
              </button>
            </div>
          </section>
        )}

        {activeMenu === "komentar" && (
          <section className="max-w-2xl mx-auto pt-10">
            <h2 className="text-2xl font-bold mb-4">Komentar Pengunjung</h2>
            <div className="bg-gray-900 p-4 h-60 overflow-y-scroll rounded border border-red-700 mb-4">
              {comments.length === 0 && (
                <div className="text-center text-gray-500 pt-10">Belum ada komentar.</div>
              )}
              {comments.map((c, i) => (
                <div key={i} className="mb-3 text-left">
                  <span className="inline-block px-4 py-2 rounded-lg bg-gray-800 text-gray-200">
                    <strong>{c.user}</strong>: {c.text}{" "}
                    <small className="text-xs text-gray-400">{c.time}</small>
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Tinggalkan komentar..."
                className="flex-1 p-2 bg-gray-900 border border-gray-700 rounded focus:outline-none"
              />
              <button
                onClick={handleAddComment}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
              >
                Kirim
              </button>
            </div>
          </section>
        )}

        {activeMenu === "saluran-whatsapp" && (
          <section className="max-w-xl mx-auto pt-10 text-center">
            <h2 className="text-2xl font-bold mb-4">Join ke Saluran WhatsApp</h2>
            <a
              href="https://whatsapp.com/channel/0029VbALx58E50UfOE5c0C2b" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
            >
              Join ke Saluran
            </a>
          </section>
        )}

        {activeMenu === "home" && (
          <section className="text-center pt-20">
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-500 to-red-400 animate-pulse mb-6">
              Kyoutaka.html
            </h1>
            <p className="mt-4 text-xl text-red-400 max-w-xl mx-auto">
              Selamat datang di neraka hitam milikku!!
            </p>
            <div className="mt-8 text-red-500 animate-pulse">
              ✨ Anda telah memasuki wilayah Kegelapan Abadi ✨
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="p-6 text-center border-t border-red-900 mt-12 text-gray-500">
        <p>&copy; 2025 Andhika Januar Pratama | Powered by Darah ❤️</p>
        <div className="mt-2">
          Status:{" "}
          <span
            className={`h-3 w-3 inline-block rounded-full ${
              isOnline ? "bg-red-500 animate-pulse" : "bg-gray-500"
            } ml-2`}
          ></span>{" "} Online
        </div>
      </footer>
    </div>
  );
};

export default App;