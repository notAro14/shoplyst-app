export const semanticColors = {
  bg: "var(--colors-brand1)",
  "bg-alt": "var(--colors-brand1)",
  "bg-transparent": "var(--colors-brandA1)",
  "bg-subtle": "var(--colors-brand2)",
  ui: "var(--colors-brand3)",
  "ui-hovered": "var(--colors-brand4)",
  "ui-selected": "var(--colors-brand5)",
  line: "var(--colors-brand6)",
  border: "var(--colors-brand7)",
  "border-hovered": "var(--colors-brand8)",
  solid: "var(--colors-brand9)",
  "solid-hovered": "var(--colors-brand10)",
  "text-lo": "var(--colors-brand11)",
  "text-hi": "var(--colors-brand12)",

  "border-gray": "var(--colors-gray7)",
  "border-gray-hovered": "var(--colors-gray8)",
  "text-lo-gray": "var(--colors-gray11)",
  "text-hi-gray": "var(--colors-gray12)",

  "bg-danger": "var(--colors-danger1)",
  "bg-transparent-danger": "var(--colors-dangerA1)",
  "bg-subtle-danger": "var(--colors-danger2)",
  "ui-danger": "var(--colors-danger3)",
  "ui-hovered-danger": "var(--colors-danger4)",
  "ui-selected-danger": "var(--colors-danger5)",
  "line-danger": "var(--colors-danger6)",
  "border-danger": "var(--colors-danger7)",
  "border-hovered-danger": "var(--colors-danger8)",
  "solid-danger": "var(--colors-danger9)",
  "solid-hovered-danger": "var(--colors-danger10)",
  "text-lo-danger": "var(--colors-danger11)",
  "text-hi-danger": "var(--colors-danger12)",

  "bg-warning": "var(--colors-warning1)",
  "bg-transparent-warning": "var(--colors-warningA1)",
  "bg-subtle-warning": "var(--colors-warning2)",
  "ui-warning": "var(--colors-warning3)",
  "ui-hovered-warning": "var(--colors-warning4)",
  "ui-selected-warning": "var(--colors-warning5)",
  "line-warning": "var(--colors-warning6)",
  "border-warning": "var(--colors-warning7)",
  "border-hovered-warning": "var(--colors-warning8)",
  "solid-warning": "var(--colors-warning9)",
  "solid-hovered-warning": "var(--colors-warning10)",
  "text-lo-warning": "var(--colors-warning11)",
  "text-hi-warning": "var(--colors-warning12)",

  "bg-accent": "var(--colors-accent1)",
  "bg-transparent-accent": "var(--colors-accentA1)",
  "bg-subtle-accent": "var(--colors-accent2)",
  "ui-accent": "var(--colors-accent3)",
  "ui-hovered-accent": "var(--colors-accent4)",
  "ui-selected-accent": "var(--colors-accent5)",
  "line-accent": "var(--colors-accent6)",
  "border-accent": "var(--colors-accent7)",
  "border-hovered-accent": "var(--colors-accent8)",
  "solid-accent": "var(--colors-accent9)",
  "solid-hovered-accent": "var(--colors-accent10)",
  "text-lo-accent": "var(--colors-accent11)",
  "text-hi-accent": "var(--colors-accent12)",

  overlay: "var(--colors-black11)",
  "text-fg-white": "var(--colors-white12)",
  "text-fg-black": "var(--colors-black12)",
} as const

export const colors = {
  ...semanticColors,

  "text-functional": semanticColors["text-hi-gray"],
  "text-functional-low": semanticColors["text-lo-gray"],
  "text-vibrant": semanticColors["text-hi"],
  "text-vibrant-low": semanticColors["text-lo"],
  "text-danger-low": semanticColors["text-lo-danger"],
  "text-danger": semanticColors["text-hi-danger"],
  "text-warning-low": semanticColors["text-lo-warning"],
  "text-warning": semanticColors["text-hi-warning"],
  "text-accent-low": semanticColors["text-lo-accent"],
  "text-accent": semanticColors["text-hi-accent"],
}
