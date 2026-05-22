import slugify from 'slugify';
import { Model } from 'mongoose';

export async function generateUniqueSlug(
  name: string,
  model: Model<any>,
): Promise<string> {

 
  let slug = slugify(name, {
    lower: true,
    strict: true,
    trim: true,
  });

  
  const existing = await model.findOne({ slug });

  // if duplicate slug append random suffix
  if (existing) {
    const suffix = Math.random().toString(36).slice(2, 6);
    slug = `${slug}-${suffix}`;
  
  }

  return slug;
}