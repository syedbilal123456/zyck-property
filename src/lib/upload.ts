import { createClient } from "@supabase/supabase-js";

export async function uploadImages(images: File[]) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const uploadResults = await Promise.allSettled(
      images.map((file) =>
        supabase.storage.from("propertyimages").upload(`${file.name}_${Date.now()}`, file)
      )
    );

    const urls = uploadResults.map((result) => {
      if (result.status === "fulfilled" && result.value.data) {
        return supabase.storage.from("propertyimages").getPublicUrl(result.value.data.path).data.publicUrl;
      }
      console.error("Error uploading file:", result);
      return null;
    }).filter((url) => url !== null); // Remove null values from failed uploads

    return urls;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw new Error("Failed to upload images.");
  }
}

export async function uploadAvatar(image: File) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data, error } = await supabase.storage.from("avatars").upload(
      `${image.name}_${Date.now()}`,
      image
    );

    if (error) {
      throw new Error(error.message);
    }

    const urlData = await supabase.storage.from("avatars").getPublicUrl(data?.path!);

    return urlData.data.publicUrl;
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw new Error("Failed to upload avatar.");
  }
}
