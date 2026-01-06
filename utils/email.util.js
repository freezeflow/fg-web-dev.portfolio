import { Resend } from 'resend'; 
import { RESEND_KEY, RESEND_EMAIL, FYNECODE_EMAIL } from '../config/config.js';

const resend = new Resend(RESEND_KEY);

export const sendEmail = async (message, email, name) => {
  try {
    const response = await resend.emails.send({
      from: RESEND_EMAIL,
      to: [FYNECODE_EMAIL],
      subject: 'Fynecode Enquiry',
      html: `
        <h2>New Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
    });

    return response ;
  } catch (error) {
    throw new Error(error);
  }
};
