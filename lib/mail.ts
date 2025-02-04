import {Resend}from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (name:string, email: string, token: string) => {
    console.log('Sending verification email to', email);
    const verifyLink = `http://localhost:3000/auth/verify-email?token=${token}`;
    const html = `
        <h1>Hi ${name}</h1>
        <p>Click the link below to verify your email address</p>
        <a href="${verifyLink}">Verify Email</a>
    `;

    await resend.emails.send({from:'no-reply-lankabidslk@heathself.com',
        to: email,
        html: html,
        subject: 'Verify your email address - LankaBidsLK'
    });
}

export const sendTwoFactorEmail = async (name:string, email: string, token: string) => {
    await resend.emails.send({from:'no-reply-lankabidslk@heathself.com',
        to: email,
        html: `<h1>Hi ${name}</h1><p>Your two factor token is ${token}</p>`,
        subject: 'Two Factor Authentication Code - LankaBidsLK'
    });
}