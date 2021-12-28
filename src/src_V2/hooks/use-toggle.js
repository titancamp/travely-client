import {useCallback, useState} from "react";

const useToggle = (defaultValue = false) => {
    const [open, setOpen] = useState(defaultValue);

    const toggle = useCallback(() => {
        setOpen(open => !open);
    }, [setOpen]);

    return {
        open,
        toggle,
        setOpen,
    }
}

export default useToggle;
