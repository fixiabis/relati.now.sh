import { useState, useEffect } from "react";

export function useForceUpdate() {
    const [tick, setTick] = useState(0);
    return () => setTick(tick => tick + 1);
}

export function useTimeout(callback: Function, ms: number) {
    return useEffect(() => {
        const timeout = setTimeout(callback, ms);
        return () => clearTimeout(timeout);
    });
}
