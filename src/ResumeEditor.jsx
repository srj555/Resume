import { useState, useRef, useCallback } from "react";

const PHOTO_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect fill='%23e2e8f0' width='80' height='80' rx='40'/%3E%3Ctext x='40' y='44' text-anchor='middle' fill='%2394a3b8' font-size='11' font-family='sans-serif'%3EPhoto%3C/text%3E%3C/svg%3E";

const themes = {
  android: { accent: "#b07152", accentLight: "#faf7f5", accentBg: "#fdf8f5", label: "Senior Android", subtitle: "Senior Android Engineer & Tech Lead" },
  techlead: { accent: "#2d6a4f", accentLight: "#f4f9f6", accentBg: "#f0fdf9", label: "Eng. Tech Lead", subtitle: "Engineering Tech Lead" },
  fintech: { accent: "#1a365d", accentLight: "#f0f5fa", accentBg: "#ebf4ff", label: "Fintech / Trading", subtitle: "Engineering Tech Lead" },
  product: { accent: "#9b7a2e", accentLight: "#faf8f2", accentBg: "#fbf8ef", label: "Mobile Product", subtitle: "Mobile Product & Delivery Lead" },
};

const defaultData = {
  name: "Sreejith Suresh",
  phone: "+971 558 280 133",
  email: "sreejithmailz@gmail.com",
  linkedin: "linkedin.com/in/sreejith-suresh-32b85738",
  location: "Dubai, UAE",
  meta: "UAE Resident  |  Immediate / 30-Day Notice  |  English, Hindi, Malayalam",
  metrics: [
    { num: "12+", label: "Years Android\n& Mobile" },
    { num: "4", label: "Banking Apps\nShipped" },
    { num: "10M+", label: "End Users\nImpacted" },
    { num: "99.5%", label: "Crash-Free\nRate" },
    { num: "20", label: "Team Size\nLed" },
  ],
  profile: `Senior Android engineer with 12+ years building enterprise-grade mobile applications across banking, fintech, and healthcare verticals. Adept at leading teams of up to 20 engineers, defining architecture strategy, and shipping high-scale apps serving 10M+ users with 99.5% crash-free rates and 4.5+ Play Store ratings. Deep expertise in Kotlin, Jetpack Compose, Clean Architecture, and performance optimization. Early adopter of AI-augmented development (Claude Code) to accelerate delivery, automate testing, and streamline engineering workflows across cross-functional teams.`,
  experience: [
    {
      role: "Senior Tech Lead",
      date: "Sep 2023 - Present",
      company: "Synechron Technologies, Dubai",
      client: "Client: Emirates NBD",
      bullets: [
        "Led the Emirates NBD app rebranding -- managed 20 engineers to revamp the entire tech stack, UI, and architecture in 5 months. Received the GEM Award. Zero critical production issues post-launch.",
        "Migrated legacy codebase to multi-module Clean Architecture with Jetpack Compose, Hilt DI, Kotlin Coroutines/Flow, and Version Catalog -- reducing build times by 40% and release cycles by 30%.",
        "Achieved 99.5% crash-free rate and <1.5s cold start time through Baseline Profiles, R8 optimization, and startup tracing with Firebase Performance.",
        "Implemented banking-grade security: biometric auth, certificate pinning, encrypted SharedPreferences, and PCI DSS-aligned session management.",
        "Championed Claude AI adoption -- introduced Claude Code for architecture scaffolding, automated PR reviews, and JUnit/Turbine test generation.",
        "Built CI/CD pipeline (GitHub Actions + Bitrise) with quality gates, lint checks, and automated UI tests -- raised coverage to 80%+.",
      ],
      tags: ["Kotlin", "Jetpack Compose", "Coroutines/Flow", "Hilt", "Clean Arch", "Claude Code", "PCI DSS"],
    },
    {
      role: "Senior Mobile Solutions Engineer (L2)",
      date: "Mar 2021 - Sep 2023",
      company: "Publicis Sapient, Bangalore",
      client: "Clients: Lloyds Bank, SIAM Health",
      bullets: [
        "Senior developer on Lloyds Banking Group Android app -- built Open Banking (PSD2) payment initiation, biometric login, and real-time transaction modules for 18M+ UK customers.",
        "Led cross-platform SIAM Flutter app -- integrated Google Fit and Apple HealthKit APIs with real-time BLE wearable data sync.",
        "Mentored 6 engineers; established architecture templates, code review standards, and WCAG 2.1 accessibility compliance.",
        "Received Platinum Shield Award for US Bank feature delivery ahead of schedule (2021).",
      ],
      tags: ["Kotlin", "Flutter", "Bloc", "Open Banking/PSD2", "BLE", "WCAG"],
    },
    {
      role: "Tech Specialist / Team Lead",
      date: "Nov 2015 - Mar 2021",
      company: "Cognizant, Bangalore",
      client: "Clients: US Bank, CVS Pharmacy",
      bullets: [
        "Led 8 engineers to build US Bank Consumer App from scratch -- scaled to millions of users for payments, transfers, and account management. 4.5+ Play Store rating.",
        "Developed pharmacy fulfillment and prescription refill modules for CVS Pharmacy (#1 pharmacy app, 5M+ downloads).",
        "Owned sprint planning, architecture (MVVM, Dagger 2), code reviews, release management, and production hotfix triage.",
      ],
      tags: ["Kotlin", "Java", "MVVM", "Dagger 2", "RxJava", "AndroidX", "Crashlytics"],
    },
    {
      role: "Sr. Software Engineer / Programmer",
      date: "Jun 2012 - Nov 2015",
      company: "Micro Objects, Cochin & Reubro International",
      client: "",
      bullets: [
        "Built Android apps with BLE/Bluetooth Classic, offline-first Room/SQLite sync, custom views, and Google Maps. Full lifecycle from concept to Play Store.",
      ],
      tags: [],
    },
  ],
  aiCards: [
    { title: "Architecture Scaffolding", text: "Claude Code generates Clean Arch module scaffolds, layer contracts, and ADRs -- reduced new feature setup from days to hours during the ENBD rebranding." },
    { title: "Automated Code Review", text: "Claude integrated into PR workflows to flag anti-patterns, suggest Coroutines/Flow optimizations -- 50% faster review cycles." },
    { title: "Test & Doc Generation", text: "Auto-generated JUnit + Turbine tests from specs. Claude-produced onboarding docs cut ramp-up by 40%, achieved 80%+ coverage." },
  ],
  skills: [
    { label: "LANGUAGES", text: "Kotlin, Java, Dart, XML, SQL" },
    { label: "ANDROID & UI", text: "Jetpack Compose, Material 3, Navigation, Paging 3, WorkManager, Custom Views" },
    { label: "ARCHITECTURE", text: "Clean Arch, MVVM, MVI, SOLID, Multi-module, Kotlin DSL, Version Catalog" },
    { label: "ASYNC, DI & DATA", text: "Coroutines, Flow, RxJava, Hilt, Dagger 2, Retrofit, OkHttp, Room, DataStore" },
    { label: "TESTING", text: "JUnit 5, Espresso, Mockito, Turbine, Robolectric, UI Automator" },
    { label: "CI/CD & MONITORING", text: "GitHub Actions, Bitrise, Gradle, Firebase, Crashlytics, Datadog" },
    { label: "CROSS-PLATFORM & AI", text: "Claude Code, Flutter, Bloc, KMP" },
  ],
  domain: [
    { name: "Digital Banking", desc: "Payments, transfers, PFM, card controls, Open Banking/PSD2" },
    { name: "Security", desc: "Biometric, mPIN, OAuth 2.0, PCI DSS, cert pinning, encryption" },
    { name: "Regulatory", desc: "KYC/AML, GDPR, WCAG 2.1 accessibility" },
    { name: "Healthcare", desc: "Rx workflows, Google Fit, HealthKit, BLE" },
  ],
  awards: [
    { year: "2026", text: "GEM Award -- ENBD Rebranding" },
    { year: "2024", text: "10x Developer -- Emirates NBD" },
    { year: "2021", text: "Platinum Shield -- US Bank" },
    { year: "2019", text: "Top Bucket -- Annual Rating" },
    { year: "2018", text: "Shining Star & Top Bucket" },
  ],
  education: "B.Tech, Computer Science",
  school: "MCET",
  methodology: "Agile/Scrum, SAFe, Kanban, Sprint Planning, Jira, Confluence",
};

// Per-version content overrides, merged over defaultData. Versions without an
// entry use defaultData as-is.
const versionOverrides = {
  product: {
    profile: `Mobile product and delivery leader with 12+ years building customer-facing apps across banking, fintech, and healthcare. Owns the delivery lifecycle end to end -- discovery, prioritization, Agile release planning, launch, and KPI-driven optimization -- for apps serving 10M+ users with 99.5% crash-free rates and 4.5+ Play Store ratings. Deep native (Kotlin) and Flutter engineering background brings credibility with development teams; data-driven decisions, stakeholder management, and SAFe/Scrum delivery turn roadmaps into measurable business outcomes.`,
    experience: [
      {
        role: "Senior Tech Lead",
        date: "Sep 2023 - Present",
        company: "Synechron Technologies, Dubai",
        client: "Client: Emirates NBD",
        bullets: [
          "Drove the Emirates NBD app rebranding end to end -- owned priorities, dependencies, risks, and release planning across 20 engineers and UX/business stakeholders; delivered in 5 months with zero critical production issues. Received the GEM Award.",
          "Partnered with UX, architecture, and business teams to modernize the customer experience on Jetpack Compose and multi-module Clean Architecture -- cut release cycles by 30% and build times by 40%.",
          "Owned product quality KPIs -- 99.5% crash-free rate, <1.5s cold start, and Play Store rating health -- monitored through Firebase Performance, Crashlytics, and Datadog.",
          "Balanced customer experience with banking-grade security and compliance: biometric auth, certificate pinning, and PCI DSS-aligned session management.",
          "Championed AI-augmented delivery (Claude Code) for scaffolding, automated PR review, and test generation -- 50% faster review cycles, 80%+ coverage, faster time to market.",
        ],
        tags: ["Release Planning", "Agile/SAFe", "KPI Analytics", "Stakeholder Mgmt", "Kotlin/Compose", "Claude Code"],
      },
      {
        role: "Senior Mobile Solutions Engineer (L2)",
        date: "Mar 2021 - Sep 2023",
        company: "Publicis Sapient, Bangalore",
        client: "Clients: Lloyds Bank, SIAM Health",
        bullets: [
          "Delivered Open Banking (PSD2) payment initiation, biometric login, and real-time transaction journeys on the Lloyds Banking Group app for 18M+ UK customers, aligning priorities with UK-based product stakeholders.",
          "Led the cross-platform SIAM Health Flutter app -- integrated Google Fit, Apple HealthKit, and real-time BLE wearable sync, shaping feature scope with client stakeholders.",
          "Mentored 6 engineers; established delivery standards, code review practice, and WCAG 2.1 accessibility compliance.",
          "Received Platinum Shield Award for US Bank feature delivery ahead of schedule (2021).",
        ],
        tags: ["Open Banking/PSD2", "Flutter", "Healthcare", "WCAG", "Client Stakeholders"],
      },
      {
        role: "Tech Specialist / Team Lead",
        date: "Nov 2015 - Mar 2021",
        company: "Cognizant, Bangalore",
        client: "Clients: US Bank, CVS Pharmacy",
        bullets: [
          "Built the US Bank Consumer App from scratch with a team of 8 -- scaled to millions of users across payments, transfers, and account management; sustained a 4.5+ Play Store rating.",
          "Delivered pharmacy fulfillment and prescription refill journeys for CVS Pharmacy (#1 pharmacy app, 5M+ downloads).",
          "Owned sprint planning, code reviews, release management, and production hotfix triage.",
        ],
        tags: ["Payments", "Consumer Apps", "Sprint Planning", "Release Mgmt"],
      },
      {
        role: "Sr. Software Engineer / Programmer",
        date: "Jun 2012 - Nov 2015",
        company: "Micro Objects, Cochin & Reubro International",
        client: "",
        bullets: [
          "Built Android apps with BLE/Bluetooth Classic, offline-first Room/SQLite sync, custom views, and Google Maps. Full lifecycle from concept to Play Store.",
        ],
        tags: [],
      },
    ],
    skills: [
      { label: "PRODUCT & DELIVERY", text: "Roadmap execution, Release Planning, Prioritization, Risk & Dependency Mgmt, Stakeholder Management" },
      { label: "METHODOLOGY", text: "Agile/Scrum, SAFe, Kanban, Sprint Planning, Jira, Confluence" },
      { label: "ANALYTICS & QUALITY", text: "Firebase Performance, Crashlytics, Datadog, Play Store metrics, crash-free & cold-start KPIs" },
      { label: "MOBILE PLATFORMS", text: "Android (Kotlin, Jetpack Compose), Flutter, Bloc, KMP" },
      { label: "DOMAIN & COMPLIANCE", text: "Open Banking/PSD2, PCI DSS, KYC/AML, GDPR, WCAG 2.1" },
      { label: "AI-AUGMENTED DELIVERY", text: "Claude Code -- scaffolding, automated review, test & doc generation" },
    ],
    metrics: [
      { num: "12+", label: "Years Mobile\nApps" },
      { num: "4", label: "Banking Apps\nShipped" },
      { num: "10M+", label: "End Users\nImpacted" },
      { num: "99.5%", label: "Crash-Free\nRate" },
      { num: "20", label: "Team Size\nLed" },
    ],
  },
};

function EditableText({ value, onChange, tag = "span", style = {}, className = "", multiline = false }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const Tag = tag;

  if (editing) {
    if (multiline) {
      return (
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => { onChange(draft); setEditing(false); }}
          onKeyDown={(e) => { if (e.key === "Escape") { setDraft(value); setEditing(false); } }}
          autoFocus
          style={{ ...style, width: "100%", minHeight: 60, fontFamily: "inherit", fontSize: "inherit", lineHeight: "inherit", color: "inherit", border: "1.5px solid #b07152", borderRadius: 4, padding: "4px 6px", resize: "vertical", background: "#fffcfa", outline: "none" }}
        />
      );
    }
    return (
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => { onChange(draft); setEditing(false); }}
        onKeyDown={(e) => { if (e.key === "Enter") { onChange(draft); setEditing(false); } if (e.key === "Escape") { setDraft(value); setEditing(false); } }}
        autoFocus
        style={{ ...style, fontFamily: "inherit", fontSize: "inherit", lineHeight: "inherit", color: "inherit", border: "1.5px solid #b07152", borderRadius: 3, padding: "1px 4px", background: "#fffcfa", outline: "none", width: "100%" }}
      />
    );
  }

  return (
    <Tag
      className={className}
      style={{ ...style, cursor: "pointer", borderBottom: "1px dashed transparent", transition: "border-color 0.2s" }}
      onClick={() => { setDraft(value); setEditing(true); }}
      onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = "#ccc")}
      onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "transparent")}
      title="Click to edit"
    >
      {value}
    </Tag>
  );
}

const initialVersion = () => {
  const v = new URLSearchParams(window.location.search).get("v");
  return themes[v] ? v : "android";
};

export default function ResumeEditor() {
  const [dataByVersion, setDataByVersion] = useState(() => {
    const all = {};
    for (const k of Object.keys(themes)) {
      all[k] = JSON.parse(JSON.stringify({ ...defaultData, ...(versionOverrides[k] || {}) }));
    }
    return all;
  });
  const [version, setVersion] = useState(initialVersion);
  const [photo, setPhoto] = useState(null);
  const theme = themes[version];
  const data = dataByVersion[version];
  const resumeRef = useRef(null);

  const update = useCallback((path, value) => {
    setDataByVersion((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let obj = next[version];
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  }, [version]);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhoto(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => window.print();

  const printCss = `
    @media print {
      @page { size: A4; margin: 0; }
      html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; }
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      .no-print { display: none !important; }
      .resume-wrapper { display: block !important; padding: 0 !important; background: #fff !important; min-height: 0 !important; }
      .resume-page { width: 210mm !important; min-height: 0 !important; margin: 0 !important; box-shadow: none !important; border-radius: 0 !important; overflow: visible !important; }
    }
  `;

  const s = {
    wrapper: { minHeight: "100vh", background: "#f5f5f4", display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 16px" },
    toolbar: { display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center", justifyContent: "center" },
    btn: (active) => ({ padding: "8px 18px", borderRadius: 8, border: active ? `2px solid ${theme.accent}` : "2px solid #d4d4d4", background: active ? theme.accent : "#fff", color: active ? "#fff" : "#444", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.2s" }),
    printBtn: { padding: "8px 22px", borderRadius: 8, border: "none", background: "#1a1a1a", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 },
    photoBtn: { padding: "8px 16px", borderRadius: 8, border: "2px dashed #ccc", background: "#fff", color: "#888", fontSize: 12, cursor: "pointer" },
    page: { width: 794, minHeight: 1123, background: "#fff", boxShadow: "0 4px 24px rgba(0,0,0,0.10)", borderRadius: 4, overflow: "hidden", position: "relative" },
    topBar: { height: 4, background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent}aa, ${theme.accent}55)` },
    header: { padding: "18px 28px 12px 28px", borderBottom: `1px solid #e5e5e5`, display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
    headerLeft: { display: "flex", alignItems: "center", gap: 12 },
    photo: { width: 48, height: 48, borderRadius: "50%", objectFit: "cover", border: "2px solid #e2e8f0", flexShrink: 0 },
    nameBlock: {},
    name: { fontSize: 26, fontWeight: 300, color: "#1a1a1a", lineHeight: 1 },
    nameBold: { fontWeight: 700 },
    subtitle: { fontSize: 9.5, fontWeight: 400, color: theme.accent, letterSpacing: 3, textTransform: "uppercase", marginTop: 4, opacity: 0.8 },
    metaLine: { fontSize: 7.5, color: "#999", marginTop: 4, letterSpacing: 0.3 },
    contactR: { fontSize: 8, color: "#6b6560", lineHeight: 1.8, textAlign: "right" },
    link: { color: theme.accent, textDecoration: "none" },
    metricsBar: { display: "flex", justifyContent: "space-around", padding: "10px 28px", borderBottom: "1px solid #e5e5e5", background: theme.accentBg },
    metricCell: { textAlign: "center", flex: 1 },
    metricNum: { fontSize: 18, fontWeight: 700, color: theme.accent, lineHeight: 1 },
    metricLab: { fontSize: 6.5, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600, marginTop: 2, whiteSpace: "pre-line" },
    body: { display: "flex", padding: 0 },
    mainCol: { flex: "0 0 63%", padding: "14px 14px 14px 28px" },
    sideCol: { flex: "0 0 37%", padding: "14px 22px 14px 14px", borderLeft: "1px solid #e5e5e5" },
    secTitle: { fontSize: 8, fontWeight: 700, color: theme.accent, textTransform: "uppercase", letterSpacing: 3, marginBottom: 6 },
    profile: { fontSize: 8.5, color: "#3d3836", lineHeight: 1.5 },
    expRole: { fontWeight: 700, fontSize: 9.5, color: "#1a1a1a" },
    expDate: { fontSize: 8, color: theme.accent, fontWeight: 600 },
    expCo: { fontSize: 8, color: "#8c8c8c", marginTop: 1, marginBottom: 3 },
    bullet: { fontSize: 8.2, color: "#3d3836", lineHeight: 1.4, marginBottom: 2, paddingLeft: 4 },
    bulletMarker: { color: theme.accent, marginRight: 4 },
    tag: { fontSize: 7, color: "#888", marginRight: 2, display: "inline" },
    aiCard: { padding: "5px 8px", background: theme.accentLight, borderRadius: 3, marginBottom: 4, borderLeft: `2px solid ${theme.accent}` },
    aiH: { fontSize: 7.5, fontWeight: 700, color: "#1a1a1a", marginBottom: 2 },
    aiP: { fontSize: 7, color: "#666", lineHeight: 1.4 },
    sgLab: { fontSize: 7, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 },
    sgList: { fontSize: 8, color: "#3d3836", lineHeight: 1.6, marginBottom: 6 },
    domN: { fontSize: 8, fontWeight: 700, color: "#1a1a1a" },
    domD: { fontSize: 7, color: "#888", lineHeight: 1.3 },
    awY: { fontSize: 7.5, fontWeight: 700, color: theme.accent, display: "inline-block", width: 28 },
    awT: { fontSize: 8, color: "#3d3836" },
    divider: { border: "none", borderTop: "1px solid #eee", margin: "8px 0" },
    hint: { fontSize: 11, color: "#999", marginBottom: 12, textAlign: "center" },
  };

  return (
    <div className="resume-wrapper" style={s.wrapper}>
      <style>{printCss}</style>
      <div className="no-print" style={s.toolbar}>
        {Object.entries(themes).map(([k, v]) => (
          <button key={k} style={s.btn(version === k)} onClick={() => setVersion(k)}>{v.label}</button>
        ))}
        <label style={s.photoBtn}>
          Upload Photo
          <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
        </label>
        <button style={s.printBtn} onClick={handlePrint}>
          <span>&#128438;</span> Export PDF
        </button>
      </div>
      <p className="no-print" style={s.hint}>Click any text to edit it inline. Switch versions above. Export as PDF when done.</p>

      <div ref={resumeRef} className="resume-page" style={s.page}>
        <div style={s.topBar} />

        {/* Header */}
        <div style={s.header}>
          <div style={s.headerLeft}>
            <img src={photo || PHOTO_PLACEHOLDER} style={s.photo} alt="" onClick={() => document.getElementById("photoInput2")?.click()} />
            <input id="photoInput2" type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
            <div style={s.nameBlock}>
              <div style={s.name}>
                <EditableText value={data.name} onChange={(v) => update("name", v)} style={s.name} />
              </div>
              <div style={s.subtitle}>{theme.subtitle}</div>
              <EditableText value={data.meta} onChange={(v) => update("meta", v)} style={s.metaLine} tag="div" />
            </div>
          </div>
          <div style={s.contactR}>
            <EditableText value={data.phone} onChange={(v) => update("phone", v)} tag="div" />{" "}
            <EditableText value={data.email} onChange={(v) => update("email", v)} tag="div" style={s.link} />{" "}
            <EditableText value={data.linkedin} onChange={(v) => update("linkedin", v)} tag="div" style={s.link} />{" "}
            <EditableText value={data.location} onChange={(v) => update("location", v)} tag="div" />
          </div>
        </div>

        {/* Metrics */}
        <div style={s.metricsBar}>
          {data.metrics.map((m, i) => (
            <div key={i} style={{ ...s.metricCell, borderRight: i < data.metrics.length - 1 ? "1px solid #ddd" : "none" }}>
              <EditableText value={m.num} onChange={(v) => update(`metrics.${i}.num`, v)} style={s.metricNum} tag="div" />
              <EditableText value={m.label} onChange={(v) => update(`metrics.${i}.label`, v)} style={s.metricLab} tag="div" />
            </div>
          ))}
        </div>

        {/* Body */}
        <div style={s.body}>
          {/* Main Column */}
          <div style={s.mainCol}>
            <div style={{ marginBottom: 10 }}>
              <div style={s.secTitle}>PROFILE</div>
              <EditableText value={data.profile} onChange={(v) => update("profile", v)} style={s.profile} tag="div" multiline />
            </div>

            <div>
              <div style={s.secTitle}>EXPERIENCE</div>
              {data.experience.map((exp, ei) => (
                <div key={ei} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <EditableText value={exp.role} onChange={(v) => update(`experience.${ei}.role`, v)} style={s.expRole} />
                    <EditableText value={exp.date} onChange={(v) => update(`experience.${ei}.date`, v)} style={s.expDate} />
                  </div>
                  <div style={s.expCo}>
                    <EditableText value={exp.company} onChange={(v) => update(`experience.${ei}.company`, v)} />
                    {exp.client && <>{" - "}<EditableText value={exp.client} onChange={(v) => update(`experience.${ei}.client`, v)} style={{ fontWeight: 700, color: "#555" }} /></>}
                  </div>
                  {exp.bullets.map((b, bi) => (
                    <div key={bi} style={s.bullet}>
                      <span style={s.bulletMarker}>&#8226;</span>
                      <EditableText value={b} onChange={(v) => update(`experience.${ei}.bullets.${bi}`, v)} />
                    </div>
                  ))}
                  {exp.tags.length > 0 && (
                    <div style={{ marginTop: 3 }}>
                      {exp.tags.map((t, ti) => (
                        <span key={ti} style={s.tag}>{t}{ti < exp.tags.length - 1 ? " / " : ""}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Side Column */}
          <div style={s.sideCol}>
            <div style={{ marginBottom: 10 }}>
              <div style={s.secTitle}>CLAUDE AI IN PRACTICE</div>
              {data.aiCards.map((c, i) => (
                <div key={i} style={s.aiCard}>
                  <EditableText value={c.title} onChange={(v) => update(`aiCards.${i}.title`, v)} style={s.aiH} tag="div" />
                  <EditableText value={c.text} onChange={(v) => update(`aiCards.${i}.text`, v)} style={s.aiP} tag="div" />
                </div>
              ))}
            </div>

            <hr style={s.divider} />

            <div style={{ marginBottom: 8 }}>
              <div style={s.secTitle}>SKILLS</div>
              {data.skills.map((sk, i) => (
                <div key={i} style={{ marginBottom: 5 }}>
                  <div style={s.sgLab}>{sk.label}</div>
                  <EditableText value={sk.text} onChange={(v) => update(`skills.${i}.text`, v)} style={{ fontSize: 8, color: "#3d3836", lineHeight: 1.6 }} tag="div" />
                </div>
              ))}
            </div>

            <hr style={s.divider} />

            <div style={{ marginBottom: 8 }}>
              <div style={s.secTitle}>DOMAIN</div>
              {data.domain.map((d, i) => (
                <div key={i} style={{ marginBottom: 3 }}>
                  <EditableText value={d.name} onChange={(v) => update(`domain.${i}.name`, v)} style={s.domN} tag="div" />
                  <EditableText value={d.desc} onChange={(v) => update(`domain.${i}.desc`, v)} style={s.domD} tag="div" />
                </div>
              ))}
            </div>

            <hr style={s.divider} />

            <div style={{ marginBottom: 8 }}>
              <div style={s.secTitle}>RECOGNITION</div>
              {data.awards.map((a, i) => (
                <div key={i} style={{ marginBottom: 3 }}>
                  <EditableText value={a.year} onChange={(v) => update(`awards.${i}.year`, v)} style={s.awY} />
                  <EditableText value={a.text} onChange={(v) => update(`awards.${i}.text`, v)} style={s.awT} />
                </div>
              ))}
            </div>

            <hr style={s.divider} />

            <div style={{ marginBottom: 6 }}>
              <div style={s.secTitle}>EDUCATION</div>
              <EditableText value={data.education} onChange={(v) => update("education", v)} style={{ fontWeight: 700, fontSize: 9, color: "#1a1a1a" }} tag="div" />
              <EditableText value={data.school} onChange={(v) => update("school", v)} style={{ fontSize: 8, color: "#888" }} tag="div" />
            </div>

            <hr style={s.divider} />

            <div>
              <div style={s.secTitle}>METHODOLOGY</div>
              <EditableText value={data.methodology} onChange={(v) => update("methodology", v)} style={{ fontSize: 7.5, color: "#3d3836" }} tag="div" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
