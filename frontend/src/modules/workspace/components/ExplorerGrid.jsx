/**
 * Workspace Flow — ExplorerGrid
 * @author Abdelfatah
 */

import React from 'react';
import ItemCard from './ItemCard';

const ExplorerGrid = ({ items = [], onDelete }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
    {items.map((item) => (
      <ItemCard key={item._id} item={item} onDelete={onDelete} />
    ))}
  </div>
);

export default ExplorerGrid;
