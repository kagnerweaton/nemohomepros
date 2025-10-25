/*
  # Add Email Notification Trigger for New Applications

  This migration sets up a database trigger to send an email notification whenever a new contractor application is submitted.

  1. Extensions
    - Enables the `pg_net` extension, which allows the database to make HTTP requests.

  2. New Function
    - `notify_on_new_application()`: A trigger function that sends a POST request to the `new-application-notification` Edge Function.

  3. New Trigger
    - `on_new_application_trigger`: An `AFTER INSERT` trigger on the `contractor_applications` table that executes the notification function for each new row.

  4. Security
    - The `pg_net` extension is powerful and should be used with care. The trigger is configured to only call a specific, trusted Edge Function within the same Supabase project.
*/

-- 1. Enable pg_net extension
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- 2. Create the trigger function
CREATE OR REPLACE FUNCTION notify_on_new_application()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Perform a non-blocking HTTP request to the Edge Function
  PERFORM net.http_post(
    url := 'https://rtjyyarbeanmwdzdlbhz.supabase.co/functions/v1/new-application-notification',
    body := jsonb_build_object('record', NEW),
    headers := '{"Content-Type": "application/json"}'::jsonb
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error, but don't fail the transaction
    RAISE WARNING 'Failed to invoke notification function: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- 3. Create the trigger
DROP TRIGGER IF EXISTS on_new_application_trigger ON contractor_applications;
CREATE TRIGGER on_new_application_trigger
  AFTER INSERT ON contractor_applications
  FOR EACH ROW
  EXECUTE FUNCTION notify_on_new_application();
