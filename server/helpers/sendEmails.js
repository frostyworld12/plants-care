const nodemailer = require('nodemailer');

async function configureTransaporter() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hb4469790@gmail.com',
      pass: 'garfnzkmxcfkdkle',
    },
  });

  return {
    transporter: transporter,
  };
}

async function sendEmail(recepient, subject, content) {
  const { transporter } = await configureTransaporter();

  const result = await transporter.sendMail({
    from: '"Plants Care" hb4469790@gmail.com',
    to: recepient,
    subject: subject,
    html: content
  });

  console.log(result);
}


function generateResetPasswordTemplate(confirmationCode) {
  const html = `
  <div style="
    overflow: hidden;
    position: relative;
    font-family: 'Trebuchet MS', Tahoma, sans-serif;
    height: 300px;
    background-color: #759ff90f;
    border-radius: 10px;
    box-shadow: 0 0 20px 0 #0051ff26;
  ">
    <div style="
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      height: 300px;
      position: relative;
      z-index: 2;
    ">
      <div>
        <div style="
          display: flex;
          justify-content: center;
          position: relative;
        ">
          <div style="
            text-align: center;
            background-color: #ffffff7d;
            padding: 10px 20px;
            border-radius: 5px;
            box-shadow: 0 0 3px 0 #6161611f;
            font-weight: bold;
            backdrop-filter: blur(8px);
          ">${confirmationCode}</div>
          <div style="
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 5px;
            z-index: -1;
            top: -10px;
            left: 10px;
            background: linear-gradient(-90deg, rgba(79,115,254,1) 10%, rgba(205,50,255,0.38699229691876746) 110%);
            box-shadow: 0 0 8px 0px #b1b1b1;
          "></div>
        </div>
      </div>
      <div style="font-size: 14px;">You confirmation code to reset the password</div>
    </div>
  </div>
`;

  return html;
}

module.exports = {
  sendEmail,
  generateResetPasswordTemplate
};