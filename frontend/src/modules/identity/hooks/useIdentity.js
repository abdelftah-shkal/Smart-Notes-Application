/**
 * Workspace Flow — useIdentity hooks
 * @author Abdelfatah
 * TanStack Query hooks for authentication and session management.
 */

import { useMutation, useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setCredentials, refreshAccount } from '@/app/state/globalStore';
import {
  authenticateAccount,
  enrollAccount,
  fetchCurrentSession,
} from '@/services/identityApi';

/** Sign in an existing user */
export const useSignInMutation = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: authenticateAccount,
    onSuccess: (data) => {
      const user = data.data;
      dispatch(
        setCredentials({
          accessToken: data.token,
          account: {
            id:    user._id || user.id,
            name:  user.name,
            email: user.email,
          },
        })
      );
    },
  });
};

/** Register a new user account */
export const useEnrollmentMutation = () => {
  return useMutation({
    mutationFn: enrollAccount,
  });
};

/** Verify the stored token and hydrate account state */
export const useSessionQuery = (enabled = true) => {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const data = await fetchCurrentSession();
      const user = data.data;
      dispatch(
        refreshAccount({
          id:    user.id || user._id,
          name:  user.name,
          email: user.email,
        })
      );
      return user;
    },
    enabled,
    retry: false,
  });
};
