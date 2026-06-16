export function updateFavicon(theme: "light" | "dark") {
  if (typeof document === "undefined") return;

  const href =
    theme === "dark" ? "/favicon-dark.svg" : "/favicon-light.svg";

  let link = document.querySelector<HTMLLinkElement>("link[data-theme-icon]");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.setAttribute("data-theme-icon", "true");
    document.head.appendChild(link);
  }

  link.href = href;
}
