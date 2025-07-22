"use server"

import { clerkClient } from "@clerk/nextjs/server";
import { date } from "zod";
import bcrypt from 'bcrypt';

export async function addCreditCard(cardName, cardNo, expiry, cvv, cardHolderName,cardType, userId) {
  //   const { stripeId, userId } = await req.json()
  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  let cards = [];
  if (Array.isArray(user.privateMetadata.cards)) {
    cards = user.privateMetadata.cards || [];
    cards.push({ cardName,cardNo, expiry, cvv, cardHolderName,date:Date.now(),cardType });
    await client.users.updateUserMetadata(userId, {
      privateMetadata: {
        cards: cards
      },
    })
  }else{
     await client.users.updateUserMetadata(userId, {
      privateMetadata: {
        cards: [{ cardName, cardNo, expiry, cvv, cardHolderName,date:Date.now(),cardType }]
      },
    })
  }

}
export async function addPassword(appName, email, password, webUrl, userId) {
  //   const { stripeId, userId } = await req.json()
  const client = await clerkClient();

  const user = await client.users.getUser(userId);
  let passwords = [];
  if (Array.isArray(user.privateMetadata.passwords)) {
    passwords = user.privateMetadata.passwords || [];
    passwords.push({appName, email, password, webUrl,date:Date.now()});
     await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      passwords: passwords
    },
  })
  }
  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      passwords:[{appName, email, password, webUrl,date:Date.now()}]
    },
  })

}