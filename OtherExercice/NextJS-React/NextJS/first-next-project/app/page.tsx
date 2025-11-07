import Link from "next/link";


export default function Home() {
  
  const project = [
    {
      slug: 'apple',
      title: 'Apple',
      demoUrl: 'https://apple.com',
      githubUrl: 'https://github.com/apple',
    },
    {
      slug: 'google',
      title: 'Google',
      demoUrl: 'https://google.com',
      githubUrl: 'https://github.com/google',
    },
    {
      slug: 'microsoft',
      title: 'Microsoft',
      demoUrl: 'https://microsoft.com',
      githubUrl: 'https://github.com/microsoft',
    },
    {
      slug: 'amazon',
      title: 'Amazon',
      demoUrl: 'https://amazon.com',
      githubUrl: 'https://github.com/amazon',
    }
  ]
  
  return (
    <div>
      Hello Home! Let's see some projects:
      <ul>
        {project.map((proj) => (
          <li key={proj.slug}>
            <Link href={`/project/${proj.slug}`}>{proj.title}</Link>
          </li>
        ))}
      </ul>

    </div>
  );
}
