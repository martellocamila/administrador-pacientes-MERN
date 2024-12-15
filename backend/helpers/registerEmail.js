import nodemailer from 'nodemailer';

const registerEmail = async (data) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
  });

  const { email, name, token} = data;

  const info = await transporter.sendMail({
    from: "APV - Administrador de Pacientes de Veterinaria",
    to: email,
    subject: 'Confirma tu cuenta en APV',
    text: 'Confirma tu cuenta en APV',
    html: `<p>Hola ${name}, debes comprobar tu cuenta en APV.</h1>
        <p>Tu cuenta ya esta lista! Visita el siguiente enlace para confirmarla:
        <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirmar Cuenta</a></p>
    `
  });

  console.log("Mensaje enviado: %s", info.messageId)
}

export default registerEmail;