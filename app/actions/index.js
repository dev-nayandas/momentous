"use server";

import { createUser, findUserByCredentials, updateInterest } from "@/db/queries";
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache'

async function registerUser(formData) {
    const user = Object.fromEntries(formData);
    const created = await createUser(user);
    redirect("/login");
}

async function performLogin(formData) {
    try {
        const credential = {};
        credential.email = formData.get("email");
        credential.password = formData.get("password");
        const found = await findUserByCredentials(credential);
        return found;
    } catch (error) {
        throw error;
    }
}

async function addInterestedEvent(momentId, authId) {
    try {
        await updateInterest(momentId, authId);
    } catch(error) {
        throw error;
    }
    revalidatePath('/');
}

export { registerUser, performLogin, addInterestedEvent };
