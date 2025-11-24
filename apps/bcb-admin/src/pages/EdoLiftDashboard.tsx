import React, { useEffect, useMemo, useRef, useState } from "react";
import "./EdoLift.scss";

const TOTAL_EXTREME_POOR_DEMO = 8000000;
const PROJECT_DAILY_CHANGE = -500;
const YEARS_TO_2030 = 5;
const SECONDS_TO_2030 = YEARS_TO_2030 * 365 * 24 * 3600;
const BASE_TREND = [8500000, 8300000, 8100000, 8000000, 7900000, 7800000];

const demoPrograms = [
  { name: "Cash Transfer – Urban Households", lga: "Oredo", district: "Edo South", beneficiaries: 25000, funding: 2000000, status: "ongoing" },
  { name: "Youth Skills – Green Jobs", lga: "Egor", district: "Edo South", beneficiaries: 12000, funding: 1200000, status: "ongoing" },
  { name: "Agric Input Support", lga: "Esan West", district: "Edo Central", beneficiaries: 18000, funding: 1500000, status: "ongoing" },
  { name: "Basic Health Insurance Subsidy", lga: "Etsako West", district: "Edo North", beneficiaries: 15000, funding: 1700000, status: "planned" },
  { name: "Girls’ Secondary Education Scholarship", lga: "Esan North-East", district: "Edo Central", beneficiaries: 8000, funding: 800000, status: "ongoing" },
  { name: "Community Infrastructure & Roads", lga: "Akoko-Edo", district: "Edo North", beneficiaries: 10000, funding: 3000000, status: "completed" },
];

const zones = ["Edo South", "Edo Central", "Edo North"] as const;
type Zone = (typeof zones)[number];

type DataRow = {
  lga: string;
  district: Zone;
  extremePoor: number;
  population: number;
  geography: "Urban" | "Rural" | "Unknown";
  femaleShare: number;
};

type Filters = {
  lgaFilter: string;
  zoneFilter: "all" | Zone;
  geoFilter: "all" | "Urban" | "Rural";
  demoFilter: "all" | "females" | "males";
  minAge: number;
  maxAge: number;
  projectionDays: number;
  role: "government" | "ngo" | "donor" | "philanthropist" | "public";
};

type Context = ReturnType<typeof computeContext>;

type SearchItem = { type: "zone" | "lga" | "community" | "indicator" | "programme"; label: string; payload: string };

type ProgramSummary = {
  text: string;
  stats: null | {
    totalBeneficiaries: number;
    totalFunding: number;
    ongoing: number;
    planned: number;
    completed: number;
    count: number;
  };
};

type MarkerRecord = Record<string, HTMLDivElement>;

const mapBounds = { latMin: 5.8, latMax: 7, lngMin: 4.8, lngMax: 6.8 };

function buildDemoData(): DataRow[] {
  const demoLgas = [
    { name: "Oredo", district: "Edo South" as Zone },
    { name: "Egor", district: "Edo South" as Zone },
    { name: "Ikpoba-Okha", district: "Edo South" as Zone },
    { name: "Ovia North-East", district: "Edo South" as Zone },
    { name: "Ovia South-West", district: "Edo South" as Zone },
    { name: "Orhionmwon", district: "Edo South" as Zone },
    { name: "Uhunmwonde", district: "Edo South" as Zone },
    { name: "Esan Central", district: "Edo Central" as Zone },
    { name: "Esan North-East", district: "Edo Central" as Zone },
    { name: "Esan South-East", district: "Edo Central" as Zone },
    { name: "Esan West", district: "Edo Central" as Zone },
    { name: "Igueben", district: "Edo Central" as Zone },
    { name: "Akoko-Edo", district: "Edo North" as Zone },
    { name: "Etsako Central", district: "Edo North" as Zone },
    { name: "Etsako East", district: "Edo North" as Zone },
    { name: "Etsako West", district: "Edo North" as Zone },
    { name: "Owan East", district: "Edo North" as Zone },
    { name: "Owan West", district: "Edo North" as Zone },
  ];

  const zoneCounts: Record<Zone, number> = {
    "Edo South": 0,
    "Edo Central": 0,
    "Edo North": 0,
  };
  demoLgas.forEach((lga) => {
    zoneCounts[lga.district] += 1;
  });

  const perZone = TOTAL_EXTREME_POOR_DEMO / 3;

  return demoLgas.map((lga) => {
    const extreme = Math.floor(perZone / zoneCounts[lga.district]);
    const population = Math.round(extreme / 0.7);
    const geography = lga.district === "Edo South" ? "Urban" : "Rural";
    const femaleShare = lga.district === "Edo Central" ? 0.52 : 0.5;
    return {
      lga: lga.name,
      district: lga.district,
      extremePoor: extreme,
      population,
      geography,
      femaleShare,
    };
  });
}

function computeAgeFactor(minAge: number, maxAge: number) {
  let factor = 0;
  if (minAge <= 17 && maxAge >= 0) factor += 0.25;
  if (minAge <= 64 && maxAge >= 18) factor += 0.6;
  if (minAge <= 100 && maxAge >= 65) factor += 0.15;
  return Math.min(1, factor);
}

function getScopeLabel(lgaFilter: string, zoneFilter: Filters["zoneFilter"]) {
  if (lgaFilter !== "all") return `${lgaFilter} LGA`;
  if (zoneFilter !== "all") return `${zoneFilter} Senatorial Zone`;
  return "Edo State (all LGAs)";
}

function sumExtremePoor(rows: DataRow[]) {
  return rows.reduce((acc, r) => acc + (r.extremePoor || 0), 0);
}

function computeContext(rows: DataRow[], filters: Filters) {
  const { lgaFilter, zoneFilter, geoFilter, demoFilter, minAge, maxAge, projectionDays, role } = filters;
  const ageFactor = computeAgeFactor(minAge, maxAge);

  let totalPoor = 0;
  let totalPop = 0;
  const zoneTotals: Record<Zone, number> = { "Edo South": 0, "Edo Central": 0, "Edo North": 0 };

  rows.forEach((row) => {
    if (lgaFilter !== "all" && row.lga !== lgaFilter) return;
    if (zoneFilter !== "all" && row.district !== zoneFilter) return;
    if (geoFilter !== "all" && row.geography !== geoFilter) return;

    let genderFactor = 1;
    if (demoFilter === "females") genderFactor = row.femaleShare || 0.5;
    else if (demoFilter === "males") genderFactor = 1 - (row.femaleShare || 0.5);

    const factor = genderFactor * ageFactor;
    const lgaPoor = (row.extremePoor || 0) * factor;
    const lgaPop = (row.population || 0) * factor;

    totalPoor += lgaPoor;
    totalPop += lgaPop;
    zoneTotals[row.district] += lgaPoor;
  });

  if (totalPop <= 0) totalPop = 1;
  const povertyRate = totalPoor > 0 ? totalPoor / totalPop : 0;

  let highestZone: Zone = "Edo South";
  let highestZonePoor = 0;
  (Object.keys(zoneTotals) as Zone[]).forEach((z) => {
    if (zoneTotals[z] > highestZonePoor) {
      highestZonePoor = zoneTotals[z];
      highestZone = z;
    }
  });

  const highestZoneShare = totalPoor > 0 ? highestZonePoor / totalPoor : 0;
  const projectedPoorRaw = totalPoor + projectionDays * PROJECT_DAILY_CHANGE;
  const projectedPoor = projectedPoorRaw > 0 ? projectedPoorRaw : 0;
  const projectedRate = projectedPoor / totalPop;

  const targetPoor = 0.03 * totalPop;
  const peopleToLift = totalPoor > targetPoor ? totalPoor - targetPoor : 0;
  const requiredRatePerSecond = peopleToLift > 0 ? peopleToLift / SECONDS_TO_2030 : 0;

  const scopeLabel = getScopeLabel(lgaFilter, zoneFilter);
  const exampleRow = lgaFilter !== "all" ? rows.find((r) => r.lga === lgaFilter) : rows.find((r) => r.district === highestZone) || rows[0];

  return {
    ...filters,
    totalPoor: Math.round(totalPoor),
    totalPop: Math.round(totalPop),
    povertyRate,
    projectedPoor: Math.round(projectedPoor),
    projectedRate,
    highestZone,
    highestZoneShare,
    scopeLabel,
    targetPoor: Math.round(targetPoor),
    peopleToLift: Math.round(peopleToLift),
    requiredRatePerSecond,
    exampleLga: exampleRow ? exampleRow.lga : "Oredo",
  };
}

function rolePerspective(role: Filters["role"], scopeLabel: string) {
  switch (role) {
    case "government":
      return `For government planners, this view can guide <strong>budget prioritisation, social protection expansion</strong> and SDG-aligned planning across <strong>${scopeLabel}</strong>.`;
    case "ngo":
      return `For NGOs and CSOs, the data highlights where to <strong>target projects, advocacy, and community engagement</strong> within <strong>${scopeLabel}</strong>.`;
    case "donor":
      return `For donors and development partners, this view helps align <strong>funding envelopes, programme pipelines</strong> and results frameworks with <strong>${scopeLabel}</strong>.`;
    case "philanthropist":
      return `For philanthropists, the numbers reveal where <strong>flexible capital</strong> can unlock the greatest impact in <strong>${scopeLabel}</strong>.`;
    case "public":
    default:
      return `For the general public, this view improves <strong>transparency, accountability</strong> and understanding of poverty challenges in <strong>${scopeLabel}</strong>.`;
  }
}

const storySteps = [
  {
    title: "Where are we today?",
    render: (ctx: Context) =>
      `<p>Within <strong>${ctx.scopeLabel}</strong>, we estimate about <strong>${ctx.totalPoor.toLocaleString()}</strong> people in extreme poverty. That is roughly <strong>${(ctx.povertyRate * 100).toFixed(1)}%</strong> of the filtered population.</p><p>The largest simulated burden sits in <strong>${ctx.highestZone}</strong>, accounting for about <strong>${(ctx.highestZoneShare * 100).toFixed(1)}%</strong> of extreme poor in this view.</p><p>${rolePerspective(ctx.role, ctx.scopeLabel)}</p>`,
  },
  {
    title: "Who is being left behind?",
    render: (ctx: Context) => {
      let demographicText = "You are looking at <strong>all genders</strong>.";
      if (ctx.demoFilter === "females") demographicText = "You are focusing on <strong>women and girls</strong>.";
      if (ctx.demoFilter === "males") demographicText = "You are focusing on <strong>men and boys</strong>.";

      let geoText = "Both urban and rural areas are included.";
      if (ctx.geoFilter === "Urban") geoText = "This view emphasises <strong>urban poverty hotspots</strong>.";
      if (ctx.geoFilter === "Rural") geoText = "This view emphasises <strong>rural communities</strong>.";

      const ageText = ctx.minAge === 0 && ctx.maxAge === 100 ? "All age groups are included." : `The age window is set to <strong>${ctx.minAge}–${ctx.maxAge} years</strong>.`;

      return `<p>${demographicText} ${geoText} ${ageText}</p><p>Under these filters, programmes that combine <strong>income support, basic services, and livelihoods</strong> in <strong>${ctx.highestZone}</strong> could move the largest number of people out of extreme poverty.</p><p>${rolePerspective(ctx.role, ctx.scopeLabel)}</p>`;
    },
  },
  {
    title: "Are we on track for SDG 1?",
    render: (ctx: Context) => {
      const rate = ctx.requiredRatePerSecond;
      const readableRate = rate > 0 ? `${rate.toFixed(2)} people per second` : "no additional people (target already reached in this view)";
      return `<p>To reduce extreme poverty in <strong>${ctx.scopeLabel}</strong> below <strong>3%</strong> by 2030, about <strong>${ctx.peopleToLift.toLocaleString()}</strong> people need to escape extreme poverty in the next <strong>${YEARS_TO_2030} years</strong>.</p><p>That translates into lifting roughly <strong>${readableRate}</strong> out of extreme poverty under this simple trajectory.</p><p>This connects directly to the <strong>Africa Poverty Clock</strong> module, where Edo State’s SDG 1 progress can be compared against Nigeria and other African peers.</p>`;
    },
  },
  {
    title: "What policy mix is implied?",
    render: (ctx: Context) =>
      `<p>Given this burden and trajectory, <strong>${ctx.scopeLabel}</strong> would benefit from a balanced policy mix:</p><p>• <strong>Short-term shock response</strong> – cash or food support to stabilise households currently in extreme poverty (${ctx.totalPoor.toLocaleString()} people).</p><p>• <strong>Medium-term productivity</strong> – skills, jobs and enterprise programmes targeted to LGAs such as <strong>${ctx.exampleLga}</strong> in ${ctx.highestZone}.</p><p>• <strong>System reforms</strong> – investments in health, education and connectivity to keep future cohorts from falling into poverty.</p><p>${rolePerspective(ctx.role, ctx.scopeLabel)}</p>`,
  },
];

function parseCsv(text: string): DataRow[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const rows: DataRow[] = [];

  for (let i = 1; i < lines.length; i += 1) {
    if (!lines[i].trim()) continue;
    const cells = lines[i].split(",").map((c) => c.trim());
    const rowObj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      rowObj[h] = cells[idx];
    });

    const lga = rowObj["lga"] || rowObj["lga_name"] || "";
    const district = (rowObj["district"] || rowObj["zone"] || "") as Zone;
    const extreme = parseInt(rowObj["extreme_poor"] || rowObj["extreme"] || rowObj["poverty"] || "0", 10) || 0;
    const population = parseInt(rowObj["population"] || "0", 10) || 0;
    const geography = (rowObj["geography"] || rowObj["geo"] || "Unknown") as DataRow["geography"];
    const femaleShare = parseFloat(rowObj["female_share"] || "0.5") || 0.5;

    if (!lga || !district) continue;

    rows.push({
      lga,
      district,
      extremePoor: extreme,
      population: population > 0 ? population : Math.round(extreme / 0.7),
      geography: geography === "Urban" || geography === "Rural" ? geography : "Unknown",
      femaleShare,
    });
  }

  return rows;
}

function buildSearchIndex(rows: DataRow[]): SearchItem[] {
  const index: SearchItem[] = [];
  zones.forEach((z) => index.push({ type: "zone", label: z, payload: z }));

  const lgaSet = new Set<string>();
  rows.forEach((r) => {
    if (!lgaSet.has(r.lga)) {
      lgaSet.add(r.lga);
      index.push({ type: "lga", label: r.lga, payload: r.lga });
    }
  });

  ["Benin City", "Uromi", "Auchi", "Igarra", "Sabongida-Ora"].forEach((c) => index.push({ type: "community", label: c, payload: c }));

  ["Poverty rate", "Extreme poverty headcount", "Inequality (Gini)", "Multidimensional poverty", "Escape rate"].forEach((ind) =>
    index.push({ type: "indicator", label: ind, payload: ind })
  );

  ["Cash transfers", "Youth skills initiative", "Agric support programme", "Health insurance subsidy"].forEach((p) =>
    index.push({ type: "programme", label: p, payload: p })
  );

  return index;
}

function calculateProgramSummary(ctx: Context | null): ProgramSummary {
  if (!ctx) {
    return {
      text: "Loading programme data…",
      stats: null,
    };
  }

  let filtered = demoPrograms;
  if (ctx.lgaFilter !== "all") {
    filtered = filtered.filter((p) => p.lga === ctx.lgaFilter);
  } else if (ctx.zoneFilter !== "all") {
    filtered = filtered.filter((p) => p.district === ctx.zoneFilter);
  }

  if (filtered.length === 0) {
    return {
      text: "No demo programmes are mapped to this filtered view yet. In production, this section will track funding flows, beneficiaries and programme status for all poverty-alleviation interventions.",
      stats: null,
    };
  }

  const totalBeneficiaries = filtered.reduce((acc, p) => acc + p.beneficiaries, 0);
  const totalFunding = filtered.reduce((acc, p) => acc + p.funding, 0);
  const ongoing = filtered.filter((p) => p.status === "ongoing").length;
  const planned = filtered.filter((p) => p.status === "planned").length;
  const completed = filtered.filter((p) => p.status === "completed").length;

  return {
    text: `Estimated beneficiaries: ${totalBeneficiaries.toLocaleString()} | Funding: $${totalFunding.toLocaleString()} | Status: ${ongoing} ongoing, ${planned} planned, ${completed} completed.`,
    stats: { totalBeneficiaries, totalFunding, ongoing, planned, completed, count: filtered.length },
  };
}

function latLngToPoint(lat: number, lng: number, container: HTMLElement) {
  const { latMin, latMax, lngMin, lngMax } = mapBounds;
  const x = ((lng - lngMin) / (lngMax - lngMin)) * container.clientWidth;
  const y = ((latMax - lat) / (latMax - latMin)) * container.clientHeight;
  return { x, y };
}

function drawDonut(canvas: HTMLCanvasElement, ratePercent: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const size = Math.min(canvas.parentElement?.clientWidth || 240, 240);
  canvas.width = size;
  canvas.height = size;
  const center = size / 2;
  const radius = size / 2 - 12;
  const startAngle = -Math.PI / 2;
  const povertyAngle = (ratePercent / 100) * Math.PI * 2;

  ctx.clearRect(0, 0, size, size);
  ctx.lineWidth = 18;
  ctx.strokeStyle = "#020617";
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#22c55e";
  ctx.beginPath();
  ctx.arc(center, center, radius, startAngle, startAngle + povertyAngle);
  ctx.stroke();

  ctx.fillStyle = "#e5e7eb";
  ctx.font = "700 18px Inter, system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`${ratePercent.toFixed(1)}%`, center, center);
}

function drawTrend(canvas: HTMLCanvasElement, data: number[]) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const width = canvas.parentElement?.clientWidth || 320;
  const height = 220;
  canvas.width = width;
  canvas.height = height;

  const maxVal = Math.max(...data, 1);
  const minVal = Math.min(...data, 0);
  const padding = 20;
  const points = data.map((v, idx) => {
    const x = padding + (idx / Math.max(data.length - 1, 1)) * (width - padding * 2);
    const y = height - padding - ((v - minVal) / (maxVal - minVal)) * (height - padding * 2);
    return { x, y };
  });

  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  points.forEach((p) => {
    ctx.beginPath();
    ctx.moveTo(p.x, padding);
    ctx.lineTo(p.x, height - padding);
    ctx.stroke();
  });

  ctx.strokeStyle = "#22c55e";
  ctx.lineWidth = 2;
  ctx.beginPath();
  points.forEach((p, idx) => {
    if (idx === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();

  ctx.fillStyle = "#22c55e";
  points.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fill();
  });
}

function EdoLiftDashboard() {
  const [dataMode, setDataMode] = useState<"demo" | "csv">("demo");
  const [rawRows, setRawRows] = useState<DataRow[]>(() => buildDemoData());
  const [pendingFilters, setPendingFilters] = useState<Filters>({
    lgaFilter: "all",
    zoneFilter: "all",
    geoFilter: "all",
    demoFilter: "all",
    minAge: 0,
    maxAge: 100,
    projectionDays: 0,
    role: "government",
  });
  const [filters, setFilters] = useState<Filters>(pendingFilters);
  const [searchValue, setSearchValue] = useState("");
  const [storyIndex, setStoryIndex] = useState(0);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const runnerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const pieCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const trendCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const markersRef = useRef<MarkerRecord>({});
  const animationRef = useRef<number | null>(null);

  const context = useMemo(() => (rawRows.length ? computeContext(rawRows, filters) : null), [filters, rawRows]);
  const searchIndex = useMemo(() => buildSearchIndex(rawRows), [rawRows]);
  const programSummary = useMemo(() => calculateProgramSummary(context), [context]);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;
    container.innerHTML = "";
    markersRef.current = {};

    const fragment = document.createDocumentFragment();
    rawRows.forEach((row, idx) => {
      const rowIdx = Math.floor(idx / 3);
      const col = idx % 3;
      const lat = 6.1 + rowIdx * 0.25;
      const lng = 5.2 + col * 0.45;
      const marker = document.createElement("div");
      marker.className = "map-marker";
      marker.title = `${row.lga} (${row.district})`;
      marker.dataset.lga = row.lga;
      fragment.appendChild(marker);
      markersRef.current[row.lga] = marker;

      requestAnimationFrame(() => {
        const { x, y } = latLngToPoint(lat, lng, container);
        marker.style.left = `${x}px`;
        marker.style.top = `${y}px`;
      });
    });
    container.appendChild(fragment);
  }, [rawRows]);

  useEffect(() => {
    const canvas = runnerCanvasRef.current;
    const container = mapContainerRef.current;
    if (!canvas || !container || !context) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      canvas.style.left = `${container.getBoundingClientRect().left}px`;
      canvas.style.top = `${container.getBoundingClientRect().top}px`;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const runners = rawRows.map((row, index) => {
      const marker = markersRef.current[row.lga];
      const rect = marker?.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const point = rect
        ? { x: rect.left - containerRect.left + rect.width / 2, y: rect.top - containerRect.top + rect.height / 2 }
        : { x: 20 + index * 12, y: 20 + index * 8 };
      return {
        lga: row.lga,
        startX: point.x,
        endX: point.x + (index % 2 === 0 ? 80 : -80),
        y: point.y,
        duration: 7000,
        delay: index * 400,
        startTime: 0,
        directionOut: index % 2 === 0,
      };
    });

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      runners.forEach((runner) => {
        if (!runner.startTime) runner.startTime = timestamp + runner.delay;
        if (timestamp < runner.startTime) return;
        const t = (timestamp - runner.startTime) / runner.duration;
        if (t >= 1) {
          runner.startTime = timestamp + runner.delay;
          return;
        }
        const x = runner.startX + (runner.endX - runner.startX) * t;
        ctx.fillStyle = runner.directionOut ? "#22c55e" : "#ef4444";
        ctx.beginPath();
        ctx.arc(x, runner.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#111827";
        ctx.font = "10px Inter, system-ui";
        ctx.textAlign = "center";
        ctx.fillText(runner.lga, x, runner.y - 12);
      });
      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [rawRows, context]);

  useEffect(() => {
    if (!context) return;
    if (pieCanvasRef.current) {
      const ratePercent = Math.max(0, Math.min(100, context.povertyRate * 100));
      drawDonut(pieCanvasRef.current, ratePercent);
    }
    if (trendCanvasRef.current) {
      const stateTotal = dataMode === "demo" ? TOTAL_EXTREME_POOR_DEMO : sumExtremePoor(rawRows);
      const scale = stateTotal > 0 ? context.totalPoor / stateTotal : 0;
      const scaledTrend = BASE_TREND.map((v) => Math.round(v * scale));
      drawTrend(trendCanvasRef.current, scaledTrend);
    }

    const container = mapContainerRef.current;
    if (container) {
      Object.values(markersRef.current).forEach((el) => el.classList.remove("active"));
      if (context.lgaFilter !== "all" && markersRef.current[context.lgaFilter]) {
        markersRef.current[context.lgaFilter].classList.add("active");
      }
    }
  }, [context, dataMode, rawRows]);

  const handleApplyFilters = () => {
    setStoryIndex(0);
    setFilters(pendingFilters);
  };

  const handleSearch = () => {
    const q = searchValue.toLowerCase().replace(/\(.*?\)$/, "").trim();
    if (!q) return;
    let match = searchIndex.find((item) => item.label.toLowerCase() === q);
    if (!match) match = searchIndex.find((item) => item.label.toLowerCase().startsWith(q));
    if (!match) return;

    if (match.type === "lga") {
      setPendingFilters((prev) => ({ ...prev, lgaFilter: match.payload, zoneFilter: "all" }));
      setFilters((prev) => ({ ...prev, lgaFilter: match.payload, zoneFilter: "all" }));
    } else if (match.type === "zone") {
      setPendingFilters((prev) => ({ ...prev, zoneFilter: match.payload as Zone, lgaFilter: "all" }));
      setFilters((prev) => ({ ...prev, zoneFilter: match.payload as Zone, lgaFilter: "all" }));
    } else if (match.type === "community") {
      let zone: Zone = "Edo South";
      if (["Uromi"].includes(match.payload)) zone = "Edo Central";
      if (["Auchi", "Igarra", "Sabongida-Ora"].includes(match.payload)) zone = "Edo North";
      setPendingFilters((prev) => ({ ...prev, zoneFilter: zone, lgaFilter: "all" }));
      setFilters((prev) => ({ ...prev, zoneFilter: zone, lgaFilter: "all" }));
    } else if (match.type === "indicator") {
      setStoryIndex(1);
    } else if (match.type === "programme") {
      setStoryIndex(3);
    }
  };

  const handleCsvUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const rows = parseCsv(text);
      if (!rows.length) return;
      setDataMode("csv");
      setRawRows(rows);
      setFilters({ ...pendingFilters, lgaFilter: "all", zoneFilter: "all" });
      setPendingFilters((prev) => ({ ...prev, lgaFilter: "all", zoneFilter: "all" }));
    };
    reader.readAsText(file);
  };

  const exportFilteredCsv = () => {
    if (!context) return;
    const ageFactor = computeAgeFactor(context.minAge, context.maxAge);
    const rowsOut = rawRows
      .map((row) => {
        if (context.lgaFilter !== "all" && row.lga !== context.lgaFilter) return null;
        if (context.zoneFilter !== "all" && row.district !== context.zoneFilter) return null;
        if (context.geoFilter !== "all" && row.geography !== context.geoFilter) return null;

        let genderFactor = 1;
        if (context.demoFilter === "females") genderFactor = row.femaleShare || 0.5;
        else if (context.demoFilter === "males") genderFactor = 1 - (row.femaleShare || 0.5);
        const factor = genderFactor * ageFactor;
        return {
          lga: row.lga,
          district: row.district,
          geography: row.geography,
          extremePoorFiltered: Math.round((row.extremePoor || 0) * factor),
          populationFiltered: Math.round((row.population || 0) * factor),
        };
      })
      .filter(Boolean) as { lga: string; district: string; geography: string; extremePoorFiltered: number; populationFiltered: number }[];

    if (!rowsOut.length) return;

    let csv = "LGA,District,Geography,ExtremePoorFiltered,PopulationFiltered\n";
    rowsOut.forEach((r) => {
      csv += `${r.lga},${r.district},${r.geography},${r.extremePoorFiltered},${r.populationFiltered}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "edolift_filtered_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportPdfBrief = () => {
    if (!context) return;
    const stepHtml = storySteps.map((step, idx) => `<h3>Step ${idx + 1}: ${step.title}</h3>${step.render(context)}`).join("<hr>");

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>EdoLift SDG1 Brief</title><style>body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; } h1, h2, h3 { color: #111827; } h1 { font-size: 20px; } h2 { font-size: 16px; margin-top: 20px; } h3 { font-size: 14px; margin-top: 15px; } p { font-size: 12px; } hr { margin: 16px 0; border: none; border-top: 1px solid #e5e7eb; } .meta { font-size: 11px; color: #6b7280; margin-bottom: 12px; }</style></head><body><h1>EdoLift SDG 1 – Poverty & Equity Brief</h1><div class="meta">Scope: ${context.scopeLabel}<br>Data mode: ${dataMode === "demo" ? "Demo (synthetic)" : "CSV/API (real dataset)"}<br>Role perspective: ${context.role}</div><h2>Key numbers</h2><p>Extreme poor (filtered): <strong>${context.totalPoor.toLocaleString()}</strong><br>Filtered population: <strong>${context.totalPop.toLocaleString()}</strong><br>Poverty rate: <strong>${(context.povertyRate * 100).toFixed(1)}%</strong><br>People to lift to reach &lt;3%: <strong>${context.peopleToLift.toLocaleString()}</strong></p><h2>Narrative storyline</h2>${stepHtml}</body></html>`;

    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.focus();
    win.print();
  };

  const premiumSummaryText = context
    ? context.peopleToLift <= 0
      ? "In this filtered view, SDG 1 (<3% in extreme poverty) is already achieved."
      : `${context.peopleToLift.toLocaleString()} people still need to escape extreme poverty to reach the SDG 1 goal (<3%) in this view.`
    : "Loading SDG1 gap…";

  const africaClockText = context
    ? `<p>This simplified Africa Poverty Clock view estimates that in <strong>${context.scopeLabel}</strong>, about <strong>${context.totalPoor.toLocaleString()}</strong> people are in extreme poverty under current filters.</p><p>To reach the SDG 1 target (&lt;3%) by 2030, approximately <strong>${context.peopleToLift.toLocaleString()}</strong> people still need to be lifted out of extreme poverty.</p><p>This implies a required pace of about <strong>${context.requiredRatePerSecond.toFixed(2)} people per second</strong>. ${context.peopleToLift <= 0 ? "On track or already below the SDG 1 threshold in this view." : "Needs to accelerate exits from extreme poverty to match SDG 1 expectations."}</p>`
    : "Loading Africa Poverty Clock view…";

  return (
    <div className={`edo-lift-app ${theme === "light" ? "light-mode" : ""}`}>
      <header id="topHeader">
        <div id="brand">
          <div id="brandTitle">EdoLift · SDG 1</div>
          <div id="brandSubtitle">Poverty Alleviation Management Platform for Edo State</div>
        </div>
        <div id="headerStats">
          <div className="input-wrapper">
            <input
              id="globalSearch"
              type="search"
              placeholder="Search LGAs, zones, indicators, programmes…"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              list="searchSuggestions"
            />
            <datalist id="searchSuggestions">
              {searchIndex.map((item) => (
                <option key={`${item.type}-${item.label}`} value={`${item.label} (${item.type})`} />
              ))}
            </datalist>
          </div>

          <select
            id="roleSelect"
            value={pendingFilters.role}
            onChange={(e) => {
              const role = e.target.value as Filters["role"];
              setPendingFilters((prev) => ({ ...prev, role }));
              setFilters((prev) => ({ ...prev, role }));
            }}
          >
            <option value="government">Government planner</option>
            <option value="ngo">NGO / CSO</option>
            <option value="donor">Donor / development partner</option>
            <option value="philanthropist">Philanthropist</option>
            <option value="public">Citizen / public</option>
          </select>

          <a id="legacyLink" href="datas.html" target="_blank" rel="noreferrer" title="Open the original EdoLift map view">
            Classic Map View
          </a>

          <div id="realTimeCounter" className="statChip">
            {context ? `${context.totalPoor.toLocaleString()} in extreme poverty (${(context.povertyRate * 100).toFixed(1)} of filtered scope)` : "Loading poverty numbers…"}
          </div>
          <div id="escapeRate" className="statChip">
            {context
              ? context.peopleToLift <= 0
                ? "In this view, SDG 1 (<3%) is already met."
                : `To hit <3% by 2030: lift ${context.requiredRatePerSecond.toFixed(2)}/sec (${Math.round(context.requiredRatePerSecond * 86400).toLocaleString()}/day)`
              : "Calculating SDG 1 trajectory…"}
          </div>
          <button
            id="dataModeBtn"
            className="statChip"
            type="button"
            onClick={() => {
              if (dataMode === "demo") return;
              setDataMode("demo");
              setRawRows(buildDemoData());
            }}
          >
            Data mode: {dataMode === "demo" ? "Demo" : "CSV"}
          </button>
          <button id="themeToggle" className="statChip" type="button" onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}>
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
          <button
            id="aboutBtn"
            className="statChip"
            type="button"
            onClick={() => {
              const modal = document.getElementById("aboutModal");
              if (modal) modal.classList.add("open");
            }}
          >
            About &amp; methodology
          </button>
        </div>
      </header>

      <aside id="leftPanel">
        <div id="leftLogo">
          <h1>Edo Poverty Atlas</h1>
          <span>Real-time dashboard, deep dives, and forecasts through 2030</span>
        </div>

        <section id="donutWrapper">
          <h2>Extreme poverty share</h2>
          <canvas ref={pieCanvasRef} />
          <p id="donutCaption">Share of population in extreme poverty under current filters.</p>
        </section>

        <section id="timeSliderContainer">
          <label htmlFor="timeSlider">
            Projection window
            <span id="timeSliderDays">{filters.projectionDays} days</span>
          </label>
          <input
            type="range"
            id="timeSlider"
            min="0"
            max="365"
            value={pendingFilters.projectionDays}
            onChange={(e) => setPendingFilters((prev) => ({ ...prev, projectionDays: Number(e.target.value) }))}
            onMouseUp={() => setFilters((prev) => ({ ...prev, projectionDays: pendingFilters.projectionDays }))}
            onTouchEnd={() => setFilters((prev) => ({ ...prev, projectionDays: pendingFilters.projectionDays }))}
          />
          <div id="projectedValue">
            {context ? (
              pendingFilters.projectionDays === 0 ? (
                "No projection applied. Move the slider to explore how a simple linear trend changes the numbers."
              ) : (
                `In ${pendingFilters.projectionDays} days, this simple linear trajectory would lead to about ${context.projectedPoor.toLocaleString()} people in extreme poverty (${(context.projectedRate * 100).toFixed(1)}%), ${Math.abs(context.projectedPoor - context.totalPoor).toLocaleString()} ${
                  context.projectedPoor - context.totalPoor < 0 ? "fewer" : "more"
                } than today.`
              )
            ) : (
              "Move the slider to see a simple projection on the current trajectory."
            )}
          </div>
        </section>
      </aside>

      <div id="map" ref={mapContainerRef} aria-label="Map of LGAs in Edo State" />
      <canvas id="runnerCanvas" ref={runnerCanvasRef} aria-hidden="true" />

      <aside id="rightPanel">
        <section id="premiumStats">
          <div id="premiumStatsHeader">
            <span>EDO POVERTY SNAPSHOT (DEMO)</span>
            <span className="highlight">
              <span id="premiumPercent">{context ? `${(context.povertyRate * 100).toFixed(1)}%` : "7.6%"}</span> in extreme poverty
            </span>
          </div>
          <div id="premiumBigNumber">{context ? context.totalPoor.toLocaleString() : "612,692,759"}</div>
          <div id="premiumCaption">people in this filtered view living in extreme poverty</div>
          <div id="premiumSummary">{premiumSummaryText}</div>
          <div id="premiumStatInfo">
            <div className="premium-stat-item">
              <span className="icon">✅</span>
              <span>Target escape rate</span>
              <span className="number" id="premiumTargetRate">{context ? `${context.requiredRatePerSecond.toFixed(2)} people/sec` : "3.54 people/sec"}</span>
            </div>
            <div className="premium-stat-item">
              <span className="icon">🚨</span>
              <span>Current escape rate (demo)</span>
              <span className="number" id="premiumCurrentRate">{(Math.abs(PROJECT_DAILY_CHANGE) / 86400).toFixed(2)} people/sec</span>
            </div>
            <div className="premium-stat-item">
              <span className="icon">🏃</span>
              <span>Escaped poverty today (demo)</span>
              <span className="number" id="premiumEscapedToday">12,546</span>
            </div>
            <div className="premium-stat-item">
              <span className="icon">📉</span>
              <span>Fell into poverty today (demo)</span>
              <span className="number" id="premiumFellToday">11,058</span>
            </div>
          </div>
        </section>

        <h2>SDG 1 storyline</h2>
        <section id="storyStepper">
          <div id="storyHeader">
            <span id="storyStepBadge">Step {storyIndex + 1} of {storySteps.length}</span>
            <h3 id="storyTitle">{storySteps[storyIndex]?.title}</h3>
          </div>
          <div id="storyBody" dangerouslySetInnerHTML={{ __html: context ? storySteps[storyIndex].render(context) : "<p>Loading insights…</p>" }} />
          <div id="storyFooter">
            <span id="storyScopeLabel">Scope: {context ? context.scopeLabel : "Edo State"}</span>
            <div>
              <button id="prevStory" className="storyNavBtn" type="button" disabled={storyIndex === 0} onClick={() => setStoryIndex((idx) => Math.max(0, idx - 1))}>
                Previous
              </button>
              <button id="nextStory" className="storyNavBtn" type="button" disabled={storyIndex === storySteps.length - 1} onClick={() => setStoryIndex((idx) => Math.min(storySteps.length - 1, idx + 1))}>
                Next insight
              </button>
            </div>
          </div>
        </section>

        <section id="content-trends">
          <h3>Poverty profile &amp; time-series</h3>
          <canvas id="trendChart" ref={trendCanvasRef} />
        </section>

        <section id="programPanel">
          <h3>Programme monitoring snapshot</h3>
          <div id="programSummary">
            {programSummary.stats ? (
              <>
                <p>
                  <strong>{programSummary.stats.count}</strong> demo programmes currently intersect this view.
                </p>
                <p>{programSummary.text}</p>
                <p>
                  In production, this panel can be wired to EdoLift’s programme registry to track KPIs, results and SDG 1 contributions in real time.
                </p>
              </>
            ) : (
              programSummary.text
            )}
          </div>
        </section>

        <section id="africaClockCard">
          <h3>Africa Poverty Clock – Edo</h3>
          <p id="africaClockText" dangerouslySetInnerHTML={{ __html: africaClockText }} />
        </section>
      </aside>

      <section id="filterPanel" aria-label="Filter poverty view">
        <label htmlFor="lgaFilter">Scope</label>
        <select id="lgaFilter" value={pendingFilters.lgaFilter} onChange={(e) => setPendingFilters((prev) => ({ ...prev, lgaFilter: e.target.value }))}>
          <option value="all">All LGAs</option>
          {rawRows.map((row) => (
            <option key={row.lga} value={row.lga}>
              {row.lga}
            </option>
          ))}
        </select>

        <select id="zoneFilter" value={pendingFilters.zoneFilter} onChange={(e) => setPendingFilters((prev) => ({ ...prev, zoneFilter: e.target.value as Zone | "all" }))}>
          <option value="all">All zones</option>
          {zones.map((z) => (
            <option key={z} value={z}>
              {z}
            </option>
          ))}
        </select>

        <select id="geoFilter" value={pendingFilters.geoFilter} onChange={(e) => setPendingFilters((prev) => ({ ...prev, geoFilter: e.target.value as Filters["geoFilter"] }))}>
          <option value="all">Urban &amp; rural</option>
          <option value="Urban">Urban</option>
          <option value="Rural">Rural</option>
        </select>

        <select id="demoFilter" value={pendingFilters.demoFilter} onChange={(e) => setPendingFilters((prev) => ({ ...prev, demoFilter: e.target.value as Filters["demoFilter"] }))}>
          <option value="all">All genders</option>
          <option value="females">Females</option>
          <option value="males">Males</option>
        </select>

        <label htmlFor="ageMin">Age</label>
        <input type="number" id="ageMin" min="0" max="100" value={pendingFilters.minAge} onChange={(e) => setPendingFilters((prev) => ({ ...prev, minAge: Number(e.target.value) }))} />
        <span>–</span>
        <input type="number" id="ageMax" min="0" max="100" value={pendingFilters.maxAge} onChange={(e) => setPendingFilters((prev) => ({ ...prev, maxAge: Number(e.target.value) }))} />

        <input type="file" id="csvInput" accept=".csv" title="Load CSV" onChange={(e) => e.target.files && e.target.files[0] && handleCsvUpload(e.target.files[0])} />

        <button id="applyFilters" type="button" onClick={handleApplyFilters}>
          Apply filters
        </button>
        <button id="exportCsvBtn" type="button" onClick={exportFilteredCsv}>
          Export CSV
        </button>
        <button id="exportPdfBtn" type="button" onClick={exportPdfBrief}>
          Export PDF brief
        </button>
      </section>

      <div id="methodologyBadge">
        <strong>EdoLift:</strong> AI-enhanced poverty management system integrating real-time data, forecasts, and programme tracking.
      </div>

      <div id="aboutModal" className="modalOverlay" role="dialog" aria-modal="true" aria-labelledby="aboutTitle" onClick={(evt) => evt.target === evt.currentTarget && evt.currentTarget.classList.remove("open")}>
        <div className="modal">
          <h2 id="aboutTitle">About EdoLift &amp; methodology</h2>
          <p>
            EdoLift is a modern, AI-enhanced poverty alleviation management platform for Edo State. It combines real-time monitoring, LGA-level analytics, and predictive modelling through 2030.
          </p>
          <p>
            Data can be ingested from local surveys, national statistics, international datasets and Edo State-specific monitoring systems. Forecasts can be aligned with IMF growth paths and methodologies similar to OECD-style modelling.
          </p>
          <p>
            This prototype supports: real-time poverty counters, LGA heatmaps, poverty profiles, deep dives, scenario-based forecasting, disaggregated views (gender, age, urban/rural), a data explorer, an Africa Poverty Clock lens, and programme monitoring for government, NGOs, donors, philanthropists and the general public.
          </p>
          <p>
            For production deployment, plug an API returning LGA-level poverty metrics and programme data, and document all data sources, computation methods, and limitations in this section.
          </p>
          <button type="button" id="closeAbout" onClick={() => document.getElementById("aboutModal")?.classList.remove("open")}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default EdoLiftDashboard;
