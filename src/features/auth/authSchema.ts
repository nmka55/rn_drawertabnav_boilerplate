import { z } from 'zod';

/**
 * Form values accepted by the boilerplate's demo sign-in screen.
 *
 * A real application should replace the demo request with its own API client.
 * The password intentionally exists only while the form/request is active; it
 * is never part of Redux state or MMKV persistence.
 */
export const demoSignInSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, 'Enter a username or email address.')
    .max(100, 'Username must be 100 characters or fewer.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .max(256, 'Password must be 256 characters or fewer.'),
  firstName: z.string().trim().max(60).optional(),
  lastName: z.string().trim().max(60).optional(),
});

export type DemoSignInValues = z.infer<typeof demoSignInSchema>;

/** The in-memory profile shape used by screens and selectors. */
export type AuthProfile = {
  username: string;
  firstName?: string;
  lastName?: string;
  gender?: 'm' | 'f';
  dateOfBirth?: string;
  hasDriversLicense?: boolean;
};

/**
 * This deliberately small shape is the only auth-related data allowed in
 * MMKV. It contains no password, token, email address, or server response.
 */
export const persistedProfileSchema = z.object({
  username: z.string().min(1),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  gender: z.enum(['m', 'f']).optional(),
  dateOfBirth: z.string().datetime().optional(),
  hasDriversLicense: z.boolean().optional(),
});

export type PersistedProfile = z.infer<typeof persistedProfileSchema>;

export const toPersistedProfile = (profile: AuthProfile): PersistedProfile => ({
  username: profile.username,
  ...(profile.firstName ? { firstName: profile.firstName } : {}),
  ...(profile.lastName ? { lastName: profile.lastName } : {}),
  ...(profile.gender ? { gender: profile.gender } : {}),
  ...(profile.dateOfBirth ? { dateOfBirth: profile.dateOfBirth } : {}),
  ...(profile.hasDriversLicense !== undefined
    ? { hasDriversLicense: profile.hasDriversLicense }
    : {}),
});
