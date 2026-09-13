export const DEFAULT_AVATAR = "/images/person/noAvatar.png"; // served from public/

export const avatarUrl = (photo) => photo || DEFAULT_AVATAR;

// onError handler for <img>: fall back to the bundled avatar once, without looping.
export const onAvatarError = (event) => {
  if (event.currentTarget.src.endsWith(DEFAULT_AVATAR)) return;
  event.currentTarget.src = DEFAULT_AVATAR;
};
