import { useEffect } from 'react';

const useOutsideClick = (ref, callback, excludeElements) => {
    useEffect(() => {
        function isExcluded(element) {
            if(!excludeElements) return false;
            for(let curElement of excludeElements) {
                if(curElement.current == null) continue;
                if(curElement.current == element || curElement.current.contains(element)) {
                    return true;
                }
            }
            return false;
        }

        function handleClickOutside(event) {
            if (ref.current && !isExcluded(event.target) && !ref.current.contains(event.target)) {
                callback();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
};

export default useOutsideClick;