import { useState } from 'react';
import Scheduler from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import './Calendar.styles.css';
import DialogManager from './dialogs/Index';
import { getSchedulerSingleInstance, useSchedulerHandlers } from './helper';

function Calendar() {
  const [dialogManagerState, onShowHideDialog] = useState({ open: false });

  const { error, newEvent, ...handlers } = useSchedulerHandlers(
    getSchedulerSingleInstance()
  );

  function openCreateSupplierFlow() {
    return onShowHideDialog({
      open: true,
      state: arguments,
      mode: arguments[1],
      actions: { addEvent },
    });
  }

  function addEvent(state) {
    newEvent(...state);
    onShowHideDialog({ open: false });
  }

  return (
    <div>
      <div className='calendarWrapper'>
        <Scheduler {...handlers} newEvent={openCreateSupplierFlow} />
        <div className='priceSectionHidden' />
        <div className='priceSection' />
      </div>
      <p className='calendarError'>{error}</p>
      <DialogManager data={dialogManagerState} onShowHideDialog={onShowHideDialog} />
    </div>
  );
}

export default dragDropContext(HTML5Backend)(Calendar);

//TODO
//right section issue
//there still issue in right side when we came from Finance
// cursor pointer on event item
//first items have padding/margin from left
//scroll issue when console is opened
//month items have padding left
// item styles move to css folder
//css comments and removable comments

//Event count on same column
//src/src_V2/modules/manager/tour-management/tour-packages/add/calendar/dialogs/component.jsx styling
//naming changes need
