import nodemailer from 'nodemailer';

const forgotPasswordEmail = async (data) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
  });

  const { email, name, token} = data;

  const info = await transporter.sendMail({
    from: "APV - Administrador de Pacientes de Veterinaria",
    to: email,
    subject: 'Reestablece tu contraseña',
    text: 'Reestablece tu contraseña',
    html: `<p>Hola ${name}, has solicitado reestablecer tu contraseña.</h1>
        <p>Visita el siguiente para reestablecerla:
        <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Reestablecer contraseña</a></p>
    `
  });

  console.log("Mensaje enviado: %s", info.messageId)
}

export default forgotPasswordEmail;