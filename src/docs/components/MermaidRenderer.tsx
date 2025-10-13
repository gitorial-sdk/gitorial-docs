import mermaid from "mermaid";
import { useEffect, useRef, useState } from "preact/hooks";

import { convertNameToHex, convertOklchToHex, isName, isOklch } from "@/utils/color-utils";

interface MermaidRendererProps {
  id: string;
  code: string;
}

export default function MermaidRenderer({ code, id }: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const renderMermaid = async () => {
      if (!containerRef.current || !code) return;

      try {
        // Get current theme colors from CSS variables
        const style = getComputedStyle(document.documentElement);
        const isDark = document.documentElement.classList.contains("dark");

        // Map your theme colors to Mermaid variables
        //src: https://mermaid.js.org/config/theming.html#theme-variables
        const themeColors = {
          background: getColor(style, "--background"),
          fontFamily: style.getPropertyValue("--font-sans").trim(),
          fontSize: style.getPropertyValue("--font-size-base").trim(),
          // Use lighter shades for better contrast
          primaryColor: isDark
            ? getColor(style, "--color-primary-900") // Dark purple for dark mode
            : getColor(style, "--color-primary-100"), // Light purple for light mode
          primaryTextColor: isDark
            ? getColor(style, "--color-primary-200") // Light text on dark background
            : getColor(style, "--color-primary-900"), // Dark text on light background
          primaryBorderColor: isDark
            ? getColor(style, "--color-primary-700")
            : getColor(style, "--color-primary-300"),
          lineColor: isDark
            ? getColor(style, "--color-primary-600")
            : getColor(style, "--color-primary-400"),
          secondaryColor: isDark
            ? getColor(style, "--color-base-800")
            : getColor(style, "--color-base-100"),
          tertiaryColor: isDark
            ? getColor(style, "--color-base-700")
            : getColor(style, "--color-base-200"),
        };

        // Initialize Mermaid with theme colors
        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables: themeColors,
        });

        // Clear previous content
        containerRef.current.innerHTML = "";

        // Render the diagram
        const { svg } = await mermaid.render(`mermaid-${id}`, code);
        containerRef.current.innerHTML = svg;
        setIsRendered(true);
      } catch (error) {
        console.error("Failed to render Mermaid diagram:", error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `<pre class="text-red-500 p-4 bg-red-50 dark:bg-red-900/20 rounded">${error}</pre>`;
        }
      }
    };

    renderMermaid();

    // Watch for theme changes
    const observer = new MutationObserver(renderMermaid);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Also watch for prefers-color-scheme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMediaQueryChange = () => renderMermaid();
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [code, id]);

  function getColor(style: CSSStyleDeclaration, variable: string): string {
    const color = style.getPropertyValue(variable).trim();
    if (color === "") {
      throw new Error(`${variable} is not set`);
    }
    if (isOklch(color)) {
      return convertOklchToHex(color);
    } else if (color.startsWith("#")) {
      return color;
    } else if (isName(color)) {
      return convertNameToHex(color);
    } else {
      throw new Error(`Invalid color: ${color}`);
    }
  }
  return (
    <div
      ref={containerRef}
      className={`mermaid-container ${isRendered ? "rendered" : "loading"}`}
      style={{
        minHeight: "100px",
        opacity: isRendered ? 1 : 0.7,
        transition: "opacity 0.2s ease-in-out",
      }}
    />
  );
}
