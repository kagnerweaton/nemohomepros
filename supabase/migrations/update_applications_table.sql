/*
  # Update contractor applications table for form changes

  This migration updates the `contractor_applications` table to align with the new "List Your Business" form requirements.

  1. Changes
    - The `type` column is renamed to `services` and its type is changed from `text` to `text[]` to support multiple service selections.
    - The `location` column is renamed to `service_areas` and its type is changed from `text` to `text[]` to support multiple service area selections.
    - The `image_url` column is renamed to `image_urls` and its type is changed from `text` to `text[]` to support multiple image uploads.
    - The `background_check` column is dropped as it's no longer required.

  2. Security
    - No changes to RLS policies.
*/

DO $$
BEGIN
  -- Rename 'type' to 'services' and change type to text[]
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contractor_applications' AND column_name = 'type') THEN
    ALTER TABLE contractor_applications RENAME COLUMN type TO services;
    ALTER TABLE contractor_applications ALTER COLUMN services TYPE text[] USING ARRAY[services];
    ALTER TABLE contractor_applications ALTER COLUMN services SET DEFAULT '{}';
  END IF;

  -- Rename 'location' to 'service_areas' and change type to text[]
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contractor_applications' AND column_name = 'location') THEN
    ALTER TABLE contractor_applications RENAME COLUMN location TO service_areas;
    ALTER TABLE contractor_applications ALTER COLUMN service_areas TYPE text[] USING ARRAY[service_areas];
  END IF;

  -- Rename 'image_url' to 'image_urls' and change type to text[]
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contractor_applications' AND column_name = 'image_url') THEN
    ALTER TABLE contractor_applications RENAME COLUMN image_url TO image_urls;
    ALTER TABLE contractor_applications ALTER COLUMN image_urls TYPE text[] USING ARRAY[image_urls];
  END IF;

  -- Drop 'background_check' column
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contractor_applications' AND column_name = 'background_check') THEN
    ALTER TABLE contractor_applications DROP COLUMN background_check;
  END IF;
END $$;
