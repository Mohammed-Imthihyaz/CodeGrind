export const GET_WELCOME_TEMPLATE = (subscribeLink: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Daily-Code</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #3f87a6, #153459); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Welcome to Daily-Code</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're excited to have you join <strong>Daily-Code</strong> — your new coding companion!</p>
    <p>At Daily-Code, we help you stay consistent with your coding practice by sending you a carefully selected LeetCode-style question every day, straight to your inbox.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${subscribeLink}" style="background-color: #3f87a6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Subscribe to Daily Questions</a>
    </div>
    <p>Whether you're preparing for interviews or sharpening your problem-solving skills, we've got you covered — one question at a time.</p>
    <p>If you have any questions or suggestions, feel free to reach out. We're here to help you grow.</p>
    <p>Happy Coding!<br>The Daily-Code Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message. Please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const SENT_EMAIL_TEMPLATE = (questionDetails: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Daily-Code Question</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #1e3c72, #2a5298); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">🧠 Your Daily Coding Challenge</h1>
  </div>
  <div style="background-color: #ffffff; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 10px 10px;">
    <p>Hello Coder,</p>
    <p>Ready to sharpen your problem-solving skills? Here’s your challenge for today:</p>
    
    <pre style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; font-family: monospace;">
${questionDetails}
    </pre>

    <p>📌 Tip: Try solving it on your own before looking up solutions!</p>
    <p>If you want to see all questions, visit our platform.</p>

    <p>Keep grinding 💪,<br>The Daily-Code Team</p>
  </div>
  <div style="text-align: center; margin-top: 30px; color: #aaa; font-size: 0.8em;">
    <p>This is an automated message. Please do not reply directly.</p>
  </div>
</body>
</html>
`;

export const SUBSCRIPTION_CONFIRMATION_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Subscription Confirmed - Daily-Code</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #007991, #78ffd6); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">You're Officially Subscribed! 🎉</h1>
  </div>
  <div style="background-color: #ffffff; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hi there,</p>
    <p>Thank you for subscribing to <strong>Daily-Code</strong>! You’re now all set to receive <strong>4 hand-picked coding challenges every day</strong> directly in your inbox.</p>
    <p>These problems are carefully curated to help you:</p>
    <ul>
      <li>🚀 Strengthen your Data Structures and Algorithms skills</li>
      <li>🧠 Prepare efficiently for technical interviews</li>
      <li>📈 Build a daily coding habit that actually sticks</li>
    </ul>
    <p>Stay consistent and code smarter, not harder!</p>
    <p>Happy Coding!<br/>— The Daily-Code Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message. Please do not reply.</p>
    <p>If you didn’t subscribe to Daily-Code, you can safely ignore this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = (resetURL:string)=>`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;