import React, {useCallback, useState, useEffect} from 'react';
import {css} from '@emotion/react';
import update from 'immutability-helper';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import {Attendee} from 'app/models/App/Attendee';
import {Item} from './Item';

interface ItemListProps{
    attendees: Attendee[];
    invalidate: () => void;
}

const ItemList: React.FC<ItemListProps> = ({attendees, invalidate}) => {
  const [localAttendees, setLocalAttendees] = useState<Attendee[]>([]);

  useEffect(() => {
    setLocalAttendees(attendees);
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

  const renderAttendee = useCallback(
    (attendee: Attendee, index: number) => {
      return (
        <Item
          key={attendee.id}
          attendee={attendee}
          index={index}
          invalidate={invalidate}
          moveAttendee={moveAttendee}
          updateAttendees={updateAttendees}
        />
      );
    },
    [invalidate, moveAttendee],
  );

  const updateAttendees = () => {
    console.log('teraz');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div css={css`
        display: inline-block;
        margin-top: 40px;
        width: 80%;
        flex-direction: row;
      `}
      >
        {localAttendees.sort((a,b) => b.orderIndex + a.orderIndex).map((attendee, index) => (
          renderAttendee(attendee, index)
        ))}
      </div>
    </DndProvider>);
};

export {ItemList};
