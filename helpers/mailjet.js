const axios = require('axios');

async function mailjet(receiverEmail, receiverName, subject, message) { 
  const apiKey = 'ec2c0f0c4e608b4054d545136371ec3d';
  const secretKey = '41eaaefc72f7bb15ca1dbb85ea6c4b70';
  const senderEmail = 'scriptwithahmad@gmail.com';
  const senderName = 'Muhammad Ahmad';

  const apiEndpoint = 'https://api.mailjet.com/v3.1/send';

  const auth = {
    username: apiKey,
    password: secretKey,
  };

  const emailPayload = {
    Messages: [
      {
        From: {
          Email: senderEmail,
          Name: senderName,
        },
        To: [
          {
            Email: receiverEmail,
            Name: receiverName,
          },
        ],
        Subject: subject,
        TextPart: message,
        HTMLPart: `<p>${message}</p>`,
      },
    ],
  };

  const headers = {
    'Content-Type': 'application/json',
  };

  // Making the API request using axios
  try {
    var {data} = await axios.post(apiEndpoint, emailPayload, { auth, headers })
    return data
  } catch (error) {
      console.error('Failed to send email:', error.response ? error.response.data : error.message);
    return false
  }
 
}

export default mailjet