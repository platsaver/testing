// sendEmail.js
import emailConfig from './config.js';

// Đảm bảo đã thêm SMTP.js trong HTML:
// <script src="https://smtpjs.com/v3/smtp.js"></script>

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    
    if (!form) {
        console.error('Form not found!');
        return;
    }
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value; // Email từ form
        const message = document.getElementById('message').value;
        
        const body = `
            From: ${name} (${email})
            Message: ${message}
        `;
        
        // Sử dụng SMTP.js để gửi email
        Email.send({
            Host: emailConfig.host,
            Username: emailConfig.username,
            Password: emailConfig.password,
            To: email,                  // Dùng email từ form thay vì hardcode
            From: emailConfig.username, // Email gửi từ tài khoản của bạn
            Subject: "New Contact Form Submission",
            Body: body
        }).then(
            message => {
                console.log(message);
                alert("Email sent successfully!");
                form.reset(); // Reset form sau khi gửi thành công
            }
        ).catch(
            error => {
                console.error("Error:", error);
                alert("Failed to send email: " + error);
            }
        );
    });
});