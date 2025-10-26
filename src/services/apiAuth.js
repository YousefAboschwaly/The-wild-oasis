import supabase from "./supabase";
const SUPBASEURL = import.meta.env.VITE_SUPABASE_URL;

export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar: "" },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({
  fullName,
  password,
  avatar,
  oldAvatarUrl,
}) {
  //if there is oldAvatar to delete it
  if (oldAvatarUrl && avatar) {
    const oldPath = oldAvatarUrl.split("/").slice(-1)[0];
    const { error: deleteError } = await supabase.storage
      .from("avatars")
      .remove([oldPath]);
    if (deleteError)
      console.error("Error deleting old avatar:", deleteError.message);
  }

  // 1 Prepare data that will be updated
  let updateData = {};
  if (fullName) updateData.data = { fullName };
  if (password) updateData.password = password;

  // 2 update password and fullname
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  // 3- return Data when there is no avatar this mean to return data when we don't make any update in avatar
  if (!avatar) return data;

  // 4- Upload avatar to avatars Bucket
  const ext = avatar.name.split(".").pop();
  const fileName = `avatar-${data.user.id}.${ext}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar, { upsert: true }); // upsert=true يسمح بالكتابة فوق القديمة لو لم تُحذف

  if (storageError) throw new Error(storageError.message);

  // 5- Update avatar in the user
  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${SUPBASEURL}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateError) throw new Error(updateError.message);

  return updatedUser;
}
