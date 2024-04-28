import { Codesandbox, GithubIcon } from "lucide-react"

export const Footer = () => {
  return (
    <footer className='border-neutral-800 gap-md flex items-center justify-center md:items-start md:justify-start w-full p-layout border-t'>
      <a href='github.com'><GithubIcon /></a>
      <span>|</span>
      <a href='codesandbox.io'><Codesandbox /></a>
    </footer>
  )
}
