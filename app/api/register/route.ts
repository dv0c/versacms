import bcrypt from 'bcrypt'
import { db } from '@/libs/prismadb'
import { NextResponse } from 'next/server';

export async function POST(
    request: Request,
) {
    const body = await request.json();
    const { email, name, password } = body;
    const hashedPassword = await bcrypt.hash(password, 12);

    if (!email) return NextResponse.json('Email is required');
    
    const EmailValidate = await db.user.findUnique({
        where: {
            email
        }
    })

    if (EmailValidate) return NextResponse.json('Email already exists');

    const user = await db.user.create({
        data: {
            email,
            name,
            hashedPassword
        }
    });

    return NextResponse.json(user);
}