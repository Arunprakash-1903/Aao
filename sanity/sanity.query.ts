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
export async function getModules(){
  return client.fetch(
    groq`*[_type=='modules']{
    id,
    title,
    "slug":slug.current,
    description,
    "image":mainImage.asset->url,
    _type
    }
    `
    )
}
export async function getJobById(id:number){
return client.fetch(
groq`*[_type=='jobs' && id==$id]{
id,
jobd,
about,



}




`
,{id}

)
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
export async function getNataCourses(){
  return client.fetch(
    groq`*[_type=='course']{
        _id,
        id,
          title,
          _type,
          description,
          price,
          "slug":slug.current,
          publishedAt,
          "image":mainImage.asset->url,
        
        
      }`
  );
}
export  async function getMainPageContent(page:string){
  return client.fetch(
    groq`*[_type=='main' && page==$page] {
    page,
    description,
    video
    }`
,{
  page
}
  )
}
export async function getRecentFDP() {
  return client.fetch(
    groq`*[_type=='fdp' ] | order(_createdAt asc){
      _id,
        title,
        "slug":slug.current,
        publishedAt,
        _type,
        "image":mainImage.asset->url,
     
      
    }[0..2]`
  );
}
export async function getRecentWorkShop() {
  return client.fetch(
    groq`*[_type=='workshop' ] | order(_createdAt asc){
      _id,
        title,
        _type,
        "slug":slug.current,
        publishedAt,
        "image":mainImage.asset->url,
       
      
    }[0..2]`
  );
}
export async function getRecentJobs() {
  return client.fetch(
    groq`*[_type=='job' ] | order(_createdAt asc){
      _id,
        title,
        _type,
        "slug":slug.current,
        publishedAt,
        "image":mainImage.asset->url,
       
      
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
      id,
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
export async function getCourseBySlug(slug:string) {
  return client.fetch(
    groq`*[_type == 'course' && slug.current == $slug][0]{
      _id,
      id,
      title,
      "slug": slug.current,
      
      "image": mainImage.asset->url,
      description,
      price

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
export async function getFDP() {
  return client.fetch(
    groq`*[_type=='fdp']{
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
export async function getFDPBySlug(slug:string) {
  return client.fetch(
    groq`*[_type == 'fdp' && slug.current == $slug][0]{
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