import {
    useCallback,
    useState
} from 'react';

const useAnchor = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = useCallback(event => setAnchorEl(event.currentTarget), []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const open = !!anchorEl;

    return {
        anchorEl,
        handleClick,
        handleClose,
        open,
    };
};

export default useAnchor;
