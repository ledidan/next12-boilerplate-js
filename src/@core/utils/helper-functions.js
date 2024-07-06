export const SECRET_EMAIL = email => {
  if (!email) return '';
  const [username, domain] = email.split('@')
  const hiddenUsername = `${username.substring(0, 3)}${'*'.repeat(username.length - 3)}`;
  return `${hiddenUsername}@${domain}`;

}
