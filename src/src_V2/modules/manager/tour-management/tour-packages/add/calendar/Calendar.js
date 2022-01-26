import React, { useState, useEffect } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext as dragDropContext } from 'react-dnd';
import Scheduler, { SchedulerData, ViewTypes, AddMorePopover } from 'react-big-scheduler';

import '../codesandbox1/styles.css';
import 'react-big-scheduler/lib/css/style.css';

import { DemoData, ViewsConfig } from './DemoData';

let scheduler = new SchedulerData('2017-12-18', ViewTypes.Day, false, false, ViewsConfig);
scheduler.localeMoment.locale('en');
scheduler.setEvents(DemoData.events);
scheduler.setResources(DemoData.resources);

function Calendar() {
  const [viewModel, setViewModel] = useState({ schedulerData: scheduler, toggle: false });
  const [popover, setPopover] = useState({
    left: 0,
    top: 0,
    height: 0,
    headerItem: undefined,
  });

  function eventItemTemplateResolver(schedulerData, event, mustAddCssClass) {
    let titleText = schedulerData.behaviors.getEventTextFunc(schedulerData, event);

    return (
      <div
        key={event.id}
        className={mustAddCssClass}
        style={{
          borderRadius: '3px',
          marginBottom: '3px',
          backgroundColor: '#FEF2F1',
          border: '1px solid rgba(248, 128, 120, 0.3)',
          boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        <span style={{ color: '#FFFFFF', margin: '4px 0 0 2px', borderRadius: 1 }}>
          1{/*{titleText}*/}
        </span>
      </div>
    );
  }

  function prevClick(schedulerData) {
    schedulerData.prev();
    schedulerData.setEvents(DemoData.events);
    setViewModel({ schedulerData, toggle: !viewModel.toggle });
  }

  function nextClick(schedulerData) {
    schedulerData.next();
    schedulerData.setEvents(DemoData.events);
    setViewModel({ schedulerData, toggle: !viewModel.toggle });
  }

  function onViewChange(schedulerData, view) {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    schedulerData.setEvents(DemoData.events);
    setViewModel({ schedulerData, toggle: !viewModel.toggle });
  }

  function onSelectDate(schedulerData, date) {
    schedulerData.setDate(date);
    schedulerData.setEvents(DemoData.events);
    setViewModel({ schedulerData, toggle: !viewModel.toggle });
  }

  function eventClicked(schedulerData, event) {
    alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
  }

  function ops1(schedulerData, event) {
    alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
  }

  function ops2(schedulerData, event) {
    alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
  }

  function newEvent(schedulerData, slotId, slotName, start, end, type, item) {
    let newFreshId = 0;
    schedulerData.events.forEach((item) => {
      if (item.id >= newFreshId) newFreshId = item.id + 1;
    });

    let newEvent = {
      id: newFreshId,
      title: 'New event you just created',
      start: start,
      end: end,
      resourceId: slotId,
      bgColor: 'purple',
    };
    schedulerData.addEvent(newEvent);
    setViewModel({ schedulerData, toggle: !viewModel.toggle });
  }

  function updateEventStart(schedulerData, event, newStart) {
    schedulerData.updateEventStart(event, newStart);
    setViewModel({ schedulerData, toggle: !viewModel.toggle });
  }

  function updateEventEnd(schedulerData, event, newEnd) {
    schedulerData.updateEventEnd(event, newEnd);
    setViewModel({ schedulerData, toggle: !viewModel.toggle });
  }

  function moveEvent(schedulerData, event, slotId, slotName, start, end) {
    schedulerData.moveEvent(event, slotId, slotName, start, end);
    setViewModel({ schedulerData, toggle: !viewModel.toggle });
  }

  function onScrollRight(schedulerData, schedulerContent, maxScrollLeft) {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.next();
      schedulerData.setEvents(DemoData.events);
      this.setState({
        viewModel: schedulerData,
      });

      schedulerContent.scrollLeft = maxScrollLeft - 10;
    }
  }

  function onScrollLeft(schedulerData, schedulerContent, maxScrollLeft) {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.prev();
      schedulerData.setEvents(DemoData.events);
      this.setState({
        viewModel: schedulerData,
      });

      schedulerContent.scrollLeft = 10;
    }
  }

  function onScrollTop(schedulerData, schedulerContent, maxScrollTop) {
    console.log('onScrollTop');
  }

  function onScrollBottom(schedulerData, schedulerContent, maxScrollTop) {
    console.log('onScrollBottom');
  }

  function toggleExpandFunc(schedulerData, slotId) {
    schedulerData.toggleExpandStatus(slotId);
    setViewModel({ schedulerData, toggle: !viewModel.toggle });
  }

  function conflictOccurred() {
    console.error('conflict');
  }

  function onSetAddMoreState(newState) {
    if (newState === undefined) {
      setPopover({
        headerItem: undefined,
        left: 0,
        top: 0,
        height: 0,
      });
    } else {
      this.setState({
        ...newState,
      });
    }
  }

  return (
    <div className={'calendarWrapper'}>
      <Scheduler
        viewEventText='Ops 1'
        viewEvent2Text='Ops 2'
        newEvent={newEvent}
        moveEvent={moveEvent}
        prevClick={prevClick}
        nextClick={nextClick}
        viewEventClick={ops1}
        viewEvent2Click={ops2}
        onScrollTop={onScrollTop}
        onSelectDate={onSelectDate}
        onViewChange={onViewChange}
        onScrollLeft={onScrollLeft}
        eventItemClick={eventClicked}
        onScrollRight={onScrollRight}
        onScrollBottom={onScrollBottom}
        updateEventEnd={updateEventEnd}
        updateEventStart={updateEventStart}
        toggleExpandFunc={toggleExpandFunc}
        conflictOccurred={conflictOccurred}
        schedulerData={viewModel.schedulerData}
        eventItemTemplateResolver={eventItemTemplateResolver}
        // eventItemTemplateResolver={this.eventItemTemplateResolver}
        // rightCustomHeader={rightCustomHeader}
      />
    </div>
  );
}

export default dragDropContext(HTML5Backend)(Calendar);
