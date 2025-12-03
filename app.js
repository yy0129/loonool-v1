// 模拟当前登录用户（后续可以从后端接口替换）
const currentUser = {
  name: "Jinxi",
  initials: "JX", // 头像上的字母
};

// 假数据：模拟从后端拿到的空间列表
const spaces = [
  {
    id: "SP-001",
    name: "亚马逊主图审核 · 11月活动",
    owner: "Jinxi",
    taskCount: 5,
    lastUpdated: "2025-11-30 18:23",
    status: "active",
  },
  {
    id: "SP-002",
    name: "新品包装图审核 · 新年主题",
    owner: "Design Team",
    taskCount: 3,
    lastUpdated: "2025-11-28 14:05",
    status: "active",
  },
  {
    id: "SP-003",
    name: "历史活动 · 已归档示例",
    owner: "Marketing",
    taskCount: 8,
    lastUpdated: "2025-10-10 09:12",
    status: "archived",
  },
];

// 状态文字
function statusLabel(status) {
  if (status === "active") return "活跃";
  return "已归档";
}

// 渲染空间表格
function renderSpaces() {
  const tbody = document.getElementById("spaces-tbody");
  const tableWrapper = document.getElementById("spaces-table-wrapper");
  const emptyState = document.getElementById("empty-state");

  if (!tbody || !tableWrapper || !emptyState) return;

  if (!spaces.length) {
    tableWrapper.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  tableWrapper.style.display = "block";
  emptyState.style.display = "none";

  tbody.innerHTML = "";

  spaces.forEach((space) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="space-name">
        <span class="space-name-main">${space.name}</span>
        <span class="space-name-sub">Space ID：${space.id}</span>
      </td>
      <td>${space.owner}</td>
      <td>${space.taskCount}</td>
      <td>${space.lastUpdated}</td>
      <td>
        <span class="status-pill status-${space.status}">
          ${statusLabel(space.status)}
        </span>
      </td>
      <td class="actions-cell">
        <button class="btn-outline" onclick="enterSpace('${space.id}')">
          进入空间
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// 点击“进入空间”
function enterSpace(spaceId) {
  const space = spaces.find((s) => s.id === spaceId);
  console.log("进入空间：", spaceId, space);

  // 这里可以改成真正的跳转：
  // window.location.href = `/review-space.html?id=${encodeURIComponent(spaceId)}`;
  alert(`准备进入空间：${space ? space.name : spaceId}`);
}

// 点击“创建新的审核空间”
function createSpace() {
  console.log("创建新的审核空间");
  alert("这里可以弹出创建 Space 的流程（后端对接后再实现）");

  // 示例：跳转到创建页面：
  // window.location.href = "/create-space.html";
}

/* ========== 用户头像 + 下拉菜单相关逻辑 ========== */

// 初始化头像和用户名
function initUserInfo() {
  const avatarEl = document.getElementById("user-avatar");
  const nameEl = document.getElementById("user-name");

  if (avatarEl) avatarEl.textContent = currentUser.initials || "US";
  if (nameEl) nameEl.textContent = currentUser.name || "User";
}

// 绑定下拉菜单的展开 / 收起事件
function initUserMenu() {
  const navUser = document.getElementById("nav-user");
  const trigger = document.getElementById("user-menu-trigger");
  const dropdown = document.getElementById("user-dropdown");

  if (!navUser || !trigger || !dropdown) return;

  // 点击头像按钮，切换 open 状态
  trigger.addEventListener("click", (event) => {
    event.stopPropagation(); // 防止事件冒泡到 document
    const isOpen = navUser.classList.contains("open");
    if (isOpen) {
      navUser.classList.remove("open");
    } else {
      navUser.classList.add("open");
    }
  });

  // 点击菜单本身时，不要关闭（阻止冒泡）
  dropdown.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // 点击页面其他地方时，收起菜单
  document.addEventListener("click", () => {
    navUser.classList.remove("open");
  });
}

// 下拉菜单：个人中心
function goToProfile() {
  console.log("跳转到个人中心");
  alert("这里可以跳转到：/profile");
  // window.location.href = "/profile";
}

// 下拉菜单：我的空间
function goToMySpaces() {
  console.log("跳转到我的空间");
  alert("这里可以跳转到：/my-spaces");
  // window.location.href = "/my-spaces";
}

// 下拉菜单：退出登录
function logout() {
  console.log("退出登录");
  alert("这里可以调用登出接口，然后跳转到登录页");
  // 示例：
  // fetch("/api/logout").then(() => window.location.href = "/login");
}

// 页面加载完成后初始化
document.addEventListener("DOMContentLoaded", () => {
  initUserInfo();
  initUserMenu();
  renderSpaces();
});
