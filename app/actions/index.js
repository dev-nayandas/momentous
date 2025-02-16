"use server";

import { createUser, findUserByCredentials, getEventById, updateGoing, updateInterest } from "@/db/queries";
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend';
import EmailTemplate from '@/components/payments/EmailTemplate';

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

async function addGoingEvent(momentId, user) {
    try {
        await updateGoing(momentId, user?.id);
        await sendEmail(momentId, user);
    } catch(error) {
        throw error;
    }
    revalidatePath('/');
    redirect('/');
}

async function sendEmail(momentId, user) {
    try{
      console.log(momentId, user, process.env.RESEND_API_KEY);
      const event = await getEventById(momentId);
      const resend = new Resend(process.env.RESEND_API_KEY);
      const message = `Dear ${user?.name}, you have been successfully registered for the event, ${event?.name}. Please carry this email and your official id to the venue. We are excited to have you here.`;
      const sent = await resend.emails.send({
        from: "rich.nayan@gmail.com",
        to: user?.email,
        subject: "Successfully Registered for the event!",
        react: EmailTemplate({ message })
      });
    } catch (error) {
      throw error;
    }
  }

export { registerUser, performLogin, addInterestedEvent, addGoingEvent, sendEmail };
