import { useEffect } from "react";
export { useForceUpdate } from "../../../hooks";

export function useTimeout(callback: Function, ms: number) {
    return useEffect(() => {
        const timeout = setTimeout(callback, ms);
        return () => clearTimeout(timeout);
    });
}
