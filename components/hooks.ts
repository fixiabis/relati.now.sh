import { useState } from "react";

export function useForceUpdate() {
    const [tick, setTick] = useState(0);
    return () => setTick(tick + 1);
}
