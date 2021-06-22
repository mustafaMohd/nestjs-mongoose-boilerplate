import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { paginate } from 'src/config/plugins/paginate.plugin';
import { FilmController } from './film.controller';
import { Film, FilmSchema } from './film.model';
import { FilmService } from './film.service';
const slugify = require('slugify')
//import * as slugify from 'slugify';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Film.name,
        useFactory: () => {
          const schema = FilmSchema;

          schema.pre<Film>('save', async function (next: Function) {
            const film = this;
            film.slug=slugify(film.name)
            next();
          });
          
          
           schema.plugin(require('../config/plugins/toJSON.plugin'));
          schema.plugin(paginate);
          return schema;
        },
      },
    ]),
  ],
  controllers: [FilmController],
  providers: [FilmService]
})
export class FilmModule {}
