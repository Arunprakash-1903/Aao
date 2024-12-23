import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";

import {  NextResponse } from "next/server";

export  async function GET() {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any 
const session :any =await getServerSession(authOptions)

if(session?.user?.role=="ADMIN")
//console.log("Admin");

return NextResponse.redirect(new URL("/DashBoard","http://localhost:3000"))
else {
return   NextResponse.redirect(new URL("/403","http://localhost:3000"))
}  
}
