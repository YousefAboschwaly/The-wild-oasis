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

export async function updateCurrentUser({ fullName, password, avatar }) {
  let updateData;

  // 1 handle data that will be updated
  if (fullName) updateData = { data: { fullName } };
  if (password) updateData = { password };
  // 2 update User
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  // 3- return Data when there is no avatar this mean to return data when we don't make any update in avatar
  if (!avatar) return data;

  // 4- Upload avatar to avatars Bucket
  const fileName = `avatar-${data?.user.id}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName);
  if (storageError) throw new Error(storageError.message);

  // 5- Update avatar in the user
  const { data: updateUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${SUPBASEURL}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updateUser;
}
