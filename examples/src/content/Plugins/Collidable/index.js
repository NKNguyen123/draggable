/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import Droppable from 'lib/droppable';
import Collidable from 'lib/plugins/collidable';
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */

export default function PluginsCollidable() {
  const containerSelector = '#Collidable .BlockLayout';
  const containers = document.querySelectorAll(containerSelector);
  const wallClass = 'CollidableWall';
  const walls = document.querySelectorAll(`.${wallClass}`);

  if (containers.length === 0) {
    return false;
  }

  const droppable = new Droppable(containers, {
    draggable: '.Block--isDraggable',
    droppable: '.BlockWrapper--isDroppable',
    collidables: '.CollidableObstacle',
    appendTo: containerSelector,
    mirror: {
      constrainDimensions: true,
    },
    plugins: [Collidable],
  });

  // --- Draggable events --- //
  droppable.on('collidable:in', ({collidingElement}) => {
    if (collidingElement.classList.contains(wallClass)) {
      walls.forEach((wall) => wall.classList.add('isColliding'));
    } else {
      collidingElement.classList.add('isColliding');
    }
  });

  droppable.on('collidable:out', ({collidingElement}) => {
    if (collidingElement.classList.contains(wallClass)) {
      walls.forEach((wall) => wall.classList.remove('isColliding'));
    } else {
      collidingElement.classList.remove('isColliding');
    }
  });

  return droppable;
}
