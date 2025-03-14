export default function titleCase(text:string):string{
  return text.charAt(0).toUpperCase().concat(text.slice(1));
}