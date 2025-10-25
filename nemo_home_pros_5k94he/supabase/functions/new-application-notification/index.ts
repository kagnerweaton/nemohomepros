import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { corsHeaders } from '../_shared/cors.ts'

// Get Mailgun credentials from environment variables
const MAILGUN_API_KEY = Deno.env.get('MAILGUN_API_KEY')
const MAILGUN_DOMAIN = Deno.env.get('MAILGUN_DOMAIN')
const NOTIFICATION_EMAIL = Deno.env.get('NOTIFICATION_EMAIL')

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Ensure all required environment variables are set
    if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN || !NOTIFICATION_EMAIL) {
      console.error('Missing required environment variables for Mailgun.')
      throw new Error('Server configuration error: Missing Mailgun credentials.')
    }

    // The database trigger sends a payload with a `record` object
    const { record } = await req.json()

    if (!record) {
      throw new Error('Invalid request payload: "record" object not found.')
    }

    // Destructure the application data from the record
    const {
      name,
      contact_name,
      phone,
      email,
      services,
      service_areas,
    } = record

    // Construct the email content
    const emailSubject = `New Contractor Application: ${name}`
    const emailText = `
A new contractor application has been submitted.

Business Name: ${name}
Contact Name: ${contact_name}
Phone: ${phone}
Email: ${email}
Service Areas: ${service_areas.join(', ')}

Services Offered:
${services.join(', ')}
    `
    const emailHtml = `
      <html>
        <body style="font-family: sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">New Contractor Application Received</h2>
          <p>A new application has been submitted through the NEMO Home Pros website.</p>
          <hr>
          <h3 style="color: #555;">Applicant Details:</h3>
          <ul>
            <li><strong>Business Name:</strong> ${name}</li>
            <li><strong>Contact Name:</strong> ${contact_name}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
            <li><strong>Service Areas:</strong> ${service_areas.join(', ')}</li>
          </ul>
          <h3 style="color: #555;">Services Offered:</h3>
          <p>${services.join(', ')}</p>
          <hr>
          <p style="font-size: 0.9em; color: #888;">This is an automated notification from NEMO Home Pros.</p>
        </body>
      </html>
    `

    // Prepare the data for the Mailgun API
    const formData = new URLSearchParams()
    formData.append('from', `NEMO Home Pros <noreply@${MAILGUN_DOMAIN}>`)
    formData.append('to', NOTIFICATION_EMAIL)
    formData.append('subject', emailSubject)
    formData.append('text', emailText)
    formData.append('html', emailHtml)

    // Send the email via Mailgun
    const response = await fetch(`https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error(`Mailgun API Error: ${response.status}`, errorBody)
      throw new Error(`Failed to send email via Mailgun. Status: ${response.status}`)
    }

    const data = await response.json()

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error processing new application:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500, // Use 500 for internal server errors
    })
  }
})
