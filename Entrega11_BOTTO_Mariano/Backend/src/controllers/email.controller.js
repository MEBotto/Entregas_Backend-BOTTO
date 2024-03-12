import nodemailer from "nodemailer";
import __dirname from "../utils.js"

// Configuracion de Transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "marianobotto92@gmail.com",
    pass: "ubfwlwpluyvskxis"
  }
})

// Verificamos la conexion con gmail
transporter.verify(function (error, success) {
  if (error) {
    console.error(error)
  } else {
    console.log("Server is ready to take our messages")
  }
})

const mailOptions = {
  from: "Backend Test - marianobotto92@gmail.com",
  to: "marianobotto92@gmail.com",
  subject: "Correo de prueba Programacion Backend", 
  html: `<div><h1> Esto es un test de correo con NodeMailer </h1></div>`,
  attachments: []
}

const mailOptionsWithAttachments = {
  from: "Backend Test - marianobotto92@gmail.com",
  to: "marianobotto92@gmail.com",
  subject: "Correo de prueba Programacion Backend", 
  html: `<div>
            <h1> Esto es un test de correo con NodeMailer </h1>
            <p> Ahora usando imagenes! </p>
            <img src="cid:luo"/>
          </div>`,
  attachments: [
    {
      filename: "Foto de luo",
      path: "https://scontent.faep24-1.fna.fbcdn.net/v/t1.18169-9/10404883_1477850089121226_7137275793143838697_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=be3454&_nc_eui2=AeFi8E_4UrDvChniJqwgeNwnvg_IVZybNa--D8hVnJs1r4BDXK2NFapzLFL0vgeeR-EyWqhs2C1-ZQrnPFh3B1EB&_nc_ohc=PqLMCElvHhEAX-slKx_&_nc_ht=scontent.faep24-1.fna&oh=00_AfBx2mfWrJzwR-vWzjE5isdbwTWJx0SjYWAmXGw5YY-DYw&oe=65F39978",
      cid: "luo"
    }
  ]
}

// sendEmail, sendEmailWithAttachments
export const sendEmail = (req, res) => {
  try {
    let result = transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(400).send({ message: "Error", payload: error })
      }
      console.log("Message sent: %s", info.messageId)
      res.send({ message: "Success", payload: info })
    })
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error, message: "No se pudo enviar el email desde: marianobotto92@gmail.com" })
  }
}

export const sendEmailWithAttachments = (req, res) => {
  try {
    let result = transporter.sendMail(mailOptionsWithAttachments, (error, info) => {
      if (error) {
        console.error(error);
        res.status(400).send({ message: "Error", payload: error })
      }
      console.log("Message sent: %s", info.messageId)
      res.send({ message: "Success", payload: info })
    })
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error, message: "No se pudo enviar el email desde: marianobotto92@gmail.com" })
  }
}