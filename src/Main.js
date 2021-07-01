exports.getHostname = () => window.location.hostname;

exports.initialize_f = mk2Tuple => freshUid => freshCid => () => {
  let userId = localStorage.getItem('userId');
  if (!userId) userId = freshUid
  localStorage.setItem('userId', userId);

  const convoId = new URL(window.location.href).searchParams.get('convo');
  if (!convoId) window.location.href += '?convo=' + freshCid;

  return mk2Tuple(userId)(convoId);
};

exports.dateString = ms => new Date(ms)

exports.sendNotification = playSound => soundUrl => person => message => () => {
	if (!document.hasFocus()) {
		if (playSound) new Audio(soundUrl).play();

		new Notification(`⅄`, {body: person + ":\n" + message})
			.onclick = function() {focus(window); this.close()};
	}
};

exports.notificationsPermission = () => Notification.requestPermission();

exports.isSelecting = () => getSelection().type === `Range`;

exports.hasFocus = () => document.hasFocus();

exports.setItem = key => value => () => localStorage[key] = value;

exports.getItemImpl = Nothing => Just => key => () => {
	const x = localStorage[key];
	return x === undefined ? Nothing : Just(x);
};
