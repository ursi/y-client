exports.getHostname = () => window.location.hostname;

exports.initialize_f = mk2Tuple => freshUid => freshCid => () => {
  let userId = localStorage.getItem('userId');
  if (!userId) userId = freshUid
  localStorage.setItem('userId', userId);

  const convoId = new URL(window.location.href).searchParams.get('convo');
  if (!convoId) window.location.href += '?convo=' + freshCid;

  return mk2Tuple(userId)(convoId);
};

exports.dateString = Date

exports.sendNotification = person => message => () => {
	new Notification(`⅄`, {body: person + ":\n" + message})
		.onclick = function() {focus(window); this.close()};
};

exports.notificationsPermission = () => Notification.requestPermission();
