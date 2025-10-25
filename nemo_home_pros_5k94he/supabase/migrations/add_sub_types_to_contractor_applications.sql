/*
      # Add sub_types to contractor_applications

      1. Changes
        - Adds a `sub_types` column to the `contractor_applications` table to store a list of sub-specialties. This field is not part of the public submission form and will be populated via other means (e.g., CSV import or admin updates).
    */
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'contractor_applications' AND column_name = 'sub_types'
      ) THEN
        ALTER TABLE contractor_applications ADD COLUMN sub_types text[] NOT NULL DEFAULT '{}';
      END IF;
    END $$;
