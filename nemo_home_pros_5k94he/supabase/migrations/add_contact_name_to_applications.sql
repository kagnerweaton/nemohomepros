/*
  # Add Contact Name to Applications

  This migration adds a `contact_name` field to the `contractor_applications` table to store the name of the primary contact person for the business.

  1. Changes
    - Adds a `contact_name` column of type `TEXT` to the `contractor_applications` table. The form will make this a required field.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contractor_applications' AND column_name = 'contact_name'
  ) THEN
    ALTER TABLE public.contractor_applications ADD COLUMN contact_name TEXT;
  END IF;
END $$;
