import { Schema, model, Document } from 'mongoose';

interface IBlog extends Document {
    title: string;
    content: string;
    lastEditedBy: string | null;
    isLocked: boolean;
    lockedBy: string | null;
    lockedAt: Date | null;
}

const blogSchema = new Schema<IBlog>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    lastEditedBy: { type: String, ref: 'User', default: null },
    isLocked: { type: Boolean, default: false },
    lockedBy: { type: String, ref: 'User', default: null },
    lockedAt: { type: Date, default: null }
});

export default model<IBlog>('Blog', blogSchema);
