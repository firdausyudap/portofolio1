const $ = (selector) => document.querySelector(selector);

const loader = $("#loader");
const loaderBar = $("#loaderBar");
let loading = 0;
const loaderTimer = setInterval(() => {
    loading = Math.min(100, loading + Math.floor(Math.random() * 10) + 5);
    loaderBar.style.width = `${loading}%`;
    if (loading === 100) {
        clearInterval(loaderTimer);
        setTimeout(() => loader.classList.add("hide"), 500);
    }
}, 100);

const nav = $("#nav");
const menuToggle = $("#menuToggle");
menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});
document.querySelectorAll(".nav a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
}));

const langButton = $("#langButton");
const languageMenu = $("#languageMenu");
const translations = {
    "nav a": { EN: ["HOME", "PROFILE", "SKILLS", "WORKS", "ABOUT ME", "CONTACT"], ID: ["BERANDA", "PROFIL", "KEAHLIAN", "KARYA", "TENTANG SAYA", "KONTAK"] },
    "#checkSoundLabel": { EN: ["CHECK SOUND", "CEK SUARA"] },
    ".kicker": { EN: ["FIRDAUS YUDA // PORTFOLIO", "FIRDAUS YUDA // PORTOFOLIO"] },
    ".hero h1": { EN: ["<span>BUILT TO</span><strong>CREATE</strong>", "<span>DIBUAT UNTUK</span><strong>BERKARYA</strong>"] },
    ".subtitle": { EN: ["CREATIVE DEVELOPER", "PENGEMBANG KREATIF"] },
    ".description": { EN: ["I design websites, interfaces, and digital experiences with sharp, functional, and distinctive visuals.", "Saya merancang website, interface, dan pengalaman digital dengan perpaduan visual yang tajam, fungsional, dan berkarakter."] },
    ".hero .btn": { EN: ["EXPLORE MY WORK <b>→</b>", "JELAJAHI KARYA SAYA <b>→</b>"] },
    "#voiceBtn": { EN: ["🎙 HEAR INTRO", "🎙 DENGARKAN INTRO"] },
    ".sound-title strong": { EN: ["AUDIO SYSTEM", "SISTEM AUDIO"] },
    ".sound-title small": { EN: ["YUDA CREATIVE EXPERIENCE", "PENGALAMAN KREATIF YUDA"] },
    "#engineRow .audio-info strong": { EN: ["FOCUS MODE", "MODE FOKUS"] },
    "#engineRow .audio-info small": { EN: ["CREATIVE WORKFLOW", "ALUR KERJA KREATIF"] },
    "#voiceRow .audio-info strong": { EN: ["YUDA VOICE", "SUARA YUDA"] },
    "#voiceRow .audio-info small": { EN: ["PERSONAL INTRO", "INTRO PRIBADI"] },
    ".volume span": { EN: ["🔊 VOLUME", "🔊 VOLUME"] },
    ".stats > div:nth-child(1) small": { EN: ["SELECTED PROJECTS", "PROYEK TERPILIH"] },
    ".stats > div:nth-child(2) small": { EN: ["CORE SKILLS", "KEAHLIAN UTAMA"] },
    ".stats > div:nth-child(3) em": { EN: ["IDEAS", "IDE"] },
    ".stats > div:nth-child(3) small": { EN: ["ALWAYS LEARNING", "SELALU BELAJAR"] },
    ".stats > div:nth-child(4) em": { EN: ["GOAL", "TUJUAN"] },
    ".stats > div:nth-child(4) small": { EN: ["MAKE IMPACT", "MEMBERI DAMPAK"] },
    "#features .section-head span": { EN: ["01 / CAPABILITIES", "01 / KEMAMPUAN"] },
    "#features .section-head h2": { EN: ["BUILT TO <b>CREATE.</b>", "DIBUAT UNTUK <b>BERKARYA.</b>"] },
    ".cards article:nth-child(1) h3": { EN: ["WEB DEVELOPMENT", "PENGEMBANGAN WEB"] },
    ".cards article:nth-child(1) p": { EN: ["Building responsive websites with HTML, CSS, and JavaScript.", "Membangun website responsif dengan HTML, CSS, dan JavaScript."] },
    ".cards article:nth-child(2) h3": { EN: ["UI DESIGN", "DESAIN UI"] },
    ".cards article:nth-child(2) p": { EN: ["Designing clear, modern, and easy-to-use interfaces.", "Merancang interface yang jelas, modern, dan mudah digunakan."] },
    ".cards article:nth-child(3) h3": { EN: ["VISUAL DIRECTION", "ARAH VISUAL"] },
    ".cards article:nth-child(3) p": { EN: ["Turning color, typography, and composition into visual identity.", "Mengolah warna, tipografi, dan komposisi menjadi identitas visual."] },
    ".cards article:nth-child(4) h3": { EN: ["PROBLEM SOLVING", "PEMECAHAN MASALAH"] },
    ".cards article:nth-child(4) p": { EN: ["Turning needs and ideas into real digital solutions.", "Mengubah kebutuhan dan ide menjadi solusi digital yang nyata."] },
    "#gallery .section-head span": { EN: ["03 / SELECTED WORKS", "03 / KARYA TERPILIH"] },
    "#about > div:first-child > span": { EN: ["04 / ABOUT ME", "04 / TENTANG SAYA"] },
    "#about h2": { EN: ["IDEAS INTO<br><b>EXPERIENCES.</b>", "IDE MENJADI<br><b>PENGALAMAN.</b>"] },
    "#about p": { EN: ["I am Firdaus Yuda Permana, a creative developer interested in web, interface, game visuals, and branding. This portfolio presents the process and work I have built.", "Saya Firdaus Yuda Permana, seorang creative developer yang tertarik pada web, interface, visual game, dan branding. Portfolio ini menampilkan proses dan karya yang saya bangun."] },
    "#voiceBtn2": { EN: ["🎙 PLAY MY INTRO", "🎙 PUTAR INTRO SAYA"] },
    ".contact-copy > span": { EN: ["05 / CONTACT", "05 / KONTAK"] },
    ".contact-copy h2": { EN: ["LET'S MAKE<br><b>IT REAL.</b>", "WUJUDKAN<br><b>IDE NYATA.</b>"] },
    ".contact-copy p": { EN: ["Have an idea or project to bring to life? Send a message and let’s start the conversation.", "Punya ide atau project yang ingin diwujudkan? Kirim pesan dan mari mulai percakapannya."] },
    "#name": { EN: ["Your name", "Nama kamu"] },
    "#email": { EN: ["you@email.com", "email@kamu.com"] },
    "#message": { EN: ["Tell me about your project...", "Ceritakan project kamu..."] },
    ".contact-form .btn": { EN: ["SEND MESSAGE <b>→</b>", "KIRIM PESAN <b>→</b>"] },
    ".cta span": { EN: ["LET'S BUILD SOMETHING", "MARI MEMBANGUN SESUATU"] },
    ".cta h2": { EN: ["CREATE YOUR <b>IMPACT.</b>", "CIPTAKAN <b>DAMPAKMU.</b>"] },
    ".cta .btn": { EN: ["BACK TO TOP ↑", "KEMBALI KE ATAS ↑"] },
    "footer small": { EN: ["© 2026 FIRDAUS YUDA PORTFOLIO", "© 2026 PORTOFOLIO FIRDAUS YUDA"] },
    "footer > a": { EN: ["TOP ↑", "ATAS ↑"] }
};
const koreanTranslations = {
    ".loader p": "시동 중...",
    "nav a": ["홈", "프로필", "기술", "작업", "소개", "연락처"],
    "#checkSoundLabel": "사운드 확인",
    ".kicker": "피르다우스 유다 // 포트폴리오",
    ".hero h1": "<span>창작을 위해</span><strong>만들다</strong>",
    ".subtitle": "크리에이티브 개발자",
    ".description": "선명하고 기능적이며 개성 있는 비주얼로 웹사이트와 인터페이스, 디지털 경험을 디자인합니다.",
    ".hero .btn": "작업물 살펴보기 <b>→</b>",
    "#voiceBtn": "🎙 소개 듣기",
    ".sound-title strong": "오디오 시스템",
    ".sound-title small": "유다 크리에이티브 경험",
    "#engineRow .audio-info strong": "집중 모드",
    "#engineRow .audio-info small": "크리에이티브 작업 흐름",
    "#voiceRow .audio-info strong": "유다 보이스",
    "#voiceRow .audio-info small": "개인 소개",
    ".volume span": "🔊 볼륨",
    ".stats > div:nth-child(1) small": "선정 프로젝트",
    ".stats > div:nth-child(2) small": "핵심 기술",
    ".stats > div:nth-child(3) em": "아이디어",
    ".stats > div:nth-child(3) small": "항상 배우는 중",
    ".stats > div:nth-child(4) em": "목표",
    ".stats > div:nth-child(4) small": "영향을 만들다",
    "#features .section-head span": "01 / 역량",
    "#features .section-head h2": "창작을 위해 <b>만들다.</b>",
    "#skills .section-head span": "02 / 도구",
    "#skills .section-head h2": "움직이는 <b>기술.</b>",
    ".cards article:nth-child(1) h3": "웹 개발",
    ".cards article:nth-child(1) p": "HTML, CSS, JavaScript로 반응형 웹사이트를 만듭니다.",
    ".cards article:nth-child(2) h3": "UI 디자인",
    ".cards article:nth-child(2) p": "명확하고 현대적이며 사용하기 쉬운 인터페이스를 디자인합니다.",
    ".cards article:nth-child(3) h3": "비주얼 디렉션",
    ".cards article:nth-child(3) p": "색상, 타이포그래피, 구성을 시각적 아이덴티티로 발전시킵니다.",
    ".cards article:nth-child(4) h3": "문제 해결",
    ".cards article:nth-child(4) p": "필요와 아이디어를 실제 디지털 솔루션으로 바꿉니다.",
    "#gallery .section-head span": "03 / 선정 작업",
    "#gallery .section-head h2": "기억에 남는 <b>작업.</b>",
    ".project-nexora .project-overlay small": "날씨, 프로필 및 인도네시아 역사 <b>↗</b>",
    ".project-history .project-overlay small": "역사 및 지식 <b>↗</b>",
    ".project-pos .project-overlay small": "간단한 계산원 애플리케이션 <b>↗</b>",
    ".project-weather .project-overlay small": "날씨 API 및 API 키 <b>↗</b>",
    "#about > div:first-child > span": "04 / 소개",
    "#about h2": "아이디어를<br><b>경험으로.</b>",
    "#about p": "저는 웹, 인터페이스, 게임 비주얼, 브랜딩에 관심 있는 크리에이티브 개발자 피르다우스 유다 퍼르마나입니다. 이 포트폴리오에는 제가 만든 작업과 과정이 담겨 있습니다.",
    "#voiceBtn2": "🎙 내 소개 재생",
    ".contact-copy > span": "05 / 연락처",
    ".contact-copy h2": "아이디어를<br><b>현실로.</b>",
    ".contact-copy p": "실현하고 싶은 아이디어나 프로젝트가 있나요? 메시지를 보내고 대화를 시작해 보세요.",
    "#name": "이름을 입력하세요",
    "#email": "you@email.com",
    "#message": "프로젝트에 대해 알려주세요...",
    ".contact-form .btn": "메시지 보내기 <b>→</b>",
    ".cta span": "무언가를 함께 만들어요",
    ".cta h2": "당신의 <b>영향력을 만드세요.</b>",
    ".cta .btn": "맨 위로 ↑",
    "footer small": "© 2026 피르다우스 유다 포트폴리오",
    "footer > a": "맨 위 ↑"
};
const additionalTranslations = {
    JA: { "nav a": ["ホーム", "プロフィール", "スキル", "作品", "私について", "連絡先"], ".kicker": "ファーダウス ユダ // ポートフォリオ", ".subtitle": "クリエイティブ開発者", ".description": "鋭く機能的で個性的なビジュアルで、ウェブサイトやインターフェース、デジタル体験をデザインします。", "#checkSoundLabel": "サウンド確認", "#voiceBtn": "🎙 紹介を聞く", ".sound-title strong": "オーディオシステム", ".sound-title small": "ユダ クリエイティブ体験", "#features .section-head span": "01 / 能力", "#skills .section-head span": "02 / ツール", "#gallery .section-head span": "03 / 主な作品", ".contact-copy > span": "05 / 連絡先", ".contact-copy p": "実現したいアイデアやプロジェクトはありますか？メッセージを送って会話を始めましょう。", ".contact-form .btn": "メッセージを送る <b>→</b>", ".cta span": "一緒に何かを作りましょう", ".cta .btn": "トップへ戻る ↑" },
    ZH: { "nav a": ["首页", "简介", "技能", "作品", "关于我", "联系"], ".kicker": "FIRDAUS YUDA // 作品集", ".subtitle": "创意开发者", ".description": "用锐利、实用且独特的视觉设计网站、界面和数字体验。", "#checkSoundLabel": "检查声音", "#voiceBtn": "🎙 聆听介绍", ".sound-title strong": "音频系统", ".sound-title small": "YUDA 创意体验", "#features .section-head span": "01 / 能力", "#skills .section-head span": "02 / 工具", "#gallery .section-head span": "03 / 精选作品", ".contact-copy > span": "05 / 联系方式", ".contact-copy p": "有想实现的想法或项目吗？发送消息，让我们开始交流。", ".contact-form .btn": "发送消息 <b>→</b>", ".cta span": "一起创造一些东西", ".cta .btn": "返回顶部 ↑" },
    AR: { "nav a": ["الرئيسية", "الملف الشخصي", "المهارات", "الأعمال", "نبذة عني", "اتصل بنا"], ".kicker": "فيرداوس يودا // ملف الأعمال", ".subtitle": "مطور إبداعي", ".description": "أصمم المواقع والواجهات والتجارب الرقمية بصرياً بشكل حاد وعملي ومميز.", "#checkSoundLabel": "فحص الصوت", "#voiceBtn": "🎙 استمع إلى المقدمة", ".sound-title strong": "نظام الصوت", ".sound-title small": "تجربة يودا الإبداعية", "#features .section-head span": "01 / القدرات", "#skills .section-head span": "02 / الأدوات", "#gallery .section-head span": "03 / أعمال مختارة", ".contact-copy > span": "05 / اتصل بنا", ".contact-copy p": "هل لديك فكرة أو مشروع تريد تحقيقه؟ أرسل رسالة ولنبدأ الحوار.", ".contact-form .btn": "إرسال الرسالة <b>→</b>", ".cta span": "لنبنِ شيئاً معاً", ".cta .btn": "العودة إلى الأعلى ↑" },
    ES: { "nav a": ["INICIO", "PERFIL", "HABILIDADES", "TRABAJOS", "SOBRE MÍ", "CONTACTO"], ".kicker": "FIRDAUS YUDA // PORTAFOLIO", ".subtitle": "DESARROLLADOR CREATIVO", ".description": "Diseño sitios web, interfaces y experiencias digitales con una estética nítida, funcional y única.", "#checkSoundLabel": "COMPROBAR SONIDO", "#voiceBtn": "🎙 ESCUCHAR INTRO", ".sound-title strong": "SISTEMA DE AUDIO", ".sound-title small": "EXPERIENCIA CREATIVA YUDA", "#features .section-head span": "01 / CAPACIDADES", "#skills .section-head span": "02 / HERRAMIENTAS", "#gallery .section-head span": "03 / TRABAJOS DESTACADOS", ".contact-copy > span": "05 / CONTACTO", ".contact-copy p": "¿Tienes una idea o proyecto que quieres hacer realidad? Envía un mensaje y comencemos la conversación.", ".contact-form .btn": "ENVIAR MENSAJE <b>→</b>", ".cta span": "CONSTRUYAMOS ALGO JUNTOS", ".cta .btn": "VOLVER ARRIBA ↑" },
    FR: { "nav a": ["ACCUEIL", "PROFIL", "COMPÉTENCES", "PROJETS", "À PROPOS", "CONTACT"], ".kicker": "FIRDAUS YUDA // PORTFOLIO", ".subtitle": "DÉVELOPPEUR CRÉATIF", ".description": "Je conçois des sites, des interfaces et des expériences numériques aux visuels nets, fonctionnels et uniques.", "#checkSoundLabel": "VÉRIFIER LE SON", "#voiceBtn": "🎙 ÉCOUTER L'INTRO", ".sound-title strong": "SYSTÈME AUDIO", ".sound-title small": "EXPÉRIENCE CRÉATIVE YUDA", "#features .section-head span": "01 / CAPACITÉS", "#skills .section-head span": "02 / OUTILS", "#gallery .section-head span": "03 / PROJETS SÉLECTIONNÉS", ".contact-copy > span": "05 / CONTACT", ".contact-copy p": "Vous avez une idée ou un projet à réaliser ? Envoyez un message et commençons la conversation.", ".contact-form .btn": "ENVOYER LE MESSAGE <b>→</b>", ".cta span": "CONSTRUISONS QUELQUE CHOSE", ".cta .btn": "RETOUR EN HAUT ↑" },
    DE: { "nav a": ["START", "PROFIL", "FÄHIGKEITEN", "PROJEKTE", "ÜBER MICH", "KONTAKT"], ".kicker": "FIRDAUS YUDA // PORTFOLIO", ".subtitle": "KREATIVER ENTWICKLER", ".description": "Ich entwerfe Websites, Benutzeroberflächen und digitale Erlebnisse mit klaren, funktionalen und einzigartigen Visuals.", "#checkSoundLabel": "SOUND PRÜFEN", "#voiceBtn": "🎙 INTRO ANHÖREN", ".sound-title strong": "AUDIOSYSTEM", ".sound-title small": "YUDA KREATIVERLEBNIS", "#features .section-head span": "01 / FÄHIGKEITEN", "#skills .section-head span": "02 / WERKZEUGE", "#gallery .section-head span": "03 / AUSGEWÄHLTE PROJEKTE", ".contact-copy > span": "05 / KONTAKT", ".contact-copy p": "Hast du eine Idee oder ein Projekt? Sende eine Nachricht und lass uns das Gespräch beginnen.", ".contact-form .btn": "NACHRICHT SENDEN <b>→</b>", ".cta span": "LASS UNS ETWAS BAUEN", ".cta .btn": "NACH OBEN ↑" },
    PT: { "nav a": ["INÍCIO", "PERFIL", "HABILIDADES", "TRABALHOS", "SOBRE MIM", "CONTATO"], ".kicker": "FIRDAUS YUDA // PORTFÓLIO", ".subtitle": "DESENVOLVEDOR CRIATIVO", ".description": "Crio sites, interfaces e experiências digitais com visuais marcantes, funcionais e únicos.", "#checkSoundLabel": "VERIFICAR SOM", "#voiceBtn": "🎙 OUVIR INTRODUÇÃO", ".sound-title strong": "SISTEMA DE ÁUDIO", ".sound-title small": "EXPERIÊNCIA CRIATIVA YUDA", "#features .section-head span": "01 / CAPACIDADES", "#skills .section-head span": "02 / FERRAMENTAS", "#gallery .section-head span": "03 / TRABALHOS SELECIONADOS", ".contact-copy > span": "05 / CONTATO", ".contact-copy p": "Tem uma ideia ou projeto para realizar? Envie uma mensagem e vamos começar a conversa.", ".contact-form .btn": "ENVIAR MENSAGEM <b>→</b>", ".cta span": "VAMOS CONSTRUIR ALGO", ".cta .btn": "VOLTAR AO TOPO ↑" },
    IT: { "nav a": ["HOME", "PROFILO", "COMPETENZE", "LAVORI", "CHI SONO", "CONTATTI"], ".kicker": "FIRDAUS YUDA // PORTFOLIO", ".subtitle": "SVILUPPATORE CREATIVO", ".description": "Progetto siti web, interfacce ed esperienze digitali con immagini nitide, funzionali e distintive.", "#checkSoundLabel": "CONTROLLA AUDIO", "#voiceBtn": "🎙 ASCOLTA INTRO", ".sound-title strong": "SISTEMA AUDIO", ".sound-title small": "ESPERIENZA CREATIVA YUDA", "#features .section-head span": "01 / CAPACITÀ", "#skills .section-head span": "02 / STRUMENTI", "#gallery .section-head span": "03 / LAVORI SELEZIONATI", ".contact-copy > span": "05 / CONTATTI", ".contact-copy p": "Hai un'idea o un progetto da realizzare? Invia un messaggio e iniziamo la conversazione.", ".contact-form .btn": "INVIA MESSAGIO <b>→</b>", ".cta span": "COSTRUIAMO QUALCOSA", ".cta .btn": "TORNA IN CIMA ↑" },
    RU: { "nav a": ["ГЛАВНАЯ", "ПРОФИЛЬ", "НАВЫКИ", "РАБОТЫ", "ОБО МНЕ", "КОНТАКТЫ"], ".kicker": "FIRDAUS YUDA // ПОРТФОЛИО", ".subtitle": "КРЕАТИВНЫЙ РАЗРАБОТЧИК", ".description": "Я создаю сайты, интерфейсы и цифровые решения с четким, функциональным и уникальным визуальным стилем.", "#checkSoundLabel": "ПРОВЕРИТЬ ЗВУК", "#voiceBtn": "🎙 ПОСЛУШАТЬ ВСТУПЛЕНИЕ", ".sound-title strong": "АУДИОСИСТЕМА", ".sound-title small": "КРЕАТИВНЫЙ ОПЫТ YUDA", "#features .section-head span": "01 / ВОЗМОЖНОСТИ", "#skills .section-head span": "02 / ИНСТРУМЕНТЫ", "#gallery .section-head span": "03 / ИЗБРАННЫЕ РАБОТЫ", ".contact-copy > span": "05 / КОНТАКТЫ", ".contact-copy p": "Есть идея или проект? Отправьте сообщение, и начнем разговор.", ".contact-form .btn": "ОТПРАВИТЬ СООБЩЕНИЕ <b>→</b>", ".cta span": "СОЗДАДИМ ЧТО-ТО ВМЕСТЕ", ".cta .btn": "ВВЕРХ ↑" }
};
const completeTranslations = {
    JA: { "#features .section-head h2": "創作のために <b>つくる。</b>", "#skills .section-head h2": "動かす<b>スキル。</b>", "#gallery .section-head h2": "記憶に残る<b>作品。</b>", "#about h2": "アイデアを<br><b>体験に。</b>", "#about p": "ウェブ、インターフェース、ゲームビジュアル、ブランディングに関心を持つクリエイティブ開発者です。", ".contact-copy h2": "アイデアを<br><b>現実に。</b>", "#name": "名前を入力", "#email": "you@email.com", "#message": "プロジェクトについて教えてください...", ".hero .btn": "作品を見る <b>→</b>", "#engineRow .audio-info strong": "集中モード", "#engineRow .audio-info small": "クリエイティブワークフロー", "#voiceRow .audio-info strong": "ユダの声", "#voiceRow .audio-info small": "個人紹介", ".stats > div:nth-child(1) small": "選択したプロジェクト", ".stats > div:nth-child(2) small": "コアスキル", ".stats > div:nth-child(3) em": "アイデア", ".stats > div:nth-child(3) small": "常に学ぶ", ".stats > div:nth-child(4) em": "目標", ".stats > div:nth-child(4) small": "影響を生み出す", "#voiceBtn2": "🎙 紹介を再生" },
    ZH: { ".hero h1": "<span>为创意而</span><strong>创造</strong>", "#features .section-head h2": "为创意而<b>创造。</b>", "#skills .section-head h2": "让技能<b>运转。</b>", "#gallery .section-head h2": "打造难忘的<b>作品。</b>", "#about h2": "让想法变成<br><b>体验。</b>", "#about p": "我是对网页、界面、游戏视觉和品牌感兴趣的创意开发者。这份作品集展示了我的过程和作品。", ".contact-copy h2": "让想法<br><b>成为现实。</b>", "#name": "你的姓名", "#email": "you@email.com", "#message": "请告诉我你的项目...", ".hero .btn": "查看我的作品 <b>→</b>", "#engineRow .audio-info strong": "专注模式", "#engineRow .audio-info small": "创意工作流程", "#voiceRow .audio-info strong": "YUDA 声音", "#voiceRow .audio-info small": "个人介绍", ".stats > div:nth-child(1) small": "精选项目", ".stats > div:nth-child(2) small": "核心技能", ".stats > div:nth-child(3) em": "想法", ".stats > div:nth-child(3) small": "持续学习", ".stats > div:nth-child(4) em": "目标", ".stats > div:nth-child(4) small": "创造影响", "#voiceBtn2": "🎙 播放介绍" },
    AR: { ".hero h1": "<span>صُنع من أجل</span><strong>الإبداع</strong>", "#features .section-head h2": "صُنع من أجل <b>الإبداع.</b>", "#skills .section-head h2": "مهارات<b>تحرك.</b>", "#gallery .section-head h2": "اجعلها <b>لا تُنسى.</b>", "#about h2": "من الأفكار إلى<br><b>التجارب.</b>", "#about p": "أنا مطور إبداعي مهتم بالويب والواجهات ومرئيات الألعاب والعلامات التجارية.", ".contact-copy h2": "لنجعلها<br><b>حقيقة.</b>", "#name": "اسمك", "#email": "you@email.com", "#message": "أخبرني عن مشروعك..." },
    ES: { ".hero h1": "<span>HECHO PARA</span><strong>CREAR</strong>", "#features .section-head h2": "HECHO PARA <b>CREAR.</b>", "#skills .section-head h2": "HABILIDADES QUE <b>MUEVEN.</b>", "#gallery .section-head h2": "HAZLO <b>MEMORABLE.</b>", "#about h2": "IDEAS EN<br><b>EXPERIENCIAS.</b>", "#about p": "Soy un desarrollador creativo interesado en la web, las interfaces, los gráficos de juegos y las marcas.", ".contact-copy h2": "HAGÁMOSLO<br><b>REAL.</b>", "#name": "Tu nombre", "#email": "you@email.com", "#message": "Cuéntame sobre tu proyecto...", ".hero .btn": "VER MI TRABAJO <b>→</b>", "#engineRow .audio-info strong": "MODO ENFOQUE", "#engineRow .audio-info small": "FLUJO CREATIVO", "#voiceRow .audio-info strong": "VOZ DE YUDA", "#voiceRow .audio-info small": "INTRODUCCIÓN PERSONAL", ".stats > div:nth-child(1) small": "PROYECTOS SELECCIONADOS", ".stats > div:nth-child(2) small": "HABILIDADES CLAVE", ".stats > div:nth-child(3) em": "IDEAS", ".stats > div:nth-child(3) small": "SIEMPRE APRENDIENDO", ".stats > div:nth-child(4) em": "META", ".stats > div:nth-child(4) small": "CREAR IMPACTO", "#voiceBtn2": "🎙 REPRODUCIR INTRO" },
    FR: { ".hero h1": "<span>CONÇU POUR</span><strong>CRÉER</strong>", "#features .section-head h2": "CONÇU POUR <b>CRÉER.</b>", "#skills .section-head h2": "DES COMPÉTENCES QUI <b>BOUGENT.</b>", "#gallery .section-head h2": "RENDEZ-LE <b>MÉMORABLE.</b>", "#about h2": "DES IDÉES AUX<br><b>EXPÉRIENCES.</b>", "#about p": "Je suis un développeur créatif intéressé par le web, les interfaces, le visuel de jeu et le branding.", ".contact-copy h2": "RENDONS-LE<br><b>RÉEL.</b>", "#name": "Votre nom", "#email": "you@email.com", "#message": "Parlez-moi de votre projet..." },
    DE: { ".hero h1": "<span>GESCHAFFEN ZUM</span><strong>ERSCHAFFEN</strong>", "#features .section-head h2": "GESCHAFFEN ZUM <b>ERSCHAFFEN.</b>", "#skills .section-head h2": "SKILLS, DIE <b>BEWEGEN.</b>", "#gallery .section-head h2": "MACH ES <b>UNVERGESSLICH.</b>", "#about h2": "IDEEN WERDEN<br><b>ERLEBNISSE.</b>", "#about p": "Ich bin ein kreativer Entwickler mit Interesse an Web, Interfaces, Spielegrafik und Branding.", ".contact-copy h2": "MACHEN WIR ES<br><b>REAL.</b>", "#name": "Dein Name", "#email": "you@email.com", "#message": "Erzähl mir von deinem Projekt..." },
    PT: { ".hero h1": "<span>FEITO PARA</span><strong>CRIAR</strong>", "#features .section-head h2": "FEITO PARA <b>CRIAR.</b>", "#skills .section-head h2": "HABILIDADES QUE <b>MOVEM.</b>", "#gallery .section-head h2": "TORNE-O <b>MEMORÁVEL.</b>", "#about h2": "IDEIAS EM<br><b>EXPERIÊNCIAS.</b>", "#about p": "Sou um desenvolvedor criativo interessado em web, interfaces, visuais de jogos e branding.", ".contact-copy h2": "VAMOS TORNAR<br><b>REAL.</b>", "#name": "Seu nome", "#email": "you@email.com", "#message": "Conte-me sobre seu projeto..." },
    IT: { ".hero h1": "<span>FATTO PER</span><strong>CREARE</strong>", "#features .section-head h2": "FATTO PER <b>CREARE.</b>", "#skills .section-head h2": "COMPETENZE CHE <b>MUOVONO.</b>", "#gallery .section-head h2": "RENDILO <b>MEMORABILE.</b>", "#about h2": "IDEE IN<br><b>ESPERIENZE.</b>", "#about p": "Sono uno sviluppatore creativo interessato a web, interfacce, grafica per giochi e branding.", ".contact-copy h2": "RENDIAMOLO<br><b>REALE.</b>", "#name": "Il tuo nome", "#email": "you@email.com", "#message": "Raccontami del tuo progetto..." },
    RU: { ".hero h1": "<span>СОЗДАНО ДЛЯ</span><strong>ТВОРЧЕСТВА</strong>", "#features .section-head h2": "СОЗДАНО ДЛЯ <b>ТВОРЧЕСТВА.</b>", "#skills .section-head h2": "НАВЫКИ, КОТОРЫЕ <b>ДВИГАЮТ.</b>", "#gallery .section-head h2": "СДЕЛАЙТЕ ЭТО <b>ЗАПОМИНАЮЩИМСЯ.</b>", "#about h2": "ИДЕИ В<br><b>ОПЫТ.</b>", "#about p": "Я креативный разработчик, интересующийся вебом, интерфейсами, игровой графикой и брендингом.", ".contact-copy h2": "СДЕЛАЕМ ЭТО<br><b>РЕАЛЬНЫМ.</b>", "#name": "Ваше имя", "#email": "you@email.com", "#message": "Расскажите о своем проекте..." }
};
const sharedLabels = {
    FR: ["VOIR MES PROJETS <b>→</b>", "MODE CONCENTRATION", "FLUX CRÉATIF", "VOIX DE YUDA", "INTRODUCTION PERSONNELLE", "PROJETS SÉLECTIONNÉS", "COMPÉTENCES CLÉS", "IDÉES", "TOUJOURS EN APPRENTISSAGE", "OBJECTIF", "CRÉER UN IMPACT", "🎙 LIRE MON INTRO"],
    DE: ["MEINE ARBEITEN <b>→</b>", "FOKUSMODUS", "KREATIVER WORKFLOW", "YUDA-STIMME", "PERSÖNLICHE INTRO", "AUSGEWÄHLTE PROJEKTE", "KERNKOMPETENZEN", "IDEEN", "IMMER LERNEN", "ZIEL", "WIRKUNG ERZEUGEN", "🎙 MEIN INTRO ABSPIELEN"],
    PT: ["EXPLORAR MEU TRABALHO <b>→</b>", "MODO FOCO", "FLUXO CRIATIVO", "VOZ DE YUDA", "INTRODUÇÃO PESSOAL", "PROJETOS SELECIONADOS", "HABILIDADES PRINCIPAIS", "IDEIAS", "SEMPRE APRENDENDO", "META", "CRIAR IMPACTO", "🎙 OUVIR MINHA INTRO"],
    IT: ["ESPLORA I MIEI LAVORI <b>→</b>", "MODALITÀ CONCENTRAZIONE", "FLUSSO CREATIVO", "VOCE DI YUDA", "INTRODUZIONE PERSONALE", "PROGETTI SELEZIONATI", "COMPETENZE CHIAVE", "IDEE", "SEMPRE IMPARANDO", "OBIETTIVO", "CREARE IMPATTO", "🎙 ASCOLTA LA MIA INTRO"],
    RU: ["ПОСМОТРЕТЬ МОИ РАБОТЫ <b>→</b>", "РЕЖИМ ФОКУСА", "ТВОРЧЕСКИЙ ПРОЦЕСС", "ГОЛОС YUDA", "ЛИЧНОЕ ВСТУПЛЕНИЕ", "ИЗБРАННЫЕ ПРОЕКТЫ", "КЛЮЧЕВЫЕ НАВЫКИ", "ИДЕИ", "ПОСТОЯННО УЧУСЬ", "ЦЕЛЬ", "СОЗДАВАТЬ ВЛИЯНИЕ", "🎙 МОЁ ВСТУПЛЕНИЕ"],
    JV: ["DELENGI KARYAKU <b>→</b>", "MODE FOKUS", "ALUR KERJA KREATIF", "SWARANE YUDA", "PITEPANG PRIBADI", "PROYEK PILIHAN", "KAWASAN UTAMA", "GAGASAN", "TETEP SINAU", "TUJUAN", "GAWE DAMPAK", "🎙 PUTAR PITEPANGKU"],
    SU: ["TINGALI KARYA ABDI <b>→</b>", "MODE FOKUS", "ALUR KERJA KREATIF", "SORANA YUDA", "BUBUKA PRIBADI", "PROYÉK PILIHAN", "KAMAMPUHAN UTAMA", "GAGASAN", "SALALU DIAJAR", "TUJUAN", "NYIEUN DAMPAK", "🎙 PUTER BUBUKA ABDI"],
    MAD: ["TINGALE KARYANA <b>→</b>", "MODE FOKUS", "ALUR KERJA KREATIF", "SORANA YUDA", "INTRO PRIBADI", "PROYEK PILIHAN", "KABISAAN UTAMA", "IDE", "TEROS AJHAR", "TUJUAN", "NGABANGUN DAMPAK", "🎙 PUTAR INTRO SENGKO’"],
    MIN: ["LIHAT KARYO AMBO <b>→</b>", "MODE FOKUS", "ALUR KERJA KREATIF", "SUARO YUDA", "PANGENALAN PRIBADI", "PROYEK PILIAHAN", "KAMAMPUAN UTAMA", "IDE", "SALALU BALAJAR", "TUJUAN", "MAMBUAT DAMPAK", "🎙 PUTAR PANGENALAN AMBO"],
    BAL: ["TINGAL KARYA TIANG <b>→</b>", "MODE FOKUS", "ALUR KARYA KREATIF", "SUARA YUDA", "INTRO PRIBADI", "PROYEK PILIHAN", "KAWAGEDAN UTAMA", "IDE", "SAYAN ANGELAJAR", "TUJUAN", "NGARYANIN DAMPAK", "🎙 PUTER INTRO TIANG"],
    BUG: ["ITA KARYA <b>→</b>", "MODE FOKUS", "ALUR KARYA KREATIF", "SUARA YUDA", "PAMBUBUKA PRIBADI", "PROYEK PILIHANG", "KAMAMPUAN UTAMA", "GAGASAN", "SALALU MAPPILAJAR", "TUJUAN", "MAPPABALASA DAMPAK", "🎙 PUTAR PAMBUBUKA"],
    ACE: ["EU LIHAT KARYA <b>→</b>", "MODE FOKUS", "ALUR KERJA KREATIF", "SUARA YUDA", "INTRO PRIBADI", "PROYEK PILIHAN", "KAMAMPUAN UTAMA", "GAGASAN", "TETAP MEU-AJAR", "TUJUAN", "PEUGOT DAMPAK", "🎙 PEUTAR INTRO LON"],
    BJN: ["LIHAT KARYA ULUN <b>→</b>", "MODE FOKUS", "ALUR KARYA KREATIF", "SUARA YUDA", "PAMBUBUKA PRIBADI", "PROYEK PILIHAN", "KAWALAN UTAMA", "GAGASAN", "SALALU BALAJAR", "TUJUAN", "MAMBUAT DAMPAK", "🎙 PUTAR PAMBUBUKA"],
    BTK: ["IDAHAI KARYA AU <b>→</b>", "MODE FOKUS", "ALUR KARYA KREATIF", "SUARA YUDA", "INTRO PRIBADI", "PROYEK PILIHAN", "KAMAMPUAN UTAMA", "GAGASAN", "SAHALA MARSIAJAR", "TUJUAN", "MAMBUAT DAMPAK", "🎙 PUTAR INTRO AU"],
    SAS: ["TELE KARYA TIANG <b>→</b>", "MODE FOKUS", "ALUR KARYA KREATIF", "SUARA YUDA", "INTRO PRIBADI", "PROYEK PILIHAN", "KAMAMPUAN UTAMA", "IDE", "SALALU BELAJAR", "TUJUAN", "NGEBANGUN DAMPAK", "🎙 PUTER INTRO TIANG"],
    MAK: ["PAKAREBA KAREBAKU <b>→</b>", "MODE FOKUS", "ALUR KARYA KREATIF", "SUARA YUDA", "PAMMULA PRIBADI", "KAREBA PILIHANG", "KAMALLAKANG UTAMA", "GAGASAN", "SALALU APPILAJAR", "TUJUAN", "AMMASSI DAMPAK", "🎙 PA’DENGAR INTROKU"],
    PLM: ["LIHAT KARYO AKU <b>→</b>", "MODE FOKUS", "ALUR KARYO KREATIF", "SUARO YUDA", "INTRO PRIBADI", "PROYEK PILIHAN", "KEMAHIRAN UTAMO", "IDE", "SELALU BELAJAR", "TUJUAN", "NGASIH DAMPAK", "🎙 PUTER INTRO AKU"]
};
const regionalTranslations = {
    JV: { "nav a": ["NGAREP", "PROFIL", "KAWASAN", "KARYA", "BABAGAN KULA", "KONTAK"], ".kicker": "FIRDAUS YUDA // PORTOFOLIO", ".subtitle": "PANGEMBANG KREATIF", ".description": "Aku ngrancang situs web, antarmuka, lan pengalaman digital kanthi tampilan sing cetha, migunani, lan nduweni ciri khas.", "#checkSoundLabel": "CEK SWARA", "#voiceBtn": "🎙 RUNGOKNA PITEPANG", "#features .section-head span": "01 / KAPrigelan", "#skills .section-head span": "02 / PIRANTI", "#gallery .section-head span": "03 / KARYA PILIHAN", ".contact-copy > span": "05 / KONTAK", ".contact-copy p": "Duwe gagasan utawa proyek sing arep diwujudake? Kirim pesen lan ayo miwiti guneman.", ".contact-form .btn": "KIRIM PESEN <b>→</b>", ".cta span": "AYO BANGUN SAKA BEBARANG", ".cta .btn": "MULIH NENG NDHUWUR ↑" },
    SU: { "nav a": ["MIMITI", "PROFIL", "KAMAMPUHAN", "KARYA", "NGEUNAAN ABDI", "KONTAK"], ".kicker": "FIRDAUS YUDA // PORTOFOLIO", ".subtitle": "PANGEMBANG KREATIF", ".description": "Abdi ngarancang situs wéb, antarmuka, sareng pangalaman digital anu jelas, fungsional, sareng gaduh ciri.", "#checkSoundLabel": "CEK SORA", "#voiceBtn": "🎙 DENGÉKEUN BUBUKA", "#features .section-head span": "01 / KAMAMPUHAN", "#skills .section-head span": "02 / PARANGKAT", "#gallery .section-head span": "03 / KARYA PILIHAN", ".contact-copy > span": "05 / KONTAK", ".contact-copy p": "Gaduh ide atanapi proyék? Kirim pesen sareng hayu ngamimitian obrolan.", ".contact-form .btn": "KIRIM PESEN <b>→</b>", ".cta span": "HAYU NGABANGUN HIJI HAL", ".cta .btn": "BALIK KA LUHUR ↑" },
    MAD: { "nav a": ["BHUḌU", "PROFIL", "KABISAAN", "KARYA", "TENTANG SENGKO’", "KONTAK"], ".kicker": "FIRDAUS YUDA // PORTOFOLIO", ".subtitle": "PANGEMBANG KREATIF", ".description": "Sengko’ ngrancang situs, antarmuka, ben pangalaman digital se jelas, fungsional, ben khas.", "#checkSoundLabel": "CEK SORA", "#voiceBtn": "🎙 DENGEH INTRO", "#features .section-head span": "01 / KABISAAN", "#skills .section-head span": "02 / PARABOT", "#gallery .section-head span": "03 / KARYA PILIHAN", ".contact-copy > span": "05 / KONTAK", ".contact-copy p": "Njek duwe ide atawa proyek? Kirim pesen ben ayo mulai cecèr.", ".contact-form .btn": "KIRIM PESEN <b>→</b>", ".cta span": "AYO NGABANGUN SESUATU", ".cta .btn": "BALIK KA ATAS ↑" },
    MIN: { "nav a": ["MUKA", "PROFIL", "KAMAMPUAN", "KARYO", "TENTANG AMBO", "HUBUNGI"], ".kicker": "FIRDAUS YUDA // PORTOFOLIO", ".subtitle": "PANGEMBANG KREATIF", ".description": "Ambo marancang situs, antarmuko, jo pengalaman digital nan tajam, baguno, jo punyo ciri khas.", "#checkSoundLabel": "CEK SUARO", "#voiceBtn": "🎙 DANGA PANGENALAN", "#features .section-head span": "01 / KAMAMPUAN", "#skills .section-head span": "02 / ALAT", "#gallery .section-head span": "03 / KARYO PILIAHAN", ".contact-copy > span": "05 / HUBUNGI", ".contact-copy p": "Punyo ide atau proyek nan ingin diwujudkan? Kirim pasan dan mari mulai barundiang.", ".contact-form .btn": "KIRIM PESAN <b>→</b>", ".cta span": "MARI MAMBANGUN BASAMO", ".cta .btn": "BALIak KA ATEH ↑" },
    BAL: { "nav a": ["PURWA", "PROFIL", "KAWAGEDAN", "KARYA", "INDIK TIANG", "KONTAK"], ".kicker": "FIRDAUS YUDA // PORTOFOLIO", ".subtitle": "PANGEMBANG KREATIF", ".description": "Tiang ngrancang situs web, antarmuka, miwah pangalaman digital sane becik, fungsional, miwah madue ciri khas.", "#checkSoundLabel": "CEK SUARA", "#voiceBtn": "🎙 RENGKANGIN INTRO", "#features .section-head span": "01 / KAWAGEDAN", "#skills .section-head span": "02 / PIRANTI", "#gallery .section-head span": "03 / KARYA PILIHAN", ".contact-copy > span": "05 / KONTAK", ".contact-copy p": "Wenten ide utawi proyek sane jagi diwujudang? Kirim pesen miwah ngamolihang pawarah.", ".contact-form .btn": "KIRIM PESEN <b>→</b>", ".cta span": "AYO NGARYANIN SAMI", ".cta .btn": "MANTUK RING DUUR ↑" },
    BUG: { "nav a": ["BOLA’", "PROFIL", "KAMAMPUAN", "KARYA", "TENTANG AGA’", "KONTAK"], ".kicker": "FIRDAUS YUDA // PORTOFOLIO", ".subtitle": "PANGEMBANG KREATIF", ".description": "Iya mambangun situs, antarmuka, wan pengalaman digital nang tajam, beguna, wan bapandirian.", "#checkSoundLabel": "CEK SUARA", "#voiceBtn": "🎙 DANGAR PAMBUBUKAAN", "#features .section-head span": "01 / KAMAMPUAN", "#skills .section-head span": "02 / PARABOT", "#gallery .section-head span": "03 / KARYA PILIHAN", ".contact-copy > span": "05 / KONTAK", ".contact-copy p": "Ada gagasan atawa proyek nang handak diwujudakan? Kirim pesan wan mulai bapandir.", ".contact-form .btn": "KIRIM PESAN <b>→</b>", ".cta span": "AYO MAMBUAT BARSAMA", ".cta .btn": "BALI KA ATAS ↑" },
    ACE: { "nav a": ["AWAI", "PROFIL", "KAMAMPUAN", "KARYA", "TENTANG LON", "KONTAK"], ".kicker": "FIRDAUS YUDA // PORTOFOLIO", ".subtitle": "PANGEMBANG KREATIF", ".description": "Lon peugot situs, antarmuka, ngon pengalaman digital nyang tajam, fungsional, ngon meu ciri khas.", "#checkSoundLabel": "CEK SUARA", "#voiceBtn": "🎙 DENGOEH INTRO", "#features .section-head span": "01 / KAMAMPUAN", "#skills .section-head span": "02 / ALAT", "#gallery .section-head span": "03 / KARYA PILIHAN", ".contact-copy > span": "05 / KONTAK", ".contact-copy p": "Na ide atawa proyek nyang meuhareum diwujudkan? Kirim pesan ngon tajak mula peugah.", ".contact-form .btn": "KIRIM PESAN <b>→</b>", ".cta span": "TAJAK PEUGOT SABOH", ".cta .btn": "JAK KEU ATAS ↑" },
    BJN: { "nav a": ["AWAL", "PROFIL", "KAWALAN", "KARYA", "TENTANG ULUN", "KONTAK"], ".kicker": "FIRDAUS YUDA // PORTOFOLIO", ".subtitle": "PANGEMBANG KREATIF", ".description": "Ulun marancang situs, antarmuka, wan pengalaman digital nang tajam, fungsional, wan bapandirian.", "#checkSoundLabel": "CEK SUARA", "#voiceBtn": "🎙 DANGAR PAMBUBUKA", "#features .section-head span": "01 / KAWALAN", "#skills .section-head span": "02 / PARABOT", "#gallery .section-head span": "03 / KARYA PILIHAN", ".contact-copy > span": "05 / KONTAK", ".contact-copy p": "Baisi gagasan atawa proyek? Kirim pesan wan ayo mulai bapandir.", ".contact-form .btn": "KIRIM PESAN <b>→</b>", ".cta span": "AYO MAMBANGUN BASAMA", ".cta .btn": "BALIK KA ATAS ↑" },
    BTK: { "nav a": ["MUDA", "PROFIL", "KAMAMPUAN", "KARYA", "TENTANG AU", "KONTAK"], ".kicker": "FIRDAUS YUDA // PORTOFOLIO", ".subtitle": "PANGEMBANG KREATIF", ".description": "Au mambangun situs, antarmuka, dohot pengalaman digital na jelas, fungsional, dohot maraha khas.", "#checkSoundLabel": "CEK SUARA", "#voiceBtn": "🎙 DANGAR INTRO", "#features .section-head span": "01 / KAMAMPUAN", "#skills .section-head span": "02 / ALAT", "#gallery .section-head span": "03 / KARYA PILIHAN", ".contact-copy > span": "05 / KONTAK", ".contact-copy p": "Adong ide manang proyek? Kirim pesan dohot mulai marbincang.", ".contact-form .btn": "KIRIM PESAN <b>→</b>", ".cta span": "MARI MAMBANGUN BARENG", ".cta .btn": "MULAK TU ATAS ↑" },
    SAS: { "nav a": ["MULA", "PROFIL", "KAMAMPUAN", "KARYA", "TENTANG TIANG", "KONTAK"], ".kicker": "FIRDAUS YUDA // PORTOFOLIO", ".subtitle": "PANGEMBANG KREATIF", ".description": "Tiang ngrancang situs, antarmuka, lan pengalaman digital siq jelas, fungsional, lan pade ciri.", "#checkSoundLabel": "CEK SUARA", "#voiceBtn": "🎙 DENGEQ INTRO", "#features .section-head span": "01 / KAMAMPUAN", "#skills .section-head span": "02 / PIRANTI", "#gallery .section-head span": "03 / KARYA PILIHAN", ".contact-copy > span": "05 / KONTAK", ".contact-copy p": "Ndek te ide atawa proyek? Kirim pesen lan mulai besemeton.", ".contact-form .btn": "KIRIM PESEN <b>→</b>", ".cta span": "AYO NGEBANGUN BARENG", ".cta .btn": "BALIK TE ATAS ↑" },
    MAK: { "nav a": ["PAMMULA", "PROFIL", "KAMALLAKANG", "KAREBA", "RITTA", "KONTAK"], ".kicker": "FIRDAUS YUDA // PORTOFOLIO", ".subtitle": "PANGEMBANG KREATIF", ".description": "Nak kabbua situs, antarmuka, na pengalaman digital iya niak, fungsional, na nia cirinna.", "#checkSoundLabel": "PA’NGECEK SUARA", "#voiceBtn": "🎙 PA’DENGAR INTRO", "#features .section-head span": "01 / KAMALLAKANG", "#skills .section-head span": "02 / PARANGKANG", "#gallery .section-head span": "03 / KAREBA PILIHANG", ".contact-copy > span": "05 / KONTAK", ".contact-copy p": "Nia gagasan atawa proyek? Kirim pesang na ta’ mulai carita.", ".contact-form .btn": "KIRIM PESANG <b>→</b>", ".cta span": "AYO’ TA’ KABBUI", ".cta .btn": "BALIK RI BAWAH ↑" },
    PLM: { "nav a": ["MUKAK", "PROFIL", "KEMAHIRAN", "KARYO", "TENTANG AKU", "KONTAK"], ".kicker": "FIRDAUS YUDA // PORTOFOLIO", ".subtitle": "PENGEMBANG KREATIF", ".description": "Aku ngerancang situs, antarmuko, dan pengalaman digital yang tajem, beguno, dan punyo ciri.", "#checkSoundLabel": "CEK SUARO", "#voiceBtn": "🎙 DENGER INTRO", "#features .section-head span": "01 / KEMAHIRAN", "#skills .section-head span": "02 / ALAT", "#gallery .section-head span": "03 / KARYO PILIHAN", ".contact-copy > span": "05 / KONTAK", ".contact-copy p": "Punya ide atau proyek? Kirim pesan dan ayok mulai ngobrol.", ".contact-form .btn": "KIRIM PESAN <b>→</b>", ".cta span": "AYOK BANGUN SESUATU", ".cta .btn": "BALIK KE ATAS ↑" }
};
const languageExtras = {
    JA: ["🎙 紹介を再生", "アイデアを<br><b>体験に。</b>", "私はウェブ、インターフェース、ゲームビジュアル、ブランディングに関心を持つクリエイティブ開発者です。", "アイデアを<br><b>現実に。</b>", "名前を入力", "you@email.com", "プロジェクトについて教えてください..."],
    ZH: ["🎙 播放介绍", "将想法变成<br><b>体验。</b>", "我是对网页、界面、游戏视觉和品牌感兴趣的创意开发者。这份作品集展示了我的创作过程和成果。", "让想法<br><b>成为现实。</b>", "你的姓名", "you@email.com", "请告诉我你的项目..."] ,
    AR: ["🎙 تشغيل المقدمة", "من الأفكار إلى<br><b>التجارب.</b>", "أنا مطور إبداعي مهتم بالويب والواجهات والمرئيات الخاصة بالألعاب والعلامات التجارية. يعرض هذا الملف أعمالي وطريقة بنائها.", "لنجعلها<br><b>حقيقة.</b>", "اسمك", "أخبرني عن مشروعك..."],
    ES: ["🎙 REPRODUCIR INTRO", "DE IDEAS A<br><b>EXPERIENCIAS.</b>", "Soy un desarrollador creativo interesado en la web, las interfaces, los gráficos de juegos y las marcas. Este portafolio muestra mi proceso y mi trabajo.", "HAGÁMOSLO<br><b>REAL.</b>", "Tu nombre", "Cuéntame sobre tu proyecto..."],
    FR: ["🎙 LIRE L'INTRO", "DES IDÉES AUX<br><b>EXPÉRIENCES.</b>", "Je suis un développeur créatif intéressé par le web, les interfaces, le visuel de jeu et le branding. Ce portfolio présente mon processus et mes réalisations.", "RENDONS-LE<br><b>RÉEL.</b>", "Votre nom", "Parlez-moi de votre projet..."],
    DE: ["🎙 INTRO ABSPIELEN", "IDEEN WERDEN<br><b>ERLEBNISSE.</b>", "Ich bin ein kreativer Entwickler mit Interesse an Web, Interfaces, Spielegrafik und Branding. Dieses Portfolio zeigt meinen Prozess und meine Arbeiten.", "MACHEN WIR ES<br><b>REAL.</b>", "Dein Name", "Erzähl mir von deinem Projekt..."],
    PT: ["🎙 REPRODUZIR INTRO", "IDEIAS EM<br><b>EXPERIÊNCIAS.</b>", "Sou um desenvolvedor criativo interessado em web, interfaces, visuais de jogos e branding. Este portfólio mostra meu processo e meus trabalhos.", "VAMOS TORNAR<br><b>REAL.</b>", "Seu nome", "Conte-me sobre seu projeto..."],
    IT: ["🎙 RIPRODUCI INTRO", "IDEE IN<br><b>ESPERIENZE.</b>", "Sono uno sviluppatore creativo interessato a web, interfacce, grafica per giochi e branding. Questo portfolio mostra il mio processo e i miei lavori.", "RENDIAMOLO<br><b>REALE.</b>", "Il tuo nome", "Raccontami del tuo progetto..."],
    RU: ["🎙 ВОСПРОИЗВЕСТИ ВСТУПЛЕНИЕ", "ИДЕИ В<br><b>ОПЫТ.</b>", "Я креативный разработчик, интересующийся вебом, интерфейсами, игровой графикой и брендингом. В этом портфолио представлены мои работы и процесс.", "СДЕЛАЕМ ЭТО<br><b>РЕАЛЬНЫМ.</b>", "Ваше имя", "Расскажите о своем проекте..."],
    JV: ["🎙 PUTAR PITEPANG", "GAGASAN DADI<br><b>PANGALAMAN.</b>", "Aku pangembang kreatif sing seneng web, antarmuka, visual game, lan branding. Portofolio iki nuduhake proses lan karya sing tak gawe.", "AYO DADI<br><b>NYATA.</b>", "Jenengmu", "Critakna proyekmu..."],
    SU: ["🎙 PUTER BUBUKA", "GAGASAN JADI<br><b>PANGALAMAN.</b>", "Abdi pangembang kreatif anu resep kana wéb, antarmuka, visual kaulinan, sareng branding. Portofolio ieu nembongkeun prosés sareng karya abdi.", "HAYU JADI<br><b>NYATA.</b>", "Ngaran anjeun", "Caritakeun proyék anjeun..."],
    MAD: ["🎙 PARENGKEN INTRO", "IDE JADI<br><b>PANGALAMAN.</b>", "Sengko’ pangembang kreatif se tertarik ka web, antarmuka, visual game, ben branding. Portofolio nika’ nunjukaghi proses ben karya sengko’.", "AYO JADI<br><b>NYATA.</b>", "Ngaran ba’na", "Caritakaghi proyek ba’na..."],
    MIN: ["🎙 PUTAR PANGENALAN", "IDE JADI<br><b>PANGALAMAN.</b>", "Ambo pangembang kreatif nan suko web, antarmuko, visual game, jo branding. Portofolio ko manampakkan proses jo karyo ambo.", "MARI JADIKAN<br><b>NYATA.</b>", "Namonyo", "Ceritokan proyek ang..."],
    BAL: ["🎙 PUTER INTRO", "IDE DADOS<br><b>PANGALAMAN.</b>", "Tiang pangembang kreatif sane seneng ring web, antarmuka, visual game, miwah branding. Portofolio puniki nyarengin proses miwah karya tiang.", "AYO DADOS<br><b>NYATA.</b>", "Wasta ragane", "Ceritayang indik proyek ragane..."],
    BUG: ["🎙 PUTAR PAMBUBUKA", "GAGASAN JADI<br><b>PANGALAMAN.</b>", "Iya pangembang kreatif nang suka situs, antarmuka, visual game, wan branding. Portofolio ini manunjukakan proses wan karya iya.", "AYO JADI<br><b>NYATA.</b>", "Ngaran pian", "Caritakan proyek pian..."],
    ACE: ["🎙 PEUTAR INTRO", "GAGASAN JADI<br><b>PENGALAMAN.</b>", "Lon pangembang kreatif nyang tertarik bak web, antarmuka, visual game, ngon branding. Portofolio nyoe meupeugot proses ngon karya lon.", "TAJAK JADI<br><b>NYATA.</b>", "Nan droeneuh", "Peugah bak lon proyek droeneuh..."],
    BJN: ["🎙 PUTAR PAMBUBUKA", "GAGASAN JADI<br><b>PANGALAMAN.</b>", "Ulun pangembang kreatif nang katuju situs, antarmuka, visual game, wan branding. Portofolio ini manunjukakan proses wan karya ulun.", "AYO JADI<br><b>NYATA.</b>", "Ngaran pian", "Caritakan proyek pian..."],
    BTK: ["🎙 PUTAR INTRO", "GAGASAN JADI<br><b>PANGALAMAN.</b>", "Au pangembang kreatif na manatap web, antarmuka, visual game, dohot branding. Portofolio on manonggohon proses dohot karya au.", "AYO JADI<br><b>NYATA.</b>", "Goar hamu", "Patorang proyek hamu..."],
    SAS: ["🎙 PUTER INTRO", "IDE DADI<br><b>PANGALAMAN.</b>", "Tiang pangembang kreatif siq seneng web, antarmuka, visual game, lan branding. Portofolio niki nyeritayang proses lan karya tiang.", "AYO DADI<br><b>NYATA.</b>", "Naran side", "Ceritayang proyek side..."],
    MAK: ["🎙 PA’DENGAR INTRO", "GAGASAN JADI<br><b>PANGALAMAN.</b>", "Nak pangembang kreatif na antusias ki web, antarmuka, visual game, na branding. Portofolio iyae mappakatau proses na kabbua.", "AYO JADI<br><b>NYATA.</b>", "Arengnu", "Pauwangngi proyeknu..."],
    PLM: ["🎙 PUTER INTRO", "IDE JADI<br><b>PENGALAMAN.</b>", "Aku pengembang kreatif yang seneng web, antarmuko, visual game, dan branding. Portofolio ini nunjukke proses dan karyo aku.", "AYOK JADI<br><b>NYATA.</b>", "Namo kamu", "Ceritoke proyek kamu..."]
};
const translationCoverage = {
    EN: ["STARTING ENGINE...", "SKILLS THAT <b>MOVE.</b>", "MAKE IT <b>MEMORABLE.</b>", "WEB APP", "EDUCATION", "BUSINESS APP", "TYPESCRIPT APP", "WEATHER, BIO &amp; INDONESIAN HISTORY", "HISTORY &amp; KNOWLEDGE", "SIMPLE CASHIER APP", "WEATHER API &amp; API KEY", "CREATIVE<br>DEVELOPER"],
    ID: ["MEMULAI MESIN...", "KEAHLIAN YANG <b>BERGERAK.</b>", "JADIKAN <b>BERKESAN.</b>", "APLIKASI WEB", "PENDIDIKAN", "APLIKASI BISNIS", "APLIKASI TYPESCRIPT", "CUACA, BIODATA &amp; SEJARAH INDONESIA", "SEJARAH &amp; PENGETAHUAN", "APLIKASI KASIR SEDERHANA", "API CUACA &amp; KUNCI API", "PENGEMBANG<br>KREATIF"],
    KO: ["시동 중...", "움직이는 <b>기술.</b>", "기억에 남는 <b>작품.</b>", "웹 앱", "교육", "비즈니스 앱", "타입스크립트 앱", "날씨, 프로필 및 인도네시아 역사", "역사 및 지식", "간단한 계산원 앱", "날씨 API 및 API 키", "크리에이티브<br>개발자"],
    JA: ["起動中...", "動かす<b>スキル。</b>", "記憶に残る<b>作品。</b>", "ウェブアプリ", "教育", "ビジネスアプリ", "TypeScriptアプリ", "天気、プロフィールとインドネシア史", "歴史と知識", "簡易レジアプリ", "天気APIとAPIキー", "クリエイティブ<br>開発者"],
    ZH: ["正在启动...", "让技能<b>运转。</b>", "打造难忘的<b>作品。</b>", "网页应用", "教育", "商业应用", "TypeScript 应用", "天气、简介与印度尼西亚历史", "历史与知识", "简易收银应用", "天气 API 与 API 密钥", "创意<br>开发者"],
    AR: ["جارٍ التشغيل...", "مهارات<b>تحرك.</b>", "اجعلها <b>لا تُنسى.</b>", "تطبيق ويب", "تعليم", "تطبيق أعمال", "تطبيق TypeScript", "الطقس والملف الشخصي وتاريخ إندونيسيا", "التاريخ والمعرفة", "تطبيق أمين صندوق بسيط", "واجهة الطقس ومفتاح API", "مطور<br>إبداعي"],
    ES: ["INICIANDO MOTOR...", "HABILIDADES QUE <b>MUEVEN.</b>", "HAZLO <b>MEMORABLE.</b>", "APLICACIÓN WEB", "EDUCACIÓN", "APLICACIÓN DE NEGOCIO", "APLICACIÓN TYPESCRIPT", "CLIMA, PERFIL E HISTORIA DE INDONESIA", "HISTORIA Y CONOCIMIENTO", "APP DE CAJA SENCILLA", "API DEL TIEMPO Y CLAVE API", "DESARROLLADOR<br>CREATIVO"],
    FR: ["DÉMARRAGE DU MOTEUR...", "DES COMPÉTENCES QUI <b>BOUGENT.</b>", "RENDEZ-LE <b>MÉMORABLE.</b>", "APPLICATION WEB", "ÉDUCATION", "APPLICATION MÉTIER", "APPLICATION TYPESCRIPT", "MÉTÉO, PROFIL ET HISTOIRE DE L'INDONÉSIE", "HISTOIRE ET CONNAISSANCES", "APPLICATION DE CAISSE SIMPLE", "API MÉTÉO ET CLÉ API", "DÉVELOPPEUR<br>CRÉATIF"],
    DE: ["MOTOR WIRD GESTARTET...", "SKILLS, DIE <b>BEWEGEN.</b>", "MACH ES <b>UNVERGESSLICH.</b>", "WEB-APP", "BILDUNG", "BUSINESS-APP", "TYPESCRIPT-APP", "WETTER, PROFIL UND INDONESISCHE GESCHICHTE", "GESCHICHTE UND WISSEN", "EINFACHE KASSEN-APP", "WETTER-API UND API-SCHLÜSSEL", "KREATIVER<br>ENTWICKLER"],
    PT: ["INICIANDO MOTOR...", "HABILIDADES QUE <b>MOVEM.</b>", "TORNE-O <b>MEMORÁVEL.</b>", "APLICAÇÃO WEB", "EDUCAÇÃO", "APLICAÇÃO EMPRESARIAL", "APLICAÇÃO TYPESCRIPT", "CLIMA, PERFIL E HISTÓRIA DA INDONÉSIA", "HISTÓRIA E CONHECIMENTO", "APP DE CAIXA SIMPLES", "API DE CLIMA E CHAVE API", "DESENVOLVEDOR<br>CRIATIVO"],
    IT: ["AVVIO DEL MOTORE...", "COMPETENZE CHE <b>MUOVONO.</b>", "RENDILO <b>MEMORABILE.</b>", "APP WEB", "ISTRUZIONE", "APP AZIENDALE", "APP TYPESCRIPT", "METEO, PROFILO E STORIA DELL'INDONESIA", "STORIA E CONOSCENZA", "APP CASSA SEMPLICE", "API METEO E CHIAVE API", "SVILUPPATORE<br>CREATIVO"],
    RU: ["ЗАПУСК ДВИГАТЕЛЯ...", "НАВЫКИ, КОТОРЫЕ <b>ДВИГАЮТ.</b>", "СДЕЛАЙТЕ ЭТО <b>ЗАПОМИНАЮЩИМСЯ.</b>", "ВЕБ-ПРИЛОЖЕНИЕ", "ОБРАЗОВАНИЕ", "БИЗНЕС-ПРИЛОЖЕНИЕ", "ПРИЛОЖЕНИЕ TYPESCRIPT", "ПОГОДА, ПРОФИЛЬ И ИСТОРИЯ ИНДОНЕЗИИ", "ИСТОРИЯ И ЗНАНИЯ", "ПРОСТОЕ КАССОВОЕ ПРИЛОЖЕНИЕ", "API ПОГОДЫ И КЛЮЧ API", "КРЕАТИВНЫЙ<br>РАЗРАБОТЧИК"]
};
const coverageSelectors = [".loader p", "#skills .section-head h2", "#gallery .section-head h2", ".project-nexora .project-overlay span", ".project-history .project-overlay span", ".project-pos .project-overlay span", ".project-weather .project-overlay span", ".project-nexora .project-overlay small", ".project-history .project-overlay small", ".project-pos .project-overlay small", ".project-weather .project-overlay small", ".profile-frame small"];
const coverageExtras = {
    ".cards article:nth-child(1) h3": { EN: "WEB DEVELOPMENT", ID: "PENGEMBANGAN WEB", KO: "웹 개발" },
    ".cards article:nth-child(2) h3": { EN: "UI DESIGN", ID: "DESAIN UI", KO: "UI 디자인" },
    ".cards article:nth-child(3) h3": { EN: "VISUAL DIRECTION", ID: "ARAH VISUAL", KO: "비주얼 디렉션" },
    ".cards article:nth-child(4) h3": { EN: "PROBLEM SOLVING", ID: "PEMECAHAN MASALAH", KO: "문제 해결" },
    ".cards article:nth-child(1) p": { EN: "Building responsive websites with HTML, CSS, and JavaScript.", ID: "Membangun website responsif dengan HTML, CSS, dan JavaScript.", KO: "HTML, CSS, JavaScript로 반응형 웹사이트를 만듭니다." },
    ".cards article:nth-child(2) p": { EN: "Designing clear, modern, and easy-to-use interfaces.", ID: "Merancang interface yang jelas, modern, dan mudah digunakan.", KO: "명확하고 현대적이며 사용하기 쉬운 인터페이스를 디자인합니다." },
    ".cards article:nth-child(3) p": { EN: "Turning color, typography, and composition into visual identity.", ID: "Mengolah warna, tipografi, dan komposisi menjadi identitas visual.", KO: "색상, 타이포그래피, 구성을 시각적 아이덴티티로 발전시킵니다." },
    ".cards article:nth-child(4) p": { EN: "Turning needs and ideas into real digital solutions.", ID: "Mengubah kebutuhan dan ide menjadi solusi digital yang nyata.", KO: "필요와 아이디어를 실제 디지털 솔루션으로 바꿉니다." },
    "[data-label='name']": { EN: "NAME", ID: "NAMA", KO: "이름" },
    "[data-label='email']": { EN: "EMAIL", ID: "EMAIL", KO: "이메일" },
    "[data-label='message']": { EN: "MESSAGE", ID: "PESAN", KO: "메시지" },
    "footer small": { EN: "© 2026 FIRDAUS YUDA PORTFOLIO", ID: "© 2026 PORTOFOLIO FIRDAUS YUDA", KO: "© 2026 피르다우스 유다 포트폴리오" },
    "footer > a": { EN: "TOP ↑", ID: "ATAS ↑", KO: "맨 위 ↑" }
};
const originalContent = new Map();
const originalPlaceholders = new Map();
const allTranslationSelectors = new Set([...Object.keys(translations), ...Object.keys(koreanTranslations), ...Object.keys(additionalTranslations).flatMap((language) => Object.keys(additionalTranslations[language])), ...Object.keys(regionalTranslations).flatMap((language) => Object.keys(regionalTranslations[language]))]);
allTranslationSelectors.forEach((selector) => document.querySelectorAll(selector).forEach((element) => {
    originalContent.set(element, element.innerHTML);
    originalPlaceholders.set(element, element.placeholder);
}));
let currentLanguage = "EN";
function setLanguage(language) {
    currentLanguage = language;
    const languageCodes = { EN: "en", ID: "id", JA: "ja", KO: "ko", ZH: "zh", AR: "ar", ES: "es", FR: "fr", DE: "de", PT: "pt", IT: "it", RU: "ru", JV: "jv", SU: "su", MAD: "mad", MIN: "min", BAL: "ban", BUG: "bug", ACE: "ace", BJN: "bjn", BTK: "bbc", SAS: "sas", MAK: "mak", PLM: "plm" };
    document.documentElement.lang = languageCodes[language] || "en";
    const activeTranslations = language === "KO" ? koreanTranslations : { ...(additionalTranslations[language] || regionalTranslations[language] || translations), ...(completeTranslations[language] || {}) };
    originalContent.forEach((content, element) => { element.innerHTML = content; });
    originalPlaceholders.forEach((placeholder, element) => { element.placeholder = placeholder; });
    Object.entries(activeTranslations).forEach(([selector, values]) => {
        document.querySelectorAll(selector).forEach((element, index) => {
            const value = values[language] || values.EN || values;
            const text = selector === "nav a" ? value[index] : (Array.isArray(value) ? value[language === "ID" ? 1 : 0] : value);
            if (selector === "#name" || selector === "#email" || selector === "#message") element.placeholder = text;
            else element.innerHTML = text;
        });
    });
    const extra = languageExtras[language];
    if (extra) {
        $("#voiceBtn2").innerHTML = extra[0];
        $("#about h2").innerHTML = extra[1];
        $("#about p").innerHTML = extra[2];
        $(".contact-copy h2").innerHTML = extra[3];
        $("#name").placeholder = extra[4];
        $("#email").placeholder = extra.length === 7 ? extra[5] : "you@email.com";
        $("#message").placeholder = extra.length === 7 ? extra[6] : extra[5];
    }
    const labels = sharedLabels[language];
    if (labels) {
        $(".hero .btn").innerHTML = labels[0];
        $("#engineRow .audio-info strong").innerHTML = labels[1];
        $("#engineRow .audio-info small").innerHTML = labels[2];
        $("#voiceRow .audio-info strong").innerHTML = labels[3];
        $("#voiceRow .audio-info small").innerHTML = labels[4];
        $(".stats > div:nth-child(1) small").innerHTML = labels[5];
        $(".stats > div:nth-child(2) small").innerHTML = labels[6];
        $(".stats > div:nth-child(3) em").innerHTML = labels[7];
        $(".stats > div:nth-child(3) small").innerHTML = labels[8];
        $(".stats > div:nth-child(4) em").innerHTML = labels[9];
        $(".stats > div:nth-child(4) small").innerHTML = labels[10];
        $("#voiceBtn2").innerHTML = labels[11];
    }
    const coverage = translationCoverage[language] || translationCoverage.ID;
    coverageSelectors.forEach((selector, index) => {
        document.querySelectorAll(selector).forEach((element) => { element.innerHTML = coverage[index]; });
    });
    Object.entries(coverageExtras).forEach(([selector, values]) => {
        document.querySelectorAll(selector).forEach((element) => { element.innerHTML = values[language] || values.ID; });
    });
    langButton.innerHTML = `${language}&#8964;`;
}
langButton.addEventListener("click", () => {
    const isOpen = languageMenu.classList.toggle("open");
    langButton.setAttribute("aria-expanded", String(isOpen));
});
languageMenu.querySelectorAll("[data-language]").forEach((option) => option.addEventListener("click", () => {
    setLanguage(option.dataset.language);
    languageMenu.classList.remove("open");
    langButton.setAttribute("aria-expanded", "false");
}));
document.addEventListener("click", (event) => {
    if (!event.target.closest(".language-switcher")) {
        languageMenu.classList.remove("open");
        langButton.setAttribute("aria-expanded", "false");
    }
});
setLanguage("EN");

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav a");
window.addEventListener("scroll", () => {
    let currentSection = "home";
    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 200) currentSection = section.id;
    });
    navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`));
}, { passive: true });

const engineAudio = $("#checkSound");
const engineButton = $("#checkSoundBtn");
const playEngine = $("#playEngine");
const engineRow = $("#engineRow");
const engineIcon = $("#checkSoundIcon");
const engineTime = $("#engineTime");
const volume = $("#volume");
const volumeValue = $("#volumeValue");
engineAudio.volume = Number(volume.value);

function setEngineState(isPlaying) {
    playEngine.textContent = isPlaying ? "Ⅱ" : "▶";
    playEngine.classList.toggle("playing", isPlaying);
    engineRow.classList.toggle("active", isPlaying);
    engineIcon.textContent = isPlaying ? "⏸" : "🔊";
    engineButton.classList.toggle("playing", isPlaying);
}
function toggleEngine() {
    if (!engineAudio.paused) {
        engineAudio.pause();
        setEngineState(false);
        return;
    }
    engineAudio.play().then(() => setEngineState(true)).catch(() => {
        alert("File suara belum ditemukan.\n\nPastikan file cbr250rr-check-sound.mp3 berada di folder portfolio.");
    });
}
engineButton.addEventListener("click", toggleEngine);
playEngine.addEventListener("click", toggleEngine);
engineAudio.addEventListener("timeupdate", () => {
    const minutes = Math.floor(engineAudio.currentTime / 60).toString().padStart(2, "0");
    const seconds = Math.floor(engineAudio.currentTime % 60).toString().padStart(2, "0");
    engineTime.textContent = `${minutes}:${seconds}`;
});
engineAudio.addEventListener("ended", () => setEngineState(false));
volume.addEventListener("input", () => {
    const currentVolume = Number(volume.value);
    engineAudio.volume = currentVolume;
    volumeValue.textContent = `${Math.round(currentVolume * 100)}%`;
});

const voiceTexts = {
    EN: "Hello, I am Firdaus Yuda Permana. I build digital experiences through creative development, interface design, and visual direction.",
    ID: "Halo, saya Firdaus Yuda Permana. Saya membangun pengalaman digital melalui pengembangan kreatif, desain interface, dan arah visual.",
    KO: "안녕하세요, 저는 피르다우스 유다 퍼르마나입니다. 크리에이티브 개발과 인터페이스 디자인, 비주얼 디렉션으로 디지털 경험을 만듭니다.",
    JA: "こんにちは、ファーダウス ユダです。クリエイティブ開発、インターフェースデザイン、ビジュアルディレクションでデジタル体験を作ります。",
    ZH: "你好，我是 Firdaus Yuda。我通过创意开发、界面设计和视觉指导打造数字体验。",
    AR: "مرحباً، أنا فيرداوس يودا. أصنع تجارب رقمية من خلال التطوير الإبداعي وتصميم الواجهات والتوجيه البصري.",
    ES: "Hola, soy Firdaus Yuda. Creo experiencias digitales mediante desarrollo creativo, diseño de interfaces y dirección visual.",
    FR: "Bonjour, je suis Firdaus Yuda. Je crée des expériences numériques grâce au développement créatif, au design d'interfaces et à la direction visuelle.",
    DE: "Hallo, ich bin Firdaus Yuda. Ich entwickle digitale Erlebnisse durch kreative Entwicklung, Interface-Design und visuelle Gestaltung.",
    PT: "Olá, sou Firdaus Yuda. Crio experiências digitais por meio de desenvolvimento criativo, design de interfaces e direção visual.",
    IT: "Ciao, sono Firdaus Yuda. Creo esperienze digitali attraverso sviluppo creativo, design delle interfacce e direzione visiva.",
    RU: "Здравствуйте, я Firdaus Yuda. Я создаю цифровые впечатления с помощью креативной разработки, дизайна интерфейсов и визуального направления."
};
Object.assign(voiceTexts, {
    JV: "Halo, aku Firdaus Yuda. Aku nggawe pengalaman digital liwat pangembangan kreatif, desain antarmuka, lan arah visual.",
    SU: "Halo, abdi Firdaus Yuda. Abdi ngawangun pangalaman digital ngaliwatan pamekaran kreatif, desain antarmuka, sareng arah visual.",
    MAD: "Halo, sengko’ Firdaus Yuda. Sengko’ ngabangun pengalaman digital lewat pangembangan kreatif, desain antarmuka, ben arah visual.",
    MIN: "Halo, ambo Firdaus Yuda. Ambo mambangun pengalaman digital melalui pangembangan kreatif, desain antarmuko, jo arah visual.",
    BAL: "Om swastiastu, tiang Firdaus Yuda. Tiang ngrancang pengalaman digital nganggé pangembangan kreatif, desain antarmuka, miwah arah visual.",
    BUG: "Halo, iya Firdaus Yuda. Iya mambangun pengalaman digital lewat pangembangan kreatif, desain antarmuka, wan arah visual.",
    ACE: "Salam, lon Firdaus Yuda. Lon peugot pengalaman digital ngon pangembangan kreatif, desain antarmuka, ngon arah visual.",
    BJN: "Halo, ulun Firdaus Yuda. Ulun mambangun pengalaman digital lewat pangembangan kreatif, desain antarmuka, wan arah visual.",
    BTK: "Horas, au Firdaus Yuda. Au mambangun pengalaman digital marhite pangembangan kreatif, desain antarmuka, dohot arah visual.",
    SAS: "Halo, tiang Firdaus Yuda. Tiang ngawangun pengalaman digital leq pangembangan kreatif, desain antarmuka, lan arah visual.",
    MAK: "Halo, nak Firdaus Yuda. Nak kabbua pengalaman digital lewat pangembangan kreatif, desain antarmuka, na arah visual.",
    PLM: "Halo, aku Firdaus Yuda. Aku mbangun pengalaman digital lewat pengembangan kreatif, desain antarmuko, dan arah visual."
});
let voiceTimer;
function speakVoice() {
    if (!("speechSynthesis" in window)) {
        alert("Browser kamu tidak mendukung Web Speech API.");
        return;
    }
    speechSynthesis.cancel();
    const voice = new SpeechSynthesisUtterance(voiceTexts[currentLanguage] || voiceTexts.EN);
    const voiceLanguages = {
        ID: "id-ID", KO: "ko-KR", JA: "ja-JP", ZH: "zh-CN", AR: "ar-SA", ES: "es-ES", FR: "fr-FR", DE: "de-DE", PT: "pt-BR", IT: "it-IT", RU: "ru-RU",
        JV: "jv-ID", SU: "su-ID", MAD: "mad-ID", MIN: "min-ID", BAL: "ban-ID", BUG: "bug-ID", ACE: "ace-ID", BJN: "bjn-ID", BTK: "bbc-ID", SAS: "sas-ID", MAK: "mak-ID", PLM: "plm-ID"
    };
    voice.lang = voiceLanguages[currentLanguage] || "en-US";
    voice.rate = 0.82;
    voice.pitch = 0.72;
    voice.volume = Number(volume.value);
    speechSynthesis.speak(voice);
}
$("#voiceBtn").addEventListener("click", speakVoice);
$("#voiceBtn2").addEventListener("click", speakVoice);
const playVoice = $("#playVoice");
const voiceRow = $("#voiceRow");
playVoice.addEventListener("click", () => {
    speakVoice();
    playVoice.textContent = "Ⅱ";
    playVoice.classList.add("playing");
    voiceRow.classList.add("active");
    clearTimeout(voiceTimer);
    voiceTimer = setTimeout(() => {
        playVoice.textContent = "▶";
        playVoice.classList.remove("playing");
        voiceRow.classList.remove("active");
    }, 5000);
});

const revealElements = document.querySelectorAll(".section, .stats, .cards article, .gallery-grid, .cta");
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        revealObserver.unobserve(entry.target);
    });
}, { threshold: 0.12 });
revealElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(35px)";
    element.style.transition = "opacity .8s ease, transform .8s ease";
    revealObserver.observe(element);
});
