
import mongoose, { Schema, Document } from 'mongoose';

export interface Customers extends Document {
   cpf: string; 
   firstName: string; 
   lastName:  string;
   birthDate: Date; 
   address: string
   city: string; 
   country: string; 
}

const customersSchema = new Schema<Customers>({
    cpf: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true }
});

const CustomerModel = mongoose.model<Customers>('customers', customersSchema)
export default CustomerModel;

