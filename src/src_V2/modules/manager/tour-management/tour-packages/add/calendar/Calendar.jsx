import React, { useState } from 'react';
import Scheduler from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import DialogManager from './dialogs/Index';
import { getSchedulerSingleInstance, useSchedulerHandlers } from './helper';
import './styles.css';

function Calendar() {
  const [dialogManagerState, onShowHideDialog] = useState({ open: false });

  const { error, newEvent, viewModel, ...handlers } = useSchedulerHandlers(
    getSchedulerSingleInstance()
  );

  function createSupplierItem(...args) {
    return onShowHideDialog({
      open: true,
      mode: 'add-accommodation',
    });

    // newEvent(...args);
  }

  return (
    <>
      <div className={'calendarWrapper'}>
        <Scheduler {...handlers} newEvent={createSupplierItem} />
        <DialogManager data={dialogManagerState} onShowHideDialog={onShowHideDialog} />
      </div>
      <p style={{ color: 'red', margin: '20px 0' }}>{error}</p>
    </>
  );
}

export default dragDropContext(HTML5Backend)(Calendar);

//TODO
// cursor pointer on event item
// resource column need to have 1px padding -> design
