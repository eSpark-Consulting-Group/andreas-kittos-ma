const handleUrlChange = ({url}: {url: string}) => {
  // Extract the token value from the deep link
  const tokenMatch = url.match(/token=([^&]+)/);

  if (tokenMatch) {
    const token = tokenMatch[1];
    console.log('Token from deep link:', token);
    return token;
  }
};

function hideEmail(email: string) {
  // Split the email address into username and domain
  let [username, domain] = email.split('@');

  // Hide characters in the username, leaving only the first two and the last two characters visible
  let hiddenUsername =
    username.length > 4
      ? username.substr(0, 2) +
        '*'.repeat(username.length - 4) +
        username.substr(-2)
      : username;

  // Combine the hidden username and domain with '@' to form the masked email
  let maskedEmail = `${hiddenUsername}@${domain}`;

  return maskedEmail;
}

export {handleUrlChange, hideEmail};
