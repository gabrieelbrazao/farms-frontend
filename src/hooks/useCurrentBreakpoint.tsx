import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useState, useEffect } from "react";

export function useCurrentBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<string>("");

  const screens = useBreakpoint();

  useEffect(() => {
    setBreakpoint(
      Object.entries(screens)
        .slice()
        .reverse()
        .find((screen) => !!screen[1])?.[0] ?? "xs"
    );
  }, [screens]);

  return breakpoint;
}
