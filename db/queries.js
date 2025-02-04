import { momentsModel } from "@/models/moments-model";
import { userModel } from "@/models/user-model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-util";
import mongoose from "mongoose";

async function getAllMoments(query) {
    let allEvents = [];
    if (query) {
        const regex = new RegExp(query, "i");
        allEvents = await momentsModel.find({ name: { $regex: regex } }).lean();
    } else {
        allEvents = await momentsModel.find().lean();
    }
    return replaceMongoIdInArray(allEvents);

    
}

async function getEventById(eventId) {
    const event = await momentsModel.findById(eventId).lean();
    return replaceMongoIdInObject(event);
}

async function createUser(user) {
    return await userModel.create(user);
}

async function findUserByCredentials(credentials) {
    const user = await userModel.findOne(credentials).lean();
    if (user) {
        return replaceMongoIdInObject(user);
    }
    return null;
}

async function updateInterest(eventId, authId) {

    const event = await momentsModel.findById(eventId);

    if (event) {
        const foundUsers = event.interested_ids.find(id => id.toString() === authId);

        if(foundUsers) {
            event.interested_ids.pull(new mongoose.Types.ObjectId(authId));
        } else {
            event.interested_ids.push(new mongoose.Types.ObjectId(authId));
        }

        event.save();
    }


}


async function updateGoing(eventId, authId) {
    const event = await momentsModel.findById(eventId);
    event.going_ids.push(new mongoose.Types.ObjectId(authId));
    event.save();
}

export {
    getAllMoments,
    getEventById,
    createUser,
    findUserByCredentials,
    updateInterest,
    updateGoing
}