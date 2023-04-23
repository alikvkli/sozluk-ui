
import { DependencyList, EffectCallback, useEffect, useRef } from "react";

function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
    const isSeconds = useRef(false);
    useEffect(() => {
        if (process.env.NODE_ENV !== 'production') {
            if (isSeconds.current) return effect();
            else isSeconds.current = true;
        } else {
            return effect();
        }
    }, deps)
}

export default useUpdateEffect;