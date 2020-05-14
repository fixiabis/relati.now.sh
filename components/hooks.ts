import { useState } from "react";

export const useForceUpdate = () => {
    const [tick, setTick] = useState(0);
    return () => setTick(tick + 1);
};
