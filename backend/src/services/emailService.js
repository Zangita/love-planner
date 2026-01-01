const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

function buildRomanticEmail(plan) {
    return `
  <div style="
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #fbc2eb, #a6c1ee);
    padding: 40px;
    text-align: center;
  ">
    <div style="
      max-width: 480px;
      margin: auto;
      background: rgba(255,255,255,0.95);
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    ">
      <h1 style="margin-top:0;color:#ff5c8a;">
        💖 Love Planner 💖
      </h1>

      <p style="font-size:16px;color:#444;">
        Mañana tienen un plan especial ✨
      </p>

      <h2 style="color:#333;">
        ${plan.title}
      </h2>

      <p style="font-size:15px;color:#555;">
        📅 <strong>${plan.date}</strong><br/>
        ⏰ <strong>${plan.time}</strong>
      </p>

      ${plan.location ? `<p>📍 ${plan.location}</p>` : ''}

      ${plan.notes ? `
        <div style="
          margin-top:15px;
          padding:12px;
          background:#fce4ec;
          border-radius:12px;
          color:#444;
        ">
          💌 ${plan.notes}
        </div>
      ` : ''}

      <p style="margin-top:25px;font-size:14px;color:#666;">
        Disfruten el momento 💕<br/>
        Este recordatorio fue enviado con amor.
      </p>
    </div>
  </div>
  `;
}

async function sendReminderEmail(to, plan) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject: `💖 Recordatorio: ${plan.title} es mañana`,
    html: buildRomanticEmail(plan)
  });

  console.log(`📧 Email enviado a ${to}`);
}

module.exports = { sendReminderEmail };