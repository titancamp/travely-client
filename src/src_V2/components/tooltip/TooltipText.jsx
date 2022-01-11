import { useRef } from 'react';
import { Tooltip } from '@mui/material';

import { useHoverTooltip } from '../../hooks';
import styles from './TooltipText.module.css';

export default function TooltipText({ text, maxWidth }) {
  const textElementRef = useRef();

  const hoverStatus = useHoverTooltip(text, textElementRef);

  return (
    <Tooltip title={text} interactive="true" disableHoverListener={!hoverStatus}>
      <div
        ref={textElementRef}
        className={styles.tooltip}
        style={{ maxWidth: maxWidth || '100px' }}
      >
        {text}
      </div>
    </Tooltip>
  );
}
