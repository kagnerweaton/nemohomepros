/*
  # Create Storage Bucket and Policies for Contractor Images

  This migration sets up the Supabase Storage bucket required for the "List Your Business" form.

  1. New Bucket
    - Creates a new public bucket named `contractor-images` with a 5MB file size limit and specific allowed image types.

  2. Security
    - Adds a policy to allow anonymous users to upload files to the `contractor-images` bucket. This is necessary for the public application form.
    - Adds a policy to allow public read access to the images, so they can be displayed on the website.
*/

-- 1. Create storage bucket for contractor images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('contractor-images', 'contractor-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;


-- 2. Add RLS policies for anonymous uploads
DROP POLICY IF EXISTS "Allow anonymous uploads to contractor-images" ON storage.objects;
CREATE POLICY "Allow anonymous uploads to contractor-images"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (bucket_id = 'contractor-images');

-- 3. Add RLS policies for public read access
DROP POLICY IF EXISTS "Allow public read access to contractor-images" ON storage.objects;
CREATE POLICY "Allow public read access to contractor-images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'contractor-images');
