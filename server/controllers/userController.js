import UserDB from "../models/userModel.js";
import HttpError from "../utils/httpError.js";

const asArray = (value) => (Array.isArray(value) ? value : []);
const idsEqual = (a, b) => String(a) === String(b);

const findUserOr404 = async (id) => {
  const user = await UserDB.findById(id);
  if (!user) throw new HttpError(404, "User not found");
  return user;
};

// @route GET /user/profile — the logged-in user
export const getMyProfile = async (req, res) => {
  const user = await findUserOr404(req.user.id);
  res.status(200).json({ success: true, message: "User profile", user });
};

// @route GET /user/profile/:userId  and  GET /user/:userId — any user's public profile
export const getUserById = async (req, res) => {
  const user = await findUserOr404(req.params.userId);
  res.status(200).json({ success: true, message: "User retrieved", user });
};

// @route POST /user/createProfile — set about / education / work experience / skills
// Accepts the capitalised keys the current client sends as well as the schema's names.
export const createProfile = async (req, res) => {
  const body = req.body || {};
  const update = {};
  const about = body.about ?? body.About;
  if (typeof about === "string") update.about = about.trim().slice(0, 500);
  if (body.education ?? body.Education) update.education = asArray(body.education ?? body.Education);
  if (body.workexperience ?? body.workExperience) {
    update.workexperience = asArray(body.workexperience ?? body.workExperience);
  }
  if (body.skills ?? body.Skills) update.skills = asArray(body.skills ?? body.Skills);

  const user = await UserDB.findByIdAndUpdate(req.user.id, { $set: update }, { new: true, runValidators: true });
  if (!user) throw new HttpError(404, "User not found");
  res.status(200).json({ success: true, message: "Profile saved", user });
};

// @route GET /user/profile/:userId/connect — send a friend request to :userId
export const sendFriendRequest = async (req, res) => {
  const me = req.user.id;
  const targetId = req.params.userId;
  if (idsEqual(me, targetId)) throw new HttpError(400, "You cannot connect with yourself");

  const [sender, target] = await Promise.all([findUserOr404(me), findUserOr404(targetId)]);
  if (target.friends.some((id) => idsEqual(id, me))) throw new HttpError(409, "Already connected");
  if (target.friendRequests.some((r) => idsEqual(r.from, me) && r.status === "pending")) {
    throw new HttpError(409, "Connection request already sent");
  }

  target.friendRequests.push({ from: me, to: targetId, status: "pending", username: sender.username });
  await target.save();
  res.status(200).json({ success: true, message: "Connection request sent", user: sender });
};

// @route PUT /user/connect/:userId/:friendsId/:status/:requestId
// :userId is the requester, :friendsId is the recipient (must be the caller),
// :status is "Accept" or "Reject", :requestId is the friendRequests sub-document id.
export const respondFriendRequest = async (req, res) => {
  const { userId: requesterId, friendsId: recipientId, status, requestId } = req.params;
  if (!idsEqual(recipientId, req.user.id)) throw new HttpError(403, "Only the recipient can respond to a request");

  const recipient = await findUserOr404(recipientId);
  const request = recipient.friendRequests.id(requestId);
  if (!request || !idsEqual(request.from, requesterId)) throw new HttpError(404, "Friend request not found");

  const accepted = status.toLowerCase() === "accept";
  if (accepted) {
    await Promise.all([
      UserDB.updateOne({ _id: recipientId }, { $addToSet: { friends: requesterId } }),
      UserDB.updateOne({ _id: requesterId }, { $addToSet: { friends: recipientId } }),
    ]);
  }
  await UserDB.updateOne({ _id: recipientId }, { $pull: { friendRequests: { _id: requestId } } });

  const user = await UserDB.findById(recipientId);
  res.status(200).json({ success: true, message: accepted ? "Request accepted" : "Request rejected", user });
};

// @route GET /user/friends/:userId — id, username and photo of each friend (bare array)
export const listFriends = async (req, res) => {
  const user = await UserDB.findById(req.params.userId).populate("friends", "username photo");
  if (!user) throw new HttpError(404, "User not found");
  res.status(200).json(user.friends.map(({ _id, username, photo }) => ({ _id, username, photo })));
};
