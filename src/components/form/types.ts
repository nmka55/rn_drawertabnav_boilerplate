import type { Control, FieldPath, FieldValues } from 'react-hook-form';

/**
 * Required wiring for every React Hook Form adapter.
 *
 * Supplying `control` explicitly makes adapters safe with multiple independent
 * forms on one screen; they never rely on an implicit, potentially wrong provider.
 */
export type FormControllerProps<
  Values extends FieldValues,
  Name extends FieldPath<Values>,
> = {
  control: Control<Values>;
  name: Name;
};
