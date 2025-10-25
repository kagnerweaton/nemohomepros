/*
  # Create contractor applications table

  1. New Tables
    - `contractor_applications`
      - `id` (uuid, primary key)
      - `name` (text, business name)
      - `type` (text, contractor type)
      - `phone` (text, phone number)
      - `email` (text, email address)
      - `website` (text, optional website)
      - `location` (text, service location)
      - `description` (text, business description)
      - `specialties` (text array, list of specialties)
      - `years_experience` (integer, years of experience)
      - `completed_projects` (integer, number of completed projects)
      - `licensed` (boolean, licensed status)
      - `insured` (boolean, insured status)
      - `background_check` (boolean, willing to undergo background check)
      - `specialized_training` (text array, certifications and training)
      - `image_url` (text, optional business photo URL)
      - `status` (text, application status: pending, approved, rejected)
      - `nemo_certified` (boolean, NEMO certification status)
      - `created_at` (timestamp, application submission date)
      - `updated_at` (timestamp, last update date)

  2. Security
    - Enable RLS on `contractor_applications` table
    - Add policy for public to insert applications
    - Add policy for authenticated users to read all applications (for admin)
*/

CREATE TABLE IF NOT EXISTS contractor_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  website text,
  location text NOT NULL,
  description text NOT NULL,
  specialties text[] NOT NULL DEFAULT '{}',
  years_experience integer NOT NULL,
  completed_projects integer NOT NULL,
  licensed boolean DEFAULT false,
  insured boolean DEFAULT false,
  background_check boolean DEFAULT false,
  specialized_training text[] DEFAULT '{}',
  image_url text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  nemo_certified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contractor_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert applications (public form submissions)
CREATE POLICY "Anyone can submit applications"
  ON contractor_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all applications (for admin dashboard)
CREATE POLICY "Authenticated users can read applications"
  ON contractor_applications
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update applications (for admin management)
CREATE POLICY "Authenticated users can update applications"
  ON contractor_applications
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_contractor_applications_updated_at
  BEFORE UPDATE ON contractor_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
