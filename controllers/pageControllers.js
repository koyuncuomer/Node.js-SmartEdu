const nodemailer = require('nodemailer');

exports.getIndexPage = (req, res) => {
  console.log(req.session.userID);
  res.status(200).render('index', {
    page_name: 'index',
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.sendEmail = async (req, res) => {
  try {
    const outputMessage = `
    <h1>Mail Details </h1>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
    `;

    const transporter = nodemailer.createTransport({
      host: 'smtp.youremailhost.com',
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: 'user@youremailhost.com',
        pass: 'password',
      },
    });

    const info = await transporter.sendMail({
      from: '"Smart Edu Contact" <user@youremailhost.com>', // sender address
      to: 'test@mail.com', // list of receivers
      subject: 'Smart Edu Contact New Message', // Subject line
      html: outputMessage, // html body
    });

    req.flash('success', 'Send Succesfully');
    res.status(200).redirect('/contact');
  } catch (error) {
    req.flash('error', 'Something happened!');
    res.status(400).redirect('/contact');
  }
};
