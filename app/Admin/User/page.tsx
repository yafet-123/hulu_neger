import Image from 'next/image'
import { PrismaClient } from '@prisma/client'




async function fetchRepos() {
  const prisma = new PrismaClient()
  const response = await fetch(
    // fetch from our code repository
    'https://api.github.com/users/yafet-123/repos',
    {   
      next: {
        revalidate: 60,
      },
    }
  );
  const repos = await response.json(); // change file response json file
  return repos;
}

export default function AdminUserHome() {
  async function main() {
  const users = await prisma.User.findMany({orderBy : {ModifiedDate:'desc'}});
    console.log(users)
  }

  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
  return (
    <section className='w-full flex-center flex-col pt-24'>
      user
    </section>
  )
}
