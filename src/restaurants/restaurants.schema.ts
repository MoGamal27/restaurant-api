import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema({ timestamps: true })
export class Restaurant {
    @Prop({ 
        type: String,
        required: true      
    })
    nameEn!: string;

    @Prop({
        type: String,
        required: true
    })
    nameAr!: string;

    @Prop({
        type: String,
        required: true,
        unique: [true, 'Slug must be unique']
    })
    slug!: string;
   
    
    @Prop({
        type: [String],
        required: true,
        minlength: [1, 'At least one cuisine is required'],
        maxlength: [3, 'No more than 3 cuisines are allowed']
    })
    cuisines!: string[];

}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);