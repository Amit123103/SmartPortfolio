/**
 * Admin Notification Template
 */
export const getAdminEmailTemplate = (name, email, message, ip) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .header { background: #000000; color: #ffffff; padding: 20px; text-align: center; border-bottom: 3px solid #00f0ff; }
        .header h2 { margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px; }
        .content { padding: 30px; }
        .info-group { margin-bottom: 20px; border-bottom: 1px solid #eeeeee; padding-bottom: 15px; }
        .info-group:last-child { border-bottom: none; }
        .label { font-size: 12px; text-transform: uppercase; color: #666666; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 5px; display: block; }
        .value { font-size: 16px; color: #333333; font-weight: 500; }
        .message-box { background: #f8f9fa; padding: 20px; border-left: 4px solid #00f0ff; border-radius: 4px; font-size: 16px; color: #2d3748; white-space: pre-wrap; }
        .meta { font-size: 12px; color: #999999; margin-top: 5px; }
        .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #eeeeee; }
        a { color: #007bff; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>📬 New Portfolio Contact</h2>
        </div>
        <div class="content">
            <div class="info-group">
                <span class="label">Sender Name</span>
                <div class="value">${name}</div>
            </div>
            <div class="info-group">
                <span class="label">Sender Email</span>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            <div class="info-group">
                <span class="label">Message Content</span>
                <div class="message-box">${message}</div>
            </div>
            <div class="info-group">
                <span class="label">Technical Details</span>
                <div class="meta">Captured at: ${new Date().toLocaleString()}</div>
                <div class="meta">IP Address: ${ip}</div>
            </div>
        </div>
        <div class="footer">
            Admin Notification • Secure Portfolio System
        </div>
    </div>
</body>
</html>
`;

/**
 * Auto-Reply Template
 */
export const getAutoReplyTemplate = (name) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #00C6FF 0%, #0072FF 100%); color: #ffffff; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.5px; }
        .content { padding: 40px 30px; text-align: left; }
        .greeting { font-size: 18px; margin-bottom: 20px; color: #333; }
        .body-text { margin-bottom: 25px; color: #555; }
        .signature { margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; font-weight: 600; color: #333; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee; }
        .social-links { margin-top: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Message Received!</h1>
        </div>
        <div class="content">
            <div class="greeting">Hello ${name},</div>
            <p class="body-text">Thank you for reaching out via my portfolio. I have received your message and appreciate you taking the time to write.</p>
            <p class="body-text">I review all inquiries personally and will get back to you as soon as possible.</p>
            
            <div class="signature">
                Best regards,<br>
                Amit Singh
            </div>
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} Amit Singh. All rights reserved.
        </div>
    </div>
</body>
</html>
`;
