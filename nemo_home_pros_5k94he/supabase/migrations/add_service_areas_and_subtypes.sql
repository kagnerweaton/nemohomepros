/*
  # Add service areas and sub-types to contractors

  This migration adds `service_areas` and `sub_types` to the `contractor_applications` table to support more detailed filtering and categorization.

  1. Changes
    - Adds `service_areas` (text array) to store geographic service locations.
    - Adds `sub_types` (text array) to store specialized service categories.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contractor_applications' AND column_name = 'service_areas'
  ) THEN
    ALTER TABLE contractor_applications ADD COLUMN service_areas text[] DEFAULT '{}';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contractor_applications' AND column_name = 'sub_types'
  ) THEN
    ALTER TABLE contractor_applications ADD COLUMN sub_types text[] DEFAULT '{}';
  END IF;
END $$;
