/**
 * Workspace Flow — ExplorerHeader
 * @author Abdelfatah
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { PenSquare } from 'lucide-react';
import ActionButton from '@/shared/components/ActionButton';

const ExplorerHeader = ({ totalCount = 0 }) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-surface-400 dark:text-surface-500 mt-0.5">
        {totalCount} {totalCount === 1 ? 'item' : 'items'} total
      </p>
    </div>
    <Link to="/notes/new">
      <ActionButton icon={PenSquare} size="sm">New Item</ActionButton>
    </Link>
  </div>
);

export default ExplorerHeader;
