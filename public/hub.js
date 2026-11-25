const sections = [
  { key: "brief", label: "Civic Brief", action: "Read the brief", filters: ["Local reporting", "Public decisions", "Nonprofit spotlight"] },
  { key: "learn", label: "Civic Learning Center", action: "Open the guide" },
  { key: "opportunities", list: "opportunity", label: "Opportunities", filters: ["Nonprofit boards", "Public boards", "Run for office", "Civic careers"] },
  { key: "initiatives", label: "Initiatives", action: "Explore the initiative" },
  { key: "directory", label: "Community directory", filters: ["Educate", "Connect", "Activate"] },
  { key: "events", label: "Civic calendars" }
];

const catalog = sections.flatMap(section => hubContent[section.key].map(item => ({ ...item, section })));
const byId = new Map(catalog.map(item => [item.id, item]));
const storageKey = "kc-now-hub-saved-v1";
const saved = new Set(readSaved());
const byElementId = id => document.getElementById(id);
const dialog = byElementId("dialog");
const dialogBody = byElementId("dialog-body");
let dialogView;
let dialogTrigger;

function readSaved() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(stored) ? stored.filter(id => byId.has(id)) : [];
  } catch {
    return [];
  }
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function icon(name) {
  const node = element("i");
  node.dataset.icon = name;
  node.setAttribute("aria-hidden", "true");
  return node;
}

function iconTile(item) {
  const tile = element("span", "icon-tile " + item.tone);
  tile.append(icon(item.icon));
  return tile;
}

function button(label, className) {
  const node = element("button", className, label);
  node.type = "button";
  return node;
}

function sourceLink([label, href]) {
  const link = element("a", "text-link", label);
  link.href = href;
  return link;
}

function linkGroup(links, className = "card-links") {
  const group = element("div", className);
  group.append(...links.map(sourceLink));
  return group;
}

function detailButton(item, label) {
  const node = button(label, "text-link");
  node.dataset.detail = item.id;
  return node;
}

function saveButton(item) {
  const node = button("", "icon-button");
  node.dataset.save = item.id;
  updateSaveButton(node, item);
  return node;
}

function updateSaveButton(node, item) {
  const isSaved = saved.has(item.id);
  node.setAttribute("aria-label", (isSaved ? "Remove from saved: " : "Save: ") + item.title);
  node.setAttribute("aria-pressed", String(isSaved));
  node.replaceChildren(icon(isSaved ? "bookmark-fill" : "bookmark"));
}

function updateCount() {
  const count = byElementId("saved-count");
  count.textContent = saved.size;
  count.hidden = saved.size === 0;
}

function toggleSave(id) {
  const item = byId.get(id);
  if (saved.has(id)) saved.delete(id);
  else saved.add(id);

  let persistence = "";
  try {
    localStorage.setItem(storageKey, JSON.stringify([...saved]));
  } catch {
    persistence = " Changes apply to this visit.";
  }

  document.querySelectorAll("[data-save]").forEach(node => updateSaveButton(node, byId.get(node.dataset.save)));
  updateCount();
  if (dialogView === "saved") {
    const next = renderSaved();
    (next.querySelector("[data-save]") ?? dialog.querySelector(".dialog-close button")).focus();
  }
  byElementId("status").textContent = (saved.has(id) ? "Saved " : "Removed ") + item.title + "." + persistence;
}

function renderCard(item) {
  const isEvent = item.section.key === "events";
  const card = element("article", isEvent ? "card event-card" : "card");
  const title = element("h3", "", item.title);
  const summary = element("p", "", item.description);

  if (isEvent) {
    const body = element("div");
    body.append(title, summary, sourceLink(item.links[0]));
    card.append(iconTile(item), body);
    return card;
  }

  if (item.section.key === "brief") {
    const artwork = element("div", "card-media " + item.tone);
    artwork.append(icon(item.icon));
    card.append(artwork);
  } else {
    card.append(iconTile(item));
  }

  card.append(element("p", "eyebrow", item.kind), title, summary);
  if (item.source) card.append(element("p", "detail-source", item.source));

  const actions = element("div", "card-actions");
  const mainAction = item.section.action ? detailButton(item, item.section.action) : linkGroup(item.links);
  actions.append(mainAction, saveButton(item));
  card.append(actions);
  return card;
}

function renderSection(section) {
  const prefix = section.list ?? section.key;
  const list = byElementId(prefix + "-list");
  const items = catalog.filter(item => item.section === section);
  const show = filter => {
    const matches = filter === "All" ? items : items.filter(item => item.kind.split(" · ").includes(filter));
    list.replaceChildren(...matches.map(renderCard));
    return matches.length;
  };

  show("All");
  if (!section.filters) return;
  const filters = byElementId(prefix + "-filters");
  for (const name of ["All", ...section.filters]) {
    const control = button(name, "filter");
    control.setAttribute("aria-pressed", String(name === "All"));
    control.setAttribute("aria-controls", list.id);
    control.addEventListener("click", () => {
      filters.querySelector('[aria-pressed="true"]').setAttribute("aria-pressed", "false");
      control.setAttribute("aria-pressed", "true");
      const count = show(name);
      byElementId("status").textContent = count + (count === 1 ? " result" : " results") + " in " + section.label + ".";
    });
    filters.append(control);
  }
}

function setupDialog(kicker, title, view) {
  dialogView = view;
  byElementId("dialog-kicker").textContent = kicker;
  byElementId("dialog-title").textContent = title;
  dialogBody.replaceChildren();
  if (!dialog.open) {
    dialogTrigger = document.activeElement;
    dialog.showModal();
  }
  dialog.scrollTop = 0;
}

function showItem(item) {
  setupDialog(item.section.label + " · " + item.kind, item.title, "detail");
  dialogBody.append(element("p", "", item.description));
  if (item.source) dialogBody.append(element("p", "form-help", item.source));
  for (const [heading, body] of item.details ?? []) {
    const block = element("div", "detail");
    block.append(element("h3", "", heading), element("p", "", body));
    dialogBody.append(block);
  }

  const sources = element("div", "detail");
  sources.append(element("h3", "", "Explore the sources"), linkGroup(item.links));
  dialogBody.append(sources);
  if (item.related) dialogBody.append(linkGroup(item.related));
  if (item.section.key !== "events") {
    const actions = element("div", "card-top");
    actions.append(element("span", "form-help", "Save this resource for later"), saveButton(item));
    dialogBody.append(actions);
  }
  dialog.querySelector(".dialog-close button").focus();
}

function renderList(target, items, showSave = false) {
  const list = element("ul", "dialog-list");
  for (const item of items) {
    const row = element("li");
    row.append(detailButton(item, item.title));
    if (showSave) row.append(saveButton(item));
    list.append(row);
  }
  target.replaceChildren(list);
}

function renderSaved() {
  const results = element("div");
  dialogBody.replaceChildren(element("p", "", "Saved resources stay in this browser."));
  if (saved.size) renderList(results, [...saved].map(id => byId.get(id)), true);
  else results.append(element("p", "form-help", "Use a bookmark icon to save a guide, initiative, or other resource."));
  dialogBody.append(results);
  return results;
}

function openSaved() {
  setupDialog("Your reading list", "Saved items", "saved");
  renderSaved();
}

function openSearch() {
  setupDialog("Find a resource", "Search the hub", "search");
  const label = element("label", "search-label", "Search by topic, role, or organization");
  const input = element("input");
  input.type = "search";
  const note = element("p", "form-help");
  note.setAttribute("role", "status");
  const results = element("div");
  label.append(input);
  dialogBody.append(label, note, results);

  function search() {
    const terms = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    note.classList.toggle("sr-only", terms.length === 0);
    results.hidden = terms.length === 0;
    if (!terms.length) {
      note.textContent = "";
      results.replaceChildren();
      return;
    }
    const matches = catalog.filter(item => {
      const index = [item.title, item.kind, item.description, item.source, item.section.label, ...item.links.map(([name]) => name)].join(" ").toLowerCase();
      return terms.every(term => index.includes(term));
    });
    note.textContent = matches.length === 1 ? "1 result" : matches.length + " results";
    if (matches.length) renderList(results, matches);
    else results.replaceChildren(element("p", "", "Try a different keyword."));
  }

  input.addEventListener("input", search);
  search();
  input.focus();
}

function labeledSelect(name, labelText, options) {
  const label = element("label", "", labelText);
  const select = element("select");
  select.name = name;
  for (const [value, text] of options) {
    const option = element("option", "", text);
    option.value = value;
    select.append(option);
  }
  label.append(select);
  return label;
}

function demoSubmit(label) {
  const control = button(label, "button primary");
  control.type = "submit";
  return control;
}

function openConnect() {
  setupDialog("Find a next step", "What would you like to do?", "connect");
  const form = element("form", "form-grid");
  const intent = labeledSelect("intent", "What brings you here?", [["learn", "Learn how to take part"], ["connect", "Meet people and organizations"], ["serve", "Find a leadership role"]]);
  const topic = labeledSelect("topic", "What interests you?", [["housing", "Housing"], ["transport", "Transportation"], ["climate", "Environment"], ["boards", "Nonprofit leadership"], ["government", "Local government"]]);
  const result = element("div", "result-box");
  result.setAttribute("role", "status");
  form.append(intent, topic, demoSubmit("Show starting points"));
  dialogBody.append(element("p", "", "Choose a goal and an issue to get suggested resources. Your choices stay in this preview."), form, result);
  form.addEventListener("submit", event => {
    event.preventDefault();
    const selections = new FormData(form);
    const topicRoutes = {
      housing: "housing-initiative", transport: "transport-initiative", climate: "climate-initiative",
      boards: "board-readiness", government: "local-government"
    };
    const intentRoutes = { learn: "public-comment", connect: "centurions", serve: "nonprofit-boards" };
    const itemIds = [topicRoutes[selections.get("topic")], intentRoutes[selections.get("intent")]];
    const picks = itemIds.map(id => byId.get(id));
    result.replaceChildren(element("p", "result-copy", "Here are two ways to get started."));
    const list = element("div");
    renderList(list, picks);
    result.append(list);
  });
}

function openNewsletter() {
  setupDialog("Sample issue", "The KC Now monthly briefing", "newsletter");
  dialogBody.append(element("p", "", "A short roundup of what to read, where to meet, and how to serve."));
  const sample = element("div");
  renderList(sample, ["housing-brief", "marc-calendar", "nonprofit-boards"].map(id => byId.get(id)));
  const controls = element("div");
  const start = button("Try the subscribe flow", "button secondary");
  controls.append(start);
  start.addEventListener("click", () => {
    const sampleEmail = element("label", "search-label", "Sample email address");
    const input = element("input");
    input.type = "email";
    input.value = "reader@example.test";
    input.readOnly = true;
    sampleEmail.append(input);
    const form = element("form", "form-grid");
    form.append(sampleEmail, demoSubmit("Preview subscription"), element("p", "form-help", "This demo uses a sample address."));
    controls.replaceChildren(form);
    input.focus();
    form.addEventListener("submit", event => {
      event.preventDefault();
      const done = element("p", "result-box", "Subscription preview complete. No email was sent.");
      done.tabIndex = -1;
      controls.replaceChildren(done);
      done.focus();
    });
  });
  dialogBody.append(sample, controls);
}

function openSubmission() {
  setupDialog("Resource suggestion", "Suggest a civic resource", "submission");
  const form = element("form", "form-grid");
  const type = labeledSelect("category", "Resource type", [["Event", "Event"], ["Learning resource", "Learning resource"], ["Opportunity", "Opportunity"], ["Initiative", "Initiative"]]);
  const title = element("label", "", "Sample title");
  const titleInput = element("input");
  titleInput.value = "Community planning workshop";
  titleInput.readOnly = true;
  title.append(titleInput);
  const url = element("label", "", "Sample source link");
  const urlInput = element("input");
  urlInput.type = "url";
  urlInput.value = "https://example.test/workshop";
  urlInput.readOnly = true;
  url.append(urlInput);

  const result = element("p", "result-box");
  result.setAttribute("role", "status");
  form.append(type, title, url, demoSubmit("Preview suggestion"));
  dialogBody.append(element("p", "", "Preview the information an editor would review using sample content."), form, result);
  form.addEventListener("submit", event => {
    event.preventDefault();
    const selected = new FormData(form).get("category");
    result.textContent = selected + " suggestion ready for review in the demo. Nothing was sent.";
  });
}

const openView = { search: openSearch, saved: openSaved, connect: openConnect, newsletter: openNewsletter, submission: openSubmission };
const menu = document.querySelector(".menu-toggle");
const navigation = byElementId("navigation");

function setMenu(isOpen) {
  menu.setAttribute("aria-expanded", String(isOpen));
  navigation.classList.toggle("open", isOpen);
}

document.querySelectorAll("[data-icon]").forEach(node => node.setAttribute("aria-hidden", "true"));
sections.forEach(renderSection);
updateCount();

menu.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") !== "true"));
navigation.addEventListener("click", event => {
  if (event.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menu.focus();
  }
});
document.addEventListener("click", event => {
  const action = event.target.closest("button[data-dialog], button[data-detail], button[data-save]");
  if (action?.dataset.dialog) openView[action.dataset.dialog]();
  if (action?.dataset.detail) showItem(byId.get(action.dataset.detail));
  if (action?.dataset.save) toggleSave(action.dataset.save);
  if (dialog.open && event.target.closest('a[href^="#"]')) dialog.close();
});
dialog.addEventListener("close", () => {
  if (dialogTrigger?.isConnected) dialogTrigger.focus({ preventScroll: true });
  dialogTrigger = null;
  dialogView = null;
});
