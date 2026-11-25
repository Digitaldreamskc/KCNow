(() => {
  // Projected U.S. Census Bureau county boundaries from https://github.com/topojson/us-atlas.
  const shapes = [
    ["miami", "ks", [149.3, 356.2], "M88.59,294.64L212.37,294.64L211.38,386.84L211.38,418L86.61,417.7L86.61,310.13Z"],
    ["ray", "mo", [383.1, 76.4], "M322.29,39.95L323.28,14.15L447.05,15.07L447.05,128.19L424.28,125.44L408.44,136.45L396.55,137.98L390.61,150.81L383.68,147.76L390.61,136.75L385.66,128.8L372.79,133.7L373.78,147.15L362.89,154.18L351,150.81L343.08,141.03L328.23,136.75L333.18,126.36L321.3,128.19Z"],
    ["jackson", "mo", [284.4, 198.7], "M212.37,186.24L212.37,161.51L236.14,148.98L247.03,150.2L252.97,159.06L269.8,142.56L272.78,133.08L278.72,143.79L300.5,117.79L309.41,117.79L321.3,128.19L333.18,126.36L328.23,136.75L343.08,141.03L351,150.81L349.02,231.36L347.04,261.19L245.05,258.15L212.37,256.02Z"],
    ["clay", "mo", [264, 91.1], "M214.35,145.31L214.35,39.33L322.29,39.95L321.3,128.19L309.41,117.79L300.5,117.79L278.72,143.79L272.78,133.08L269.8,142.56L252.97,159.06L247.03,150.2L236.14,148.98L212.37,161.51Z"],
    ["cass", "mo", [282.5, 326.8], "M212.37,294.64L212.37,256.02L245.05,258.15L347.04,261.19L345.06,323.79L348.03,323.79L347.04,354.42L362.89,355.03L361.9,397.43L356.94,394.4L332.19,398.04L318.33,393.19L309.41,396.52L294.56,388.96L211.38,386.84Z"],
    ["leavenworth", "ks", [94.2, 130.7], "M54.93,52.53L113.35,52.84L125.23,65.1L138.1,68.17L129.19,75.83L135.13,100.04L152.96,115.95L149.99,124.52L166.82,130.64L132.16,129.72L129.19,204.84L118.3,207.59L98.5,201.8L88.59,208.2L83.64,214.6L58.89,208.5L52.95,214.6L52.95,186.24L54.93,156.01Z"],
    ["wyandotte", "ks", [168.8, 161.3], "M166.82,130.64L169.79,137.98L183.65,141.34L192.57,136.45L197.52,145.92L214.35,145.31L212.37,161.51L212.37,186.24L158.9,186.54L140.09,181.05L129.19,204.84L132.16,129.72Z"],
    ["johnson", "ks", [153.1, 243.3], "M88.59,208.2L98.5,201.8L118.3,207.59L129.19,204.84L140.09,181.05L158.9,186.54L212.37,186.24L212.37,256.02L212.37,294.64L88.59,294.64Z"],
    ["platte", "mo", [166.9, 66.6], "M75.72,12L214.35,12.92L214.35,39.33L214.35,145.31L197.52,145.92L192.57,136.45L183.65,141.34L169.79,137.98L166.82,130.64L149.99,124.52L152.96,115.95L135.13,100.04L129.19,75.83L138.1,68.17L125.23,65.1L113.35,52.84L107.41,43.02L91.56,33.5L90.57,24.6Z"],
  ];
  const surroundingCounties = [
    "M-34.19,294.33L88.59,294.64L86.61,310.13L86.61,417.7L-36.17,417.4L-36.17,401.97L-36.17,309.83Z",
    "M515.38,358.97L516.37,310.13L520.33,241.71L519.34,227.4L519.34,222.22L642.13,227.4L639.16,310.74L637.18,368.36L575.78,366.24L575.78,376.54L514.39,374.42Z",
    "M214.35,-64.63L323.28,-64.33L323.28,14.15L322.29,39.95L214.35,39.33L214.35,12.92Z",
    "M323.28,-64.33L323.28,-79.74L447.05,-78.2L447.05,-15.98L447.05,15.07L323.28,14.15Z",
    "M351,150.81L362.89,154.18L373.78,147.15L372.79,133.7L385.66,128.8L390.61,136.75L383.68,147.76L390.61,150.81L396.55,137.98L408.44,136.45L424.28,125.44L447.05,128.19L459.93,128.5L476.76,113.51L494.59,116.57L501.52,124.21L520.33,122.38L520.33,101.26L524.29,97.89L519.34,222.22L519.34,227.4L426.26,224.05L425.27,234.41L349.02,231.36Z",
    "M447.05,15.07L447.05,-15.98L579.74,-17.52L582.72,6.16L577.76,16.92L583.71,37.8L593.61,33.5L597.57,44.86L624.3,53.76L627.28,65.41L617.37,67.25L610.44,57.74L600.54,58.97L603.51,71.85L592.62,85.33L585.69,81.66L579.74,91.15L564.89,91.77L563.9,112.89L547.07,121.46L543.11,106.77L524.29,97.89L520.33,101.26L520.33,122.38L501.52,124.21L494.59,116.57L476.76,113.51L459.93,128.5L447.05,128.19Z",
    "M86.61,417.7L211.38,418L211.38,533.54L211.38,541.37L82.65,541.37L83.64,463.62L86.61,463.62Z",
    "M-57.96,125.13L-57.96,52.84L-53.01,52.84L54.93,52.53L54.93,156.01L52.95,186.24L22.25,186.85L10.37,190.81L-16.37,177.08L-33.2,181.66L-59.94,178.91Z",
    "M347.04,261.19L349.02,231.36L425.27,234.41L426.26,224.05L519.34,227.4L520.33,241.71L516.37,310.13L515.38,358.97L362.89,355.03L347.04,354.42L348.03,323.79L345.06,323.79Z",
    "M211.38,418L211.38,386.84L294.56,388.96L309.41,396.52L318.33,393.19L332.19,398.04L356.94,394.4L361.9,397.43L359.91,479.31L366.85,479.31L363.88,541.67L350.01,541.37L337.14,534.45L314.36,545.28L314.36,536.55L211.38,533.54Z",
    "M-51.03,-31.06L10.37,-31.06L72.75,-30.75L77.7,-19.36L89.58,-17.52L91.56,-10.13L74.73,-2.75L75.72,12L90.57,24.6L91.56,33.5L107.41,43.02L113.35,52.84L54.93,52.53L-53.01,52.84L-53.01,0.32Z",
    "M-33.2,181.66L-16.37,177.08L10.37,190.81L22.25,186.85L52.95,186.24L52.95,214.6L58.89,208.5L83.64,214.6L88.59,208.2L88.59,294.64L-34.19,294.33L-34.19,248.11Z",
    "M524.29,97.89L543.11,106.77L547.07,121.46L563.9,112.89L564.89,91.77L579.74,91.15L585.69,81.66L592.62,85.33L603.51,71.85L600.54,58.97L610.44,57.74L617.37,67.25L627.28,65.41L644.11,89.01L666.88,90.85L667.87,101.26L684.71,122.99L697.58,121.46L670.85,163.95L681.74,167.92L673.82,178.91L643.12,211.86L642.13,227.4L519.34,222.22Z",
    "M211.38,541.37L211.38,533.54L314.36,536.55L314.36,545.28L337.14,534.45L350.01,541.37L363.88,541.67L361.9,589.17L359.91,639.88L359.91,680.31L210.39,675.53L209.4,668.64Z",
  ];
  const stateLine = "M19.28,-155.73L35.12,-137.18L47.99,-133.78L48.98,-120.49L61.86,-122.34L66.81,-111.22L92.55,-106.9L106.42,-118.94L124.24,-115.55L120.28,-106.9L138.1,-91.16L137.11,-82.83L125.23,-80.05L128.2,-68.95L140.09,-73.88L139.09,-58.78L129.19,-56.93L116.32,-64.33L111.37,-41.22L96.52,-35.37L89.58,-17.52L91.56,-10.13L74.73,-2.75L75.72,12L90.57,24.6L91.56,33.5L107.41,43.02L113.35,52.84L125.23,65.1L138.1,68.17L129.19,75.83L135.13,100.04L152.96,115.95L149.99,124.52L166.82,130.64L169.79,137.98L183.65,141.34L192.57,136.45L197.52,145.92L214.35,145.31L212.37,161.51L212.37,186.24L212.37,256.02L212.37,294.64L211.38,386.84L211.38,418L211.38,533.54L211.38,541.37L209.4,668.64L210.39,675.53L210.39,776.21L210.39,785.15L209.4,882.45L209.4,902.63";

  const map = byElementId("county-map");
  const labels = byElementId("county-map-labels");
  const picker = byElementId("county-choice");
  const mapBox = map.viewBox.baseVal;
  const controls = new Map();

  function svgElement(tag, attributes) {
    const node = document.createElementNS(map.namespaceURI, tag);
    for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, value);
    return node;
  }

  function showResources(container, [title, href, description]) {
    container.replaceChildren(sourceLink([title, href]), element("p", "", description));
  }

  function selectCounty(id, announce = true) {
    const county = countyResources[id];
    for (const [key, { control, label }] of controls) {
      control.setAttribute("aria-pressed", String(key === id));
      label.classList.toggle("selected", key === id);
    }
    picker.value = id;
    byElementId("county-state").textContent = county.state;
    byElementId("county-name").textContent = county.name + " County";
    showResources(byElementId("county-civic"), county.civic);
    showResources(byElementId("county-nonprofit"), county.nonprofit);
    if (announce) byElementId("status").textContent = "Showing resources for " + county.name + " County, " + county.state + ".";
  }

  for (const path of surroundingCounties) {
    map.append(svgElement("path", { d: path, class: "county-context", "aria-hidden": "true" }));
  }

  for (const [id, county] of Object.entries(countyResources).sort(([, a], [, b]) => a.name.localeCompare(b.name))) {
    picker.add(new Option(county.name + ", " + county.state, id));
  }

  for (const [id, state, [x, y], path] of shapes) {
    const county = countyResources[id];
    const control = svgElement("a", {
      href: "#county-resources",
      role: "button",
      tabindex: "0",
      "aria-label": county.name + " County, " + county.state,
      "aria-controls": "county-resources",
    });
    control.append(svgElement("path", { d: path, class: "county-shape county-" + state }));
    control.addEventListener("click", event => {
      event.preventDefault();
      selectCounty(id);
    });
    control.addEventListener("keydown", event => {
      if (event.key === " ") {
        event.preventDefault();
        selectCounty(id);
      }
    });
    map.append(control);

    const label = element("span", "county-map-label", county.name);
    label.style.left = ((x - mapBox.x) / mapBox.width * 100) + "%";
    label.style.top = ((y - mapBox.y) / mapBox.height * 100) + "%";
    label.addEventListener("click", () => selectCounty(id));
    labels.append(label);
    controls.set(id, { control, label });
  }

  map.append(svgElement("path", { d: stateLine, class: "county-state-line", "aria-hidden": "true" }));
  picker.addEventListener("change", () => selectCounty(picker.value));
  selectCounty("miami", false);
})();
