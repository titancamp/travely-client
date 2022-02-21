import { ExpandMore, RateReview } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { useScrollIntoView } from '../../../../../../utils/hooks';
import { NotesInput } from '../../../components';
import commonStyles from '../style.module.css';

export default function Notes({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsRef = useScrollIntoView(isExpanded, { behavior: 'smooth' });

  const handleAccordionHeaderClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Accordion className={commonStyles.accordion} expanded={isExpanded} ref={detailsRef}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls='panel1a-content'
        id='panel1a-header'
        className={commonStyles.accordionSummary}
        onClick={handleAccordionHeaderClick}
      >
        <IconButton>
          <RateReview />
        </IconButton>
        <Typography className={commonStyles.detailsTxt}>Notes</Typography>
      </AccordionSummary>
      <AccordionDetails className={commonStyles.accordionDetails}>
        <NotesInput
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
        />
      </AccordionDetails>
    </Accordion>
  );
}
