import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();
// Checking where the user is loggedin or  not
  if (!user) {
    return null;
  }

  try {
    // checking user is present in the db or not  
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });
    // if present then return it 
    if (loggedInUser) {
      return loggedInUser;
    }
    // otherwise adding the user in the db
    const name = `${user.firstName} ${user.lastName}`;

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        // it can have multiple email addresses so we took first from them
        email: user.emailAddresses[0].emailAddress,
      },
    });

    return newUser;
  } catch (error) {
    console.log(error.message);
  }
};