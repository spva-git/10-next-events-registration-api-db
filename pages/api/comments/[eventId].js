import { connectDB, insertDocument, readDocument } from "@/helpers/db-utill";

export default async function handler(req, res) {
    const eventId = req.query.eventId;

    if(req.method === 'POST'){
        const { email, name, text } = req.body;

        if(!email.includes('@') || !name || name.trim() === '' || text.trim() === ''){
            res.status(422).json({message: 'Invalid data provided'});
            return;
        }
        const newComment = {
            eventId,
            email,
            name,
            text,
        }
        //store this in db or file
        const client = await connectDB();
        await insertDocument(client, 'comments', newComment);

        res.status(201).json({message: 'Success', comment: newComment})
    } else {
        const client = await connectDB();
        const commentsOfEvent = await readDocument(client, 'comments', {eventId:eventId});
        
        res.status(200).json({comments: commentsOfEvent})
    }
}