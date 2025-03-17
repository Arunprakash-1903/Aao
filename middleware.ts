import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req,token }) => {
      if(req.nextUrl.pathname=="/DashBoard" || req.nextUrl.pathname=="/DashBoard/new-workshop")
      return token?.role=="ADMIN";
    },
  },
});

export const config = {
  matcher: ["/DashBoard","/DashBoard/new-workshop"],
};
