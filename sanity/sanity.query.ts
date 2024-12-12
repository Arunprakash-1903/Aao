import { createClient, groq ,ClientConfig} from "next-sanity";

const config: ClientConfig = {
    projectId: "6dt6rtno",
    dataset: "production",
    apiVersion: "2024-11-04",
    useCdn: false,
  };
const client=createClient(config)
export async function getPost() {
  return client.fetch(
    groq`*[_type=='post']{
      _id,
        title,
        "slug":slug.current,
        publishedAt,
        "image":mainImage.asset->url,
        body,
   
      
    }`
  );
}
export async function getWorkshop() {
  return client.fetch(
    groq`*[_type=='workshop']{
        _id,
          title,
          _type,
          description,
          "slug":slug.current,
          publishedAt,
          "image":mainImage.asset->url,
        
        
      }`
  );
}
export async function getRecentPost() {
  return client.fetch(
    groq`*[_type=='post' ] | order(_createdAt asc){
      _id,
        title,
        "slug":slug.current,
        publishedAt,
        "image":mainImage.asset->url,
        body,
      
    }[0..2]`
  );
}
export async function getAuthorById(id:string) {
  return client.fetch(
    groq`*[_type == 'author' && _id == $id][0]{
      _id,
      name,

      
      "image": image.asset->url,
      
      bio,
    }`,
    { id }  // passing the slug as a parameter to the query
  );
}
export async function getWorkShopBySlug(slug:string) {
  return client.fetch(
    groq`*[_type == 'workshop' && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      "image": mainImage.asset->url,
      description,
      body,
      author,
    }`,
    { slug }  // passing the slug as a parameter to the query
  );
}
export async function getPostBySlug(slug:string) {
  return client.fetch(
    groq`*[_type == 'post' && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      "image": mainImage.asset->url,
      
      body,
    }`,
    { slug }  // passing the slug as a parameter to the query
  );
}