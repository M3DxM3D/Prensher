/* eslint-disable camelcase */
const nodemailer = require("nodemailer");
const models = require("../models");
require("dotenv").config();

const invitationVerifyUserExists = (req, res, next) => {
  const { email } = req.body;
  models.user.getUserByMail(email).then(([rows]) => {
    const rowsLength = rows.length;
    if (rowsLength > 0) {
      req.userExist = true;
      req.body.user_id = rows[0].id;
      req.user_firstname = rows[0].firstname;
    } else {
      req.userExist = false;
    }
    next();
  });
};


const sendInvitationMail = (req, res, next) => {
  const {
    email,
    newTempPassword,
    grey50,
    primary600,
  } = req.body;
  const { userExist,user_firstname } = req;

  const emailSender = "prensher <ne-pas-repondre@prensher.fr>";

  const activationLink = `${process.env.FRONTEND_URL}/invitation?email=${email}&activation_code=${newTempPassword}`;

  const connexionLink = `${process.env.FRONTEND_URL}/`;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_BREVO,
    port: process.env.SMTP_PORT_BREVO,
    secure: false,
    auth: {
      user: process.env.SMTP_BREVO_USER,
      pass: process.env.SMTP_BREVO_PASSWORD,
    },
  });

  let mailOptions = {};
  if (userExist ) {
    mailOptions = {
      from: emailSender,
      to: email,
      subject: `Invitation à rejoindre prensher!`,
      text: `Bonjour${user_firstname ? ` ${user_firstname}` : ""},
      \n\n

      Vous avez été invité à rejoindre la plateforme de prensher. Connectez vous en cliquant sur le lien suivant :\n\n
      
      ${connexionLink}\n\n
      
      Bonne journée,\n\n
      L'Équipe de prensher`,
      html: `
      <head>
          <style>
              .preheader {
                  display: none !important;
                  visibility: hidden;
                  opacity: 0;
                  color: transparent;
                  height: 0;
                  width: 0;
              }
          </style>
      </head>
      
      <body>
          <span class="preheader" style="display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">Rejoingnez prensher</span>
          <div style="font-family:Verdana; font-size: 18px ;">
              <div style="background-color: ${grey50}; padding: 20px; border-radius: 12px;">
                  <p>Bonjour${user_firstname ? ` ${user_firstname}` : ""},</p>
                  <p>Vous avez été invité à rejoindre la palteforme prensher. Connectez vous en cliquant sur le bouton suivant :</p>
      
                  <a style="background-color: ${primary600}; border-radius: 8px; text-decoration: none; padding: 10px 18px; text-align: center; color:#fff;" href="${connexionLink}">Je me connecte</a></br>
                  <p>Bonne journée,</p>
                  <p>L'Équipe de prensher</p>
              </div>
          </div>
      </body>
      `,
    };
  } else if (userExist) {
    mailOptions = {
      from: emailSender,
      to: email,
      subject: `RAPPEL : Invitation à rejoindre prensher`,
      text: `
      Bonjour${user_firstname ? ` ${user_firstname}` : ""},\n\n

      Vous avez aviez été invité à rejoindre la plateforme prensher. Connectez vous en cliquant sur le lien suivant :\n\n
      
      ${connexionLink}\n\n
      
      Bonne journée,\n\n
      L'Équipe d'prensher`,
      html: `
      <head>
          <style>
              .preheader {
                  display: none !important;
                  visibility: hidden;
                  opacity: 0;
                  color: transparent;
                  height: 0;
                  width: 0;
              }
          </style>
      </head>
      
      <body>
          <span class="preheader" style="display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">Rejoingnez prensher</span>
          <div style="font-family:Verdana; font-size: 18px ;">
              <div style="background-color: ${grey50}; padding: 20px; border-radius: 12px;">
                  <p>Bonjour${user_firstname ? ` ${user_firstname}` : ""},</p>
                  <p>Vous aviez été invité à rejoindre  la plateforme prensher. Connectez vous en cliquant sur le bouton suivant :</p>
      
                  <a style="background-color: ${primary600}; border-radius: 8px; text-decoration: none; padding: 10px 18px; text-align: center; color:#fff;" href="${connexionLink}">Je me connecte</a></br>
                  <p>Bonne journée,</p>
                  <p>L'Équipe d'prensher</p>
              </div>
          </div>
      </body>
      `,
    };
  } else {
    mailOptions = {
      from: emailSender,
      to: email,
      subject: `Invitation à rejoindre prensher`,
      text: `
      Bonjour,\n\n

      Vous avez été invité à rejoindre la plateforme prensher. Validez votre compte en cliquant sur le lien suivant :\n\n
      
      ${activationLink}\n\n
      
      Bonne journée,\n\n
      L'Équipe de prensher`,
      html: `
      <head>
          <style>
              .preheader {
                  display: none !important;
                  visibility: hidden;
                  opacity: 0;
                  color: transparent;
                  height: 0;
                  width: 0;
              }
          </style>
      </head>
      
      <body>
          <span class="preheader" style="display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">Rejoingnez prensher</span>
          <div style="font-family:Verdana; font-size: 18px ;">
              <div style="background-color: ${grey50}; padding: 20px; border-radius: 12px;">
                  <p>Bonjour,</p>
                  <p>Vous avez été invité à rejoindre la plateforme prensher. Validez votre compte en cliquant sur le bouton suivant :</p>
      
                  <a style="background-color: ${primary600}; border-radius: 8px; text-decoration: none; padding: 10px 18px; text-align: center; color:#fff;" href="${activationLink}">Valider mon compte</a></br>
                  <p>Bonne journée,</p>
                  <p>L'Équipe de prensher</p>
              </div>
          </div>
      </body>
  `,
    };
  }

  transporter
    .sendMail(mailOptions)
    .then(() => {
      delete req.body.newTempPassword;
      next();
    })
    .catch((err) => {
      console.warn(err);
      res.status(500).send("Something went wrong during the email sending");
    });
};

const invitationNewUser = (req, res, next) => {
  const { userExist } = req;
  if (!userExist) {
    models.user
      .createUser(req.body)
      .then(([rows]) => {
        if (rows.affectedRows) {
          req.body.user_id = rows.insertId;
          next();
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        if (err.code === "ER_DUP_ENTRY") {
          res.sendStatus(409);
        } else {
          console.error(err);
          res.sendStatus(500);
        }
      });
  } else {
    next();
  }
};

module.exports = {
  invitationVerifyUserExists,
  invitationNewUser,
  sendInvitationMail,
};
