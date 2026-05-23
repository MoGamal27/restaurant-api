import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';


@Injectable()
export class UsersService {
 
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserDocument> {
    const user = new this.userModel(dto);
    return user.save();
  }

   async getRecommendations(userId: string) {
  const result = await this.userModel.aggregate([

    {
      $match: {
        _id: new Types.ObjectId(userId)
      }
    },

    {
      $lookup: {
        from: 'users',           
        let: { userCuisines: '$favoriteCuisines' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $gt: [
                      {
                        $size: {
                          $ifNull: [
                            {
                              $setIntersection: ['$favoriteCuisines', '$$userCuisines']
                            },
                            []
                          ]
                        }
                      },
                      0
                    ]
                  },
                  {
                    $ne: ['$_id', new Types.ObjectId(userId)]
                  }
                ]
              }
            }
          },
          {
            $project: {
              fullName: 1,
              favoriteCuisines: 1
            }
          }
        ],
        as: 'similarUsers'
      }
    },

    {
      $lookup: {
        from: 'userfollowsrestaurants',
        let: { similarUserIds: '$similarUsers._id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ['$userId', '$$similarUserIds']
              }
            }
          }
        ],
        as: 'followRelationships'
      }
    },

    {
      $lookup: {
        from: 'restaurants',
        let: { restaurantIds: '$followRelationships.restaurantId' },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ['$_id', '$$restaurantIds']
              }
            }
          },
          {
            $project: {
              nameEn: 1,
              nameAr: 1,
              slug: 1,
              cuisines: 1,
              location: 1
            }
          }
        ],
        as: 'recommendedRestaurants'
      }
    },

    {
      $project: {
        _id: 0,
        similarUsers: 1,
        recommendedRestaurants: 1
      }
    }

  ]);
  return result[0] ?? { similarUsers: [], recommendedRestaurants: [] };
}
}
