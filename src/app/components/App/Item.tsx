import React, {useState, FC, useRef, useEffect} from 'react';
import {css} from '@emotion/react';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import ContentEditable, {ContentEditableEvent} from 'react-contenteditable';
import type {Identifier, XYCoord} from 'dnd-core';
import {useDrag, useDrop} from 'react-dnd';

import {Attendee} from 'app/models/App/Attendee';
import {deleteAttendee, updateAttendee as updateAttendeeRequest} from 'app/services/attendeesService';

const ItemTypes = {
  ATTENDEE: 'attendee'
};

interface DragItem {
    index: number
    id: string
    type: string
  }

interface ItemProps {
    attendee: Attendee,
    index: number;
    updateAttendee: (id: string) => void;
    invalidate: () => void;
    moveAttendee: (dragIndex: number, hoverIndex: number) => void;
    setDragged: (dragged: boolean) => void;
}

const Item: FC<ItemProps> = ({attendee, index, invalidate, moveAttendee, updateAttendee, setDragged}) => {
  const [localChange, setLocalChange] = useState<string>('');
  const id = attendee.id;

  if (localChange === attendee.moreInfo && attendee.moreInfo !== ''){
    setLocalChange('');
  }

  const info = localChange !== '' ? localChange : attendee.moreInfo;
  const onChange = (e: ContentEditableEvent) => {
    if (attendee.moreInfo === e.target.value!){
      setLocalChange('');
    } else {
      setLocalChange(e.target.value!);
    }
  };

  const handleUpdate = () => {
    updateAttendeeRequest(attendee.id, {moreInfo: localChange}).then(() => {
      invalidate();
    });
  };

  const ref = useRef<HTMLDivElement>(null);
  const [{handlerId}, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null}
  >({
    accept: ItemTypes.ATTENDEE,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId()
    }),
    drop(){
      updateAttendee(attendee.id);
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveAttendee(dragIndex, hoverIndex);

      item.index = hoverIndex;
    }
  });

  const [{isDragging}, drag] = useDrag({
    type: ItemTypes.ATTENDEE,
    item: () => {
      return {id, index};
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });

  useEffect(() => {
    setDragged(isDragging);
  }, [isDragging, setDragged]);

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div key={attendee.id}
      ref={ref}
      style={{opacity}}
      data-handler-id={handlerId}
      id={attendee.id}
      css={css`
        display: flex;
        background-color: #ebebeb;
        border-radius: 10px;
        padding: 15px;
        margin-bottom: 10px;
        border: solid 1px black;
        &:hover,&:focus{
            background-color: #dbdbdb;
        };
        gap: 10px;
        `}
    >
      <div css={css`
    width: 2%;
    text-align: left;
    `}
      >
        {index}
      </div>
      <div css={css`
    width: 10%;
    text-align: left;
    `}
      >
        {attendee.file !== '' &&
        <img css={css`max-width: 100%; max-height: 18px`} src={attendee.file} alt="img"/>
        }
      </div>
      <div css={css`
    width: 20%;
    text-align: left;
    `}
      >
        {attendee.name}
      </div>
      <div css={css`
    width: 25%;
    text-align: left;
    `}
      >
        {attendee['e-mail']}
      </div>
      <div css={css`
    flex: 1;
    margin: 0;
    text-align: left;
    `}
      >
        <ContentEditable
          css={css`display: inline-block; width: calc(100% - 25px);`}
          html={info}
          onChange={(e) => onChange(e)}
        />
        {localChange !== '' &&
        <div css={css`display: inline-block; float: right;`}>
          <IconButton
            aria-label="delete"
            size='small'
            css={css`padding: 0px; margin-top: -3px;`}
            onClick={() => handleUpdate()}
          >
            <SaveIcon fontSize='inherit'/>
          </IconButton>
        </div>}
      </div>
      <IconButton
        aria-label="delete"
        size='small'
        css={css`padding: 0px;`}
        onClick={() => {
          deleteAttendee(attendee.id!).then(() => invalidate());
        }}
      >
        <DeleteIcon fontSize='inherit'/>
      </IconButton>
    </div>);
};

export {Item};
