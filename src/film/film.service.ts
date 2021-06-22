import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from './film.model';

@Injectable()
export class FilmService {
    constructor(
        @InjectModel(Film.name) private readonly filmModel: Model<Film>,
        ) {}
    
      async createFilm(filmData): Promise<any> {
      
        
    
       
        const film = await this.filmModel.create(filmData);
    
    
        return film;
    
      }
      async queryFilms(filter, options){
        let sort = '';
        if (options.sortBy) {
          const sortingCriteria = [];
          options.sortBy.split(',').forEach((sortOption) => {
            const [key, order] = sortOption.split(':');
            sortingCriteria.push((order === 'desc' ? '-' : '') + key);
          });
          sort = sortingCriteria.join(' ');
        } else {
          sort = 'createdAt';
        }
    
        const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
        const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
        const skip = (page - 1) * limit;
       
       const films = await this.filmModel.find(filter).sort(sort).skip(skip).limit(limit);
        return films;
    
      }      
     


    }
