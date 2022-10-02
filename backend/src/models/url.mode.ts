import mongoose from 'mongoose';
import { UrlInterface } from '../interfaces/url.interface';


const UrlSchema = new mongoose.Schema<UrlInterface>(
    {
        fullUrl: {
            type: String,
            required: true,
        },
        shortCode: {
            type: String,
            required: true,
        },
        expiry: {
            type: Date,
            required: true,
        },
        numberOfHits: {
            type: Number,
            default: 0,
        },
    },
    {
        versionKey: false,
    }
);

const UrlModel = mongoose.model('Url', UrlSchema);
export default UrlModel;