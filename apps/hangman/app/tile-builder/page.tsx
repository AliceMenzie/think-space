'use client';
import { Typography } from '@nx-next-shadcn-ui-starter/ui-kit/ui';
import React, { DragEventHandler, useEffect, useState } from 'react';

const rows = 10;
const cols = 10;

const board = new Array(rows)
  .fill(undefined)
  .map(() => new Array(cols).fill(''));

const page = () => {
  const [board, setBoard] = useState(
    new Array(rows).fill(undefined).map(() => new Array(cols).fill(''))
  );

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('start');
    // move type
    // move data
    // e.DataTransfer.effectAllowed
    e.dataTransfer.effectAllowed = 'move';
    const targetElement = e.target as HTMLElement;

    console.log('target', targetElement.id);
    e.dataTransfer.setData('text/plain', targetElement.id);
  };
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('end');
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // console.log('over');
    e.target.classList.add('border-4');
    e.target.classList.add('border-blue-500');
  };
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('enter');
    const target = e.target as HTMLElement;
    target.classList.add('border');
    target.classList.add('border-red-500');
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('leave');
    const target = e.target as HTMLElement;
    target.classList.remove('border');
    target.classList.remove('border-red-500');
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('drop');

    const target = e.target as HTMLElement;
    const id = e.dataTransfer!.getData('text/plain');
    const draggedElement = document.getElementById(id);
    console.log('target to append', target);
    console.log('draggedElement', draggedElement);
    if (draggedElement) {
      target.appendChild(draggedElement);
    }
  };

  // console.log('this is board', board);
  return (
    <div className="border border-black  flex flex-col h-screen items-center">
      <Typography as="h1" variant={'heading'} className="mx-auto py-4">
        Tile Builder
      </Typography>
      <div className="flex justify-around w-full px-8">
        <div className="border border-red-500 w-80 ">
          <Typography as="p" variant={'body'}>
            Bucket
          </Typography>
          <div
            className="h-16 w-16 bg-red-500 border-2 border-red-300"
            draggable={'true'}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            id="square"
          ></div>
          <div
            className="border border-black flex"
            draggable={'true'}
            // onDragStart={handleDragStart}
            // onDragEnd={handleDragEnd}
            id="column"
          >
            <div
              className="h-16 w-16 bg-red-500 border-2 border-red-300"
              draggable={'true'}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              id="column-1"
            ></div>
            <div
              className="h-16 w-16 bg-red-500 border-2 border-red-300"
              draggable={'true'}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              id="column-2"
            ></div>
            <div
              className="h-16 w-16 bg-red-500 border-2 border-red-300"
              draggable={'true'}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              id="column-3"
            ></div>
            <div
              className="h-16 w-16 bg-red-500 border-2 border-red-300"
              draggable={'true'}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              id="column-4"
            ></div>
          </div>
        </div>
        <div className="border border-black  flex h-[44rem] w-[44rem]">
          {board.map((row, indexRow) => (
            <div
              key={indexRow}
              className="flex flex-col flex-1 border-[1px] border-black divide-y-[1px] divide-black"
            >
              {row.map((tile, indexCol) => (
                <div
                  key={indexCol}
                  className="flex flex-1  divide-x-[1px]  divide-black "
                  onDrop={handleDrop}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  id={`tile-${indexRow}-${indexCol}`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
