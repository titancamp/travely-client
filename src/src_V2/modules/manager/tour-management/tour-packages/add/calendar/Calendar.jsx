import { useState } from 'react';
import Scheduler from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import './Calendar.styles.css';
import DialogManager from './dialogs/Index';
import * as MOCK from './dialogs/mock';
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

  function addEvent(state, supplierItem) {
    const newSupplier = MOCK[supplierItem.title].data.find(
      (item) => item.id === supplierItem.id
    );
    newEvent(...state, newSupplier);
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
//there still issue in right side when we came from price summary
//month items have padding left .food margin-rigth : 3px

//src/src_V2/modules/manager/tour-management/tour-packages/add/calendar/dialogs/component.jsx styling
//naming changes need details componentd
