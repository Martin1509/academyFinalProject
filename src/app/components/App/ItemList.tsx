import React, {useCallback, useState, useEffect} from 'react';
import {css} from '@emotion/react';
import update from 'immutability-helper';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import {Attendee} from 'app/models/App/Attendee';
import {Item} from './Item';
import {getOrderId} from 'app/utils/itemListUtils';
import {updateAttendee as updateAttendeeRequest} from 'app/services/attendeesService';

interface ItemListProps{
    attendees: Attendee[];
    invalidate: () => void;
}

const ItemList: React.FC<ItemListProps> = ({attendees, invalidate}) => {
  const [localAttendees, setLocalAttendees] = useState<Attendee[]>([...attendees].sort((a,b) => a.orderIndex - b.orderIndex));
  const [dragged, setDragged] = useState<boolean>(false);

  useEffect(() => {
    setLocalAttendees([...attendees].sort((a,b) => a.orderIndex - b.orderIndex));
  }, [attendees]);

  const moveAttendee = useCallback((dragIndex: number, hoverIndex: number) => {
    setLocalAttendees((prevAttd: Attendee[]) =>
      update(prevAttd, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevAttd[dragIndex] as Attendee]
        ]
      }),
    );
  }, []);

  const updateAttendee = useCallback((id: string) => {
    const newId = getOrderId(localAttendees, id);
    updateAttendeeRequest(id, {orderIndex: newId}).then(() => {
      invalidate();
    });
  }, [localAttendees, invalidate]);

  const renderAttendee = useCallback(
    (attendee: Attendee, index: number) => {
      return (
        <Item
          key={attendee.id}
          attendee={attendee}
          index={index}
          invalidate={invalidate}
          moveAttendee={moveAttendee}
          updateAttendee={updateAttendee}
          setDragged={setDragged}
        />
      );
    },
    [invalidate, moveAttendee, updateAttendee],
  );

  const copyOfAttendees = dragged ? [...localAttendees] : [...localAttendees].sort((a,b) => a.orderIndex - b.orderIndex);

  return (
    <DndProvider backend={HTML5Backend}>
      <div css={css`
        display: inline-block;
        margin-top: 40px;
        width: 80%;
        flex-direction: row;
      `}
      >
        {copyOfAttendees.map((attendee, index) => (
          renderAttendee(attendee, index)
        ))}
      </div>
    </DndProvider>);
};

export {ItemList};
