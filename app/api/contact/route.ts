import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(apiKey);
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      companyName,
      budget,
      services,
      projectDescription,
      selectedDate,
      selectedTime,
    } = body;

    // Send email to you
    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: 'Aelio Contact <onboarding@resend.dev>', // Update with your verified domain
      to: ['info@aelio.dev'], // Your email
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        
        <h3>Company Information</h3>
        <p><strong>Company Name:</strong> ${companyName || 'N/A'}</p>
        <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
        <p><strong>Services:</strong> ${services?.join(', ') || 'N/A'}</p>
        
        <h3>Project Details</h3>
        <p><strong>Description:</strong> ${projectDescription || 'N/A'}</p>
        
        <h3>Appointment</h3>
        <p><strong>Date:</strong> ${selectedDate || 'N/A'}</p>
        <p><strong>Time:</strong> ${selectedTime || 'N/A'}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'Aelio <onboarding@resend.dev>', // Update with your verified domain
      to: [email],
      subject: 'Thank you for contacting Aelio',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>We've received your message and will get back to you soon.</p>
        ${selectedDate && selectedTime ? `
          <p><strong>Scheduled Appointment:</strong> ${selectedDate} at ${selectedTime}</p>
        ` : ''}
        <p>Best regards,<br>The Aelio Team</p>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

