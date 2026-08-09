import { useState, useCallback } from "react";

const MAX_QUANTITY = 10;
const MIN_QUANTITY = 1;

export function useQuantityLimit(maxLimit = MAX_QUANTITY) {
  const [qtyMap, setQtyMap] = useState({});

  const getQty = useCallback((id) => qtyMap[id] ?? MIN_QUANTITY, [qtyMap]);

  const updateQty = useCallback((id, action) => {
    setQtyMap((prev) => {
      const current = prev[id] ?? MIN_QUANTITY;
      let next = current;
      if (action === "plus" && current < maxLimit) next = current + 1;
      if (action === "minus" && current > MIN_QUANTITY) next = current - 1;
      return { ...prev, [id]: next };
    });
  }, [maxLimit]);

  const setQty = useCallback((id, qty) => {
    const clamped = Math.max(MIN_QUANTITY, Math.min(maxLimit, qty));
    setQtyMap((prev) => ({ ...prev, [id]: clamped }));
  }, [maxLimit]);

  const resetQty = useCallback((id) => {
    setQtyMap((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const isAtMax = useCallback((id) => getQty(id) >= maxLimit, [getQty, maxLimit]);
  const isAtMin = useCallback((id) => getQty(id) <= MIN_QUANTITY, [getQty]);

  return { getQty, updateQty, setQty, resetQty, isAtMax, isAtMin };
}
