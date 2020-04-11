import { useState, useCallback } from "react";

export const useForceUpdate = () => {
    const [tick, setTick] = useState(0);

    const forceUpdate = useCallback(() => {
        setTick(tick + 1);
    }, [tick]);

    return forceUpdate;
};
