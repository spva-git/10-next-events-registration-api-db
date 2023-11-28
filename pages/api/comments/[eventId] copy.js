import fs from 'fs';
import path from 'path';

export function buildCommentsDataPath(){
   return path.join(process.cwd(), 'data', 'comments.json');
}

export function extractComments(filePath){
    const fileData = fs.readFileSync(filePath);
    return JSON.parse(fileData);
} 

export default function handler(req, res) {
    const eventId = req.query.eventId;

    if(req.method === 'POST'){
        const { email, name, text } = req.body;

        if(!email.includes('@') || !name || name.trim() === '' || text.trim() === ''){
            res.status(422).json({message: 'Invalid data provided'});
            return;
        }
        const newComment = {
            id: new Date().toISOString(),
            eventId,
            email,
            name,
            text,
        }
        //store this in db or file
        const filePath = buildCommentsDataPath();
        const data = extractComments(filePath);
        data.push(newComment);
        fs.writeFileSync(filePath, JSON.stringify(data));

        res.status(201).json({message: 'Success', comment: newComment})
    } else {
        const filePath = buildCommentsDataPath();
        const comments = extractComments(filePath);
        const requestedComments = comments.filter((comment) => comment.eventId === eventId)
        res.status(200).json({comments: requestedComments})
    }
}