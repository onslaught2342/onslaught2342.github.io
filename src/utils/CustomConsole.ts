type TailwindColor =
  | "red" | "redLight" | "redDark"
  | "rose" | "roseDark"
  | "orange" | "orangeLight" | "orangeDark"
  | "amber" | "amberDark"
  | "yellow" | "yellowLight" | "yellowDark"
  | "green" | "greenLight" | "greenDark"
  | "emerald" | "emeraldDark"
  | "lime" | "limeDark"
  | "blue" | "blueLight" | "blueDark"
  | "sky" | "skyDark"
  | "cyan" | "cyanDark"
  | "purple" | "purpleLight" | "purpleDark"
  | "violet" | "violetDark"
  | "fuchsia" | "fuchsiaDark"
  | "pink" | "pinkLight" | "pinkDark"
  | "gray" | "grayLight" | "grayDark"
  | "zinc" | "zincDark"
  | "slate" | "slateDark"
  | "white" | "black";

type LogArg = string | number | boolean | object | null | undefined;

class CustomConsole {
  private enabled = true;

  private tailwindColors: Record<TailwindColor, string> = {
    red: "color: #f87171; font-weight: bold;",
    redLight: "color: #fecaca; font-weight: bold;",
    redDark: "color: #dc2626; font-weight: bold;",
    rose: "color: #fb7185; font-weight: bold;",
    roseDark: "color: #e11d48; font-weight: bold;",
    orange: "color: #fb923c; font-weight: bold;",
    orangeLight: "color: #fed7aa; font-weight: bold;",
    orangeDark: "color: #ea580c; font-weight: bold;",
    amber: "color: #fbbf24; font-weight: bold;",
    amberDark: "color: #d97706; font-weight: bold;",
    yellow: "color: #facc15; font-weight: bold;",
    yellowLight: "color: #fef08a; font-weight: bold;",
    yellowDark: "color: #ca8a04; font-weight: bold;",
    green: "color: #4ade80; font-weight: bold;",
    greenLight: "color: #bbf7d0; font-weight: bold;",
    greenDark: "color: #16a34a; font-weight: bold;",
    emerald: "color: #34d399; font-weight: bold;",
    emeraldDark: "color: #059669; font-weight: bold;",
    lime: "color: #84cc16; font-weight: bold;",
    limeDark: "color: #65a30d; font-weight: bold;",
    blue: "color: #60a5fa; font-weight: bold;",
    blueLight: "color: #bfdbfe; font-weight: bold;",
    blueDark: "color: #2563eb; font-weight: bold;",
    sky: "color: #38bdf8; font-weight: bold;",
    skyDark: "color: #0284c7; font-weight: bold;",
    cyan: "color: #22d3ee; font-weight: bold;",
    cyanDark: "color: #0891b2; font-weight: bold;",
    purple: "color: #a78bfa; font-weight: bold;",
    purpleLight: "color: #ddd6fe; font-weight: bold;",
    purpleDark: "color: #7c3aed; font-weight: bold;",
    violet: "color: #8b5cf6; font-weight: bold;",
    violetDark: "color: #5b21b6; font-weight: bold;",
    fuchsia: "color: #e879f9; font-weight: bold;",
    fuchsiaDark: "color: #c026d3; font-weight: bold;",
    pink: "color: #f472b6; font-weight: bold;",
    pinkLight: "color: #fbcfe8; font-weight: bold;",
    pinkDark: "color: #db2777; font-weight: bold;",
    gray: "color: #9ca3af; font-weight: bold;",
    grayLight: "color: #d1d5db; font-weight: bold;",
    grayDark: "color: #4b5563; font-weight: bold;",
    zinc: "color: #a1a1aa; font-weight: bold;",
    zincDark: "color: #52525b; font-weight: bold;",
    slate: "color: #94a3b8; font-weight: bold;",
    slateDark: "color: #475569; font-weight: bold;",
    white: "color: #ffffff; font-weight: bold;",
    black: "color: #000000; font-weight: bold;",
  };

  log(
    message: LogArg,
    colorOrArgs?: TailwindColor | LogArg[],
    ...rest: LogArg[]
  ) {
    if (!this.enabled) return;
    if (
      typeof colorOrArgs === "string" &&
      this.tailwindColors[colorOrArgs as TailwindColor]
    ) {
      console.log(
        `%c${message}`,
        this.tailwindColors[colorOrArgs as TailwindColor],
        ...rest,
      );
    } else if (Array.isArray(colorOrArgs)) {
      console.log(message, ...colorOrArgs, ...rest);
    } else {
      console.log(message, ...rest);
    }
  }

  warn(...args: LogArg[]) {
    if (this.enabled) console.warn(...args);
  }

  error(...args: LogArg[]) {
    if (this.enabled) console.error(...args);
  }

  clear() {
    console.clear();
  }

  enable(state: boolean) {
    this.enabled = state;
  }
}

const customConsole = new CustomConsole();
export default customConsole;
