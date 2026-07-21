const STORAGE_KEY = "strength-journal-recorder-v2";

const catalogue = [
  { id: "bench", name: "杠铃卧推", group: "胸部", subgroup: "胸部整体", muscles: ["胸大肌", "肱三头", "三角肌前束"], equipment: "杠铃", load: "中等到大重量", reps: "5–10 次", tips: ["肩胛骨向后下方稳定，双脚踩稳", "手腕保持中立，杠铃受控下降", "尝试大重量时使用保护杆或请人保护"] },
  { id: "incline", name: "上斜哑铃卧推", group: "胸部", subgroup: "上胸", muscles: ["胸大肌上部", "肱三头"], equipment: "哑铃", load: "中等重量", reps: "8–12 次", tips: ["凳面保持适度上斜，避免角度过高变成肩推", "肩胛稳定，哑铃向上内侧推起", "不要用反弹完成底部动作"] },
  { id: "chestpress", name: "器械推胸", group: "胸部", subgroup: "胸部整体", muscles: ["胸大肌", "肱三头"], equipment: "器械", load: "中等重量", reps: "8–15 次", tips: ["调整座椅使把手接近胸部中线", "背部贴住靠垫，避免耸肩", "在可控制范围内完成全程"] },
  { id: "fly", name: "绳索夹胸", group: "胸部", subgroup: "胸部孤立", muscles: ["胸大肌"], equipment: "绳索", load: "小到中等重量", reps: "10–20 次", tips: ["肘部保持轻微弯曲并固定角度", "用胸部合拢手臂，不要变成推举", "肩前侧不适时缩短幅度"] },

  { id: "pulldown", name: "高位下拉", group: "背部", subgroup: "垂直拉", muscles: ["背阔肌", "肱二头"], equipment: "器械", load: "中等重量", reps: "8–12 次", tips: ["先下沉肩胛，再将肘部拉向身体两侧", "躯干只轻微后倾，避免借力摇摆", "拉到胸前，不要拉到颈后"] },
  { id: "pullup", name: "引体向上", group: "背部", subgroup: "垂直拉", muscles: ["背阔肌", "肱二头"], equipment: "单杠", load: "自重或附加重量", reps: "4–12 次", tips: ["从肩胛稳定开始，不要耸肩悬挂", "保持躯干稳定，避免大幅摆动", "能力不足时使用辅助器械或弹力带"] },
  { id: "row", name: "坐姿划船", group: "背部", subgroup: "水平拉", muscles: ["背阔肌", "菱形肌", "肱二头"], equipment: "器械", load: "中等重量", reps: "8–15 次", tips: ["保持脊柱中立和胸廓稳定", "肘部向后拉，结束时避免过度后仰", "回程受控，让肩胛自然前伸"] },
  { id: "dbrow", name: "单臂哑铃划船", group: "背部", subgroup: "水平拉", muscles: ["背阔肌", "肱二头"], equipment: "哑铃", load: "中等重量", reps: "8–15 次/侧", tips: ["支撑侧保持稳定，避免身体旋转", "将肘部拉向髋部而不是耸肩", "下放时保持控制"] },

  { id: "press", name: "哑铃推举", group: "肩部", subgroup: "前束/整体", muscles: ["三角肌前束", "三角肌中束", "肱三头"], equipment: "哑铃", load: "中等重量", reps: "6–12 次", tips: ["收紧躯干，避免腰部过度反弓", "手腕与前臂保持对齐", "肩部不适时使用中立握法"] },
  { id: "raise", name: "哑铃侧平举", group: "肩部", subgroup: "中束", muscles: ["三角肌中束"], equipment: "哑铃", load: "小重量", reps: "12–20 次", tips: ["用肩部抬起，不要靠身体摆动", "手臂在舒适角度内抬至接近肩高", "保持手腕自然，避免刻意向内旋转"] },
  { id: "reversefly", name: "反向飞鸟", group: "肩部", subgroup: "后束", muscles: ["三角肌后束", "上背部"], equipment: "器械", load: "小到中等重量", reps: "12–20 次", tips: ["胸部稳定贴靠垫", "手臂向两侧打开，不要耸肩", "控制回程，不让重量片撞击"] },
  { id: "facepull", name: "绳索面拉", group: "肩部", subgroup: "后束/肩袖", muscles: ["三角肌后束", "肩袖", "上背部"], equipment: "绳索", load: "小到中等重量", reps: "12–20 次", tips: ["绳索拉向眉眼高度", "结束时双手分开、肘部向外", "保持肋骨稳定，不要后仰借力"] },

  { id: "curl", name: "哑铃弯举", group: "手臂", subgroup: "肱二头", muscles: ["肱二头"], equipment: "哑铃", load: "小到中等重量", reps: "8–15 次", tips: ["上臂保持稳定，避免肘部前移", "不要用腰部摆动借力", "下放阶段保持控制"] },
  { id: "hammer", name: "锤式弯举", group: "手臂", subgroup: "肱二头/前臂", muscles: ["肱肌", "肱桡肌"], equipment: "哑铃", load: "中等重量", reps: "8–15 次", tips: ["保持中立握法和手腕稳定", "肘部靠近身体两侧", "避免用肩部抬起哑铃"] },
  { id: "pushdown", name: "绳索下压", group: "手臂", subgroup: "肱三头", muscles: ["肱三头"], equipment: "绳索", load: "小到中等重量", reps: "10–20 次", tips: ["上臂固定在身体两侧", "伸肘完成动作，不要压肩借力", "回程不要让肘部明显前移"] },
  { id: "overheadtri", name: "绳索过顶臂屈伸", group: "手臂", subgroup: "肱三头", muscles: ["肱三头长头"], equipment: "绳索", load: "小到中等重量", reps: "10–20 次", tips: ["躯干稳定，避免腰部过度伸展", "肘部方向保持相对固定", "肩肘不适时缩小幅度或换动作"] },

  { id: "squat", name: "杠铃深蹲", group: "腿", subgroup: "股四头/臀部", muscles: ["股四头肌", "臀大肌", "躯干"], equipment: "杠铃", load: "中等到大重量", reps: "4–10 次", tips: ["脚掌保持稳定，膝盖方向与脚尖一致", "保持脊柱和躯干稳定，在可控深度下蹲", "尝试大重量时使用安全杆或请人保护"] },
  { id: "legpress", name: "腿举", group: "腿", subgroup: "股四头/臀部", muscles: ["股四头肌", "臀大肌"], equipment: "器械", load: "中等到大重量", reps: "8–15 次", tips: ["腰背和臀部保持贴靠垫", "膝盖与脚尖方向一致", "不要在顶部锁死膝盖或让下背卷起"] },
  { id: "rdl", name: "罗马尼亚硬拉", group: "腿", subgroup: "腘绳肌/臀部", muscles: ["腘绳肌", "臀大肌", "竖脊肌"], equipment: "杠铃", load: "中等重量", reps: "6–12 次", tips: ["髋部向后移动，保持脊柱中立", "杠铃贴近腿部下降", "只下降到能保持控制和背部位置的深度"] },
  { id: "legcurl", name: "坐姿腿弯举", group: "腿", subgroup: "腘绳肌", muscles: ["腘绳肌"], equipment: "器械", load: "中等重量", reps: "10–15 次", tips: ["调整转轴与膝关节大致对齐", "臀部保持贴住座椅", "全程受控，不用惯性甩动"] },
  { id: "legextension", name: "腿屈伸", group: "腿", subgroup: "股四头", muscles: ["股四头肌"], equipment: "器械", load: "小到中等重量", reps: "10–20 次", tips: ["调整器械转轴与膝关节对齐", "受控伸膝，不用惯性踢起", "膝部不适时减轻重量并缩小幅度"] },
  { id: "calf", name: "站姿提踵", group: "腿", subgroup: "小腿", muscles: ["腓肠肌", "比目鱼肌"], equipment: "器械", load: "中等重量", reps: "10–20 次", tips: ["脚踝在可控范围内充分抬起和下降", "避免快速弹震", "保持膝盖和脚掌方向稳定"] },

  { id: "dbbench", name: "平板哑铃卧推", group: "胸部", subgroup: "胸部整体", muscles: ["胸大肌", "肱三头"], equipment: "哑铃", load: "中等重量", reps: "6–12 次", tips: ["肩胛向后下方稳定，双脚踩稳", "哑铃受控下降到胸部两侧", "结束时先将哑铃安全放回腿上"] },
  { id: "inclinebar", name: "上斜杠铃卧推", group: "胸部", subgroup: "上胸", muscles: ["胸大肌上部", "肱三头"], equipment: "杠铃", load: "中等到大重量", reps: "5–10 次", tips: ["保持肩胛稳定和手腕中立", "杠铃落点略高于平板卧推", "大重量训练使用保护杆或保护者"] },
  { id: "declinepress", name: "下斜器械推胸", group: "胸部", subgroup: "下胸", muscles: ["胸大肌下部", "肱三头"], equipment: "器械", load: "中等重量", reps: "8–15 次", tips: ["调整座椅使推举轨迹自然", "肩部保持下沉，避免耸肩", "回程受控，不让配重撞击"] },
  { id: "pecdeck", name: "蝴蝶机夹胸", group: "胸部", subgroup: "胸部孤立", muscles: ["胸大肌"], equipment: "器械", load: "小到中等重量", reps: "10–20 次", tips: ["肩胛稳定贴靠垫", "肘部角度保持相对固定", "肩前侧不适时减小后伸幅度"] },
  { id: "pushup", name: "俯卧撑", group: "胸部", subgroup: "自重推", muscles: ["胸大肌", "肱三头", "躯干"], equipment: "自重", load: "自重", reps: "8–25 次", tips: ["头、躯干和腿保持一条直线", "肘部不要过度向两侧张开", "全程保持躯干收紧和动作控制"] },

  { id: "barbellrow", name: "杠铃俯身划船", group: "背部", subgroup: "水平拉", muscles: ["背阔肌", "上背部", "肱二头"], equipment: "杠铃", load: "中等到大重量", reps: "5–10 次", tips: ["髋部后移并保持脊柱中立", "杠铃拉向下胸或上腹", "避免通过大幅起身借力"] },
  { id: "tbarrow", name: "T 杠划船", group: "背部", subgroup: "水平拉", muscles: ["背阔肌", "菱形肌", "肱二头"], equipment: "器械", load: "中等到大重量", reps: "6–12 次", tips: ["胸托版本保持胸部贴靠垫", "肘部向后拉并避免耸肩", "下放时保持控制和背部张力"] },
  { id: "chestrow", name: "胸托哑铃划船", group: "背部", subgroup: "水平拉", muscles: ["上背部", "背阔肌"], equipment: "哑铃", load: "中等重量", reps: "8–15 次", tips: ["胸部持续贴住上斜凳", "根据肘部方向选择背阔或上背侧重", "不要用颈部抬头借力"] },
  { id: "straightpull", name: "直臂下压", group: "背部", subgroup: "背阔孤立", muscles: ["背阔肌"], equipment: "绳索", load: "小到中等重量", reps: "10–20 次", tips: ["肘部保持轻微弯曲并相对固定", "用肩关节伸展带动手臂向下", "保持肋骨和躯干稳定"] },
  { id: "onepulldown", name: "单臂绳索下拉", group: "背部", subgroup: "垂直拉", muscles: ["背阔肌", "肱二头"], equipment: "绳索", load: "小到中等重量", reps: "10–15 次/侧", tips: ["先下沉肩胛再拉动肘部", "躯干保持稳定，避免侧屈", "两侧使用相同动作幅度"] },

  { id: "arnold", name: "阿诺德推举", group: "肩部", subgroup: "前束/整体", muscles: ["三角肌前束", "三角肌中束"], equipment: "哑铃", load: "中等重量", reps: "8–12 次", tips: ["旋转与推举保持连贯受控", "避免腰部过度反弓", "肩部不适时改用普通中立握推举"] },
  { id: "machinepress", name: "器械肩推", group: "肩部", subgroup: "前束/整体", muscles: ["三角肌", "肱三头"], equipment: "器械", load: "中等重量", reps: "8–15 次", tips: ["调整座椅使把手起点舒适", "背部贴靠垫，避免耸肩", "不要在顶部猛烈锁死肘部"] },
  { id: "cableraise", name: "单臂绳索侧平举", group: "肩部", subgroup: "中束", muscles: ["三角肌中束"], equipment: "绳索", load: "小重量", reps: "12–20 次/侧", tips: ["身体稳定，避免摆动借力", "以肘部带动手臂抬起", "两侧保持相同幅度和节奏"] },
  { id: "cablereverse", name: "绳索反向飞鸟", group: "肩部", subgroup: "后束", muscles: ["三角肌后束", "上背部"], equipment: "绳索", load: "小重量", reps: "12–20 次", tips: ["手臂轻微弯曲并保持角度", "向两侧打开而不是耸肩后拉", "用可控重量感受后束发力"] },
  { id: "uprightrow", name: "绳索直立划船", group: "肩部", subgroup: "中束", muscles: ["三角肌中束", "斜方肌"], equipment: "绳索", load: "小到中等重量", reps: "10–15 次", tips: ["使用能让手腕和肩部舒适的握距", "肘部抬至舒适高度即可", "出现肩部夹挤感时停止并更换动作"] },

  { id: "barbellcurl", name: "杠铃弯举", group: "手臂", subgroup: "肱二头", muscles: ["肱二头", "肱肌"], equipment: "杠铃", load: "中等重量", reps: "6–12 次", tips: ["上臂稳定在身体两侧", "避免腰部后仰和摆动", "手腕保持自然，不要过度弯折"] },
  { id: "preachercurl", name: "牧师凳弯举", group: "手臂", subgroup: "肱二头", muscles: ["肱二头"], equipment: "器械", load: "小到中等重量", reps: "8–15 次", tips: ["上臂贴住斜板", "底部不要借惯性弹起", "肘部不适时避免过度伸直"] },
  { id: "cablecurl", name: "绳索弯举", group: "手臂", subgroup: "肱二头", muscles: ["肱二头"], equipment: "绳索", load: "小到中等重量", reps: "10–20 次", tips: ["肘部位置保持固定", "顶端主动收缩但不要抬肩", "回程保持张力和控制"] },
  { id: "reversecurl", name: "反握杠铃弯举", group: "手臂", subgroup: "前臂", muscles: ["肱桡肌", "前臂伸肌"], equipment: "杠铃", load: "小重量", reps: "10–15 次", tips: ["使用较轻重量并保持手腕中立", "肘部靠近身体", "避免用身体摆动完成"] },
  { id: "closebench", name: "窄握卧推", group: "手臂", subgroup: "肱三头", muscles: ["肱三头", "胸大肌"], equipment: "杠铃", load: "中等到大重量", reps: "5–10 次", tips: ["握距无需过窄，保持手腕与前臂对齐", "肘部沿身体两侧自然下降", "大重量使用保护杆或保护者"] },
  { id: "skullcrusher", name: "仰卧臂屈伸", group: "手臂", subgroup: "肱三头", muscles: ["肱三头"], equipment: "曲杆", load: "小到中等重量", reps: "8–15 次", tips: ["上臂保持相对固定", "杠铃向头后或额头方向受控下降", "肘部不适时改用绳索动作"] },
  { id: "dip", name: "双杠臂屈伸", group: "手臂", subgroup: "肱三头", muscles: ["肱三头", "胸大肌"], equipment: "双杠", load: "自重或附加重量", reps: "5–15 次", tips: ["肩胛保持稳定，避免肩部耸起", "只下降到肩部舒适的深度", "不能稳定完成时使用辅助器械"] },

  { id: "deadlift", name: "传统硬拉", group: "腿", subgroup: "后链/臀部", muscles: ["臀大肌", "腘绳肌", "背部"], equipment: "杠铃", load: "大重量", reps: "3–8 次", tips: ["起拉前固定躯干并让杠铃贴近身体", "脚掌稳定发力，髋膝协调伸展", "疲劳导致背部位置失控时结束该组"] },
  { id: "frontsquat", name: "杠铃前蹲", group: "腿", subgroup: "股四头/臀部", muscles: ["股四头肌", "臀大肌", "躯干"], equipment: "杠铃", load: "中等到大重量", reps: "4–10 次", tips: ["肘部保持抬高并稳定杠铃", "躯干直立、脚掌稳定", "手腕或肩部受限时使用交叉臂或拉带握法"] },
  { id: "hacksquat", name: "哈克深蹲", group: "腿", subgroup: "股四头/臀部", muscles: ["股四头肌", "臀大肌"], equipment: "器械", load: "中等到大重量", reps: "6–15 次", tips: ["背部和臀部贴住靠垫", "膝盖跟随脚尖方向移动", "选择不会让骨盆卷起的下降深度"] },
  { id: "bulgarian", name: "保加利亚分腿蹲", group: "腿", subgroup: "单腿", muscles: ["股四头肌", "臀大肌"], equipment: "哑铃", load: "小到中等重量", reps: "8–15 次/侧", tips: ["前脚完整踩地并保持平衡", "膝盖与脚尖方向一致", "先掌握自重版本再增加重量"] },
  { id: "lunge", name: "哑铃行走弓步", group: "腿", subgroup: "单腿", muscles: ["股四头肌", "臀大肌"], equipment: "哑铃", load: "中等重量", reps: "8–16 步/侧", tips: ["每一步落地后先稳定再下蹲", "躯干保持自然直立", "空间不足时改为原地反向弓步"] },
  { id: "hipthrust", name: "杠铃臀推", group: "腿", subgroup: "臀部", muscles: ["臀大肌", "腘绳肌"], equipment: "杠铃", load: "中等到大重量", reps: "6–15 次", tips: ["上背部稳定支撑在凳面", "顶端收紧臀部而不是过度伸展腰部", "使用护垫并保持杠铃位置稳定"] },
  { id: "lyingcurl", name: "俯卧腿弯举", group: "腿", subgroup: "腘绳肌", muscles: ["腘绳肌"], equipment: "器械", load: "中等重量", reps: "10–15 次", tips: ["髋部保持贴住垫面", "脚垫位置接近脚踝上方", "受控弯曲和伸展膝关节"] },
  { id: "seatedcalf", name: "坐姿提踵", group: "腿", subgroup: "小腿", muscles: ["比目鱼肌", "腓肠肌"], equipment: "器械", load: "中等重量", reps: "12–25 次", tips: ["膝盖稳定在垫板下方", "脚踝完成可控全幅动作", "底部不要快速弹震"] },
  { id: "adductor", name: "坐姿髋内收", group: "腿", subgroup: "内收肌", muscles: ["大腿内收肌群"], equipment: "器械", load: "小到中等重量", reps: "12–20 次", tips: ["背部贴靠垫并保持骨盆稳定", "双腿平稳合拢，不用惯性", "选择髋部舒适的起始幅度"] },
  { id: "abductor", name: "坐姿髋外展", group: "腿", subgroup: "臀部", muscles: ["臀中肌", "臀小肌"], equipment: "器械", load: "小到中等重量", reps: "12–25 次", tips: ["保持骨盆稳定，避免身体大幅摆动", "双膝受控向外打开", "回程不要让配重快速落下"] }
];

const muscleGroups = ["胸部", "背部", "肩部", "手臂", "腿"];

function emptyState() {
  return {
    version: 6, screen: "train", activeExercise: 0, activeDetailId: null, pendingSetIndex: null,
    workout: null, history: [], summary: null, unit: "kg", query: "", groupFilter: "胸部",
    editingDateKey: null, editingHistoryId: null, editingWorkout: null, libraryContext: null,
    profile: { height: "", weight: "", age: "", gender: "未设置", benchMax: "", pullupMax: "", pushupMax: "", squatMax: "" }
  };
}

let state = loadState();
let tickHandle;

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!parsed) return emptyState();
    const fresh = emptyState();
    return { ...fresh, ...parsed, version: 6, profile: { ...fresh.profile, ...(parsed.profile || {}) } };
  } catch {
    return emptyState();
  }
}

function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function now() { return Date.now(); }
function secondsBetween(a, b) { return !a || !b ? 0 : Math.max(0, Math.floor((b - a) / 1000)); }

function formatDuration(totalSeconds) {
  const seconds = Math.max(0, Number(totalSeconds) || 0);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return h > 0
    ? `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function clockTime(timestamp) {
  return timestamp ? new Date(timestamp).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false }) : "--:--";
}

function dateLabel(timestamp) {
  return new Date(timestamp).toLocaleDateString("zh-CN", { month: "long", day: "numeric", weekday: "short" });
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
}

function createWorkout(startedAt = now()) {
  return { id: `workout-${startedAt}`, startedAt, endedAt: null, exercises: [], note: "" };
}

function createExercise(source) {
  const last = latestSetFor(source.id);
  return {
    id: source.id,
    name: source.name,
    group: source.group,
    subgroup: source.subgroup,
    muscles: [...source.muscles],
    equipment: source.equipment,
    load: source.load,
    reps: source.reps,
    tips: [...source.tips],
    status: "pending",
    sets: [{ weight: last?.weight || 0, reps: last?.reps || 0, startedAt: null, endedAt: null }]
  };
}

function latestSetFor(id) {
  for (const workout of state.history) {
    const ex = workout.exercises.find(item => item.id === id);
    const set = ex?.sets.filter(item => item.endedAt).at(-1);
    if (set) return set;
  }
  return null;
}

function startWorkout() {
  if (!state.workout) state.workout = createWorkout();
  state.screen = "workout";
  saveState();
  render();
}

function workoutElapsed(workout = state.workout) {
  return workout ? secondsBetween(workout.startedAt, workout.endedAt || now()) : 0;
}

function completedSetCount(workout = state.workout) {
  return workout?.exercises.flatMap(ex => ex.sets).filter(set => set.endedAt).length || 0;
}

function workoutMuscleSummary(workout) {
  const counts = {};
  workout?.exercises.forEach(ex => {
    const sets = ex.sets.filter(set => set.endedAt).length;
    const group = ex.group || catalogue.find(item => item.id === ex.id)?.group || ex.muscles?.[0] || "其他";
    counts[group] = (counts[group] || 0) + sets;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

function recommendationList() {
  const frequency = {};
  state.history.slice(0, 8).forEach((workout, workoutIndex) => workout.exercises.forEach(ex => {
    const completed = ex.sets.filter(set => set.endedAt).length;
    frequency[ex.id] = (frequency[ex.id] || 0) + completed * Math.max(1, 8 - workoutIndex);
  }));
  const currentIds = new Set(state.workout?.exercises.map(ex => ex.id) || []);

  const startedExercises = (state.workout?.exercises || [])
    .filter(ex => ex.sets.some(set => set.startedAt))
    .sort((a, b) => Math.max(...b.sets.map(set => set.startedAt || 0)) - Math.max(...a.sets.map(set => set.startedAt || 0)));

  if (startedExercises.length) {
    const activeGroup = startedExercises[0].group;
    return catalogue
      .filter(ex => ex.group === activeGroup && !currentIds.has(ex.id))
      .map((ex, order) => ({ ex, score: (frequency[ex.id] || 0) * 3 - order * .05, reason: `继续本次${activeGroup}训练` }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  }

  const recentTwo = state.history.slice(0, 2);
  const lastGroups = new Set((recentTwo[0]?.exercises || []).filter(ex => ex.sets.some(set => set.endedAt)).map(ex => ex.group || catalogue.find(item => item.id === ex.id)?.group));
  const recentExposure = {};
  recentTwo.forEach(workout => workout.exercises.forEach(ex => {
    const group = ex.group || catalogue.find(item => item.id === ex.id)?.group;
    recentExposure[group] = (recentExposure[group] || 0) + ex.sets.filter(set => set.endedAt).length;
  }));
  let candidates = catalogue.filter(ex => !currentIds.has(ex.id) && !lastGroups.has(ex.group));
  if (!candidates.length) candidates = catalogue.filter(ex => !currentIds.has(ex.id));

  return candidates
    .map((ex, order) => {
      const exposure = recentExposure[ex.group] || 0;
      const score = (frequency[ex.id] || 0) * 2 - exposure * 20 - order * .05;
      let reason = "常用基础动作";
      if (recentTwo.length && exposure === 0) reason = `近两次未练${ex.group}`;
      else if (lastGroups.size) reason = `避开上次${[...lastGroups].filter(Boolean).join("/")}`;
      return { ex, score, reason };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

function nav(active = "train") {
  const items = [["train", "＋", "训练"], ["exercises", "▦", "动作"], ["history", "◷", "历史"], ["profile", "○", "我的"]];
  return `<nav class="bottom-nav">${items.map(([key, icon, label]) => `<button class="nav-item ${active === key ? "active" : ""}" data-nav="${key}"><b>${icon}</b>${label}</button>`).join("")}</nav>`;
}

function renderTrainHome() {
  const active = Boolean(state.workout);
  const last = state.history[0];
  const suggestions = recommendationList();
  return `
    <section class="screen">
      <div class="between">
        <div><p class="eyebrow">个人力量训练记录</p><h1>记录真实训练</h1><p class="subtle">不安排计划，只保存你实际完成的每一组。</p></div>
        <button class="icon-button" data-nav="profile" aria-label="设置">⚙</button>
      </div>
      <article class="hero-card">
        <p class="eyebrow">${active ? "训练进行中" : "自由训练"}</p>
        <h2>${active ? "继续本次训练" : "准备好后开始计时"}</h2>
        <p class="subtle">${active ? `${state.workout.exercises.length} 个动作 · ${completedSetCount()} 个完成组` : "点击开始健身后计时，再选择本次实际训练的动作。"}</p>
        ${active ? `<div class="metric-grid"><div class="metric"><strong>${state.workout.exercises.length}</strong><span>动作</span></div><div class="metric"><strong>${completedSetCount()}</strong><span>完成组</span></div><div class="metric"><strong class="mono" data-live="workout">${formatDuration(workoutElapsed())}</strong><span>已训练</span></div></div>` : ""}
        ${active ? `<div class="hero-actions"><button class="primary" data-action="start-workout">继续健身</button><button class="hero-end" data-action="finish-workout">结束健身</button></div>` : `<button class="primary" data-action="start-workout">开始健身</button>`}
      </article>
      <div class="between section-title"><div><p class="eyebrow">实时建议</p><h3>建议动作</h3></div><button class="text-button" data-nav="exercises">全部动作</button></div>
      <div class="quick-grid">
        ${suggestions.map(({ ex, reason }) => `<button class="quick-exercise" data-quick-add="${ex.id}"><strong>${ex.name}</strong><span>${reason}</span><em>${ex.group} · ${ex.subgroup}</em></button>`).join("")}
      </div>
      <div class="section-title"><p class="eyebrow">最近记录</p><h3>${last ? dateLabel(last.startedAt) : "还没有训练记录"}</h3></div>
      ${last ? recentWorkoutCard(last) : `<article class="card empty-card"><strong>第一条记录从自由训练开始</strong><p class="subtle">完成训练后，日期、主要肌群、动作和组数会保存在这里。</p></article>`}
    </section>${nav("train")}`;
}

function recentWorkoutCard(workout) {
  const muscles = workoutMuscleSummary(workout);
  return `<div class="swipe-record" data-swipe-record="${workout.id}"><button class="swipe-delete" data-delete-history-id="${workout.id}" aria-label="删除训练记录">删除</button><button class="card recent-record" data-history-id="${workout.id}">
    <div class="between"><div><strong>${dateLabel(workout.startedAt)}</strong><p class="subtle">主要肌群：${muscles.slice(0, 3).map(([name]) => name).join(" / ") || "未记录"}</p></div><strong class="mono">${formatDuration(workoutElapsed(workout))}</strong></div>
    <div class="record-exercises">${workout.exercises.map(ex => `<div><span>${ex.name}</span><b>${ex.sets.filter(set => set.endedAt).length} 组</b></div>`).join("")}</div>
  </button></div>`;
}

function renderWorkout() {
  const workout = state.workout;
  if (!workout) return renderTrainHome();
  return `
    <section class="screen focus">
      <header class="focus-header">
        <div class="between"><button class="icon-button" data-action="go-train">×</button><div><p class="eyebrow">健身进行中</p><h2>${dateLabel(workout.startedAt)}</h2></div><strong class="focus-clock mono" data-live="workout">${formatDuration(workoutElapsed())}</strong></div>
        <p class="subtle">${workout.exercises.length} 个动作 · ${completedSetCount()} 个完成组</p>
      </header>
      ${workout.exercises.length ? `<div class="exercise-list">${workout.exercises.map((ex, index) => exerciseListItem(ex, index)).join("")}</div>` : `<button class="workout-empty clickable-empty" data-action="open-library"><div class="empty-icon">＋</div><h2>先添加一个动作</h2><p class="subtle">点击这里，从动作库选择本次实际训练的动作。</p></button>`}
      <div class="actions"><button class="secondary" data-action="open-library">添加动作</button><button class="primary" data-action="finish-workout">结束健身</button></div>
    </section>`;
}

function exerciseListItem(ex, index) {
  const done = ex.sets.filter(set => set.endedAt);
  const running = ex.sets.some(set => set.startedAt && !set.endedAt);
  const cls = running ? "active" : done.length ? "done" : "";
  const mark = running ? "●" : done.length ? "✓" : "○";
  const maxWeight = done.length ? Math.max(...done.map(set => set.weight)) : 0;
  const detail = running ? "当前组进行中" : done.length ? `${done.length} 组 · 最高 ${maxWeight} ${state.unit}` : "尚未开始";
  return `<button class="exercise-item ${cls}" data-open-exercise="${index}"><span class="status-mark">${mark}</span><span><strong>${ex.name}</strong><small>${ex.muscles.join(" / ")} · ${detail}</small></span><span class="chevron">›</span></button>`;
}

function currentSetIndex(ex) {
  const running = ex.sets.findIndex(set => set.startedAt && !set.endedAt);
  if (running >= 0) return running;
  const next = ex.sets.findIndex(set => !set.startedAt);
  return next >= 0 ? next : ex.sets.length - 1;
}

function exerciseTotal(ex) {
  const first = ex.sets.find(set => set.startedAt);
  const complete = ex.sets.filter(set => set.endedAt);
  return !first || !complete.length ? 0 : secondsBetween(first.startedAt, complete.at(-1).endedAt);
}

function restAfter(ex, index) {
  const set = ex.sets[index];
  if (!set?.endedAt || index >= ex.sets.length - 1) return null;
  return secondsBetween(set.endedAt, ex.sets[index + 1].startedAt || now());
}

function renderExercise() {
  const ex = state.workout?.exercises[state.activeExercise];
  if (!ex) { state.screen = "workout"; return renderWorkout(); }
  const nextIndex = currentSetIndex(ex);
  const running = ex.sets.findIndex(set => set.startedAt && !set.endedAt);
  const allDone = ex.sets.every(set => set.endedAt);
  const last = latestExerciseFor(ex.id);
  return `
    <section class="screen focus">
      <div class="between"><button class="icon-button" data-action="back-workout">‹</button><button class="icon-button" data-action="remove-exercise" aria-label="删除动作">⋯</button></div>
      <header class="exercise-head">
        <p class="eyebrow">${ex.equipment} · ${ex.muscles.join(" · ")}</p><h1>${ex.name}</h1>
        <div class="chips">${ex.muscles.map(m => `<span class="chip">${m}</span>`).join("")}</div>
        <div class="history-note"><strong>上次表现</strong><div class="subtle">${last ? last.sets.filter(s => s.endedAt).map(s => `${s.weight} ${state.unit} × ${s.reps}`).join(" · ") : "暂无历史记录"}</div></div>
      </header>
      <div class="between"><h3>实际训练组</h3><span class="subtle mono">动作总用时 ${formatDuration(exerciseTotal(ex))}</span></div>
      <div class="set-list">${ex.sets.map((set, index) => renderSet(ex, set, index, nextIndex)).join("")}</div>
      <button class="secondary full" data-action="add-set">＋ 添加一组</button>
      <div class="sticky-action">${running >= 0 ? `<button class="primary amber full" data-action="resume-set">返回第 ${running + 1} 组</button>` : allDone ? `<button class="primary full" data-action="back-workout">完成该动作</button>` : `<button class="primary full" data-action="start-set" data-set-index="${nextIndex}">开始第 ${nextIndex + 1} 组</button>`}</div>
    </section>`;
}

function renderSet(ex, set, index, nextIndex) {
  const complete = Boolean(set.endedAt);
  const current = index === nextIndex && !complete;
  const duration = complete ? secondsBetween(set.startedAt, set.endedAt) : set.startedAt ? secondsBetween(set.startedAt, now()) : 0;
  const rest = restAfter(ex, index);
  return `<div><div class="set-row ${complete ? "complete" : ""} ${current ? "current" : ""}"><span class="set-index">${complete ? "✓" : index + 1}</span><span class="set-main"><strong>${set.weight} ${state.unit} × ${set.reps}</strong><small>${complete ? `本组 ${formatDuration(duration)}` : current ? "下一组" : "待完成"}</small></span><span class="mono subtle">${complete ? `${clockTime(set.startedAt)}–${clockTime(set.endedAt)}` : ""}</span></div>${rest !== null ? `<div class="rest-row mono">组间歇 <span data-rest-index="${index}">${formatDuration(rest)}</span>${!ex.sets[index + 1].startedAt ? " ↑" : ""}</div>` : ""}</div>`;
}

function latestExerciseFor(id) {
  for (const workout of state.history) {
    const ex = workout.exercises.find(item => item.id === id && item.sets.some(set => set.endedAt));
    if (ex) return ex;
  }
  return null;
}

function renderActiveSet() {
  const ex = state.workout.exercises[state.activeExercise];
  const index = ex.sets.findIndex(set => set.startedAt && !set.endedAt);
  if (index < 0) { state.screen = "exercise"; return renderExercise(); }
  const set = ex.sets[index];
  return `<section class="active-set-screen">
    <div class="between"><div><p class="eyebrow" style="color:#bfe1d7">${ex.name}</p><h2>第 ${index + 1} 组 · 进行中</h2></div><span class="chip">${ex.muscles[0]}</span></div>
    <div class="active-timer mono" data-live="set">${formatDuration(secondsBetween(set.startedAt, now()))}</div>
    <p class="active-hint">完成动作后再填写本组重量和次数</p>
    <button class="primary complete-set full" data-action="end-set">结束本组</button>
    <button class="cancel-link" data-action="cancel-set">取消本组</button>
  </section>`;
}

function renderSetEntry() {
  const ex = state.workout?.exercises[state.activeExercise];
  const set = ex?.sets[state.pendingSetIndex];
  if (!set?.endedAt) { state.screen = "exercise"; return renderExercise(); }
  return `<section class="active-set-screen set-entry-screen">
    <div><p class="eyebrow" style="color:#bfe1d7">${ex.name}</p><h2>第 ${state.pendingSetIndex + 1} 组已结束</h2><p class="subtle">${clockTime(set.startedAt)}–${clockTime(set.endedAt)} · 本组 ${formatDuration(secondsBetween(set.startedAt, set.endedAt))}</p></div>
    <div class="entry-check">✓</div>
    <div class="input-grid">
      <div class="number-box"><label for="weight">本组重量</label><div class="number-wrap"><input id="weight" type="number" inputmode="decimal" step="0.5" value="${set.weight}"><span>${state.unit}</span></div></div>
      <div class="number-box"><label for="reps">完成次数</label><div class="number-wrap"><input id="reps" type="number" inputmode="numeric" step="1" value="${set.reps}"><span>次</span></div></div>
    </div>
    <button class="primary complete-set full" data-action="save-set">保存本组</button>
    <button class="cancel-link" data-action="undo-end-set">返回继续计时</button>
  </section>`;
}

function renderLibrary() {
  const selectingHistory = state.libraryContext === "history-edit";
  const selectionTarget = selectingHistory ? state.editingWorkout : state.workout;
  const q = state.query.trim().toLowerCase();
  const results = catalogue.filter(ex => ex.group === state.groupFilter && `${ex.name}${ex.subgroup}${ex.muscles.join("")}${ex.equipment}`.toLowerCase().includes(q));
  const subgrouped = results.reduce((groups, ex) => {
    (groups[ex.subgroup] ||= []).push(ex);
    return groups;
  }, {});
  return `<section class="screen ${selectingHistory ? "focus" : ""}">
    <div class="between"><div><p class="eyebrow">动作库</p><h1>${selectionTarget ? "添加动作" : "按肌群查找"}</h1></div>${selectionTarget ? `<button class="icon-button" data-action="${selectingHistory ? "back-history-editor" : "go-train"}">×</button>` : ""}</div>
    <div class="search-box"><span>⌕</span><input id="exercise-search" type="search" placeholder="搜索名称、肌群或器械" value="${state.query}"></div>
    <div class="muscle-tabs">${muscleGroups.map(group => `<button class="${group === state.groupFilter ? "selected" : ""}" data-group="${group}">${group}</button>`).join("")}</div>
    <div class="group-summary"><strong>${state.groupFilter}</strong><span>${results.length} 个动作 · ${Object.keys(subgrouped).length} 个分类</span></div>
    <div class="library-groups">${Object.entries(subgrouped).map(([subgroup, items]) => `<section class="subgroup"><h3>${subgroup}</h3><div class="library-list">${items.map(ex => libraryItem(ex)).join("")}</div></section>`).join("") || `<div class="workout-empty"><h3>没有找到动作</h3><p class="subtle">尝试其他关键词或肌群。</p></div>`}</div>
    ${selectingHistory ? "" : nav("exercises")}
  </section>`;
}

function libraryItem(ex) {
  const target = state.libraryContext === "history-edit" ? state.editingWorkout : state.workout;
  const added = target?.exercises.some(item => item.id === ex.id);
  return `<article class="library-item"><button class="library-main" data-detail-id="${ex.id}"><span class="exercise-avatar">${ex.name.slice(0, 1)}</span><span><strong>${ex.name}</strong><small>${ex.muscles.join(" / ")} · ${ex.equipment}</small></span></button><button class="add-circle ${added ? "added" : ""}" data-add-exercise="${ex.id}" ${added ? "disabled" : ""}>${added ? "✓" : "＋"}</button></article>`;
}

function renderExerciseDetail() {
  const ex = catalogue.find(item => item.id === state.activeDetailId);
  if (!ex) { state.screen = "exercises"; return renderLibrary(); }
  const editingHistory = state.libraryContext === "history-edit";
  const target = state.libraryContext === "history-edit" ? state.editingWorkout : state.workout;
  const added = target?.exercises.some(item => item.id === ex.id);
  return `<section class="screen ${editingHistory ? "focus" : "has-nav"} detail-screen">
    <button class="icon-button" data-action="back-library">‹</button>
    <div class="detail-hero"><span class="detail-group">${ex.group} · ${ex.subgroup}</span><h1>${ex.name}</h1><p>${ex.equipment} · ${ex.muscles.join(" / ")}</p></div>
    <div class="guidance-grid"><article><span>负重倾向</span><strong>${ex.load}</strong></article><article><span>常用次数</span><strong>${ex.reps}</strong></article></div>
    <article class="card tip-card"><p class="eyebrow">训练要点</p><ul>${ex.tips.map(tip => `<li>${tip}</li>`).join("")}</ul></article>
    <article class="source-note"><strong>使用提示</strong><p>重量与次数是一般参考范围。优先选择能保持动作控制的重量；出现疼痛、眩晕或异常不适时停止训练。</p><p class="reference-links"><a href="https://acsm.org/resistance-training-guidelines-update-2026/" target="_blank" rel="noreferrer">ACSM 阻力训练指南</a><a href="https://www.acefitness.org/resources/everyone/exercise-library/equipment/" target="_blank" rel="noreferrer">ACE 动作库</a></p></article>
    <div class="sticky-action"><button class="primary full" data-add-exercise="${ex.id}" ${added ? "disabled" : ""}>${added ? "已加入记录" : target ? "加入训练记录" : "请先开始健身"}</button></div>
  </section>${editingHistory ? "" : nav("exercises")}`;
}

function historyCard(workout) {
  return `<button class="card history-card" data-history-id="${workout.id}"><div class="between"><div><strong>${dateLabel(workout.startedAt)}</strong><p class="subtle">${workout.exercises.length} 个动作 · ${completedSetCount(workout)} 个完成组</p></div><strong class="mono">${formatDuration(workoutElapsed(workout))}</strong></div></button>`;
}

function localDateKey(timestamp) {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function calendarHtml() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const trained = new Set(state.history.map(workout => localDateKey(workout.startedAt)));
  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(`<span class="calendar-day blank"></span>`);
  for (let day = 1; day <= days; day++) {
    const key = `${year}-${month + 1}-${day}`;
    const isToday = day === today.getDate();
    const isTrained = trained.has(key);
    cells.push(`<button class="calendar-day ${isToday ? "today" : ""} ${isTrained ? "trained" : ""}" data-calendar-date="${key}"><b>${day}</b>${isTrained ? "<i></i>" : ""}</button>`);
  }
  return `<article class="calendar-card"><div class="between"><h3>${year} 年 ${month + 1} 月</h3><span class="subtle">● 有训练记录</span></div><div class="week-row">${["日", "一", "二", "三", "四", "五", "六"].map(day => `<span>${day}</span>`).join("")}</div><div class="calendar-grid">${cells.join("")}</div></article>`;
}

function renderHistory() {
  return `<section class="screen"><p class="eyebrow">训练数据</p><h1>历史记录</h1><p class="subtle">只展示你真实完成并保存的训练。</p>
    ${calendarHtml()}
    <div class="between section-title"><div><p class="eyebrow">按时间排列</p><h3>全部记录</h3></div><span class="chip">${state.history.length} 次</span></div>
    ${state.history.length ? `<div class="history-list">${state.history.map(recentWorkoutCard).join("")}</div>` : `<div class="workout-empty"><div class="empty-icon">◷</div><h2>还没有历史记录</h2><p class="subtle">完成第一次自由训练后，这里会显示动作、组数、重量、次数、用时和组间歇。</p><button class="primary" data-action="start-workout">开始自由训练</button></div>`}
  </section>${nav("history")}`;
}

function dateFromKey(key, hour = 12, minute = 0) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day, hour, minute).getTime();
}

function workoutsForDate(key) {
  return state.history.filter(workout => localDateKey(workout.startedAt) === key);
}

function fullDateLabel(key) {
  return new Date(dateFromKey(key)).toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric", weekday: "long" });
}

function renderDayDetail() {
  const key = state.editingDateKey || localDateKey(now());
  const workouts = workoutsForDate(key);
  return `<section class="screen focus">
    <div class="between"><button class="icon-button" data-action="back-history">‹</button><span class="chip">${workouts.length} 次</span></div>
    <header class="day-header"><p class="eyebrow">训练日期</p><h1>${fullDateLabel(key)}</h1><p class="subtle">可以打开已有训练进行修改，也可以补录当天训练。</p></header>
    ${workouts.length ? `<div class="history-list">${workouts.map(recentWorkoutCard).join("")}</div>` : `<button class="workout-empty compact-empty clickable-empty" data-action="new-day-workout"><div class="empty-icon">＋</div><h2>当天没有记录</h2><p class="subtle">点击这里补录动作、组数、重量、次数和时间。</p></button>`}
    <button class="primary full" style="margin-top:18px" data-action="new-day-workout">新增当日训练</button>
  </section>`;
}

function datetimeInputValue(timestamp) {
  if (!timestamp) return "";
  const date = new Date(timestamp - new Date(timestamp).getTimezoneOffset() * 60000);
  return date.toISOString().slice(0, 16);
}

function timeInputValue(timestamp) {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
}

function renderHistoryEditor() {
  const workout = state.editingWorkout;
  if (!workout) { state.screen = "history"; return renderHistory(); }
  return `<section class="screen focus history-editor">
    <div class="between"><button class="icon-button" data-action="cancel-history-edit">×</button><span class="save-state">修改仅在保存后生效</span></div>
    <header class="day-header"><p class="eyebrow">${state.editingHistoryId ? "修改训练记录" : "新增训练记录"}</p><h1>${fullDateLabel(localDateKey(workout.startedAt))}</h1></header>
    <article class="editor-card"><div class="editor-time-grid"><label><span>开始健身</span><input type="datetime-local" data-edit-session="startedAt" value="${datetimeInputValue(workout.startedAt)}"></label><label><span>结束健身</span><input type="datetime-local" data-edit-session="endedAt" value="${datetimeInputValue(workout.endedAt)}"></label></div><label class="editor-note"><span>训练心得</span><textarea data-edit-note placeholder="记录当天状态、感受或动作心得……">${escapeHtml(workout.note)}</textarea></label></article>
    <div class="between section-title"><div><p class="eyebrow">动作与组</p><h3>${workout.exercises.length} 个动作</h3></div><button class="text-button" data-action="edit-add-exercise">添加动作</button></div>
    <div class="edit-exercises">${workout.exercises.map((ex, exIndex) => editExerciseCard(ex, exIndex)).join("") || `<div class="card empty-card"><strong>还没有动作</strong><p class="subtle">点击“添加动作”从动作库选择。</p></div>`}</div>
    <div class="editor-actions"><button class="danger-button" data-action="delete-history-workout" ${state.editingHistoryId ? "" : "disabled"}>删除记录</button><button class="primary" data-action="save-history-workout">保存记录</button></div>
  </section>`;
}

function editExerciseCard(ex, exIndex) {
  return `<article class="card edit-exercise-card"><div class="between"><div><h3>${ex.name}</h3><p class="subtle">${ex.group || ex.muscles[0]} · ${ex.sets.length} 组</p></div><button class="mini-danger" data-edit-remove-exercise="${exIndex}">删除</button></div><div class="edit-set-list">${ex.sets.map((set, setIndex) => `<div class="edit-set-row"><b>${setIndex + 1}</b><label><span>重量</span><input type="number" step="0.5" value="${set.weight}" data-edit-set="${exIndex}:${setIndex}:weight"></label><label><span>次数</span><input type="number" step="1" value="${set.reps}" data-edit-set="${exIndex}:${setIndex}:reps"></label><label><span>开始</span><input type="time" step="1" value="${timeInputValue(set.startedAt)}" data-edit-set="${exIndex}:${setIndex}:startedAt"></label><label><span>结束</span><input type="time" step="1" value="${timeInputValue(set.endedAt)}" data-edit-set="${exIndex}:${setIndex}:endedAt"></label><button class="remove-set" data-edit-remove-set="${exIndex}:${setIndex}">×</button></div>`).join("")}</div><button class="secondary compact-button" data-edit-add-set="${exIndex}">＋ 添加一组</button></article>`;
}

function renderHistoryDetail() {
  const workout = state.summary;
  if (!workout) { state.screen = "history"; return renderHistory(); }
  return `<section class="screen focus">
    <div class="between"><button class="icon-button" data-action="back-history">‹</button><button class="secondary compact-button" data-action="edit-history">编辑记录</button></div>
    <div class="summary-hero"><p class="eyebrow">训练记录</p><h1>${dateLabel(workout.startedAt)}</h1><p class="subtle">${clockTime(workout.startedAt)}–${clockTime(workout.endedAt)}</p></div>
    ${summaryStats(workout)}
    ${workout.note ? `<article class="card saved-note"><p class="eyebrow">训练记录</p><p>${escapeHtml(workout.note)}</p></article>` : ""}
    <div class="summary-list">${workout.exercises.map(summaryExerciseCard).join("")}</div>
  </section>`;
}

function summaryStats(workout) {
  return `<div class="summary-grid"><div class="summary-stat"><strong>${workout.exercises.length}</strong><span>个动作</span></div><div class="summary-stat"><strong>${completedSetCount(workout)}</strong><span>完成组</span></div><div class="summary-stat"><strong class="mono">${formatDuration(workoutElapsed(workout))}</strong><span>训练用时</span></div></div>`;
}

function summaryExerciseCard(ex) {
  const done = ex.sets.filter(set => set.endedAt);
  const rests = done.slice(0, -1).map((set, index) => secondsBetween(set.endedAt, done[index + 1].startedAt));
  return `<article class="card summary-card"><div class="between"><div><h3>${ex.name}</h3><div class="chips">${ex.muscles.map(m => `<span class="chip">${m}</span>`).join("")}</div></div><strong class="mono">${formatDuration(exerciseTotal(ex))}</strong></div><div class="set-summary">${done.map(set => `${set.weight} ${state.unit} × ${set.reps}`).join(" · ")}<br><span class="rests">${rests.length ? `组间歇 ${rests.map(formatDuration).join(" · ")}` : "仅完成一组"}</span></div></article>`;
}

function renderSummary() {
  const workout = state.summary;
  return `<section class="screen focus"><div class="summary-hero"><div class="check-ring">✓</div><p class="eyebrow">记录已保存</p><h1>健身结束</h1><p class="subtle">${dateLabel(workout.startedAt)} · ${clockTime(workout.startedAt)}–${clockTime(workout.endedAt)}</p></div>${summaryStats(workout)}<article class="workout-note-card summary-note"><label for="summary-note">本次训练心得</label><textarea id="summary-note" data-summary-note placeholder="记录训练感受、状态、动作心得……">${escapeHtml(workout.note)}</textarea><small>输入内容会自动保存到本次训练</small></article><div class="summary-list">${workout.exercises.map(summaryExerciseCard).join("")}</div><button class="primary full" style="margin-top:18px" data-action="close-summary">完成</button></section>`;
}

function renderProfile() {
  return `<section class="screen"><p class="eyebrow">个人档案</p><h1>我的</h1><p class="subtle">用于汇总个人训练表现，不影响自由记录。</p>
    <article class="profile-section"><div class="between"><h3>基础信息</h3><span class="save-state">自动保存</span></div>
      <div class="profile-grid">${profileField("height", "身高", "cm")}${profileField("weight", "体重", state.unit)}${profileField("age", "年龄", "岁")}</div>
      <label class="field-label">性别</label><div class="gender-row">${["男", "女", "未设置"].map(value => `<button class="${state.profile.gender === value ? "selected" : ""}" data-gender="${value}">${value}</button>`).join("")}</div>
    </article>
    <article class="profile-section"><h3>当前极限</h3><p class="subtle">按你实际测试或确认过的最好成绩填写。</p>
      <div class="limit-list">${limitField("benchMax", "卧推极限", state.unit, "1RM")}${limitField("squatMax", "深蹲极限", state.unit, "1RM")}${limitField("pullupMax", "引体向上极限", "次", "连续次数")}${limitField("pushupMax", "俯卧撑极限", "次", "连续次数")}</div>
    </article>
    <div class="settings-list">
      <article class="setting-card"><div><strong>重量单位</strong><small>所有动作记录使用同一单位</small></div><div class="segmented"><button class="${state.unit === "kg" ? "selected" : ""}" data-unit="kg">kg</button><button class="${state.unit === "lb" ? "selected" : ""}" data-unit="lb">lb</button></div></article>
      <button class="setting-card button-card" data-action="export-json"><div><strong>导出完整备份</strong><small>保存动作、时间与全部训练历史</small></div><span>›</span></button>
      <button class="setting-card button-card" data-action="export-csv"><div><strong>导出训练表格</strong><small>生成便于查看的 CSV 文件</small></div><span>›</span></button>
      <article class="setting-card"><div><strong>本地记录</strong><small>${state.history.length} 次训练 · ${state.history.reduce((n, w) => n + completedSetCount(w), 0)} 个完成组</small></div><span class="chip">仅本机</span></article>
    </div>
  </section>${nav("profile")}`;
}

function profileField(key, label, unit) {
  return `<label class="profile-field"><span>${label}</span><div><input data-profile="${key}" type="number" inputmode="decimal" value="${state.profile[key]}"><em>${unit}</em></div></label>`;
}

function limitField(key, label, unit, hint) {
  return `<label class="limit-field"><span><strong>${label}</strong><small>${hint}</small></span><div><input data-profile="${key}" type="number" inputmode="decimal" value="${state.profile[key]}"><em>${unit}</em></div></label>`;
}

function timestampFromTime(value, baseTimestamp) {
  if (!value) return null;
  const [hours, minutes, seconds = 0] = value.split(":").map(Number);
  const date = new Date(baseTimestamp);
  date.setHours(hours, minutes, seconds, 0);
  return date.getTime();
}

function render() {
  clearInterval(tickHandle);
  const app = document.getElementById("app");
  if (state.screen === "train") app.innerHTML = renderTrainHome();
  else if (state.screen === "workout") app.innerHTML = renderWorkout();
  else if (state.screen === "exercise") app.innerHTML = renderExercise();
  else if (state.screen === "active-set") app.innerHTML = renderActiveSet();
  else if (state.screen === "set-entry") app.innerHTML = renderSetEntry();
  else if (state.screen === "exercises") app.innerHTML = renderLibrary();
  else if (state.screen === "exercise-detail") app.innerHTML = renderExerciseDetail();
  else if (state.screen === "history") app.innerHTML = renderHistory();
  else if (state.screen === "history-detail") app.innerHTML = renderHistoryDetail();
  else if (state.screen === "day-detail") app.innerHTML = renderDayDetail();
  else if (state.screen === "history-edit") app.innerHTML = renderHistoryEditor();
  else if (state.screen === "summary") app.innerHTML = renderSummary();
  else if (state.screen === "profile") app.innerHTML = renderProfile();
  bindEvents();
  tickHandle = setInterval(updateLiveTimers, 1000);
}

function bindEvents() {
  document.querySelectorAll("[data-nav]").forEach(el => el.addEventListener("click", () => { state.screen = el.dataset.nav; saveState(); render(); }));
  document.querySelectorAll("[data-open-exercise]").forEach(el => el.addEventListener("click", () => { state.activeExercise = Number(el.dataset.openExercise); state.screen = "exercise"; saveState(); render(); }));
  document.querySelectorAll("[data-add-exercise]").forEach(el => el.addEventListener("click", () => addExercise(el.dataset.addExercise)));
  document.querySelectorAll("[data-quick-add]").forEach(el => el.addEventListener("click", () => { if (!state.workout) return toast("请先点击开始健身"); addExercise(el.dataset.quickAdd); }));
  document.querySelectorAll("[data-history-id]").forEach(el => el.addEventListener("click", () => {
    const swipeRecord = el.closest("[data-swipe-record]");
    if (swipeRecord?.classList.contains("open")) { closeSwipeRecord(swipeRecord); return; }
    state.summary = state.history.find(w => w.id === el.dataset.historyId); state.screen = "history-detail"; saveState(); render();
  }));
  document.querySelectorAll("[data-delete-history-id]").forEach(el => el.addEventListener("click", event => { event.stopPropagation(); deleteHistoryById(el.dataset.deleteHistoryId); }));
  document.querySelectorAll("[data-calendar-date]").forEach(el => el.addEventListener("click", () => { state.editingDateKey = el.dataset.calendarDate; state.screen = "day-detail"; saveState(); render(); }));
  document.querySelectorAll("[data-unit]").forEach(el => el.addEventListener("click", () => { state.unit = el.dataset.unit; saveState(); render(); }));
  document.querySelectorAll("[data-group]").forEach(el => el.addEventListener("click", () => { state.groupFilter = el.dataset.group; state.query = ""; saveState(); render(); }));
  document.querySelectorAll("[data-detail-id]").forEach(el => el.addEventListener("click", () => { state.activeDetailId = el.dataset.detailId; state.screen = "exercise-detail"; saveState(); render(); }));
  document.querySelectorAll("[data-gender]").forEach(el => el.addEventListener("click", () => { state.profile.gender = el.dataset.gender; saveState(); render(); }));
  document.querySelectorAll("[data-profile]").forEach(el => el.addEventListener("input", () => { state.profile[el.dataset.profile] = el.value; saveState(); }));
  document.querySelectorAll("[data-summary-note]").forEach(el => el.addEventListener("input", () => {
    if (!state.summary) return;
    state.summary.note = el.value;
    const saved = state.history.find(workout => workout.id === state.summary.id);
    if (saved) saved.note = el.value;
    saveState();
  }));
  document.querySelectorAll("[data-edit-session]").forEach(el => el.addEventListener("input", () => { const value = new Date(el.value).getTime(); if (Number.isFinite(value)) { state.editingWorkout[el.dataset.editSession] = value; saveState(); } }));
  document.querySelectorAll("[data-edit-note]").forEach(el => el.addEventListener("input", () => { state.editingWorkout.note = el.value; saveState(); }));
  document.querySelectorAll("[data-edit-set]").forEach(el => el.addEventListener("input", () => {
    const [exIndex, setIndex, field] = el.dataset.editSet.split(":");
    const set = state.editingWorkout.exercises[Number(exIndex)].sets[Number(setIndex)];
    set[field] = field === "weight" ? Math.max(0, Number(el.value) || 0) : field === "reps" ? Math.max(0, Math.round(Number(el.value) || 0)) : timestampFromTime(el.value, state.editingWorkout.startedAt);
    saveState();
  }));
  document.querySelectorAll("[data-edit-add-set]").forEach(el => el.addEventListener("click", () => {
    const ex = state.editingWorkout.exercises[Number(el.dataset.editAddSet)];
    const last = ex.sets.at(-1);
    const startedAt = (last.endedAt || state.editingWorkout.startedAt) + 120000;
    ex.sets.push({ weight: last.weight, reps: last.reps, startedAt, endedAt: startedAt + 30000 });
    saveState(); render();
  }));
  document.querySelectorAll("[data-edit-remove-set]").forEach(el => el.addEventListener("click", () => {
    const [exIndex, setIndex] = el.dataset.editRemoveSet.split(":").map(Number);
    state.editingWorkout.exercises[exIndex].sets.splice(setIndex, 1);
    saveState(); render();
  }));
  document.querySelectorAll("[data-edit-remove-exercise]").forEach(el => el.addEventListener("click", () => { state.editingWorkout.exercises.splice(Number(el.dataset.editRemoveExercise), 1); saveState(); render(); }));
  document.querySelectorAll("[data-action]").forEach(el => el.addEventListener("click", () => handleAction(el.dataset.action, el)));
  document.getElementById("exercise-search")?.addEventListener("input", event => { state.query = event.target.value; saveState(); render(); document.getElementById("exercise-search")?.focus(); });
  bindSwipeRecords();
}

function closeSwipeRecord(record) {
  record.classList.remove("open");
  const card = record.querySelector(".recent-record");
  if (card) card.style.transform = "translateX(0)";
}

function bindSwipeRecords() {
  document.querySelectorAll("[data-swipe-record]").forEach(record => {
    const card = record.querySelector(".recent-record");
    let startX = 0;
    let deltaX = 0;
    card.addEventListener("touchstart", event => {
      document.querySelectorAll("[data-swipe-record].open").forEach(open => { if (open !== record) closeSwipeRecord(open); });
      startX = event.touches[0].clientX;
      deltaX = 0;
      card.style.transition = "none";
    }, { passive: true });
    card.addEventListener("touchmove", event => {
      deltaX = event.touches[0].clientX - startX;
      if (Math.abs(deltaX) > 8) event.preventDefault();
      card.style.transform = `translateX(${Math.max(-84, Math.min(0, deltaX))}px)`;
    }, { passive: false });
    card.addEventListener("touchend", () => {
      card.style.transition = "";
      if (deltaX < -42) { record.classList.add("open"); card.style.transform = "translateX(-84px)"; }
      else closeSwipeRecord(record);
    });
  });
}

function deleteHistoryById(id) {
  if (!confirm("删除这次训练记录？删除后无法恢复。")) return;
  state.history = state.history.filter(workout => workout.id !== id);
  if (state.summary?.id === id) state.summary = null;
  saveState();
  render();
}

function addExercise(id) {
  const source = catalogue.find(ex => ex.id === id);
  if (state.libraryContext === "history-edit" && state.editingWorkout) {
    if (state.editingWorkout.exercises.some(ex => ex.id === id)) return;
    const exercise = createExercise(source);
    const previousEnd = state.editingWorkout.exercises.flatMap(ex => ex.sets).map(set => set.endedAt || 0).sort((a, b) => b - a)[0];
    const setStart = Math.max(state.editingWorkout.startedAt, previousEnd ? previousEnd + 120000 : state.editingWorkout.startedAt);
    exercise.sets[0].startedAt = setStart;
    exercise.sets[0].endedAt = setStart + 30000;
    state.editingWorkout.exercises.push(exercise);
    state.libraryContext = null;
    state.screen = "history-edit";
    saveState(); return render();
  }
  if (!state.workout) return toast("请先点击开始健身");
  if (state.workout.exercises.some(ex => ex.id === id)) return;
  state.workout.exercises.push(createExercise(source));
  state.activeExercise = state.workout.exercises.length - 1;
  state.screen = "exercise";
  saveState();
  render();
}

function handleAction(action, el) {
  if (action === "start-workout") return startWorkout();
  if (action === "go-train") { state.screen = "train"; saveState(); return render(); }
  if (action === "back-workout") { state.screen = "workout"; saveState(); return render(); }
  if (action === "open-library") { state.screen = "exercises"; saveState(); return render(); }
  if (action === "back-library") { state.screen = "exercises"; saveState(); return render(); }
  if (action === "back-history-editor") { state.libraryContext = null; state.screen = "history-edit"; saveState(); return render(); }
  if (action === "new-day-workout") {
    const startedAt = dateFromKey(state.editingDateKey, 18, 0);
    state.editingHistoryId = null;
    state.editingWorkout = { ...createWorkout(startedAt), endedAt: startedAt + 3600000 };
    state.screen = "history-edit";
    saveState(); return render();
  }
  if (action === "edit-history") {
    state.editingHistoryId = state.summary.id;
    state.editingWorkout = JSON.parse(JSON.stringify(state.summary));
    state.editingDateKey = localDateKey(state.summary.startedAt);
    state.screen = "history-edit";
    saveState(); return render();
  }
  if (action === "cancel-history-edit") { state.editingWorkout = null; state.editingHistoryId = null; state.libraryContext = null; state.screen = "day-detail"; saveState(); return render(); }
  if (action === "edit-add-exercise") { state.libraryContext = "history-edit"; state.screen = "exercises"; saveState(); return render(); }
  if (action === "save-history-workout") {
    const edited = state.editingWorkout;
    if (!edited || !edited.startedAt || !edited.endedAt || edited.endedAt <= edited.startedAt) return toast("请检查健身开始和结束时间");
    if (!edited.exercises.length || !edited.exercises.some(ex => ex.sets.some(set => set.startedAt && set.endedAt))) return toast("请至少添加一个动作和一组记录");
    for (const ex of edited.exercises) {
      for (const set of ex.sets) if (set.startedAt && set.endedAt && set.endedAt <= set.startedAt) return toast("每组结束时间必须晚于开始时间");
    }
    const saved = JSON.parse(JSON.stringify(edited));
    if (state.editingHistoryId) state.history = state.history.map(workout => workout.id === state.editingHistoryId ? saved : workout);
    else state.history.push(saved);
    state.history.sort((a, b) => b.startedAt - a.startedAt);
    state.editingDateKey = localDateKey(saved.startedAt);
    state.editingWorkout = null;
    state.editingHistoryId = null;
    state.libraryContext = null;
    state.summary = null;
    state.screen = "day-detail";
    saveState(); return render();
  }
  if (action === "delete-history-workout") {
    if (!state.editingHistoryId || !confirm("删除这次训练记录？删除后无法恢复。")) return;
    state.history = state.history.filter(workout => workout.id !== state.editingHistoryId);
    state.editingWorkout = null;
    state.editingHistoryId = null;
    state.summary = null;
    state.screen = "day-detail";
    saveState(); return render();
  }
  if (action === "add-set") {
    const ex = state.workout.exercises[state.activeExercise];
    const last = ex.sets.at(-1);
    ex.sets.push({ weight: last.weight, reps: last.reps, startedAt: null, endedAt: null });
    saveState(); return render();
  }
  if (action === "start-set") {
    const ex = state.workout.exercises[state.activeExercise];
    const index = Number(el.dataset.setIndex);
    ex.status = "active";
    ex.sets[index].startedAt = now();
    state.screen = "active-set";
    saveState(); return render();
  }
  if (action === "resume-set") { state.screen = "active-set"; saveState(); return render(); }
  if (action === "end-set") {
    const ex = state.workout.exercises[state.activeExercise];
    const index = ex.sets.findIndex(item => item.startedAt && !item.endedAt);
    const set = ex.sets[index];
    set.endedAt = now();
    state.pendingSetIndex = index;
    state.screen = "set-entry";
    saveState(); return render();
  }
  if (action === "save-set") {
    const ex = state.workout.exercises[state.activeExercise];
    const set = ex.sets[state.pendingSetIndex];
    set.weight = Math.max(0, Number(document.getElementById("weight").value) || 0);
    set.reps = Math.max(0, Math.round(Number(document.getElementById("reps").value) || 0));
    state.pendingSetIndex = null;
    state.screen = "exercise";
    saveState(); return render();
  }
  if (action === "undo-end-set") {
    const set = state.workout.exercises[state.activeExercise].sets[state.pendingSetIndex];
    set.endedAt = null;
    state.pendingSetIndex = null;
    state.screen = "active-set";
    saveState(); return render();
  }
  if (action === "cancel-set") {
    const set = state.workout.exercises[state.activeExercise].sets.find(item => item.startedAt && !item.endedAt);
    if (set) set.startedAt = null;
    state.screen = "exercise";
    saveState(); return render();
  }
  if (action === "remove-exercise") {
    if (!confirm("从本次训练中删除这个动作？")) return;
    state.workout.exercises.splice(state.activeExercise, 1);
    state.screen = "workout";
    saveState(); return render();
  }
  if (action === "finish-workout") {
    if (!completedSetCount()) {
      state.workout = null;
      state.screen = "train";
      saveState(); return render();
    }
    const saved = JSON.parse(JSON.stringify(state.workout));
    saved.endedAt = now();
    saved.exercises = saved.exercises.filter(ex => ex.sets.some(set => set.endedAt));
    state.history.unshift(saved);
    state.summary = saved;
    state.workout = null;
    state.screen = "summary";
    saveState(); return render();
  }
  if (action === "close-summary") { state.summary = null; state.screen = "train"; saveState(); return render(); }
  if (action === "back-history") { state.summary = null; state.screen = "history"; saveState(); return render(); }
  if (action === "export-json") return downloadFile("力量训练完整备份.json", JSON.stringify(state, null, 2), "application/json");
  if (action === "export-csv") return exportCsv();
}

function exportCsv() {
  const rows = [["训练日期", "训练心得", "动作", "主要肌群", "组序号", "重量", "单位", "次数", "组开始", "组结束", "本组秒数", "组间歇秒数"]];
  state.history.slice().reverse().forEach(workout => workout.exercises.forEach(ex => {
    const done = ex.sets.filter(set => set.endedAt);
    done.forEach((set, index) => rows.push([
      new Date(workout.startedAt).toLocaleString("zh-CN"), workout.note || "", ex.name, ex.muscles.join("/"), index + 1,
      set.weight, state.unit, set.reps, new Date(set.startedAt).toLocaleString("zh-CN"), new Date(set.endedAt).toLocaleString("zh-CN"),
      secondsBetween(set.startedAt, set.endedAt), index ? secondsBetween(done[index - 1].endedAt, set.startedAt) : ""
    ]));
  }));
  const csv = "\ufeff" + rows.map(row => row.map(cell => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
  downloadFile("力量训练记录.csv", csv, "text/csv;charset=utf-8");
}

function downloadFile(name, content, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
  toast("文件已生成");
}

function updateLiveTimers() {
  const workoutTimer = document.querySelector('[data-live="workout"]');
  if (workoutTimer) workoutTimer.textContent = formatDuration(workoutElapsed());
  const setTimer = document.querySelector('[data-live="set"]');
  if (setTimer && state.workout) {
    const set = state.workout.exercises[state.activeExercise].sets.find(item => item.startedAt && !item.endedAt);
    if (set) setTimer.textContent = formatDuration(secondsBetween(set.startedAt, now()));
  }
  document.querySelectorAll("[data-rest-index]").forEach(node => {
    const ex = state.workout?.exercises[state.activeExercise];
    if (ex) node.textContent = formatDuration(restAfter(ex, Number(node.dataset.restIndex)));
  });
}

function toast(message) {
  document.querySelector(".toast")?.remove();
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  document.body.appendChild(node);
  setTimeout(() => node.remove(), 2200);
}

render();
