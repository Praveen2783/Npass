"use server"

import { clerkClient } from "@clerk/nextjs/server";
import { date } from "zod";
import bcrypt from 'bcrypt';
import Randomstring from "randomstring";




export async function editCreditCard(userId, cardId, updatedCardData) {
  const client = await clerkClient()
  console.log("heelo")
  const user = await client.users.getUser(userId)
console.log("hello 2")
  let cards = []

  if (Array.isArray(user.privateMetadata.cards)) {
    cards = user.privateMetadata.cards || []

    // Find the card by ID
    const cardIndex = cards.findIndex((card) => card.id === cardId)

    if (cardIndex !== -1) {
      // Update the specific card
      cards[cardIndex] = {
        ...cards[cardIndex],
        ...updatedCardData,
        updatedAt: new Date().toISOString(),
      }

      await client.users.updateUserMetadata(userId, {
        privateMetadata: {
          ...user.privateMetadata,
          cards: cards,
        },
      })

      return { success: true, message: "Card updated successfully" }
    } else {
      return { success: false, message: "Card not found" }
    }
  }

  return { success: false, message: "No cards found" }
}



export async function deleteCreditCard(userId, cardId) {
  //   const { stripeId, userId } = await req.json()
  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  let cards = [];
  if (Array.isArray(user.privateMetadata.cards)) {
    cards = user.privateMetadata.cards || [];
    // Filter out the card with the matching ID
    const filteredCards = cards.filter((card) => card.id !== cardId)
    if (filteredCards.length < cards.length) {
      await client.users.updateUserMetadata(userId, {
        privateMetadata: {
          ...user.privateMetadata,
          cards: filteredCards
        },
      })
    }
  }

}
export async function deletePassword(userId ,passId) {

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  let passwords = [];
  if (Array.isArray(user.privateMetadata.passwords)) {
    passwords = user.privateMetadata.passwords || [];
   const filterPass = passwords.filter((password)=>password.id !== passId)
   if(filterPass.length < passwords.length ){
    await client.users.updateUserMetadata(userId, {
      privateMetadata: {
        ...user.privateMetadata,
        passwords: filterPass
      },
    })
  }
  }
}
export async function addCreditCard(cardName, cardNo, expiry, cvv, cardHolderName, cardType, userId) {
  //   const { stripeId, userId } = await req.json()
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
 
  let cards = [];
  if (Array.isArray(user.privateMetadata.cards)) {
    cards = user.privateMetadata.cards || [];
    cards.push({ cardName, cardNo, expiry, cvv, cardHolderName, date: Date.now(), cardType, id:Randomstring.generate() });
    await client.users.updateUserMetadata(userId, {
      privateMetadata: {
        cards: cards
      },
    })
  } else {
    await client.users.updateUserMetadata(userId, {
      privateMetadata: {
        cards: [{ cardName, cardNo, expiry, cvv, cardHolderName, date: Date.now(), cardType, id: Randomstring.generate()}]
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
    passwords.push({ appName, email, password, webUrl, date: Date.now(),id:Randomstring.generate() });
    await client.users.updateUserMetadata(userId, {
      privateMetadata: {
        passwords: passwords
      },
    })
  }else{
  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      passwords: [{ appName, email, password, webUrl, date: Date.now(),id:Randomstring.generate() }]
    },
  })
  }
}