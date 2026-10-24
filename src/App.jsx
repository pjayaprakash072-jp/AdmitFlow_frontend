import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LockKeyhole,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UploadCloud,
  Users,
  Wallet,
} from "lucide-react";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import api from "./services/api";

const demoUniversities = [
  {
    _id: "u1",
    name: "Northstar Institute of Technology",
    location: "Bengaluru, Karnataka",
    tuition: 180000,
    living: 110000,
    other: 25000,
    scholarship: 30000,
    eligibility: "12th with 75% + entrance score",
    deadline: "2026-11-15",
    course: "Computer Science",
    rating: 4.7,
    type: "Sample data",
  },
  {
    _id: "u2",
    name: "Riverdale University",
    location: "Pune, Maharashtra",
    tuition: 150000,
    living: 95000,
    other: 22000,
    scholarship: 20000,
    eligibility: "12th with 70% aggregate",
    deadline: "2026-12-02",
    course: "Computer Science",
    rating: 4.4,
    type: "Sample data",
  },
  {
    _id: "u3",
    name: "Coastal School of Engineering",
    location: "Visakhapatnam, Andhra Pradesh",
    tuition: 125000,
    living: 85000,
    other: 18000,
    scholarship: 15000,
    eligibility: "12th with Mathematics and 65%",
    deadline: "2026-11-08",
    course: "Computer Science",
    rating: 4.2,
    type: "Sample data",
  },
  {
    _id: "u4",
    name: "Summit Global College",
    location: "Hyderabad, Telangana",
    tuition: 210000,
    living: 105000,
    other: 30000,
    scholarship: 40000,
    eligibility: "12th with 80% aggregate",
    deadline: "2026-12-18",
    course: "Computer Science",
    rating: 4.8,
    type: "Sample data",
  },
  {
    _id: "u5",
    name: "Greenfield University",
    location: "Chennai, Tamil Nadu",
    tuition: 135000,
    living: 90000,
    other: 20000,
    scholarship: 10000,
    eligibility: "12th with 65% aggregate",
    deadline: "2027-01-05",
    course: "Computer Science",
    rating: 4.1,
    type: "Sample data",
  },
  {
    _id: "u6",
    name: "Pioneer Technical University",
    location: "Mysuru, Karnataka",
    tuition: 165000,
    living: 80000,
    other: 21000,
    scholarship: 25000,
    eligibility: "12th with 70% + mathematics",
    deadline: "2026-11-28",
    course: "Computer Science",
    rating: 4.3,
    type: "Sample data",
  },
];
const money = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(n || 0));
function Card({ children, className = "" }) {
  return (
    <section className={`surface p-5 md:p-6 ${className}`}>{children}</section>
  );
}
function Heading({ eyebrow, title, desc, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-extrabold uppercase tracking-[.18em] text-teal-700 dark:text-teal-300">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-black tracking-tight md:text-3xl dark:text-white">
          {title}
        </h1>
        {desc && <p className="muted mt-2 max-w-2xl">{desc}</p>}
      </div>
      {action}
    </div>
  );
}
function Stat({ icon: Icon, label, value, foot }) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="muted text-sm font-semibold">{label}</p>
          <p className="mt-2 text-2xl font-black dark:text-white">{value}</p>
          <p className="muted mt-1 text-xs">{foot}</p>
        </div>
        <span className="rounded-xl bg-teal-50 p-3 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
          <Icon size={22} />
        </span>
      </div>
    </Card>
  );
}
function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="grid items-center gap-10 py-8 md:grid-cols-[1.1fr_.9fr] md:py-16">
        <div>
          <span className="badge mb-5">
            <Sparkles size={14} className="mr-1" /> Your admission command
            centre
          </span>
          <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight md:text-6xl dark:text-white">
            Every university application.{" "}
            <span className="text-teal-600">One clear plan.</span>
          </h1>
          <p className="muted mt-5 max-w-xl text-lg leading-8">
            Compare colleges, understand the real cost, keep deadlines on track,
            and manage documents securely — all in one place.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/register" className="btn btn-primary">
              Create free account <ArrowRight size={17} />
            </Link>
            <Link to="/universities" className="btn btn-secondary">
              Explore universities
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold muted">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-teal-600" /> Deadline
              reminders
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={17} className="text-teal-600" /> Parent privacy
              controls
            </span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-teal-200/50 to-cyan-100/20 blur-xl dark:from-teal-900/30"></div>
          <Card className="relative !p-6 shadow-xl shadow-slate-200/50 dark:shadow-black/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="muted text-sm">Your application overview</p>
                <h3 className="mt-1 text-xl font-extrabold dark:text-white">
                  Fall 2027 intake
                </h3>
              </div>
              <span className="rounded-xl bg-teal-50 p-3 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                <LayoutDashboard />
              </span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="muted text-sm">Universities</p>
                <p className="mt-1 text-3xl font-black">06</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="muted text-sm">Next deadline</p>
                <p className="mt-1 text-2xl font-black">15 Nov</p>
              </div>
            </div>
            <div className="mt-5 space-y-4">
              {[
                ["Documents verified", 75],
                ["Applications prepared", 55],
                ["Budget plan", 90],
              ].map(([x, n]) => (
                <div key={x}>
                  <div className="mb-2 flex justify-between text-sm font-semibold">
                    <span>{x}</span>
                    <span className="muted">{n}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-2 rounded-full bg-teal-600"
                      style={{ width: `${n}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="muted mt-5 text-xs">
              Illustrative preview — sample values only.
            </p>
          </Card>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [
            GraduationCap,
            "Compare universities",
            "Rank by fees, location, eligibility and scholarships.",
          ],
          [
            Wallet,
            "Plan your budget",
            "Estimate total costs and scholarship savings.",
          ],
          [
            CalendarDays,
            "Never miss a date",
            "Keep application deadlines and tasks in view.",
          ],
          [
            LockKeyhole,
            "Share safely",
            "Let parents see only information you permit.",
          ],
        ].map(([Icon, t, d]) => (
          <Card key={t}>
            <Icon className="text-teal-700 dark:text-teal-300" size={25} />
            <h3 className="mt-4 font-extrabold dark:text-white">{t}</h3>
            <p className="muted mt-2 text-sm leading-6">{d}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
function Dashboard({ user, applications, setApplications, universities }) {
  const next = [...applications]
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);
  const count = applications.length;
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Heading
        eyebrow="Student workspace"
        title={`Welcome back, ${user?.name?.split(" ")[0] || "student"} 👋`}
        desc="Your applications, next steps, and important updates in one view."
        action={
          <Link to="/universities" className="btn btn-primary">
            Add university <ArrowRight size={16} />
          </Link>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          icon={GraduationCap}
          label="Applications"
          value={count}
          foot="Universities in your tracker"
        />
        <Stat
          icon={CalendarDays}
          label="Upcoming deadlines"
          value={
            applications.filter((a) => new Date(a.deadline) >= new Date())
              .length
          }
          foot="Dates to keep an eye on"
        />
        <Stat
          icon={FileText}
          label="Documents"
          value="Manage"
          foot="Upload to Cloudinary"
        />
        <Stat
          icon={Wallet}
          label="Budget planner"
          value="Ready"
          foot="Estimate total study costs"
        />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_.8fr]">
        <Card>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-extrabold dark:text-white">
              Application tracker
            </h2>
            <Link className="navlink" to="/deadlines">
              All deadlines <ChevronRight className="inline" size={16} />
            </Link>
          </div>
          {applications.length ? (
            <div className="space-y-3">
              {applications.map((a) => (
                <div
                  key={a._id || a.universityId}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 p-4 dark:border-slate-800"
                >
                  <div>
                    <p className="font-bold dark:text-white">
                      {a.universityName ||
                        universities.find((u) => u._id === a.universityId)
                          ?.name ||
                        "University application"}
                    </p>
                    <p className="muted mt-1 text-sm">
                      Deadline:{" "}
                      {new Date(a.deadline).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <select
                    className="field !w-auto !py-2 text-sm"
                    value={a.status || "In Progress"}
                    onChange={async (e) => {
                      const updated = { ...a, status: e.target.value };
                      setApplications((old) =>
                        old.map((x) =>
                          (x._id || x.universityId) ===
                          (a._id || a.universityId)
                            ? updated
                            : x,
                        ),
                      );
                      try {
                        if (a._id)
                          await api.patch(`/applications/${a._id}`, {
                            status: e.target.value,
                          });
                      } catch {}
                    }}
                  >
                    <option>Not Started</option>
                    <option>In Progress</option>
                    <option>Submitted</option>
                    <option>Correction Required</option>
                  </select>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-slate-50 p-8 text-center dark:bg-slate-900">
              <GraduationCap className="mx-auto text-teal-700" size={34} />
              <p className="mt-3 font-bold">
                Your application list starts here
              </p>
              <p className="muted mt-1 text-sm">
                Choose universities and add them to your tracker.
              </p>
              <Link to="/universities" className="btn btn-primary mt-4">
                Browse universities
              </Link>
            </div>
          )}
        </Card>
        <Card>
          <h2 className="text-lg font-extrabold dark:text-white">
            Your next steps
          </h2>
          <div className="mt-5 space-y-5">
            {[
              [
                CheckCircle2,
                "Complete your profile",
                "Add course preferences and budget.",
              ],
              [
                UploadCloud,
                "Prepare your documents",
                "Upload transcripts and certificates.",
              ],
              [Bell, "Review deadlines", "Check upcoming dates weekly."],
            ].map(([I, t, d]) => (
              <div className="flex gap-3" key={t}>
                <span className="rounded-lg bg-teal-50 p-2 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                  <I size={19} />
                </span>
                <div>
                  <p className="font-bold dark:text-white">{t}</p>
                  <p className="muted mt-1 text-sm">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
function Universities({ universities, applications, addApplication }) {
  const [search, setSearch] = useState(""),
    [city, setCity] = useState("All locations");
  const cities = [
    "All locations",
    ...new Set(universities.map((u) => u.location.split(", ").slice(-1)[0])),
  ];
  const rows = universities.filter(
    (u) =>
      (u.name + " " + u.location + " " + u.course)
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (city === "All locations" || u.location.endsWith(city)),
  );
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Heading
        eyebrow="University directory"
        title="Find your best-fit university"
        desc="Fictional sample data for demonstration. Verify every admission detail with the university."
      />
      <div className="mb-5 grid gap-3 md:grid-cols-[1fr_240px]">
        <div className="relative">
          <Search className="muted absolute left-3 top-3" size={18} />
          <input
            className="field pl-10"
            placeholder="Search university, course, location…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="field"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          {cities.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {rows.map((u) => {
          const added = applications.some(
            (a) => a.universityId === u._id || a.university?._id === u._id,
          );
          return (
            <Card key={u._id}>
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                  <GraduationCap size={24} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-extrabold dark:text-white">{u.name}</h3>
                    <span className="badge">Demo data</span>
                  </div>
                  <p className="muted mt-1 flex items-center gap-1 text-sm">
                    <MapPin size={14} />
                    {u.location}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900">
                      <p className="muted text-xs">Net estimated cost/year</p>
                      <p className="mt-1 font-extrabold">
                        {money(u.tuition + u.living + u.other - u.scholarship)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900">
                      <p className="muted text-xs">Application deadline</p>
                      <p className="mt-1 font-extrabold">
                        {new Date(u.deadline).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="muted mt-3 text-sm">
                    <b>Eligibility:</b> {u.eligibility}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      disabled={added}
                      className={`btn ${added ? "btn-secondary" : "btn-primary"} text-sm`}
                      onClick={() => addApplication(u)}
                    >
                      {added ? "Added to tracker" : "Add to applications"}
                    </button>
                    <Link to="/compare" className="btn btn-secondary text-sm">
                      Compare
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      {!rows.length && <Card>No matching universities found.</Card>}
    </main>
  );
}
function Compare({ universities }) {
  const [selected, setSelected] = useState(
      universities.slice(0, 3).map((u) => u._id),
    ),
    [weights, setWeights] = useState({
      cost: 50,
      scholarship: 25,
      location: 15,
      eligibility: 10,
    });
  const toggle = (id) =>
    setSelected((s) =>
      s.includes(id)
        ? s.filter((x) => x !== id)
        : s.length < 4
          ? [...s, id]
          : s,
    );
  const ranked = universities
    .filter((u) => selected.includes(u._id))
    .map((u) => ({
      ...u,
      total: u.tuition + u.living + u.other - u.scholarship,
      score: Math.round(
        (((1 - (u.tuition + u.living + u.other - u.scholarship) / 500000) *
          weights.cost) /
          100) *
          100 +
          (((u.scholarship / 50000) * weights.scholarship) / 100) * 100 +
          weights.location * 0.35 +
          weights.eligibility * 0.35,
      ),
    }))
    .sort((a, b) => b.score - a.score);
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Heading
        eyebrow="Decision studio"
        title="Compare universities"
        desc="Select up to four universities. The score is an illustrative weighted comparison, not an official ranking."
      />
      <Card>
        <h2 className="font-extrabold dark:text-white">Choose universities</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {universities.map((u) => (
            <button
              key={u._id}
              onClick={() => toggle(u._id)}
              className={`rounded-full border px-3 py-2 text-sm font-semibold ${selected.includes(u._id) ? "border-teal-700 bg-teal-50 text-teal-800 dark:bg-teal-950 dark:text-teal-200" : "border-slate-200 muted dark:border-slate-700"}`}
            >
              {selected.includes(u._id) ? "✓ " : ""}
              {u.name.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(weights).map(([key, val]) => (
            <label
              key={key}
              className="text-sm font-bold capitalize dark:text-slate-200"
            >
              {key} priority <span className="muted float-right">{val}</span>
              <input
                type="range"
                min="0"
                max="100"
                value={val}
                onChange={(e) =>
                  setWeights((w) => ({ ...w, [key]: Number(e.target.value) }))
                }
                className="mt-2 w-full accent-teal-700"
              />
            </label>
          ))}
        </div>
      </Card>
      <div className="mt-5 overflow-x-auto surface">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr>
              {[
                "University",
                "Tuition",
                "Living",
                "Scholarship",
                "Estimated net cost",
                "Eligibility",
                "Score",
              ].map((x) => (
                <th className="px-4 py-4 font-extrabold" key={x}>
                  {x}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ranked.map((u, i) => (
              <tr
                className="border-t border-slate-100 dark:border-slate-800"
                key={u._id}
              >
                <td className="px-4 py-4 font-bold">
                  {i === 0 && <span className="badge mr-2">Top fit</span>}
                  {u.name}
                </td>
                <td className="px-4 py-4">{money(u.tuition)}</td>
                <td className="px-4 py-4">{money(u.living + u.other)}</td>
                <td className="px-4 py-4">{money(u.scholarship)}</td>
                <td className="px-4 py-4 font-extrabold">{money(u.total)}</td>
                <td className="px-4 py-4">{u.eligibility}</td>
                <td className="px-4 py-4">
                  {Math.max(1, Math.min(99, u.score))}/100
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
function CostCalculator({ universities }) {
  const [university, setUniversity] = useState(universities[0]?._id || ""),
    [tuition, setTuition] = useState("180000"),
    [living, setLiving] = useState("110000"),
    [other, setOther] = useState("25000"),
    [scholarship, setScholarship] = useState("30000"),
    [budget, setBudget] = useState("300000");
  const choose = (id) => {
    setUniversity(id);
    const u = universities.find((x) => x._id === id);
    if (u) {
      setTuition(String(u.tuition));
      setLiving(String(u.living));
      setOther(String(u.other));
      setScholarship(String(u.scholarship));
    }
  };
  const total =
      Math.max(0, +tuition || 0) +
      Math.max(0, +living || 0) +
      Math.max(0, +other || 0) -
      Math.max(0, +scholarship || 0),
    fit = total <= Math.max(0, +budget || 0);
  const fields = [
    ["Tuition fees", tuition, setTuition],
    ["Hostel / living", living, setLiving],
    ["Other fees", other, setOther],
    ["Scholarships", scholarship, setScholarship],
    ["Your yearly budget", budget, setBudget],
  ];
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
      <Heading
        eyebrow="Financial planner"
        title="Know the real cost"
        desc="Adjust each amount to estimate your annual study budget in Indian rupees."
      />
      <div className="grid gap-5 md:grid-cols-[1.1fr_.9fr]">
        <Card>
          <label className="mb-2 block text-sm font-bold">
            Start with sample university
          </label>
          <select
            className="field mb-5"
            value={university}
            onChange={(e) => choose(e.target.value)}
          >
            {universities.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map(([label, value, set]) => (
              <label className="text-sm font-bold" key={label}>
                {label}
                <div className="relative mt-2">
                  <span className="muted absolute left-3 top-3">₹</span>
                  <input
                    className="field pl-8"
                    type="number"
                    min="0"
                    value={value}
                    onChange={(e) => set(e.target.value)}
                  />
                </div>
              </label>
            ))}
          </div>
        </Card>
        <Card className="flex flex-col">
          <span className="badge w-fit">Annual estimate</span>
          <p className="muted mt-5 text-sm">
            Estimated total after scholarship
          </p>
          <p className="mt-2 text-4xl font-black tracking-tight dark:text-white">
            {money(total)}
          </p>
          <div
            className={`mt-5 rounded-xl p-4 ${fit ? "bg-teal-50 text-teal-900 dark:bg-teal-950 dark:text-teal-100" : "bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-100"}`}
          >
            <p className="font-extrabold">
              {fit ? "Within your budget" : "Over your budget"}
            </p>
            <p className="mt-1 text-sm">
              {fit
                ? `${money(+budget - total)} remaining in your yearly budget`
                : `You need ${money(total - (+budget || 0))} more per year`}
            </p>
          </div>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="muted">Total before scholarship</span>
              <b>{money((+tuition || 0) + (+living || 0) + (+other || 0))}</b>
            </div>
            <div className="flex justify-between">
              <span className="muted">Scholarship savings</span>
              <b className="text-teal-700 dark:text-teal-300">
                −{money(scholarship)}
              </b>
            </div>
          </div>
          <p className="muted mt-auto pt-6 text-xs">
            Planning estimate only. Confirm fees, living costs and scholarship
            eligibility with the institution.
          </p>
        </Card>
      </div>
    </main>
  );
}
function Deadlines({ applications, universities }) {
  const items = applications
    .map((a) => ({
      ...a,
      name:
        a.universityName ||
        universities.find((u) => u._id === a.universityId)?.name ||
        "University",
      date: a.deadline,
      status: a.status || "In Progress",
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
      <Heading
        eyebrow="Stay ahead"
        title="Deadline tracker"
        desc="Upcoming application dates and current status. Sample dates are not official university deadlines."
      />
      <Card>
        <div className="space-y-4">
          {items.length ? (
            items.map((a, i) => (
              <div key={a._id || a.universityId} className="flex gap-4">
                <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-teal-50 py-3 text-teal-800 dark:bg-teal-950 dark:text-teal-200">
                  <span className="text-xs font-bold uppercase">
                    {new Date(a.date).toLocaleDateString("en-IN", {
                      month: "short",
                    })}
                  </span>
                  <span className="text-2xl font-black">
                    {new Date(a.date).getDate()}
                  </span>
                </div>
                <div className="flex-1 border-b border-slate-100 pb-4 dark:border-slate-800">
                  <p className="font-extrabold dark:text-white">{a.name}</p>
                  <p className="muted mt-1 text-sm">
                    Deadline ·{" "}
                    {new Date(a.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <span className="badge mt-2">{a.status}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-10 text-center">
              <CalendarDays className="mx-auto text-teal-700" size={35} />
              <p className="mt-3 font-bold">No deadlines yet</p>
              <p className="muted mt-1 text-sm">
                Add universities to your tracker to see dates here.
              </p>
              <Link to="/universities" className="btn btn-primary mt-4">
                Find universities
              </Link>
            </div>
          )}
        </div>
      </Card>
    </main>
  );
}
function Documents({ universities, user }) {
  const [file, setFile] = useState(null),
    [university, setUniversity] = useState(universities[0]?._id || ""),
    [kind, setKind] = useState("Transcript"),
    [docs, setDocs] = useState([]),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  useEffect(() => {
    if (user)
      api
        .get("/documents")
        .then((r) => setDocs(r.data))
        .catch(() => {});
  }, [user]);
  async function upload(e) {
    e.preventDefault();
    setMessage("");
    if (!file) {
      setMessage("Choose a document first.");
      return;
    }
    const allowed = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowed.includes(file.type)) {
      setMessage("Blocked: upload a PDF, JPG, or PNG file.");
      return;
    }
    if (!university) {
      setMessage("Choose the target university.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setMessage("File must be smaller than 10 MB.");
      return;
    }
    setBusy(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("universityId", university);
      data.append("documentType", kind);
      const res = await api.post("/documents", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDocs((d) => [res.data, ...d]);
      setMessage("Upload complete — file stored in Cloudinary.");
      setFile(null);
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "Upload failed. Check backend and Cloudinary configuration.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
      <Heading
        eyebrow="Secure file cabinet"
        title="Document manager"
        desc="Choose the document type and target university. Incorrect file types are blocked before upload."
      />
      <div className="grid gap-5 md:grid-cols-[.9fr_1.1fr]">
        <Card>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-xl bg-teal-50 p-3 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
              <UploadCloud />
            </span>
            <div>
              <h2 className="font-extrabold dark:text-white">
                Upload a document
              </h2>
              <p className="muted text-sm">PDF, JPG or PNG · Max 10 MB</p>
            </div>
          </div>
          <form onSubmit={upload} className="space-y-4">
            <label className="block text-sm font-bold">
              Document type
              <select
                className="field mt-2"
                value={kind}
                onChange={(e) => setKind(e.target.value)}
              >
                {[
                  "Transcript",
                  "Identity proof",
                  "Test score",
                  "Recommendation letter",
                  "Financial document",
                  "Personal essay",
                  "Other",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-bold">
              Target university
              <select
                className="field mt-2"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              >
                {universities.map((u) => (
                  <option value={u._id} key={u._id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block cursor-pointer rounded-xl border-2 border-dashed border-slate-200 p-6 text-center dark:border-slate-700">
              <UploadCloud className="mx-auto text-teal-700" size={28} />
              <p className="mt-2 text-sm font-bold">
                {file ? file.name : "Choose a file to upload"}
              </p>
              <p className="muted mt-1 text-xs">
                Your document remains private to your account
              </p>
              <input
                className="mt-3 block w-full text-sm"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>
            <button className="btn btn-primary w-full" disabled={busy}>
              {busy ? "Uploading…" : "Validate and upload"}
            </button>
            {message && (
              <p
                role="status"
                className="rounded-lg bg-slate-50 p-3 text-sm dark:bg-slate-900"
              >
                {message}
              </p>
            )}
          </form>
          <p className="muted mt-4 text-xs">
            Cloudinary credentials are required for real uploads. Documents are
            not saved to local server storage.
          </p>
        </Card>
        <Card>
          <h2 className="font-extrabold dark:text-white">
            Your uploaded documents
          </h2>
          <div className="mt-4 space-y-3">
            {docs.length ? (
              docs.map((d) => (
                <div
                  key={d._id}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 dark:border-slate-800"
                >
                  <FileText className="shrink-0 text-teal-700" size={22} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold">
                      {d.originalName || d.documentType}
                    </p>
                    <p className="muted mt-1 text-xs">
                      {d.documentType} ·{" "}
                      {d.universityName || "Target university"} ·{" "}
                      {d.status || "Uploaded"}
                    </p>
                  </div>
                  {d.fileUrl && (
                    <a
                      className="navlink"
                      href={d.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open
                    </a>
                  )}
                </div>
              ))
            ) : (
              <div className="rounded-xl bg-slate-50 p-8 text-center dark:bg-slate-900">
                <FileText className="mx-auto text-slate-400" size={30} />
                <p className="mt-3 font-bold">No documents uploaded</p>
                <p className="muted mt-1 text-sm">
                  Your uploaded files will appear here.
                </p>
              </div>
            )}
          </div>
          <div className="mt-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-100">
            <b>Privacy reminder:</b> Do not upload sensitive documents to a
            shared/public computer. A university’s required document list should
            be checked before submitting.
          </div>
        </Card>
      </div>
    </main>
  );
}
function Auth({ mode, onAuth }) {
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [role, setRole] = useState("student"),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const r = await api.post(
        `/auth/${mode}`,
        mode === "register"
          ? { name, email, password, role }
          : { email, password },
      );
      onAuth(r.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not connect. Ensure the backend is running.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="mx-auto grid min-h-[75vh] max-w-6xl items-center gap-10 px-4 py-10 md:grid-cols-2 lg:px-8">
      <div>
        <span className="badge">ADMISSIONS, WITHOUT THE CHAOS</span>
        <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl dark:text-white">
          {mode === "login"
            ? "Welcome back to your plan."
            : "Start your next chapter with clarity."}
        </h1>
        <p className="muted mt-4 max-w-md leading-7">
          One place for your university shortlist, costs, deadlines, and
          documents — with privacy controls built in.
        </p>
        <div className="mt-7 space-y-3 text-sm font-semibold">
          <p className="flex gap-2">
            <CheckCircle2 className="text-teal-700" size={19} /> A clearer view
            of every application
          </p>
          <p className="flex gap-2">
            <CheckCircle2 className="text-teal-700" size={19} /> Keep documents
            organized by university
          </p>
          <p className="flex gap-2">
            <ShieldCheck className="text-teal-700" size={19} /> Share only what
            you choose
          </p>
        </div>
      </div>
      <Card className="mx-auto w-full max-w-md">
        <h2 className="text-2xl font-black dark:text-white">
          {mode === "login" ? "Log in" : "Create your account"}
        </h2>
        <p className="muted mt-2 text-sm">
          {mode === "login"
            ? "Continue managing your applications."
            : "Get your admission plan organized today."}
        </p>
        <form className="mt-6 space-y-4" onSubmit={submit}>
          {mode === "register" && (
            <label className="block text-sm font-bold">
              Full name
              <input
                required
                className="field mt-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </label>
          )}
          <label className="block text-sm font-bold">
            Email address
            <input
              required
              type="email"
              className="field mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>
          <label className="block text-sm font-bold">
            Password
            <input
              required
              minLength="8"
              type="password"
              className="field mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
            />
          </label>
          {mode === "register" && (
            <label className="block text-sm font-bold">
              Account type
              <select
                className="field mt-2"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="parent">Parent</option>
              </select>
              <span className="muted mt-1 block text-xs">
                Parent accounts only show permitted summaries.
              </span>
            </label>
          )}
          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-200">
              {error}
            </p>
          )}
          <button className="btn btn-primary w-full" disabled={busy}>
            {busy
              ? "Please wait…"
              : mode === "login"
                ? "Log in"
                : "Create account"}{" "}
            <ArrowRight size={16} />
          </button>
        </form>
        <p className="muted mt-5 text-center text-sm">
          {mode === "login"
            ? "New to AdmitFlow? "
            : "Already have an account? "}
          <Link
            className="font-bold text-teal-700 dark:text-teal-300"
            to={mode === "login" ? "/register" : "/login"}
          >
            {mode === "login" ? "Create an account" : "Log in"}
          </Link>
        </p>
      </Card>
    </main>
  );
}
function ParentDashboard({ user }) {
  const [summary, setSummary] = useState(null),
    [share, setShare] = useState(true),
    [msg, setMsg] = useState("");
  useEffect(() => {
    api
      .get("/parent/summary")
      .then((r) => setSummary(r.data))
      .catch((e) =>
        setMsg(
          e.response?.data?.message ||
            "Parent summary is available to parent accounts only.",
        ),
      );
  }, []);
  async function toggle() {
    try {
      const r = await api.patch("/parent/sharing", { enabled: !share });
      setShare(r.data.enabled);
    } catch (e) {
      setMsg(
        e.response?.data?.message ||
          "Only a student can update sharing permissions.",
      );
    }
  }
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
      <Heading
        eyebrow="Family view"
        title="Parent dashboard"
        desc="A limited overview designed to support the student without exposing private essays or files."
      />
      <Card>
        <div className="flex items-start gap-4">
          <span className="rounded-xl bg-teal-50 p-3 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
            <Users />
          </span>
          <div className="flex-1">
            <h2 className="font-extrabold dark:text-white">
              Privacy-first sharing
            </h2>
            <p className="muted mt-1 text-sm">
              Only financial summaries and application status are exposed by
              this endpoint. Private essays and document URLs are excluded.
            </p>
            {summary && (
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="muted text-sm">Applications</p>
                  <p className="mt-1 text-2xl font-black">
                    {summary.applicationCount ?? 0}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="muted text-sm">Estimated budget</p>
                  <p className="mt-1 text-2xl font-black">
                    {money(summary.estimatedBudget ?? 0)}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="muted text-sm">Student sharing</p>
                  <p className="mt-1 text-lg font-black">
                    {summary.sharingEnabled ? "Enabled" : "Disabled"}
                  </p>
                </div>
              </div>
            )}
            {msg && (
              <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-100">
                {msg}
              </p>
            )}
            <p className="muted mt-5 text-xs">
              To see a summary, sign in with a parent account linked to a
              student in the backend. Linking workflow is a production
              follow-up.
            </p>
          </div>
        </div>
      </Card>
    </main>
  );
}
function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-4xl font-black">Page not found</h1>
      <p className="muted mt-3">The page you requested does not exist.</p>
      <Link to="/" className="btn btn-primary mt-5">
        Go home
      </Link>
    </main>
  );
}
export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("admitflow_user"));
    } catch {
      return null;
    }
  });
  const [theme, setTheme] = useState(
    () => localStorage.getItem("admitflow_theme") || "light",
  );
  const [universities, setUniversities] = useState(demoUniversities);
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("admitflow_theme", theme);
  }, [theme]);
  useEffect(() => {
    api
      .get("/universities")
      .then((r) => {
        if (r.data?.length) setUniversities(r.data);
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    if (user)
      api
        .get("/applications")
        .then((r) => setApplications(r.data))
        .catch(() => {
          setApplications(
            JSON.parse(localStorage.getItem("admitflow_apps") || "[]"),
          );
        });
    else
      setApplications(
        JSON.parse(localStorage.getItem("admitflow_apps") || "[]"),
      );
  }, [user]);
  useEffect(() => {
    localStorage.setItem("admitflow_apps", JSON.stringify(applications));
  }, [applications]);
  function auth(data) {
    const u = data.user || data;
    setUser(u);
    localStorage.setItem("admitflow_user", JSON.stringify(u));
    if (data.token) {
      localStorage.setItem("admitflow_token", data.token);
    }
    navigate(u.role === "parent" ? "/parent" : "/dashboard");
  }
  function logout() {
    setUser(null);
    localStorage.removeItem("admitflow_user");
    localStorage.removeItem("admitflow_token");
    navigate("/");
  }
  async function addApplication(u) {
    const existing = applications.some(
      (a) => a.universityId === u._id || a.university?._id === u._id,
    );
    if (existing) return;
    const draft = {
      universityId: u._id,
      universityName: u.name,
      deadline: u.deadline,
      status: "Not Started",
    };
    try {
      if (user) {
        const r = await api.post("/applications", draft);
        setApplications((old) => [r.data, ...old]);
      } else {
        setApplications((old) => [{ ...draft, _id: u._id }, ...old]);
        navigate("/register");
      }
    } catch {
      setApplications((old) => [{ ...draft, _id: u._id }, ...old]);
    }
  }
  return (
    <div className="min-h-screen">
      <Navbar
        user={user}
        theme={theme}
        toggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        logout={logout}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <Auth mode="login" onAuth={auth} />
            )
          }
        />
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <Auth mode="register" onAuth={auth} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              user={user}
              applications={applications}
              setApplications={setApplications}
              universities={universities}
            />
          }
        />
        <Route
          path="/universities"
          element={
            <Universities
              universities={universities}
              applications={applications}
              addApplication={addApplication}
            />
          }
        />
        <Route
          path="/compare"
          element={<Compare universities={universities} />}
        />
        <Route
          path="/cost"
          element={<CostCalculator universities={universities} />}
        />
        <Route
          path="/deadlines"
          element={
            <Deadlines
              applications={applications}
              universities={universities}
            />
          }
        />
        <Route
          path="/documents"
          element={
            <ProtectedRoute user={user}>
              <Documents universities={universities} user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent"
          element={
            <ProtectedRoute user={user}>
              <ParentDashboard user={user} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className="mt-12 border-t border-slate-200 py-6 dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 text-xs muted lg:px-8">
          <span className="font-bold">© 2026 AdmitFlow</span>
          <span>
            Sample university data · Verify official requirements before
            applying
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck size={14} /> Privacy by design
          </span>
        </div>
      </footer>
    </div>
  );
}
