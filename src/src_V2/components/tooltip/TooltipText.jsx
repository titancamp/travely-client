import { useRef } from 'react';
import { Box, Tooltip } from '@mui/material';

import { useHoverTooltip } from '../../utils/hooks';
import styles from './TooltipText.module.css';

export default function TooltipText({ text, maxWidth }) {
  const textElementRef = useRef();

  const hoverStatus = useHoverTooltip(text, textElementRef);

  return (
    <Tooltip title={text} interactive='true' disableHoverListener={!hoverStatus}>
      <Box
        ref={textElementRef}
        className={styles.tooltip}
        sx={{ maxWidth: maxWidth || '100px' }}
      >
        {text}
      </Box>
    </Tooltip>
  );
}
