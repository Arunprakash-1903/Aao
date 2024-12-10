
import Link from "next/link"

import Image from "next/image"

import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth"
import { LoginButton} from "./auth";
import Dropdown from "./dropdown"


//import Sidebar from "./sideBar"
//import { SidebarTrigger } from "@/components/ui/sidebar"

   async function  NavBar() {



  const session=await getServerSession(authOptions)
 

  const styles={
    wrapper:"flex justify-center  items-center flex-1 bg-gray-50 sticky top-0 z-50",
    container:"flex justify-between flex-1 flex-start items-center p-4",
    logoContainer:"flex items-center justify-between space-x-1",
    navLinks:""
  }
  {console.log("session",session)}
  return (
    <>
    
    <nav className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
        {/* <Sidebar/> */}
        <div className="flex justify-center items-center space-x-3">
        <Image
      className="object-contain cursor-pointer "
      src="/logo.jpeg"
      alt="AAO Lsogo"
      width={45}
      height={45}
    />
          <Link href="/"  className=" cursor-pointer text-xl font-bold text-gray-800">
          architecture-academics.online
          </Link>
          </div>
        </div>
        {/* quote */}

{/* sign */}
<div>
{!session?
<LoginButton/>:
    <Dropdown text={session?.user.name[0]}/>
        
        }

</div>

        </div>
  

        </nav>




  </>
  )
}

export default NavBar