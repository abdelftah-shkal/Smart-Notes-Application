/**
 * Workspace Flow — WorkspaceExplorer
 * @author Abdelfatah
 * Main notes list page with search, filters, grid, and pagination.
 */

import React, { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useBrowseItems, useDiscardItem } from '../hooks/useWorkspaceCollection';
import useDelayedValue from '@/shared/hooks/useDelayedValue';
import { ITEMS_PER_PAGE } from '@/shared/constants/appConfig';
import Overlay            from '@/shared/components/Overlay';
import ActionButton       from '@/shared/components/ActionButton';
import ExplorerHeader     from '../components/ExplorerHeader';
import ExplorerSearch     from '../components/ExplorerSearch';
import FilterPanel        from '../components/FilterPanel';
import ExplorerToolbar    from '../components/ExplorerToolbar';
import ExplorerGrid       from '../components/ExplorerGrid';
import ExplorerSkeleton   from '../components/ExplorerSkeleton';
import EmptyExplorer      from '../components/EmptyExplorer';
import ExplorerPagination from '../components/ExplorerPagination';

const WorkspaceExplorer = () => {
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('');
  const [status,   setStatus]   = useState('');
  const [page,     setPage]     = useState(1);
  const [deleteId, setDeleteId] = useState(null);

  const debouncedSearch = useDelayedValue(search, 400);

  const { data, isLoading, isError, refetch } = useBrowseItems({
    search:   debouncedSearch || undefined,
    category: category        || undefined,
    status:   status          || undefined,
  });

  const { mutate: discard, isPending: isDeleting } = useDiscardItem();

  const allItems = data?.data || [];

  // Client-side pagination
  const totalPages   = Math.max(1, Math.ceil(allItems.length / ITEMS_PER_PAGE));
  const safePage     = Math.min(page, totalPages);
  const pagedItems   = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return allItems.slice(start, start + ITEMS_PER_PAGE);
  }, [allItems, safePage]);

  const hasFilters = !!(debouncedSearch || category || status);

  const handleDelete = (id) => setDeleteId(id);

  const handleConfirmDelete = () => {
    discard(
      { itemId: deleteId },
      {
        onSuccess: () => { toast.success('Item deleted.'); setDeleteId(null); },
        onError:   () => toast.error('Failed to delete item.'),
      }
    );
  };

  const handleFilterChange = (setter) => (val) => {
    setter(val);
    setPage(1);
  };

  return (
    <div className="space-y-4 animate-slide-up">
      <ExplorerHeader totalCount={allItems.length} />

      {/* Search — sticky */}
      <div className="sticky top-16 z-10 pt-1 pb-2 bg-surface-50/80 dark:bg-surface-950/80 backdrop-blur-sm -mx-4 lg:-mx-6 px-4 lg:px-6">
        <ExplorerSearch value={search} onChange={handleFilterChange(setSearch)} />
      </div>

      <FilterPanel
        category={category} onCategoryChange={handleFilterChange(setCategory)}
        status={status}     onStatusChange={handleFilterChange(setStatus)}
      />

      <ExplorerToolbar
        search={debouncedSearch}  onSearchChange={handleFilterChange(setSearch)}
        category={category}       onCategoryChange={handleFilterChange(setCategory)}
        status={status}           onStatusChange={handleFilterChange(setStatus)}
      />

      {/* Content */}
      {isLoading ? (
        <ExplorerSkeleton count={6} />
      ) : isError ? (
        <div className="text-center py-16">
          <p className="text-danger-500 font-semibold mb-3">Failed to load items.</p>
          <ActionButton variant="outline" onClick={() => refetch()}>Retry</ActionButton>
        </div>
      ) : pagedItems.length === 0 ? (
        <EmptyExplorer hasFilters={hasFilters} />
      ) : (
        <ExplorerGrid items={pagedItems} onDelete={handleDelete} />
      )}

      {/* Pagination */}
      {!isLoading && !isError && totalPages > 1 && (
        <ExplorerPagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      {/* Delete confirmation overlay */}
      <Overlay
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete Item"
        size="sm"
      >
        <p className="text-sm text-surface-600 dark:text-surface-400 mb-6">
          Are you sure you want to permanently delete this item? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <ActionButton variant="outline" size="sm" onClick={() => setDeleteId(null)} disabled={isDeleting}>
            Cancel
          </ActionButton>
          <ActionButton variant="danger" size="sm" isLoading={isDeleting} onClick={handleConfirmDelete}>
            Delete
          </ActionButton>
        </div>
      </Overlay>
    </div>
  );
};

export default WorkspaceExplorer;
