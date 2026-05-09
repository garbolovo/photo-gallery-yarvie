const gallery = document.querySelector("#gallery");
const empty = document.querySelector("#empty");
const filters = document.querySelectorAll(".filter");
const viewer = document.querySelector("#viewer");
const viewerContent = document.querySelector("#viewerContent");
const viewerCaption = document.querySelector("#viewerCaption");
const closeButton = document.querySelector(".close");

const imageExtensions = new Set(["jpg", "jpeg", "png", "gif", "webp", "avif"]);
const videoExtensions = new Set(["mp4", "webm", "mov", "m4v"]);

let items = [];
let activeFilter = "all";

init();

async function init() {
  try {
    const response = await fetch("media.json", { cache: "no-store" });
    if (!response.ok) throw new Error("media.json not found");
    items = await response.json();
  } catch (error) {
    items = [];
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      filters.forEach((item) => item.classList.toggle("active", item === button));
      render();
    });
  });

  closeButton.addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) viewer.close();
  });

  render();
}

function render() {
  gallery.textContent = "";
  const visibleItems = items.filter((item) => activeFilter === "all" || getType(item.src) === activeFilter);

  empty.hidden = visibleItems.length > 0;

  visibleItems.forEach((item) => {
    const type = getType(item.src);
    if (!type) return;

    const tile = document.createElement("button");
    tile.className = "tile";
    tile.type = "button";
    tile.addEventListener("click", () => openViewer(item, type));

    if (type === "image") {
      const image = document.createElement("img");
      image.src = item.src;
      image.alt = item.title || "Фото";
      image.loading = "lazy";
      tile.append(image);
    } else {
      const video = document.createElement("video");
      video.src = item.src;
      video.muted = true;
      video.playsInline = true;
      video.preload = "metadata";
      tile.append(video);

      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = "Видео";
      tile.append(badge);
    }

    if (item.title) {
      const caption = document.createElement("div");
      caption.className = "caption";
      caption.textContent = item.title;
      tile.append(caption);
    }

    gallery.append(tile);
  });
}

function openViewer(item, type) {
  viewerContent.textContent = "";

  if (type === "image") {
    const image = document.createElement("img");
    image.src = item.src;
    image.alt = item.title || "Фото";
    viewerContent.append(image);
  } else {
    const video = document.createElement("video");
    video.src = item.src;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    viewerContent.append(video);
  }

  viewerCaption.textContent = item.title || "";
  viewer.showModal();
}

function getType(src) {
  const extension = src.split(".").pop().toLowerCase();
  if (imageExtensions.has(extension)) return "image";
  if (videoExtensions.has(extension)) return "video";
  return "";
}
