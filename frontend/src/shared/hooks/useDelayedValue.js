/**
 * Workspace Flow — useDelayedValue
 * @author Abdelfatah
 * Debounce hook — delays updating a value until after a specified idle period.
 */

import { useEffect, useState } from 'react';

/**
 * @param {*}      value  - The value to debounce
 * @param {number} delay  - Delay in milliseconds (default 500ms)
 * @returns The debounced value
 */
const useDelayedValue = (value, delay = 500) => {
  const [delayedValue, setDelayedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDelayedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return delayedValue;
};

export default useDelayedValue;
