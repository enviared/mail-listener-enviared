var MailListenerEnviared = require("./index.js").MailListenerEnviared;

var mailListenerEnviared = new MailListenerEnviared({
  username: process.env.IMAPUSER,
  password: process.env.IMAPPASS,
  host: process.env.IMAPHOST,
  port: 993,
  tls: true,
  connTimeout: 10000, // Default by node-imap
  authTimeout: 5000, // Default by node-imap,
  debug: null, // Or your custom function with only one incoming argument. Default: null
  tlsOptions: { rejectUnauthorized: false },
  mailbox: "INBOX", // mailbox to monitor
  searchFilter: ["ALL"], // the search filter being used after an IDLE notification has been retrieved
  markSeen: true, // all fetched email willbe marked as seen and not fetched next time
  fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
  attachments: true, // download attachments as they are encountered to the project directory
  attachmentOptions: { directory: "attachments/" },
});

mailListenerEnviared.start();

mailListenerEnviared.on("server:connected", function () {
  console.log("imapConnected");
});

mailListenerEnviared.on("mailbox", function (mailbox) {
  console.log("Total number of mails: ", mailbox.messages.total);
});

mailListenerEnviared.on("server:disconnected", function () {
  console.log("imapDisconnected");
});

mailListenerEnviared.on("error", function (err) {
  console.log(err);
});

mailListenerEnviared.on("headers", function (headers, seqno) {
  console.log(`Email#${seqno} headers: `, headers);
});

mailListenerEnviared.on("body", function (body, seqno) {
  console.log(`Email#${seqno} body: `, body);
});

mailListenerEnviared.on("attachment", function (attachment, path, seqno) {
  console.log(`Email#${seqno} Attachment stored at: `, path);
});

mailListenerEnviared.on("mail", function (mail, seqno) {
  console.log(`Email#${seqno} - entire parsed object: `, mail);
});
