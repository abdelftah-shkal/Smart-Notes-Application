/**
 * Workspace Flow — useWorkspaceCollection
 * @author Abdelfatah
 * TanStack Query hooks for workspace item (note) CRUD operations.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  browseItems,
  inspectItem,
  composeItem,
  reviseItem,
  discardItem,
} from '@/services/workspaceApi';

// ─── Query Key Factory ─────────────────────────────────────────────────────
export const workspaceKeys = {
  all:       ['workspace-items'],
  filtered:  (filters) => ['workspace-items', filters],
  detail:    (id)      => ['workspace-item', id],
};

/** Fetch all items with optional filters */
export const useBrowseItems = (filters = {}) => {
  return useQuery({
    queryKey: workspaceKeys.filtered(filters),
    queryFn:  () => browseItems(filters),
    select:   (data) => data.data,   // { data: { data: notes[] } } → { data: notes[] }
  });
};

/** Fetch a single item by ID */
export const useInspectItem = (itemId, enabled = true) => {
  return useQuery({
    queryKey: workspaceKeys.detail(itemId),
    queryFn:  () => inspectItem(itemId),
    select:   (data) => data.data,
    enabled:  !!itemId && enabled,
  });
};

/** Create a new workspace item */
export const useComposeItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: composeItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceKeys.all });
    },
  });
};

/** Update an existing workspace item */
export const useReviseItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, payload }) => reviseItem(itemId, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: workspaceKeys.all });
      queryClient.invalidateQueries({ queryKey: workspaceKeys.detail(variables.itemId) });
    },
  });
};

/** Permanently delete a workspace item */
export const useDiscardItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId }) => discardItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceKeys.all });
    },
  });
};
