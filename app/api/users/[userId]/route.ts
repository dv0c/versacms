import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/libs/prismadb";
import { userNameSchema } from "@/libs/validations/user";
import { getCurrentUser } from "@/libs/session";

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route context.
    const { params } = routeContextSchema.parse(context);

    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions);
    if (!session?.user || params.userId !== session?.user.id) {
      return new Response(null, { status: 403 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = userNameSchema.parse(body);

    // Update the user.
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: payload.name,
      },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  const { params } = routeContextSchema.parse(context);

  try {
    // Ensure user is authentication and has access to this user.
    const session = await getCurrentUser();

    if (session?.role !== "ADMIN") {
      return new Response(null, { status: 403 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = userNameSchema.parse(body);

    // delete the user.
    await db.user.delete({
      where: {
        id: params.userId,
      },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
