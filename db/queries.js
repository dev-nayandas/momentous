import { momentsModel } from "@/models/moments-model";
import { userModel } from "@/models/user-model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-util";

async function getAllMoments() {
    const allEvents = await momentsModel.find().lean();
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

async function updateInterest(momentId, authId) {

    const moment = await momentsModel.findById(momentId);

    if (moment) {
        const foundUsers = moment.interested_ids.find(id => id.toString() === authId);

        if(foundUsers) {
            moment.interested_ids.pull(new mongoose.Types.ObjectId(authId));
        } else {
            moment.interested_ids.push(new mongoose.Types.ObjectId(authId));
        }

        moment.save();
    }


}

export {
    getAllMoments,
    getEventById,
    createUser,
    findUserByCredentials,
    updateInterest
}