import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req,token }) => {
      if(req.nextUrl.pathname=="/DashBoard")
      return token?.role=="ADMIN";
    },
  },
});

export const config = {
  matcher: ["/DashBoard"],
};
